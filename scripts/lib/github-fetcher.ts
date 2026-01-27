/**
 * GitHub API utilities for fetching pinned repos and top starred repos
 */

import type { EnrichedRepo, FetchConfig } from './types.js';

const GITHUB_API = 'https://api.github.com';
const GITHUB_GRAPHQL = 'https://api.github.com/graphql';

/**
 * Build headers for GitHub API requests
 */
function buildHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  if (token && token.trim().length > 0) {
    headers['Authorization'] = `Bearer ${token.trim()}`;
  }

  return headers;
}

/**
 * Fetch user's pinned repositories via GraphQL API
 */
export async function fetchPinnedRepos(
  username: string,
  token?: string
): Promise<string[]> {
  if (!token) {
    console.log('⚠️  No GITHUB_TOKEN provided. Skipping pinned repos (requires auth).');
    return [];
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              isPrivate
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(GITHUB_GRAPHQL, {
      method: 'POST',
      headers: {
        ...buildHeaders(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if (!response.ok) {
      console.warn(`GraphQL request failed: ${response.status} ${response.statusText}`);
      return [];
    }

    const data = await response.json();

    if (data.errors) {
      console.warn('GraphQL errors:', data.errors);
      return [];
    }

    const pinnedItems = data.data?.user?.pinnedItems?.nodes || [];
    // Filter to only public repos
    return pinnedItems
      .filter((node: { name: string; isPrivate: boolean }) => !node.isPrivate)
      .map((node: { name: string }) => node.name);
  } catch (error) {
    console.error('Error fetching pinned repos:', error);
    return [];
  }
}

/**
 * Fetch README content for a repository
 */
async function fetchReadme(
  owner: string,
  repo: string,
  token?: string
): Promise<string | null> {
  try {
    const response = await fetch(
      `${GITHUB_API}/repos/${owner}/${repo}/readme`,
      {
        headers: {
          ...buildHeaders(token),
          'Accept': 'application/vnd.github.raw+json',
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    return await response.text();
  } catch {
    return null;
  }
}

/**
 * Fetch language breakdown for a repository
 */
async function fetchLanguages(
  owner: string,
  repo: string,
  token?: string
): Promise<Record<string, number>> {
  try {
    const response = await fetch(
      `${GITHUB_API}/repos/${owner}/${repo}/languages`,
      { headers: buildHeaders(token) }
    );

    if (!response.ok) {
      return {};
    }

    return await response.json();
  } catch {
    return {};
  }
}

/**
 * Fetch top repositories by stars for a user
 */
export async function fetchTopRepos(
  username: string,
  limit: number,
  token?: string
): Promise<EnrichedRepo[]> {
  try {
    const response = await fetch(
      `${GITHUB_API}/users/${username}/repos?sort=stars&direction=desc&per_page=${limit}&type=public`,
      { headers: buildHeaders(token) }
    );

    if (!response.ok) {
      console.warn(`Failed to fetch repos: ${response.status} ${response.statusText}`);
      return [];
    }

    const repos = await response.json();

    // Enrich each repo with README and languages in parallel
    const enrichedRepos = await Promise.all(
      repos.map(async (repo: Record<string, unknown>): Promise<EnrichedRepo> => {
        const [readme, languages] = await Promise.all([
          fetchReadme(username, repo.name as string, token),
          fetchLanguages(username, repo.name as string, token),
        ]);

        return {
          name: repo.name as string,
          full_name: repo.full_name as string,
          description: repo.description as string | null,
          html_url: repo.html_url as string,
          language: repo.language as string | null,
          stargazers_count: repo.stargazers_count as number,
          topics: (repo.topics as string[]) || [],
          readme,
          languages,
          created_at: repo.created_at as string,
          updated_at: repo.updated_at as string,
          license: (repo.license as { spdx_id?: string })?.spdx_id ?? null,
        };
      })
    );

    return enrichedRepos;
  } catch (error) {
    console.error('Error fetching top repos:', error);
    return [];
  }
}

/**
 * Enrich a list of repository names with full data
 */
async function enrichRepos(
  username: string,
  repoNames: string[],
  token?: string
): Promise<EnrichedRepo[]> {
  const enriched: EnrichedRepo[] = [];

  for (const name of repoNames) {
    try {
      const response = await fetch(
        `${GITHUB_API}/repos/${username}/${name}`,
        { headers: buildHeaders(token) }
      );

      if (!response.ok) {
        console.warn(`   Failed to fetch ${name}: ${response.status}`);
        continue;
      }

      const repo = await response.json();
      const [readme, languages] = await Promise.all([
        fetchReadme(username, name, token),
        fetchLanguages(username, name, token),
      ]);

      enriched.push({
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        html_url: repo.html_url,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        topics: repo.topics || [],
        readme,
        languages,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        license: repo.license?.spdx_id ?? null,
      });
    } catch (error) {
      console.warn(`   Error fetching ${name}:`, error);
    }
  }

  return enriched;
}

/**
 * Fetch repositories based on source configuration
 * - 'pinned': Only pinned repositories (requires token)
 * - 'stars': Only top starred repositories
 * - 'both': Pinned first, then fill with top starred (default)
 */
export async function fetchTargetRepos(
  username: string,
  config: FetchConfig
): Promise<EnrichedRepo[]> {
  const { token, limit, excludeRepos = [], source = 'both' } = config;

  console.log(`📡 Fetching repositories for ${username}...`);
  console.log(`   Source: ${source}`);

  const result: EnrichedRepo[] = [];
  const seen = new Set<string>();

  // Handle pinned-only source
  if (source === 'pinned') {
    if (!token) {
      console.error('❌ GITHUB_TOKEN required for pinned repos source');
      return [];
    }

    const pinnedNames = await fetchPinnedRepos(username, token);
    console.log(`   Found ${pinnedNames.length} pinned repos`);

    const filtered = pinnedNames.filter(name => !excludeRepos.includes(name));
    const enriched = await enrichRepos(username, filtered.slice(0, limit), token);

    console.log(`   Returning ${enriched.length} repos for processing`);
    return enriched;
  }

  // Handle stars-only source
  if (source === 'stars') {
    const allRepos = await fetchTopRepos(username, limit + excludeRepos.length, token);
    console.log(`   Found ${allRepos.length} repos by stars`);

    for (const repo of allRepos) {
      if (result.length >= limit) break;
      if (excludeRepos.includes(repo.name)) continue;
      result.push(repo);
    }

    console.log(`   Returning ${result.length} repos for processing`);
    return result;
  }

  // Handle 'both' source (default): pinned first, then stars
  const [pinnedNames, allRepos] = await Promise.all([
    fetchPinnedRepos(username, token),
    fetchTopRepos(username, limit + 10, token),
  ]);

  console.log(`   Found ${pinnedNames.length} pinned repos`);
  console.log(`   Found ${allRepos.length} repos by stars`);

  // Create a map for quick lookup
  const repoMap = new Map<string, EnrichedRepo>();
  for (const repo of allRepos) {
    repoMap.set(repo.name, repo);
  }

  // Add pinned repos first (maintain order)
  for (const name of pinnedNames) {
    if (excludeRepos.includes(name) || seen.has(name)) continue;
    const repo = repoMap.get(name);
    if (repo) {
      result.push(repo);
      seen.add(name);
    }
  }

  // Add remaining top repos by stars
  const sortedByStars = [...allRepos].sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  );

  for (const repo of sortedByStars) {
    if (result.length >= limit) break;
    if (excludeRepos.includes(repo.name) || seen.has(repo.name)) continue;
    result.push(repo);
    seen.add(repo.name);
  }

  console.log(`   Returning ${result.length} repos for processing`);
  return result;
}

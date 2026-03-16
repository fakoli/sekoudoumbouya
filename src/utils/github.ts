/**
 * Utility functions for fetching data from the GitHub API
 */

export interface GitHubRepo {
	name: string;
	full_name: string;
	description: string | null;
	html_url: string;
	language: string | null;
	stargazers_count: number;
	topics: string[];
}

/**
 * Fetches repository information from GitHub API
 * @param owner - GitHub username or organization
 * @param repo - Repository name
 * @param timeoutMs - Request timeout in milliseconds (default: 5000)
 * @returns Repository data or null if fetch fails
 */
export async function fetchGitHubRepo(
	owner: string,
	repo: string,
	timeoutMs = 5000
): Promise<GitHubRepo | null> {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

	try {
		// Prepare headers
		const headers: Record<string, string> = {
			'Accept': 'application/vnd.github+json',
		};

		// Add authorization header if token is available and valid
		const token = import.meta.env.GITHUB_TOKEN;
		if (token && typeof token === 'string' && token.trim().length > 0) {
			headers['Authorization'] = `Bearer ${token.trim()}`;
		}

		const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
			headers,
			signal: controller.signal,
		});

		if (!response.ok) {
			console.warn(`Failed to fetch ${owner}/${repo}: ${response.status} ${response.statusText}`);
			return null;
		}

		const data = await response.json();

		return {
			name: data.name,
			full_name: data.full_name,
			description: data.description,
			html_url: data.html_url,
			language: data.language,
			stargazers_count: data.stargazers_count,
			topics: data.topics || []
		};
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			console.warn(`Request timeout for ${owner}/${repo}`);
		} else {
			console.error(`Error fetching ${owner}/${repo}:`, error);
		}
		return null;
	} finally {
		clearTimeout(timeoutId);
	}
}

/**
 * Fetches multiple repositories in parallel
 * @param repos - Array of {owner, repo} objects
 * @returns Array of repository data (null for failed fetches)
 */
export async function fetchGitHubRepos(repos: Array<{ owner: string; repo: string }>): Promise<Array<GitHubRepo | null>> {
	return Promise.all(
		repos.map(({ owner, repo }) => fetchGitHubRepo(owner, repo))
	);
}

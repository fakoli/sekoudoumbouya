/**
 * Shared TypeScript types for case study generation
 */

/**
 * Enriched repository data with README and language breakdown
 */
export interface EnrichedRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  topics: string[];
  readme: string | null;
  languages: Record<string, number>;
  created_at: string;
  updated_at: string;
  license: string | null;
}

/**
 * Repository source selection
 * - 'pinned': Only fetch pinned repositories (requires GITHUB_TOKEN)
 * - 'stars': Only fetch top starred repositories
 * - 'both': Fetch pinned first, then fill with top starred (default)
 */
export type RepoSource = 'pinned' | 'stars' | 'both';

/**
 * Configuration for fetching target repositories
 */
export interface FetchConfig {
  token?: string;
  limit: number;
  excludeRepos?: string[];
  source?: RepoSource;
}

/**
 * Generated case study frontmatter matching src/content/config.ts schema
 */
export interface CaseStudyFrontmatter {
  title: string;
  slug: string;
  publishDate: string;
  description: string;
  category: 'open-source';
  role: string;
  organization: string;
  impactSummary: string;
  scale: string[];
  primaryTech: string[];
  tags: string[];
  duration: string;
  featured: boolean;
  repository: string;
  generated: true;
  generatedAt: string;
}

/**
 * Complete generated case study with frontmatter and MDX content
 */
export interface GeneratedCaseStudy {
  frontmatter: CaseStudyFrontmatter;
  content: string;
}

/**
 * Existing case study metadata for caching checks
 */
export interface ExistingCaseStudy {
  slug: string;
  repository?: string;
  generated?: boolean;
}

/**
 * Configuration for case study generation
 */
export interface GeneratorConfig {
  apiKey: string;
  promptTemplate?: string;
  systemPrompt?: string;
  model?: string;
}

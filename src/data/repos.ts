/**
 * GitHub repository data and utilities
 */

import { SITE_CONFIG } from '../config';
import type { GitHubRepo } from '../utils/github';

/**
 * Names of pinned repositories to display on homepage
 */
export const PINNED_REPO_NAMES = [
	'mcp-ai-bridge',
	'AwsSecurityMapper',
	'ai-driven-temporal-to-IAC',
	'xenon-notes',
	'sekoudoumbouya',
	'my-ai-study-buddy',
] as const;

/**
 * Fallback repository data when GitHub API is unavailable
 */
export const FALLBACK_REPOS: GitHubRepo[] = [
	{
		name: 'mcp-ai-bridge',
		full_name: `${SITE_CONFIG.githubUsername}/mcp-ai-bridge`,
		description:
			'Secure MCP server integrating Claude Code with OpenAI and Google Gemini APIs. Features multi-layer security, content filtering, and rate limiting.',
		html_url: `https://github.com/${SITE_CONFIG.githubUsername}/mcp-ai-bridge`,
		language: 'JavaScript',
		stargazers_count: 4,
		topics: ['mcp', 'ai', 'security', 'openai', 'gemini'],
	},
	{
		name: 'AwsSecurityMapper',
		full_name: `${SITE_CONFIG.githubUsername}/AwsSecurityMapper`,
		description:
			'Python tool that visualizes AWS security group relationships with interactive Plotly graphs. Supports multi-region and cross-VPC analysis.',
		html_url: `https://github.com/${SITE_CONFIG.githubUsername}/AwsSecurityMapper`,
		language: 'Python',
		stargazers_count: 1,
		topics: ['aws', 'security', 'visualization', 'networking'],
	},
	{
		name: 'ai-driven-temporal-to-IAC',
		full_name: `${SITE_CONFIG.githubUsername}/ai-driven-temporal-to-IAC`,
		description:
			'Temporal-based workflow orchestration for multi-workspace Terraform deployments with dependency resolution and MCP server integration.',
		html_url: `https://github.com/${SITE_CONFIG.githubUsername}/ai-driven-temporal-to-IAC`,
		language: 'Go',
		stargazers_count: 2,
		topics: ['temporal', 'terraform', 'iac', 'workflow'],
	},
	{
		name: 'xenon-notes',
		full_name: `${SITE_CONFIG.githubUsername}/xenon-notes`,
		description:
			'AI-powered notetaking app for Apple platforms built with Swift and RealityKit.',
		html_url: `https://github.com/${SITE_CONFIG.githubUsername}/xenon-notes`,
		language: 'Swift',
		stargazers_count: 2,
		topics: ['swift', 'ai', 'ios', 'notes'],
	},
	{
		name: 'sekoudoumbouya',
		full_name: `${SITE_CONFIG.githubUsername}/sekoudoumbouya`,
		description:
			'Building bridges between bytes – infrastructure case studies & technical musings.',
		html_url: `https://github.com/${SITE_CONFIG.githubUsername}/sekoudoumbouya`,
		language: 'Astro',
		stargazers_count: 1,
		topics: ['portfolio', 'astro', 'infrastructure'],
	},
	{
		name: 'my-ai-study-buddy',
		full_name: `${SITE_CONFIG.githubUsername}/my-ai-study-buddy`,
		description:
			'AI-powered learning platform for visual learners. Features course authoring, flashcard ratings, progress tracking, code sandboxes, and AI content generation.',
		html_url: `https://github.com/${SITE_CONFIG.githubUsername}/my-ai-study-buddy`,
		language: 'TypeScript',
		stargazers_count: 0,
		topics: ['ai', 'education', 'typescript', 'learning'],
	},
];

/**
 * Merges live repo data with fallback data, using fallback for any nulls
 * If all repos are null (API unavailable), returns all fallbacks
 */
export function mergeReposWithFallback(
	repoData: (GitHubRepo | null)[],
	fallbacks: GitHubRepo[]
): GitHubRepo[] {
	// If all API calls failed, return fallbacks entirely
	if (repoData.every((repo) => repo === null)) {
		return fallbacks;
	}

	// Otherwise merge: use live data when available, fallback otherwise
	return repoData
		.map((repo, index) => repo || fallbacks[index] || null)
		.filter((repo): repo is GitHubRepo => repo !== null);
}

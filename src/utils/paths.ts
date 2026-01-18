/**
 * URL path utilities for consistent base path handling
 */

/**
 * Returns the normalized base path for the site.
 * Handles both root deployments (/) and subpath deployments (/sekoudoumbouya)
 */
export function getBasePath(): string {
	const basePath = import.meta.env.BASE_URL;
	return basePath === '/' ? '' : basePath.replace(/\/$/, '');
}

/**
 * Constructs a full path by prepending the base path
 */
export function withBasePath(path: string): string {
	const base = getBasePath();
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	return `${base}${normalizedPath}`;
}

/**
 * Normalizes a path by removing trailing slashes
 */
export function normalizePath(path: string): string {
	return path.replace(/\/$/, '') || '/';
}

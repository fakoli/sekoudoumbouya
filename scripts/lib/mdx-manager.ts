/**
 * MDX file management for reading and writing case studies
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import type { ExistingCaseStudy, GeneratedCaseStudy } from './types.js';

/**
 * Read all existing case studies and extract metadata for caching checks
 */
export async function getExistingCaseStudies(
  dir: string
): Promise<Map<string, ExistingCaseStudy>> {
  const existing = new Map<string, ExistingCaseStudy>();

  if (!existsSync(dir)) {
    return existing;
  }

  const files = readdirSync(dir).filter(
    f => f.endsWith('.md') || f.endsWith('.mdx')
  );

  for (const file of files) {
    try {
      const filepath = join(dir, file);
      const content = readFileSync(filepath, 'utf-8');
      const { data } = matter(content);

      const slug = file.replace(/\.mdx?$/, '');
      existing.set(slug, {
        slug,
        repository: data.repository,
        generated: data.generated,
      });
    } catch (error) {
      console.warn(`Warning: Could not parse ${file}:`, error);
    }
  }

  return existing;
}

/**
 * Check if a case study already exists for a given repository
 * Matches by either slug (repo name) or repository URL
 */
export function hasExistingCaseStudy(
  repoName: string,
  repoUrl: string,
  existing: Map<string, ExistingCaseStudy>
): boolean {
  // Check by slug (filename)
  const slug = repoName.toLowerCase();
  if (existing.has(slug)) {
    return true;
  }

  // Check by repository URL
  for (const study of existing.values()) {
    if (study.repository === repoUrl) {
      return true;
    }
  }

  return false;
}

/**
 * Format frontmatter value for YAML output
 */
function formatValue(value: unknown, indent = 0): string {
  const spaces = '  '.repeat(indent);

  if (value === null || value === undefined) {
    return 'null';
  }

  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }

  if (typeof value === 'number') {
    return String(value);
  }

  if (typeof value === 'string') {
    // Check if string needs quoting
    if (
      value.includes(':') ||
      value.includes('#') ||
      value.includes('\n') ||
      value.startsWith('"') ||
      value.startsWith("'") ||
      value === ''
    ) {
      return `"${value.replace(/"/g, '\\"')}"`;
    }
    return value;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return '[]';
    }
    return '\n' + value.map(v => `${spaces}  - ${formatValue(v, 0)}`).join('\n');
  }

  return String(value);
}

/**
 * Serialize frontmatter to YAML format
 */
function serializeFrontmatter(frontmatter: Record<string, unknown>): string {
  const lines: string[] = [];

  // Define field order for consistency
  const fieldOrder = [
    'title',
    'slug',
    'publishDate',
    'organization',
    'role',
    'description',
    'category',
    'impactSummary',
    'scale',
    'primaryTech',
    'tags',
    'duration',
    'featured',
    'repository',
    'generated',
    'generatedAt',
  ];

  // Output fields in order
  for (const key of fieldOrder) {
    if (key in frontmatter) {
      const value = frontmatter[key];
      const formatted = formatValue(value);

      if (formatted.startsWith('\n')) {
        lines.push(`${key}:${formatted}`);
      } else {
        lines.push(`${key}: ${formatted}`);
      }
    }
  }

  // Output any remaining fields not in the order list
  for (const [key, value] of Object.entries(frontmatter)) {
    if (!fieldOrder.includes(key)) {
      const formatted = formatValue(value);
      if (formatted.startsWith('\n')) {
        lines.push(`${key}:${formatted}`);
      } else {
        lines.push(`${key}: ${formatted}`);
      }
    }
  }

  return lines.join('\n');
}

/**
 * Write a generated case study to an MDX file
 */
export async function writeCaseStudy(
  caseStudy: GeneratedCaseStudy,
  outputPath: string
): Promise<void> {
  const yaml = serializeFrontmatter(caseStudy.frontmatter);
  const mdx = `---\n${yaml}\n---\n\n${caseStudy.content}\n`;

  writeFileSync(outputPath, mdx, 'utf-8');
}

/**
 * Delete all generated case studies (files with generated: true)
 * Returns the list of deleted files
 */
export async function cleanGeneratedCaseStudies(
  dir: string,
  dryRun = false
): Promise<string[]> {
  const deleted: string[] = [];

  if (!existsSync(dir)) {
    return deleted;
  }

  const files = readdirSync(dir).filter(
    f => f.endsWith('.md') || f.endsWith('.mdx')
  );

  for (const file of files) {
    try {
      const filepath = join(dir, file);
      const content = readFileSync(filepath, 'utf-8');
      const { data } = matter(content);

      if (data.generated === true) {
        if (dryRun) {
          console.log(`   [DRY RUN] Would delete: ${file}`);
        } else {
          unlinkSync(filepath);
          console.log(`   🗑️  Deleted: ${file}`);
        }
        deleted.push(file);
      }
    } catch (error) {
      console.warn(`Warning: Could not process ${file}:`, error);
    }
  }

  return deleted;
}

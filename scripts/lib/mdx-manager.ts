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
 * Write a generated case study to an MDX file
 * Uses gray-matter stringify for consistent YAML formatting
 */
export async function writeCaseStudy(
  caseStudy: GeneratedCaseStudy,
  outputPath: string
): Promise<void> {
  const mdx = matter.stringify(caseStudy.content, caseStudy.frontmatter);
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

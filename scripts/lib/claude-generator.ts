/**
 * Claude AI content generation for case studies
 */

import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { EnrichedRepo, GeneratedCaseStudy, GeneratorConfig } from './types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_PROMPT_TEMPLATE = join(__dirname, '../prompts/case-study.md');
const DEFAULT_SYSTEM_PROMPT = join(__dirname, '../prompts/system.md');
const DEFAULT_MODEL = 'claude-opus-4-5-20251101';

/**
 * Load a prompt file, returning empty string if not found
 */
function loadPromptFile(path: string): string {
  if (!existsSync(path)) {
    return '';
  }
  return readFileSync(path, 'utf-8');
}

/**
 * Load and populate the prompt template with repo data
 */
function buildPrompt(repo: EnrichedRepo, templatePath?: string): string {
  const template = loadPromptFile(templatePath || DEFAULT_PROMPT_TEMPLATE);

  if (!template) {
    throw new Error(`Prompt template not found: ${templatePath || DEFAULT_PROMPT_TEMPLATE}`);
  }

  // Format languages as a readable string
  const languagesStr = Object.entries(repo.languages)
    .sort(([, a], [, b]) => b - a)
    .map(([lang, bytes]) => `${lang} (${Math.round(bytes / 1024)}KB)`)
    .join(', ') || 'Not specified';

  // Format topics
  const topicsStr = repo.topics.length > 0 ? repo.topics.join(', ') : 'None';

  // Build substitutions
  const substitutions: Record<string, string> = {
    '{{name}}': repo.name,
    '{{full_name}}': repo.full_name,
    '{{description}}': repo.description || 'No description provided',
    '{{language}}': repo.language || 'Not specified',
    '{{stargazers_count}}': String(repo.stargazers_count),
    '{{topics}}': topicsStr,
    '{{license}}': repo.license || 'Not specified',
    '{{created_at}}': repo.created_at.split('T')[0],
    '{{updated_at}}': repo.updated_at.split('T')[0],
    '{{languages}}': languagesStr,
    '{{html_url}}': repo.html_url,
    '{{readme}}': repo.readme || 'No README available',
  };

  let prompt = template;
  for (const [placeholder, value] of Object.entries(substitutions)) {
    prompt = prompt.replaceAll(placeholder, value);
  }

  return prompt;
}

/**
 * Parse the generated MDX content into frontmatter and content
 */
function parseMdxResponse(response: string): { frontmatter: string; content: string } {
  // Remove any markdown code blocks if present
  let cleaned = response.trim();
  if (cleaned.startsWith('```mdx') || cleaned.startsWith('```markdown') || cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:mdx|markdown)?\n?/, '').replace(/\n?```$/, '');
  }

  // Split frontmatter from content
  const fmMatch = cleaned.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) {
    throw new Error('Invalid MDX response: could not parse frontmatter');
  }

  return {
    frontmatter: fmMatch[1].trim(),
    content: fmMatch[2].trim(),
  };
}

/**
 * Parse YAML frontmatter into an object
 */
function parseFrontmatter(yaml: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const lines = yaml.split('\n');
  let currentKey: string | null = null;
  let currentArray: string[] | null = null;

  for (const line of lines) {
    // Check for array item
    if (line.match(/^\s+-\s/)) {
      const value = line.replace(/^\s+-\s/, '').trim().replace(/^["']|["']$/g, '');
      if (currentArray) {
        currentArray.push(value);
      }
      continue;
    }

    // Check for key-value pair
    const kvMatch = line.match(/^(\w+):\s*(.*)$/);
    if (kvMatch) {
      // Save previous array if exists
      if (currentKey && currentArray) {
        result[currentKey] = currentArray;
      }

      currentKey = kvMatch[1];
      const value = kvMatch[2].trim();

      // Check if this starts an array
      if (value === '' || value === '[]') {
        currentArray = [];
      } else if (value.startsWith('[') && value.endsWith(']')) {
        // Inline array
        const items = value
          .slice(1, -1)
          .split(',')
          .map(s => s.trim().replace(/^["']|["']$/g, ''))
          .filter(s => s.length > 0);
        result[currentKey] = items;
        currentKey = null;
        currentArray = null;
      } else {
        // Scalar value
        let parsed: unknown = value.replace(/^["']|["']$/g, '');
        if (parsed === 'true') parsed = true;
        else if (parsed === 'false') parsed = false;
        else if (!isNaN(Number(parsed)) && parsed !== '') parsed = Number(parsed);
        result[currentKey] = parsed;
        currentKey = null;
        currentArray = null;
      }
    }
  }

  // Save final array if exists
  if (currentKey && currentArray) {
    result[currentKey] = currentArray;
  }

  return result;
}

/**
 * Generate a case study using Claude AI
 */
export async function generateCaseStudy(
  repo: EnrichedRepo,
  config: GeneratorConfig
): Promise<GeneratedCaseStudy> {
  const { apiKey, promptTemplate, systemPrompt, model } = config;
  const client = new Anthropic({ apiKey });
  const prompt = buildPrompt(repo, promptTemplate);

  // Load system prompt if provided
  const systemContent = systemPrompt
    ? loadPromptFile(systemPrompt)
    : loadPromptFile(DEFAULT_SYSTEM_PROMPT);

  const message = await client.messages.create({
    model: model || DEFAULT_MODEL,
    max_tokens: 4096,
    ...(systemContent ? { system: systemContent } : {}),
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  // Extract text content from response
  const textContent = message.content.find(block => block.type === 'text');
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text content in Claude response');
  }

  const { frontmatter: fmYaml, content } = parseMdxResponse(textContent.text);
  const parsedFm = parseFrontmatter(fmYaml);

  // Build the standardized frontmatter
  const now = new Date().toISOString();
  const frontmatter = {
    title: String(parsedFm.title || repo.name),
    slug: String(parsedFm.slug || repo.name.toLowerCase()),
    publishDate: String(parsedFm.publishDate || now.split('T')[0]),
    description: String(parsedFm.description || repo.description || ''),
    category: 'open-source' as const,
    role: String(parsedFm.role || 'Creator & Maintainer'),
    organization: String(parsedFm.organization || 'Open Source'),
    impactSummary: String(parsedFm.impactSummary || ''),
    scale: Array.isArray(parsedFm.scale) ? parsedFm.scale.map(String) : [],
    primaryTech: Array.isArray(parsedFm.primaryTech) ? parsedFm.primaryTech.map(String) : [],
    contributions: Array.isArray(parsedFm.contributions) ? parsedFm.contributions.map(String) : [],
    outcomes: Array.isArray(parsedFm.outcomes) ? parsedFm.outcomes.map(String) : [],
    tags: Array.isArray(parsedFm.tags) ? parsedFm.tags.map(String) : [],
    duration: String(parsedFm.duration || `${repo.created_at.split('T')[0].slice(0, 4)}-Present`),
    featured: Boolean(parsedFm.featured),
    repository: repo.html_url,
    generated: true as const,
    generatedAt: now,
  };

  return { frontmatter, content };
}

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 1. BLOG COLLECTION
const blog = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: "./src/content/blog" }),
    schema: z.object({
        title: z.string(),
        publishDate: z.coerce.date(),
        description: z.string().max(200, "Keep descriptions short for SEO"),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
        readingTime: z.number().optional(), // In minutes
        canonicalUrl: z.string().url().optional(),
    }),
});

// 2. PROJECTS COLLECTION
const projects = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: "./src/content/projects" }),
    schema: z.object({
        title: z.string(),
        slug: z.string().optional(), // Optional because filename can be slug
        publishDate: z.coerce.date(),
        description: z.string(),
        category: z.enum(['strategic', 'open-source']).default('strategic'),

        // Role & Context
        role: z.string().default("Principal Engineer"),
        organization: z.string(),
        impactSummary: z.string().describe("1-3 sentence high-level impact statement"),

        // Infra/Scale Specifics
        scale: z.union([z.string(), z.array(z.string())]).optional().describe("e.g. '1B+ requests/day', '500+ nodes'"),
        primaryTech: z.array(z.string()).describe("Key tech stack used"),

        // Detailed Lists
        contributions: z.array(z.string()).default([]),
        outcomes: z.array(z.string()).default([]).describe("Measurable results: cost, latency, reliability"),

        // Metadata
        featured: z.boolean().default(false),
        tags: z.array(z.string()).default([]),
        repository: z.string().url().optional(),
        externalLink: z.string().url().optional(),
        duration: z.string().optional().describe("e.g. '2023-01 to 2023-10'"),

        // Media
        heroImage: z.string().optional(),
    }),
});

// 3. EXPERIENCE COLLECTION
// Recommendation: Keep as JSON/YAML for structured data usage (timelines, filtering).
const experience = defineCollection({
    loader: glob({ pattern: '**/*.{yaml,json}', base: "./src/content/experience" }),
    schema: z.object({
        company: z.string(),
        role: z.string(),
        level: z.string().optional().describe("e.g. 'Senior Staff', 'Director'"),
        location: z.string(),

        startDate: z.coerce.date(),
        endDate: z.coerce.date().nullable().optional(), // null = Present

        description: z.string().describe("Short summary of the role"),
        achievements: z.array(z.string()).default([]),
        skills: z.array(z.string()).default([]).describe("Tech and leadership skills used"),
        domainTags: z.array(z.string()).default([]).describe("e.g. 'Networking', 'AI Infra'"),
    }),
});

export const collections = { blog, projects, experience };

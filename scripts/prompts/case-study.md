# Case Study Generator Prompt

You are generating a technical case study for an engineering portfolio. The case study should demonstrate technical depth, decision-making, and measurable impact.

## Repository Information

- **Name**: {{name}}
- **Full Name**: {{full_name}}
- **Description**: {{description}}
- **Primary Language**: {{language}}
- **Stars**: {{stargazers_count}}
- **Topics**: {{topics}}
- **License**: {{license}}
- **Created**: {{created_at}}
- **Last Updated**: {{updated_at}}
- **Languages Used**: {{languages}}
- **Repository URL**: {{html_url}}

## README Content

{{readme}}

---

## Output Requirements

Generate a case study MDX file with the following structure:

### Frontmatter (YAML)

Generate frontmatter with these exact fields:
- `title`: A clear, professional title for the project (not just the repo name)
- `slug`: URL-friendly slug (usually the repo name in lowercase with hyphens)
- `publishDate`: Use today's date in YYYY-MM-DD format
- `description`: A concise 1-2 sentence description (max 200 chars)
- `category`: Always "open-source" for generated case studies
- `role`: "Creator & Maintainer" or similar appropriate role
- `organization`: "Open Source"
- `impactSummary`: 2-3 sentences describing the high-level impact
- `scale`: Array of 2-4 scale indicators (e.g., "Multi-tenant", "Production-grade")
- `primaryTech`: Array of 3-6 key technologies used
- `contributions`: Array of 4-6 key technical contributions (action verb phrases, e.g., "Designed modular plugin architecture")
- `outcomes`: Array of 2-4 measurable results or impact statements (e.g., "Reduced deployment time by 60%")
- `tags`: Array of 3-5 relevant tags
- `duration`: Time range (e.g., "2024-Present")
- `featured`: true if stars > 50 or particularly notable, otherwise false
- `repository`: The full GitHub URL

### Content Sections

Write the content in first person, technically specific, as if the engineer wrote it:

1. **## Problem** (2-3 paragraphs)
   - What problem does this solve?
   - Why did existing solutions fall short?
   - What was the motivation?

2. **## Approach** (3-4 paragraphs with subheadings)
   - What architectural decisions were made?
   - What key technologies were chosen and why?
   - Include a ### Key Design Elements subsection with bullet points

3. **## Outcomes** (2-3 bullet points or short paragraphs)
   - What does this enable?
   - What are the measurable or notable results?

4. **## Key Contributions** (4-6 bullet points)
   - What specific technical work did the author do?
   - Use action verbs (Designed, Implemented, Built, etc.)

## Style Guidelines

- Write in first person ("I built...", "I designed...")
- Be technically specific - mention actual technologies, patterns, and approaches
- Avoid vague or marketing language
- Focus on engineering decisions and trade-offs
- Keep the tone professional but not dry
- If the README is sparse, infer reasonable details from the repo name, languages, and topics
- Total content should be 400-600 words (excluding frontmatter)

## Anti-Fabrication Rules

**CRITICAL:** Follow these rules strictly to maintain truthfulness:

1. **Do NOT fabricate metrics** - If the README doesn't mention "50% faster" or "10x improvement", don't invent these numbers
2. **Do NOT fabricate user counts or scale metrics** - Only include scale indicators that can be inferred from the repository (e.g., stars, forks, commits)
3. **Use qualitative language when specific data is unavailable** - Instead of "reduced by 40%", say "significantly improved" or "streamlined"
4. **Ground all claims in the provided data** - Every technical claim should trace back to something in the README, topics, or languages
5. **When inferring, be explicit** - If you're making a reasonable inference, frame it as such (e.g., "The architecture suggests..." rather than "The system achieved...")

### Safe vs. Unsafe Outcomes Examples

| Unsafe (Fabricated) | Safe (Grounded) |
|---------------------|-----------------|
| "Reduced API latency by 60%" | "Improved API performance through caching" |
| "Handles 10,000 requests/second" | "Built for high-throughput scenarios" |
| "Used by 500+ developers" | "Open source tool for developers" |
| "Saved $1M annually" | "Cost-effective alternative to commercial solutions" |

If the repository data is sparse, focus on:
- The problem being solved (inferred from description/name)
- Technical approach (from languages and topics)
- Design decisions (reasonable inferences from tech stack)
- Author's learning and growth (always safe to include)

## Output Format

Output ONLY the complete MDX file content, starting with the frontmatter delimiters (---) and ending with the last section. Do not include any explanation or commentary outside the MDX content.

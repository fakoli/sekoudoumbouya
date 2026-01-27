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

## Output Format

Output ONLY the complete MDX file content, starting with the frontmatter delimiters (---) and ending with the last section. Do not include any explanation or commentary outside the MDX content.

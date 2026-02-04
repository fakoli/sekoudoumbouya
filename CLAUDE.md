# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build static site to dist/
npm run preview  # Preview production build locally
```

### Case Study Generation

```bash
npm run generate:case-studies  # Generate MDX case studies from GitHub repos
npm run generate:pinned        # Generate from pinned repos only
npm run generate:dry           # Dry run (preview without writing)
npm run generate:clean         # Remove auto-generated case studies
```

Uses Anthropic API via `scripts/generate-case-studies.ts`. Requires `ANTHROPIC_API_KEY` in environment.

### Resume PDF Generation

```bash
npm run generate:resume  # Generate PDF resume from scripts/generate-resume-pdf.js
```

Outputs to `public/Sekou_Doumbouya_Resume_2025.pdf`. Uses PDFKit for optimized, clean PDF output.

## Architecture Overview

This is an Astro 5.0 static portfolio site with Tailwind CSS 4, MDX content, and GitHub Pages deployment.

### Content Collections (src/content/)

Four type-safe content collections defined in `src/content/config.ts`:

- **projects/** - MDX files for case studies. Schema includes `category` ('strategic' | 'open-source'), `primaryTech`, `outcomes`, `contributions`, and `impactSummary`
- **blog/** - MDX blog posts with `draft` support (drafts excluded in production)
- **experience/** - JSON files for work history (structured data for timeline rendering)
- **narratives/** - MDX files for rich experience narratives linked to experience entries via `experienceSlug`. Three pillars: Communication, Behavior, Impact with quantified metrics.

### Dynamic GitHub Data

The homepage fetches live repository data via `src/utils/github.ts`:
- Uses `GITHUB_TOKEN` env var for authenticated API calls (higher rate limits)
- Falls back to hardcoded `fallbackRepos` array in `src/pages/index.astro` when API unavailable
- Pinned repos are defined in `pinnedRepoNames` array in index.astro

### Layout Hierarchy

- `BaseLayout.astro` - HTML wrapper with SEO (SEOHead, JSONLD components)
- `PageLayout.astro` - Extends BaseLayout with nav/footer

### Component Structure (src/components/)

- **common/** - Shared components (SEOHead, JSONLD, etc.)
- **experience/** - Experience page components (ExperienceCard, NarrativeAccordion)
- **icons/** - SVG icon components
- **layout/** - Layout partials (Header, Footer, etc.)

### Environment Configuration

Configure via `.env`:
```ini
SITE=https://sekoudoumbouya.com       # For custom domain
PUBLIC_BASE_PATH=/                     # Root deployment

# OR for GitHub Pages subpath:
SITE=https://fakoli.github.io/
PUBLIC_BASE_PATH=/sekoudoumbouya

GITHUB_TOKEN=...                       # Optional: for live GitHub repo data
```

The `astro.config.mjs` reads these via Vite's `loadEnv()`.

### Site Configuration

Global site and profile settings in `src/config.ts`:
- `SITE_CONFIG.name` - Primary display name used across the site
- `SITE_CONFIG.title` - Short title/tagline shown in metadata and UI
- `SITE_CONFIG.email` - Contact email surfaced in contact sections or CTAs
- `SITE_CONFIG.currentCompany` - Current role or company shown in hero/about sections
- `SITE_CONFIG.githubUsername` - Used for GitHub API calls and repository links
- `SITE_CONFIG.linkedInUsername` - LinkedIn profile username for social links
- `SITE_CONFIG.availableForHire` - Feature flag for "Available for Hire" badge
- `NAV_LINKS` - Structured list of navigation links for the main site header/footer
- `SOCIAL_LINKS` - Derived social/profile links (GitHub, LinkedIn, email)
- `RESUME_PATH` - Path or URL to the resume/CV asset used for download links

## Deployment

Automatic via GitHub Actions (`.github/workflows/astro.yml`) on push to `main`. Builds and deploys to GitHub Pages.

## Gotchas

- **Tailwind v4**: Uses new CSS-first config in `src/styles/global.css`, not `tailwind.config.js`
- **Draft posts**: Set `draft: true` in blog frontmatter to exclude from production builds
- **GitHub rate limits**: Without `GITHUB_TOKEN`, homepage falls back to `fallbackRepos` array
- **Base path**: When deploying to subpath, update both `SITE` and `PUBLIC_BASE_PATH` in `.env`

## CRITICAL: No Embellishment or Fabrication

This is a professional portfolio representing a real person. **Never invent, embellish, or assume metrics, achievements, or claims.**

- **Only use facts explicitly provided by the user** or found in existing content they've approved
- **Never fabricate numbers** (dollar amounts, percentages, timelines, team sizes, region counts)
- **Never assume scope or scale** - if you don't know, ask
- **When writing case studies or achievements**, use only what the user has explicitly stated
- **If content feels "light"**, ask the user for more details rather than making things up
- **Legal risk**: False claims on a portfolio can damage professional reputation and create liability

When in doubt, use placeholders like `[X regions]` or `[specific metric]` and ask the user to fill in accurate numbers.

## Frontend Design Principles

Avoid "AI slop" aesthetics. Make distinctive, creative frontends:

- **Typography**: Use distinctive fonts (avoid Inter, Roboto, Arial, system fonts, Space Grotesk)
- **Color**: Commit to cohesive themes with dominant colors and sharp accents; avoid purple gradients
- **Motion**: CSS-first animations, focus on orchestrated page loads with staggered reveals
- **Backgrounds**: Layer gradients and patterns for depth; avoid flat solid colors

Think outside the box—vary themes, fonts, and aesthetics across designs.

## LLM-Readable Profile (llms.txt)

The site serves an LLM-readable profile at `/llms.txt` via `src/pages/llms.txt.ts`. This file helps AI assistants accurately represent Sekou's professional identity and current availability.

**Keep llms.txt updated when changing:**
- `src/config.ts` — Site config, especially `availableForHire`, `currentRole`, `currentCompany`
- `src/content/experience/` — Work history or role changes
- `src/data/contact.ts` — Contact engagement types or availability framing
- `src/content/projects/` — Major new projects or achievements

The llms.txt file dynamically reads from `SITE_CONFIG` for basic info, but narrative sections (achievements, expertise) are hardcoded and need manual updates when significant changes occur.
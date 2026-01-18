# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build static site to dist/
npm run preview  # Preview production build locally
```

## Architecture Overview

This is an Astro 5.0 static portfolio site with Tailwind CSS 4, MDX content, and GitHub Pages deployment.

### Content Collections (src/content/)

Three type-safe content collections defined in `src/content/config.ts`:

- **projects/** - MDX files for case studies. Schema includes `category` ('strategic' | 'open-source'), `primaryTech`, `outcomes`, `contributions`, and `impactSummary`
- **blog/** - MDX blog posts with `draft` support (drafts excluded in production)
- **experience/** - JSON files for work history (structured data for timeline rendering)

### Dynamic GitHub Data

The homepage fetches live repository data via `src/utils/github.ts`:
- Uses `GITHUB_TOKEN` env var for authenticated API calls (higher rate limits)
- Falls back to hardcoded `fallbackRepos` array in `src/pages/index.astro` when API unavailable
- Pinned repos are defined in `pinnedRepoNames` array in index.astro

### Layout Hierarchy

- `BaseLayout.astro` - HTML wrapper with SEO (SEOHead, JSONLD components)
- `PageLayout.astro` - Extends BaseLayout with nav/footer

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

<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight. Focus on:

Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.

Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.

Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.

Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!
</frontend_aesthetics>
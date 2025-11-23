# Sekou Doumbouya - Portfolio

A high-performance, accessible, and SEO-optimized portfolio website built with [Astro](https://astro.build). Designed to showcase senior engineering leadership, cloud architecture projects, and technical writing.

## 🚀 Tech Stack

- **Framework:** [Astro 5.0](https://astro.build)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Content:** MDX (Markdown + JSX) & Type-safe Content Collections
- **Deployment:** GitHub Pages / Static Hosting
- **SEO:** Automatic sitemap, Open Graph tags, JSON-LD structured data

## 🛠️ Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/fakoli/sekoudoumbouya.git

# Navigate to the project directory
cd sekoudoumbouya

# Install dependencies
npm install
```

### Local Development

Start the dev server at `http://localhost:4321`:

```bash
npm run dev
```

### Building for Production

Build the site to the `dist/` directory:

```bash
npm run build
```

## 📝 Managing Content

This portfolio uses **Astro Content Collections** for type-safe content management.

### Projects (`src/content/projects/`)
Add new case studies as `.md` or `.mdx` files.
- **Required Fields:** `title`, `publishDate`, `description`, `organization`, `role`, `impactSummary`, `primaryTech`
- **Optional:** `featured` (boolean), `scale`, `outcomes`, `contributions`

### Blog (`src/content/blog/`)
Add new articles as `.md` or `.mdx` files.
- **Required Fields:** `title`, `publishDate`, `description`
- **Features:** Supports draft mode (`draft: true`)

### Experience (`src/content/experience/`)
Manage work history as JSON files for easy data portability.

## 🌍 Deployment & Configuration

The site is configured to support both root-level domains (e.g., `sekoudoumbouya.com`) and subpath deployments (e.g., `username.github.io/repo`).

### Environment Variables

Create a `.env` file in the root directory to configure the build environment:

```ini
# For Custom Domain (Root)
SITE=https://sekoudoumbouya.com
PUBLIC_BASE_PATH=/

# For GitHub Pages (Subpath)
SITE=https://fakoli.github.io/
PUBLIC_BASE_PATH=/sekoudoumbouya
```

### GitHub Pages

The project includes a standard GitHub Actions workflow (if configured) or can be deployed manually. Ensure your repository settings for Pages are pointing to the correct branch/folder.

## 🤖 AI & LLM Optimization

This site includes a `public/llms.txt` file, specifically designed to help AI models (like Claude, ChatGPT, Gemini) accurately parse and summarize your professional profile.

## 📄 License

All rights reserved. Content and design by Sekou Doumbouya.

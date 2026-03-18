# Katalyst Website

Static marketing website for **katalyst.com.my** built with semantic HTML, Tailwind CSS, and lightweight JavaScript. Vite handles local development and production builds. Handlebars partials keep the shared layout consistent, and Vercel serves the static site.

## Tech Stack

- HTML pages at the repository root (`*.html`)
- Tailwind CSS v4 processed via Vite
- Vanilla JavaScript in `assets/js/`
- Handlebars partials for shared header/footer (`partials/`)
- Static asset pipeline for image optimization (`sharp`)
- Vercel static hosting configuration (`vercel.json`)

## Project Structure

```text
.
├── assets/
│   ├── css/
│   │   └── input.css          # Source styles (Tailwind + custom utilities/components)
│   ├── js/
│   │   └── main.js            # Navigation state, menus, interactions, animations
│   └── images/                # Page and component images
├── partials/
│   ├── header.html            # Shared site header (Handlebars partial)
│   └── footer.html            # Shared site footer (Handlebars partial)
├── scripts/
│   ├── check-html.mjs         # SEO + clean link validation checks
│   ├── optimize-images.mjs    # Converts PNG/JPG images to optimized WebP
│   └── sync-layout.mjs        # Legacy layout sync helper (kept for reference)
├── *.html                     # Route pages (served as clean URLs)
├── .prettierrc                # Prettier formatting config (2-space indent)
├── vite.config.js             # Vite build config with Handlebars plugin
├── package.json
└── vercel.json
```

## Prerequisites

- Node.js 18+
- npm

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start local development:

   ```bash
   npm run dev
   ```

   Vite starts a dev server on port `3000` with HMR and Handlebars partial support.

3. Open the site at:

   ```text
   http://localhost:3000
   ```

## Available Scripts

- `npm run dev`: start Vite dev server with live reload (port 3000)
- `npm run build`: production build output to `dist/` via Vite
- `npm run format`: format all HTML/CSS/JS/JSON/MJS files with Prettier (including `partials/`)
- `npm run test`: validate HTML SEO baseline and clean internal links
- `npm run images:optimize`: generate optimized `.webp` files from `.png/.jpg/.jpeg`

## Content and Layout Notes

- Header and footer are Handlebars partials (`partials/header.html`, `partials/footer.html`) injected at build/dev time by `vite-plugin-handlebars`. Use `{{> header}}` and `{{> footer footerClass="..." footerCardClass="..."}}` in page files.
- Keep internal links clean (e.g. `/contact-us`, not `/contact-us.html`).
- Keep JavaScript in `assets/js/`. Avoid inline scripts.
- Active navigation state is resolved in `assets/js/main.js` based on `window.location.pathname`.

## Formatting

This project uses Prettier (config in `.prettierrc`) to enforce consistent formatting:

- 2-space indentation across all HTML, JS, CSS, and config files
- Run `npm run format` before committing to keep diffs clean

## Deployment

This project is configured for Vercel static hosting:

- Vite builds output to `dist/` (set as the Vercel output directory)
- Clean URLs enabled, trailing slash disabled
- Long-lived cache headers on `assets/` (immutable), no-cache on HTML
- Security headers set globally

Deploy by connecting the repository to Vercel or using your existing Vercel pipeline.

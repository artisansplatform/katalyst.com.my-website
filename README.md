# Katalyst Website

Static marketing website for **katalyst.com.my**, built with semantic HTML, Vite, Tailwind/PostCSS, and lightweight JavaScript. The project is optimized for static hosting on Vercel with clean URLs and shared layout partials.

## Tech Stack

- HTML pages at the repository root (`*.html`)
- Vite multi-page app build + dev server
- Tailwind CSS v4 + PostCSS
- Vanilla JavaScript in `assets/js/`
- Static asset pipeline for image optimization (`sharp`)
- Vercel static hosting configuration (`vercel.json`)

## Project Structure

```text
.
├── assets/
│   ├── css/
│   │   ├── input.css      # Source styles (Tailwind + custom utilities/components)
│   ├── js/
│   │   └── main.js        # Navigation state, menus, interactions, animations
│   └── images/            # Page and component images
├── partials/
│   ├── header.html        # Shared site header template
│   └── footer.html        # Shared site footer template
├── scripts/
│   ├── sync-layout.mjs    # Injects shared header/footer into all HTML pages
│   ├── check-html.mjs     # SEO + clean link validation checks
│   └── optimize-images.mjs# Converts PNG/JPG images to optimized WebP
├── *.html                 # Route pages (served as clean URLs)
├── package.json
└── vercel.json
```

## Prerequisites

- Node.js 18+ (recommended)
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

   This starts the Vite dev server on port `3000` and applies shared layout partials in-memory for every HTML page.

3. Open the site at:

   ```text
   http://localhost:3000
   ```

## Available Scripts

- `npm run dev` — run local Vite development server
- `npm run build` — production Vite build for all root HTML pages
- `npm run preview` — preview the production build locally
- `npm run test` — validate HTML SEO baseline and clean internal links
- `npm run format` — format HTML/CSS/JS/JSON/MJS files with Prettier
- `npm run images:optimize` — generate optimized `.webp` files from `.png/.jpg/.jpeg`

## Content and Layout Notes

- Header/footer are sourced from `partials/` and injected during Vite dev/build transforms.
- Keep internal links clean (e.g. `/contact-us`, not `/contact-us.html`).
- Keep JavaScript in `assets/js/` (avoid inline scripts).
- Active navigation state is resolved in `assets/js/main.js` based on `window.location.pathname`.

## Deployment

This project is configured for Vercel static hosting:

- clean URLs enabled
- trailing slash disabled
- security headers set globally

Deploy by connecting the repository to Vercel or using your existing Vercel pipeline.

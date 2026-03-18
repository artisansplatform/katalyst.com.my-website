# Claude Code Guide

See `AGENTS.md` for full project standards. Key points for Claude:

## Writing rules
- Never use em dashes anywhere in the codebase. This includes code comments, docstrings, Markdown, HTML, and strings in JS or any other language. Use commas, periods, colons, or parentheses instead.
- Prefer simple, human language. Avoid robotic phrasing and repetitive sentence patterns.
- Keep explanations concise and practical.
- Write as an experienced developer, not a generic assistant.
- These rules apply to the entire repository. Any violation must be corrected immediately, including in AI generated content.

## Build system
- Dev: `npm run dev` (Vite, port 3000)
- Build: `npm run build` (Vite → `dist/`)
- Header and footer are Handlebars partials. Use `{{> header}}` and `{{> footer footerClass="..." footerCardClass="..."}}` in page files. Never expand them inline.

## Formatting: run before every commit
```bash
npm run format
```
The project enforces 2-space indentation via Prettier (`.prettierrc`). Always run `npm run format` after making changes and before committing. Do not manually adjust indentation or reorder Tailwind classes. Let Prettier handle it. If a third-party diff introduces inconsistent formatting, run `npm run format` to normalize before merging.

## Testing
```bash
npm run test
```
Validates SEO baseline (`title`, `meta[name=description]`, canonical, OpenGraph) and clean internal links (no `.html` extensions) across all pages.

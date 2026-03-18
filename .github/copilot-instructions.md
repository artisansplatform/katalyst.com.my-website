# Copilot Instructions

Use `AGENTS.md` as the source of truth for project standards.

## Writing rules
- Never use em dashes anywhere in the codebase. This includes code comments, docstrings, Markdown, HTML, and strings in JS or any other language. Use commas, periods, colons, or parentheses instead.
- Prefer simple, human language. Avoid robotic phrasing and repetitive sentence patterns.
- Keep explanations concise and practical.
- Write as an experienced developer, not a generic assistant.
- These rules apply to the entire repository. Any violation must be corrected immediately, including in AI generated content.

## Project basics
- Keep the site static and Vercel friendly.
- Maintain clean URLs with no `.html` in internal links.
- Use Handlebars partials for the header and footer in page files.
- Keep JavaScript in `assets/js/`. Avoid inline scripts.
- Run `npm run format` before committing.

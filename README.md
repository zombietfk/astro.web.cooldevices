# Monokai Blog (Astro Theme)

A simple Astro starter/theme matching the mockup:
- Solid colors only (no gradients)
- Left sidebar navigation split into categories
- Unified orange header accent (matches “Latest Posts & Updates”)

## Quick start
```bash
npm install
npm run dev
```

## Structure
- `src/layouts/BaseLayout.astro` – base page layout (sidebar + main)
- `src/components/*` – sidebar, post cards, section header, etc.
- `src/lib/nav.ts` – builds sidebar sections from `src/pages/**` at build time
- `src/styles/*` – `variables.css`, `fonts.css`, `global.css`
- `src/pages/*` – example pages & category files (flat files, no per-page directories)

## Add pages
Create a new file under one of the category folders, e.g.:
- `src/pages/tutorials/my-new-post.astro`
- `src/pages/ideas/something.astro`
- `src/pages/other/resources.astro`

It will automatically appear in the sidebar at build time.

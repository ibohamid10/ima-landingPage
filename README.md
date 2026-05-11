# IMA Landing Page

AJIONE creator partnerships landing page. Built with **Next.js 15** (App Router) + **Tailwind CSS** + **Framer Motion**, exported as a fully static site.

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # produces ./out
```

## Deploy (Cloudflare Pages)

Update the Pages project settings to:

- **Framework preset:** Next.js (Static HTML Export)
- **Build command:** `npm run build`
- **Build output directory:** `out`
- **Node version:** `20` (set via env var `NODE_VERSION=20`)

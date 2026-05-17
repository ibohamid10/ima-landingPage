# AJIONE — Landing Page

The marketing site for AJIONE, a creator-brand partnership broker.
Single-page editorial layout with a contact form backed by a
Cloudflare Worker that fires transactional email via Resend.

## Stack

- **Next.js 15** (App Router, static export)
- **TypeScript**, **Framer Motion**, **GSAP** (lazy-loaded)
- **Cloudflare Pages** for the static site
- **Cloudflare Worker** at `/api/contact` for the form submission
- **Resend** for the partnership inbox and branded auto-reply
- **Umami** (optional) for cookieless analytics

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # produces ./out
```

`npm run dev` serves the Next.js app only. The contact-form Worker
is not invoked locally — to test it, deploy and submit against the
preview URL, or run `wrangler dev` separately.

## Deploy

### Cloudflare Pages (static site)

- **Framework preset:** Next.js (Static HTML Export)
- **Build command:** `npm run build`
- **Build output directory:** `out`
- **Node version:** `20` (env var `NODE_VERSION=20`)

A push to `main` triggers an automatic Pages build + deploy.

### Worker (`/api/contact`)

Configured in [wrangler.toml](wrangler.toml). Deploy with
`wrangler deploy` from the `worker/` source. The Pages project is
wired to the Worker via Functions routing.

Required secret on the Worker environment:

```
RESEND_API_KEY      # from resend.com — sends notification + auto-reply
```

## Environment variables

Optional, on the Pages build:

```
NEXT_PUBLIC_UMAMI_SRC          # Umami script src, e.g. https://analytics.ajione.com/script.js
NEXT_PUBLIC_UMAMI_WEBSITE_ID   # Umami website ID
```

If either is unset, the analytics script is omitted entirely and
the site ships without any third-party tracking calls.

## Project layout

```
app/                 # Next.js routes (page, layout, legal pages,
                     #   robots.ts, sitemap.ts, opengraph-image.tsx)
components/          # React components for each section
public/              # Logo, fonts (Geist), hero reference images
worker/              # Cloudflare Worker source — /api/contact
```

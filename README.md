# Acteamo — Nuxt SSG landing site

A statically generated (`nuxt generate`) marketing site for **Acteamo**, built
with **Nuxt 4**, **Tailwind CSS** and **Nuxt Content**, and deployed to
**GitHub Pages**.

- The landing page is code-split into reusable Vue components.
- All page/blog copy lives in Markdown files under `content/`.
- Fully static output — no server required.

## Project structure

```
app/
  components/
    AppHeader.vue        # sticky nav + mobile menu
    AppFooter.vue
    AppIcon.vue          # <AppIcon name="shield" />
    IconSprite.vue       # shared inline SVG symbols
    StylePanel.vue       # live font/colour controls (the "Aa" button)
    content/             # components usable inside Markdown (MDC)
      Callout.vue        # ::callout
      ButtonLink.vue     # :button-link[Label]{to=...}
      Youtube.vue        # ::youtube{id="..."}
      ProseImg.vue       # base-URL-aware Markdown images
    landing/             # landing page sections (auto-imported as Landing*)
      HeroSection.vue        # interactive capacity demo + focus timer
      LeftOutSection.vue
      HowItWorksSection.vue
      ProductShowcase.vue    # interactive pomodoro timer
      TrustSection.vue
      FinalCta.vue
  composables/seo.ts     # useSeo() + useJsonLd() SEO/AEO helpers
  layouts/default.vue    # header + <slot/> + footer + site-wide JSON-LD
  pages/
    index.vue            # landing page (composed from landing/* components)
    blog/index.vue       # blog listing
    blog/[...slug].vue   # a single blog post
    [...slug].vue        # any standalone Markdown page
  plugins/reveal.ts      # v-reveal scroll-in directive
  assets/css/main.css    # design tokens + Tailwind layers
content/
  about.md               # example standalone page  ->  /about
  blog/
    *.md                 # example blog posts        ->  /blog/<name>
public/
  robots.txt             # search engine directives + sitemap link
  images/                # Markdown / content images
```

## Adding content

Content is driven entirely by Markdown — no code changes needed.

- **New blog post:** add a `.md` file inside `content/blog/`. It appears on
  `/blog` and gets its own page at `/blog/<filename>`.
- **New page:** add a `.md` file anywhere in `content/` **outside** `blog/`.
  For example `content/pricing.md` becomes `/pricing`.

Recommended front matter:

```md
---
title: Why we removed due dates      # required
description: A short summary.          # used for cards + SEO + social preview
date: 2025-01-30                       # blog posts: controls ordering
updatedAt: 2025-02-01                  # optional: dateModified in schema
author: The Acteamo Team               # blog posts (optional)
tag: Philosophy                        # primary tag shown on cards
tags: [calm productivity, planning]    # keywords for SEO / article:tag
image: /images/my-cover.png            # og:image + BlogPosting image (optional)
---

Your Markdown content here.
```

## Rich content (images & components)

Markdown supports **MDC**, so you can drop images and Vue components into any
`.md` file.

**Images** — put files in `public/` and reference them from the root. Paths are
automatically resolved to the correct base URL (works on custom domains and
GitHub project pages):

```md
![A friendly alt text](/images/capacity-selector.svg)
```

**Components** — available out of the box (defined in `app/components/content/`):

```md
::callout{type="tip" title="Heads up"}
A highlighted note. type = tip | info | warning | success
::

:button-link[Start for free]{to="https://my.acteamo.com/auth/register"}
:button-link[Read the blog]{to="/blog" variant="secondary"}

::youtube{id="dQw4w9WgXcQ" title="Acteamo demo"}
::
```

See `content/blog/writing-rich-posts.md` for a live reference. Add your own
component by dropping a `.vue` file in `app/components/content/` — its PascalCase
name maps to the lowercase MDC tag (e.g. `Callout.vue` → `::callout`).

## SEO & AEO

Every route ships full metadata and structured data:

- **Meta:** title (with `· Acteamo` suffix), description, keywords, canonical,
  Open Graph (`og:title/description/image/url/type`) and Twitter Card tags, plus
  `robots`, `theme-color` and locale defaults.
- **Structured data (JSON-LD):** `Organization` + `WebSite` site-wide, a
  `SoftwareApplication` and an **`FAQPage`** on the homepage (for answer
  engines), `BlogPosting` + `BreadcrumbList` on posts, and `WebPage` +
  `BreadcrumbList` on pages.
- **`sitemap.xml`** (auto-generated from the prerendered routes) and
  **`robots.txt`**.

Per-page SEO is set with the `useSeo()` / `useJsonLd()` helpers in
`app/composables/seo.ts`. Social preview images default to the brand image and
can be overridden per post via the `image` front-matter field.

Canonical, Open Graph and sitemap URLs use the site origin from
`NUXT_PUBLIC_SITE_URL` (defaults to `https://www.acteamo.com`). Set it per
environment, or via a `SITE_URL` repository variable for the deploy workflow.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

## Static build

```bash
npm run generate            # outputs to .output/public
npx serve .output/public    # preview the static build
```

## Deployment (GitHub Pages)

Deployment is automated by `.github/workflows/deploy.yml`:

1. In the repository, go to **Settings → Pages** and set **Source** to
   **GitHub Actions**.
2. Push to `main`. The workflow builds the site and publishes it.

The workflow passes the correct base path to Nuxt via `NUXT_APP_BASE_URL`
(e.g. `/<repository-name>/` for project pages), so asset and link URLs resolve
correctly whether the site is served from a user/org page or a project page. A
`.nojekyll` file is included so GitHub Pages serves the `_nuxt/` asset folder.

> The original single-file design is kept for reference in
> `.design-reference/index.html`.

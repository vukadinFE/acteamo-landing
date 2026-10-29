// https://nuxt.com/docs/api/configuration/nuxt-config
import { readdirSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'

// Discover every markdown file outside content/blog so each standalone page
// is prerendered for the static build (the blog index already links its posts).
function discoverPageRoutes(): string[] {
  const contentDir = join(process.cwd(), 'content')
  if (!existsSync(contentDir)) return []
  const routes: string[] = []

  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name)
      const rel = relative(contentDir, full)
      if (entry.isDirectory()) {
        if (rel === 'blog') continue
        walk(full)
      } else if (entry.name.endsWith('.md')) {
        const slug = rel
          .replace(/\.md$/, '')
          .split('/')
          .map((part) => part.replace(/^\d+\./, ''))
          .join('/')
        routes.push(slug === 'index' ? '/' : `/${slug.replace(/\/index$/, '')}`)
      }
    }
  }

  walk(contentDir)
  return routes
}

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
  ],

  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',

  css: ['~/assets/css/main.css'],

  // Canonical public origin, used for canonical URLs, Open Graph, JSON-LD and
  // the sitemap. Override per environment via NUXT_PUBLIC_SITE_URL.
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.acteamo.com',
    name: 'Acteamo',
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.acteamo.com',
    },
  },

  // Static Site Generation for GitHub Pages.
  // The base URL is injected at build time via the NUXT_APP_BASE_URL env var
  // (e.g. "/<repository-name>/" for project pages). Defaults to "/".
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      htmlAttrs: { lang: 'en', class: 'js' },
      title: 'Acteamo – Stress-free daily planning',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Tell Acteamo how much capacity you have today and get a list of tasks that fits. No due dates, no red notifications. Gentle, AI-assisted planning. Swiss-hosted.',
        },
        {
          name: 'keywords',
          content:
            'stress-free planning, capacity planning, gentle productivity, to-do app, pomodoro, no due dates, ADHD friendly planner, Swiss-hosted, GDPR, task manager',
        },
        { name: 'author', content: 'Acteamo' },
        { name: 'application-name', content: 'Acteamo' },
        { name: 'apple-mobile-web-app-title', content: 'Acteamo' },
        { name: 'theme-color', content: '#0867cc' },
        { name: 'format-detection', content: 'telephone=no' },
        {
          name: 'robots',
          content:
            'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        },
        // Open Graph defaults (overridden per page).
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Acteamo' },
        { property: 'og:locale', content: 'en_US' },
        // Twitter defaults (overridden per page).
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@acteamo' },
        { name: 'twitter:creator', content: '@acteamo' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/images/mark.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Sora:wght@400;600;700;800&family=Fraunces:wght@400;600;700&display=swap',
        },
      ],
    },
  },

  sitemap: {
    // Blog posts and standalone pages are prerendered, so the sitemap module
    // discovers them automatically from the generated routes.
    autoLastmod: true,
  },

  content: {
    build: {
      markdown: {
        // Dark Shiki theme so highlighted tokens are light on the dark
        // code-block background (otherwise code is dark-on-dark / invisible).
        highlight: {
          theme: 'github-dark',
        },
        toc: { depth: 3 },
      },
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/blog', ...discoverPageRoutes()],
    },
  },
})

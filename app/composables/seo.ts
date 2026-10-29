// Centralised SEO / AEO helpers.
//
// - `absoluteUrl` builds fully-qualified URLs for canonical + Open Graph tags.
// - `useSeo` sets title, description, canonical, Open Graph and Twitter meta.
// - `useJsonLd` injects JSON-LD structured data for rich results / answer engines.

const DEFAULT_OG_IMAGE = 'https://www.acteamo.com/wp-content/uploads/2025/02/site-screen.png'

export function useSiteUrl(): string {
  const base = (useRuntimeConfig().public.siteUrl as string) || 'https://www.acteamo.com'
  return base.replace(/\/$/, '')
}

export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//.test(path)) return path
  const site = useSiteUrl()
  return site + (path.startsWith('/') ? path : `/${path}`)
}

export interface SeoOptions {
  title: string
  description?: string
  /** Relative or absolute image URL used for og:image / twitter:image. */
  image?: string
  imageAlt?: string
  type?: 'website' | 'article' | 'profile'
  /** Keywords / tags for this document. */
  tags?: string[]
  publishedAt?: string
  modifiedAt?: string
  author?: string
  /** Set to true to hide the page from search engines. */
  noindex?: boolean
}

export function useSeo(options: SeoOptions) {
  const route = useRoute()
  const canonical = absoluteUrl(route.path)
  const image = absoluteUrl(options.image || DEFAULT_OG_IMAGE)
  const type = options.type || 'website'
  const description = options.description

  useSeoMeta({
    title: options.title,
    description,
    ogTitle: options.title,
    ogDescription: description,
    ogType: type,
    ogUrl: canonical,
    ogImage: image,
    ogImageAlt: options.imageAlt || options.title,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogSiteName: 'Acteamo',
    twitterCard: 'summary_large_image',
    twitterTitle: options.title,
    twitterDescription: description,
    twitterImage: image,
    twitterImageAlt: options.imageAlt || options.title,
    ...(type === 'article'
      ? {
          articlePublishedTime: options.publishedAt,
          articleModifiedTime: options.modifiedAt || options.publishedAt,
          articleAuthor: options.author ? [options.author] : undefined,
          articleTag: options.tags,
        }
      : {}),
  })

  const meta = [] as { name: string; content: string }[]
  if (options.tags?.length) meta.push({ name: 'keywords', content: options.tags.join(', ') })
  if (options.noindex) meta.push({ name: 'robots', content: 'noindex, nofollow' })

  useHead({
    link: [{ rel: 'canonical', href: canonical }],
    meta,
  })
}

/** Inject one or more JSON-LD objects as <script type="application/ld+json">. */
export function useJsonLd(data: Record<string, unknown> | Record<string, unknown>[]) {
  const items = Array.isArray(data) ? data : [data]
  useHead({
    script: items.map((item) => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(item),
    })),
  })
}

/** Breadcrumb JSON-LD helper. */
export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

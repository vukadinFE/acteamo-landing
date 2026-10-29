<script setup lang="ts">
const route = useRoute()
const siteUrl = useSiteUrl()

const { data: page } = await useAsyncData(`page-${route.path}`, () =>
  queryCollection('pages').path(route.path).first(),
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeo({
  title: page.value.title,
  description: page.value.description,
  image: (page.value as { image?: string }).image,
  imageAlt: page.value.title,
  type: 'website',
})

const trail = computed(() => {
  const parts = route.path.split('/').filter(Boolean)
  const crumbs = [{ name: 'Home', path: '/' }]
  let acc = ''
  for (const part of parts) {
    acc += `/${part}`
    crumbs.push({ name: part.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()), path: acc })
  }
  return crumbs
})

useJsonLd([
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.value.title,
    description: page.value.description,
    url: absoluteUrl(route.path),
    inLanguage: 'en',
    isPartOf: { '@id': `${siteUrl}/#website` },
  },
  breadcrumbLd(trail.value),
])
</script>

<template>
  <article v-if="page" class="pt-14 pb-[120px]">
    <div class="wrap max-w-[760px]">
      <h1
        class="m-0 leading-[1.05] tracking-[-0.04em]"
        style="font-size: calc(clamp(2rem, 5vw, 3.2rem) * var(--hs))"
      >
        {{ page.title }}
      </h1>

      <p v-if="page.description" class="text-mut text-xl mt-5 leading-[1.5]">
        {{ page.description }}
      </p>

      <hr class="my-10 border-0 border-t border-line" />

      <div class="prose prose-lg max-w-none prose-headings:font-heading prose-headings:tracking-[-0.03em] prose-a:text-ac prose-a:no-underline hover:prose-a:underline prose-pre:bg-ink prose-pre:text-[#e1e4e8] prose-pre:rounded-[14px] prose-pre:border prose-pre:border-line/15">
        <ContentRenderer :value="page" />
      </div>
    </div>
  </article>
</template>

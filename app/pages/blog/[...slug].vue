<script setup lang="ts">
const route = useRoute()
const siteUrl = useSiteUrl()

const { data: post } = await useAsyncData(`blog-${route.path}`, () =>
  queryCollection('blog').path(route.path).first(),
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

function formatDate(date?: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const tags = computed<string[]>(() => {
  const t = (post.value as { tags?: string[]; tag?: string })?.tags
  if (t?.length) return t
  const single = (post.value as { tag?: string })?.tag
  return single ? [single] : []
})

useSeo({
  title: post.value.title,
  description: post.value.description,
  image: (post.value as { image?: string }).image,
  imageAlt: post.value.title,
  type: 'article',
  tags: tags.value,
  publishedAt: post.value.date,
  modifiedAt: (post.value as { updatedAt?: string }).updatedAt || post.value.date,
  author: post.value.author || 'Acteamo',
})

useJsonLd([
  {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.value.title,
    description: post.value.description,
    image: absoluteUrl(
      (post.value as { image?: string }).image ||
        'https://www.acteamo.com/wp-content/uploads/2025/02/site-screen.png',
    ),
    datePublished: post.value.date,
    dateModified: (post.value as { updatedAt?: string }).updatedAt || post.value.date,
    keywords: tags.value.join(', ') || undefined,
    author: { '@type': 'Organization', name: post.value.author || 'Acteamo' },
    publisher: { '@id': `${siteUrl}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(route.path) },
    inLanguage: 'en',
  },
  breadcrumbLd([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.value.title, path: route.path },
  ]),
])
</script>

<template>
  <article v-if="post" class="pt-14 pb-[120px]">
    <div class="wrap max-w-[760px]">
      <NuxtLink
        to="/blog"
        class="inline-flex items-center gap-2 text-mut font-medium text-[15px] no-underline hover:text-ink mb-8"
      >
        <span class="rotate-180"><AppIcon name="arrow" /></span> All posts
      </NuxtLink>

      <div class="flex items-center gap-3 text-[13px] text-mut mb-4">
        <span v-if="post.tag" class="tag">{{ post.tag }}</span>
        <time v-if="post.date">{{ formatDate(post.date) }}</time>
        <span v-if="post.author">· {{ post.author }}</span>
      </div>

      <h1
        class="m-0 leading-[1.05] tracking-[-0.04em]"
        style="font-size: calc(clamp(2rem, 5vw, 3.2rem) * var(--hs))"
      >
        {{ post.title }}
      </h1>

      <p v-if="post.description" class="text-mut text-xl mt-5 leading-[1.5]">
        {{ post.description }}
      </p>

      <hr class="my-10 border-0 border-t border-line" />

      <div class="prose prose-lg max-w-none prose-headings:font-heading prose-headings:tracking-[-0.03em] prose-a:text-ac prose-a:no-underline hover:prose-a:underline prose-pre:bg-ink prose-pre:text-[#e1e4e8] prose-pre:rounded-[14px] prose-pre:border prose-pre:border-line/15">
        <ContentRenderer :value="post" />
      </div>
    </div>
  </article>
</template>

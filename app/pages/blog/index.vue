<script setup lang="ts">
const siteUrl = useSiteUrl()

const { data: posts } = await useAsyncData('blog-list', () =>
  queryCollection('blog').order('date', 'DESC').all(),
)

function formatDate(date?: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

useSeo({
  title: 'Blog – Acteamo',
  description:
    'Notes on stress-free planning, capacity-based productivity and building Acteamo. Calm, practical ideas for getting things done without the pressure.',
  type: 'website',
  tags: ['productivity blog', 'gentle productivity', 'planning', 'Acteamo'],
})

useJsonLd([
  {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${siteUrl}/blog#blog`,
    name: 'The Acteamo blog',
    description:
      'Notes on gentle productivity, capacity-based planning, and what we’re building.',
    url: `${siteUrl}/blog`,
    publisher: { '@id': `${siteUrl}/#organization` },
    blogPost: (posts.value || []).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: absoluteUrl(post.path),
      author: { '@type': 'Organization', name: post.author || 'Acteamo' },
    })),
  },
  breadcrumbLd([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
  ]),
])
</script>

<template>
  <div>
    <section class="hero-dots relative text-center pt-16 pb-6">
      <div class="wrap relative animate-rise">
        <span class="pill mb-[30px]"><i />The Acteamo blog</span>
        <h1
          class="m-0 leading-[0.98] tracking-[-0.05em]"
          style="font-size: calc(clamp(2.5rem, 6.2vw, 4.4rem) * var(--hs))"
        >
          Planning, <span class="block text-ac">without the pressure.</span>
        </h1>
        <p
          class="text-mut max-w-[40em] mx-auto mt-7 leading-[1.5]"
          style="font-size: clamp(1.05rem, 2vw, 1.3rem)"
        >
          Notes on gentle productivity, capacity-based planning, and what we’re building.
        </p>
      </div>
    </section>

    <section class="pt-10 pb-[120px]">
      <div class="wrap">
        <div
          v-if="posts && posts.length"
          class="grid gap-4"
          style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))"
        >
          <NuxtLink
            v-for="(post, i) in posts"
            :key="post.path"
            v-reveal="i"
            :to="post.path"
            class="group bg-white border border-line rounded-[26px] p-8 flex flex-col gap-4 no-underline shadow-card hover:border-ac transition-colors"
          >
            <div class="flex items-center gap-3 text-[13px] text-mut">
              <span v-if="post.tag || post.tags?.length" class="tag">
                {{ post.tag || post.tags?.[0] }}
              </span>
              <time v-if="post.date" :datetime="post.date">{{ formatDate(post.date) }}</time>
            </div>
            <h2
              class="m-0 tracking-[-0.03em] leading-[1.15] text-ink"
              style="font-size: calc(1.5rem * var(--hs))"
            >
              {{ post.title }}
            </h2>
            <p v-if="post.description" class="m-0 text-mut text-[15.5px] flex-1">
              {{ post.description }}
            </p>
            <span class="inline-flex items-center gap-2 text-ac font-semibold text-[15px]">
              Read more <AppIcon name="arrow" />
            </span>
          </NuxtLink>
        </div>

        <p v-else class="text-center text-mut">No posts yet. Check back soon.</p>
      </div>
    </section>
  </div>
</template>

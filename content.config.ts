import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // Any markdown file inside content/blog becomes a blog post.
    blog: defineCollection({
      type: 'page',
      source: 'blog/**',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.string().optional(),
        updatedAt: z.string().optional(),
        author: z.string().optional(),
        tag: z.string().optional(),
        tags: z.array(z.string()).optional(),
        image: z.string().optional(),
      }),
    }),

    // Any markdown file outside content/blog becomes a standalone page.
    pages: defineCollection({
      type: 'page',
      source: {
        include: '**',
        exclude: ['blog/**'],
      },
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        image: z.string().optional(),
      }),
    }),
  },
})

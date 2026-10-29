<script setup lang="ts">
import { withBase } from 'ufo'

const props = defineProps<{
  src?: string
  alt?: string
  width?: string | number
  height?: string | number
  caption?: string
}>()

const baseURL = useRuntimeConfig().app.baseURL

// Leave absolute / external / data URLs untouched; prefix local paths with the
// app base URL so images resolve under a sub-path (e.g. GitHub project pages).
const resolved = computed(() => {
  const src = props.src || ''
  if (/^(https?:)?\/\//.test(src) || src.startsWith('data:')) return src
  return withBase(src, baseURL)
})
</script>

<template>
  <figure class="my-8">
    <img
      :src="resolved"
      :alt="alt"
      :width="width"
      :height="height"
      loading="lazy"
      decoding="async"
      class="w-full rounded-[18px] border border-line"
    />
    <figcaption v-if="caption || alt" class="mt-2 text-center text-sm text-mut">
      {{ caption || alt }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
const props = defineProps<{ id: string; title?: string }>()
const src = computed(() => `https://www.youtube-nocookie.com/embed/${props.id}`)
</script>

<template>
  <div class="not-prose my-8 overflow-hidden rounded-[18px] border border-line">
    <div class="relative w-full" style="aspect-ratio: 16 / 9">
      <iframe
        class="absolute inset-0 h-full w-full"
        :src="src"
        :title="title || 'YouTube video'"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        loading="lazy"
      />
    </div>
  </div>
</template>

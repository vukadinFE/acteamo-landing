<script setup lang="ts">
// Runtime title template (functions here work, unlike in nuxt.config head).
useHead({
  titleTemplate: (title?: string) =>
    title && !/acteamo/i.test(title)
      ? `${title} · Acteamo`
      : title || 'Acteamo – Stress-free daily planning',
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

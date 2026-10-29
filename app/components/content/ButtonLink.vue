<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to?: string
    variant?: 'primary' | 'secondary'
  }>(),
  { to: '#', variant: 'primary' },
)

const external = computed(() => /^https?:\/\//.test(props.to))
const cls = computed(() => ['btn', props.variant === 'secondary' ? 'btn-s' : 'btn-p', 'no-prose'])
</script>

<template>
  <span class="not-prose inline-block my-1 me-3 align-middle">
    <a v-if="external" :href="to" :class="cls" target="_blank" rel="noopener">
      <slot />
    </a>
    <NuxtLink v-else :to="to" :class="cls">
      <slot />
    </NuxtLink>
  </span>
</template>

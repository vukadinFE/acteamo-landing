<script setup lang="ts">
const props = defineProps<{
  name: string
  /**
   * Icon size. Numbers are treated as px; strings are used as-is
   * (e.g. "1em", "1.25rem", "20px"). When omitted the icon scales with the
   * surrounding font-size (1em) via the shared `svg.i` styles.
   */
  size?: string | number
}>()

const dimension = computed(() => {
  if (props.size === undefined || props.size === null) return undefined
  return typeof props.size === 'number' ? `${props.size}px` : props.size
})
</script>

<template>
  <svg
    class="i"
    :style="dimension ? { width: dimension, height: dimension } : undefined"
  >
    <use :href="`#${name}`" />
  </svg>
</template>

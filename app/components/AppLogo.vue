<script setup lang="ts">
import { withBase } from 'ufo'

const props = withDefaults(defineProps<{ mark?: boolean }>(), { mark: false })

// Prefix the app base URL so the logo resolves under a sub-path
// (e.g. GitHub project pages).
const src = computed(() =>
  withBase(props.mark ? '/images/mark.svg' : '/images/logo.svg', useRuntimeConfig().app.baseURL),
)
</script>

<template>
  <img
    :src="src"
    alt="Acteamo"
    :width="mark ? 26 : 140"
    :height="mark ? 20 : 40"
    decoding="async"
  />
</template>

<script setup lang="ts">
const props = defineProps<{ error: { statusCode?: number; statusMessage?: string } }>()

useHead({ htmlAttrs: { lang: 'en', class: 'js' } })

function handleError() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div>
    <IconSprite />
    <AppHeader />
    <main id="main" class="hero-dots relative text-center pt-24 pb-[160px]">
      <div class="wrap relative">
        <span class="pill mb-[30px]"><i />{{ props.error?.statusCode || 404 }}</span>
        <h1
          class="m-0 leading-[0.98] tracking-[-0.05em]"
          style="font-size: calc(clamp(2.5rem, 7vw, 5rem) * var(--hs))"
        >
          This page <span class="block text-ac">wandered off.</span>
        </h1>
        <p class="text-mut max-w-[36em] mx-auto mt-7 text-lg">
          {{ props.error?.statusMessage || 'We couldn’t find what you were looking for.' }}
        </p>
        <button class="btn btn-p mt-9" @click="handleError">Back to home</button>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

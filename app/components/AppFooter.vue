<script setup lang="ts">
const links = [
  { label: 'Blog', to: '/blog', external: false },
  { label: 'Contact', to: '/contact', external: false },
  { label: 'iOS app', to: 'https://apps.apple.com/us/app/acteamo/id6744367554', external: true },
  {
    label: 'Android app',
    to: 'https://play.google.com/store/apps/details?id=com.acteamo.rn',
    external: true,
  },
  { label: 'Impressum', to: '/impressum', external: false },
  { label: 'Privacy', to: '/privacy', external: false },
  { label: 'Terms', to: '/terms-of-use', external: false },
]
</script>

<template>
  <footer class="border-t border-line pt-9 pb-[52px] text-[14.5px] text-mut">
    <div class="wrap flex flex-wrap items-center justify-between gap-y-[22px] gap-x-11">
      <NuxtLink
        to="/"
        class="flex items-center no-underline"
        aria-label="Acteamo home"
      >
        <AppLogo class="h-6 w-auto" />
      </NuxtLink>

      <ul class="flex flex-wrap gap-y-2 gap-x-[22px] list-none m-0 p-0">
        <li v-for="link in links" :key="link.label">
          <NuxtLink
            v-if="!link.external"
            :to="link.to"
            class="no-underline hover:text-ink hover:underline"
          >
            {{ link.label }}
          </NuxtLink>
          <a v-else :href="link.to" class="no-underline hover:text-ink hover:underline">
            {{ link.label }}
          </a>
        </li>
      </ul>

      <span>© Acteamo</span>
    </div>
  </footer>
</template>

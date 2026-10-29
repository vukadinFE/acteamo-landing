<script setup lang="ts">
const siteUrl = useSiteUrl()

// Site-wide structured data: who publishes this site and the site itself.
useJsonLd([
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'Acteamo',
    url: `${siteUrl}/`,
    logo: absoluteUrl('/images/logo.svg'),
    description:
      'Acteamo is a stress-free daily planner. Set your capacity and get an AI-suggested list of tasks that fits — no due dates, no red alerts. Swiss-hosted and GDPR-compliant.',
    foundingLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressCountry: 'CH' },
    },
    sameAs: [
      'https://apps.apple.com/us/app/acteamo/id6744367554',
      'https://play.google.com/store/apps/details?id=com.acteamo.rn',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: `${siteUrl}/`,
    name: 'Acteamo',
    inLanguage: 'en',
    description: 'Stress-free daily planning. Plan the day you can actually do.',
    publisher: { '@id': `${siteUrl}/#organization` },
  },
])
</script>

<template>
  <div>
    <IconSprite />
    <a
      class="skip absolute left-[-999px] top-2 bg-ink text-white px-[14px] py-2 rounded-lg z-[99] focus:left-2"
      href="#main"
    >
      Skip to content
    </a>

    <AppHeader />

    <main id="main">
      <slot />
    </main>

    <AppFooter />

    <ClientOnly>
      <StylePanel />
    </ClientOnly>
  </div>
</template>

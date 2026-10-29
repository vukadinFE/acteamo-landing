<script setup lang="ts">
const siteUrl = useSiteUrl()

useSeo({
  title: 'Acteamo – Plan the day you can actually do.',
  description:
    'Set your capacity and Acteamo suggests a list of tasks that fits. No due dates, no red alerts, no guilt. Gentle, AI-assisted daily planning — Swiss-hosted and GDPR-compliant.',
  type: 'website',
  imageAlt: 'The Acteamo app showing a capacity-based task list for today',
  tags: [
    'daily planner',
    'capacity planning',
    'stress-free productivity',
    'no due dates',
    'pomodoro',
    'Swiss-hosted',
  ],
})

// AEO: concise question/answer pairs so answer engines can quote Acteamo.
const faq = [
  {
    q: 'What is Acteamo?',
    a: 'Acteamo is a stress-free daily planner. You tell it how much capacity you have today and it suggests a list of tasks that fits — instead of showing everything you have ever promised.',
  },
  {
    q: 'Does Acteamo use due dates?',
    a: 'No. Acteamo has no due dates and nothing is ever overdue. Tasks simply wait until you are ready for them, so there are no red badges or guilt.',
  },
  {
    q: 'How does capacity-based planning work?',
    a: 'Each day you pick your capacity — Drained, Low, Good or Charged. Acteamo then proposes a short list of tasks that matches your energy, which you can finish without pressure.',
  },
  {
    q: 'Where is Acteamo hosted and is it GDPR-compliant?',
    a: 'Acteamo is hosted in a top-tier Swiss data center that is ISO 27001 certified, and it is fully GDPR-compliant.',
  },
  {
    q: 'Is there a focus timer?',
    a: 'Yes. Acteamo includes a built-in pomodoro timer that guides you between focus and rest so you can work in a calm, steady rhythm.',
  },
]

useJsonLd([
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Acteamo',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web, iOS, Android',
    url: `${siteUrl}/`,
    description:
      'Stress-free daily planning. Set your capacity, get a list that fits. No due dates, no red alerts.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: { '@id': `${siteUrl}/#organization` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  },
])
</script>

<template>
  <div>
    <LandingHeroSection />
    <LandingLeftOutSection />
    <LandingHowItWorksSection />
    <LandingProductShowcase />
    <LandingTrustSection />
    <LandingFinalCta />
  </div>
</template>

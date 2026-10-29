<script setup lang="ts">
const facts = [
  {
    title: 'Swiss-hosted',
    text: 'Stored in a top-tier Swiss data center, where some Swiss banks also host their servers.',
  },
  { title: 'GDPR-compliant', text: 'Acteamo is fully GDPR compliant.' },
  {
    title: 'Infrastructure we own',
    text: 'Regular backups on our own servers. The data center is ISO 27001 certified.',
  },
]
</script>

<template>
  <section
    id="privacy"
    class="trust on-dark mx-3 rounded-[36px] py-[120px]"
    style="background: var(--ink); color: #f4f4f2"
    aria-labelledby="trust-h"
  >
    <div class="wrap tg grid items-center gap-20" style="grid-template-columns: 1.1fr 1fr">
      <div>
        <div class="swiss mb-8" aria-hidden="true" />
        <h2
          id="trust-h"
          class="m-0 leading-none tracking-[-0.05em]"
          style="font-size: calc(clamp(2.4rem, 6vw, 4.8rem) * var(--hs))"
        >
          Hosted in <em class="not-italic" style="color: #8fc0ff">Switzerland.</em>
        </h2>
      </div>

      <ul class="facts list-none m-0 p-0">
        <li
          v-for="fact in facts"
          :key="fact.title"
          class="grid gap-3.5 py-[22px]"
          style="grid-template-columns: 28px 1fr"
        >
          <span style="color: #8fc0ff; margin-top: 3px"><AppIcon name="shield" /></span>
          <div>
            <b class="block font-semibold text-[1.05rem]">{{ fact.title }}</b>
            <span class="text-[15.5px]" style="color: #a7aab6">{{ fact.text }}</span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.facts li {
  border-bottom: 1px solid #2a2c38;
}
.facts li:first-child {
  border-top: 1px solid #2a2c38;
}
.facts :deep(svg) {
  width: 22px;
  height: 22px;
}

@media (max-width: 900px) {
  .trust {
    padding: 80px 0;
    margin: 0 8px;
  }
  .tg {
    grid-template-columns: 1fr !important;
    gap: 40px;
  }
}
</style>

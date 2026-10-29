<script setup lang="ts">
const cards = [
  {
    icon: 'pin',
    title: 'Find us at the office',
    lines: ['Data Cave Switzerland AG', 'Baarerstrasse 145', '6300 Zug', 'Switzerland'],
  },
  {
    icon: 'phone',
    title: 'Call us',
    lines: ['+41 44 515 54 70', 'Mon – Fri, 8:00 – 17:00'],
    href: 'tel:+41445155470',
  },
  {
    icon: 'doc',
    title: 'Legal information',
    lines: ['Data Cave Switzerland AG', 'VAT CHE-101.047.619'],
  },
]
</script>

<template>
  <div
    class="not-prose mt-6 grid gap-4"
    style="grid-template-columns: repeat(auto-fit, minmax(210px, 1fr))"
  >
    <div
      v-for="card in cards"
      :key="card.title"
      class="rounded-[22px] border border-line bg-white p-6 shadow-card"
    >
      <span class="grid place-items-center w-11 h-11 rounded-[14px] bg-soft text-ac text-[20px]">
        <AppIcon :name="card.icon" />
      </span>
      <h3 class="mt-4 mb-2 text-base font-semibold text-ink">{{ card.title }}</h3>
      <address class="not-italic text-[15px] leading-relaxed text-mut">
        <a v-if="card.href" :href="card.href" class="font-medium text-ac hover:underline">
          {{ card.lines[0] }}
        </a>
        <template v-else>{{ card.lines[0] }}</template>
        <template v-for="line in card.lines.slice(1)" :key="line"><br />{{ line }}</template>
      </address>
    </div>
  </div>
</template>

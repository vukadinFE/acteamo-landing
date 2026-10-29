<script setup lang="ts">
const items = [
  { title: 'Due dates', text: 'Tasks wait until you’re ready. Nothing is ever overdue.' },
  { title: 'Red notifications', text: 'Calm guidance replaces the alarms.' },
  { title: 'Time tracking', text: 'No clocking in. Just focus and rest.' },
]
</script>

<template>
  <section id="why" class="pt-[130px] pb-2.5 md:pt-[130px]">
    <div class="wrap">
      <span class="eyebrow">What we left out</span>
      <h2
        class="max-w-[15ch] leading-[1.02] tracking-[-0.045em] mt-3.5 mb-0"
        style="font-size: calc(clamp(2.2rem, 5.4vw, 4.1rem) * var(--hs))"
      >
        Less pressure, by design.
      </h2>

      <ul class="gone list-none mt-12 p-0 grid gap-4" style="grid-template-columns: repeat(3, 1fr)">
        <li
          v-for="(item, i) in items"
          :key="item.title"
          v-reveal="i"
          class="bg-white border border-line rounded-[26px] p-8 grid gap-3 content-start"
        >
          <span class="grid place-items-center w-11 h-11 rounded-[14px] bg-soft text-mut text-[20px]">
            <AppIcon name="x" />
          </span>
          <b class="strike" style="font-size: calc(1.9rem * var(--hs))">{{ item.title }}</b>
          <span class="text-mut">{{ item.text }}</span>
        </li>
      </ul>

      <p class="mt-[30px] text-[1.2rem]">
        <strong>In their place: gentle guidance</strong> through your tasks, one at a time.
      </p>
    </div>
  </section>
</template>

<style scoped>
.strike {
  font-family: var(--fh);
  letter-spacing: -0.035em;
  line-height: 1.05;
  text-decoration: line-through;
  text-decoration-thickness: 3px;
  text-decoration-color: var(--ac);
  color: var(--mut);
  font-weight: var(--hw);
}

@media (max-width: 900px) {
  .gone {
    grid-template-columns: 1fr !important;
  }
}
</style>

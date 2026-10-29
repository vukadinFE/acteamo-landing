<script setup lang="ts">
const steps = [
  {
    icon: 'bolt',
    title: '1. Set your capacity',
    text: 'Drained or charged, tell Acteamo how today looks. One tap.',
  },
  {
    icon: 'ai',
    title: '2. Get a list that fits',
    text: 'AI suggests tasks that suit your day, not everything you ever promised.',
  },
  {
    icon: 'clock',
    title: '3. Work, rest, repeat',
    text: 'A pomodoro timer guides you between focus and rest. Do what fits, then stop.',
  },
]
</script>

<template>
  <section id="how" class="pt-[140px] pb-10 md:pt-[140px]" aria-label="How it works">
    <div class="wrap">
      <div v-reveal class="max-w-[780px] mb-20">
        <span class="eyebrow">How it works</span>
        <h2
          class="leading-[1.02] tracking-[-0.05em] mt-3.5 mb-0"
          style="font-size: calc(clamp(2.3rem, 5.4vw, 4.2rem) * var(--hs))"
        >
          Three steps. No pressure.
        </h2>
      </div>

      <ol class="steps list-none m-0 p-0 grid gap-14" style="grid-template-columns: repeat(3, 1fr)">
        <li v-for="(step, i) in steps" :key="step.title" v-reveal="i" class="grid gap-3.5">
          <span
            class="grid place-items-center w-[46px] h-[46px] rounded-[14px] bg-white border border-line text-ac text-[22px]"
            style="box-shadow: 0 6px 16px -8px rgba(11, 11, 16, 0.2)"
          >
            <AppIcon :name="step.icon" />
          </span>
          <h3
            class="m-0 leading-[1.1] tracking-[-0.035em]"
            style="font-size: calc(clamp(1.4rem, 2.4vw, 1.8rem) * var(--hs))"
          >
            {{ step.title }}
          </h3>
          <p class="m-0 text-mut">{{ step.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
@media (max-width: 900px) {
  .steps {
    grid-template-columns: 1fr !important;
    gap: 40px;
  }
}
</style>

<script setup lang="ts">
function fmt(n: number) {
  return `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`
}

const mode = ref<'focus' | 'rest'>('focus')
const left = ref(1500)
const running = ref(false)

const total = computed(() => (mode.value === 'focus' ? 1500 : 300))
const pct = computed(() => ((total.value - left.value) / total.value) * 100)
const label = computed(() => (mode.value === 'focus' ? 'Focus' : 'Rest'))

function switchMode() {
  mode.value = mode.value === 'focus' ? 'rest' : 'focus'
  left.value = mode.value === 'focus' ? 1500 : 300
}

function toggle() {
  running.value = !running.value
}

let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  timer = setInterval(() => {
    if (!running.value) return
    left.value -= 1
    if (left.value < 0) switchMode()
  }, 1000)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <section id="product" class="pt-20 pb-[120px] md:pb-[120px]" aria-labelledby="showcase-h">
    <div class="wrap">
      <span class="eyebrow">Inside Acteamo</span>
      <h2
        id="showcase-h"
        class="max-w-[15ch] leading-[1.02] tracking-[-0.045em] mt-3.5 mb-12"
        style="font-size: calc(clamp(2.2rem, 5.4vw, 4.1rem) * var(--hs))"
      >
        Gentle help, all day.
      </h2>

      <div class="bento grid gap-4" style="grid-template-columns: repeat(3, 1fr)">
        <!-- AI plans with you -->
        <article
          v-reveal="0"
          class="tile w bg-white border border-line rounded-[26px] p-[30px] flex flex-col gap-6 overflow-hidden"
        >
          <div>
            <h3 class="m-0 tracking-[-0.03em] leading-[1.15]" style="font-size: calc(1.4rem * var(--hs))">
              AI that plans with you, not at you.
            </h3>
            <p class="mt-2 text-mut text-[15.5px]">
              Tell it your capacity and it suggests the tasks that fit, so you start with a list you
              can finish. Suggestions, never orders.
            </p>
          </div>
          <div aria-hidden="true">
            <div class="seg10">
              <i v-for="n in 10" :key="n" :class="n <= 6 ? 'on' : ''" />
            </div>
            <small class="block mt-2.5 text-mut font-medium">A good day: just enough on your list</small>
          </div>
        </article>

        <!-- Pomodoro -->
        <article
          v-reveal="1"
          class="tile d on-dark border rounded-[26px] p-[30px] flex flex-col gap-6 overflow-hidden text-white"
          style="background: var(--ink); border-color: var(--ink)"
        >
          <div>
            <h3 class="m-0 tracking-[-0.03em] leading-[1.15]" style="font-size: calc(1.4rem * var(--hs))">
              Work. Rest. Repeat.
            </h3>
            <p class="mt-2 text-[15.5px]" style="color: #a7aab6">
              A pomodoro timer keeps focus and rest in balance.
            </p>
          </div>

          <div class="pring" :style="{ '--p': pct + '%' }">
            <div>
              <div class="big-t" style="font-size: 2.4rem">{{ fmt(Math.max(left, 0)) }}</div>
              <small class="font-medium" style="color: #a7aab6">{{ label }}</small>
            </div>
          </div>

          <div class="flex items-center justify-center gap-3 flex-nowrap">
            <button class="btn btn-w" :aria-pressed="running" @click="toggle">
              {{ running ? 'Pause' : 'Start' }}
            </button>
            <button
              class="font-medium text-[15px] bg-transparent border-0 underline cursor-pointer px-2.5 py-2.5"
              style="color: #a7aab6"
              @click="switchMode"
            >
              Skip
            </button>
          </div>
        </article>

        <!-- Nothing overdue -->
        <article
          v-reveal="2"
          class="tile bg-white border border-line rounded-[26px] p-[30px] flex flex-col gap-6 overflow-hidden"
        >
          <div>
            <h3 class="m-0 tracking-[-0.03em] leading-[1.15]" style="font-size: calc(1.4rem * var(--hs))">
              Nothing is ever overdue.
            </h3>
            <p class="mt-2 text-mut text-[15.5px]">
              No due dates, no red badges. Tasks wait for you.
            </p>
          </div>
          <div class="flex flex-wrap gap-2" aria-hidden="true">
            <span class="rb"><s>12 overdue</s></span>
            <span class="okp">0 overdue. Ever.</span>
          </div>
          <div class="grid gap-2" aria-hidden="true">
            <span class="text-[13px] font-semibold text-mut tracking-[0.04em] uppercase">
              Waiting for you
            </span>
            <div class="row"><span class="ck" />Plan next quarter</div>
            <div class="row"><span class="ck" />Tidy the desk</div>
          </div>
        </article>

        <!-- Nudges not alarms -->
        <article
          v-reveal="0"
          class="tile w bg-white border border-line rounded-[26px] p-[30px] flex flex-col gap-6 overflow-hidden"
        >
          <div>
            <h3 class="m-0 tracking-[-0.03em] leading-[1.15]" style="font-size: calc(1.4rem * var(--hs))">
              Nudges, not alarms.
            </h3>
            <p class="mt-2 text-mut text-[15.5px]">
              Acteamo guides you through your tasks in a calm voice. You decide the pace.
            </p>
          </div>
          <div class="grid grid-cols-2 gap-4 items-center" aria-hidden="true">
            <div class="flex flex-wrap gap-2">
              <span class="rb"><s>5 urgent alerts!</s></span>
            </div>
            <div class="nudge m-0">Nice rhythm today. Ready for a short break?</div>
          </div>
        </article>
      </div>

      <p class="text-[13px] text-mut text-center mt-2.5">Interface shown for illustration.</p>
    </div>
  </section>
</template>

<style scoped>
.tile.w {
  grid-column: span 2;
}

@media (max-width: 900px) {
  .bento {
    grid-template-columns: 1fr !important;
  }
  .tile.w {
    grid-column: auto;
  }
}
</style>

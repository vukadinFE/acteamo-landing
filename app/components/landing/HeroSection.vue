<script setup lang="ts">
type Task = { label: string; badge: string; tag: string; done: boolean }

const TASKS: Task[] = [
  { label: 'Water the plants', badge: 'Light', tag: 'g', done: false },
  { label: 'Book dentist appointment', badge: 'Light', tag: 'g', done: false },
  { label: 'Reply to client email', badge: 'Medium', tag: '', done: false },
  { label: 'Review design feedback', badge: 'Focus', tag: 'o', done: false },
  { label: 'Draft launch checklist', badge: 'Deep focus', tag: 'o', done: false },
]

const LEVELS = ['Drained', 'Low', 'Good', 'Charged']
const COUNT = [1, 2, 4, 5]
const FILL = [20, 40, 70, 100]
const SAY = [
  'Just one thing today. That’s enough.',
  'A light day. Rest counts too.',
  'A steady day. Pause between tasks.',
  'A big day. Rest between sessions.',
]

const level = ref(2)
const tasks = reactive(TASKS.map((t) => ({ ...t })))

const visible = computed(() => tasks.slice(0, COUNT[level.value]))
const count = computed(() => COUNT[level.value])
const fill = computed(() => FILL[level.value])
const saying = computed(() => SAY[level.value])

function select(i: number) {
  level.value = i
}

function onKey(e: KeyboardEvent, i: number) {
  let next: number | null = null
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = Math.min(i + 1, 3)
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = Math.max(i - 1, 0)
  if (next !== null) {
    e.preventDefault()
    level.value = next
    const btn = document.querySelectorAll<HTMLButtonElement>('.seg button')[next]
    btn?.focus()
  }
}

/* Hero focus badge timer */
function fmt(n: number) {
  return `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`
}
const focusLeft = ref(1122)
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  timer = setInterval(() => {
    focusLeft.value = focusLeft.value > 0 ? focusLeft.value - 1 : 1500
  }, 1000)
})
onBeforeUnmount(() => clearInterval(timer))

const focusPct = computed(() => ((1500 - focusLeft.value) / 1500) * 100)
</script>

<template>
  <section class="hero-dots relative text-center pt-11 md:pt-[72px]">
    <div class="wrap relative animate-rise">
      <span class="pill mb-[30px]"><i />Acteamo 2.0 · Stress-free planning</span>

      <h1
        class="m-0 leading-[0.98] tracking-[-0.05em]"
        style="font-size: calc(clamp(2.5rem, 6.2vw, 5rem) * var(--hs))"
      >
        Plan the day<span class="block text-ac">you can actually do.</span>
      </h1>

      <p
        class="text-mut max-w-[38em] mx-auto mt-7 leading-[1.5]"
        style="font-size: clamp(1.05rem, 2vw, 1.35rem)"
      >
        Tell Acteamo how much capacity you have. AI suggests the tasks that fit. No due dates, no red
        alerts, no guilt.
      </p>

      <div class="flex flex-wrap gap-3 justify-center mt-9">
        <a class="btn btn-p" href="https://my.acteamo.com/auth/register">Start for free</a>
        <a class="btn btn-s" href="#how">See how it works</a>
      </div>

      <div class="inline-flex items-center gap-2 mt-[22px] text-sm text-mut font-medium">
        <span class="text-ac"><AppIcon name="shield" /></span>Swiss-hosted. GDPR-compliant.
      </div>
    </div>

    <!-- Interactive demo -->
    <div class="relative max-w-[1040px] mx-auto mt-12 px-6 animate-rise-slow">
      <div
        class="today max-w-[620px] mx-auto bg-white border border-line rounded-[28px] p-[30px] text-left shadow-stage"
        role="group"
        aria-label="Interactive demo of the Today page"
      >
        <span class="block text-mut text-[13px] font-semibold tracking-[0.06em] uppercase">
          Today
        </span>
        <h3
          id="capacity-q"
          class="mt-1.5 mb-[18px] tracking-[-0.03em] leading-[1.15]"
          style="font-size: calc(1.5rem * var(--hs))"
        >
          How much capacity do you have?
        </h3>

        <div class="seg" role="radiogroup" aria-labelledby="capacity-q">
          <button
            v-for="(l, i) in LEVELS"
            :key="l"
            role="radio"
            :aria-checked="level === i"
            :tabindex="level === i ? 0 : -1"
            @click="select(i)"
            @keydown="onKey($event, i)"
          >
            {{ l }}
          </button>
        </div>

        <div class="flex items-center gap-[14px] mt-[18px] text-[13.5px] text-mut font-medium">
          <div class="pbar flex-1"><i :style="{ width: fill + '%' }" /></div>
          <span>Fits your capacity · {{ count }} {{ count > 1 ? 'tasks' : 'task' }}</span>
        </div>

        <div class="flex items-center gap-[7px] text-[13px] font-semibold text-ac mt-5 mb-2.5">
          <AppIcon name="ai" />Suggested for you
        </div>

        <ul class="tl2 list-none m-0 p-0 grid gap-2" aria-live="polite">
          <li
            v-for="(t, i) in visible"
            :key="t.label"
            :style="{ animationDelay: i * 60 + 'ms' }"
          >
            <button class="t" :aria-pressed="t.done" @click="t.done = !t.done">
              <span class="ck"><AppIcon name="ck" /></span>
              <span class="tx">{{ t.label }}</span>
              <span class="tag ml-auto" :class="t.tag">{{ t.badge }}</span>
            </button>
          </li>
        </ul>

        <p class="mt-[18px] text-mut text-[14.5px] text-center min-h-[1.5em]">{{ saying }}</p>
      </div>

      <!-- Floating cards -->
      <div
        class="fl-t hidden md:flex absolute items-center gap-4 bg-white border border-line rounded-[18px] px-[18px] py-4 text-left shadow-float animate-bob"
        aria-hidden="true"
      >
        <span class="ring" :style="{ '--p': focusPct + '%' }" />
        <div>
          <small class="block text-mut text-xs">Focus session</small>
          <div class="tm text-[28px] font-semibold tracking-[-0.03em] tabular-nums leading-[1.1]">
            {{ fmt(focusLeft) }}
          </div>
        </div>
      </div>

      <div
        class="fl-c hidden md:block absolute bg-white border border-line rounded-[18px] px-[18px] py-4 text-left text-[13px] shadow-float animate-bob"
        aria-hidden="true"
      >
        <small class="block text-mut text-xs">Gentle nudge</small>
        <div class="nudge">You’ve finished two tasks. A short rest could feel good.</div>
      </div>
    </div>

    <p class="text-[13px] text-mut text-center mt-[22px]">
      Interface shown for illustration. Try the capacity selector.
    </p>
  </section>
</template>

<style scoped>
.fl-t {
  left: 50px;
  bottom: 64px;
}
.fl-c {
  right: 2px;
  top: -34px;
  width: 262px;
}
</style>

<script setup lang="ts">
const FONTS = ['Inter', 'Manrope', 'DM Sans', 'Plus Jakarta Sans', 'Sora', 'Fraunces', 'System']

type StyleState = {
  fh: string
  fb: string
  hw: number
  hs: number
  bs: number
  hc: string
  tc: string
  ac: string
}

const DEFAULTS: StyleState = {
  fh: 'Inter',
  fb: 'Inter',
  hw: 700,
  hs: 100,
  bs: 17,
  hc: '#0b1220',
  tc: '#0b1220',
  ac: '#0867cc',
}

const open = ref(false)
const state = reactive<StyleState>({ ...DEFAULTS })

function stack(name: string) {
  if (name === 'System') return 'system-ui,-apple-system,"Segoe UI",sans-serif'
  const fallback = name === 'Fraunces' ? 'Georgia,serif' : 'system-ui,-apple-system,"Segoe UI",sans-serif'
  return `"${name}",${fallback}`
}

function apply() {
  const r = document.documentElement.style
  r.setProperty('--fh', stack(state.fh))
  r.setProperty('--f', stack(state.fb))
  r.setProperty('--hw', String(state.hw))
  r.setProperty('--hs', String(state.hs / 100))
  r.setProperty('--bs', `${state.bs}px`)
  r.setProperty('--hc', state.hc)
  r.setProperty('--tc', state.tc)
  r.setProperty('--ac', state.ac)
  try {
    localStorage.setItem('acteamo-style', JSON.stringify(state))
  } catch {
    /* ignore */
  }
}

function reset() {
  Object.assign(state, DEFAULTS)
  apply()
}

onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem('acteamo-style') || '{}')
    for (const k of Object.keys(DEFAULTS) as (keyof StyleState)[]) {
      if (k in saved) (state as Record<string, unknown>)[k] = saved[k]
    }
  } catch {
    /* ignore */
  }
  apply()
})

watch(state, apply, { deep: true })

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) open.value = false
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div>
    <button
      class="fixed right-5 bottom-5 z-50 w-[52px] h-[52px] rounded-2xl border-0 bg-ink text-white font-bold text-[17px] cursor-pointer"
      style="box-shadow: 0 12px 30px -8px rgba(11, 18, 32, 0.5)"
      aria-label="Style controls"
      :aria-expanded="open"
      aria-controls="style-panel"
      @click="open = !open"
    >
      Aa
    </button>

    <div
      v-show="open"
      id="style-panel"
      role="dialog"
      aria-label="Style controls"
      class="fixed right-5 bottom-[84px] z-50 w-[min(310px,calc(100vw-40px))] max-h-[calc(100vh-120px)] overflow-auto bg-white border border-line rounded-[20px] p-5 grid gap-[14px] text-sm leading-tight text-ink"
      style="box-shadow: 0 30px 70px -20px rgba(11, 18, 32, 0.4); font-family: system-ui, sans-serif"
    >
      <h2 class="m-0 text-base font-bold">Style</h2>

      <label class="grid gap-1.5 font-semibold text-mut">
        Heading font
        <select
          v-model="state.fh"
          class="font-medium text-sm px-2.5 py-[9px] rounded-[10px] border border-[#d6dbe3] bg-white"
        >
          <option v-for="f in FONTS" :key="f">{{ f }}</option>
        </select>
      </label>

      <label class="grid gap-1.5 font-semibold text-mut">
        Body font
        <select
          v-model="state.fb"
          class="font-medium text-sm px-2.5 py-[9px] rounded-[10px] border border-[#d6dbe3] bg-white"
        >
          <option v-for="f in FONTS" :key="f">{{ f }}</option>
        </select>
      </label>

      <label class="grid gap-1.5 font-semibold text-mut">
        <span>Heading weight <output class="float-right font-medium">{{ state.hw }}</output></span>
        <input v-model.number="state.hw" type="range" min="400" max="800" step="100" class="w-full accent-ac" />
      </label>

      <label class="grid gap-1.5 font-semibold text-mut">
        <span>Heading size <output class="float-right font-medium">{{ state.hs }}%</output></span>
        <input v-model.number="state.hs" type="range" min="75" max="125" step="5" class="w-full accent-ac" />
      </label>

      <label class="grid gap-1.5 font-semibold text-mut">
        <span>Body size <output class="float-right font-medium">{{ state.bs }}px</output></span>
        <input v-model.number="state.bs" type="range" min="15" max="20" step="1" class="w-full accent-ac" />
      </label>

      <div class="grid grid-cols-3 gap-2.5">
        <label class="grid gap-1.5 font-semibold text-mut">
          Heading
          <input v-model="state.hc" type="color" class="w-full h-9 border border-[#d6dbe3] rounded-[10px] p-0.5 bg-white cursor-pointer" />
        </label>
        <label class="grid gap-1.5 font-semibold text-mut">
          Text
          <input v-model="state.tc" type="color" class="w-full h-9 border border-[#d6dbe3] rounded-[10px] p-0.5 bg-white cursor-pointer" />
        </label>
        <label class="grid gap-1.5 font-semibold text-mut">
          Accent
          <input v-model="state.ac" type="color" class="w-full h-9 border border-[#d6dbe3] rounded-[10px] p-0.5 bg-white cursor-pointer" />
        </label>
      </div>

      <button class="btn btn-s btn-sm" type="button" @click="reset">Reset</button>
    </div>
  </div>
</template>

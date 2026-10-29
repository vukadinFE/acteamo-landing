<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    email?: string
  }>(),
  { email: 'feedback@acteamo.com' },
)

const form = reactive({ name: '', email: '', subject: '', message: '' })

const mailto = computed(() => {
  const subject = form.subject || 'Message from the acteamo website'
  const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
  return `mailto:${props.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
})

function send() {
  if (import.meta.client) window.location.href = mailto.value
}
</script>

<template>
  <form
    class="not-prose mt-6 grid gap-4 rounded-[26px] border border-line bg-white p-6 sm:p-8 shadow-card"
    @submit.prevent="send"
  >
    <div class="grid gap-4 sm:grid-cols-2">
      <label class="grid gap-1.5 text-sm font-medium text-ink">
        Full name
        <input
          v-model="form.name"
          type="text"
          name="name"
          required
          autocomplete="name"
          class="rounded-xl border border-line bg-bg px-3.5 py-2.5 text-base outline-none focus:border-ac"
        />
      </label>
      <label class="grid gap-1.5 text-sm font-medium text-ink">
        Email
        <input
          v-model="form.email"
          type="email"
          name="email"
          required
          autocomplete="email"
          class="rounded-xl border border-line bg-bg px-3.5 py-2.5 text-base outline-none focus:border-ac"
        />
      </label>
    </div>

    <label class="grid gap-1.5 text-sm font-medium text-ink">
      Subject
      <input
        v-model="form.subject"
        type="text"
        name="subject"
        class="rounded-xl border border-line bg-bg px-3.5 py-2.5 text-base outline-none focus:border-ac"
      />
    </label>

    <label class="grid gap-1.5 text-sm font-medium text-ink">
      Message
      <textarea
        v-model="form.message"
        name="message"
        rows="5"
        required
        class="resize-y rounded-xl border border-line bg-bg px-3.5 py-2.5 text-base outline-none focus:border-ac"
      />
    </label>

    <div class="flex flex-wrap items-center gap-4">
      <button type="submit" class="btn btn-p">
        <AppIcon name="mail" /> Send message
      </button>
      <span class="text-sm text-mut">
        or email us at
        <a :href="`mailto:${email}`" class="font-medium text-ac hover:underline">{{ email }}</a>
      </span>
    </div>
  </form>
</template>

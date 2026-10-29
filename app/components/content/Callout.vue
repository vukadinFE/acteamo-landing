<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: "tip" | "info" | "warning" | "success";
    title?: string;
    icon?: string;
  }>(),
  { type: "info" },
);

type ThemeSettings = { box: string; accent: string; icon: string };
type Theme = "tip" | "info" | "warning" | "success";

const styles: Record<Theme, ThemeSettings> = {
  tip: { box: "bg-[#eef5fd] border-[#cfe2fb]", accent: "text-ac", icon: "ai" },
  info: { box: "bg-soft border-line", accent: "text-ink", icon: "bolt" },
  warning: {
    box: "bg-[#fdf3e6] border-[#f3dcb6]",
    accent: "text-[#98590a]",
    icon: "bolt",
  },
  success: {
    box: "bg-[#e9f6ee] border-[#c3e7cf]",
    accent: "text-[#1d6b3a]",
    icon: "ck",
  },
};

const theme = computed(() => styles[props.type] || styles.info);
</script>

<template>
  <aside
    class="not-prose my-6 flex gap-4 rounded-[18px] border p-5"
    :class="theme.box"
  >
    <span
      class="h-8 w-8 flex items-center justify-center text-2xl"
      :class="theme.accent"
    >
      <AppIcon :name="props.icon || theme.icon" />
    </span>
    <div class="min-w-0">
      <p
        v-if="props.title"
        class="m-0 mb-1 font-semibold"
        :class="theme.accent"
      >
        {{ props.title }}
      </p>
      <div
        class="text-[15.5px] leading-relaxed text-ink [&_p]:m-0 [&_p+p]:mt-2"
      >
        <slot />
      </div>
    </div>
  </aside>
</template>

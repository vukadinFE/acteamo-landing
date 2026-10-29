<script setup lang="ts">
const open = ref(false)

const nav = [
  { label: 'How it works', to: '/#how' },
  { label: 'Why Acteamo', to: '/#why' },
  { label: 'Privacy', to: '/#privacy' },
  { label: 'Blog', to: '/blog' },
]

function close() {
  open.value = false
}
</script>

<template>
  <header class="sticky top-0 z-30 py-3">
    <div class="wrap">
      <nav
        class="relative flex items-center gap-7 h-[58px] pl-5 pr-2.5 border border-line rounded-2xl shadow-bar"
        style="background: rgba(255, 255, 255, 0.94)"
        aria-label="Main"
        :class="open ? 'is-open' : ''"
      >
        <NuxtLink
          to="/"
          class="flex items-center no-underline"
          aria-label="Acteamo home"
          @click="close"
        >
          <AppLogo class="h-7 w-auto" />
        </NuxtLink>

        <ul
          class="menu list-none m-0 mx-auto p-0 flex gap-[30px]"
          :class="open ? 'open' : ''"
        >
          <li v-for="item in nav" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="no-underline text-mut font-medium text-[15px] hover:text-ink block"
              @click="close"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
          <li class="login-mobile">
            <a
              href="https://my.acteamo.com/auth/login"
              class="no-underline text-mut font-medium text-[15px] hover:text-ink block"
            >
              Log in
            </a>
          </li>
        </ul>

        <div class="desk flex items-center gap-[18px] ml-auto">
          <a
            href="https://my.acteamo.com/auth/login"
            class="font-medium text-[15px] text-mut no-underline hover:text-ink"
          >
            Log in
          </a>
          <a class="btn btn-p btn-sm" href="https://my.acteamo.com/auth/register">
            Start for free
          </a>
        </div>

        <button
          class="burger hidden place-items-center w-[42px] h-[42px] border-0 bg-soft rounded-[11px] text-ink cursor-pointer"
          aria-label="Menu"
          :aria-expanded="open"
          aria-controls="menu"
          @click="open = !open"
        >
          <AppIcon name="menu" />
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.login-mobile {
  display: none;
}

@media (max-width: 900px) {
  .burger {
    display: grid;
  }
  .desk > a:first-child {
    display: none;
  }
  .login-mobile {
    display: block;
  }
  .menu {
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    top: calc(100% + 8px);
    flex-direction: column;
    gap: 0;
    margin: 0;
    background: #fff;
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 8px;
    box-shadow: 0 20px 40px -16px rgba(11, 18, 32, 0.25);
  }
  .menu.open {
    display: flex;
  }
  .menu a {
    display: block;
    padding: 13px 14px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  nav {
    gap: 8px;
    padding-left: 14px;
  }
}
</style>

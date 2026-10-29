// Reveal-on-scroll directive (v-reveal). Client only.
// Adds the `.in` class when the element scrolls into view.
export default defineNuxtPlugin((nuxtApp) => {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  let io: IntersectionObserver | null = null
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io?.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 },
    )
  }

  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding) {
      el.classList.add('rv')
      const i = typeof binding.value === 'number' ? binding.value : 0
      el.style.transitionDelay = `${(i % 3) * 80}ms`
      if (prefersReduced || !io) {
        el.classList.add('in')
        return
      }
      io.observe(el)
    },
    unmounted(el: HTMLElement) {
      io?.unobserve(el)
    },
  })
})

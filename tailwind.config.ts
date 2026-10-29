import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        // Design tokens resolve to CSS variables so the live Style panel
        // can override accent / heading / text colours at runtime.
        bg: 'var(--bg)',
        soft: 'var(--soft)',
        ink: 'var(--ink)',
        mut: 'var(--mut)',
        line: 'var(--line)',
        ac: 'var(--ac)',
        ac2: 'var(--ac2)',
      },
      fontFamily: {
        sans: 'var(--f)',
        heading: 'var(--fh)',
      },
      maxWidth: {
        wrap: 'var(--max)',
      },
      boxShadow: {
        bar: '0 8px 30px -14px rgba(11,11,16,.18)',
        card: '0 1px 2px rgba(0,0,0,.03)',
        float: '0 24px 60px -14px rgba(11,11,16,.32)',
        stage: '0 2px 4px rgba(11,18,32,.04), 0 50px 100px -30px rgba(11,18,32,.3)',
        btn: '0 8px 24px -8px rgba(8,103,204,.5)',
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'none' },
        },
        bob: {
          '50%': { transform: 'translateY(-7px)' },
        },
        pulse2: {
          '50%': { opacity: '.35' },
        },
        pop: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        rise: 'rise .9s cubic-bezier(.2,.7,.2,1) both',
        'rise-slow': 'rise 1.1s .15s cubic-bezier(.2,.7,.2,1) both',
        bob: 'bob 7s ease-in-out infinite',
        pop: 'pop .45s both',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

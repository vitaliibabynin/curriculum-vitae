import type { Config } from "tailwindcss";

// Brand tokens live as CSS variables in app/globals.css (light + .dark); Tailwind maps them to utilities,
// so components write `bg-bg text-fg border-line text-signal` instead of paired dark: variants.
const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        line: 'var(--line)',
        fg: 'var(--fg)',
        muted: 'var(--muted)',
        signal: 'var(--signal)',
        'on-signal': 'var(--on-signal)',
        ok: 'var(--ok)',
      },
      fontFamily: {
        sans: ['var(--font-plex)', 'system-ui', 'sans-serif'],
        display: ['var(--font-plex-cond)', 'var(--font-plex)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        scan: { '0%': { top: '0%' }, '100%': { top: '100%' } },
        blink: { '0%, 49%': { opacity: '1' }, '50%, 100%': { opacity: '0' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        scan: 'scan 3.2s cubic-bezier(0.65, 0, 0.35, 1) infinite alternate',
        blink: 'blink 1s steps(1) infinite',
      },
    },
  },
  plugins: [],
};
export default config;

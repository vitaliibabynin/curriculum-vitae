'use client'

import { useState, useEffect } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'

// The initial theme is applied before paint by the inline script in app/layout.tsx;
// this only reads it back and flips it.
export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState<boolean | null>(null)

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {
      // Storage blocked (private mode) — the toggle still works for this visit.
    }
    setDarkMode(next)
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="label flex items-center gap-2 border border-line px-2.5 py-1.5 text-muted transition-colors hover:border-fg hover:text-fg"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={darkMode ?? undefined}
    >
      {darkMode ? <FaSun size={12} /> : <FaMoon size={12} />}
      <span className="hidden sm:inline">{darkMode ? 'light' : 'dark'}</span>
    </button>
  )
}

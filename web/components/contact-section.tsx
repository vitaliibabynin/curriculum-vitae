'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { developerInfo } from '../app/data'
import { easeOutExpo } from '../lib/motion'
import ScrambleText from './scramble-text'
import Magnetic from './magnetic'

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable (insecure context / denied) — the mailto link still works.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`label border px-3 py-2 transition-colors ${copied ? 'border-ok text-ok' : 'border-line text-muted hover:border-fg hover:text-fg'}`}
      aria-label={copied ? 'Email copied' : 'Copy email address'}
    >
      {copied ? '✓ copied' : 'copy'}
      <span className="sr-only" aria-live="polite">{copied ? 'Copied to clipboard' : ''}</span>
    </button>
  )
}

const links = [
  { label: 'LinkedIn', href: developerInfo.linkedIn },
  { label: 'GitHub', href: developerInfo.github },
]

export default function ContactSection() {
  const fullName = `${developerInfo.name} ${developerInfo.surname}`

  return (
    <footer id="contact" aria-labelledby="contact-title" className="relative scroll-mt-20 overflow-hidden border-t border-line px-5 pt-28 sm:px-8 sm:pt-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center gap-4">
          <span className="label text-signal">06</span>
          <span className="h-px flex-1 bg-line" />
          <span className="label text-muted">/ contact</span>
        </div>

        <h2 id="contact-title" className="font-display text-[clamp(3.5rem,13vw,11rem)] font-bold uppercase leading-[0.82] tracking-[-0.02em]">
          <ScrambleText text="Let's build" className="block" />
          <span className="block text-signal">
            <ScrambleText text="something real." delay={200} />
          </span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo }}
          className="mt-14 grid gap-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            <p className="max-w-lg text-lg text-muted text-pretty">
              Open to senior engineering and AI architecture roles, and to projects where messy real-world input has
              to become reliable data.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${developerInfo.email}`}
                className="group font-display text-2xl font-semibold underline decoration-line decoration-2 underline-offset-8 transition-colors hover:text-signal hover:decoration-signal sm:text-4xl"
              >
                {developerInfo.email}
              </a>
              <CopyEmailButton email={developerInfo.email} />
            </div>
          </div>

          <div className="flex flex-col justify-end gap-4 lg:col-span-5 lg:items-end">
            <Magnetic>
              <a
                href={developerInfo.resumeUrl}
                download
                className="group inline-flex items-center gap-3 bg-signal px-6 py-3.5 font-medium text-on-signal"
              >
                Download resume
                <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
            </Magnetic>
            <div className="flex gap-6">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label text-fg/85 underline decoration-line underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="label mt-28 flex flex-col gap-2 border-t border-line py-6 text-muted sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {fullName} · {developerInfo.location}
          </span>
          <span>Next.js · Three.js · set in IBM Plex</span>
        </div>
      </div>
    </footer>
  )
}

'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { developerInfo } from '../app/data'
import { scrollToSection } from './smooth-scroll'
import { stagger, fadeUp } from '../lib/motion'
import ScrambleText from './scramble-text'
import FieldBox from './field-box'
import Magnetic from './magnetic'
import ExtractionDemo from './extraction-demo'

const containerVariants = stagger(0.12, 0.2)
const item = fadeUp(24, 0.7)

const TICKER = [
  'voice → json',
  'scans → records',
  'chat → crm',
  'documents → search',
  'tenders → pipelines',
  'field notes → audit trail',
]

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // Gentle drift only — no opacity fade, which made the small labels unreadable mid-scroll.
  const lift = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -80])

  const go = (id: string) => {
    const el = document.getElementById(id)
    if (el) scrollToSection(el, 72)
  }

  return (
    <section ref={ref} id="hero" className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-24">
      <motion.div style={{ y: lift }} className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        {/* Identity */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="lg:col-span-7">
          <motion.p variants={item} className="label mb-14 flex items-center gap-2 text-muted">
            <span className="inline-block h-1.5 w-1.5 bg-signal" />
            profile.pdf <span className="text-fg/70">→</span> parsed
          </motion.p>

          <FieldBox field="full_name" confidence={0.99} immediate delay={1.1} className="inline-block">
            <h1 className="font-display text-[clamp(3.6rem,16vw,9.75rem)] font-bold uppercase leading-[0.84] tracking-[-0.02em]">
              <ScrambleText text={developerInfo.name} duration={700} className="block" />
              <ScrambleText text={developerInfo.surname} delay={180} duration={800} className="block" />
            </h1>
          </FieldBox>

          <motion.p variants={item} className="mt-10 font-display text-2xl font-medium uppercase tracking-wide sm:text-3xl">
            Software Engineer <span className="text-signal">&amp;</span> AI Architect
          </motion.p>
          <motion.p variants={item} className="mt-4 max-w-xl text-lg text-muted text-pretty">
            {developerInfo.tagline} Ten years of shipping software, the last two AI-native, built to GDPR-grade
            governance.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <button
                type="button"
                onClick={() => go('contact')}
                className="group inline-flex items-center gap-3 bg-signal px-6 py-3.5 font-medium text-on-signal transition-transform active:scale-[0.98]"
              >
                Get in touch
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </Magnetic>
            <a
              href={developerInfo.resumeUrl}
              download
              className="inline-flex items-center gap-3 border border-line px-6 py-3.5 font-medium transition-colors hover:border-fg"
            >
              Resume <span className="label text-muted">pdf</span>
            </a>
            <span className="ml-1 flex gap-5 pl-2">
              <a href={developerInfo.linkedIn} target="_blank" rel="noopener noreferrer" className="label text-fg/85 underline decoration-line underline-offset-4 transition-colors hover:text-signal hover:decoration-signal">
                LinkedIn ↗
              </a>
              <a href={developerInfo.github} target="_blank" rel="noopener noreferrer" className="label text-fg/85 underline decoration-line underline-offset-4 transition-colors hover:text-signal hover:decoration-signal">
                GitHub ↗
              </a>
            </span>
          </motion.div>

          <motion.dl variants={item} className="mt-12 grid max-w-xl grid-cols-3 gap-px border border-line bg-line">
            {[
              ['based', 'Germany'],
              ['since', '2015'],
              ['focus', 'LLM systems'],
            ].map(([k, v]) => (
              <div key={k} className="bg-bg px-3 py-3 theme-fade">
                <dt className="label text-muted">{k}</dt>
                <dd className="mt-1 text-sm font-medium">{v}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Live demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <p className="label mb-3 text-muted">what I build, in one loop</p>
          <ExtractionDemo />
        </motion.div>
      </motion.div>

      {/* Ticker */}
      <div className="relative mt-16 overflow-hidden border-y border-line py-3" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap motion-reduce:animate-none">
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="label flex items-center gap-10 text-muted">
              {t}
              <span className="inline-block h-1 w-1 bg-signal" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

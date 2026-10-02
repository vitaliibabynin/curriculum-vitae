'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { topExperiences, additionalExperiences, type Experience } from '../app/data'
import { easeOutExpo, fadeUp } from '../lib/motion'
import { scrollToSection } from './smooth-scroll'

const VISIBLE_SKILLS = 6

const isCurrent = (exp: Experience) => /present/i.test(exp.period)

// "May 2017 – Sep 2018" → ["2017", "2018"]; "… – Present" → [start, "NOW"]
function yearSpan(period: string): [string, string] {
  const years = period.match(/\d{4}/g) ?? []
  const start = years[0] ?? ''
  const end = /present/i.test(period) ? 'NOW' : (years[1] ?? start)
  return [start, end]
}

function StackChips({ stack }: { stack: string[] }) {
  const [expanded, setExpanded] = useState(false)
  const hidden = stack.length - VISIBLE_SKILLS
  const visible = expanded ? stack : stack.slice(0, VISIBLE_SKILLS)

  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
      {visible.map((tech) => (
        <li key={tech} className="label border border-line px-2 py-1 text-muted">
          {tech}
        </li>
      ))}
      {hidden > 0 && (
        <li>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="label border border-dashed border-line px-2 py-1 text-signal transition-colors hover:border-signal"
          >
            {expanded ? '− less' : `+${hidden} more`}
          </button>
        </li>
      )}
    </ul>
  )
}

function Entry({ exp, index, register }: { exp: Experience; index: number; register: (el: HTMLElement | null) => void }) {
  const current = isCurrent(exp)

  return (
    <motion.article
      ref={register}
      data-index={index}
      variants={fadeUp(30, 0.7)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px' }}
      className="scroll-mt-28 border-t border-line pb-16 pt-8"
    >
      <div className="label mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-muted">
        <span className="text-fg">{exp.period}</span>
        <span>{exp.location}</span>
        <span>{exp.workMode}</span>
        {current && (
          <span className="flex items-center gap-1.5 text-ok">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping bg-ok opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 bg-ok" />
            </span>
            current
          </span>
        )}
      </div>

      <h3 className="font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight sm:text-4xl text-balance">
        {exp.title}
      </h3>
      <p className="mt-2 flex flex-wrap items-baseline gap-x-4 font-medium text-signal">
        {exp.employer}
        {exp.link && (
          <a
            href={exp.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="label text-muted underline-offset-4 transition-colors hover:text-signal hover:underline"
          >
            {exp.link.label} ↗
          </a>
        )}
      </p>

      <p className="mt-5 max-w-2xl text-muted text-pretty">{exp.description}</p>

      {exp.highlights && (
        <ul className="mt-6 max-w-2xl divide-y divide-line border-y border-line">
          {exp.highlights.map((h, i) => (
            <li key={h} className="flex gap-4 py-3 text-sm text-fg/90">
              <span className="label mt-0.5 shrink-0 text-signal">{String.fromCharCode(97 + i)}</span>
              <span className="text-pretty">{h}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6">
        <StackChips stack={exp.stack} />
      </div>

      {exp.youtubeLink && (
        <a
          href={exp.youtubeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="label mt-5 inline-block text-muted underline-offset-4 transition-colors hover:text-signal hover:underline"
        >
          ▶ Watch the demo video ↗
        </a>
      )}
    </motion.article>
  )
}

export default function ExperiencesTimeline() {
  const [active, setActive] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const entries = useRef<(HTMLElement | null)[]>([])

  // The entry crossing the middle band of the viewport drives the sticky year display.
  useEffect(() => {
    const io = new IntersectionObserver(
      (items) => {
        for (const it of items) {
          if (it.isIntersecting) setActive(Number((it.target as HTMLElement).dataset.index))
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    entries.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const exp = topExperiences[active]
  const [from, to] = yearSpan(exp.period)

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      {/* Sticky index (desktop) */}
      <aside className="hidden lg:col-span-4 lg:block" aria-hidden="true">
        <div className="sticky top-28">
          <div className="relative h-[clamp(9rem,13vw,12rem)] overflow-hidden font-display font-bold uppercase leading-[0.85] tracking-tight">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={active}
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
                className="absolute inset-0 text-[clamp(4rem,6.2vw,5.75rem)]"
              >
                <span className="block">{from}</span>
                <span className="block text-signal">{to === from ? '' : `— ${to}`}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <ol className="mt-10 border-t border-line">
            {topExperiences.map((e, i) => (
              <li key={e.title + e.employer}>
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => {
                    const el = entries.current[i]
                    if (el) scrollToSection(el, 110)
                  }}
                  className={`label flex w-full items-center justify-between border-b border-line py-2.5 text-left transition-colors ${
                    i === active ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`h-1.5 w-1.5 transition-colors ${i === active ? 'bg-signal' : 'bg-line'}`} />
                    {e.employer}
                  </span>
                  <span>{yearSpan(e.period)[0]}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </aside>

      {/* Entries */}
      <div className="lg:col-span-8">
        {topExperiences.map((e, i) => (
          <Entry
            key={e.title + e.employer}
            exp={e}
            index={i}
            register={(el) => {
              entries.current[i] = el
            }}
          />
        ))}

        {/* Earlier roles */}
        <div className="border-t border-line pt-6">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            aria-controls="earlier-experience"
            className="label flex w-full items-center justify-between py-2 text-muted transition-colors hover:text-fg"
          >
            <span>{showAll ? 'hide' : 'show'} {additionalExperiences.length} earlier roles · 2015 – 2018</span>
            <span aria-hidden="true" className={`text-base transition-transform duration-300 ${showAll ? 'rotate-45' : ''}`}>
              +
            </span>
          </button>
          <AnimatePresence initial={false}>
            {showAll && (
              <motion.ul
                id="earlier-experience"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: easeOutExpo }}
                className="overflow-hidden"
              >
                {additionalExperiences.map((e) => (
                  <li key={e.title + e.employer} className="grid gap-1 border-t border-line py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                    <span className="label pt-1 text-muted">{e.period}</span>
                    <div>
                      <p className="font-medium">
                        {e.title} <span className="text-muted">— {e.employer}</span>
                      </p>
                      <p className="mt-1 text-sm text-muted">{e.description}</p>
                    </div>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

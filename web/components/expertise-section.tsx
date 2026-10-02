'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { skillClusters } from '../app/data'
import { stagger, fadeUp } from '../lib/motion'
import SectionHeading from './section-heading'

// Canvas is client-only — load without SSR and show a light skeleton while it mounts.
const SkillsGlobe = dynamic(() => import('./skills-globe'), {
  ssr: false,
  loading: () => (
    <div className="grid h-[360px] w-full place-items-center sm:h-[460px] lg:h-[560px]">
      <span className="label animate-pulse text-muted">loading model…</span>
    </div>
  )
})

const list = stagger(0.08)
const row = fadeUp(16)
const totalTechs = skillClusters.reduce((n, c) => n + c.techs.length, 0)

const tick = 'absolute h-4 w-4 border-fg/40'

export default function ExpertiseSection() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section id="expertise" aria-labelledby="expertise-title" className="scroll-mt-20 px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="expertise-title" index="02" eyebrow="expertise" title="What I build with">
          Five capability clusters and the {totalTechs} technologies behind them. Drag the model; hover a cluster to
          isolate it.
        </SectionHeading>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Globe viewport */}
          <div className="relative lg:col-span-7">
            <span className={`${tick} left-0 top-0 border-l border-t`} />
            <span className={`${tick} right-0 top-0 border-r border-t`} />
            <span className={`${tick} bottom-0 left-0 border-b border-l`} />
            <span className={`${tick} bottom-0 right-0 border-b border-r`} />
            <div className="label absolute left-4 top-3 z-10 text-muted">fig.1 — skills model</div>
            <div className="label absolute bottom-3 right-4 z-10 text-muted">
              {skillClusters.length} clusters · {totalTechs} nodes · drag ↻
            </div>
            <SkillsGlobe active={active} />
          </div>

          {/* Cluster index — also the accessible / no-WebGL equivalent of the globe */}
          <motion.ol
            variants={list}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="border-t border-line lg:col-span-5"
            onMouseLeave={() => setActive(null)}
          >
            {skillClusters.map((c, i) => {
              const on = active === c.id
              return (
                <motion.li
                  key={c.id}
                  variants={row}
                  tabIndex={0}
                  onMouseEnter={() => setActive(c.id)}
                  onFocus={() => setActive(c.id)}
                  onBlur={() => setActive(null)}
                  className="group relative cursor-default border-b border-line py-5 outline-none"
                >
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-0.5 origin-top"
                    style={{ backgroundColor: c.color }}
                    initial={false}
                    animate={{ scaleY: on ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="flex items-baseline justify-between gap-4 pl-4">
                    <h3 className="flex items-baseline gap-3 font-display text-xl font-semibold uppercase tracking-wide sm:text-2xl">
                      <span className="label text-muted">{String(i + 1).padStart(2, '0')}</span>
                      <span className="transition-colors duration-300" style={{ color: on ? c.color : undefined }}>
                        {c.label}
                      </span>
                    </h3>
                    <span className="label text-muted">{c.techs.length}</span>
                  </div>
                  <p className="mt-2 pl-4 font-mono text-xs leading-relaxed text-muted transition-colors group-hover:text-fg/80">
                    {c.techs.join('  ·  ')}
                  </p>
                </motion.li>
              )
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}

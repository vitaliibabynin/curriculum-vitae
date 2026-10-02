'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView, useReducedMotion, animate } from 'framer-motion'
import { developerInfo, skillGroups, educations, languages, interests, credentials } from '../app/data'
import { easeOutExpo, stagger, fadeUp } from '../lib/motion'
import SectionHeading from './section-heading'
import FieldBox from './field-box'

const list = stagger(0.06)
const row = fadeUp(14)
const yearsShipping = new Date().getFullYear() - 2015

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduced = useReducedMotion()
  const [value, setValue] = useState(reduced ? to : 0)

  useEffect(() => {
    if (!inView || reduced) return
    const controls = animate(0, to, { duration: 1.4, ease: easeOutExpo, onUpdate: (v) => setValue(Math.round(v)) })
    return () => controls.stop()
  }, [inView, reduced, to])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}

function SubHeading({ children }: { children: string }) {
  return <h3 className="label mb-5 text-muted">{children}</h3>
}

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20 px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="about-title" index="05" eyebrow="about" title="Background" />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Portrait + facts */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <FieldBox field="portrait" confidence={1} className="block">
                <div className="group relative aspect-[4/5] overflow-hidden border border-line bg-surface-2">
                  <Image
                    src={developerInfo.imageUrl}
                    alt={`${developerInfo.name} ${developerInfo.surname}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                  />
                </div>
              </FieldBox>

              <dl className="mt-8 divide-y divide-line border-y border-line text-sm">
                <div className="flex justify-between py-3">
                  <dt className="label text-muted">location</dt>
                  <dd>{developerInfo.location}</dd>
                </div>
                {languages.map((l) => (
                  <div key={l.name} className="flex justify-between py-3">
                    <dt className="label text-muted">{l.name}</dt>
                    <dd>{l.level}</dd>
                  </div>
                ))}
                <div className="flex justify-between gap-6 py-3">
                  <dt className="label shrink-0 text-muted">off-hours</dt>
                  <dd className="text-right">{interests.join(', ')}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="space-y-20 lg:col-span-8">
            {/* Lead */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
              className="text-2xl leading-snug text-pretty sm:text-3xl"
            >
              {developerInfo.about}
            </motion.p>

            {/* Numbers */}
            <div>
              <SubHeading>{credentials.label}</SubHeading>
              <div className="grid gap-px border border-line bg-line sm:grid-cols-4">
                <div className="bg-bg p-5 theme-fade">
                  <p className="font-display text-5xl font-bold">
                    <CountUp to={yearsShipping} />
                  </p>
                  <p className="label mt-3 text-muted">years shipping</p>
                </div>
                {credentials.items.map((c) => {
                  const pct = parseInt(c.percentile, 10)
                  return (
                    <div key={c.name} className="bg-bg p-5 theme-fade">
                      <p className="font-display text-5xl font-bold">
                        <CountUp to={pct} />
                        <span className="text-2xl text-muted">th</span>
                      </p>
                      <p className="label mt-3 text-muted">{c.name} · pct</p>
                      <div className="mt-3 h-1 bg-surface-2">
                        <motion.div
                          className="h-full origin-left bg-signal"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: pct / 100 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.4, ease: easeOutExpo }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Skills */}
            <div>
              <SubHeading>Skills, strongest first</SubHeading>
              <motion.dl variants={list} initial="hidden" whileInView="visible" viewport={{ once: true }} className="border-t border-line">
                {skillGroups.map((g) => (
                  <motion.div key={g.name} variants={row} className="grid gap-2 border-b border-line py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
                    <dt className="font-display text-lg font-semibold uppercase tracking-wide">{g.name}</dt>
                    <dd className="text-sm leading-relaxed text-muted">{g.skills.join(' · ')}</dd>
                  </motion.div>
                ))}
              </motion.dl>
            </div>

            {/* Education */}
            <div>
              <SubHeading>Education</SubHeading>
              <motion.ul variants={list} initial="hidden" whileInView="visible" viewport={{ once: true }} className="border-t border-line">
                {educations.map((e) => (
                  <motion.li key={e.institution} variants={row} className="flex items-center gap-5 border-b border-line py-4">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-line bg-white">
                      {e.logoUrl && <Image src={e.logoUrl} alt="" fill sizes="48px" className="object-contain p-1 grayscale" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{e.institution}</p>
                      <p className="text-sm text-muted">
                        {e.degree && `${e.degree}, `}
                        {e.field}
                        {e.note && ` — ${e.note}`}
                      </p>
                    </div>
                    <div className="label hidden shrink-0 text-right text-muted sm:block">
                      {e.period}
                      <br />
                      {e.location}
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

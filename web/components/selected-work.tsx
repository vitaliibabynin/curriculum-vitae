'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { selectedProjects, type SelectedProject } from '../app/data'
import { easeOutExpo } from '../lib/motion'
import SectionHeading from './section-heading'
import FieldBox from './field-box'

function ProjectRow({ project, index }: { project: SelectedProject; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-3%', '3%'])
  const flip = index % 2 === 1
  const host = project.live ? new URL(project.live).host.replace(/^www\./, '') : null

  return (
    <article ref={ref} className="grid items-center gap-10 border-t border-line py-14 lg:grid-cols-12 lg:gap-12 lg:py-20">
      {/* Screenshot with clip reveal + parallax */}
      <div className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
        <FieldBox field={host ?? 'screenshot'} className="block">
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 1.1, ease: easeOutExpo }}
            className="relative aspect-[16/10] overflow-hidden border border-line bg-surface-2"
          >
            {project.image && (
              <motion.div style={{ y: imageY }} className="absolute inset-x-0 -inset-y-[4%]">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-top"
                />
              </motion.div>
            )}
          </motion.div>
        </FieldBox>
      </div>

      {/* Copy */}
      <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
        <p className="label mb-4 text-signal">
          {String(index + 1).padStart(2, '0')} / {String(selectedProjects.length).padStart(2, '0')}
        </p>
        <h3 className="font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-5xl">{project.title}</h3>
        <p className="mt-5 text-muted text-pretty">{project.blurb}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
          {project.tags.map((tag) => (
            <li key={tag} className="label border border-line px-2 py-1 text-muted">
              {tag}
            </li>
          ))}
        </ul>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-3 border-b border-fg pb-1 font-medium transition-colors hover:border-signal hover:text-signal"
          >
            Visit {host}
            <span aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  )
}

export default function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-20 px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="work-title" index="03" eyebrow="selected work" title="Shipped & running">
          Products I designed, built and operate myself. Employer and client work stays under NDA, so it is
          described in Experience instead.
        </SectionHeading>
        <div className="border-b border-line">
          {selectedProjects.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { FaMapMarkerAlt, FaBriefcase, FaChevronDown, FaYoutube, FaExternalLinkAlt } from 'react-icons/fa'
import { topExperiences, additionalExperiences, type Experience } from '../app/data'
import { stagger, fadeUp } from '../lib/motion'

const VISIBLE_SKILLS = 6

const chipClass =
  'px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'

const isCurrent = (exp: Experience) => /present/i.test(exp.period)

function StackChips({ stack }: { stack: string[] }) {
  const [expanded, setExpanded] = useState(false)
  const hidden = stack.length - VISIBLE_SKILLS
  const visible = expanded ? stack : stack.slice(0, VISIBLE_SKILLS)

  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
      {visible.map((tech) => (
        <li key={tech} className={chipClass}>{tech}</li>
      ))}
      {hidden > 0 && (
        <li>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="px-2 py-0.5 text-xs rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            {expanded ? 'Show less' : `+${hidden} more`}
          </button>
        </li>
      )}
    </ul>
  )
}

function ExperienceCard({ exp }: { exp: Experience }) {
  const current = isCurrent(exp)

  return (
    <motion.li variants={fadeUp(30)} className="relative pl-12 sm:pl-20">
      {/* Timeline dot — pulses for current roles */}
      <span className="absolute left-2 sm:left-6 top-7 flex h-4 w-4" aria-hidden="true">
        {current && <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60 animate-ping" />}
        <span className="relative inline-flex h-4 w-4 rounded-full bg-blue-500 border-4 border-white dark:border-gray-900" />
      </span>

      <article className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md dark:shadow-gray-900/20 transition-shadow border border-gray-200 dark:border-gray-700">
        <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{exp.title}</h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium">{exp.employer}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 shrink-0">
            <FaBriefcase size={14} aria-hidden="true" />
            <span>{exp.period}</span>
            {current && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Current
              </span>
            )}
          </div>
        </header>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt size={14} aria-hidden="true" />
            {exp.location}
          </span>
          <span className={chipClass}>{exp.workMode}</span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4">{exp.description}</p>

        {exp.highlights && (
          <ul className="mb-4 space-y-1.5 text-sm text-gray-600 dark:text-gray-300">
            {exp.highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" aria-hidden="true" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        <StackChips stack={exp.stack} />

        {(exp.link || exp.youtubeLink) && (
          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            {exp.link && (
              <a
                href={exp.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                <FaExternalLinkAlt size={12} aria-hidden="true" />
                {exp.link.label}
              </a>
            )}
            {exp.youtubeLink && (
              <a
                href={exp.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
              >
                <FaYoutube size={16} aria-hidden="true" />
                Watch video
              </a>
            )}
          </div>
        )}
      </article>
    </motion.li>
  )
}

export default function ExperiencesTimeline() {
  const [showAll, setShowAll] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto px-4 sm:px-6">
      {/* Timeline line: track + scroll-driven progress */}
      <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true" />
      <motion.div
        className="absolute left-4 sm:left-8 top-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 origin-top"
        style={{ height: lineHeight }}
        aria-hidden="true"
      />

      <motion.ol
        variants={stagger(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="space-y-8"
      >
        {topExperiences.map((exp) => (
          <ExperienceCard key={exp.title + exp.employer} exp={exp} />
        ))}
      </motion.ol>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          aria-expanded={showAll}
          aria-controls="earlier-experience"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
        >
          <FaChevronDown
            size={14}
            aria-hidden="true"
            className={`transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
          />
          {showAll ? 'Hide earlier roles' : `Show ${additionalExperiences.length} earlier roles`}
        </button>
      </div>

      {/* Earlier roles — unmounted when collapsed so they stay out of the tab order */}
      <AnimatePresence initial={false}>
        {showAll && (
          <motion.ol
            id="earlier-experience"
            key="earlier"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-8 space-y-6 pl-12 sm:pl-20">
              {additionalExperiences.map((exp) => (
                <li key={exp.title + exp.employer} className="relative">
                  <span
                    className="absolute -left-10 sm:-left-14 top-5 w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600 border-2 border-white dark:border-gray-900"
                    aria-hidden="true"
                  />
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700/50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {exp.title} — {exp.employer}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{exp.period}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{exp.description}</p>
                  </div>
                </li>
              ))}
            </div>
          </motion.ol>
        )}
      </AnimatePresence>
    </div>
  )
}

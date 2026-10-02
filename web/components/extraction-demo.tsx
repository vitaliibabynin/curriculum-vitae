'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

// Illustrative inputs only (invented, not client data). Each one is free text with the spans an
// extractor would find; `value` is the normalised field it writes, which is the point of the demo:
// messy language in, typed, auditable record out.
type Segment = string | { text: string; key: string; value: string }

const EXAMPLES: { source: string; kind: string; segments: Segment[]; confidence: string; ms: number }[] = [
  {
    source: 'voice_note_0412.m4a',
    kind: 'transcript',
    segments: [
      'Site visit at ',
      { text: 'Hauptstraße 12', key: 'address', value: '"Hauptstraße 12, Bonn"' },
      '. Roof membrane is ',
      { text: 'torn on the north side', key: 'defect', value: '"membrane_tear"' },
      ', roughly ',
      { text: 'forty square metres', key: 'area_m2', value: '40' },
      '. Has to be fixed ',
      { text: 'before the first frost', key: 'due', value: '"2026-11-01"' },
      '.',
    ],
    confidence: '0.97',
    ms: 412,
  },
  {
    source: 'scan_2291.pdf',
    kind: 'ocr',
    segments: [
      'RECHNUNG Nr. ',
      { text: 'RE-2291', key: 'invoice_id', value: '"RE-2291"' },
      ' · Datum ',
      { text: '14.09.2026', key: 'issued', value: '"2026-09-14"' },
      ' · Gesamtbetrag ',
      { text: '1.840,00 €', key: 'total_eur', value: '1840.00' },
      ' · Zahlbar ',
      { text: 'innerhalb 14 Tagen netto', key: 'terms', value: '"net_14"' },
    ],
    confidence: '0.99',
    ms: 286,
  },
  {
    source: 'whatsapp · inbound',
    kind: 'message',
    segments: [
      'hi!! could we ',
      { text: 'move my appointment', key: 'intent', value: '"reschedule"' },
      ' to ',
      { text: 'thursday after 3', key: 'slot', value: '"Thu ≥ 15:00"' },
      '? its for the ',
      { text: 'teeth cleaning', key: 'service', value: '"dental_hygiene"' },
      ', ',
      { text: 'Anna K', key: 'customer', value: '"Anna K."' },
      ' :)',
    ],
    confidence: '0.94',
    ms: 538,
  },
]

const STEP_MS = 700
const HOLD_MS = 2800

export default function ExtractionDemo() {
  const reduced = useReducedMotion()
  const [exIdx, setExIdx] = useState(0)
  const [step, setStep] = useState(0)

  const example = EXAMPLES[exIdx]
  const fields = example.segments.filter((s): s is Exclude<Segment, string> => typeof s !== 'string')
  const done = step >= fields.length
  const shownStep = reduced ? fields.length : step

  useEffect(() => {
    const t = setTimeout(
      () => {
        if (reduced || done) {
          setExIdx((i) => (i + 1) % EXAMPLES.length)
          setStep(0)
        } else {
          setStep((s) => s + 1)
        }
      },
      reduced ? 6000 : done ? HOLD_MS : step === 0 ? 1100 : STEP_MS
    )
    return () => clearTimeout(t)
  }, [step, done, reduced])

  let fieldCounter = -1

  return (
    <div className="relative border border-line bg-surface/80 backdrop-blur-sm theme-fade" aria-label="Animated demo: free text turned into a structured record">
      {/* title bar */}
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="label text-muted">
          intake <span className="text-fg">/</span> {example.source}
        </span>
        <span className="label text-muted">{example.kind}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={exIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* source text with scan line */}
          <div className="relative overflow-hidden px-4 py-5 sm:px-5">
            {!done && !reduced && (
              <span className="pointer-events-none absolute inset-x-0 h-8 -translate-y-1/2 animate-scan bg-gradient-to-b from-transparent via-signal/15 to-transparent" />
            )}
            <p className="relative text-[15px] leading-9 text-fg/90">
              {example.segments.map((seg, i) => {
                if (typeof seg === 'string') return <span key={i}>{seg}</span>
                fieldCounter += 1
                const hit = fieldCounter < shownStep
                return (
                  <span
                    key={i}
                    className={`relative px-0.5 transition-colors duration-300 ${hit ? 'bg-signal/15 outline outline-1 outline-signal' : ''}`}
                  >
                    {seg.text}
                    {hit && (
                      <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="label absolute -top-3.5 left-0 whitespace-nowrap bg-signal px-1 text-[9px] leading-[14px] text-on-signal"
                      >
                        {seg.key}
                      </motion.span>
                    )}
                  </span>
                )
              })}
            </p>
          </div>

          {/* structured output */}
          <div className="border-t border-dashed border-line bg-surface-2/35 px-4 py-4 font-mono text-[12.5px] leading-6 sm:px-5">
            <div className="text-muted">{'{'}</div>
            {fields.map((f, i) => (
              <motion.div
                key={f.key}
                initial={false}
                animate={{ opacity: i < shownStep ? 1 : 0.18, x: i < shownStep ? 0 : -4 }}
                transition={{ duration: 0.3 }}
                className="pl-4"
              >
                <span className="text-signal">&quot;{f.key}&quot;</span>
                <span className="text-muted">: </span>
                <span className="text-fg">{i < shownStep ? f.value : '…'}</span>
                {i < fields.length - 1 && <span className="text-muted">,</span>}
              </motion.div>
            ))}
            <div className="text-muted">{'}'}</div>
          </div>

          {/* status line */}
          <div className="flex items-center justify-between border-t border-line px-4 py-2.5 sm:px-5">
            {done || reduced ? (
              <span className="label text-ok">✓ validated · schema ok · audit logged</span>
            ) : (
              <span className="label text-muted">
                extracting<span className="animate-blink">_</span> {Math.min(step, fields.length)}/{fields.length}
              </span>
            )}
            <span className="label text-muted">
              conf {done || reduced ? example.confidence : '—'} · {done || reduced ? `${example.ms} ms` : '…'}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

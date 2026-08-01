import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useScroll, useSpring } from 'motion/react'
import { education, learning } from '@/data/site'
import { GraduationCap } from 'lucide-react'
import Marquee from './Marquee'

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return <span ref={ref}>{display}</span>
}

export default function Education() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 60%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })

  return (
    <section id="education" className="relative overflow-hidden py-28">
      <div className="absolute right-[-10%] top-1/4 h-[380px] w-[380px] rounded-full bg-accent/10 blur-[140px]" aria-hidden="true" />

      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-3 text-sm font-medium tracking-[0.35em] text-accent-soft uppercase">Education</p>
        <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          The road so <span className="text-accent">far</span>
        </h2>
        <p className="mt-4 max-w-xl text-neutral-400">
          Every grade, every lesson — slowly building towards something bigger.
        </p>

        <div ref={ref} className="relative mt-16">
          {/* timeline track */}
          <div className="absolute left-4 top-0 h-full w-px bg-white/10 sm:left-1/2 sm:-translate-x-1/2" aria-hidden="true" />
          {/* animated progress line */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-accent via-accent/70 to-transparent sm:left-1/2 sm:-translate-x-1/2"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {education.map((item, i) => {
              const left = i % 2 === 0
              const pct = item.detail.endsWith('%') ? parseInt(item.detail, 10) : null
              return (
                <div key={item.stage} className="relative grid gap-6 sm:grid-cols-2 sm:gap-0">
                  {/* node dot */}
                  <span className="absolute left-4 top-2 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center sm:left-1/2">
                    <span className="absolute h-4 w-4 animate-ping rounded-full bg-accent/40" />
                    <span className="relative h-3 w-3 rounded-full bg-accent ring-4 ring-[#07080c]" />
                  </span>

                  {/* card */}
                  <div className={left ? 'pl-12 sm:col-start-1 sm:pr-14 sm:pl-0' : 'pl-12 sm:col-start-2 sm:pl-14'}>
                    <motion.div
                      initial={{ opacity: 0, y: 28, x: left ? -20 : 20 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      viewport={{ once: true, amount: 0.05 }}
                      transition={{ duration: 0.6, ease: [0.21, 0.65, 0.32, 0.99] }}
                      className="group rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_70px_-24px_rgba(79,124,255,0.4)]"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-neutral-300">
                          <GraduationCap className="h-3.5 w-3.5 text-accent-soft" />
                          {item.year}
                        </span>
                        {pct !== null ? (
                          <span className="font-display text-4xl font-bold tabular-nums text-white sm:text-5xl">
                            <span className="bg-gradient-to-r from-accent to-accent-soft bg-clip-text text-transparent">
                              <CountUp value={pct} />
                            </span>
                            <span className="text-accent-soft">%</span>
                          </span>
                        ) : (
                          <span className="font-display text-2xl font-bold text-white">
                            <span className="bg-gradient-to-r from-accent to-accent-soft bg-clip-text text-transparent">
                              {item.detail}
                            </span>
                          </span>
                        )}
                      </div>

                      {/* animated percentage bar */}
                      {pct !== null && (
                        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true, amount: 0.05 }}
                            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                            className="h-full rounded-full bg-gradient-to-r from-accent via-accent-soft to-white shadow-[0_0_16px_rgba(79,124,255,0.7)]"
                          />
                        </div>
                      )}

                      <h3 className="mt-5 font-display text-xl font-bold text-white sm:text-2xl">{item.stage}</h3>
                      <p className="mt-1 text-sm text-neutral-400">{item.school}</p>
                      <div className="mt-4 h-px w-full bg-gradient-to-r from-accent/40 to-transparent" />
                      <p className="mt-3 text-xs font-medium tracking-[0.25em] text-neutral-500 uppercase">
                        {item.highlight}
                      </p>
                    </motion.div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* subtle marquee of subjects */}
      <div className="mt-20 border-y border-white/5 bg-white/[0.02]">
        <p className="pt-8 text-center text-xs font-medium tracking-[0.4em] text-neutral-500 uppercase">
          Currently learning
        </p>
        <Marquee small speed="70s" items={learning} />
      </div>
    </section>
  )
}

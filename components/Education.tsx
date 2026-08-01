import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { education } from '@/data/site'
import { GraduationCap } from 'lucide-react'

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
              return (
                <div key={item.stage} className="relative grid gap-6 sm:grid-cols-2 sm:gap-0">
                  {/* node dot */}
                  <span className="absolute left-4 top-2 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center sm:left-1/2">
                    <span className="absolute h-4 w-4 animate-ping rounded-full bg-accent/40" />
                    <span className="relative h-3 w-3 rounded-full bg-accent ring-4 ring-[#07080c]" />
                  </span>

                  {/* card */}
                  <div className={`pl-12 sm:pl-0 ${left ? 'sm:pr-14' : 'sm:col-start-2 sm:pl-14'}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 28, x: left ? -20 : 20 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.6, ease: [0.21, 0.65, 0.32, 0.99] }}
                      className="group rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_70px_-24px_rgba(79,124,255,0.4)]"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-neutral-300">
                          <GraduationCap className="h-3.5 w-3.5 text-accent-soft" />
                          {item.year}
                        </span>
                        <span className="font-display text-3xl font-bold text-white transition-colors group-hover:text-accent-soft">
                          {item.detail}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-xl font-bold text-white sm:text-2xl">{item.stage}</h3>
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
    </section>
  )
}

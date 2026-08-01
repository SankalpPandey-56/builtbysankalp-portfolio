import { motion } from 'motion/react'
import { services } from '@/data/site'

export default function Services() {
  return (
    <section id="services" className="relative border-y border-white/10 bg-white/[0.02] py-28">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-3 text-sm font-medium tracking-[0.35em] text-accent-soft uppercase">Services</p>
        <h2 className="max-w-3xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Growing with every challenge & driven by impact
        </h2>
        <p className="mt-5 max-w-2xl text-neutral-400">
          My approach blends design, development, and brand strategy — uniting vision and execution to deliver clarity
          and a distinct edge on every project.
        </p>

        <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.21, 0.65, 0.32, 0.99] }}
              className="group grid gap-6 py-9 transition-colors duration-300 hover:bg-white/[0.03] lg:grid-cols-[auto_1fr_1.4fr] lg:items-start lg:gap-10"
            >
              <span className="font-display text-2xl font-bold text-accent/70">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display text-2xl font-bold text-white transition-colors group-hover:text-accent-soft sm:text-3xl">
                {s.title}
              </h3>
              <div>
                <p className="max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">{s.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.chips.map((c) => (
                    <span
                      key={c}
                      className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-neutral-300 transition-colors duration-300 group-hover:border-accent/30"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

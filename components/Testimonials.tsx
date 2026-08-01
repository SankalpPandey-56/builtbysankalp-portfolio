import { motion } from 'motion/react'
import { site, stats } from '@/data/site'
import { Sparkles, Rocket } from 'lucide-react'

export default function Testimonials() {
  return (
    <section id="about" className="relative border-y border-white/10 bg-white/[0.02] py-28">
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* about */}
          <div>
            <p className="mb-3 text-sm font-medium tracking-[0.35em] text-accent-soft uppercase">About me</p>
            <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Honest about where I <span className="text-accent">am</span>
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: [0.21, 0.65, 0.32, 0.99] }}
              className="relative mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-8"
            >
              <span className="absolute -top-5 left-8 font-display text-7xl leading-none text-accent" aria-hidden="true">
                “
              </span>
              <p className="text-lg leading-relaxed text-neutral-200 sm:text-xl">{site.bio}</p>
              <footer className="mt-6 flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent to-indigo-500 font-display text-base font-bold text-white">
                  {site.firstName[0]}
                </span>
                <div>
                  <p className="font-semibold text-white">{site.firstName}</p>
                  <p className="text-sm text-neutral-500">First-year student · Newton School of Technology, ADYPU, Pune</p>
                </div>
              </footer>
            </motion.div>

            {/* honest badges */}
            <div className="mt-6 flex flex-wrap gap-3">
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300"
              >
                <Sparkles className="h-4 w-4" />
                AI & Prompt Expert
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent-soft"
              >
                <Rocket className="h-4 w-4" />
                Learning HTML · CSS · Python
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-neutral-300"
              >
                🤖 This site? Built with AI
              </motion.span>
            </div>
          </div>

          {/* stats */}
          <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.21, 0.65, 0.32, 0.99] }}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_16px_60px_-20px_rgba(79,124,255,0.4)]"
              >
                <p className="font-display text-5xl font-bold text-white transition-colors group-hover:text-accent-soft sm:text-6xl">
                  {s.value}
                </p>
                <p className="mt-2 text-sm font-medium text-neutral-400">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

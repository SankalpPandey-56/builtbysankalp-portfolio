import { motion } from 'motion/react'
import { repos, site } from '@/data/site'
import { ArrowUpRightIcon, GithubIcon } from '@/components/icons'

const langColors: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#3178C6',
  JavaScript: '#F1E05A',
  CSS: '#563D7C',
  Web: '#4f7cff',
  HTML: '#E34C26',
}

export default function Work() {
  return (
    <section id="work" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-sm font-medium tracking-[0.35em] text-accent-soft uppercase">Work '26</p>
            <h2 className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Projects & experiments
            </h2>
            <p className="mt-4 max-w-xl text-neutral-400">
              Everything live on my GitHub — real repos, real builds. Open source, always tinkering.
            </p>
          </div>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-medium text-neutral-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:text-white"
          >
            <GithubIcon className="h-4 w-4" />
            See all on GitHub
            <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {repos.map((repo, i) => {
            const color = langColors[repo.lang] ?? '#6b7280'
            return (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: (i % 2) * 0.08, ease: [0.21, 0.65, 0.32, 0.99] }}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_20px_80px_-20px_rgba(79,124,255,0.35)] ${
                  i === 0 ? 'md:col-span-2' : ''
                }`}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-400">
                    {repo.year}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                    {repo.lang}
                  </span>
                  {repo.home && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                      Live
                      <ArrowUpRightIcon className="h-3 w-3" />
                    </span>
                  )}
                </div>

                <h3 className="mt-5 flex items-center gap-2 font-display text-2xl font-bold text-white transition-colors group-hover:text-accent-soft sm:text-3xl">
                  {repo.name}
                  <ArrowUpRightIcon className="h-5 w-5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
                  {repo.desc}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {repo.topics.map((t) => (
                    <span key={t} className="rounded-md bg-white/[0.06] px-2.5 py-1 text-xs text-neutral-300">
                      {t}
                    </span>
                  ))}
                </div>

                {/* hover glow line */}
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

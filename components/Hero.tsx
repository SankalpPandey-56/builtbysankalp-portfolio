import { motion } from 'motion/react'
import { site } from '@/data/site'
import { ArrowDownIcon, GithubIcon, MailIcon } from '@/components/icons'
import { Magnetic } from '@/components/core/magnetic'
import { Spotlight } from '@/components/core/spotlight'
import Toolbar from '@/components/Toolbar'

/**
 * Studio-lumio-style text roll: every character is stacked over a styled
 * duplicate (outlined) inside an overflow-hidden mask. On hover the stack
 * rolls up character by character with a stagger.
 */
function RollText({ text, className = '', rollClassName = 'text-stroke-white' }: { text: string; className?: string; rollClassName?: string }) {
  return (
    <span className={`group/roll ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split('').map((char, i) =>
          char === ' ' ? (
            <span key={i} className="inline-block w-[0.3em]" />
          ) : (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <span
                className="block transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/roll:-translate-y-1/2"
                style={{ transitionDelay: `${i * 22}ms` }}
              >
                <span className="block leading-[0.9]">{char}</span>
                <span className={`${rollClassName} block leading-[0.9]`}>{char}</span>
              </span>
            </span>
          ),
        )}
      </span>
    </span>
  )
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-24 pb-36">
      {/* backdrop */}
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div className="animate-pulse-glow absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-accent/20 blur-[160px]" aria-hidden="true" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[420px] w-[420px] rounded-full bg-indigo-500/10 blur-[140px]" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 text-center">
        {/* eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center gap-3 text-sm font-medium tracking-[0.35em] text-accent-soft uppercase"
        >
          <span className="h-px w-8 bg-accent/50" aria-hidden="true" />
          Hello, I am
          <span className="h-px w-8 bg-accent/50" aria-hidden="true" />
        </motion.p>

        {/* name — rolls on hover */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.65, 0.32, 0.99] }}
          className="font-display leading-[0.9] font-bold tracking-tight text-white"
        >
          <RollText
            text={site.firstName.toUpperCase()}
            className="block text-[16vw] sm:text-[14vw] lg:text-[11vw] xl:text-[9.5rem]"
          />
          <RollText
            text="PANDEY"
            rollClassName="text-stroke-accent"
            className="block text-[16vw] sm:text-[14vw] lg:text-[11vw] xl:text-[9.5rem]"
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 max-w-md text-base text-neutral-400 sm:text-lg"
        >
          {site.role} · {site.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic intensity={0.35} springOptions={{ bounce: 0.1 }} actionArea="global" range={220}>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-neutral-950 transition-colors duration-300 hover:bg-neutral-200"
            >
              <MailIcon className="h-4 w-4" />
              Let's connect
            </a>
          </Magnetic>
          <Magnetic intensity={0.35} springOptions={{ bounce: 0.1 }} actionArea="global" range={220}>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 font-semibold text-neutral-200 transition-colors duration-300 hover:border-accent/60 hover:text-white"
            >
              <GithubIcon className="h-4 w-4" />
              For cool sh*t
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-7 flex items-center justify-center gap-3"
        >
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-neutral-500 underline-offset-4 transition-colors hover:text-accent-soft hover:underline"
          >
            {site.email}
          </a>
          <span className="h-1 w-1 rounded-full bg-neutral-700" />
          <span className="text-sm text-neutral-500">📍 {site.location}</span>
        </motion.div>
      </div>

      {/* photo — pinned to the bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9, ease: [0.21, 0.65, 0.32, 0.99] }}
        className="absolute bottom-24 left-1/2 z-10 -translate-x-1/2"
      >
        <Magnetic intensity={0.22} springOptions={{ bounce: 0.1 }} actionArea="global" range={240}>
          <a href="#about" data-cursor="photo" aria-label={`More about ${site.firstName}`} className="relative block">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/30 via-transparent to-indigo-500/20 opacity-60 blur-2xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-neutral-900 shadow-2xl shadow-black/60">
                <img
                  src={site.photo}
                  alt={`Portrait of ${site.firstName}`}
                  fetchPriority="high"
                  className="aspect-[4/5] w-32 object-cover grayscale transition-all duration-700 hover:scale-105 hover:grayscale-0 sm:w-36"
                />
                <Spotlight className="absolute inset-0" size={200} springOptions={{ stiffness: 200, damping: 20 }} />
              </div>
            </motion.div>
          </a>
        </Magnetic>
      </motion.div>

      {/* toolbar dock — bottom-right so it never overlaps the centered photo */}
      <Toolbar />

      {/* scroll cue — bottom-left */}
      <a
        href="#work"
        className="absolute bottom-7 left-10 z-10 hidden flex-col items-center gap-1.5 text-neutral-500 transition-colors hover:text-neutral-300 sm:flex"
      >
        <span className="text-[11px] font-medium tracking-[0.35em] uppercase">Scroll for cool sh*t</span>
        <ArrowDownIcon className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  )
}

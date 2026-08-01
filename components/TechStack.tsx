import { motion } from 'motion/react'
import { stack } from '@/data/site'
import Marquee from '@/components/Marquee'

export default function TechStack() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="mb-3 text-sm font-medium tracking-[0.35em] text-accent-soft uppercase">Professional at</p>
        <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Modern
          <span className="text-accent"> tech </span>
          stack
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-neutral-400">
          Tools I reach for every day — from frontend to backend, animation to AI.
        </p>
      </div>

      <div className="mt-14">
        <Marquee items={stack} />
        <Marquee items={stack} reverse className="border-y border-white/10" />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto mt-14 max-w-2xl px-6 text-center text-sm text-neutral-500"
      >
        And always learning the next one — because the best developers stay students forever.
      </motion.p>
    </section>
  )
}

import { motion } from 'motion/react'
import { site } from '@/data/site'
import { ArrowUpRightIcon, GithubIcon, InstagramIcon, LinkedinIcon, MailIcon } from '@/components/icons'
import { Spotlight } from '@/components/core/spotlight'

const socials = [
  { label: 'Email Me', href: `mailto:${site.email}`, Icon: MailIcon },
  { label: 'GitHub', href: site.github, Icon: GithubIcon },
  { label: 'LinkedIn', href: site.linkedin, Icon: LinkedinIcon },
  { label: 'Instagram', href: site.instagram, Icon: InstagramIcon },
]

export default function Contact() {
  return (
    <footer id="contact" className="relative overflow-hidden py-28">
      <div className="animate-pulse-glow absolute bottom-[-30%] left-1/2 h-[420px] w-[800px] -translate-x-1/2 rounded-full bg-accent/15 blur-[160px]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="mb-3 text-sm font-medium tracking-[0.35em] text-accent-soft uppercase">Get in Touch</p>
        <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Let's build something
          <span className="text-accent"> cool </span>
          together
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-neutral-400">
          Interested in working together or have a project in mind? Let's connect and discuss how we can bring your
          ideas to life.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 px-6 py-3 font-medium text-neutral-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:text-white"
            >
              <Icon className="h-4 w-4 text-neutral-400 transition-colors group-hover:text-accent-soft" />
              {label}
              <ArrowUpRightIcon className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </a>
          ))}
        </div>

        <p className="mt-12 text-sm text-neutral-500">
          Based in 📍 {site.location} · Available for remote work worldwide
        </p>

        {/* photo — bottom of the site */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.21, 0.65, 0.32, 0.99] }}
          className="relative mt-12 inline-block"
        >
          <a href="#about" data-cursor="photo" aria-label={`More about ${site.firstName}`} className="group relative block">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/25 to-indigo-500/15 opacity-60 blur-xl transition-opacity duration-500 group-hover:opacity-90" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-neutral-900 shadow-xl shadow-black/50">
              <img
                src={site.photo}
                alt={`Portrait of ${site.firstName}`}
                loading="lazy"
                className="aspect-[4/5] w-28 object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 sm:w-32"
              />
              <Spotlight className="absolute inset-0" size={180} springOptions={{ stiffness: 200, damping: 20 }} />
            </div>
          </a>
        </motion.div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 border-t border-white/10 pt-8 text-sm text-neutral-600 sm:flex-row sm:gap-8">
          <span>© 2026 {site.brand}</span>
          <span className="hidden h-1 w-1 rounded-full bg-neutral-700 sm:block" />
          <span>
            Designed & built with <span className="text-neutral-400">React · Motion · Tailwind</span> and a lot of
            AI 🤖 + curiosity
          </span>
        </div>
      </div>
    </footer>
  )
}

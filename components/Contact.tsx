import { site } from '@/data/site'
import { ArrowUpRightIcon, GithubIcon, InstagramIcon, LinkedinIcon, MailIcon } from '@/components/icons'

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

        <div className="mt-10 flex flex-col items-center justify-center gap-3 border-t border-white/10 pt-8 text-sm text-neutral-600 sm:flex-row sm:gap-8">
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

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { site } from '@/data/site'
import { ScrollProgress } from '@/components/core/scroll-progress'
import GlobalCursor from '@/components/GlobalCursor'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Work from '@/components/Work'
import Services from '@/components/Services'
import TechStack from '@/components/TechStack'
import Testimonials from '@/components/Testimonials'
import Education from '@/components/Education'
import Contact from '@/components/Contact'

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

// stable module-level array so the scroll-spy effect doesn't re-subscribe every render
const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1))

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      const probe = window.innerHeight * 0.35
      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= probe) current = id
      }
      // if we're at the very bottom, highlight the last section
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40) {
        current = ids[ids.length - 1]
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}

function Navbar() {
  const active = useActiveSection(SECTION_IDS)
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-sm font-bold tracking-[0.25em] text-white">
          {site.brand}
        </a>
        <div className="flex items-center gap-4 sm:gap-6">
          {NAV_LINKS.map((l) => {
            const isActive = active === l.href.slice(1)
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative py-1 text-xs font-medium transition-colors sm:text-sm ${
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {l.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-gradient-to-r from-accent to-accent-soft"
                  />
                )}
              </a>
            )
          })}
        </div>
      </nav>
    </header>
  )
}

function App() {
  return (
    <div id="top" className="relative min-h-screen overflow-x-clip bg-[#07080c] text-neutral-200">
      {/* scroll progress bar pinned to the top of the viewport */}
      <div className="pointer-events-none fixed left-0 top-0 z-[9998] h-[3px] w-full">
        <ScrollProgress
          className="h-full w-full origin-left bg-[linear-gradient(to_right,rgba(255,255,255,0),#4f7cff_60%,#ffffff_100%)]"
          springOptions={{ stiffness: 280, damping: 18, mass: 0.3 }}
        />
      </div>
      <GlobalCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee items={['HIGHLY SKILLED', 'WEB DEVELOPER', 'FIRST-YEAR STUDENT', 'FOR COOL SH*T']} />
        <Work />
        <Services />
        <TechStack />
        <Testimonials />
        <Education />
        <Contact />
      </main>
    </div>
  )
}

export default App

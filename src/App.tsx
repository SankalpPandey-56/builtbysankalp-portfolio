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

function Navbar() {
  const links = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ]
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-sm font-bold tracking-[0.25em] text-white">
          {site.brand}
        </a>
        <div className="flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
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

'use client'

import { useEffect, useRef, useState } from 'react'
import useMeasure from 'react-use-measure'
import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import type { Transition } from 'motion/react'
import { cn } from '@/lib/utils'
import useClickOutside from '@/hooks/useClickOutside'
import { Folder, MessageCircle, User, WalletCards } from 'lucide-react'
import { site } from '@/data/site'

const transition: Transition = {
  type: 'spring',
  bounce: 0.1,
  duration: 0.25,
}

const ITEMS = [
  {
    id: 1,
    label: 'User',
    title: <User className="h-5 w-5" />,
    content: (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-1 text-zinc-200">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent to-indigo-500 font-display text-sm font-bold text-white">
            {site.firstName[0]}
          </div>
          <span>{site.firstName}</span>
        </div>
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer"
          className="relative flex h-8 w-full scale-100 select-none appearance-none items-center justify-center rounded-lg border border-white/10 px-2 text-sm text-zinc-400 transition-colors hover:bg-white/10 hover:text-zinc-100 focus-visible:ring-2 active:scale-[0.98]"
        >
          View GitHub
        </a>
      </div>
    ),
  },
  {
    id: 2,
    label: 'Messages',
    title: <MessageCircle className="h-5 w-5" />,
    content: (
      <div className="flex flex-col space-y-4">
        <div className="text-zinc-300">Have a project? Let's talk.</div>
        <a
          href={`mailto:${site.email}`}
          className="relative flex h-8 w-full scale-100 select-none appearance-none items-center justify-center rounded-lg border border-white/10 px-2 text-sm text-zinc-400 transition-colors hover:bg-white/10 hover:text-zinc-100 focus-visible:ring-2 active:scale-[0.98]"
        >
          Email me
        </a>
      </div>
    ),
  },
  {
    id: 3,
    label: 'Documents',
    title: <Folder className="h-5 w-5" />,
    content: (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-1 text-zinc-300">
          <div className="space-y-1 text-sm">
            <div>friday.py</div>
            <div>portfoliooo.tsx</div>
            <div>nudge.css</div>
          </div>
        </div>
        <a
          href={`${site.github}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
          className="relative flex h-8 w-full scale-100 select-none appearance-none items-center justify-center rounded-lg border border-white/10 px-2 text-sm text-zinc-400 transition-colors hover:bg-white/10 hover:text-zinc-100 focus-visible:ring-2 active:scale-[0.98]"
        >
          All repos
        </a>
      </div>
    ),
  },
  {
    id: 4,
    label: 'Wallet',
    title: <WalletCards className="h-5 w-5" />,
    content: (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col text-zinc-300">
          <span>Open to</span>
          <span className="font-semibold text-zinc-100">Internships & Freelance</span>
        </div>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noreferrer"
          className="relative flex h-8 w-full scale-100 select-none appearance-none items-center justify-center rounded-lg border border-white/10 px-2 text-sm text-zinc-400 transition-colors hover:bg-white/10 hover:text-zinc-100 focus-visible:ring-2 active:scale-[0.98]"
        >
          Connect on LinkedIn
        </a>
      </div>
    ),
  },
]

export default function Toolbar() {
  const [active, setActive] = useState<number | null>(null)
  const [contentRef, { height: heightContent }] = useMeasure()
  const [menuRef, { width: widthContainer }] = useMeasure()
  const ref = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [maxWidth, setMaxWidth] = useState(0)

  useClickOutside(ref, () => {
    setIsOpen(false)
    setActive(null)
  })

  useEffect(() => {
    if (!widthContainer || maxWidth > 0) return
    setMaxWidth(widthContainer)
  }, [widthContainer, maxWidth])

  return (
    <MotionConfig transition={transition}>
      <div className="absolute bottom-8 right-6 sm:right-8" ref={ref}>
        <div className="h-full w-full rounded-xl border border-white/10 bg-zinc-950/85 shadow-2xl shadow-black/60 backdrop-blur-xl">
          <div className="overflow-hidden">
            <AnimatePresence initial={false} mode="sync">
              {isOpen ? (
                <motion.div
                  key="content"
                  initial={{ height: 0 }}
                  animate={{ height: Math.min(heightContent || 0, 320) }}
                  exit={{ height: 0 }}
                  style={{ width: maxWidth }}
                  className="overflow-y-auto"
                >
                  <div ref={contentRef} className="p-2">
                    {ITEMS.map((item) => {
                      const isSelected = active === item.id

                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isSelected ? 1 : 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <div className={cn('px-2 pt-2 text-sm', isSelected ? 'block' : 'hidden')}>
                            {item.content}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          <div className="flex space-x-2 p-2" ref={menuRef}>
            {ITEMS.map((item) => (
              <button
                key={item.id}
                aria-label={item.label}
                className={cn(
                  'relative flex h-9 w-9 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/10 hover:text-zinc-100 focus-visible:ring-2 active:scale-[0.98]',
                  active === item.id ? 'bg-white/10 text-zinc-100' : '',
                )}
                type="button"
                onClick={() => {
                  if (!isOpen) setIsOpen(true)
                  if (active === item.id) {
                    setIsOpen(false)
                    setActive(null)
                    return
                  }
                  setActive(item.id)
                }}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}

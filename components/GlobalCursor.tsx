'use client'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { Cursor } from '@/components/core/cursor'

type Mode = 'default' | 'link' | 'photo'

export default function GlobalCursor() {
  const [mode, setMode] = useState<Mode>('default')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = (e: PointerEvent) => {
      setVisible(true)
      const target = e.target as HTMLElement
      if (target.closest('[data-cursor="photo"]')) {
        setMode('photo')
      } else if (target.closest('a, button, [role="button"], [data-cursor="link"]')) {
        setMode('link')
      } else {
        setMode('default')
      }
    }
    const hide = () => setVisible(false)
    window.addEventListener('pointermove', update, { passive: true })
    document.addEventListener('pointerleave', hide)
    return () => {
      window.removeEventListener('pointermove', update)
      document.removeEventListener('pointerleave', hide)
    }
  }, [])

  return (
    <Cursor
      springConfig={{ stiffness: 420, damping: 34, mass: 0.6 }}
      variants={{
        initial: { scale: 0.4, opacity: 0 },
        animate: { scale: 1, opacity: visible ? 1 : 0 },
        exit: { scale: 0.4, opacity: 0 },
      }}
      transition={{ ease: 'easeInOut', duration: 0.15 }}
    >
      <motion.div
        animate={{
          width: mode === 'photo' ? 92 : mode === 'link' ? 44 : 12,
          height: mode === 'photo' ? 40 : mode === 'link' ? 44 : 12,
          backgroundColor: mode === 'default' ? 'rgba(255,255,255,0.95)' : mode === 'link' ? 'rgba(79,124,255,0.15)' : 'rgba(255,255,255,0.95)',
          borderColor: mode === 'default' ? 'rgba(255,255,255,0)' : 'rgba(79,124,255,0.7)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 26 }}
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
        style={{ borderWidth: 1 }}
      >
        <AnimatePresence>
          {mode === 'photo' ? (
            <motion.span
              key="photo"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="inline-flex items-center gap-1 whitespace-nowrap text-[13px] font-semibold text-zinc-950"
            >
              More <Plus className="h-3.5 w-3.5" />
            </motion.span>
          ) : mode === 'link' ? (
            <motion.span
              key="link"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="h-2 w-2 rounded-full bg-accent"
            />
          ) : null}
        </AnimatePresence>
      </motion.div>
    </Cursor>
  )
}

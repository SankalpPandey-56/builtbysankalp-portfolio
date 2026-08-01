'use client'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import type { SpringOptions, TargetAndTransition, Transition } from 'motion/react'

export interface CursorProps {
  children: ReactNode
  attachToParent?: boolean
  variants?: {
    initial?: TargetAndTransition
    animate?: TargetAndTransition
    exit?: TargetAndTransition
  }
  springConfig?: SpringOptions
  transition?: Transition
  onPositionChange?: (x: number, y: number) => void
}

/**
 * A spring-following cursor. Positioned fixed to the viewport by default;
 * pass `attachToParent` to position relative to its parent instead.
 */
export function Cursor({
  children,
  attachToParent = false,
  variants,
  springConfig,
  transition,
  onPositionChange,
}: CursorProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, springConfig)
  const sy = useSpring(y, springConfig)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (attachToParent && ref.current?.parentElement) {
        const rect = ref.current.parentElement.getBoundingClientRect()
        x.set(e.clientX - rect.left)
        y.set(e.clientY - rect.top)
      } else {
        x.set(e.clientX)
        y.set(e.clientY)
      }
      onPositionChange?.(e.clientX, e.clientY)
    }
    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [attachToParent, x, y, onPositionChange])

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className={attachToParent ? 'pointer-events-none absolute left-0 top-0 z-[9999]' : 'pointer-events-none fixed left-0 top-0 z-[9999]'}
      initial={variants?.initial}
      animate={variants?.animate}
      exit={variants?.exit}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}

'use client'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import type { SpringOptions } from 'motion/react'

export interface MagneticProps {
  children: ReactNode
  intensity?: number
  springOptions?: SpringOptions
  actionArea?: 'parent' | 'global'
  range?: number
  className?: string
}

/**
 * Pulls its children toward the pointer, like a magnet.
 */
export function Magnetic({
  children,
  intensity = 0.3,
  springOptions,
  actionArea = 'parent',
  range = 200,
  className = '',
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, springOptions)
  const sy = useSpring(y, springOptions)

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy)
      if (dist > range) {
        x.set(0)
        y.set(0)
        return
      }
      const strength = 1 - dist / range
      x.set((e.clientX - cx) * intensity * strength)
      y.set((e.clientY - cy) * intensity * strength)
    }
    const reset = () => {
      x.set(0)
      y.set(0)
    }
    const target = actionArea === 'global' ? window : (ref.current?.parentElement ?? window)
    const moveListener = handleMove as EventListener
    const resetListener = reset as EventListener
    target.addEventListener('pointermove', moveListener)
    target.addEventListener('pointerleave', resetListener)
    return () => {
      target.removeEventListener('pointermove', moveListener)
      target.removeEventListener('pointerleave', resetListener)
    }
  }, [x, y, intensity, springOptions, actionArea, range])

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} className={className}>
      {children}
    </motion.div>
  )
}

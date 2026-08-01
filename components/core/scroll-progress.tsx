'use client'
import { motion, useScroll, useSpring } from 'motion/react'
import type { RefObject } from 'react'

export interface ScrollProgressProps {
  containerRef?: RefObject<HTMLElement | null>
  className?: string
  springOptions?: {
    stiffness?: number
    damping?: number
    mass?: number
    bounce?: number
  }
}

/**
 * Scroll-linked progress bar. Pass a `containerRef` to track a scrollable
 * element, or omit it to track the window.
 */
export function ScrollProgress({ containerRef, className = '', springOptions }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll(containerRef ? { container: containerRef } : undefined)
  const scaleX = useSpring(scrollYProgress, springOptions)
  return <motion.div style={{ scaleX }} className={className} />
}

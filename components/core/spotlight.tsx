'use client'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import type { SpringOptions } from 'motion/react'

export interface SpotlightProps {
  className?: string
  size?: number
  springOptions?: SpringOptions
}

/**
 * A soft radial glow that follows the pointer inside its container.
 */
export function Spotlight({ className = '', size = 200, springOptions }: SpotlightProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const x = useSpring(mouseX, springOptions)
  const y = useSpring(mouseY, springOptions)

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, var(--spotlight-color, rgba(255, 255, 255, 0.16)), transparent 65%)`

  return (
    <motion.div
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
      }}
      style={{ backgroundImage: background }}
      className={className}
    />
  )
}

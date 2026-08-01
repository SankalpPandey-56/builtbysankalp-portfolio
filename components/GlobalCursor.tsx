'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { MutableRefObject, ReactNode } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { Plus } from 'lucide-react'

type Mode = 'default' | 'link' | 'photo'

interface Vec {
  x: number
  y: number
}

/** Glassy water-bubble gradient shared by every droplet. */
const BUBBLE_BG =
  'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.3) 20%, rgba(138,168,255,0.42) 52%, rgba(79,124,255,0.18) 100%)'

/**
 * A single water droplet that chases a target with springy "liquid" lag,
 * stretches along the direction of movement, squashes perpendicular to it,
 * and wobbles idly like a real bubble of water.
 */
function WaterBubble({
  getTarget,
  phase = 0,
  className = '',
  children,
}: {
  getTarget: () => Vec
  phase?: number
  className?: string
  children?: ReactNode
}) {
  const tx = useMotionValue(0)
  const ty = useMotionValue(0)
  const rawSX = useMotionValue(1)
  const rawSY = useMotionValue(1)
  const rawAngle = useMotionValue(0)
  const wobble = useMotionValue(1)

  // the bubble's position lags the pointer like a blob of water being dragged
  const x = useSpring(tx, { stiffness: 260, damping: 24, mass: 0.8 })
  const y = useSpring(ty, { stiffness: 260, damping: 24, mass: 0.8 })
  // deformation is smoothed so the stretch doesn't jitter
  const sx = useSpring(rawSX, { stiffness: 300, damping: 22 })
  const sy = useSpring(rawSY, { stiffness: 300, damping: 22 })
  const rot = useSpring(rawAngle, { stiffness: 240, damping: 18 })

  useEffect(() => {
    let raf = 0
    let lastX = 0
    let lastY = 0
    let hasPrev = false
    const start = performance.now()

    const loop = (t: number) => {
      const p = getTarget()
      if (!hasPrev) {
        lastX = p.x
        lastY = p.y
        hasPrev = true
      }
      const dx = p.x - lastX
      const dy = p.y - lastY
      lastX = p.x
      lastY = p.y

      // velocity per frame -> stretch along motion, squash across it
      const spf = Math.hypot(dx, dy)
      const d = Math.min(spf / 26, 1)
      rawSX.set(1 + d * 0.5)
      rawSY.set(1 - d * 0.28)
      if (spf > 1.2) rawAngle.set((Math.atan2(dy, dx) * 180) / Math.PI)

      tx.set(p.x)
      ty.set(p.y)
      // idle liquid wobble
      wobble.set(1 + Math.sin((t - start) * 0.004 + phase) * 0.05)

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [getTarget, phase, tx, ty, rawSX, rawSY, rawAngle, wobble])

  return (
    <motion.div style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-[9999]">
      <div className="-translate-x-1/2 -translate-y-1/2">
        <motion.div style={{ rotate: rot, scaleX: sx, scaleY: sy }}>
          <motion.div className={className} style={{ scale: wobble }}>
            {children}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

/**
 * One extra bubble per extra finger. Kept as its own component so the
 * getTarget callback is stable (useCallback with [id]) — an inline closure
 * would recreate the rAF loop on every parent re-render.
 */
function ExtraBubble({
  id,
  pointers,
}: {
  id: number
  pointers: MutableRefObject<Map<number, Vec>>
}) {
  const getTarget = useCallback(
    () => pointers.current.get(id) ?? { x: 0, y: 0 },
    [id, pointers],
  )
  return (
    <WaterBubble getTarget={getTarget} phase={id}>
      <div
        className="rounded-full border border-white/30"
        style={{ width: 13, height: 13, backgroundImage: BUBBLE_BG }}
      />
    </WaterBubble>
  )
}

export default function GlobalCursor() {
  const [mode, setMode] = useState<Mode>('default')
  const [visible, setVisible] = useState(false)
  const [extraIds, setExtraIds] = useState<number[]>([])
  const [wheelDroplet, setWheelDroplet] = useState(false)

  const primaryRef = useRef({ x: 0, y: 0 })
  const primaryTouchIdRef = useRef<number | null>(null)
  const touchPointersRef = useRef(new Map<number, Vec>())
  const wheelTimer = useRef<number>(0)

  const getPrimary = useCallback(() => primaryRef.current, [])

  useEffect(() => {
    const updateMode = (e: PointerEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-cursor="photo"]')) setMode('photo')
      else if (target.closest('a, button, [role="button"], [data-cursor="link"]')) setMode('link')
      else setMode('default')
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
        primaryRef.current = { x: e.clientX, y: e.clientY }
      } else if (e.pointerType === 'touch') {
        // update the finger's own tracked position
        touchPointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
        // only the primary (first) finger drives the main bubble
        if (e.pointerId === primaryTouchIdRef.current) {
          primaryRef.current = { x: e.clientX, y: e.clientY }
        }
      }
      setVisible(true)
      updateMode(e)
    }

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return
      touchPointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
      if (primaryTouchIdRef.current === null) {
        primaryTouchIdRef.current = e.pointerId
        return
      }
      if (e.pointerId !== primaryTouchIdRef.current) {
        setExtraIds((prev) => (prev.includes(e.pointerId) ? prev : [...prev, e.pointerId]))
      }
    }

    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return
      const wasPrimary = e.pointerId === primaryTouchIdRef.current
      touchPointersRef.current.delete(e.pointerId)
      setExtraIds((prev) => prev.filter((id) => id !== e.pointerId))
      if (wasPrimary) {
        // promote the next remaining finger to primary so the bubble keeps living
        const next = touchPointersRef.current.keys().next()
        if (!next.done) {
          primaryTouchIdRef.current = next.value
          const p = touchPointersRef.current.get(next.value)
          if (p) primaryRef.current = { ...p }
          // the promoted finger must stop rendering its own extra bubble
          setExtraIds((prev) => prev.filter((id) => id !== next.value))
        } else {
          primaryTouchIdRef.current = null
        }
      }
    }

    const onLeave = () => setVisible(false)
    const onWheel = () => {
      // two-finger trackpad scrolling surfaces as wheel events — show a droplet
      setWheelDroplet(true)
      window.clearTimeout(wheelTimer.current)
      wheelTimer.current = window.setTimeout(() => setWheelDroplet(false), 600)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('wheel', onWheel)
      window.clearTimeout(wheelTimer.current)
    }
  }, [])

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9999]"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* primary bubble — follows the mouse / trackpad / first finger */}
      <WaterBubble getTarget={getPrimary} phase={0}>
        <motion.div
          animate={{
            width: mode === 'photo' ? 96 : mode === 'link' ? 40 : 15,
            height: mode === 'photo' ? 44 : mode === 'link' ? 40 : 15,
            borderColor:
              mode === 'default' ? 'rgba(255,255,255,0.4)' : 'rgba(79,124,255,0.75)',
            boxShadow:
              mode === 'photo'
                ? '0 0 34px rgba(79,124,255,0.5)'
                : mode === 'link'
                  ? '0 0 22px rgba(79,124,255,0.45)'
                  : '0 0 16px rgba(79,124,255,0.3)',
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          className="relative flex items-center justify-center rounded-full border"
          style={{ backgroundImage: BUBBLE_BG }}
        >
          {/* white fill behind the "More +" pill */}
          <motion.div
            animate={{ opacity: mode === 'photo' ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 rounded-full bg-white"
          />
          {/* specular highlight */}
          <span className="pointer-events-none absolute top-[16%] left-[20%] h-[22%] w-[22%] rounded-full bg-white/90 blur-[1.5px]" />
          <AnimatePresence>
            {mode === 'link' && (
              <motion.span
                key="link"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.4 }}
                className="relative h-1.5 w-1.5 rounded-full bg-accent"
              />
            )}
            {mode === 'photo' && (
              <motion.span
                key="photo"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="relative inline-flex items-center gap-1 whitespace-nowrap text-[13px] font-semibold text-zinc-900"
              >
                More <Plus className="h-3.5 w-3.5" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </WaterBubble>

      {/* one extra bubble per extra finger on a touchscreen / touch trackpad */}
      {extraIds.map((id) => (
        <ExtraBubble key={id} id={id} pointers={touchPointersRef} />
      ))}

      {/* droplet that appears while two-finger scrolling on a trackpad */}
      <AnimatePresence>
        {wheelDroplet && (
          <motion.div
            key="wheel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <WaterBubble getTarget={getPrimary} phase={2.4}>
              <div
                className="rounded-full border border-white/40"
                style={{ width: 11, height: 11, backgroundImage: BUBBLE_BG }}
              />
            </WaterBubble>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

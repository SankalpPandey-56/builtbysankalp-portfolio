interface MarqueeProps {
  items: string[]
  reverse?: boolean
  className?: string
  small?: boolean
  speed?: string
}

export default function Marquee({ items, reverse, className = '', small = false, speed }: MarqueeProps) {
  const row = [...items, ...items]
  const textCls = small
    ? 'px-5 text-xs font-medium tracking-[0.35em] text-white/35 uppercase sm:text-sm'
    : 'px-6 font-display text-4xl font-bold tracking-tight text-white/85 sm:text-6xl'
  const starCls = small ? 'text-xs text-accent/60' : 'text-2xl text-accent sm:text-3xl'

  return (
    <div className={`marquee-paused relative flex overflow-hidden py-6 select-none ${className}`}>
      <div
        style={speed ? { animationDuration: speed } : undefined}
        className={`flex w-max shrink-0 items-center gap-0 whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className={textCls}>{item}</span>
            <span className={starCls} aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

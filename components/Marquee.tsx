interface MarqueeProps {
  items: string[]
  reverse?: boolean
  className?: string
}

export default function Marquee({ items, reverse, className = '' }: MarqueeProps) {
  const row = [...items, ...items]
  return (
    <div className={`marquee-paused relative flex overflow-hidden py-6 select-none ${className}`}>
      <div className={`flex w-max shrink-0 items-center gap-0 whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {row.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6 font-display text-4xl font-bold tracking-tight text-white/85 sm:text-6xl">
              {item}
            </span>
            <span className="text-2xl text-accent sm:text-3xl" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

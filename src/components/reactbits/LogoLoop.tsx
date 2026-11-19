import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { cn } from '../../lib/cn'

/** Recriação do LogoLoop (React Bits) para uma faixa contínua de texto. Desacelera no hover. */
export default function LogoLoop({ items, separator, speed = 40, className }: { items: string[]; separator?: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const tween = useRef<gsap.core.Tween | null>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      tween.current = gsap.to(track.current, { xPercent: -50, ease: 'none', duration: speed, repeat: -1 })
    },
    { scope: ref },
  )
  const slow = (v: number) => tween.current && gsap.to(tween.current, { timeScale: v, duration: 0.6 })

  const list = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((it, i) => (
        <li key={i} className="flex items-center whitespace-nowrap">
          <span className="px-6 md:px-10">{it}</span>
          {separator}
        </li>
      ))}
    </ul>
  )

  return (
    <div ref={ref} className={cn('overflow-hidden', className)} onPointerEnter={() => slow(0.25)} onPointerLeave={() => slow(1)}>
      <div ref={track} className="flex w-max will-change-transform">
        {list(false)}
        {list(true)}
      </div>
    </div>
  )
}

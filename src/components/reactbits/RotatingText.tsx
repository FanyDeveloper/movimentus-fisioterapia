import { useRef } from 'react'
import { gsap, useGSAP, MQ } from '../../lib/gsap'
import { cn } from '../../lib/cn'

/** Recriação do RotatingText (React Bits): alterna frases com máscara vertical. */
export default function RotatingText({ words, className, interval = 2.6 }: { words: string[]; className?: string; interval?: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>('[data-rot]', ref.current)
      gsap.set(items, { yPercent: 110, opacity: 0 })
      gsap.set(items[0], { yPercent: 0, opacity: 1 })
      const reduce = window.matchMedia(MQ.reduce).matches
      let i = 0
      const tl = gsap.timeline({ repeat: -1, delay: 1.6 })
      items.forEach(() => {
        const cur = items[i]
        const next = items[(i + 1) % items.length]
        tl.to(cur, reduce ? { opacity: 0, duration: 0.3 } : { yPercent: -110, opacity: 0, duration: 0.6, ease: 'power3.in' }, `+=${interval}`)
          .fromTo(next, reduce ? { opacity: 0, yPercent: 0 } : { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7, ease: 'expo.out', immediateRender: false }, '<0.15')
        i = (i + 1) % items.length
      })
    },
    { scope: ref },
  )

  return (
    <span ref={ref} className={cn('relative inline-grid overflow-hidden align-bottom', className)} aria-live="off">
      <span className="sr-only">{words.join(', ')}</span>
      {words.map((w) => (
        <span key={w} data-rot aria-hidden="true" className="col-start-1 row-start-1 whitespace-nowrap will-change-transform">
          {w}
        </span>
      ))}
    </span>
  )
}

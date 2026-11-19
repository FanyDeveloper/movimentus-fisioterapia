import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'

/** Recriação do Magnet (React Bits): o elemento é atraído pelo cursor quando ele se aproxima. */
export default function Magnet({ children, padding = 60, strength = 3.5, className }: { children: ReactNode; padding?: number; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return
    const inner = el.firstElementChild as HTMLElement
    const xTo = gsap.quickTo(inner, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(inner, 'y', { duration: 0.5, ease: 'power3.out' })
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const near = Math.abs(dx) < r.width / 2 + padding && Math.abs(dy) < r.height / 2 + padding
      xTo(near ? dx / strength : 0)
      yTo(near ? dy / strength : 0)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [padding, strength])
  return (
    <div ref={ref} className={className ?? 'inline-block'}>
      <div className="will-change-transform">{children}</div>
    </div>
  )
}

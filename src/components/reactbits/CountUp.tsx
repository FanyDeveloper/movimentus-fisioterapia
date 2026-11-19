import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'

/** Recriação do CountUp (React Bits). Use só com números reais. */
export default function CountUp({ to, decimals = 0, duration = 1.6, className }: { to: number; decimals?: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const fmt = (n: number) => n.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const obj = { v: 0 }
      ref.current!.textContent = fmt(0)
      gsap.to(obj, {
        v: to, duration, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
        onUpdate: () => { if (ref.current) ref.current.textContent = fmt(obj.v) },
      })
    },
    { scope: ref },
  )
  return <span ref={ref} className={className}>{fmt(to)}</span>
}

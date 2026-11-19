import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, MQ } from '../../lib/gsap'
import { cn } from '../../lib/cn'

/**
 * Recriação do MagicBento (React Bits): grade bento de tamanhos diferentes,
 * borda que acende onde o cursor passa e entrada em sequência.
 * (As partículas do original foram omitidas de propósito: ficariam fora do tom da clínica.)
 */
export function MagicBento({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.PointerEvent) => {
    ref.current!.querySelectorAll<HTMLElement>('[data-bento]').forEach((card) => {
      const r = card.getBoundingClientRect()
      card.style.setProperty('--x', `${e.clientX - r.left}px`)
      card.style.setProperty('--y', `${e.clientY - r.top}px`)
    })
  }
  useGSAP(
    () => {
      gsap.matchMedia().add(MQ.motion, () => {
        gsap.from('[data-bento]', {
          y: 40, opacity: 0, stagger: 0.08, duration: 0.9,
          scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        })
      })
    },
    { scope: ref },
  )
  return (
    <div ref={ref} onPointerMove={onMove} className={cn('grid gap-3 md:gap-4', className)}>
      {children}
    </div>
  )
}

export function BentoCard({ children, className, span, tone = 'light' }: { children: ReactNode; className?: string; span?: string; tone?: 'light' | 'dark' | 'clay' }) {
  const bg = tone === 'dark' ? 'bg-musgo text-linho' : tone === 'clay' ? 'bg-argila text-papel' : 'bg-papel text-tinta'
  return (
    <div
      data-bento
      className={cn('relative rounded-[var(--radius-card)] p-px', span)}
      style={{ background: 'radial-gradient(300px circle at var(--x, -100px) var(--y, -100px), rgba(169,78,39,.55), rgba(36,57,44,.12) 60%)' }}
    >
      <div className={cn('relative h-full overflow-hidden rounded-[calc(var(--radius-card)-1px)] p-6 md:p-8', bg, className)}>{children}</div>
    </div>
  )
}

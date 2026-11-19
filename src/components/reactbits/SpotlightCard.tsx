import { useRef, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

/** Recriação do SpotlightCard (React Bits): luz suave que segue o cursor. */
export default function SpotlightCard({ children, className, color = 'rgba(169, 78, 39, 0.14)' }: { children: ReactNode; className?: string; color?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect()
    ref.current!.style.setProperty('--x', `${e.clientX - r.left}px`)
    ref.current!.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  return (
    <div ref={ref} onPointerMove={onMove} className={cn('group relative overflow-hidden', className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), ${color}, transparent 65%)` }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  )
}

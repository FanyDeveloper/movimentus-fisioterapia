import { useRef, type ReactNode } from 'react'
import { prefersReducedMotion } from '../../lib/gsap'

/** Recriação do ClickSpark (React Bits): faíscas finas e discretas no clique. */
export default function ClickSpark({ children, color = '#E39A73', count = 8, radius = 22 }: { children: ReactNode; color?: string; count?: number; radius?: number }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const wrap = useRef<HTMLSpanElement>(null)

  const onClick = (e: React.MouseEvent) => {
    if (prefersReducedMotion() || !canvas.current || !wrap.current) return
    const c = canvas.current
    const r = wrap.current.getBoundingClientRect()
    const pad = radius * 2
    const dpr = window.devicePixelRatio || 1
    c.width = (r.width + pad * 2) * dpr
    c.height = (r.height + pad * 2) * dpr
    const ctx = c.getContext('2d')!
    ctx.scale(dpr, dpr)
    const x = e.clientX - r.left + pad
    const y = e.clientY - r.top + pad
    const start = performance.now()
    const draw = (now: number) => {
      const t = Math.min((now - start) / 420, 1)
      const ease = t * (2 - t)
      ctx.clearRect(0, 0, c.width, c.height)
      ctx.strokeStyle = color
      ctx.lineWidth = 1.5
      ctx.globalAlpha = 1 - t
      for (let i = 0; i < count; i++) {
        const a = (Math.PI * 2 * i) / count
        const d = ease * radius
        const len = 7 * (1 - ease)
        ctx.beginPath()
        ctx.moveTo(x + d * Math.cos(a), y + d * Math.sin(a))
        ctx.lineTo(x + (d + len) * Math.cos(a), y + (d + len) * Math.sin(a))
        ctx.stroke()
      }
      if (t < 1) requestAnimationFrame(draw)
    }
    requestAnimationFrame(draw)
  }

  return (
    <span ref={wrap} className="relative inline-flex" onClickCapture={onClick}>
      {children}
      <canvas
        ref={canvas}
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{ inset: -radius * 2, width: `calc(100% + ${radius * 4}px)`, height: `calc(100% + ${radius * 4}px)` }}
      />
    </span>
  )
}

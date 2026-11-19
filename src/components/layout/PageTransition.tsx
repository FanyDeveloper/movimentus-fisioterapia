import { useRef, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'

let firstLoad = true

/** Transição suave entre páginas: cortina verde que sobe e conteúdo que aparece. */
export default function PageTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const curtain = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  useGSAP(
    () => {
      const reduce = prefersReducedMotion()
      if (firstLoad || reduce) {
        firstLoad = false
        gsap.set(curtain.current, { yPercent: -100 })
        if (reduce) gsap.from(ref.current, { opacity: 0, duration: 0.3, clearProps: 'opacity' })
        return
      }
      gsap.timeline()
        .fromTo(curtain.current, { yPercent: 0 }, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' })
        .from(ref.current, { y: 40, opacity: 0, duration: 0.8, ease: 'expo.out', clearProps: 'transform,opacity' }, '-=0.5')
    },
    { dependencies: [pathname], revertOnUpdate: true },
  )

  return (
    <>
      <div ref={curtain} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[65] bg-musgo will-change-transform" style={{ transform: 'translateY(-100%)' }} />
      <div ref={ref}>{children}</div>
    </>
  )
}

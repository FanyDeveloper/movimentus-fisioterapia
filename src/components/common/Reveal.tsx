import { useRef, type ElementType, type ReactNode } from 'react'
import { gsap, useGSAP, MQ } from '../../lib/gsap'

/** Entrada em sequência (stagger) dos filhos marcados com data-reveal. */
export default function Reveal({ children, as: Tag = 'div', className, y = 32, stagger = 0.08 }: { children: ReactNode; as?: ElementType; className?: string; y?: number; stagger?: number }) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const items = ref.current!.querySelectorAll('[data-reveal]')
      const targets = items.length ? items : ref.current!.children
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap.from(targets, { y, opacity: 0, stagger, duration: 0.9, scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } })
      })
      mm.add(MQ.reduce, () => {
        gsap.from(targets, { opacity: 0, duration: 0.4, scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true } })
      })
    },
    { scope: ref },
  )
  return <Tag ref={ref} className={className}>{children}</Tag>
}

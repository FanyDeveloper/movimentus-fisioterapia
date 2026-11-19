import { useRef, type ElementType } from 'react'
import { gsap, useGSAP, MQ } from '../../lib/gsap'

/** Recriação do ScrollReveal (React Bits): palavras acendem conforme a rolagem. */
export default function ScrollReveal({ text, as: Tag = 'p', className }: { text: string; as?: ElementType; className?: string }) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const words = ref.current!.querySelectorAll('[data-sr]')
        gsap.fromTo(ref.current, { rotate: 1.5, transformOrigin: '0% 50%' }, {
          rotate: 0, ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom 60%', scrub: true },
        })
        gsap.fromTo(words, { opacity: 0.16 }, {
          opacity: 1, stagger: 0.05, ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top 82%', end: 'bottom 58%', scrub: true },
        })
      })
    },
    { scope: ref },
  )
  return (
    <Tag ref={ref} className={className}>
      {text.split(/(\s+)/).map((w, i) => (/^\s+$/.test(w) ? w : <span key={i} data-sr className="inline-block">{w}</span>))}
    </Tag>
  )
}

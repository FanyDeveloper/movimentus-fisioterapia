import { useRef, type ElementType } from 'react'
import { gsap, useGSAP, MQ } from '../../lib/gsap'
import { cn } from '../../lib/cn'

type Props = {
  text: string
  as?: ElementType
  className?: string
  /** 'load' anima ao montar (hero); 'scroll' anima quando entra na tela (títulos de seção) */
  trigger?: 'load' | 'scroll'
  delay?: number
  stagger?: number
  id?: string
}

/**
 * Recriação do SplitText (React Bits) com GSAP.
 * Cada palavra sobe de dentro de uma máscara. Palavras entre *asteriscos* ficam em itálico na cor de destaque.
 */
export default function SplitText({ text, as: Tag = 'h2', className, trigger = 'scroll', delay = 0, stagger = 0.045, id }: Props) {
  const ref = useRef<HTMLElement>(null)
  const plain = text.replace(/\*/g, '')
  const tokens = text.split(/(\*[^*]+\*)/g).filter(Boolean)

  useGSAP(
    () => {
      const words = ref.current!.querySelectorAll<HTMLElement>('[data-w]')
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap.from(words, {
          yPercent: 115,
          rotate: 2,
          duration: 0.95,
          ease: 'expo.out',
          stagger,
          delay,
          scrollTrigger: trigger === 'scroll' ? { trigger: ref.current, start: 'top 88%', once: true } : undefined,
        })
      })
      mm.add(MQ.reduce, () => {
        gsap.from(words, { opacity: 0, duration: 0.4, delay })
      })
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} id={id} className={className} aria-label={plain}>
      <span aria-hidden="true">
        {tokens.map((tok, ti) => {
          const em = tok.startsWith('*')
          const words = tok.replace(/\*/g, '').split(/(\s+)/)
          return words.map((w, wi) =>
            /^\s+$/.test(w) || w === '' ? (
              w
            ) : (
              <span key={`${ti}-${wi}`} className="mask-line inline-block align-top">
                <span data-w className={cn('inline-block will-change-transform', em && 'italic text-argila')}>
                  {w}
                </span>
              </span>
            ),
          )
        })}
      </span>
    </Tag>
  )
}

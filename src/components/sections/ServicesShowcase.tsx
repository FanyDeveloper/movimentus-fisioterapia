import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { gsap, useGSAP, MQ } from '../../lib/gsap'
import { servicos } from '../../data/empresa'
import SplitText from '../reactbits/SplitText'
import { Cena } from '../common/Motivos'
import { TextLink } from '../ui/Buttons'

/** Lista editorial de serviços. No desktop, o motivo animado do serviço acompanha o cursor. */
export default function ServicesShowcase() {
  const ref = useRef<HTMLElement>(null)
  const preview = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const quick = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null)

  useGSAP(
    () => {
      quick.current = {
        x: gsap.quickTo(preview.current, 'x', { duration: 0.6, ease: 'power3.out' }),
        y: gsap.quickTo(preview.current, 'y', { duration: 0.6, ease: 'power3.out' }),
      }
      gsap.matchMedia().add(MQ.motion, () => {
        gsap.from('[data-row]', { y: 40, opacity: 0, stagger: 0.1, duration: 0.9, scrollTrigger: { trigger: '[data-list]', start: 'top 80%', once: true } })
      })
    },
    { scope: ref },
  )

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect()
    quick.current?.x(e.clientX - r.left - 140)
    quick.current?.y(e.clientY - r.top - 180)
  }

  return (
    <section ref={ref} onPointerMove={onMove} className="relative bg-papel py-24 md:py-36" aria-labelledby="servicos-titulo">
      <div className="container-site">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <SplitText id="servicos-titulo" text="O que a gente *trata* por aqui" className="text-[clamp(2.4rem,5.6vw,4.8rem)] text-musgo md:col-span-8" />
          <p className="max-w-[40ch] text-cinza md:col-span-4">
            Cada tratamento começa com uma avaliação. Se você não sabe qual é o seu caso, tudo bem: conte o que sente e a gente orienta.
          </p>
        </div>

        <ul data-list className="mt-16 border-t border-musgo/15" onPointerLeave={() => setActive(null)}>
          {servicos.map((s, i) => (
            <li key={s.slug} data-row className="border-b border-musgo/15">
              <Link
                to={`/servicos/${s.slug}`}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="group grid grid-cols-[1fr_auto] items-center gap-6 py-8 md:grid-cols-12 md:py-10"
              >
                <span className="md:col-span-5">
                  <span className="block font-display text-[clamp(1.8rem,3.4vw,3rem)] leading-none text-musgo transition-transform duration-500 ease-[var(--ease-suave)] group-hover:translate-x-3 group-hover:italic">
                    {s.nome}
                  </span>
                  <span className="mt-2 block text-sm font-medium text-argila">{s.curto}</span>
                </span>
                <span className="hidden text-cinza md:col-span-6 md:block">{s.beneficio}</span>
                <span className="grid size-12 place-items-center justify-self-end rounded-full border border-musgo/20 text-musgo transition-all duration-500 group-hover:rotate-45 group-hover:border-argila group-hover:bg-argila group-hover:text-papel md:col-span-1">
                  <ArrowUpRight size={20} strokeWidth={1.5} />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <TextLink to="/servicos">Ver todos os serviços e como funcionam</TextLink>
        </div>
      </div>

      {/* Prévia que segue o cursor (só em telas com mouse) */}
      <div
        ref={preview}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 hidden h-[360px] w-[280px] overflow-hidden rounded-[var(--radius-card)] transition-[opacity,scale] duration-500 ease-[var(--ease-suave)] [@media(pointer:fine)]:lg:block"
        style={{ opacity: active === null ? 0 : 1, scale: active === null ? '0.85' : '1' }}
      >
        {servicos.map((s, i) => (
          <div key={s.slug} className="absolute inset-0 transition-opacity duration-500" style={{ opacity: active === i ? 1 : 0 }}>
            <Cena motivo={s.motivo} tone={i % 2 ? 'musgo' : 'areia'} className="h-full w-full" />
          </div>
        ))}
      </div>
    </section>
  )
}

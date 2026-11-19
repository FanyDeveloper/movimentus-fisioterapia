import { useRef } from 'react'
import { MessageCircle, Stethoscope, Hand, Footprints } from 'lucide-react'
import { gsap, useGSAP, MQ } from '../../lib/gsap'
import SplitText from '../reactbits/SplitText'
import { Equilibrio } from '../common/Motivos'
import Txt from '../common/Txt'

const passos = [
  { icon: MessageCircle, titulo: 'Primeiro contato', texto: 'Você chama no WhatsApp, conta o que está sentindo e se o atendimento é particular ou pelo SUS. A gente responde com os horários disponíveis.' },
  { icon: Stethoscope, titulo: 'Avaliação', texto: 'Na primeira consulta, a fisioterapeuta escuta a sua história, examina o movimento e explica o que está acontecendo, com calma e sem termos difíceis.' },
  { icon: Hand, titulo: 'Tratamento', texto: 'Sessões com técnicas manuais e exercícios, ajustadas conforme você evolui. [CONFIRMAR: duração e frequência média das sessões]' },
  { icon: Footprints, titulo: 'Alta com autonomia', texto: 'Você termina sabendo o que fazer em casa e no trabalho para a dor não voltar na semana seguinte.' },
]

/** A única seção fixada (pin) da Início: os cartões empilham e a barra de equilíbrio se nivela com a rolagem. */
export default function ComoFunciona() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ desktop: '(min-width: 1024px)', motion: MQ.motion }, (ctx) => {
        const { desktop, motion } = ctx.conditions as { desktop: boolean; motion: boolean }
        const cards = gsap.utils.toArray<HTMLElement>('[data-card]')
        const labels = gsap.utils.toArray<HTMLElement>('[data-label]')
        if (!desktop || !motion) {
          gsap.from(cards, { y: 30, opacity: 0, stagger: 0.1, scrollTrigger: { trigger: '[data-stack]', start: 'top 85%', once: true } })
          return
        }
        gsap.set(ref.current, { height: '100vh', paddingTop: 0, paddingBottom: 0, display: 'flex', alignItems: 'center' })
        gsap.set('[data-stack]', { height: 440 })
        gsap.set(cards, { position: 'absolute', inset: 0 })
        gsap.set(cards.slice(1), { yPercent: 115, opacity: 0 })
        const setActive = (i: number) => labels.forEach((l, j) => l.classList.toggle('is-active', i === j))
        setActive(0)
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: () => `+=${window.innerHeight * (passos.length - 0.5)}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(Math.min(passos.length - 1, Math.round(self.progress * (passos.length - 1)))),
          },
        })
        cards.forEach((c, i) => {
          if (!i) return
          tl.to(cards[i - 1], { scale: 0.94, yPercent: -4, duration: 1 }, i - 1)
            .to(c, { yPercent: 0, duration: 1 }, i - 1)
            .to(c, { opacity: 1, duration: 0.2 }, i - 1)
        })
        // Do desequilíbrio ao equilíbrio: a barra se nivela conforme o atendimento avança
        tl.fromTo('[data-beam]', { rotation: -14, svgOrigin: '120 96' }, { rotation: 0, svgOrigin: '120 96', duration: passos.length - 1, ease: 'power1.out' }, 0)
          .fromTo('[data-wave]', { strokeDashoffset: 0 }, { strokeDashoffset: -240, duration: passos.length - 1 }, 0)
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="relative overflow-hidden bg-areia py-24 lg:py-32" aria-labelledby="como-titulo">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <SplitText id="como-titulo" text="Como é ser atendido *na Movimentus*" className="text-[clamp(2.4rem,5vw,4.4rem)] text-musgo" />
          <ul className="mt-10 hidden space-y-3 lg:block" aria-hidden="true">
            {passos.map((p) => (
              <li key={p.titulo} data-label className="flex items-center gap-4 text-cinza transition-colors duration-500 [&.is-active]:text-musgo [&.is-active_span]:w-12 [&.is-active_span]:bg-argila">
                <span className="block h-px w-6 bg-current transition-all duration-500" />
                {p.titulo}
              </li>
            ))}
          </ul>
          <div className="mt-12 hidden w-[320px] lg:block">
            <Equilibrio animate={false} tilt={-14} />
          </div>
        </div>

        <ol data-stack className="relative space-y-4 lg:col-span-6 lg:col-start-7 lg:space-y-0">
          {passos.map(({ icon: Icon, titulo, texto }) => (
            <li key={titulo} data-card className="origin-top rounded-[var(--radius-card)] border border-musgo/10 bg-papel p-8 shadow-[0_30px_60px_-40px_rgba(27,34,29,.45)] will-change-transform md:p-12">
              <Icon size={30} strokeWidth={1.25} className="text-argila" />
              <h3 className="mt-8 text-[clamp(2rem,3.4vw,3rem)] text-musgo">{titulo}</h3>
              <p className="mt-4 max-w-[44ch] text-[1.0625rem] text-cinza md:text-[1.125rem]"><Txt>{texto}</Txt></p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

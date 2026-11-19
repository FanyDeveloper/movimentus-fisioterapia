import { useRef } from 'react'
import { gsap, useGSAP, MQ } from '../../lib/gsap'
import { empresa } from '../../data/empresa'
import { waLink } from '../../lib/whatsapp'
import SplitText from '../reactbits/SplitText'
import RotatingText from '../reactbits/RotatingText'
import ShinyText from '../reactbits/ShinyText'
import Magnet from '../reactbits/Magnet'
import Photo from '../common/Photo'
import { Equilibrio } from '../common/Motivos'
import { Stars, WhatsAppIcon } from '../common/Icons'
import { ButtonPrimary, ButtonSecondary } from '../ui/Buttons'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)

  // Entrada coreografada: título (SplitText) → linha rotativa → subtítulo → botões → nota. Total < 1,5s.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap.from('[data-hero]', { y: 24, opacity: 0, duration: 0.8, stagger: 0.12, delay: 0.5, ease: 'expo.out' })
      })
      mm.add(MQ.reduce, () => {
        gsap.from('[data-hero]', { opacity: 0, duration: 0.4 })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="relative overflow-hidden pt-32 pb-16 md:pt-36 md:pb-24 lg:min-h-[100svh]">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 lg:pb-10">
          <SplitText
            as="h1"
            trigger="load"
            delay={0.1}
            stagger={0.04}
            text="Fisioterapia no Centro de Joinville para você *voltar a se mexer* sem dor."
            className="text-[clamp(2.6rem,5.4vw,4.9rem)] leading-[0.98] text-musgo"
          />

          <p data-hero className="mt-7 font-display text-[clamp(1.25rem,2.2vw,1.75rem)] leading-snug text-tinta/80">
            Para quem quer{' '}
            <RotatingText
              className="italic text-argila"
              words={['digitar sem formigamento', 'dormir sem dor no ombro', 'abaixar sem travar as costas', 'soltar a tensão do pescoço']}
            />
          </p>

          <p data-hero className="mt-6 max-w-[52ch] text-[1.0625rem] text-cinza md:text-[1.125rem]">
            Atendimento particular e pelo SUS na Av. Juscelino Kubitscheck, com uma equipe que escuta antes de tratar. Fisioterapia ortopédica, túnel do carpo, LER/DORT e massoterapia.
          </p>

          <div data-hero className="mt-9 flex flex-wrap items-center gap-3">
            <Magnet padding={50} strength={5}>
              <ButtonPrimary href={waLink('Olá! Vim pelo site da Movimentus e gostaria de agendar uma avaliação.')} icon={<WhatsAppIcon size={18} />}>
                Agendar pelo WhatsApp
              </ButtonPrimary>
            </Magnet>
            <ButtonSecondary to="/servicos">Ver serviços</ButtonSecondary>
          </div>

          <a data-hero href={empresa.google.perfil} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-3 text-[0.95rem] text-cinza">
            <Stars value={empresa.google.nota} className="text-argila" />
            <ShinyText className="font-medium text-musgo">
              {empresa.google.nota.toLocaleString('pt-BR')} no Google · {empresa.google.totalAvaliacoes} avaliações
            </ShinyText>
          </a>
        </div>

        <div className="relative lg:col-span-6 lg:pb-10">
          <Photo
            priority
            src={`${import.meta.env.BASE_URL}fotos/hero-fisioterapia-1536.webp`}
            srcSet={`${import.meta.env.BASE_URL}fotos/hero-fisioterapia-1000.webp 1000w, ${import.meta.env.BASE_URL}fotos/hero-fisioterapia-1536.webp 1536w`}
            sizes="(min-width: 1024px) 48vw, 100vw"
            width={1536}
            height={1024}
            position="100% 45%"
            parallax={false}
            alt="Fisioterapeuta avaliando o punho de uma paciente sentada na maca, na sala de atendimento"
            className="aspect-[4/3] w-full lg:aspect-[5/4]"
          />
          <div data-hero className="mt-5 flex items-center gap-5">
            <Equilibrio className="w-[120px] shrink-0" />
            <p className="text-[0.85rem] leading-snug text-cinza">
              {empresa.endereco.rua}
              <br />
              {empresa.endereco.bairro}, {empresa.endereco.cidade}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

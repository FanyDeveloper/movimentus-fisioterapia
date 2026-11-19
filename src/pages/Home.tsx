import { useSeo } from '../lib/seo'
import Hero from '../components/sections/Hero'
import ServicesMarquee from '../components/sections/ServicesMarquee'
import AboutTeaser from '../components/sections/AboutTeaser'
import ServicesShowcase from '../components/sections/ServicesShowcase'
import Diferenciais from '../components/sections/Diferenciais'
import ComoFunciona from '../components/sections/ComoFunciona'
import Reviews from '../components/sections/Reviews'
import Location from '../components/sections/Location'
import FinalCta from '../components/sections/FinalCta'

export default function Home() {
  useSeo({
    title: 'Fisioterapia e Massoterapia no Centro de Joinville | Movimentus',
    description: 'Clínica de fisioterapia e massoterapia no Centro de Joinville. Atendimento particular e pelo SUS, tratamento de túnel do carpo, LER/DORT e dores ortopédicas. Agende pelo WhatsApp.',
    path: '/',
  })
  return (
    <>
      <Hero />
      <ServicesMarquee />
      <AboutTeaser />
      <ServicesShowcase />
      <Diferenciais />
      <ComoFunciona />
      <Reviews />
      <Location />
      <FinalCta />
    </>
  )
}

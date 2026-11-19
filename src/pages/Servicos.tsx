import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useSeo } from '../lib/seo'
import { servicos } from '../data/empresa'
import PageHeader from '../components/common/PageHeader'
import { Cena } from '../components/common/Motivos'
import Reveal from '../components/common/Reveal'
import SpotlightCard from '../components/reactbits/SpotlightCard'
import SplitText from '../components/reactbits/SplitText'
import FinalCta from '../components/sections/FinalCta'
import { cn } from '../lib/cn'

const spans = ['md:col-span-7', 'md:col-span-5 md:mt-24', 'md:col-span-5', 'md:col-span-7 md:mt-16']

export default function Servicos() {
  useSeo({
    title: 'Serviços de Fisioterapia e Massoterapia em Joinville | Movimentus',
    description: 'Fisioterapia ortopédica, tratamento de túnel do carpo e LER/DORT, massoterapia e fisioterapia pelo SUS no Centro de Joinville.',
    path: '/servicos',
  })
  return (
    <>
      <PageHeader title="Tratamentos para *a dor que atrapalha* a sua rotina.">
        <p>Fisioterapia e massoterapia no Centro de Joinville. Escolha pelo que você sente; se não tiver certeza, a avaliação resolve.</p>
      </PageHeader>

      <section className="pb-24 md:pb-36" aria-label="Lista de serviços">
        <Reveal className="container-site grid gap-6 md:grid-cols-12">
          {servicos.map((s, i) => (
            <div key={s.slug} data-reveal className={spans[i % spans.length]}>
              <SpotlightCard className="h-full rounded-[var(--radius-card)] bg-papel">
                <Link to={`/servicos/${s.slug}`} className="group flex h-full flex-col p-5 md:p-6">
                  <Cena motivo={s.motivo} tone={i % 3 === 0 ? 'musgo' : 'areia'} className={cn('w-full', i % 3 === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]')} />
                  <div className="flex flex-1 flex-col px-2 pt-7 pb-2">
                    <p className="text-sm font-medium text-argila">{s.curto}</p>
                    <h2 className="mt-2 text-[clamp(1.9rem,3vw,2.6rem)] text-musgo">{s.nome}</h2>
                    <p className="mt-3 max-w-[48ch] text-cinza">{s.beneficio}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold text-musgo">
                      Como funciona
                      <ArrowUpRight size={18} strokeWidth={1.5} className="transition-transform duration-500 group-hover:rotate-45" />
                    </span>
                  </div>
                </Link>
              </SpotlightCard>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="bg-musgo py-24 text-linho md:py-32" aria-labelledby="caminhos">
        <div className="container-site">
          <SplitText id="caminhos" text="Particular ou SUS: *os dois caminhos*" className="max-w-[16ch] text-[clamp(2.2rem,5vw,4.2rem)] text-linho [&_.text-argila]:text-argila-clara" />
          <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-linho/15 md:grid-cols-2">
            <div className="bg-musgo p-8 md:p-12">
              <h3 className="text-3xl">Particular</h3>
              <p className="mt-4 text-linho/75">Agenda direto pelo WhatsApp, sem precisar de encaminhamento para começar a avaliação. Inclui massoterapia.</p>
              <Link to="/agendamento" className="mt-6 inline-block font-semibold text-argila-clara underline underline-offset-4">Como agendar</Link>
            </div>
            <div className="bg-musgo p-8 md:p-12">
              <h3 className="text-3xl">Pelo SUS</h3>
              <p className="mt-4 text-linho/75">Com encaminhamento da Unidade Básica de Saúde. Mesma equipe, mesmo cuidado, sem custo para o paciente.</p>
              <Link to="/servicos/fisioterapia-pelo-sus" className="mt-6 inline-block font-semibold text-argila-clara underline underline-offset-4">O que levar</Link>
            </div>
          </div>
        </div>
      </section>

      <FinalCta title="Não sabe qual é *o seu caso?*" text="Conte no WhatsApp o que você está sentindo. A gente orienta qual atendimento faz sentido." mensagem="Olá! Vi os serviços no site e gostaria de saber qual é o indicado para o meu caso." />
    </>
  )
}

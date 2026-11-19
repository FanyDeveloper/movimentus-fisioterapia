import { useSeo } from '../lib/seo'
import { empresa, equipe } from '../data/empresa'
import PageHeader from '../components/common/PageHeader'
import { Cena } from '../components/common/Motivos'
import Txt from '../components/common/Txt'
import Reveal from '../components/common/Reveal'
import SplitText from '../components/reactbits/SplitText'
import ScrollReveal from '../components/reactbits/ScrollReveal'
import FinalCta from '../components/sections/FinalCta'
import { TextLink } from '../components/ui/Buttons'

const valores = [
  { titulo: 'Escutar antes de tratar', texto: 'A primeira parte do atendimento é conversa. Entender a sua rotina muda o tratamento inteiro.' },
  { titulo: 'O mesmo cuidado para todos', texto: 'Particular ou SUS, a equipe é a mesma e a atenção também.' },
  { titulo: 'Acolhimento de verdade', texto: 'Somos identificadas no Google como empresa que acolhe a comunidade LGBTQ+. Aqui, cada pessoa é atendida como é.' },
  { titulo: 'Resultado que dura', texto: 'Tratar a dor de hoje e ensinar você a evitar a de amanhã.' },
]

export default function Sobre() {
  useSeo({
    title: 'Sobre a Movimentus | Clínica de Fisioterapia no Centro de Joinville',
    description: 'Conheça a Movimentus, clínica de fisioterapia e massoterapia de empreendedoras no Centro de Joinville. Atendimento particular e pelo SUS.',
    path: '/sobre',
  })
  return (
    <>
      <PageHeader title="Uma clínica de fisioterapia *feita por mulheres*, no Centro de Joinville.">
        <p>
          A Movimentus atende na Av. Juscelino Kubitscheck, 655, com fisioterapia e massoterapia para quem convive com dor e quer voltar à rotina.
        </p>
      </PageHeader>

      <section className="pb-24 md:pb-36">
        <div className="container-site grid gap-6 md:grid-cols-12">
          <Cena motivo="equilibrio" tone="musgo" className="aspect-[4/3] md:col-span-8" />
          <Cena motivo="articulacao" className="aspect-[3/4] md:col-span-4 md:mt-24" />
        </div>
      </section>

      <section className="bg-papel py-24 md:py-36" aria-labelledby="historia">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <SplitText id="historia" text="Como *tudo começou*" className="text-[clamp(2.2rem,5vw,4.2rem)] text-musgo md:col-span-4" />
          <div className="space-y-6 text-[1.125rem] text-cinza md:col-span-7 md:col-start-6">
            <p><Txt>[CONFIRMAR: história da clínica — quem fundou, em que ano, por que escolheu o Centro de Joinville e o que mudou desde a abertura.]</Txt></p>
            <p>
              O que dá para afirmar hoje é o que os pacientes contam: nas avaliações do Google, quem passou pela clínica fala de profissionais capacitadas e dedicadas, de espaço adequado e de melhora em pouco tempo.
            </p>
            <p>Em funcionamento desde <Txt>{empresa.fundacao}</Txt>.</p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-36" aria-labelledby="valores">
        <div className="container-site">
          <h2 id="valores" className="sr-only">Nossos valores</h2>
          <ScrollReveal as="p" className="max-w-[22ch] font-display text-[clamp(2rem,4.6vw,4rem)] leading-[1.1] text-musgo" text="Fisioterapia boa é a que cabe na sua vida, não a que te obriga a parar tudo." />
          <Reveal as="ul" className="mt-20 grid gap-x-12 gap-y-14 md:grid-cols-2">
            {valores.map((v, i) => (
              <li key={v.titulo} data-reveal className={i % 2 ? 'md:mt-16' : ''}>
                <span aria-hidden="true" className="block h-px w-16 bg-argila" />
                <h3 className="mt-6 text-[2rem] text-musgo">{v.titulo}</h3>
                <p className="mt-3 max-w-[42ch] text-cinza">{v.texto}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-areia py-24 md:py-32" aria-labelledby="ambiente">
        <div className="container-site grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <SplitText id="ambiente" text="O *espaço*" className="text-[clamp(2.2rem,5vw,4.2rem)] text-musgo" />
            <p className="mt-6 text-[1.125rem] text-cinza">
              “Espaço adequado” foi como uma paciente descreveu a clínica no Google. <Txt>[CONFIRMAR: número de salas, equipamentos, acessibilidade para cadeirantes, ar-condicionado]</Txt>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:col-span-7">
            <Cena motivo="coluna" tone="papel" className="aspect-[3/4]" />
            <Cena motivo="ondas" tone="musgo" className="mt-12 aspect-[3/4]" />
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-site flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-[clamp(2rem,4.4vw,3.6rem)] text-musgo">Quem atende você</h2>
            <p className="mt-4 max-w-[48ch] text-cinza">{equipe.map((p) => p.nome).join(', ').replace(/, ([^,]*)$/, ' e $1')}. Conheça a equipe da Movimentus.</p>
          </div>
          <TextLink to="/equipe">Ver a equipe</TextLink>
        </div>
      </section>

      <FinalCta title="Vem conhecer *a clínica*." text="Chame no WhatsApp e agende sua avaliação no Centro de Joinville." />
    </>
  )
}

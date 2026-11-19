import { CreditCard, FileText, IdCard, Images } from 'lucide-react'
import { useSeo } from '../lib/seo'
import { empresa } from '../data/empresa'
import { waLink } from '../lib/whatsapp'
import PageHeader from '../components/common/PageHeader'
import Reveal from '../components/common/Reveal'
import Txt from '../components/common/Txt'
import ContactForm from '../components/common/ContactForm'
import SplitText from '../components/reactbits/SplitText'
import { Horarios } from '../components/sections/Location'
import { WhatsAppIcon } from '../components/common/Icons'
import { ButtonPrimary } from '../components/ui/Buttons'

const levar = [
  { icon: IdCard, titulo: 'Documento com foto', texto: 'RG, CNH ou outro documento oficial.' },
  { icon: CreditCard, titulo: 'Cartão SUS', texto: 'Para atendimentos pelo SUS. [CONFIRMAR: exigido também no particular?]' },
  { icon: FileText, titulo: 'Encaminhamento', texto: 'Obrigatório pelo SUS. No particular, traga se tiver.' },
  { icon: Images, titulo: 'Exames', texto: 'Raio-X, ultrassom, ressonância ou laudos, se você já tiver feito.' },
]

export default function Agendamento() {
  useSeo({
    title: 'Agendar Fisioterapia no Centro de Joinville | Movimentus',
    description: 'Como agendar fisioterapia ou massoterapia na Movimentus, particular ou pelo SUS, no Centro de Joinville. O que levar e horários.',
    path: '/agendamento',
  })
  return (
    <>
      <PageHeader title="Agendar é *uma mensagem*.">
        <p>Particular ou pelo SUS, o primeiro passo é o mesmo: chamar no WhatsApp {empresa.telefone}. Abaixo, o que muda em cada caso e o que levar.</p>
        <div className="mt-8">
          <ButtonPrimary href={waLink('Olá! Gostaria de agendar uma avaliação. Meu atendimento seria: (particular / SUS)')} icon={<WhatsAppIcon size={18} />}>
            Agendar agora
          </ButtonPrimary>
        </div>
      </PageHeader>

      <section className="pb-24 md:pb-32" aria-label="Caminhos de agendamento">
        <Reveal className="container-site grid gap-6 md:grid-cols-2">
          <article data-reveal className="rounded-[var(--radius-card)] bg-papel p-8 md:p-12">
            <h2 className="text-[2.4rem] text-musgo">Particular</h2>
            <ul className="mt-6 space-y-4 text-cinza">
              <li className="border-t border-musgo/15 pt-4">Mande uma mensagem dizendo o que sente e o melhor período para você.</li>
              <li className="border-t border-musgo/15 pt-4">A equipe confirma o horário da avaliação.</li>
              <li className="border-t border-musgo/15 pt-4">Valores e formas de pagamento: <Txt>[CONFIRMAR: valor da avaliação/sessão, Pix, cartão, pacotes]</Txt></li>
            </ul>
          </article>
          <article data-reveal className="rounded-[var(--radius-card)] bg-musgo p-8 text-linho md:mt-16 md:p-12">
            <h2 className="text-[2.4rem]">Pelo SUS</h2>
            <ul className="mt-6 space-y-4 text-linho/80">
              <li className="border-t border-linho/15 pt-4">Peça o encaminhamento para fisioterapia na sua Unidade Básica de Saúde.</li>
              <li className="border-t border-linho/15 pt-4"><Txt>[CONFIRMAR: como o paciente é direcionado à Movimentus — regulação municipal ou contato direto com a clínica]</Txt></li>
              <li className="border-t border-linho/15 pt-4">Com o encaminhamento em mãos, chame no WhatsApp para combinar o primeiro horário.</li>
            </ul>
          </article>
        </Reveal>
      </section>

      <section className="bg-areia py-24 md:py-32" aria-labelledby="levar">
        <div className="container-site">
          <SplitText id="levar" text="O que levar na *primeira sessão*" className="max-w-[16ch] text-[clamp(2.2rem,5vw,4.2rem)] text-musgo" />
          <Reveal as="ul" className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {levar.map(({ icon: Icon, titulo, texto }) => (
              <li key={titulo} data-reveal>
                <Icon size={28} strokeWidth={1.25} className="text-argila" />
                <h3 className="mt-5 text-2xl text-musgo">{titulo}</h3>
                <p className="mt-2 text-cinza"><Txt>{texto}</Txt></p>
              </li>
            ))}
          </Reveal>
          <p className="mt-12 max-w-[60ch] text-cinza">Venha com roupa confortável, que permita mexer a região tratada (bermuda ou regata, por exemplo).</p>
        </div>
      </section>

      <section className="py-24 md:py-32" aria-labelledby="form-agenda">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SplitText id="form-agenda" text="Prefere *preencher*?" className="text-[clamp(2.2rem,4.6vw,3.8rem)] text-musgo" />
            <p className="mt-5 text-cinza">Preencha e o WhatsApp abre com a mensagem pronta. É só enviar.</p>
            <div className="mt-10"><Horarios /></div>
          </div>
          <div className="lg:col-span-8"><ContactForm /></div>
        </div>
      </section>
    </>
  )
}

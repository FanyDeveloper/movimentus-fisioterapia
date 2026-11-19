import { Clock, MapPin, Phone } from 'lucide-react'
import { useSeo } from '../lib/seo'
import { empresa, mapsLink } from '../data/empresa'
import { waLink } from '../lib/whatsapp'
import PageHeader from '../components/common/PageHeader'
import Reveal from '../components/common/Reveal'
import ContactForm from '../components/common/ContactForm'
import Txt from '../components/common/Txt'
import { WhatsAppIcon } from '../components/common/Icons'
import { Horarios, Mapa } from '../components/sections/Location'

export default function Contato() {
  useSeo({
    title: 'Contato e Localização | Fisioterapia no Centro de Joinville | Movimentus',
    description: 'Fale com a Movimentus pelo WhatsApp (47) 99975-2422. Av. Juscelino Kubitscheck, 655, Centro, Joinville - SC. Horários e mapa.',
    path: '/contato',
  })
  const item = 'flex gap-4 border-t border-musgo/15 pt-6'
  return (
    <>
      <PageHeader title="Fale com a gente pelo *WhatsApp*.">
        <p>Resposta em horário de atendimento. Se preferir, ligue ou passe na clínica, no Centro de Joinville.</p>
      </PageHeader>

      <section className="pb-24 md:pb-32" aria-label="Informações de contato">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <Reveal className="space-y-6 lg:col-span-5">
            <a data-reveal href={waLink('Olá! Vim pela página de contato do site da Movimentus.')} target="_blank" rel="noopener noreferrer" className={`${item} group`}>
              <WhatsAppIcon size={24} className="mt-1 shrink-0 text-argila" />
              <span>
                <span className="block text-sm text-cinza">WhatsApp</span>
                <span className="font-display text-[2rem] leading-tight text-musgo transition-colors group-hover:text-argila">{empresa.telefone}</span>
              </span>
            </a>
            <a data-reveal href={empresa.telefoneLink} className={item}>
              <Phone size={22} strokeWidth={1.4} className="mt-1 shrink-0 text-argila" />
              <span><span className="block text-sm text-cinza">Telefone</span><span className="text-lg font-semibold text-musgo">{empresa.telefone}</span></span>
            </a>
            <a data-reveal href={mapsLink} target="_blank" rel="noopener noreferrer" className={item}>
              <MapPin size={22} strokeWidth={1.4} className="mt-1 shrink-0 text-argila" />
              <span>
                <span className="block text-sm text-cinza">Endereço</span>
                <span className="font-semibold text-musgo">{empresa.endereco.rua}</span>
                <span className="block text-cinza">{empresa.endereco.bairro}, {empresa.endereco.cidade} - {empresa.endereco.uf}, {empresa.endereco.cep}</span>
                <span className="block text-sm text-cinza"><Txt>{empresa.endereco.estacionamento}</Txt></span>
              </span>
            </a>
            <div data-reveal className={item}>
              <Clock size={22} strokeWidth={1.4} className="mt-1 shrink-0 text-argila" />
              <div className="flex-1"><span className="mb-2 block text-sm text-cinza">Horários</span><Horarios /></div>
            </div>
          </Reveal>
          <Mapa className="min-h-[420px] lg:col-span-7" />
        </div>
      </section>

      <section className="bg-areia py-24 md:py-32" aria-labelledby="form-contato">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="form-contato" className="text-[clamp(2.2rem,4.6vw,3.8rem)] text-musgo">Mande sua <em className="text-argila">mensagem</em></h2>
            <p className="mt-5 text-cinza">Ao enviar, o WhatsApp abre com tudo preenchido. Nada fica salvo no site.</p>
          </div>
          <div className="lg:col-span-8"><ContactForm /></div>
        </div>
      </section>
    </>
  )
}

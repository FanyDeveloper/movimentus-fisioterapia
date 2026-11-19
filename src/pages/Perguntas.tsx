import { useMemo } from 'react'
import { useSeo } from '../lib/seo'
import { empresa, faqGeral } from '../data/empresa'
import { waLink } from '../lib/whatsapp'
import PageHeader from '../components/common/PageHeader'
import Faq from '../components/common/Faq'
import { WhatsAppIcon } from '../components/common/Icons'
import { ButtonPrimary } from '../components/ui/Buttons'

export default function Perguntas() {
  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      // Só entram no JSON-LD as respostas já confirmadas
      mainEntity: faqGeral.filter((f) => !f.r.includes('[CONFIRMAR')).map((f) => ({ '@type': 'Question', name: f.p, acceptedAnswer: { '@type': 'Answer', text: f.r } })),
    }),
    [],
  )
  useSeo({
    title: 'Perguntas Frequentes | Fisioterapia no Centro de Joinville | Movimentus',
    description: 'Atende pelo SUS? Precisa de pedido médico? Onde fica? Tire suas dúvidas sobre fisioterapia e massoterapia na Movimentus, Centro de Joinville.',
    path: '/perguntas-frequentes',
    jsonLd,
  })
  return (
    <>
      <PageHeader title="Dúvidas que a gente *mais ouve*.">
        <p>Preço, SUS, estacionamento, horários. Se a sua pergunta não estiver aqui, mande no WhatsApp {empresa.telefone}.</p>
      </PageHeader>
      <section className="pb-24 md:pb-36">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <div className="md:col-span-8 md:col-start-3"><Faq items={faqGeral} /></div>
        </div>
        <div className="container-site mt-16 flex justify-center">
          <ButtonPrimary href={waLink('Olá! Li as perguntas frequentes no site e fiquei com uma dúvida:')} icon={<WhatsAppIcon size={18} />}>
            Perguntar no WhatsApp
          </ButtonPrimary>
        </div>
      </section>
    </>
  )
}

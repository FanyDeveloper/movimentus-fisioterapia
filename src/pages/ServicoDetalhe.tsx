import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'
import { useSeo } from '../lib/seo'
import { empresa, servicos } from '../data/empresa'
import { waLink } from '../lib/whatsapp'
import SplitText from '../components/reactbits/SplitText'
import Magnet from '../components/reactbits/Magnet'
import { Cena } from '../components/common/Motivos'
import Reveal from '../components/common/Reveal'
import Faq from '../components/common/Faq'
import Txt from '../components/common/Txt'
import { WhatsAppIcon } from '../components/common/Icons'
import { ButtonPrimary, ButtonSecondary } from '../components/ui/Buttons'
import FinalCta from '../components/sections/FinalCta'
import NotFound from './NotFound'

export default function ServicoDetalhe() {
  const { slug } = useParams()
  const s = servicos.find((x) => x.slug === slug)
  const jsonLd = useMemo(
    () =>
      s && {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'MedicalProcedure',
            name: s.nome,
            description: s.seoDescricao,
            provider: { '@id': `${empresa.site}/#clinica` },
          },
          {
            '@type': 'FAQPage',
            mainEntity: s.faq.filter((f) => !f.r.includes('[CONFIRMAR')).map((f) => ({ '@type': 'Question', name: f.p, acceptedAnswer: { '@type': 'Answer', text: f.r } })),
          },
        ],
      },
    [s],
  )
  useSeo({ title: s?.seoTitulo ?? 'Serviço não encontrado | Movimentus', description: s?.seoDescricao ?? '', path: `/servicos/${slug}`, noindex: !s, jsonLd: jsonLd || undefined })
  if (!s) return <NotFound />

  const msg = `Olá! Vi no site o serviço de ${s.nome} e gostaria de mais informações.`
  const outros = servicos.filter((x) => x.slug !== s.slug)

  return (
    <>
      <header className="pt-36 pb-16 md:pt-48 md:pb-24">
        <div className="container-site">
          <nav aria-label="Você está em" className="text-sm text-cinza">
            <Link to="/servicos" className="underline-offset-4 hover:underline">Serviços</Link> <span aria-hidden="true">/</span> <span className="text-musgo">{s.nome}</span>
          </nav>
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SplitText as="h1" trigger="load" delay={0.15} text={`${s.nome} *no Centro de Joinville*`} className="text-[clamp(2.6rem,6.6vw,5.6rem)] text-musgo" />
            </div>
            <Reveal className="lg:col-span-5">
              <p data-reveal className="text-[1.125rem] text-cinza">{s.beneficio}</p>
              <div data-reveal className="mt-8 flex flex-wrap gap-3">
                <Magnet padding={40} strength={5}>
                  <ButtonPrimary href={waLink(msg)} icon={<WhatsAppIcon size={18} />}>Falar no WhatsApp</ButtonPrimary>
                </Magnet>
                <ButtonSecondary to="/agendamento">Como agendar</ButtonSecondary>
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      <div className="container-site">
        <Cena motivo={s.motivo} tone="musgo" className="aspect-[4/3] w-full md:aspect-[21/9]" />
      </div>

      <section className="py-24 md:py-32" aria-labelledby="sobre-servico">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <SplitText id="sobre-servico" text="Do que se *trata*" className="text-[clamp(2.2rem,4.6vw,3.8rem)] text-musgo md:col-span-4" />
          <div className="space-y-6 text-[1.125rem] text-tinta/85 md:col-span-7 md:col-start-6">
            {s.descricao.map((p) => <p key={p}><Txt>{p}</Txt></p>)}
          </div>
        </div>
      </section>

      <section className="bg-papel py-24 md:py-32" aria-labelledby="para-quem">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <SplitText id="para-quem" text="Para *quem* é" className="text-[clamp(2.2rem,4.6vw,3.8rem)] text-musgo md:col-span-4" />
          <Reveal as="ul" className="grid gap-x-10 gap-y-6 sm:grid-cols-2 md:col-span-8">
            {s.paraQuem.map((p) => (
              <li key={p} data-reveal className="flex gap-4 border-t border-musgo/15 pt-5 text-[1.0625rem]">
                <Check size={20} strokeWidth={1.5} className="mt-1 shrink-0 text-argila" />
                <span><Txt>{p}</Txt></span>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32" aria-labelledby="como-funciona">
        <div className="container-site">
          <SplitText id="como-funciona" text="Como *funciona*" className="text-[clamp(2.2rem,4.6vw,3.8rem)] text-musgo" />
          <Reveal as="ol" className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            <span aria-hidden="true" className="absolute left-0 right-0 top-[7px] hidden h-px bg-musgo/20 md:block" />
            {s.comoFunciona.map((c) => (
              <li key={c.titulo} data-reveal className="relative">
                <span aria-hidden="true" className="block size-[15px] rounded-full border border-musgo bg-linho ring-4 ring-linho" />
                <h3 className="mt-6 text-[1.9rem] text-musgo">{c.titulo}</h3>
                <p className="mt-3 max-w-[36ch] text-cinza"><Txt>{c.texto}</Txt></p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-areia py-24 md:py-32" aria-labelledby="faq-servico">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <SplitText id="faq-servico" text="Perguntas *frequentes*" className="text-[clamp(2.2rem,4.6vw,3.8rem)] text-musgo" />
            <p className="mt-5 text-cinza">Ficou alguma dúvida? Pergunte no WhatsApp: {empresa.telefone}.</p>
          </div>
          <div className="md:col-span-8"><Faq items={s.faq} /></div>
        </div>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="outros">
        <div className="container-site">
          <h2 id="outros" className="text-[clamp(1.8rem,3.4vw,2.8rem)] text-musgo">Outros tratamentos</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {outros.map((o) => (
              <li key={o.slug}>
                <Link to={`/servicos/${o.slug}`} className="group flex items-center justify-between gap-4 rounded-[var(--radius-card)] border border-musgo/15 p-6 transition-colors duration-300 hover:border-musgo hover:bg-papel">
                  <span>
                    <span className="block font-display text-2xl text-musgo">{o.nome}</span>
                    <span className="text-sm text-cinza">{o.curto}</span>
                  </span>
                  <ArrowUpRight size={20} strokeWidth={1.5} className="shrink-0 text-musgo transition-transform duration-500 group-hover:rotate-45" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta title="Vamos *começar o tratamento?*" text="Mande uma mensagem e a gente te explica os próximos passos." mensagem={msg} />
    </>
  )
}

import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone } from 'lucide-react'
import { gsap, useGSAP, MQ } from '../../lib/gsap'
import { empresa, mapsLink, navLinks, servicos } from '../../data/empresa'
import { waLink } from '../../lib/whatsapp'
import Logo from './Logo'
import Txt from '../common/Txt'
import { WhatsAppIcon, InstagramIcon as Instagram } from '../common/Icons'

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      gsap.matchMedia().add(MQ.motion, () => {
        gsap.from('[data-foot-inner]', {
          yPercent: -18, opacity: 0.4, ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'top 35%', scrub: true },
        })
        gsap.from('[data-foot-word]', {
          yPercent: 60, ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top 80%', end: 'bottom bottom', scrub: true },
        })
      })
    },
    { scope: ref },
  )

  const ano = new Date().getFullYear()
  return (
    <footer ref={ref} className="relative overflow-hidden bg-musgo-900 text-linho">
      <div data-foot-inner className="container-site pt-20 pb-10 md:pt-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo light />
            <p className="mt-6 max-w-[34ch] text-linho/70">
              Fisioterapia e massoterapia no Centro de Joinville, particular e pelo SUS. Uma clínica de empreendedoras que acolhe todo mundo.
            </p>
            <a href={waLink('Olá! Vim pelo site da Movimentus e gostaria de agendar um horário.')} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 border-b border-argila-clara pb-1 font-semibold text-argila-clara">
              <WhatsAppIcon size={18} /> Agendar pelo WhatsApp
            </a>
          </div>

          <nav aria-label="Páginas" className="md:col-span-2">
            <h2 className="font-sans text-sm font-semibold text-linho/50">Páginas</h2>
            <ul className="mt-4 space-y-2.5">
              {[...navLinks, { to: '/agendamento', label: 'Agendamento' }].map((l) => (
                <li key={l.to}><Link to={l.to} className="text-linho/85 transition-colors hover:text-argila-clara">{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Serviços" className="md:col-span-3">
            <h2 className="font-sans text-sm font-semibold text-linho/50">Serviços</h2>
            <ul className="mt-4 space-y-2.5">
              {servicos.map((s) => (
                <li key={s.slug}><Link to={`/servicos/${s.slug}`} className="text-linho/85 transition-colors hover:text-argila-clara">{s.nome}</Link></li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="font-sans text-sm font-semibold text-linho/50">Contato e horários</h2>
            <ul className="mt-4 space-y-3 text-linho/85">
              <li><a href={empresa.telefoneLink} className="flex gap-3 hover:text-argila-clara"><Phone size={18} strokeWidth={1.5} className="mt-1 shrink-0" />{empresa.telefone}</a></li>
              <li><a href={mapsLink} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-argila-clara"><MapPin size={18} strokeWidth={1.5} className="mt-1 shrink-0" />{empresa.endereco.rua}, {empresa.endereco.bairro}, {empresa.endereco.cidade} - {empresa.endereco.uf}</a></li>
              <li className="flex gap-3">
                <Instagram size={18} strokeWidth={1.5} className="mt-1 shrink-0" />
                {empresa.redes.instagram ? <a href={empresa.redes.instagram} target="_blank" rel="noopener noreferrer">Instagram</a> : <span>Instagram <Txt>[CONFIRMAR: @perfil]</Txt></span>}
              </li>
            </ul>
            <dl className="mt-6 space-y-1.5 text-[0.95rem]">
              {empresa.horarios.map((h) => (
                <div key={h.dias} className="flex justify-between gap-4 border-b border-linho/10 pb-1.5">
                  <dt className="text-linho/60">{h.dias}</dt>
                  <dd><Txt>{h.horas}</Txt></dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-linho/10 pt-6 text-sm text-linho/55 md:flex-row md:items-center md:justify-between">
          <p>© {ano} {empresa.nomeCompleto}. <Txt>[CONFIRMAR: CNPJ e responsável técnico/CREFITO]</Txt></p>
          <div className="flex gap-6">
            <Link to="/politica-de-privacidade" className="hover:text-linho">Política de Privacidade</Link>
            <a href={empresa.credito.url} target="_blank" rel="noopener noreferrer" className="hover:text-linho">Site por {empresa.credito.nome}</a>
          </div>
        </div>
      </div>
      <p data-foot-word aria-hidden="true" className="pointer-events-none -mb-[0.22em] select-none whitespace-nowrap text-center font-display text-[24vw] leading-none tracking-[-0.05em] text-linho/[0.05]">
        Movimentus
      </p>
    </footer>
  )
}

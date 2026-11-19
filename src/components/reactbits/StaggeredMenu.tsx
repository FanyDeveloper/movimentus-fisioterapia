import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { Phone, MapPin } from 'lucide-react'
import { InstagramIcon as Instagram } from '../common/Icons'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { useLenis } from '../../hooks/useLenis'
import { empresa, mapsLink, navLinks } from '../../data/empresa'
import { waLink } from '../../lib/whatsapp'

/**
 * Recriação do StaggeredMenu (React Bits): camadas coloridas entram em sequência,
 * depois os links sobem um a um. Contato e redes no rodapé do menu.
 */
export default function StaggeredMenu({ open, onClose, id }: { open: boolean; onClose: () => void; id: string }) {
  const root = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const lenis = useLenis()

  useGSAP(
    () => {
      const reduce = prefersReducedMotion()
      gsap.set(root.current, { autoAlpha: 0 })
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: 'expo.out' } })
        .set(root.current, { autoAlpha: 1 })
        .fromTo('[data-layer]', { yPercent: reduce ? 0 : -100, opacity: reduce ? 0 : 1 }, { yPercent: 0, opacity: 1, duration: reduce ? 0.2 : 0.7, stagger: 0.07 })
        .fromTo('[data-item]', { yPercent: reduce ? 0 : 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.05 }, reduce ? '<' : '-=0.35')
        .fromTo('[data-foot]', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.4')
    },
    { scope: root },
  )

  useEffect(() => {
    if (!tl.current) return
    if (open) {
      tl.current.timeScale(1).play()
      lenis?.stop()
      document.body.style.overflow = 'hidden'
      const first = root.current?.querySelector<HTMLElement>('a')
      setTimeout(() => first?.focus(), 350)
    } else {
      tl.current.timeScale(1.6).reverse()
      lenis?.start()
      document.body.style.overflow = ''
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, lenis, onClose])

  return (
    <div ref={root} id={id} className="fixed inset-0 z-[60] lg:hidden" aria-hidden={!open} inert={!open}>
      <div data-layer className="absolute inset-0 bg-areia" />
      <div data-layer className="absolute inset-0 bg-argila" />
      <nav data-layer className="absolute inset-0 flex flex-col bg-musgo px-6 pt-28 pb-8 text-linho" aria-label="Menu principal">
        <ul className="flex flex-col gap-1">
          {navLinks.map((l) => (
            <li key={l.to} className="overflow-hidden">
              <NavLink
                data-item
                to={l.to}
                end={l.to === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `block py-1 font-display text-[2.6rem] leading-tight ${isActive ? 'italic text-argila-clara' : 'text-linho'}`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
          <li className="overflow-hidden">
            <NavLink data-item to="/agendamento" onClick={onClose} className="block py-1 font-display text-[2.6rem] leading-tight text-linho">
              Agendamento
            </NavLink>
          </li>
        </ul>

        <div data-foot className="mt-auto space-y-3 border-t border-linho/15 pt-6 text-[0.95rem] text-linho/80">
          <a href={empresa.telefoneLink} className="flex items-center gap-3"><Phone size={18} strokeWidth={1.5} /> {empresa.telefone}</a>
          <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3"><MapPin size={18} strokeWidth={1.5} /> {empresa.endereco.rua}, {empresa.endereco.bairro}</a>
          {empresa.redes.instagram ? (
            <a href={empresa.redes.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3"><Instagram size={18} strokeWidth={1.5} /> Instagram</a>
          ) : (
            <span className="flex items-center gap-3"><Instagram size={18} strokeWidth={1.5} /> Instagram <span className="confirmar">[CONFIRMAR: @perfil]</span></span>
          )}
          <a href={waLink('Olá! Vim pelo site da Movimentus e gostaria de agendar um horário.')} target="_blank" rel="noopener noreferrer" className="mt-4 flex w-full items-center justify-center rounded-full bg-linho py-4 font-semibold text-musgo">
            Agendar pelo WhatsApp
          </a>
        </div>
      </nav>
    </div>
  )
}

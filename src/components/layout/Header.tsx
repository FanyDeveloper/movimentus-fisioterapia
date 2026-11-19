import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { navLinks } from '../../data/empresa'
import { mensagemPorPagina, waLink } from '../../lib/whatsapp'
import { cn } from '../../lib/cn'
import Logo from './Logo'
import Magnet from '../reactbits/Magnet'
import StaggeredMenu from '../reactbits/StaggeredMenu'
import { WhatsAppIcon } from '../common/Icons'

/**
 * Header: transparente no topo; depois de 80px vira pílula flutuante com desfoque.
 * Some ao rolar para baixo e volta ao rolar para cima.
 */
export default function Header() {
  const root = useRef<HTMLElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const nav = useRef<HTMLUListElement>(null)
  const ind = useRef<HTMLSpanElement>(null)
  const [open, setOpen] = useState(false)
  const openRef = useRef(false)
  const pillRef = useRef(false)
  const { pathname } = useLocation()

  useEffect(() => { openRef.current = open }, [open])
  useEffect(() => setOpen(false), [pathname])
  // Com o menu aberto, a pílula fica transparente para o menu verde aparecer por trás.
  useEffect(() => {
    if (!bar.current || !pillRef.current) return
    gsap.to(bar.current, {
      backgroundColor: open ? 'rgba(36,57,44,0)' : 'rgba(243,238,230,0.78)',
      borderColor: open ? 'rgba(243,238,230,0.15)' : 'rgba(36,57,44,0.12)',
      duration: 0.3,
    })
  }, [open])

  useGSAP(
    () => {
      const reduce = prefersReducedMotion()
      const d = reduce ? 0 : 0.6
      let pill = false
      let hidden = false
      const toPill = (on: boolean) => {
        if (on === pill) return
        pill = on
        pillRef.current = on
        gsap.to(bar.current, on
          ? { maxWidth: 1040, marginTop: 12, borderRadius: 999, paddingTop: 10, paddingBottom: 10, backgroundColor: 'rgba(243,238,230,0.78)', borderColor: 'rgba(36,57,44,0.12)', boxShadow: '0 10px 30px -12px rgba(27,34,29,0.25)', duration: d, ease: 'expo.out' }
          : { maxWidth: 1600, marginTop: 0, borderRadius: 0, paddingTop: 22, paddingBottom: 22, backgroundColor: 'rgba(243,238,230,0)', borderColor: 'rgba(36,57,44,0)', boxShadow: '0 0 0 0 rgba(0,0,0,0)', duration: d, ease: 'expo.out' })
        bar.current!.classList.toggle('backdrop-blur-md', on)
      }
      const hide = (on: boolean) => {
        if (on === hidden) return
        hidden = on
        gsap.to(root.current, { yPercent: on ? -140 : 0, duration: reduce ? 0 : 0.5, ease: on ? 'power3.in' : 'expo.out' })
      }
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const y = self.scroll()
          toPill(y > 80)
          if (openRef.current) return hide(false)
          hide(self.direction === 1 && y > 240)
        },
      })
    },
    { scope: root },
  )

  /* Indicador que desliza entre os links */
  const moveTo = useCallback((el: HTMLElement | null) => {
    if (!ind.current) return
    if (!el) return gsap.to(ind.current, { opacity: 0, duration: 0.3 })
    gsap.to(ind.current, { x: el.offsetLeft, width: el.offsetWidth, opacity: 1, duration: 0.55, ease: 'expo.out' })
  }, [])
  const toActive = useCallback(() => moveTo(nav.current?.querySelector<HTMLElement>('a[aria-current="page"]') ?? null), [moveTo])
  useEffect(() => {
    const id = requestAnimationFrame(toActive)
    window.addEventListener('resize', toActive)
    document.fonts?.ready.then(toActive)
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', toActive) }
  }, [pathname, toActive])

  const close = useCallback(() => setOpen(false), [])

  return (
    <>
      <a href="#conteudo" className="sr-only z-[80] rounded-full bg-musgo px-4 py-2 text-linho focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Pular para o conteúdo
      </a>
      <header ref={root} className="fixed inset-x-0 top-0 z-[70] px-3 md:px-4">
        <div
          ref={bar}
          className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 border border-transparent px-4 py-[22px] md:px-6"
        >
          <Logo light={open} />

          <nav aria-label="Principal" className="hidden lg:block">
            <ul ref={nav} className="relative flex items-center gap-1" onMouseLeave={toActive}>
              <span ref={ind} aria-hidden="true" className="absolute left-0 top-0 h-full w-0 rounded-full bg-musgo/[0.08] opacity-0" />
              {navLinks.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    onMouseEnter={(e) => moveTo(e.currentTarget)}
                    onFocus={(e) => moveTo(e.currentTarget)}
                    className={({ isActive }) => cn('group relative block overflow-hidden rounded-full px-4 py-2 text-[0.95rem] font-medium', isActive ? 'text-musgo' : 'text-tinta/75 hover:text-musgo')}
                  >
                    {/* Troca de texto no hover: o texto sobe e outro entra */}
                    <span className="block transition-transform duration-500 ease-[var(--ease-suave)] group-hover:-translate-y-[130%]">{l.label}</span>
                    <span aria-hidden="true" className="absolute inset-x-4 top-2 block translate-y-[130%] italic transition-transform duration-500 ease-[var(--ease-suave)] group-hover:translate-y-0 font-display text-argila">
                      {l.label}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Magnet padding={40} strength={4} className="hidden lg:inline-block">
              <a
                href={waLink(mensagemPorPagina(pathname))}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-musgo px-5 py-2.5 text-[0.92rem] font-semibold text-linho"
              >
                <span aria-hidden="true" className="absolute inset-0 origin-left scale-x-0 bg-argila transition-transform duration-500 ease-[var(--ease-suave)] group-hover:scale-x-100" />
                <WhatsAppIcon size={17} className="relative" />
                <span className="relative">Agendar</span>
              </a>
            </Magnet>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              className={cn('relative grid size-12 place-items-center rounded-full lg:hidden', open ? 'text-linho' : 'text-musgo')}
            >
              <span aria-hidden="true" className={cn('absolute h-[1.5px] w-6 bg-current transition-transform duration-500 ease-[var(--ease-suave)]', open ? 'rotate-45' : '-translate-y-[5px]')} />
              <span aria-hidden="true" className={cn('absolute h-[1.5px] w-6 bg-current transition-transform duration-500 ease-[var(--ease-suave)]', open ? '-rotate-45' : 'translate-y-[5px]')} />
            </button>
          </div>
        </div>
      </header>
      <StaggeredMenu id="menu-mobile" open={open} onClose={close} />
    </>
  )
}

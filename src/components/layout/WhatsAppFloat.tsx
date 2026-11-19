import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, useGSAP } from '../../lib/gsap'
import { mensagemPorPagina, waLink } from '../../lib/whatsapp'
import { WhatsAppIcon } from '../common/Icons'
import { cn } from '../../lib/cn'

/** Botão flutuante de WhatsApp. A mensagem muda conforme a página. */
export default function WhatsAppFloat({ raised }: { raised?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const { pathname } = useLocation()
  useGSAP(() => {
    gsap.from(ref.current, { scale: 0.6, opacity: 0, y: 20, duration: 0.8, delay: 1.4, ease: 'expo.out' })
  })
  return (
    <a
      ref={ref}
      href={waLink(mensagemPorPagina(pathname))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com a Movimentus no WhatsApp"
      className={cn(
        'group fixed right-4 z-50 grid size-14 place-items-center rounded-full bg-musgo text-linho shadow-[0_12px_30px_-10px_rgba(27,34,29,.5)] transition-[bottom,background-color] duration-500 hover:bg-argila md:right-6 md:size-16',
        raised ? 'bottom-[168px] sm:bottom-28' : 'bottom-4 md:bottom-6',
      )}
    >
      <span aria-hidden="true" className="absolute inset-0 rounded-full border border-musgo/40 opacity-0 transition-all duration-700 group-hover:scale-125 group-hover:opacity-100" />
      <WhatsAppIcon size={26} />
    </a>
  )
}

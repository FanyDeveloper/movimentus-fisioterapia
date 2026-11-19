import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '../../lib/gsap'

export const COOKIE_KEY = 'movimentus-cookies'

export function readConsent(): string | null {
  try { return localStorage.getItem(COOKIE_KEY) } catch { return null }
}

/** Banner de cookies discreto, com aceitar e recusar. */
export default function CookieBanner({ visible, onDecide }: { visible: boolean; onDecide: (v: 'aceito' | 'recusado') => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (visible && ref.current) gsap.from(ref.current, { y: 40, opacity: 0, duration: 0.8, delay: 1.8, ease: 'expo.out' })
  }, [visible])
  if (!visible) return null
  const decide = (v: 'aceito' | 'recusado') => {
    try { localStorage.setItem(COOKIE_KEY, v) } catch { /* armazenamento indisponível */ }
    onDecide(v)
  }
  return (
    <div ref={ref} role="dialog" aria-live="polite" aria-label="Aviso de cookies" className="fixed inset-x-3 bottom-3 z-[55] mx-auto max-w-[560px] rounded-2xl border border-musgo/10 bg-papel/95 p-5 text-[0.95rem] shadow-[0_20px_50px_-20px_rgba(27,34,29,.35)] backdrop-blur-md sm:left-6 sm:right-auto sm:bottom-6">
      <p className="text-cinza">
        Usamos apenas cookies essenciais para o site funcionar e, com a sua permissão, cookies de medição de visitas. Detalhes na{' '}
        <Link to="/politica-de-privacidade" className="text-musgo underline underline-offset-4">Política de Privacidade</Link>.
      </p>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => decide('aceito')} className="rounded-full bg-musgo px-5 py-2.5 font-semibold text-linho transition-colors hover:bg-argila">Aceitar</button>
        <button type="button" onClick={() => decide('recusado')} className="rounded-full border border-musgo/25 px-5 py-2.5 font-semibold text-musgo transition-colors hover:border-musgo">Recusar</button>
      </div>
    </div>
  )
}

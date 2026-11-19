import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

/** Assinatura provisória: marca de equilíbrio + nome. [CONFIRMAR: logotipo oficial da clínica] */
export default function Logo({ light, className }: { light?: boolean; className?: string }) {
  return (
    <Link to="/" aria-label="Movimentus, página inicial" className={cn('group inline-flex items-center gap-2.5', className)}>
      <svg width="32" height="22" viewBox="0 0 64 44" fill="none" aria-hidden="true" className="shrink-0">
        <path d="M24 40a8 8 0 0 1 16 0z" fill="#A94E27" />
        <g className="origin-[32px_32px] -rotate-[10deg] transition-transform duration-700 ease-[var(--ease-suave)] group-hover:rotate-0">
          <line x1="4" y1="32" x2="60" y2="32" stroke={light ? '#F3EEE6' : '#24392C'} strokeWidth="3" strokeLinecap="round" />
          <circle cx="13" cy="23" r="7" fill={light ? '#F3EEE6' : '#24392C'} />
          <circle cx="52" cy="26" r="4" stroke={light ? '#F3EEE6' : '#24392C'} strokeWidth="2" />
        </g>
      </svg>
      <span className={cn('font-display text-[1.45rem] leading-none tracking-[-0.03em]', light ? 'text-linho' : 'text-musgo')}>
        Movimentus
      </span>
    </Link>
  )
}

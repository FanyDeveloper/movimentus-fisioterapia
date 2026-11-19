import { useId } from 'react'

/** Ícone do WhatsApp em traço fino, no mesmo peso dos ícones Lucide. */
export function WhatsAppIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3.5 20.5 4.8 16A8.5 8.5 0 1 1 8 19.3z" />
      <path d="M9 8.6c0 3.2 2.9 6.3 6.3 6.4.5 0 1.1-.6 1.2-1.1l-1.6-.9-.9.8c-1-.4-2.1-1.4-2.6-2.5l.8-.9-.8-1.7c-.6 0-1.4.5-1.4 1.1" />
    </svg>
  )
}

export function Stars({ value, size = 15, className }: { value: number; size?: number; className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  return (
    <span className={`inline-flex shrink-0 whitespace-nowrap ${className ?? ''}`} role="img" aria-label={`Nota ${value.toLocaleString('pt-BR')} de 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i))
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" className="inline-block align-[-2px]" aria-hidden="true">
            <defs>
              <linearGradient id={`${uid}-${i}`}>
                <stop offset={`${fill * 100}%`} stopColor="currentColor" />
                <stop offset={`${fill * 100}%`} stopColor="currentColor" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path fill={`url(#${uid}-${i})`} d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z" />
          </svg>
        )
      })}
    </span>
  )
}

/** Ícone do Instagram em traço fino (a Lucide removeu ícones de marca). */
export function InstagramIcon({ size = 18, strokeWidth = 1.5, className }: { size?: number; strokeWidth?: number; className?: string }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  )
}

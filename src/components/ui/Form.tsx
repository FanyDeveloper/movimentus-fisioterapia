import { useId, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { Check } from 'lucide-react'
import { cn } from '../../lib/cn'

const field =
  'peer block w-full rounded-2xl border bg-papel px-4 pt-6 pb-2.5 text-[1rem] text-tinta outline-none transition-colors duration-300 placeholder:text-transparent focus:border-musgo focus-visible:outline-none'
const label =
  'pointer-events-none absolute left-4 top-1/2 origin-left -translate-y-1/2 text-cinza transition-all duration-300 ease-[var(--ease-suave)] peer-focus:top-4 peer-focus:scale-[0.8] peer-focus:text-musgo peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:scale-[0.8]'

type Err = { error?: string; label: string }

/** Input com label flutuante (Uiverse). */
export function FloatingInput({ label: text, error, className, ...props }: Err & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId()
  return (
    <div className={className}>
      <div className="relative">
        <input id={id} placeholder=" " aria-invalid={!!error} aria-describedby={error ? `${id}-e` : undefined} className={cn(field, error ? 'border-argila' : 'border-musgo/20')} {...props} />
        <label htmlFor={id} className={label}>{text}</label>
      </div>
      {error && <p id={`${id}-e`} className="mt-1.5 pl-1 text-sm text-argila">{error}</p>}
    </div>
  )
}

export function FloatingTextarea({ label: text, error, className, ...props }: Err & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId()
  return (
    <div className={className}>
      <div className="relative">
        <textarea id={id} placeholder=" " rows={4} aria-invalid={!!error} className={cn(field, 'resize-none', error ? 'border-argila' : 'border-musgo/20')} {...props} />
        <label htmlFor={id} className={cn(label, 'top-7')}>{text}</label>
      </div>
      {error && <p className="mt-1.5 pl-1 text-sm text-argila">{error}</p>}
    </div>
  )
}

export function FloatingSelect({ label: text, error, className, children, ...props }: Err & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId()
  return (
    <div className={className}>
      <div className="relative">
        <select id={id} aria-invalid={!!error} className={cn(field, 'appearance-none pr-10', error ? 'border-argila' : 'border-musgo/20')} {...props}>
          {children}
        </select>
        <label htmlFor={id} className="pointer-events-none absolute left-4 top-4 origin-left -translate-y-1/2 scale-[0.8] text-musgo">{text}</label>
        <svg aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-cinza" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="m6 9 6 6 6-6" /></svg>
      </div>
      {error && <p className="mt-1.5 pl-1 text-sm text-argila">{error}</p>}
    </div>
  )
}

/** Checkbox animado para o consentimento LGPD (Uiverse). */
export function AnimatedCheckbox({ checked, onChange, children, error }: { checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode; error?: string }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="group flex cursor-pointer items-start gap-3 text-[0.95rem] leading-relaxed text-cinza">
        <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
        <span
          aria-hidden="true"
          className={cn(
            'mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border transition-all duration-300 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-argila',
            checked ? 'scale-100 border-musgo bg-musgo text-linho' : error ? 'border-argila bg-papel' : 'border-musgo/30 bg-papel group-hover:border-musgo',
          )}
        >
          <Check size={15} strokeWidth={2.5} className={cn('transition-all duration-300 ease-[var(--ease-suave)]', checked ? 'scale-100 opacity-100' : 'scale-50 opacity-0')} />
        </span>
        <span>{children}</span>
      </label>
      {error && <p className="mt-1.5 pl-9 text-sm text-argila">{error}</p>}
    </div>
  )
}

/** Loader discreto (três pontos). */
export function Loader({ className }: { className?: string }) {
  return (
    <span role="status" aria-label="Enviando" className={cn('inline-flex items-center gap-1', className)}>
      {[0, 1, 2].map((i) => (
        <span key={i} className="size-1.5 rounded-full bg-current" style={{ animation: `dots 1.1s ${i * 0.15}s infinite ease-in-out` }} />
      ))}
    </span>
  )
}

import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ClickSpark from '../reactbits/ClickSpark'
import { cn } from '../../lib/cn'

type Base = { children: ReactNode; className?: string; to?: string; href?: string; onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean; icon?: ReactNode; 'aria-label'?: string }

function Polymorphic({ to, href, onClick, type = 'button', disabled, className, children, ...rest }: Base) {
  if (to) return <Link to={to} className={className} {...rest}>{children}</Link>
  if (href) {
    const external = href.startsWith('http')
    return (
      <a href={href} className={className} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} {...rest}>
        {children}
      </a>
    )
  }
  return <button type={type} onClick={onClick} disabled={disabled} className={className} {...rest}>{children}</button>
}

/**
 * Botão principal (inspirado nos botões mais populares do Uiverse):
 * o preenchimento em argila desliza da esquerda e a seta atravessa o círculo.
 */
export function ButtonPrimary({ tone = 'dark', icon, ...props }: Base & { tone?: 'dark' | 'light' }) {
  const dark = tone === 'dark'
  const Icon = icon ?? <ArrowRight size={18} strokeWidth={1.75} />
  return (
    <ClickSpark>
      <Polymorphic
        {...props}
        className={cn(
          'group relative isolate inline-flex min-h-[52px] items-center gap-4 overflow-hidden rounded-full py-1.5 pr-1.5 pl-6 text-[0.98rem] font-semibold transition-colors duration-300 disabled:opacity-60',
          dark ? 'bg-musgo text-linho' : 'bg-linho text-musgo',
          props.className,
        )}
      >
        <span aria-hidden="true" className="absolute inset-0 -z-10 origin-left scale-x-0 bg-argila transition-transform duration-500 ease-[var(--ease-suave)] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
        <span className="relative transition-colors duration-300 group-hover:text-papel">{props.children}</span>
        <span className={cn('relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full', dark ? 'bg-linho text-musgo' : 'bg-musgo text-linho')}>
          <span className="transition-transform duration-500 ease-[var(--ease-suave)] group-hover:translate-x-[180%]">{Icon}</span>
          <span aria-hidden="true" className="absolute -translate-x-[180%] transition-transform duration-500 ease-[var(--ease-suave)] group-hover:translate-x-0">{Icon}</span>
        </span>
      </Polymorphic>
    </ClickSpark>
  )
}

/** Botão secundário: contorno fino com sublinhado que cresce no hover. */
export function ButtonSecondary({ tone = 'dark', ...props }: Base & { tone?: 'dark' | 'light' }) {
  return (
    <Polymorphic
      {...props}
      className={cn(
        'group relative inline-flex min-h-[52px] items-center gap-2 rounded-full border px-6 text-[0.98rem] font-semibold transition-colors duration-300',
        tone === 'dark' ? 'border-musgo/30 text-musgo hover:border-musgo' : 'border-linho/30 text-linho hover:border-linho',
        props.className,
      )}
    >
      <span className="relative">
        {props.children}
        <span aria-hidden="true" className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[var(--ease-suave)] group-hover:origin-left group-hover:scale-x-100" />
      </span>
    </Polymorphic>
  )
}

/** Link de texto com seta (para "ver mais"). */
export function TextLink({ to, children, className }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link to={to} className={cn('group inline-flex items-center gap-2 font-semibold text-musgo', className)}>
      <span className="relative">
        {children}
        <span aria-hidden="true" className="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-current transition-transform duration-500 ease-[var(--ease-suave)] group-hover:scale-x-50" />
      </span>
      <ArrowRight size={16} strokeWidth={1.75} className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  )
}

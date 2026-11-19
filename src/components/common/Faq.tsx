import { useId, useState } from 'react'
import { Plus } from 'lucide-react'
import Txt from './Txt'
import { cn } from '../../lib/cn'

/** Acordeão acessível de perguntas frequentes. */
export default function Faq({ items, tone = 'light' }: { items: { p: string; r: string }[]; tone?: 'light' | 'dark' }) {
  const [open, setOpen] = useState<number | null>(0)
  const base = useId()
  const dark = tone === 'dark'
  return (
    <div className={cn('border-t', dark ? 'border-linho/15' : 'border-musgo/15')}>
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={it.p} className={cn('border-b', dark ? 'border-linho/15' : 'border-musgo/15')}>
            <h3 className="font-sans">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${base}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left font-display text-[1.25rem] leading-snug md:text-[1.5rem]"
              >
                <span className="transition-transform duration-500 ease-[var(--ease-suave)] group-hover:translate-x-1">{it.p}</span>
                <span className={cn('grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500', dark ? 'border-linho/25' : 'border-musgo/25', isOpen && 'rotate-45 border-argila bg-argila text-papel')}>
                  <Plus size={18} strokeWidth={1.5} />
                </span>
              </button>
            </h3>
            <div id={`${base}-${i}`} role="region" className={cn('grid transition-[grid-template-rows] duration-500 ease-[var(--ease-suave)]', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
              <div className="overflow-hidden">
                <p className={cn('max-w-[62ch] pb-7 pr-12', dark ? 'text-linho/75' : 'text-cinza')}><Txt>{it.r}</Txt></p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

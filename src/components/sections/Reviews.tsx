import { ExternalLink } from 'lucide-react'
import { avaliacoes, empresa } from '../../data/empresa'
import SplitText from '../reactbits/SplitText'
import CountUp from '../reactbits/CountUp'
import Reveal from '../common/Reveal'
import Txt from '../common/Txt'
import { Stars } from '../common/Icons'
import { cn } from '../../lib/cn'

export default function Reviews({ compact }: { compact?: boolean }) {
  return (
    <section className={cn(compact ? 'py-20 md:py-28' : 'py-24 md:py-36')} aria-labelledby="aval-titulo">
      <div className="container-site">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <SplitText id="aval-titulo" text="O que dizem *no Google*" className="text-[clamp(2.4rem,5.6vw,4.8rem)] text-musgo md:col-span-7" />
          <div className="flex items-end gap-5 md:col-span-5 md:justify-end">
            <CountUp to={empresa.google.nota} decimals={1} className="font-display text-[5.5rem] leading-[0.8] text-musgo" />
            <div className="pb-1">
              <Stars value={empresa.google.nota} size={18} className="text-argila" />
              <p className="mt-1 text-cinza">
                <CountUp to={empresa.google.totalAvaliacoes} /> avaliações no Google
              </p>
              <a href={empresa.google.perfil} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-musgo underline-offset-4 hover:underline">
                Ver todas <ExternalLink size={14} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        <Reveal className="mt-16 grid gap-6 md:grid-cols-12">
          {avaliacoes.map((a, i) => (
            <figure
              key={a.nome}
              data-reveal
              className={cn(
                'flex flex-col justify-between rounded-[var(--radius-card)] p-8 md:p-12',
                i === 0 ? 'bg-musgo text-linho md:col-span-7' : 'bg-papel text-tinta md:col-span-5 md:mt-20',
              )}
            >
              <blockquote className={cn('font-display leading-snug', i === 0 ? 'text-[clamp(1.4rem,2.4vw,2rem)]' : 'text-[clamp(1.25rem,2vw,1.6rem)]')}>
                “{a.texto}”
              </blockquote>
              {a.truncada && <p className={cn('mt-3 text-sm', i === 0 ? 'text-linho/60' : 'text-cinza')}><Txt>[CONFIRMAR: texto completo da avaliação]</Txt></p>}
              <figcaption className={cn('mt-10 flex flex-wrap items-center justify-between gap-3 border-t pt-5 text-[0.95rem]', i === 0 ? 'border-linho/15' : 'border-musgo/15')}>
                <span className="font-semibold">{a.nome}</span>
                <span className={cn('flex items-center gap-2', i === 0 ? 'text-linho/70' : 'text-cinza')}>
                  <Stars value={a.nota} className={i === 0 ? 'text-argila-clara' : 'text-argila'} />
                  Avaliação no Google
                  {a.notaConfirmar && <Txt>[CONFIRMAR: nota]</Txt>}
                </span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

import type { ReactNode } from 'react'
import SplitText from '../reactbits/SplitText'
import { Equilibrio } from './Motivos'
import Reveal from './Reveal'

/** Abertura das páginas internas: h1 grande, texto de apoio e o arco do goniômetro. */
export default function PageHeader({ title, intro, children }: { title: string; intro?: ReactNode; children?: ReactNode }) {
  return (
    <header className="relative overflow-hidden pt-36 pb-16 md:pt-48 md:pb-24">
      <div className="container-site grid gap-10 md:grid-cols-12">
        <div className="md:col-span-9 lg:col-span-8">
          <SplitText as="h1" trigger="load" delay={0.15} text={title} className="text-[clamp(2.6rem,7vw,5.8rem)] text-musgo" />
          {(intro || children) && (
            <Reveal className="mt-8 max-w-[58ch] space-y-6 text-[1.125rem] text-cinza">
              {intro && <div data-reveal>{intro}</div>}
              {children && <div data-reveal>{children}</div>}
            </Reveal>
          )}
        </div>
        <div className="pointer-events-none absolute -right-16 top-36 hidden w-[320px] opacity-80 md:block lg:right-8 lg:w-[400px]">
          <Equilibrio />
        </div>
      </div>
    </header>
  )
}

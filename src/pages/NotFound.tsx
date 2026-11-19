import { useSeo } from '../lib/seo'
import { Equilibrio } from '../components/common/Motivos'
import SplitText from '../components/reactbits/SplitText'
import { ButtonPrimary, ButtonSecondary } from '../components/ui/Buttons'

export default function NotFound() {
  useSeo({ title: 'Página não encontrada | Movimentus', description: 'Esta página não existe.', path: '/404', noindex: true })
  return (
    <section className="flex min-h-[90svh] items-center pt-32 pb-20">
      <div className="container-site grid items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-display text-[clamp(5rem,16vw,12rem)] leading-none text-argila/90">404</p>
          <SplitText as="h1" trigger="load" delay={0.1} text="Essa página *saiu do lugar*." className="mt-4 text-[clamp(2.4rem,5.6vw,4.6rem)] text-musgo" />
          <p className="mt-6 max-w-[44ch] text-[1.125rem] text-cinza">
            Acontece até com articulação boa. O endereço pode ter mudado ou foi digitado errado. Vamos voltar ao movimento:
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonPrimary to="/">Ir para o início</ButtonPrimary>
            <ButtonSecondary to="/servicos">Ver serviços</ButtonSecondary>
          </div>
        </div>
        <div className="md:col-span-5">
          <Equilibrio amplitude={18} />
        </div>
      </div>
    </section>
  )
}

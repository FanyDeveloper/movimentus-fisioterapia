import { Cena } from '../common/Motivos'
import ScrollReveal from '../reactbits/ScrollReveal'
import { TextLink } from '../ui/Buttons'

export default function AboutTeaser() {
  return (
    <section className="py-24 md:py-36" aria-labelledby="sobre-titulo">
      <div className="container-site grid items-start gap-12 md:grid-cols-12">
        <div className="md:col-span-5 md:mt-24">
          <Cena motivo="pedras" tone="musgo" className="aspect-[4/5] w-full" />
        </div>
        <div className="md:col-span-7 md:pl-6 lg:pl-12">
          <h2 id="sobre-titulo" className="sr-only">Sobre a Movimentus</h2>
          <ScrollReveal
            className="font-display text-[clamp(1.9rem,3.8vw,3.4rem)] leading-[1.12] text-musgo"
            text="A Movimentus é uma clínica de fisioterapia e massoterapia tocada por mulheres, no Centro de Joinville. Nas avaliações do Google, os pacientes chamam a equipe pelo nome. É esse tipo de atendimento que a gente faz questão de manter."
          />
          <div className="mt-10 grid gap-8 border-t border-musgo/15 pt-8 sm:grid-cols-2">
            <p className="text-cinza">
              Atendemos quem paga particular e quem chega encaminhado pelo SUS, com o mesmo cuidado. A avaliação começa por ouvir: onde dói, desde quando, o que você deixou de fazer.
            </p>
            <div className="flex items-end">
              <TextLink to="/sobre">Conheça a clínica</TextLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

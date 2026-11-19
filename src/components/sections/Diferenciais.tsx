import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { empresa, equipe } from '../../data/empresa'
import { MagicBento, BentoCard } from '../reactbits/MagicBento'
import SplitText from '../reactbits/SplitText'
import { Equilibrio } from '../common/Motivos'
import Txt from '../common/Txt'
import { Stars } from '../common/Icons'

export default function Diferenciais() {
  const nomes = equipe.map((p) => p.nome)
  return (
    <section className="py-24 md:py-36" aria-labelledby="dif-titulo">
      <div className="container-site">
        <SplitText id="dif-titulo" text="Por que quem vem *recomenda*" className="max-w-[14ch] text-[clamp(2.4rem,5.6vw,4.8rem)] text-musgo" />

        <MagicBento className="mt-14 md:grid-cols-4 md:auto-rows-[minmax(220px,auto)]">
          <BentoCard tone="dark" span="md:col-span-2 md:row-span-2" className="flex flex-col justify-between md:min-h-[460px]">
            <div className="absolute right-6 top-8 w-[62%] opacity-40"><Equilibrio tone="linho" /></div>
            <div />
            <div>
              <h3 className="text-[clamp(2rem,3.6vw,3.2rem)] text-linho">Particular e pelo SUS</h3>
              <p className="mt-4 max-w-[38ch] text-linho/75">
                A mesma equipe e o mesmo cuidado, seja qual for o caminho que te trouxe até aqui. Explicamos o que trazer para você não perder viagem.
              </p>
              <Link to="/servicos/fisioterapia-pelo-sus" className="mt-6 inline-flex items-center gap-2 font-semibold text-argila-clara">
                Como funciona pelo SUS <ArrowRight size={16} strokeWidth={1.75} />
              </Link>
            </div>
          </BentoCard>

          <BentoCard span="md:col-span-2">
            <h3 className="text-3xl text-musgo">Gente que você chama pelo nome</h3>
            <p className="mt-3 text-cinza">
              {nomes.slice(0, -1).join(', ')} e {nomes.at(-1)}: são os nomes que aparecem nas avaliações de quem já passou pela clínica.
            </p>
            <Link to="/equipe" className="mt-5 inline-flex items-center gap-2 font-semibold text-musgo">Conheça a equipe <ArrowRight size={16} strokeWidth={1.75} /></Link>
          </BentoCard>

          <BentoCard tone="clay" className="flex flex-col justify-between">
            <Stars value={empresa.google.nota} size={16} className="text-papel" />
            <div>
              <p className="font-display text-6xl leading-none">{empresa.google.nota.toLocaleString('pt-BR')}</p>
              <p className="mt-2 text-papel/85">{empresa.google.totalAvaliacoes} avaliações no Google</p>
            </div>
          </BentoCard>

          <BentoCard>
            <h3 className="text-2xl text-musgo">Clínica de empreendedoras</h3>
            <p className="mt-3 text-[0.98rem] text-cinza">Um negócio criado e tocado por mulheres, no coração de Joinville.</p>
          </BentoCard>

          <BentoCard span="md:col-span-2">
            <h3 className="text-3xl text-musgo">Um lugar seguro para todo mundo</h3>
            <p className="mt-3 max-w-[52ch] text-cinza">
              A Movimentus é identificada no Google como empresa que acolhe a comunidade LGBTQ+. Aqui ninguém precisa se explicar para ser bem atendido.
            </p>
          </BentoCard>

          <BentoCard span="md:col-span-2">
            <h3 className="text-3xl text-musgo">No Centro, perto de tudo</h3>
            <p className="mt-3 text-cinza">
              {empresa.endereco.rua}, {empresa.endereco.bairro}. <Txt>{empresa.endereco.referencia}</Txt>
            </p>
          </BentoCard>
        </MagicBento>
      </div>
    </section>
  )
}

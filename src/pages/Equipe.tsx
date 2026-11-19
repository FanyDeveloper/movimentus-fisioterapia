import { useSeo } from '../lib/seo'
import { equipe } from '../data/empresa'
import PageHeader from '../components/common/PageHeader'
import { Cena } from '../components/common/Motivos'
import Reveal from '../components/common/Reveal'
import Txt from '../components/common/Txt'
import FinalCta from '../components/sections/FinalCta'
import { cn } from '../lib/cn'

export default function Equipe() {
  useSeo({
    title: 'Equipe de Fisioterapeutas | Movimentus, Centro de Joinville',
    description: 'Conheça Maria, Jessyka e Silvana, a equipe da Movimentus Clínica de Fisioterapia e Massoterapia no Centro de Joinville.',
    path: '/equipe',
  })
  return (
    <>
      <PageHeader title="As pessoas que os pacientes *chamam pelo nome*.">
        <p>Nas avaliações do Google, quem passou pela Movimentus cita a equipe pelo nome. Aqui você conhece quem vai te atender.</p>
      </PageHeader>

      <section className="pb-24 md:pb-36" aria-label="Profissionais">
        <Reveal as="ul" className="container-site grid gap-x-6 gap-y-16 md:grid-cols-3">
          {equipe.map((p, i) => (
            <li key={p.nome} data-reveal className={cn(i === 1 && 'md:mt-24', i === 2 && 'md:mt-12')}>
              <Cena motivo="ondas" tone={i === 1 ? 'musgo' : 'areia'} className="aspect-[3/4] w-full">
                <span className={cn('absolute inset-0 grid place-items-center font-display text-[7rem] italic leading-none', i === 1 ? 'text-linho' : 'text-musgo')}>{p.nome[0]}</span>
              </Cena>
              <h2 className="mt-6 text-[2.4rem] text-musgo">
                {p.nome} <span className="text-[1rem]"><Txt>{p.sobrenome}</Txt></span>
              </h2>
              <p className="mt-1 font-medium text-argila"><Txt>{p.funcao}</Txt></p>
              <dl className="mt-4 space-y-1 text-[0.95rem] text-cinza">
                <div className="flex gap-2"><dt className="text-tinta">Registro:</dt><dd><Txt>{p.registro}</Txt></dd></div>
                <div className="flex gap-2"><dt className="text-tinta">Foco:</dt><dd><Txt>{p.foco}</Txt></dd></div>
              </dl>
              {p.citacao && (
                <blockquote className="mt-6 border-l-2 border-argila pl-4 font-display text-[1.2rem] italic leading-snug text-musgo">
                  “{p.citacao}”
                  <footer className="mt-2 font-sans text-sm not-italic text-cinza">{p.autorCitacao}</footer>
                </blockquote>
              )}
            </li>
          ))}
        </Reveal>
      </section>

      <FinalCta title="Agende com *a nossa equipe*." text="Diga no WhatsApp se prefere alguma profissional. A gente verifica a agenda." mensagem="Olá! Conheci a equipe pelo site e gostaria de agendar um horário." />
    </>
  )
}

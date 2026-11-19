import { Clock, MapPin, Navigation, Phone } from 'lucide-react'
import { empresa, mapsEmbed, mapsLink } from '../../data/empresa'
import SplitText from '../reactbits/SplitText'
import Txt from '../common/Txt'
import Reveal from '../common/Reveal'
import { ButtonPrimary, ButtonSecondary } from '../ui/Buttons'

export function Horarios({ dark }: { dark?: boolean }) {
  return (
    <dl className="space-y-2">
      {empresa.horarios.map((h) => (
        <div key={h.dias} className={`flex justify-between gap-6 border-b pb-2 ${dark ? 'border-linho/15' : 'border-musgo/12'}`}>
          <dt className={dark ? 'text-linho/70' : 'text-cinza'}>{h.dias}</dt>
          <dd className="font-medium"><Txt>{h.horas}</Txt></dd>
        </div>
      ))}
    </dl>
  )
}

export function Mapa({ className }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[var(--radius-card)] bg-areia ${className ?? ''}`}>
      <iframe
        title={`Mapa: ${empresa.nomeCompleto}, ${empresa.endereco.rua}, ${empresa.endereco.cidade}`}
        src={mapsEmbed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full grayscale-[35%] sepia-[15%]"
        style={{ border: 0 }}
      />
    </div>
  )
}

export default function Location() {
  return (
    <section className="py-24 md:py-36" aria-labelledby="local-titulo">
      <div className="container-site">
        <SplitText id="local-titulo" text="Estamos no *Centro de Joinville*" className="max-w-[16ch] text-[clamp(2.4rem,5.6vw,4.8rem)] text-musgo" />
        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <Mapa className="aspect-[4/3] lg:col-span-7 lg:aspect-auto lg:min-h-[520px]" />
          <Reveal className="space-y-8 lg:col-span-5">
            <div data-reveal className="flex gap-4">
              <MapPin size={22} strokeWidth={1.4} className="mt-1 shrink-0 text-argila" />
              <div>
                <p className="font-semibold text-musgo">{empresa.endereco.rua}</p>
                <p className="text-cinza">{empresa.endereco.bairro}, {empresa.endereco.cidade} - {empresa.endereco.uf}, {empresa.endereco.cep}</p>
              </div>
            </div>
            <div data-reveal className="flex gap-4">
              <Clock size={22} strokeWidth={1.4} className="mt-1 shrink-0 text-argila" />
              <div className="flex-1"><Horarios /></div>
            </div>
            <div data-reveal className="flex gap-4">
              <Navigation size={22} strokeWidth={1.4} className="mt-1 shrink-0 text-argila" />
              <ul className="space-y-1.5 text-cinza">
                <li><span className="font-medium text-tinta">Referência:</span> <Txt>{empresa.endereco.referencia}</Txt></li>
                <li><span className="font-medium text-tinta">Estacionamento:</span> <Txt>{empresa.endereco.estacionamento}</Txt></li>
                <li><span className="font-medium text-tinta">Ônibus:</span> <Txt>{empresa.endereco.onibus}</Txt></li>
              </ul>
            </div>
            <div data-reveal className="flex flex-wrap gap-3 pt-2">
              <ButtonPrimary href={mapsLink} icon={<Navigation size={17} strokeWidth={1.75} />}>Como chegar</ButtonPrimary>
              <ButtonSecondary href={empresa.telefoneLink}><Phone size={16} strokeWidth={1.75} className="mr-1 inline" />{empresa.telefone}</ButtonSecondary>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

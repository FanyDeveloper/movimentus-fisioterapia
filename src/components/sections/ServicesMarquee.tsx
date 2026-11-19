import LogoLoop from '../reactbits/LogoLoop'

const items = ['Fisioterapia ortopédica', 'Túnel do carpo', 'Massoterapia', 'LER/DORT', 'Atendimento pelo SUS', 'Centro de Joinville']

export default function ServicesMarquee() {
  return (
    <section aria-label="Serviços em destaque" className="border-y border-musgo/10 bg-musgo py-6 text-linho md:py-8">
      <LogoLoop
        items={items}
        speed={38}
        className="font-display text-[clamp(1.6rem,3.4vw,2.8rem)] italic"
        separator={
          <svg width="30" height="20" viewBox="0 0 64 44" fill="none" aria-hidden="true">
            <path d="M24 40a8 8 0 0 1 16 0z" fill="#E39A73" />
            <line x1="6" y1="32" x2="58" y2="32" stroke="#E39A73" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="15" cy="24" r="6" fill="#E39A73" />
          </svg>
        }
      />
    </section>
  )
}

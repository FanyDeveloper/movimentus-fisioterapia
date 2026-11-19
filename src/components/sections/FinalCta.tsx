import { waLink } from '../../lib/whatsapp'
import SplitText from '../reactbits/SplitText'
import Magnet from '../reactbits/Magnet'
import { Equilibrio } from '../common/Motivos'
import { WhatsAppIcon } from '../common/Icons'
import { ButtonPrimary } from '../ui/Buttons'

export default function FinalCta({
  title = 'Doeu de novo hoje? *Manda uma mensagem.*',
  text = 'A gente encontra um horário e explica o que trazer, seja particular ou pelo SUS.',
  mensagem = 'Olá! Vim pelo site da Movimentus e gostaria de agendar um horário.',
}: { title?: string; text?: string; mensagem?: string }) {
  return (
    <section className="relative overflow-hidden bg-musgo py-28 text-linho md:py-40" aria-labelledby="cta-titulo">
      <div className="pointer-events-none absolute -right-20 bottom-10 w-[560px] max-w-[90vw] opacity-25 md:right-10">
        <Equilibrio tone="linho" amplitude={8} />
      </div>
      <div className="container-site relative">
        <SplitText id="cta-titulo" text={title} className="max-w-[15ch] text-[clamp(2.6rem,7vw,6rem)] text-linho [&_.text-argila]:text-argila-clara" />
        <p className="mt-8 max-w-[44ch] text-[1.125rem] text-linho/75">{text}</p>
        <div className="mt-10">
          <Magnet padding={70} strength={4}>
            <ButtonPrimary tone="light" href={waLink(mensagem)} icon={<WhatsAppIcon size={18} />}>
              Agendar pelo WhatsApp
            </ButtonPrimary>
          </Magnet>
        </div>
      </div>
    </section>
  )
}

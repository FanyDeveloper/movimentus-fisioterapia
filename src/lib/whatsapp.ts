import { empresa, servicos } from '../data/empresa'

export const waLink = (mensagem: string) =>
  `https://wa.me/${empresa.whatsapp}?text=${encodeURIComponent(mensagem)}`

const PADRAO = 'Olá! Vim pelo site da Movimentus e gostaria de agendar um horário.'

/** Mensagem pré-preenchida de acordo com a página atual. */
export function mensagemPorPagina(pathname: string): string {
  const servico = servicos.find((s) => pathname === `/servicos/${s.slug}`)
  if (servico) return `Olá! Vi no site o serviço de ${servico.nome} e gostaria de mais informações.`
  if (pathname.startsWith('/servicos')) return 'Olá! Vi os serviços no site e gostaria de saber qual é o indicado para o meu caso.'
  if (pathname.startsWith('/agendamento')) return 'Olá! Gostaria de agendar uma avaliação. Meu atendimento seria: (particular / SUS)'
  if (pathname.startsWith('/equipe')) return 'Olá! Conheci a equipe pelo site e gostaria de agendar um horário.'
  if (pathname.startsWith('/perguntas')) return 'Olá! Li as perguntas frequentes no site e fiquei com uma dúvida:'
  return PADRAO
}

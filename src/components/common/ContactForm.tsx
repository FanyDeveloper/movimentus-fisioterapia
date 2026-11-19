import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { FloatingInput, FloatingSelect, FloatingTextarea, AnimatedCheckbox, Loader } from '../ui/Form'
import { ButtonPrimary } from '../ui/Buttons'
import { WhatsAppIcon } from './Icons'
import { servicos } from '../../data/empresa'
import { waLink } from '../../lib/whatsapp'

type Campos = { nome: string; telefone: string; servico: string; atendimento: string; mensagem: string }
type Erros = Partial<Record<keyof Campos | 'consent', string>>

const mascaraTelefone = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

/** Formulário com validação no cliente. O envio abre o WhatsApp com a mensagem já formatada. */
export default function ContactForm({ servicoInicial = '' }: { servicoInicial?: string }) {
  const [c, setC] = useState<Campos>({ nome: '', telefone: '', servico: servicoInicial, atendimento: '', mensagem: '' })
  const [consent, setConsent] = useState(false)
  const [erros, setErros] = useState<Erros>({})
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  const set = (k: keyof Campos) => (e: { target: { value: string } }) => {
    const value = k === 'telefone' ? mascaraTelefone(e.target.value) : e.target.value
    setC((s) => ({ ...s, [k]: value }))
    if (erros[k]) setErros((s) => ({ ...s, [k]: undefined }))
  }

  const validar = (): Erros => {
    const e: Erros = {}
    if (c.nome.trim().length < 2) e.nome = 'Conte como podemos te chamar.'
    if (c.telefone.replace(/\D/g, '').length < 10) e.telefone = 'Informe um telefone com DDD.'
    if (!c.servico) e.servico = 'Escolha uma opção (pode ser “Ainda não sei”).'
    if (!consent) e.consent = 'Precisamos da sua autorização para usar esses dados no atendimento.'
    return e
  }

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    const e = validar()
    setErros(e)
    if (Object.keys(e).length) {
      const first = document.querySelector<HTMLElement>('[aria-invalid="true"]')
      first?.focus()
      return
    }
    const linhas = ['Olá! Vim pelo formulário do site da Movimentus.', '', `*Nome:* ${c.nome.trim()}`, `*Telefone:* ${c.telefone}`, `*Interesse:* ${c.servico}`]
    if (c.atendimento) linhas.push(`*Atendimento:* ${c.atendimento}`)
    if (c.mensagem.trim()) linhas.push(`*Mensagem:* ${c.mensagem.trim()}`)
    const texto = linhas.join('\n')
    setEnviando(true)
    const url = waLink(texto)
    const win = window.open(url, '_blank', 'noopener')
    if (!win) window.location.href = url
    window.setTimeout(() => {
      setEnviando(false)
      setEnviado(true)
    }, 900)
  }

  if (enviado) {
    return (
      <div className="rounded-[var(--radius-card)] bg-papel p-8 md:p-10" role="status">
        <CheckCircle2 size={32} strokeWidth={1.25} className="text-musgo" />
        <h3 className="mt-5 text-3xl text-musgo">Mensagem pronta no WhatsApp.</h3>
        <p className="mt-3 max-w-[46ch] text-cinza">É só tocar em enviar na conversa que abriu. Se ela não abriu, o bloqueador de pop-up pode ter impedido; tente de novo abaixo.</p>
        <button type="button" onClick={() => setEnviado(false)} className="mt-6 font-semibold text-argila underline underline-offset-4">
          Voltar ao formulário
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 rounded-[var(--radius-card)] bg-papel p-6 md:grid-cols-2 md:p-10">
      <FloatingInput label="Seu nome" name="nome" autoComplete="name" value={c.nome} onChange={set('nome')} error={erros.nome} />
      <FloatingInput label="Telefone com DDD" name="telefone" type="tel" inputMode="tel" autoComplete="tel" value={c.telefone} onChange={set('telefone')} error={erros.telefone} />
      <FloatingSelect label="Serviço de interesse" name="servico" value={c.servico} onChange={set('servico')} error={erros.servico}>
        <option value="" disabled>Selecione</option>
        {servicos.map((s) => <option key={s.slug} value={s.nome}>{s.nome}</option>)}
        <option value="Ainda não sei">Ainda não sei</option>
      </FloatingSelect>
      <FloatingSelect label="Tipo de atendimento" name="atendimento" value={c.atendimento} onChange={set('atendimento')}>
        <option value="">Prefiro conversar antes</option>
        <option value="Particular">Particular</option>
        <option value="SUS (tenho encaminhamento)">SUS (tenho encaminhamento)</option>
      </FloatingSelect>
      <FloatingTextarea label="Onde dói, há quanto tempo… (opcional)" name="mensagem" value={c.mensagem} onChange={set('mensagem')} className="md:col-span-2" />
      <div className="md:col-span-2">
        <AnimatedCheckbox checked={consent} onChange={(v) => { setConsent(v); if (v) setErros((s) => ({ ...s, consent: undefined })) }} error={erros.consent}>
          Autorizo a Movimentus a usar meu nome e telefone para responder este contato, conforme a{' '}
          <Link to="/politica-de-privacidade" className="text-musgo underline underline-offset-4">Política de Privacidade</Link>.
        </AnimatedCheckbox>
      </div>
      <div className="flex flex-wrap items-center gap-4 pt-2 md:col-span-2">
        <ButtonPrimary type="submit" disabled={enviando} icon={enviando ? <Loader /> : <WhatsAppIcon size={18} />}>
          {enviando ? 'Abrindo o WhatsApp' : 'Enviar pelo WhatsApp'}
        </ButtonPrimary>
        <p className="text-sm text-cinza">Seus dados não ficam salvos no site.</p>
      </div>
    </form>
  )
}

import { useSeo } from '../lib/seo'
import { empresa } from '../data/empresa'
import Txt from '../components/common/Txt'

const atualizado = '18 de novembro de 2026'

export default function Privacidade() {
  useSeo({
    title: 'Política de Privacidade | Movimentus Fisioterapia Joinville',
    description: 'Como a Movimentus trata os dados enviados pelo formulário do site e o uso de cookies, conforme a LGPD (Lei 13.709/2018).',
    path: '/politica-de-privacidade',
  })
  const h2 = 'mt-14 text-[clamp(1.6rem,3vw,2.2rem)] text-musgo'
  return (
    <article className="pt-36 pb-24 md:pt-48 md:pb-36">
      <div className="container-site">
        <div className="mx-auto max-w-[72ch]">
          <h1 className="text-[clamp(2.4rem,6vw,4.6rem)] text-musgo">Política de Privacidade</h1>
          <p className="mt-4 text-sm text-cinza">Última atualização: {atualizado}</p>

          <div className="mt-10 space-y-5 text-[1.0625rem] text-tinta/85 [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-2">
            <p>
              Esta política explica como a {empresa.nomeCompleto} (“Movimentus”), com endereço na {empresa.endereco.rua}, {empresa.endereco.bairro}, {empresa.endereco.cidade} - {empresa.endereco.uf}, inscrita no CNPJ <Txt>[CONFIRMAR: CNPJ]</Txt>, trata dados pessoais coletados por este site, de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 – LGPD).
            </p>

            <h2 className={h2}>Quais dados coletamos</h2>
            <p>Pelo formulário de contato, você pode informar: nome, telefone, serviço de interesse, tipo de atendimento (particular ou SUS) e uma mensagem livre.</p>
            <p>
              <strong>Importante:</strong> o formulário não grava esses dados em servidor. Ao clicar em enviar, as informações são montadas em uma mensagem e abertas no WhatsApp, onde você decide se envia. A partir do envio, a conversa passa a seguir também os termos do WhatsApp (Meta).
            </p>
            <p>Pedimos que você não informe no formulário dados de saúde detalhados (diagnósticos, exames). Esses dados serão tratados no atendimento, com o sigilo próprio da fisioterapia.</p>

            <h2 className={h2}>Para que usamos</h2>
            <ul>
              <li>Responder ao seu contato e agendar avaliações e sessões;</li>
              <li>Enviar informações sobre o atendimento que você pediu.</li>
            </ul>
            <p>A base legal é o seu consentimento (art. 7º, I, da LGPD), dado na caixa de autorização do formulário, e a execução de procedimentos preliminares a pedido do titular (art. 7º, V).</p>

            <h2 className={h2}>Compartilhamento</h2>
            <p>Não vendemos nem compartilhamos seus dados com terceiros para fins comerciais. Os dados podem ser tratados por ferramentas necessárias ao atendimento (como o WhatsApp) e, quando o atendimento é pelo SUS, pelos sistemas públicos de saúde, conforme exigido por lei.</p>

            <h2 className={h2}>Cookies</h2>
            <p>Este site usa:</p>
            <ul>
              <li><strong>Armazenamento essencial:</strong> guarda no seu navegador a sua escolha sobre cookies, para o aviso não aparecer de novo.</li>
              <li><strong>Mapa do Google:</strong> o mapa incorporado nas páginas de Início e Contato é fornecido pelo Google e pode definir cookies próprios, conforme a política do Google.</li>
              <li><strong>Medição de visitas:</strong> só com o seu aceite. <Txt>[CONFIRMAR: ferramenta de análise utilizada, se houver — ex.: Google Analytics, Vercel Analytics]</Txt></li>
            </ul>
            <p>Você pode recusar no aviso de cookies ou apagar os dados de navegação a qualquer momento nas configurações do seu navegador.</p>

            <h2 className={h2}>Por quanto tempo guardamos</h2>
            <p>As conversas são mantidas enquanto forem necessárias para o atendimento ou pelo prazo exigido por lei para registros de saúde. <Txt>[CONFIRMAR: política interna de retenção das conversas]</Txt></p>

            <h2 className={h2}>Seus direitos</h2>
            <p>Você pode, a qualquer momento, pedir: confirmação de que tratamos seus dados, acesso, correção, anonimização, eliminação, portabilidade, informação sobre compartilhamento e revogação do consentimento (art. 18 da LGPD).</p>

            <h2 className={h2}>Contato do encarregado</h2>
            <p>
              Para exercer seus direitos ou tirar dúvidas, fale com <Txt>[CONFIRMAR: nome do encarregado de dados]</Txt> pelo WhatsApp/telefone {empresa.telefone} ou pelo e-mail <Txt>[CONFIRMAR: e-mail]</Txt>.
            </p>

            <h2 className={h2}>Alterações</h2>
            <p>Esta política pode ser atualizada. A data no topo indica a versão em vigor.</p>
          </div>
        </div>
      </div>
    </article>
  )
}

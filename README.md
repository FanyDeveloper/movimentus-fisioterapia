# Movimentus — Clínica de Fisioterapia e Massoterapia

Site institucional multipágina da Movimentus, que fica na Av. Juscelino Kubitscheck, 655, Centro, Joinville - SC.

Stack: React 19, Vite, TypeScript, Tailwind CSS v4, React Router, GSAP + ScrollTrigger (`@gsap/react`), Lenis e Lucide.

## Rodar

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # gera /dist
npm run preview   # testa o build
```

Deploy na Vercel: importe o repositório e use o preset Vite. O `vercel.json` já faz o rewrite de SPA, então as URLs `/servicos/...` funcionam quando a página é recarregada.

## Onde editar

- **`src/data/empresa.ts`**: concentra todos os dados (contato, horários, nota do Google, avaliações, equipe, serviços, FAQ e links do menu).
- **Imagens**: só o hero usa foto (`public/fotos/hero-fisioterapia-*.webp`, com `srcSet` para celular). O resto do site usa motivos animados de movimento e equilíbrio (`src/components/common/Motivos.tsx`): `Equilibrio` (motivo principal), `Articulacao`, `Coluna`, `Ondas`, `Caminhos` e `Pedras`, aplicados pelo componente `Cena`. Os loops só rodam enquanto estão visíveis e ficam parados com prefers-reduced-motion. Cada serviço define o seu motivo no campo `motivo` em `empresa.ts`.
- **Domínio**: está em `empresa.site`, no `index.html` (canonical, OG e JSON-LD), em `public/sitemap.xml` e em `public/robots.txt`.
- Qualquer texto `[CONFIRMAR: …]` aparece no site sublinhado em argila. Para achar todos: `grep -rn "CONFIRMAR" src index.html public`.

## Estrutura

```
src/
  data/empresa.ts            dados centralizados
  pages/                     Home, Sobre, Servicos, ServicoDetalhe, Equipe, Agendamento,
                             Perguntas, Contato, Privacidade, NotFound
  components/
    layout/                  Header (pílula flutuante), Footer, WhatsAppFloat, CookieBanner, PageTransition
    sections/                seções da Início
    common/                  Photo (hero), Motivos (animações), Faq, ContactForm, Reveal, PageHeader, Txt, Icons
    reactbits/               SplitText, RotatingText, ScrollReveal, CountUp, ShinyText, SpotlightCard,
                             MagicBento, LogoLoop, Magnet, ClickSpark, StaggeredMenu
    ui/                      Botões (Uiverse), inputs com label flutuante, checkbox animado, loader
  hooks/                     useLenis (Lenis + ScrollTrigger + ticker do GSAP), useScrollToTop, useMediaQuery
  lib/                       gsap.ts (registro único dos plugins), whatsapp.ts, seo.ts, cn.ts
```

Os componentes do React Bits foram recriados em React + GSAP, porque a CLI não teve acesso ao reactbits.dev no ambiente de geração. Se quiser trocar algum pela versão oficial, basta substituir o arquivo correspondente: as props são simples.

## Pendências [CONFIRMAR]

**Dados da empresa**
- Domínio definitivo (hoje está como `movimentusjoinville.com.br`)
- Logotipo oficial (hoje é uma assinatura provisória)
- Direito de uso da foto do hero (se veio de banco de imagens, conferir a licença) ou troca por foto real da clínica
- CNPJ e responsável técnico com CREFITO (rodapé e privacidade)
- Ano de abertura e história da clínica
- Instagram e Facebook
- Horários de sábado, domingo e feriados. Seg–sex 07:30–18:00 foi deduzido do Maps
- Coordenadas exatas da fachada (as atuais vêm do Plus Code M5V3+9Q)
- Ponto de referência, estacionamento e linhas de ônibus
- Estrutura: número de salas, equipamentos, acessibilidade

**Equipe** (Maria, Jessyka e Silvana)
- Sobrenome, função, CREFITO-10 e área de atuação de cada uma

**Atendimento e valores**
- Valor da avaliação e da sessão, pacotes, formas de pagamento e convênios/reembolso
- Duração e frequência das sessões, média de sessões por protocolo
- Se precisa de pedido médico no particular
- Recursos usados (eletroterapia, laser etc.) e se atende pós-operatório
- Técnicas de massoterapia, duração, valor e se é só particular
- SUS: como o paciente chega à clínica (regulação ou contato direto), sessões por encaminhamento, se exige comprovante de residência, Cartão SUS no particular, continuidade no particular

**Avaliações do Google**
- Nota individual de Norma e Romy (foi colocado 5 provisoriamente)
- Texto completo da avaliação da Norma (o texto colado estava cortado)

**LGPD**
- Nome e e-mail do encarregado de dados
- Ferramenta de análise de visitas, se houver
- Política de retenção das conversas

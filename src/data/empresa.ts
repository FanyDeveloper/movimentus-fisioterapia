/**
 * TODOS os dados da Movimentus ficam aqui.
 * Para editar textos, horários, equipe ou serviços, mexa só neste arquivo.
 * Qualquer trecho "[CONFIRMAR: ...]" aparece destacado no site até ser substituído.
 */

export const empresa = {
  nome: 'Movimentus',
  nomeCompleto: 'Movimentus Clínica de Fisioterapia e Massoterapia',
  categoria: 'Clínica de Fisioterapia e Massoterapia',
  site: 'https://www.movimentusjoinville.com.br', // [CONFIRMAR: domínio definitivo]

  endereco: {
    rua: 'Av. Juscelino Kubitscheck, 655',
    bairro: 'Centro',
    cidade: 'Joinville',
    uf: 'SC',
    cep: '89201-100',
    plusCode: 'M5V3+9Q Centro, Joinville - SC',
    // Coordenadas calculadas a partir do Plus Code. [CONFIRMAR: ponto exato da fachada]
    lat: -26.30656,
    lng: -48.84556,
    referencia: '[CONFIRMAR: ponto de referência próximo, ex.: em frente a…]',
    estacionamento: '[CONFIRMAR: há estacionamento próprio ou conveniado?]',
    onibus: '[CONFIRMAR: linhas de ônibus / terminal mais próximo]',
  },

  telefone: '(47) 99975-2422',
  telefoneLink: 'tel:+5547999752422',
  whatsapp: '5547999752422',

  // O Google Maps mostra: "Fecha 18:00 · Abre qui. às 07:30" (consultado numa quarta).
  horarios: [
    { dias: 'Segunda a sexta', horas: '07:30 às 18:00', confirmar: true },
    { dias: 'Sábado', horas: '[CONFIRMAR]', confirmar: true },
    { dias: 'Domingo e feriados', horas: '[CONFIRMAR]', confirmar: true },
  ],

  google: {
    nota: 4.3,
    totalAvaliacoes: 17,
    perfil: 'https://www.google.com/maps/search/?api=1&query=Movimentus+Cl%C3%ADnica+de+Fisioterapia+e+Massoterapia+Joinville',
  },

  atributos: {
    empreendedoras: true, // "Se identifica como uma empresa de empreendedoras"
    lgbtq: true, // "Empresa que acolhe a comunidade LGBTQ+"
    sus: true, // avaliações citam atendimento pelo SUS
  },

  redes: {
    instagram: '', // [CONFIRMAR: @ do Instagram]
    facebook: '', // [CONFIRMAR]
  },

  fundacao: '[CONFIRMAR: ano de abertura da clínica]',
  credito: { nome: 'Fany Etylen', url: 'https://github.com/FanyDeveloper' },
} as const

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${empresa.nomeCompleto}, ${empresa.endereco.rua}, ${empresa.endereco.cidade} - ${empresa.endereco.uf}`,
)}`
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  `${empresa.endereco.rua}, ${empresa.endereco.bairro}, ${empresa.endereco.cidade} - ${empresa.endereco.uf}, ${empresa.endereco.cep}`,
)}&z=17&output=embed`

/* ------------------------------------------------------------------ */
/* Avaliações reais do Google. Texto original; só espaçamento normalizado e emoji retirado. */
/* Foram selecionadas apenas as positivas.                             */
/* ------------------------------------------------------------------ */
export type Avaliacao = {
  nome: string
  nota: number
  quando: string
  texto: string
  truncada?: boolean
  notaConfirmar?: boolean
}

export const avaliacoes: Avaliacao[] = [
  {
    nome: 'Norma',
    nota: 5, // [CONFIRMAR: nota exata no Google]
    notaConfirmar: true,
    quando: 'novembro de 2026',
    texto:
      'A clínica é muito boa, as meninas, todas, Jessyka, Maria e Silvana, são profissionais muito capacitadas. Cheguei na clínica pra tratar síndrome do túnel de carpo, sentia muita dor, formigamento e gatilhos nos dedos, em uma semana com elas…',
    truncada: true, // [CONFIRMAR: texto completo da avaliação]
  },
  {
    nome: 'Romy',
    nota: 5, // [CONFIRMAR: nota exata no Google]
    notaConfirmar: true,
    quando: 'novembro de 2026',
    texto:
      'Fui muito bem atendida na clínica, meu tratamento foi pelo SUS. Profissionais capacitadas, dedicadas, espaço adequado. Recomendo com certeza. Excelente atendimento. Minha gratidão especial à fisioterapeuta Maria.',
  },
]

/* ------------------------------------------------------------------ */
/* Equipe — nomes citados nas avaliações do Google                      */
/* ------------------------------------------------------------------ */
export const equipe = [
  {
    nome: 'Maria',
    sobrenome: '[CONFIRMAR: sobrenome]',
    funcao: 'Fisioterapeuta',
    registro: '[CONFIRMAR: CREFITO-10]',
    foco: '[CONFIRMAR: área de atuação / formação]',
    citacao: 'Minha gratidão especial à fisioterapeuta Maria.',
    autorCitacao: 'Romy, avaliação no Google',
  },
  {
    nome: 'Jessyka',
    sobrenome: '[CONFIRMAR: sobrenome]',
    funcao: '[CONFIRMAR: função]',
    registro: '[CONFIRMAR: CREFITO-10]',
    foco: '[CONFIRMAR: área de atuação / formação]',
  },
  {
    nome: 'Silvana',
    sobrenome: '[CONFIRMAR: sobrenome]',
    funcao: '[CONFIRMAR: função]',
    registro: '[CONFIRMAR: CREFITO-10]',
    foco: '[CONFIRMAR: área de atuação / formação]',
  },
]

/* ------------------------------------------------------------------ */
/* Serviços                                                            */
/* ------------------------------------------------------------------ */
export type Servico = {
  slug: string
  nome: string
  curto: string
  beneficio: string
  seoTitulo: string
  seoDescricao: string
  motivo: 'articulacao' | 'coluna' | 'ondas' | 'caminhos'
  descricao: string[]
  paraQuem: string[]
  comoFunciona: { titulo: string; texto: string }[]
  faq: { p: string; r: string }[]
}

export const servicos: Servico[] = [
  {
    slug: 'ler-dort-tunel-do-carpo',
    nome: 'LER/DORT e túnel do carpo',
    curto: 'Punho, mão e dedos',
    beneficio:
      'Para quem sente formigamento, dor ou “gatilho” nos dedos e já não consegue trabalhar, digitar ou segurar objetos sem incômodo.',
    seoTitulo: 'Tratamento de Túnel do Carpo e LER/DORT em Joinville | Movimentus',
    seoDescricao:
      'Fisioterapia para síndrome do túnel do carpo, dedo em gatilho e LER/DORT no Centro de Joinville. Particular e pelo SUS. Agende pelo WhatsApp.',
    motivo: 'articulacao',
    descricao: [
      'A síndrome do túnel do carpo e as lesões por esforço repetitivo começam devagar: um formigamento à noite, a mão que “adormece” no celular, o dedo que trava ao fechar. Quando chegam na clínica, muita gente já convive com isso há meses.',
      'Aqui no Centro de Joinville, o tratamento começa por entender a sua rotina, o seu trabalho e os movimentos que pioram a dor. A partir disso, montamos sessões com técnicas manuais, exercícios e orientações para o dia a dia.',
    ],
    paraQuem: [
      'Quem sente formigamento ou dormência na mão, principalmente à noite',
      'Quem tem dedo em gatilho ou sente a mão perder força',
      'Quem trabalha muitas horas no computador, na produção ou com movimentos repetidos',
      'Quem recebeu diagnóstico de túnel do carpo, tendinite ou LER/DORT',
    ],
    comoFunciona: [
      { titulo: 'Avaliação', texto: 'Conversa sobre a sua rotina e testes de força, sensibilidade e movimento do punho e da mão.' },
      { titulo: 'Sessões', texto: 'Técnicas manuais, mobilização e exercícios conforme a avaliação. [CONFIRMAR: recursos usados, ex.: eletroterapia, laser]' },
      { titulo: 'Orientação', texto: 'Ajustes simples no trabalho e em casa para a dor não voltar assim que o tratamento termina.' },
    ],
    faq: [
      { p: 'Preciso de encaminhamento médico?', r: 'Para atendimento pelo SUS, sim. No particular, [CONFIRMAR: se é necessário pedido médico].' },
      { p: 'Em quanto tempo vou sentir melhora?', r: 'Depende de cada caso e de há quanto tempo a dor existe. Na avaliação, a fisioterapeuta explica o que esperar no seu caso.' },
      { p: 'Fisioterapia evita a cirurgia?', r: 'Em muitos casos leves e moderados, o tratamento conservador é a primeira indicação. Quem decide sobre cirurgia é o seu médico; nós trabalhamos junto com ele.' },
      { p: 'Quantas sessões são necessárias?', r: '[CONFIRMAR: média de sessões por protocolo]. O número exato é definido depois da avaliação.' },
    ],
  },
  {
    slug: 'fisioterapia-ortopedica',
    nome: 'Fisioterapia ortopédica',
    curto: 'Coluna, ombro, joelho',
    beneficio:
      'Para dores na coluna, ombro, joelho e tornozelo, entorses e recuperação depois de lesões, com o objetivo de você voltar a se mexer com segurança.',
    seoTitulo: 'Fisioterapia Ortopédica no Centro de Joinville | Movimentus',
    seoDescricao:
      'Fisioterapia ortopédica e traumatológica no Centro de Joinville: dor na coluna, ombro, joelho, entorses e reabilitação. Agende sua avaliação pelo WhatsApp.',
    motivo: 'coluna',
    descricao: [
      'Dor nas costas que piora no fim do dia, ombro que não deixa levantar o braço, joelho que reclama na escada. A fisioterapia ortopédica trata a causa do problema, não só o sintoma do momento.',
      'Cada atendimento parte de uma avaliação do movimento: onde dói, o que limita e o que você quer voltar a fazer. O plano é ajustado sessão a sessão.',
    ],
    paraQuem: [
      'Dor lombar, cervical ou “torcicolo” que vai e volta',
      'Dores no ombro, joelho, quadril ou tornozelo',
      'Entorses, distensões e lesões musculares',
      'Recuperação após fraturas ou cirurgias ortopédicas [CONFIRMAR: atende pós-operatório?]',
    ],
    comoFunciona: [
      { titulo: 'Avaliação', texto: 'Histórico, exames que você já tem e testes de movimento e força.' },
      { titulo: 'Plano de tratamento', texto: 'Terapia manual, exercícios terapêuticos e recursos conforme a necessidade. [CONFIRMAR: recursos disponíveis]' },
      { titulo: 'Alta com autonomia', texto: 'Você sai com exercícios e orientações para manter o resultado em casa.' },
    ],
    faq: [
      { p: 'Preciso levar exames?', r: 'Se tiver raio-X, ressonância ou laudo, traga. Ajuda bastante na avaliação, mas não é obrigatório para começar no particular.' },
      { p: 'Quanto tempo dura cada sessão?', r: '[CONFIRMAR: duração média da sessão].' },
      { p: 'Atende pelo SUS?', r: 'Sim, com encaminhamento. Veja como funciona na página de Agendamento.' },
      { p: 'Qual o valor da sessão particular?', r: '[CONFIRMAR: valor ou faixa de preço / pacotes].' },
    ],
  },
  {
    slug: 'massoterapia',
    nome: 'Massoterapia',
    curto: 'Tensão e relaxamento',
    beneficio:
      'Para soltar a musculatura carregada pelo trabalho e pelo estresse, aliviar dores de tensão e sair da sessão com o corpo mais leve.',
    seoTitulo: 'Massoterapia no Centro de Joinville | Movimentus',
    seoDescricao:
      'Massoterapia no Centro de Joinville para aliviar tensão muscular, dores nas costas e estresse. Agende seu horário pelo WhatsApp.',
    motivo: 'ondas',
    descricao: [
      'Ombro duro, pescoço travado, aquela dor de cabeça que começa na nuca. A massoterapia trabalha a musculatura com as mãos para aliviar a tensão acumulada no dia a dia.',
      'Pode ser feita sozinha, para relaxar, ou como complemento da fisioterapia, quando a musculatura contraída atrapalha a recuperação.',
    ],
    paraQuem: [
      'Quem passa o dia sentado ou em pé e sente as costas carregadas',
      'Quem tem dor de cabeça tensional ou pescoço travado',
      'Quem está em tratamento de fisioterapia e precisa liberar a musculatura',
      'Quem quer um momento de pausa e relaxamento no meio da semana',
    ],
    comoFunciona: [
      { titulo: 'Conversa rápida', texto: 'Você conta onde sente mais tensão e se tem alguma dor ou restrição.' },
      { titulo: 'Sessão', texto: '[CONFIRMAR: técnicas oferecidas, ex.: relaxante, terapêutica, liberação miofascial, drenagem linfática].' },
      { titulo: 'Depois', texto: 'Orientações simples de alongamento e postura para o alívio durar mais.' },
    ],
    faq: [
      { p: 'Quanto tempo dura a sessão?', r: '[CONFIRMAR: duração, ex.: 30 ou 60 minutos].' },
      { p: 'Qual o valor?', r: '[CONFIRMAR: valor da sessão e pacotes].' },
      { p: 'Massoterapia é atendida pelo SUS?', r: '[CONFIRMAR: massoterapia é apenas particular?]' },
      { p: 'Preciso levar alguma coisa?', r: 'Não. Venha com roupa confortável; a clínica fornece o necessário para a sessão.' },
    ],
  },
  {
    slug: 'fisioterapia-pelo-sus',
    nome: 'Fisioterapia pelo SUS',
    curto: 'Com encaminhamento',
    beneficio:
      'A mesma equipe e o mesmo cuidado para quem chega encaminhado pelo SUS. Explicamos o que trazer e como funciona para você não perder viagem.',
    seoTitulo: 'Fisioterapia pelo SUS no Centro de Joinville | Movimentus',
    seoDescricao:
      'A Movimentus atende fisioterapia pelo SUS no Centro de Joinville. Saiba o que levar, como funciona o encaminhamento e tire dúvidas pelo WhatsApp.',
    motivo: 'caminhos',
    descricao: [
      'Quem faz fisioterapia pelo SUS na Movimentus é atendido pelas mesmas profissionais que atendem no particular. Nas avaliações do Google, pacientes do SUS citam a dedicação da equipe e o espaço adequado.',
      'Como o caminho do SUS tem algumas etapas, reunimos aqui o que você precisa saber antes da primeira sessão.',
    ],
    paraQuem: [
      'Quem recebeu encaminhamento para fisioterapia na Unidade Básica de Saúde',
      'Quem foi direcionado para a Movimentus pela regulação do município [CONFIRMAR: fluxo exato em Joinville]',
      'Quem quer saber se o seu caso pode ser atendido pelo SUS na clínica',
    ],
    comoFunciona: [
      { titulo: 'Encaminhamento', texto: 'O médico da UBS faz o pedido de fisioterapia. [CONFIRMAR: como o paciente é direcionado para a Movimentus]' },
      { titulo: 'Agendamento', texto: 'Entre em contato pelo WhatsApp com o encaminhamento em mãos para combinar o primeiro horário.' },
      { titulo: 'Primeira sessão', texto: 'Traga documento com foto, Cartão SUS, o encaminhamento e exames, se tiver.' },
    ],
    faq: [
      { p: 'O atendimento pelo SUS tem custo?', r: 'Não. O atendimento pelo SUS é gratuito para o paciente.' },
      { p: 'Quais documentos preciso levar?', r: 'Documento com foto, Cartão SUS, encaminhamento médico e exames, se tiver. [CONFIRMAR: comprovante de residência é exigido?]' },
      { p: 'Quantas sessões o SUS cobre?', r: '[CONFIRMAR: número de sessões por encaminhamento].' },
      { p: 'Posso continuar no particular depois?', r: '[CONFIRMAR: se a clínica oferece essa continuidade].' },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Perguntas frequentes gerais                                         */
/* ------------------------------------------------------------------ */
export const faqGeral = [
  { p: 'A Movimentus atende pelo SUS?', r: 'Sim. Atendemos pacientes encaminhados pelo SUS e também no particular. Na página de Agendamento explicamos o que trazer em cada caso.' },
  { p: 'Como faço para agendar?', r: 'Pelo WhatsApp (47) 99975-2422. Conte rapidamente o que está sentindo e se é particular ou SUS, e a equipe responde com os horários disponíveis.' },
  { p: 'Onde fica a clínica?', r: 'Na Av. Juscelino Kubitscheck, 655, no Centro de Joinville, CEP 89201-100.' },
  { p: 'Tem estacionamento?', r: '[CONFIRMAR: há estacionamento próprio ou conveniado?]' },
  { p: 'Quanto custa uma sessão particular?', r: '[CONFIRMAR: valor da avaliação e da sessão / pacotes].' },
  { p: 'Quais formas de pagamento vocês aceitam?', r: '[CONFIRMAR: Pix, dinheiro, cartão de débito/crédito, parcelamento].' },
  { p: 'Atendem convênio?', r: '[CONFIRMAR: convênios aceitos ou se emitem recibo para reembolso].' },
  { p: 'Qual o horário de atendimento?', r: 'De segunda a sexta, das 07:30 às 18:00. [CONFIRMAR: sábado]' },
]

export const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/equipe', label: 'Equipe' },
  { to: '/perguntas-frequentes', label: 'Dúvidas' },
  { to: '/contato', label: 'Contato' },
]

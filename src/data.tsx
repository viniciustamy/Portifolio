import React from 'react';

import thumbDashboard from './assets/images/Thumbs/Thumb Dashboard.png';
import thumbDevolutiva from './assets/images/Thumbs/Thumb Devolutiva.png';
import thumbKba from './assets/images/Thumbs/Thumb KBA.png';
import thumbAdmin from './assets/images/Thumbs/Thumb Admin.png';
import capaDashboard from './assets/images/Capas/Capa Dashboard.png';
import capaDevolutiva from './assets/images/Capas/Capa Devolutiva.png';
import capaKba from './assets/images/Capas/Capa KBA.png';
import capaAdmin from './assets/images/Capas/Capa Admin.png';
// Conteúdo dos cases carregado sob demanda: a Home não baixa o texto e as imagens de todos os cases
const lazyContent = (load: () => Promise<any>, name: string) => React.lazy(() => load().then(m => ({ default: m[name] })));
const DashboardAdmissaoContent = lazyContent(() => import("./content/dashboard-admissao"), "DashboardAdmissaoContent");
const DevolutivaContent = lazyContent(() => import("./content/devolutiva"), "DevolutivaContent");
const KbaSenhaContent = lazyContent(() => import("./content/kba-senha"), "KbaSenhaContent");
const AdminGlobalDocsContent = lazyContent(() => import("./content/admin-global-docs"), "AdminGlobalDocsContent");
const IaDiaDiaContent = lazyContent(() => import("./content/ia-dia-dia"), "IaDiaDiaContent");
const OrquestracaoAgentesContent = lazyContent(() => import("./content/orquestracao-agentes"), "OrquestracaoAgentesContent");
const FrameworkDynamicsContent = lazyContent(() => import("./content/framework-dynamics"), "FrameworkDynamicsContent");
const AprendizadosRhContent = lazyContent(() => import("./content/aprendizados-rh"), "AprendizadosRhContent");
const MetricasExperienciaContent = lazyContent(() => import("./content/metricas-experiencia"), "MetricasExperienciaContent");








export const skills = [
  {
    id: 'pesquisa-discovery',
    name: 'Pesquisa & Discovery',
    description: 'Atuo na etapa de descoberta com profundidade, utilizando métodos qualitativos e quantitativos. Aplico diversos frameworks para organizar insights e transformá-los em direcionadores claros de produto.',
    links: [
      { url: '/project/dashboard-admissao#discovery', label: 'Pesquisa e Imersão (Dashboard de Admissão)' },
      { url: '/project/admin-global-docs#discovery', label: 'Consolidação e Síntese de Pesquisas (Admin Global)' },
      { url: '/project/devolutiva#discovery', label: 'Auditoria e Jornada (Avaliação de Desempenho)' },
      { url: '/project/framework-dynamics#atomic-research', label: 'Atomic Research (Frameworks)' },
      { url: '/project/kba-senha#discovery', label: 'Identificação de Dores (Recuperação de Conta)' }
    ]
  },
  {
    id: 'sistemas-complexos',
    name: 'Arquitetura de Informação & Sistemas',
    description: 'Estruturo modelos mentais, taxonomias e arquiteturas para produtos de alta complexidade. Foco em reduzir atritos cognitivos e garantir a escalabilidade da plataforma, alinhando visão técnica e necessidades do usuário.',
    links: [
      { url: '/project/admin-global-docs#job-vs-position', label: 'Job vs Position Manager (Admin Global)' },
      { url: '/project/orquestracao-agentes#arquitetura-proposta', label: 'Taxonomia e Sistema (Orquestração de Agentes)' },
      { url: '/project/devolutiva#arquitetando-a-solucao', label: 'Arquitetura da Solução (Avaliação de Desempenho)' }
    ]
  },
  {
    id: 'ia-design-process',
    name: 'IA no Processo de Design',
    description: 'Integro inteligência artificial ativamente no fluxo de trabalho de design de produto. Utilizo o NotebookLM como ferramenta de síntese e análise de pesquisas qualitativas no Discovery, o Google AI Studio para criação rápida de wireframes e validação de hipóteses, além do Cursor para codar interfaces e simular cenários complexos.',
    links: [
      { url: '/project/ia-dia-dia#ia-acelerando', label: 'Processos e Protótipos com IA (IA como extensão)' },
      { url: '/project/ia-dia-dia#pesquisa-sintese', label: 'Síntese e Análise de Pesquisa no NotebookLM (IA como extensão)' },
      { url: '/project/dashboard-admissao#discovery', label: 'NotebookLM e Análise Semântica no Discovery (Dashboard de Admissão)' },
      { url: '/project/admin-global-docs#discovery', label: 'Consolidação e Síntese de Pesquisas com IA (Admin Global)' },
      { url: '/project/dashboard-admissao#prototipacao', label: 'Média Fidelidade no AI Studio (Dashboard de Admissão)' },
      { url: '/project/admin-global-docs#ia-aceleradora', label: 'IA como Aceleradora do Processo (Admin Global)' },
      { url: '/project/kba-senha#prototipacao', label: 'Validação e Prototipação em IA (Recuperação de Conta)' }
    ]
  },
  {
    id: 'facilitacao-estrategia',
    name: 'Facilitação & Visão de Produto',
    description: 'Experiência na facilitação de dinâmicas colaborativas e alinhamento estratégico com stakeholders. Utilizo workshops e frameworks estruturados para definir visões de produto de ponta a ponta e resolver problemas de arquitetura complexa.',
    links: [
      { url: '/project/framework-dynamics#light-decision-jam', label: 'Light Decision Jam (Frameworks)' },
      { url: '/project/admin-global-docs#estrategia-visivel', label: 'Estratégia Visível no Figma Make (Admin Global)' },
      { url: '/project/orquestracao-agentes#arquitetura-proposta', label: 'Visão Unificada de Agentes (Orquestração de Agentes)' },
      { url: '/project/ia-dia-dia#evolucao-incremental', label: 'Evolução incremental de funcionalidades (IA como extensão)' }
    ]
  },
  {
    id: 'prototipacao-handoff',
    name: 'Prototipação Funcional & Handoff',
    description: 'Criação de protótipos navegáveis, desde baixa fidelidade até funcionais em código. Foco em validar interações complexas rapidamente e entregar um handoff técnico refinado (utilizando ferramentas como Cursor) para reduzir atritos com a engenharia.',
    links: [
      { url: '/project/ia-dia-dia#handoff-completo', label: 'Handoff no Cursor (IA como extensão)' },
      { url: '/project/dashboard-admissao#handoff', label: 'Cursor & Handoff Técnico (Dashboard de Admissão)' },
      { url: '/project/admin-global-docs#handoff', label: 'Handoff de Ecossistema Unificado (Admin Global)' },
      { url: '/project/kba-senha#handoff', label: 'Especificação & Handoff (Recuperação de Conta)' }
    ]
  },
  {
    id: 'pesquisa-usabilidade',
    name: 'Testes de Usabilidade & Validação',
    description: 'Desenho e conduzo testes qualitativos de usabilidade com usuários e stakeholders para validar hipóteses de interface diretamente na prática, reduzindo fricções de uso e otimizando resultados de produto.',
    links: [
      { url: '/project/devolutiva#validacao', label: 'Testes de Usabilidade (Avaliação de Desempenho)' },
      { url: '/project/dashboard-admissao#validacao', label: 'Testes com Clientes Reais (Dashboard de Admissão)' },
      { url: '/project/kba-senha#impacto', label: 'Resultados e Impacto no Suporte (Recuperação de Conta)' }
    ]
  }
];






export const projects = [
  {
    id: 'devolutiva',
    title: 'Fechando o ciclo da Avaliação de Desempenho',
    tag: 'Implementando um agente de IA no produto',
    description: 'Como transformamos um processo descentralizado em uma experiência integrada, criando a funcionalidade de devolutivas dentro do produto de Performance.',
    role: 'Senior Product Designer',
    roles: ['Product Design'],
    tools: ['Figma', 'Claude', 'Cursor', 'AI Studio'],
    team: ['Performance e Desenvolvimento'],
    year: '2024',
    platform: 'Gupy Performance',
    readingTime: '4 min de leitura',
    thumbnail: thumbDevolutiva,
    thumbBg: '#21858A',
    coverImage: capaDevolutiva,
    tldr: {
      problem: 'Devolutiva acontecia toda fora da plataforma, sem histórico nem padrão.',
      action: 'Mapeou a jornada completa e desenhou uma experiência nativa, com apoio de IA.',
      result: 'Em um ano, ~50% da base usando, ~200 mil devolutivas entregues pela plataforma (estimado) e cerca de 2/3 dos gestores usando a conclusão da Gupy IA.'
    },
    bg: 'bg-[#D2CBB6]',
    heroBg: 'bg-[#D2CBB6]',
    textColor: 'text-[#241510]',
    tagColor: 'text-[#9E4322]',
    content: <DevolutivaContent />
  },
  {
    id: 'dashboard-admissao',
    title: 'Redesenhando o Dashboard de Admissão',
    tag: 'Personalizando visão estratégica e handoff com IA',
    description: 'Transformando um dashboard de análise histórica em uma ferramenta operacional orientada à tomada de decisão.',
    role: 'Staff Product Designer',
    roles: ['Product Design'],
    tools: ['Google IA Studio', 'Claude', 'Cursor', 'Figma'],
    team: ['Analytics'],
    year: '2025',
    platform: 'Gupy Admissão',
    readingTime: '5 min de leitura',
    thumbnail: thumbDashboard,
    thumbBg: '#F1F2F6',
    coverImage: capaDashboard,
    tldr: {
      problem: 'O dashboard mostrava o passado, mas o RH precisava agir sobre admissões em risco, agora.',
      action: 'Liderei o Discovery, prototipei com IA, testei com clientes e apoiei o handoff técnico.',
      result: 'Redefinimos a direção do produto: de indicadores históricos para uma visão de risco e previsibilidade.'
    },
    bg: 'bg-[#E1DCD3]',
    heroBg: 'bg-[#E1DCD3]',
    textColor: 'text-[#241510]',
    tagColor: 'text-[#9E4322]',
    content: <DashboardAdmissaoContent />
  },
  {
    id: 'admin-global-docs',
    title: 'Unificando três produtos em um admin global',
    tag: 'Dando vida a um ecossistema',
    description: 'Unificando a administração entre produtos para reduzir esforço de implantação e criar uma base escalável para crescimento',
    role: 'Staff Product Designer',
    roles: ['Liderança de UX', 'Product Design'],
    tools: ['Figma', 'Claude', 'Cursor', 'AI Studio'],
    team: ['Cross - Admin'],
    year: '2025',
    platform: 'Plataforma Gupy',
    readingTime: '5 min de leitura',
    thumbnail: thumbAdmin,
    thumbBg: '#061329',
    coverImage: capaAdmin,
    tldr: {
      problem: 'Cada produto tinha sua própria camada administrativa. O cliente reconfigurava tudo a cada novo produto contratado.',
      action: 'Liderei o Design da iniciativa: síntese com IA, a decisão Job vs Position e o roadmap materializado visualmente.',
      result: 'Alinhamento imediato entre dezenas de times, discussões de arquitetura aceleradas e estratégia validada com stakeholders'
    },
    bg: 'bg-[#96A0A6]',
    heroBg: 'bg-[#96A0A6]',
    textColor: 'text-white',
    tagColor: 'text-[#C5D2D6]',
    content: <AdminGlobalDocsContent />
  },
  {
    id: 'kba-senha',
    title: 'Recuperação de senha self-service (KBA)',
    tag: 'Implementação em fluxo de alta demanda com handoff via Cursor',
    description: 'Transformação de um processo manual em self-service através do fluxo de recuperação via Knowledge-Based Authentication.',
    role: 'Staff Product Designer',
    roles: ['Product Design'],
    tools: ['Figma', 'Figma Make', 'Claude', 'Cursor'],
    team: ['Cross - Gestão de Contas'],
    year: '2025',
    platform: 'Web',
    readingTime: '4 min de leitura',
    thumbnail: thumbKba,
    thumbBg: '#1671FE',
    coverImage: capaKba,
    tldr: {
      problem: 'Recuperação de acesso era um dos principais motivos de contato com o suporte.',
      action: 'Conduzi a descoberta, desenhei o fluxo self-service via KBA e validei cenários com prototipação em IA.',
      result: 'Potencial de redução relevante no volume de tickets, com mais autonomia e menos tempo de espera para o candidato.'
    },
    bg: 'bg-[#B1BDC4]',
    heroBg: 'bg-[#B1BDC4]',
    textColor: 'text-[#241510]',
    tagColor: 'text-[#9E4322]',
    content: <KbaSenhaContent />
  },
  {
    // Case em produção: aparece na Home com "Em breve" e ainda não tem página
    id: 'mindi',
    title: 'Lançando um app do zero na App Store',
    tag: 'Criando um app de filmes e séries para mim e meus amigos, totalmente com IA',
    description: 'Como criei o Mindi, um app para gerenciar e descobrir filmes e séries, do zero à App Store, com IA em todas as etapas.',
    role: 'Product Designer',
    roles: ['Product Design', 'Desenvolvimento com IA'],
    tools: ['Claude Code', 'Cursor', 'Figma'],
    team: ['Projeto pessoal'],
    year: '2026',
    platform: 'iOS',
    readingTime: 'Em breve',
    comingSoon: true,
    thumbBg: '#484AAC',
    bg: 'bg-[#09090B]',
    heroBg: 'bg-[#09090B]',
    textColor: 'text-white',
    tagColor: 'text-white/75',
    content: null
  },
  {
    id: 'analise-metricas',
    title: 'Métricas de Experiência',
    tag: 'UX Research',
    status: { progress: 100, label: 'Publicado' },
    description: 'Como transformamos feedback contínuo em insumos para decisões de produto, implementando o acompanhamento de CES em 11 fluxos diferentes.',
    role: 'Design Lead',
    roles: ['UX Research', 'Design Lead'],
    tools: ['CES', 'Hotjar', 'Google Analytics'],
    team: ['Design'],
    year: '2025',
    platform: 'Métricas e Processos',
    readingTime: '4 min de leitura',
    tldr: {
      problem: 'Falta de mensuração de impacto a longo prazo e ausência de acompanhamento contínuo dos principais fluxos obrigatórios do produto.',
      action: 'Estruturei a primeira rotina de métricas de experiência focada no CES, mapeando 11 jornadas chave para 3 personas principais (RH, Líder e Colaborador).',
      result: 'Em 6 meses, coletamos mais de 3.700 respostas e analisamos centenas de comentários, transformando feedback em direcionamentos reais para o time de Design.'
    },
    bg: 'bg-[#FAF9F7]',
    heroBg: 'bg-[#7D888B]',
    textColor: 'text-[#241510]',
    tagColor: 'text-[#9E4322]',
    content: <MetricasExperienciaContent />
  },
  {
    id: 'ia-dia-dia',
    title: 'IA como extensão da minha prática de Design',
    tag: 'Processos & IA',
    description: 'Como integro inteligência artificial de ponta a ponta para descobrir problemas, validar hipóteses, criar protótipos em código e desenvolver ferramentas personalizadas.',
    role: 'Product Designer',
    roles: ['Product Design'],
    tools: ['Google IA Studio', 'Claude', 'Cursor', 'NotebookLM', 'Figma Make'],
    team: ['Design & IA'],
    year: '2024',
    platform: 'AI Studio · Cursor · Claude',
    readingTime: '4 min de leitura',
    tldr: {
      problem: 'Grande parte das atividades de Design ainda depende de processos manuais, documentação extensa e protótipos limitados, o que aumenta o tempo entre uma ideia e sua validação.',
      action: 'Incorporei ferramentas de IA, como Google AI Studio, Claude, NotebookLM, Cursor e Figma Make, ao meu processo de trabalho, utilizando cada uma delas conforme a etapa do projeto.',
      result: 'Reduzi significativamente o tempo de descoberta, exploração e validação de soluções, produzi protótipos mais próximos do produto final e desenvolvi ferramentas internas para resolver necessidades específicas do time.'
    },
    bg: 'bg-[#FAF9F7]',
    heroBg: 'bg-[#E5E0D5]',
    textColor: 'text-[#241510]',
    tagColor: 'text-[#9E4322]',
    content: <IaDiaDiaContent />
  },
  {
    id: 'framework-dynamics',
    title: 'Dinâmicas e frameworks de Design',
    tag: 'Design Ops · Facilitação',
    description: 'Ao longo da minha trajetória na Gupy, sempre enxerguei processos de Design como ferramentas para acelerar alinhamentos, gerar aprendizado coletivo e transformar percepções em decisões.',
    role: 'Product Designer',
    roles: ['Product Design', 'Design Ops'],
    tools: ['Miro', 'FigJam', 'Hotjar', 'NotebookLM'],
    team: ['Time de Produto & RH'],
    year: '2024',
    platform: 'Miro · FigJam · Workshops',
    readingTime: '3 min de leitura',
    tldr: {
      problem: 'Gargalos no alinhamento conceitual inicial e consolidação de múltiplas fontes de pesquisa de experiência de usuário de forma visual e colaborativa.',
      action: 'Condução de workshops presenciais estruturados utilizando Light Decision Jam (LDJ), aplicação sistemática de Atomic Research e análises dinâmicas através do Cine Hotjar.',
      result: 'Priorização de oportunidades estruturantes com dezenas de clientes estratégicos de RH, aceleração no ciclo de Discovery e engajamento genuíno de times multidisciplinares.'
    },
    bg: 'bg-[#FAF9F7]',
    heroBg: 'bg-[#C1C9C8]',
    textColor: 'text-[#241510]',
    tagColor: 'text-[#9E4322]',
    content: <FrameworkDynamicsContent />
  },
  {
    id: 'orquestracao-agentes',
    title: 'Orquestração de agentes de IA',
    tag: 'Agentes Autônomos',
    description: 'Como desenhamos uma arquitetura de experiência para escalar agentes de IA em múltiplos produtos.',
    role: 'Product Designer',
    roles: ['Product Design'],
    tools: ['Figma', 'Claude', 'Cursor'],
    team: ['IA & Ecossistema'],
    year: '2025',
    platform: 'Web App',
    readingTime: '5 min de leitura',
    tldr: {
      problem: 'Diferentes times desenvolviam agentes de IA isolados, gerando fragmentação de experiência e dificuldade de escala.',
      action: 'Mapeamento das iniciativas, criação de uma taxonomia de comportamentos de agentes (proativos, reativos, etc.) e definição de uma arquitetura única de design system conversacional.',
      result: 'Apesar de despriorizada antes de codar, serviu como base estratégica e framework de design para a evolução unificada de IA na empresa.'
    },
    bg: 'bg-[#FAF9F7]',
    heroBg: 'bg-gradient-to-br from-[#8C9A9E] to-[#4A5559]',
    textColor: 'text-[#241510]',
    tagColor: 'text-[#9E4322]',
    content: <OrquestracaoAgentesContent />
  },
  {
    id: 'aprendizados-rh',
    title: 'O que eu aprendi no mundo do RH',
    tag: 'Artigo · Aprendizados',
    description: 'Reflexões sobre a complexidade dos processos de RH depois de passar tanto tempo projetando ferramentas que impactam diretamente a vida e a carreira de milhões de pessoas.',
    role: 'Liderança de UX',
    roles: ['Liderança de UX'],
    tools: ['Pesquisa Qualitativa', 'Análise de Processos'],
    team: ['Design & Produto'],
    year: '2026',
    platform: 'Reflexões de Carreira',
    readingTime: '4 min de leitura',
    tldr: {
      problem: 'A percepção inicial de que o trabalho com RH se limitava a fluxos de recrutamento e avaliação, subestimando a complexidade e variação dos contextos organizacionais.',
      action: 'Atuação por 5 anos projetando produtos para diferentes cenários de RH, aprendendo a equilibrar flexibilidade e orientação a boas práticas.',
      result: 'A compreensão de que desenhar para RH exige entender o contexto específico de cada empresa e saber impor limites para evitar configurações impossíveis de usar.'
    },
    bg: 'bg-[#D1C7BD]',
    heroBg: 'bg-[#D1C7BD]',
    textColor: 'text-[#241510]',
    tagColor: 'text-[#9E4322]',
    content: <AprendizadosRhContent />
  },
];

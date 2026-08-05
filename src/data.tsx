import React from 'react';
import { Building, UserCog, User } from 'lucide-react';
import performanceCycleLabeled from './assets/images/Devolutiva/performance_cycle_labeled_1783032402492.jpg';
import contexto1 from './assets/images/Devolutiva/Contexto-1.jpg';
import contexto2 from './assets/images/Devolutiva/Contexto-2.jpg';
import contexto3 from './assets/images/Devolutiva/Contexto-3.jpg';
import csdImg from './assets/images/Devolutiva/CSD.png';
import benchImg from './assets/images/Devolutiva/bench.png';
import fazNaoFazImg from './assets/images/Devolutiva/faz nao faz.png';
import pesquisasImg from './assets/images/Devolutiva/Pesquisas.png';
import mapaImg from './assets/images/Devolutiva/Mapa.jpg';
import fluxoGestorImg from './assets/images/Devolutiva/fluxo-gestor.png';
import fluxoColabImg from './assets/images/Devolutiva/Fluxo-colab.png';
import fluxoRhImg from './assets/images/Devolutiva/Fluxo-rh.png';
import wire1Img from './assets/images/Devolutiva/wire-1.png';
import wire2Img from './assets/images/Devolutiva/wire-2.png';
import planilhaErrosImg from './assets/images/Devolutiva/planilha de erros.png';
import ia1Img from './assets/images/Devolutiva/IA 1.png';
import ia2Img from './assets/images/Devolutiva/IA 2.png';
import rh1Img from './assets/images/Devolutiva/RH-1.png';
import gestor1Img from './assets/images/Devolutiva/Gestor-1.png';
import colab1Img from './assets/images/Devolutiva/Colab-1.png';
import { Carousel } from './components/Carousel';
import { Gallery } from './components/Gallery';
import { PlatformToday } from './components/PlatformToday';

import dash01 from './assets/images/Dash/Dash - 01.png';
import dash02 from './assets/images/Dash/Dash - 02.png';
import dash03 from './assets/images/Dash/Dash - 03.png';
import dash04 from './assets/images/Dash/Dash-04.png';
import dash05 from './assets/images/Dash/Dash-05.png';
import dash06 from './assets/images/Dash/Dash-06.png';
import dash07 from './assets/images/Dash/Dash-07.png';
import dash08 from './assets/images/Dash/Dash-08.png';
import dash09 from './assets/images/Dash/Dash-09.png';
import dash10 from './assets/images/Dash/Dash-10.png';
import dash11 from './assets/images/Dash/Dash-11.png';
import dash12 from './assets/images/Dash/Dash-12.png';
import dash13 from './assets/images/Dash/Dash-13.png';
import dash14 from './assets/images/Dash/Dash-14.png';
import dash15 from './assets/images/Dash/Dash-15.png';
import dash16 from './assets/images/Dash/Dash-16.png';
import dash17 from './assets/images/Dash/Dash-17.png';
import dash18 from './assets/images/Dash/Dash-18.png';
import dash19 from './assets/images/Dash/Dash-19.png';
import dash20 from './assets/images/Dash/Dash-20.png';
import dash21 from './assets/images/Dash/Dash-21.png';
import dash22 from './assets/images/Dash/Dash-22.mov';
import dash23 from './assets/images/Dash/Dash-23.png';
import dash24 from './assets/images/Dash/Dash-24.png';
import k01 from './assets/images/KBA/Completa/k-01.png';
import k02 from './assets/images/KBA/Completa/k-02.png';
import k03 from './assets/images/KBA/Completa/k-03.png';
import k04 from './assets/images/KBA/Completa/k-04.png';
import k05 from './assets/images/KBA/Completa/k-05.png';
import k06 from './assets/images/KBA/Completa/k-06.png';
import k07 from './assets/images/KBA/Completa/k-07.png';
import k08 from './assets/images/KBA/Completa/k-08.jpg';
import k09 from './assets/images/KBA/Completa/k-09.png';
import k10 from './assets/images/KBA/Completa/k-10.png';
import k11 from './assets/images/KBA/Completa/k-11.png';
import k12 from './assets/images/KBA/Completa/k-12.png';
import k13 from './assets/images/KBA/Completa/k-13.png';
import k14 from './assets/images/KBA/Completa/k-14.png';
import thumbDashboard from './assets/images/Thumbs/Thumb Dashboard.png';
import thumbDevolutiva from './assets/images/Thumbs/Thumb Devolutiva.png';
import thumbKba from './assets/images/Thumbs/Thumb KBA.png';
import thumbAdmin from './assets/images/Thumbs/Thumb Admin.png';
import capaDashboard from './assets/images/Capas/Capa Dashboard.png';
import capaDevolutiva from './assets/images/Capas/Capa Devolutiva.png';
import capaKba from './assets/images/Capas/Capa KBA.png';
import capaAdmin from './assets/images/Capas/Capa Admin.png';
import { DashboardAdmissaoContent } from "./content/dashboard-admissao";
import { DevolutivaContent } from "./content/devolutiva";
import { KbaSenhaContent } from "./content/kba-senha";
import { AdminGlobalDocsContent } from "./content/admin-global-docs";
import { IaDiaDiaContent } from "./content/ia-dia-dia";
import { OrquestracaoAgentesContent } from "./content/orquestracao-agentes";
import { FrameworkDynamicsContent } from "./content/framework-dynamics";
import { AprendizadosRhContent } from "./content/aprendizados-rh";
import { DesignIaEaiContent } from "./content/design-ia-eai";

const ImagePlaceholder = ({ label = 'Espaço para Imagem' }: { label?: string }) => (

  <div className="w-full aspect-[16/9] bg-[#EBE7DD] rounded-[2rem] flex items-center justify-center my-12 border border-[#DCD7CA]">
    <span className="text-[#787265] font-medium tracking-widest uppercase text-sm">{label}</span>
  </div>
);

const discoveryGalleryItems = [
  {
    src: dash04,
    title: "NotebookLM e Análise Semântica",
    description: "Uso do NotebookLM para analisar dados de canais de suporte e organizar semanticamente os principais gargalos burocráticos relatados.",
    fullWidth: true
  }
];

const prototipacaoGalleryItems = [
  {
    src: dash05,
    title: "Mapeamento de SLAs de Contratação",
    description: "Mapeamento detalhado das etapas críticas do processo admissional e definição de SLAs ideais para alertar sobre atrasos operacionais."
  },
  {
    src: dash06,
    title: "Primeira Ideação Estrutural",
    description: "Exploração de layouts em wireframes funcionais no Google AI Studio para testar visões de prateleiras com foco operacional."
  },
  {
    src: dash07,
    title: "Filtros de Janelas de Contratação",
    description: "Variação de filtros focando na data prevista de admissão e no acompanhamento de SLAs de lotes semanais/mensais."
  }
];

const validacaoGalleryItems = [
  {
    src: dash08,
    title: "Resumo Executivo Inteligente",
    description: "Desenho da funcionalidade de resumo apoiada por IA, projetada para destacar furos de prazos, anomalias e riscos imediatos de forma textual."
  },
  {
    src: dash09,
    title: "Explorando a Densidade de Informação",
    description: "Estudo de grids e tabelas para entender a melhor relação entre quantidade de dados exibidos e usabilidade em telas de baixa resolução."
  },
  {
    src: dash10,
    title: "Acompanhamento Integrado do Funil",
    description: "Visualização experimental do funil cruzando R&S e Admissão digital para localizar gargalos entre a proposta aceita e o primeiro dia de trabalho."
  },
  {
    src: dash11,
    title: "Estudo de Layout de Gráficos",
    description: "Exploração de visualizações gráficas de barras e barras empilhadas para representar a velocidade de validação documental."
  },
  {
    src: dash12,
    title: "Gravação Qualitativa das Sessões",
    description: "Entrevistas individuais em profundidade e testes de usabilidade gravados com analistas e gestores de DP de contas estratégicas."
  },
  {
    src: dash13,
    title: "Análise e Mapeamento de Feedbacks",
    description: "Matriz qualitativa consolidando comentários, reações a novos componentes e avaliações de utilidade de cada indicador proposto."
  }
];

const altaFidelidadeGalleryItems = [
  {
    src: dash24,
    title: "Dashboard de Admissão - Alta Fidelidade",
    description: "Visão consolidada da nova interface do dashboard projetada com alta fidelidade para os operadores e gestores de admissão.",
    fullWidth: true
  }
];

const onePageGalleryItems = [
  {
    src: dash14,
    title: "Análise de Transcrições no NotebookLM",
    description: "Processamento de dezenas de horas de entrevistas gravadas para agrupar automaticamente os feedbacks mais comuns e recorrentes."
  },
  {
    src: dash15,
    title: "Dashboard de Admissão - Visão Geral",
    description: "Telas finais de alta fidelidade integrando a inteligência da Gupy para controle total das próximas contratações."
  },
  {
    src: dash16,
    title: "Gargalos em Detalhes por Etapa",
    description: "Gráfico dinâmico que exibe o tempo médio de permanência em cada etapa e aponta os maiores atrasos de aprovação de documentos."
  },
  {
    src: dash17,
    title: "Ação Rápida de Cobrança Contextual",
    description: "Ação direta que permite ao operador entrar em contato com candidatos parados via WhatsApp com mensagens geradas automaticamente."
  }
];

const handoffGalleryItems = [
  {
    src: dash20,
    title: "One Page Estratégico para Liderança",
    description: "Material consolidando o ROI, dores mapeadas e direcionamento estratégico do novo Dashboard para apresentação executiva à diretoria."
  },
  {
    src: dash21,
    title: "Drill-down Técnico do Roadmap",
    description: "Detalhamento das fases de entrega e metas operacionais alinhadas com as prioridades corporativas."
  },
  {
    src: dash18,
    title: "Status de Validação de Documentos",
    description: "Gráficos de barras que detalham a proporção de documentos corretos, pendentes de envio e reprovados pela equipe ou IA."
  },
  {
    src: dash19,
    title: "Painel de Filtros Avançados",
    description: "Filtros poderosos que refinam as listagens por filiais geográficas, responsáveis de contratação, cargos e lotes específicos."
  },
  {
    src: dash23,
    title: "Handoff Técnico",
    description: "Handoff técnico refinado utilizando Storybook, garantindo fidelidade pixel-perfect em múltiplos estados de dados da aplicação."
  }
];

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

const kbaContextGallery1 = [
  { src: k01, title: 'Contexto', description: 'Oportunidade e impacto de negócio gerado pelo processo de recuperação', fullWidth: true }
];

const kbaContextGallery2 = [
  { src: k02, title: 'Processo', description: 'Problemas enfrentados ao recuperar o acesso com os antigos fluxos', fullWidth: true }
];

const kbaDiscoveryGallery = [
  { src: k03, title: 'Fluxo anterior', description: 'Mapeamento do fluxo anterior de autenticação' },
  { src: k04, title: 'Análise quantitativa', description: 'Métricas de engajamento das jornadas' },
  { src: k05, title: 'Comportamento do usuário', description: 'Identificação de problemas de usabilidade na recuperação' },
  { src: k06, title: 'Login Social', description: 'Uso de Login Social e fluxos de criação de conta' },
  { src: k07, title: 'Falhas e inconsistências', description: 'Visão das mensagens de erro e inconsistências' }
];

const kbaEstrategiaGallery = [
  { src: k08, title: 'Estudo das opções de KBA', description: 'Análise sobre a arquitetura e fluxos de segurança do KBA', fullWidth: true }
];

const kbaPrototiposGallery = [
  { src: k09, title: 'Prototipação via IA', description: 'Fluxos iniciais criados e validados no Figma Make' },
  { src: k10, title: 'Testes de mesa', description: 'Discussão de fluxos com Stakeholders e Engenharia' },
  { src: k11, title: 'Refinamento', description: 'Evolução da fidelidade usando Design System' },
  { src: k12, title: 'Edge Cases e Limites', description: 'Mapeamento de cenários críticos e limites de tentativas' },
  { src: k13, title: 'Especificações', description: 'Regras de segurança, erros e recuperações malsucedidas' }
];

export const projects = [
  {
    id: 'devolutiva',
    title: 'Fechando o ciclo da Avaliação de Desempenho',
    tag: 'Discovery & Delivery',
    description: 'Como transformamos um processo descentralizado em uma experiência integrada, criando a funcionalidade de devolutivas dentro do produto de Performance.',
    role: 'Product Designer',
    roles: ['Product Design'],
    tools: ['Figma', 'Claude', 'Cursor', 'AI Studio'],
    team: ['Performance e Desenvolvimento'],
    year: '2024',
    platform: 'Gupy Performance',
    readingTime: '4 min de leitura',
    thumbnail: thumbDevolutiva,
    coverImage: capaDevolutiva,
    tldr: {
      problem: 'Devolutiva acontecia toda fora da plataforma, sem histórico nem padrão.',
      action: 'Mapeou a jornada completa e desenhou uma experiência nativa, com apoio de IA.',
      result: '95% de adoção entre os gestores e redução de dias no esforço para criar a devolutiva do primeiro rollout.'
    },
    bg: 'bg-[#D2CBB6]',
    heroBg: 'bg-[#D2CBB6]',
    textColor: 'text-[#2C3539]',
    tagColor: 'text-[#006266]',
    content: <DevolutivaContent />
  },
  {
    id: 'dashboard-admissao',
    title: 'Redesenhando o Dashboard de Admissão',
    tag: 'Discovery & IA',
    description: 'Transformando um dashboard de análise histórica em uma ferramenta operacional orientada à tomada de decisão.',
    role: 'Product Designer',
    roles: ['Product Design'],
    tools: ['Google IA Studio', 'Claude', 'Cursor', 'Figma'],
    team: ['Analytics'],
    platform: 'Gupy Admissão',
    readingTime: '5 min de leitura',
    thumbnail: thumbDashboard,
    coverImage: capaDashboard,
    tldr: {
      problem: 'O dashboard mostrava o passado, mas o RH precisava agir sobre admissões em risco, agora.',
      action: 'Liderei o Discovery, prototipei com IA, testei com clientes e apoiei o handoff técnico.',
      result: 'Redefinimos a direção do produto: de indicadores históricos para uma visão de risco e previsibilidade.'
    },
    bg: 'bg-[#E1DCD3]',
    heroBg: 'bg-[#E1DCD3]',
    textColor: 'text-[#2C3539]',
    tagColor: 'text-[#006266]',
    content: <DashboardAdmissaoContent />
  },
  {
    id: 'kba-senha',
    title: 'Recuperação de senha self-service (KBA)',
    tag: 'Knowledge-Based Auth',
    description: 'Transformação de um processo manual em self-service através do fluxo de recuperação via Knowledge-Based Authentication.',
    role: 'Product Designer',
    roles: ['Product Design'],
    tools: ['Figma', 'Figma Make', 'Claude', 'Cursor'],
    team: ['Cross - Gestão de Contas'],
    year: '2024',
    platform: 'Web',
    readingTime: '4 min de leitura',
    thumbnail: thumbKba,
    coverImage: capaKba,
    tldr: {
      problem: 'Recuperação de acesso era um dos principais motivos de contato com o suporte.',
      action: 'Conduzi a descoberta, desenhei o fluxo self-service via KBA e validei cenários com prototipação em IA.',
      result: 'Potencial de redução relevante no volume de tickets, com mais autonomia e menos tempo de espera para o candidato.'
    },
    bg: 'bg-[#B1BDC4]',
    heroBg: 'bg-[#B1BDC4]',
    textColor: 'text-[#2C3539]',
    tagColor: 'text-[#006266]',
    content: <KbaSenhaContent />
  },
  {
    id: 'admin-global-docs',
    title: 'Admin Global',
    tag: 'Plataforma · Ecossistema',
    description: 'Unificando a administração entre produtos para reduzir esforço de implantação e criar uma base escalável para crescimento',
    role: 'Liderança de UX',
    roles: ['Liderança de UX', 'Product Design'],
    tools: ['Figma', 'Claude', 'Cursor', 'AI Studio'],
    team: ['Cross - Admin'],
    year: '2025',
    platform: 'Plataforma Gupy',
    readingTime: '5 min de leitura',
    thumbnail: thumbAdmin,
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
    bg: 'bg-[#E5E0D5]',
    heroBg: 'bg-[#E5E0D5]',
    textColor: 'text-[#2C3539]',
    tagColor: 'text-[#006266]',
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
    bg: 'bg-[#C1C9C8]',
    heroBg: 'bg-[#C1C9C8]',
    textColor: 'text-[#2C3539]',
    tagColor: 'text-[#006266]',
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
    bg: 'bg-gradient-to-br from-[#8C9A9E] to-[#4A5559]',
    heroBg: 'bg-gradient-to-br from-[#8C9A9E] to-[#4A5559]',
    textColor: 'text-white',
    tagColor: 'text-[#A8C6C7]',
    content: <OrquestracaoAgentesContent />
  },
  {
    id: 'analise-metricas',
    title: 'Análise de métricas de experiência',
    tag: 'Rascunho',
    status: { progress: 0, label: 'Rascunho' },
    description: 'Case menor, focado em métricas de UX.',
    role: 'UX Researcher',
    roles: ['UX Research'],
    tools: ['Google Analytics', 'Hotjar'],
    team: ['Analytics'],
    year: '2023',
    platform: 'Analytics',
    bg: 'bg-[#7D888B]',
    heroBg: 'bg-[#7D888B]',
    textColor: 'text-white',
    tagColor: 'text-[#C4D0D1]',
  },
  {
    id: 'aprendizados-rh',
    title: 'O que eu aprendi no mundo do RH',
    tag: 'Artigo · Aprendizados',
    description: 'Reflexões sobre a complexidade dos processos de RH projetar após passar tantando tempo projetando ferramentas que impactam diretamente a vida e a carreira de milhões de pessoas.',
    role: 'Liderança de UX',
    roles: ['Liderança de UX'],
    tools: ['Pesquisa Qualitativa', 'Análise de Processos'],
    team: ['Design & Produto'],
    year: '2026',
    platform: 'Reflexões de Carreira',
    readingTime: '4 min de leitura',
    tldr: {
      problem: 'A perception inicial de que o trabalho com RH se limitava a fluxos de recrutamento e avaliação, subestimando a complexidade e variação dos contextos organizacionais.',
      action: 'Atuação por 5 anos projetando produtos para diferentes cenários de RH, aprendendo a equilibrar flexibilidade e orientação a boas práticas.',
      result: 'A compreensão de que desenhar para RH exige entender o contexto específico de cada empresa e saber impor limites para evitar configurações impossíveis de usar.'
    },
    bg: 'bg-[#D1C7BD]',
    heroBg: 'bg-[#D1C7BD]',
    textColor: 'text-[#2C3539]',
    tagColor: 'text-[#006266]',
    content: <AprendizadosRhContent />
  },
];

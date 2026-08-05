const fs = require('fs');

const content = fs.readFileSync('src/data.tsx', 'utf8');

const skillsRegex = /export const skills = \[([\s\S]*?)\];/;

const newSkills = `export const skills = [
  {
    id: 'pesquisa-discovery',
    name: 'Pesquisa & Discovery',
    description: 'Atuo na etapa de descoberta com profundidade, utilizando métodos qualitativos e quantitativos. Aplico diversos frameworks para organizar insights e transformá-los em direcionadores claros de produto.',
    links: [
      { url: '/project/dashboard-admissao#discovery', label: 'Dashboard de Admissão (Pesquisa e Imersão)' },
      { url: '/project/admin-global-docs#principais-descobertas', label: 'Admin Global do Docs (Consolidação de pesquisas)' },
      { url: '/project/devolutiva#consolidando-pesquisas', label: 'Avaliação de Desempenho (Auditoria e Consolidação)' },
      { url: '/project/framework-dynamics#atomic-research', label: 'Frameworks (Atomic Research)' },
      { url: '/project/kba-senha#discovery', label: 'Recuperação de Conta (Identificação de Dores)' }
    ]
  },
  {
    id: 'sistemas-complexos',
    name: 'Arquitetura de Informação & Sistemas',
    description: 'Estruturo modelos mentais, taxonomias e arquiteturas para produtos de alta complexidade. Foco em reduzir atritos cognitivos e garantir a escalabilidade da plataforma, alinhando visão técnica e necessidades do usuário.',
    links: [
      { url: '/project/admin-global-docs#job-vs-position', label: 'Admin Global do Docs (Modelagem de Entidades)' },
      { url: '/project/orquestracao-agentes#arquitetura-proposta', label: 'Orquestração de Agentes (Taxonomia e Sistema)' },
      { url: '/project/devolutiva#arquitetando-a-solucao', label: 'Avaliação de Desempenho (Arquitetura da Solução)' },
      { url: '/project/dashboard-admissao#como-mudou-solucao', label: 'Dashboard de Admissão (Reestruturação de Fluxo)' }
    ]
  },
  {
    id: 'ia-design-process',
    name: 'IA no Processo de Design',
    description: 'Integro inteligência artificial ativamente no fluxo de trabalho de design de produto. Utilizo o Google AI Studio para criação rápida de wireframes, validação de hipóteses e geração de variações de telas, além do Cursor para codar interfaces e simular cenários complexos.',
    links: [
      { url: '/project/ia-dia-dia#ia-acelerando', label: 'Visão Geral (Protótipos e Ferramentas)' },
      { url: '/project/dashboard-admissao#prototipacao-acelerada-com-ia', label: 'Dashboard de Admissão (Wireframes no AI Studio)' },
      { url: '/project/admin-global-docs#ia-aceleradora', label: 'Admin Global do Docs (IA como aceleradora)' },
      { url: '/project/kba-senha#prototipacao-acelerada-com-ia', label: 'Recuperação de Conta (Validação em IA)' }
    ]
  },
  {
    id: 'facilitacao-estrategia',
    name: 'Facilitação & Visão de Produto',
    description: 'Experiência na facilitação de dinâmicas colaborativas e alinhamento estratégico com stakeholders. Utilizo workshops e frameworks estruturados para definir visões de produto de ponta a ponta e resolver problemas de arquitetura complexa.',
    links: [
      { url: '/project/framework-dynamics#light-decision-jam', label: 'Frameworks (Light Decision Jam)' },
      { url: '/project/admin-global-docs#insight', label: 'Admin Global do Docs (Alinhamento Estratégico)' },
      { url: '/project/orquestracao-agentes', label: 'Orquestração de Agentes (Visão Unificada)' }
    ]
  },
  {
    id: 'prototipacao-handoff',
    name: 'Prototipação Funcional & Handoff',
    description: 'Criação de protótipos navegáveis, desde baixa fidelidade até funcionais em código. Foco em validar interações complexas rapidamente e entregar um handoff técnico refinado (utilizando ferramentas como Cursor) para reduzir atritos com a engenharia.',
    links: [
      { url: '/project/ia-dia-dia#handoff-completo', label: 'Visão Geral (Handoff no Cursor)' },
      { url: '/project/dashboard-admissao#preparando-o-handoff', label: 'Dashboard de Admissão (Componentes e Handoff Técnico)' },
      { url: '/project/admin-global-docs#aproximando-design', label: 'Admin Global do Docs (Aproximando Design e Engenharia)' },
      { url: '/project/kba-senha#entrega', label: 'Recuperação de Conta (Especificação Técnica)' }
    ]
  },
  {
    id: 'pesquisa-usabilidade',
    name: 'Testes de Usabilidade & Validação',
    description: 'Desenho e conduzo testes qualitativos de usabilidade com usuários e stakeholders para validar hipóteses de interface diretamente na prática, reduzindo fricções de uso e otimizando resultados de produto.',
    links: [
      { url: '/project/devolutiva#validacao', label: 'Avaliação de Desempenho (Testes de Usabilidade)' },
      { url: '/project/dashboard-admissao#validacao-com-clientes', label: 'Dashboard de Admissão (Validação Prática)' },
      { url: '/project/kba-senha#impacto', label: 'Recuperação de Conta (Análise de Impacto)' }
    ]
  }
];`;

const updatedContent = content.replace(skillsRegex, newSkills);

fs.writeFileSync('src/data.tsx', updatedContent);

console.log('Skills replaced');

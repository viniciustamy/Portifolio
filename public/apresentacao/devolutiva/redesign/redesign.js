const app=document.querySelector('#app');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const people=[['Marina Costa','Analista','pending'],['Alexandre Torres','Analista','pending'],['Gustavo Bezerra','Desenvolvedor de Software','waiting'],['Mariana Diamante','Desenvolvedora de Software','waiting'],['Aline Sordi da Silva','Designer','sent'],['Isabela Vieira','Designer','sent']];
const teamPeople=[...people,['Pedro Martins','Analista','pending'],['Carolina Ribeiro','Designer','pending']];
const leaderFirstNames=['Alex','Amanda','Augusto','Juliana','Felipe','Beatriz','Rafael','Camila','Bruno','Larissa','Diego','Fernanda','Lucas','Patrícia','Marcelo','Renata','Thiago','Natália','Eduardo','Carolina','Vinícius','Débora','André','Priscila','Gustavo'];
const leaderLastNames=['Silva','Lopes','Rodrigues','Nogueira','Lima','Costa','Almeida','Santos','Oliveira','Martins'];
const leaderScenarios=[[6,0,0],[0,6,0],[0,0,6],[2,3,1],[1,1,4],[3,2,1],[0,2,4],[4,1,1],[1,4,1],[2,0,4]];
const leaderTeamSizes=[6,5,8,4,7,6,5,8,4,7];
const leaders=Array.from({length:50},(_,i)=>{const teamSize=leaderTeamSizes[i%leaderTeamSizes.length],scenario=leaderScenarios[i%leaderScenarios.length],pending=Math.round(scenario[0]*teamSize/6),waiting=Math.min(teamSize-pending,Math.round(scenario[1]*teamSize/6));return {name:`${leaderFirstNames[i%leaderFirstNames.length]} ${leaderLastNames[Math.floor(i/leaderFirstNames.length)*5+i%5]}`,role:['Liderança de Produto','Liderança de Engenharia','Liderança de Design','Liderança Comercial','Liderança de Operações'][i%5],teamSize,counts:[pending,waiting,teamSize-pending-waiting]}});
let rhPage=1;const rhPageSize=10;
let saved={};try{saved=JSON.parse(localStorage.getItem('devolutivas-demo')||'{}')}catch{};
const drafts=saved.drafts||{};let plan=saved.plan||'Devolutiva Engenharia 2025.1';
if(saved.statuses)people.forEach((p,i)=>p[2]=saved.statuses[i]||p[2]);
function persist(){try{localStorage.setItem('devolutivas-demo',JSON.stringify({drafts,plan,statuses:people.map(p=>p[2])}))}catch{}}
const labels={pending:'Pendente',waiting:'Aguardando envio',sent:'Enviado'};
const iconPaths={calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',layers:'<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/>',file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',send:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',check:'<path d="M20 6 9 17l-5-5"/>',userCheck:'<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="m17 11 2 2 4-4"/>',chevronRight:'<path d="m9 18 6-6-6-6"/>',edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',arrowLeft:'<path d="m15 18-6-6 6-6"/><path d="M9 12h12"/>',download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',message:'<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/>',maximize:'<path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"/>',info:'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',sparkles:'<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2M20 14h2M15 13v2M9 13v2"/>'};
const icon=(name,size=16)=>`<svg class="lucide-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name]||''}</svg>`;
iconPaths.search='<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>';
iconPaths.more='<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>';
iconPaths.mail='<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>';
iconPaths.clipboardCheck='<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>';
iconPaths.messagesSquare='<path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>';
iconPaths.target='<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>';
iconPaths.alertTriangle='<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>';
iconPaths.checkCircle='<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>';
iconPaths.helpCircle='<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>';
iconPaths.copy='<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>';

const peopleQualityData = {
  'Marina Costa': {
    completeness: '100% · Fontes completas',
    completenessFull: true,
    score: 92,
    tier: 'excellent',
    tierLabel: 'Excelente',
    aiUsed: true,
    aiEdited: true,
    criteria: [
      { name: 'Exemplos e fatos concretos', points: '+25 pts', ok: true, detail: 'Citações explícitas do projeto de infraestrutura e refatoração de rotas críticas de checkout.' },
      { name: 'Fundamentação de pontos fortes e melhoria', points: '+25 pts', ok: true, detail: 'Equilíbrio claro entre autonomia técnica sólida e necessidade de comunicar riscos cedo.' },
      { name: 'Próximos passos e plano de ação', points: '+25 pts', ok: true, detail: 'Recomendações objetivas já conectadas às ações sugeridas para o PDI e conversa 1:1.' },
      { name: 'Coerência com evidências do ciclo', points: '+17 pts', ok: true, detail: 'Alinhamento integral com o OKR atingido e os 7 feedbacks contínuos registrados.' }
    ],
    issues: []
  },
  'Alexandre Torres': {
    completeness: '100% · Fontes completas',
    completenessFull: true,
    score: 64,
    tier: 'review',
    tierLabel: 'Merece revisão',
    aiUsed: false,
    aiEdited: false,
    criteria: [
      { name: 'Exemplos e fatos concretos', points: '+10 pts', ok: false, detail: 'Afirmação vaga: "apresentou bom desempenho geral", sem menção a projetos ou entregas específicas.' },
      { name: 'Fundamentação de pontos fortes e melhoria', points: '+14 pts', ok: false, detail: 'Ponto de melhoria genérico: "precisa se comunicar melhor", sem explicar em qual momento gerou atrito.' },
      { name: 'Próximos passos e plano de ação', points: '+15 pts', ok: false, detail: 'Ausência de metas de curto prazo ou acordos observáveis para os próximos 30 dias.' },
      { name: 'Coerência com evidências do ciclo', points: '+25 pts', ok: true, detail: 'Compatível com as avaliações numéricas atribuídas no ciclo.' }
    ],
    issues: ['Faltam exemplos concretos de situações', 'Próximos passos não estão claros']
  },
  'Gustavo Bezerra': {
    completeness: '75% · Rascunho salvo',
    completenessFull: false,
    score: 78,
    tier: 'consistent',
    tierLabel: 'Consistente',
    aiUsed: true,
    aiEdited: true,
    criteria: [
      { name: 'Exemplos e fatos concretos', points: '+20 pts', ok: true, detail: 'Cita colaboração ativa nas entregas de backend do Q4.' },
      { name: 'Fundamentação de pontos fortes e melhoria', points: '+20 pts', ok: true, detail: 'Destaca proatividade e suporte a colegas com clareza.' },
      { name: 'Próximos passos e plano de ação', points: '+18 pts', ok: true, detail: 'Sugere aprofundamento em arquitetura de microsserviços.' },
      { name: 'Coerência com evidências do ciclo', points: '+20 pts', ok: true, detail: 'Coerente com autoavaliação e perspectiva de pares.' }
    ],
    issues: []
  },
  'Mariana Diamante': {
    completeness: '100% · Fontes completas',
    completenessFull: true,
    score: 88,
    tier: 'consistent',
    tierLabel: 'Consistente',
    aiUsed: true,
    aiEdited: true,
    criteria: [
      { name: 'Exemplos e fatos concretos', points: '+22 pts', ok: true, detail: 'Exemplos pertinentes de revisões de PRs e mentoria técnica.' },
      { name: 'Fundamentação de pontos fortes e melhoria', points: '+22 pts', ok: true, detail: 'Abordagem equilibrada e construtiva nos dois eixos.' },
      { name: 'Próximos passos e plano de ação', points: '+22 pts', ok: true, detail: 'Ações de desenvolvimento bem direcionadas para liderança técnica.' },
      { name: 'Coerência com evidências do ciclo', points: '+22 pts', ok: true, detail: 'Sólida aderência às notas e evidências do ciclo.' }
    ],
    issues: []
  },
  'Aline Sordi da Silva': {
    completeness: '100% · Enviada',
    completenessFull: true,
    score: 95,
    tier: 'excellent',
    tierLabel: 'Excelente',
    aiUsed: true,
    aiEdited: true,
    criteria: [
      { name: 'Exemplos e fatos concretos', points: '+25 pts', ok: true, detail: 'Exemplos ricos de discovery e testes de usabilidade com clientes B2B.' },
      { name: 'Fundamentação de pontos fortes e melhoria', points: '+25 pts', ok: true, detail: 'Alta clareza de impacto e valor gerado para o produto.' },
      { name: 'Próximos passos e plano de ação', points: '+25 pts', ok: true, detail: 'Estruturação de trilha de design system e mentoria com juniors.' },
      { name: 'Coerência com evidências do ciclo', points: '+20 pts', ok: true, detail: 'Perfeita sincronia com feedbacks qualitativos dos pares.' }
    ],
    issues: []
  },
  'Isabela Vieira': {
    completeness: '100% · Enviada',
    completenessFull: true,
    score: 62,
    tier: 'review',
    tierLabel: 'Merece revisão',
    aiUsed: true,
    aiEdited: false,
    criteria: [
      { name: 'Exemplos e fatos concretos', points: '+12 pts', ok: false, detail: 'A devolutiva adotou a sugestão inicial da IA na íntegra sem contextualizar com fatos reais vivenciados pelo time.' },
      { name: 'Fundamentação de pontos fortes e melhoria', points: '+15 pts', ok: false, detail: 'Faltou contextualizar a aplicação dos pontos fortes no contexto dos desafios de Design.' },
      { name: 'Próximos passos e plano de ação', points: '+15 pts', ok: false, detail: 'Próximo passo muito amplo ("continuar crescendo no time").' },
      { name: 'Coerência com evidências do ciclo', points: '+20 pts', ok: true, detail: 'Alinhado com a percepção numérica geral.' }
    ],
    issues: ['Sugestão adotada sem contextualização prática', 'Próximo passo genérico']
  }
};

const personOkrsData = {
  'Marina Costa': [
    {
      title: 'Disponibilidade e resiliência da infraestrutura',
      kr: 'Manter disponibilidade geral >= 99.9% e latência p95 < 200ms nas rotas críticas de checkout',
      expected: '>= 99.9% / < 200ms',
      achieved: '99.95% / 185ms',
      progress: 100,
      status: 'Atingido',
      tone: 'success',
      period: 'Q4 2023',
      context: 'Marina assumiu a liderança técnica da migração para o novo cluster e a refatoração de rotas críticas. Garantiu estabilidade absoluta durante o pico promocional de final de ano.'
    },
    {
      title: 'Aumentar taxa de cobertura de testes automatizados',
      kr: 'Elevar cobertura de testes unitários e de integração de 60% para 85% no serviço de avaliações',
      expected: '85% de cobertura',
      achieved: '76% de cobertura',
      progress: 82,
      status: 'Parcial',
      tone: 'warning',
      period: 'Q4 2023',
      context: 'Prioridade parcialmente ajustada no meio do trimestre para absorver demanda emergencial de compliance. O avanço obtido foi consistente e validado pela liderança.'
    }
  ],
  'Alexandre Torres': [
    {
      title: 'Validação e Discovery de Produto B2B',
      kr: 'Conduzir 20 entrevistas em profundidade com clientes Enterprise e validar 3 hipóteses de retenção',
      expected: '20 entrevistas / 3 hipóteses',
      achieved: '22 entrevistas / 3 hipóteses validadas',
      progress: 100,
      status: 'Atingido',
      tone: 'success',
      period: 'Q4 2023',
      context: 'Excelente trabalho em conectar a voz dos clientes com a estratégia de produto. Conduziu alinhamentos com clientes-chave com segurança.'
    },
    {
      title: 'Redução de Churn Técnico no Onboarding',
      kr: 'Diminuir taxa de atrito na primeira semana de uso de 18% para <= 10%',
      expected: '<= 10%',
      achieved: '13.5%',
      progress: 68,
      status: 'Parcial',
      tone: 'warning',
      period: 'Q4 2023',
      context: 'Demandou alinhamentos adicionais com engenharia; identificamos oportunidade de comunicar impedimentos mais cedo aos stakeholders.'
    }
  ],
  'Gustavo Bezerra': [
    {
      title: 'Migração de Microsserviços Backend',
      kr: 'Desacoplar o módulo de transações financeiras do legado com zero downtime',
      expected: '100% migrado',
      achieved: '94% migrado',
      progress: 94,
      status: 'Atingido',
      tone: 'success',
      period: 'Q4 2023',
      context: 'Entrega técnica sólida com alta estabilidade. Demonstrou autonomia na resolução de gargalos em produção.'
    },
    {
      title: 'Otimização de Consultas SQL Críticas',
      kr: 'Reduzir latência p95 de consultas analíticas de 1.8s para < 400ms',
      expected: '< 400ms',
      achieved: '310ms',
      progress: 100,
      status: 'Atingido',
      tone: 'success',
      period: 'Q4 2023',
      context: 'Implementou índices e refatorou planos de execução com maestria, gerando economia expressiva de infraestrutura.'
    }
  ],
  'Mariana Diamante': [
    {
      title: 'Padronização e Governança de APIs',
      kr: 'Publicar especificações OpenAPI v3 e contratos automatizados para 4 serviços',
      expected: '4 contratos ativos',
      achieved: '4 contratos ativos',
      progress: 100,
      status: 'Atingido',
      tone: 'success',
      period: 'Q4 2023',
      context: 'Referência de qualidade de documentação e contratos entre equipes, acelerando a integração de novos parceiros.'
    },
    {
      title: 'Tempo Médio de Recuperação (MTTR)',
      kr: 'Reduzir tempo de resolução em falhas críticas de infraestrutura para < 45 min',
      expected: '< 45 min',
      achieved: '51 min',
      progress: 86,
      status: 'Parcial',
      tone: 'warning',
      period: 'Q4 2023',
      context: 'Evolução perceptível em relação ao trimestre anterior, com oportunidade de automatizar rollbacks em falhas de deploy.'
    }
  ],
  'Aline Sordi da Silva': [
    {
      title: 'Redesign da Jornada de Admissão de Candidatos',
      kr: 'Elevar taxa de conversão no preenchimento de perfil de 68% para 85%',
      expected: '85% conversão',
      achieved: '88% conversão',
      progress: 100,
      status: 'Atingido',
      tone: 'success',
      period: 'Q4 2023',
      context: 'Pesquisas aprofundadas com candidatos e iterações de protótipos de alta fidelidade resultaram em ganho substancial de conversão.'
    },
    {
      title: 'Consolidação de Tokens do Design System',
      kr: 'Cobrir 90% dos componentes base com tokens semânticos acessíveis',
      expected: '90% cobertura',
      achieved: '92% cobertura',
      progress: 100,
      status: 'Atingido',
      tone: 'success',
      period: 'Q4 2023',
      context: 'Excelente liderança de design ops, compartilhando conhecimento com os times de engenharia front-end.'
    }
  ],
  'Isabela Vieira': [
    {
      title: 'Cadência de Testes de Usabilidade com Usuários',
      kr: 'Executar 12 sessões de testes moderados de usabilidade durante o ciclo',
      expected: '12 sessões',
      achieved: '9 sessões',
      progress: 75,
      status: 'Parcial',
      tone: 'warning',
      period: 'Q4 2023',
      context: 'Recrutamento de usuários tomou mais tempo que o previsto; recomendado estruturar pool contínuo com time de operações.'
    },
    {
      title: 'Conformidade de Acessibilidade Digital (WCAG 2.1 AA)',
      kr: 'Garantir conformidade completa de acessibilidade nos fluxos de checkout e relatórios',
      expected: '100% conforme',
      achieved: '68% conforme',
      progress: 68,
      status: 'Parcial',
      tone: 'warning',
      period: 'Q4 2023',
      context: 'Avanço importante nos contrastes e leitores de tela; necessita de continuidade como foco do PDI no próximo trimestre.'
    }
  ]
};

const personFeedbacksData = {
  'Marina Costa': {
    total: 7,
    breakdown: '4 Pares · 2 Liderança · 1 Cross-team',
    themes: ['#colaboração-ativa', '#autonomia-técnica', '#comunicação-antecipada', '#visão-de-produto'],
    quotes: [
      { author: 'Juliana Nogueira', role: 'Engenheira de Software · Pares', date: '18 nov 2024', type: 'Par', text: 'Marina conduziu o alinhamento das rotas de integração com muita clareza, tirando dúvidas do time antes que virassem impedimentos no sprint.' },
      { author: 'Beatriz Rodrigues', role: 'Liderança de Engenharia · Gestor', date: '05 dez 2024', type: 'Liderança', text: 'Demonstrou alta maturidade na resolução de incidentes críticos. Como oportunidade para os próximos ciclos, recomendo compartilhar o contexto de riscos com os stakeholders com maior antecedência.' },
      { author: 'Alexandre Torres', role: 'Product Manager · Cross-team', date: '14 jan 2025', type: 'Cross-team', text: 'Excelente parceira nas dinâmicas de viabilidade técnica de produto, sempre propondo caminhos pragmáticos sem comprometer a qualidade.' }
    ]
  },
  'Alexandre Torres': {
    total: 6,
    breakdown: '3 Pares · 2 Liderança · 1 Cross-team',
    themes: ['#descoberta-com-clientes', '#visão-estratégica', '#alinhamento-antecipado', '#dados-de-produto'],
    quotes: [
      { author: 'Amanda Lopes', role: 'Head de Produto · Gestor', date: '12 nov 2024', type: 'Liderança', text: 'Alexandre tem capacidade ímpar de traduzir necessidades complexas de clientes em roadmap claro. A oportunidade é comunicar mudanças de escopo com maior antecedência para a engenharia.' },
      { author: 'Marina Costa', role: 'Engenheira de Software · Cross-team', date: '02 dez 2024', type: 'Cross-team', text: 'Sempre traz dados e dores de clientes reais para refinar as histórias de usuário, o que ajuda muito a priorizar o trabalho técnico.' },
      { author: 'Carolina Ribeiro', role: 'Designer de Produto · Pares', date: '19 jan 2025', type: 'Par', text: 'Grande parceria nas sessões de co-criação e dinâmicas de viabilidade com os usuários.' }
    ]
  },
  'Gustavo Bezerra': {
    total: 8,
    breakdown: '5 Pares · 2 Liderança · 1 Cross-team',
    themes: ['#excelência-técnica', '#mentoria-de-pares', '#proatividade', '#resiliência-backend'],
    quotes: [
      { author: 'Mariana Diamante', role: 'Engenheira Sênior · Pares', date: '25 out 2024', type: 'Par', text: 'Gustavo é a primeira pessoa a se voluntariar para ajudar colegas travados em bugs difíceis. Sua mentoria fez o sprint fluir muito melhor.' },
      { author: 'Beatriz Rodrigues', role: 'Liderança de Engenharia · Gestor', date: '14 dez 2024', type: 'Liderança', text: 'Entrega consistente e alto compromisso técnico na migração do monolito para microsserviços.' },
      { author: 'Alexandre Torres', role: 'Product Manager · Cross-team', date: '08 jan 2025', type: 'Cross-team', text: 'Entregou a funcionalidade de pagamentos antes do prazo previsto, garantindo testes antecipados.' }
    ]
  },
  'Mariana Diamante': {
    total: 9,
    breakdown: '5 Pares · 3 Liderança · 1 Cross-team',
    themes: ['#liderança-técnica', '#qualidade-de-código', '#comunicação-clara', '#documentação'],
    quotes: [
      { author: 'Felipe Lima', role: 'Tech Lead · Liderança', date: '10 nov 2024', type: 'Liderança', text: 'Mariana atua como verdadeira guardiã da arquitetura do time. Seus code reviews são verdadeiras aulas de engenharia.' },
      { author: 'Gustavo Bezerra', role: 'Engenheiro de Software · Pares', date: '29 nov 2024', type: 'Par', text: 'A padronização das APIs facilitou demais a integração entre os squads. Sempre disposta a colaborar.' },
      { author: 'Isabela Vieira', role: 'Designer de Produto · Cross-team', date: '15 jan 2025', type: 'Cross-team', text: 'Clareza excepcional ao explicar restrições técnicas para a equipe de produto e design.' }
    ]
  },
  'Aline Sordi da Silva': {
    total: 8,
    breakdown: '4 Pares · 3 Liderança · 1 Cross-team',
    themes: ['#design-ops', '#empatia-com-usuário', '#liderança-de-design', '#consistência-visual'],
    quotes: [
      { author: 'Carolina Ribeiro', role: 'Designer de Produto · Pares', date: '05 nov 2024', type: 'Par', text: 'Aline estruturou a governança de tokens do design system com maestria, reduzindo nosso retrabalho pela metade.' },
      { author: 'Augusto Rodrigues', role: 'Design Manager · Gestor', date: '18 dez 2024', type: 'Liderança', text: 'Demonstrou altíssima maturidade no discovery do novo onboarding, combinando dados quantitativos e qualitativos.' },
      { author: 'Marina Costa', role: 'Engenheira de Software · Cross-team', date: '11 jan 2025', type: 'Cross-team', text: 'Comunicação fluida e proativa com engenharia na implementação dos novos componentes.' }
    ]
  },
  'Isabela Vieira': {
    total: 6,
    breakdown: '3 Pares · 2 Liderança · 1 Cross-team',
    themes: ['#sensibilidade-de-design', '#acessibilidade', '#testes-com-usuários', '#comunicação-com-time'],
    quotes: [
      { author: 'Aline Sordi da Silva', role: 'Senior Designer · Pares', date: '14 nov 2024', type: 'Par', text: 'Isabela tem olhar muito apurado para consistência visual e detalhes de microinteração nos fluxos.' },
      { author: 'Augusto Rodrigues', role: 'Design Manager · Gestor', date: '08 dez 2024', type: 'Liderança', text: 'Evolução consistente na condução de dinâmicas. Recomendo focar na antecipação de impedimentos de recrutamento para testes.' },
      { author: 'Gustavo Bezerra', role: 'Engenheiro de Software · Cross-team', date: '20 jan 2025', type: 'Cross-team', text: 'Trabalho cuidadoso na especificação de contrastes e acessibilidade para o front-end.' }
    ]
  }
};

const courseCatalog = [
  { id: 'com-1', icon: 'message', type: 'Curso · Comunicação', title: 'Comunicação assertiva e alinhamento de expectativas', detail: 'Técnicas práticas para apresentar decisões técnicas, antecipar riscos de entrega e alinhar expectativas com clareza.', meta: 'Trilha sugerida · 2 h', area: 'Comunicação' },
  { id: 'col-1', icon: 'users', type: 'Curso · Colaboração', title: 'Influência sem autoridade e acordos entre áreas', detail: 'Como construir acordos sustentáveis, colaborar com áreas multifuncionais e articular prioridades conjuntas.', meta: 'Trilha sugerida · 3 h', area: 'Colaboração' },
  { id: 'arq-1', icon: 'layers', type: 'Curso · Engenharia', title: 'Arquitetura de microsserviços e resiliência em nuvem', detail: 'Boas práticas para desacoplamento de sistemas críticos, failover gracioso e alta disponibilidade.', meta: 'Trilha sugerida · 4 h', area: 'Técnico' },
  { id: 'pln-1', icon: 'clipboardCheck', type: 'Curso · Planejamento', title: 'Priorização ágil e gestão de dependências', detail: 'Mapeamento de riscos prévios, checkpoints curtos e negociação transparente de prazos com liderança.', meta: 'Trilha sugerida · 2 h', area: 'Planejamento' },
  { id: 'fdb-1', icon: 'messagesSquare', type: 'Curso · Desenvolvimento', title: 'Feedback contínuo e conversas bilaterais de desenvolvimento', detail: 'Como pedir, acolher e transformar feedbacks contínuos em planos de desenvolvimento individual observáveis.', meta: 'Trilha sugerida · 1 h 30', area: 'Desenvolvimento' },
  { id: 'des-1', icon: 'target', type: 'Curso · Design Ops', title: 'Design Ops e escalabilidade de design systems', detail: 'Governança de componentes compartilhados, documentação de tokens e integração com engenharia.', meta: 'Trilha sugerida · 2 h 30', area: 'Design' }
];

const personRecommendationsData = {
  'Marina Costa': {
    leadSummary: 'Com base nas evidências do ciclo (OKR de 99.95% de resiliência e 7 feedbacks contínuos), Marina consolidou sólida autonomia técnica e colaboração ativa. O foco recomendado para o próximo ciclo é a comunicação antecipada de riscos técnicos com stakeholders.',
    signals: [
      { tone: 'strength', icon: 'check', title: 'Força', name: 'Autonomia técnica e colaboração', text: 'Consistência exemplar nas entregas críticas de infraestrutura e apoio ágil aos pares.' },
      { tone: 'opportunity', icon: 'message', title: 'Oportunidade', name: 'Comunicação antecipada de riscos', text: 'Compartilhar impedimentos e cenários de risco com stakeholders antes que gerem bloqueios.' },
      { tone: 'focus', icon: 'clock', title: 'Foco do ciclo', name: 'Visibilidade proativa', text: 'Fazer checkpoints curtos quinzenais para sinalizar dependências de arquitetura cedo.' }
    ],
    actions: [
      { icon: 'message', tag: 'Comunicação · 15 min/semana', title: 'Registrar alinhamentos e riscos técnicos', text: 'Ao fim de cada refinamento de arquitetura, documente riscos e dependências mapeadas em canal público do squad.' },
      { icon: 'users', tag: 'Colaboração · 1 encontro/quinzena', title: 'Conduzir alinhamento cross-team de infraestrutura', text: 'Realizar checkpoint curto com Produto e Tech Leads antes de alterações de infraestrutura de checkout.' },
      { icon: 'clipboardCheck', tag: 'Evolução · Próximo ciclo', title: 'Acordo observável no PDI', text: 'Estabelecer indicador de zero bloqueios gerados por falta de aviso prévio de dependências técnicas.' }
    ],
    courseIds: ['com-1', 'col-1', 'pln-1', 'fdb-1']
  },
  'Alexandre Torres': {
    leadSummary: 'Alexandre demonstrou forte rigor na descoberta com clientes e alinhamento de hipóteses de produto. O foco prioritário do PDI é antecipar impactos de escopo com o time de engenharia e estruturar métricas claras para os próximos 30–60 dias.',
    signals: [
      { tone: 'strength', icon: 'check', title: 'Força', name: 'Descoberta profunda com clientes', text: 'Validação rigorosa de hipóteses e conexão autêntica com as dores dos usuários Enterprise.' },
      { tone: 'opportunity', icon: 'message', title: 'Oportunidade', name: 'Alinhamento antecipado com Engenharia', text: 'Tornar as decisões de produto e critérios de aceite visíveis antes dos refinamentos de sprint.' },
      { tone: 'focus', icon: 'clock', title: 'Foco do ciclo', name: 'Redução de atrito no onboarding', text: 'Focar na meta de redução de churn técnico trabalhando em conjunto com os desenvolvedores.' }
    ],
    actions: [
      { icon: 'message', tag: 'Alinhamento · Semanal', title: 'Documentar hipóteses e critérios de aceite', text: 'Compartilhar o racional de negócio e critérios técnicos de cada história 48h antes do refinamento.' },
      { icon: 'users', tag: 'Colaboração · Quinzenal', title: 'Check-in de viabilidade técnica', text: 'Conduzir dinâmica de viabilidade de produto com engenharia nas etapas iniciais de discovery.' },
      { icon: 'clipboardCheck', tag: 'PDI · 60 dias', title: 'Métricas de retenção no onboarding', text: 'Acompanhar semanalmente a queda na taxa de abandono do setup de novos clientes.' }
    ],
    courseIds: ['col-1', 'com-1', 'pln-1', 'fdb-1']
  },
  'Gustavo Bezerra': {
    leadSummary: 'Gustavo consolidou alta entrega técnica na migração de microsserviços e otimização de banco de dados. O próximo passo de desenvolvimento concentra-se em ampliar sua liderança técnica e comunicação arquitetural com outros squads.',
    signals: [
      { tone: 'strength', icon: 'check', title: 'Força', name: 'Excelência técnica e mentoria', text: 'Domínio em arquitetura de backend e disponibilidade constante para desbloquear colegas de equipe.' },
      { tone: 'opportunity', icon: 'message', title: 'Oportunidade', name: 'Articulação de arquitetura cross-squad', text: 'Compartilhar decisões arquiteturais e padrões de banco de dados com squads adjacentes.' },
      { tone: 'focus', icon: 'clock', title: 'Foco do ciclo', name: 'Protagonismo técnico', text: 'Assumir a facilitação técnica do capítulo de engenharia de backend.' }
    ],
    actions: [
      { icon: 'layers', tag: 'Arquitetura · Mensal', title: 'Apresentar estudo de caso de microsserviços', text: 'Compartilhar os aprendizados da migração de transações no Tech Talk interno da engenharia.' },
      { icon: 'users', tag: 'Mentoria · Quinzenal', title: 'Sessão de pair programming com juniores', text: 'Reservar 1 hora quinzenal para apoiar colegas juniores em queries complexas e profiling.' },
      { icon: 'clipboardCheck', tag: 'PDI · Próximo ciclo', title: 'Documentação de padrões de resiliência', text: 'Publicar guia prático de resiliência de microsserviços na base de conhecimento.' }
    ],
    courseIds: ['arq-1', 'col-1', 'fdb-1', 'com-1']
  },
  'Mariana Diamante': {
    leadSummary: 'Mariana é referência em padronização de APIs e qualidade de código no time. A oportunidade para o próximo ciclo envolve a automação de resposta a incidentes críticos e a consolidação formal de sua liderança técnica.',
    signals: [
      { tone: 'strength', icon: 'check', title: 'Força', name: 'Liderança técnica e contratos de APIs', text: 'Padronização exemplar de especificações OpenAPI e alto nível técnico nas revisões de PRs.' },
      { tone: 'opportunity', icon: 'message', title: 'Oportunidade', name: 'Automação de resiliência e MTTR', text: 'Estruturar automações de rollback para reduzir o tempo de recuperação em incidentes de severidade 1.' },
      { tone: 'focus', icon: 'clock', title: 'Foco do ciclo', name: 'Governança de serviços', text: 'Liderar o comitê de arquitetura de APIs e governança entre equipes.' }
    ],
    actions: [
      { icon: 'layers', tag: 'Engenharia · Sprint', title: 'Implementar circuit breaker e rollback automatizado', text: 'Criar pipeline automatizada de rollback para microsserviços em caso de pico de erros p99.' },
      { icon: 'users', tag: 'Liderança · Mensal', title: 'Facilitar comitê de contratos de APIs', text: 'Conduzir alinhamento com tech leads para homologar versão 2.0 dos contratos OpenAPI.' },
      { icon: 'clipboardCheck', tag: 'PDI · 90 dias', title: 'Trilha de liderança técnica', text: 'Concluir módulo de liderança técnica e conduzir feedback bilateral com liderados técnicos.' }
    ],
    courseIds: ['arq-1', 'pln-1', 'com-1', 'fdb-1']
  },
  'Aline Sordi da Silva': {
    leadSummary: 'Aline liderou com excelência a consolidação de tokens do design system e o redesign do onboarding. O próximo ciclo focará na estruturação de processos de mentoria para novos designers e expansão de métricas de impacto de design.',
    signals: [
      { tone: 'strength', icon: 'check', title: 'Força', name: 'Design Ops e impacto na experiência', text: 'Governança impecável de design system e elevação da conversão do onboarding para 88%.' },
      { tone: 'opportunity', icon: 'message', title: 'Oportunidade', name: 'Mentoria continuada em Design', text: 'Criar rituais estruturados de mentoria de design com profissionais em início de carreira.' },
      { tone: 'focus', icon: 'clock', title: 'Foco do ciclo', name: 'Métricas de Design System', text: 'Acompanhar a velocidade de desenvolvimento e adoção dos componentes entre squads.' }
    ],
    actions: [
      { icon: 'target', tag: 'Design Ops · Quinzenal', title: 'Criar design critique estruturado', text: 'Facilitar sessões quinzenais de critique com foco em acessibilidade e consistência de padrões.' },
      { icon: 'users', tag: 'Mentoria · Mensal', title: 'Acompanhamento 1:1 com designers juniores', text: 'Desenvolver trilha de boas práticas de componentes Figma e tokens semânticos.' },
      { icon: 'clipboardCheck', tag: 'PDI · 60 dias', title: 'Dashboard de métricas de adoção', text: 'Mapear percentual de telas em produção que utilizam 100% dos tokens do design system.' }
    ],
    courseIds: ['des-1', 'col-1', 'fdb-1', 'com-1']
  },
  'Isabela Vieira': {
    leadSummary: 'Isabela demonstrou atenção refinada a detalhes de interface e microinterações. O foco de aceleração do desenvolvimento é a estruturação da cadência contínua de testes de usabilidade e o avanço da conformidade de acessibilidade.',
    signals: [
      { tone: 'strength', icon: 'check', title: 'Força', name: 'Cuidado estético e sensibilidade visual', text: 'Atenção minuciosa aos detalhes de microinteração, hierarquia visual e layout dos novos fluxos.' },
      { tone: 'opportunity', icon: 'message', title: 'Oportunidade', name: 'Gestão de testes com usuários', text: 'Antecipar o recrutamento de participantes para manter cadência fixa de testes de usabilidade.' },
      { tone: 'focus', icon: 'clock', title: 'Foco do ciclo', name: 'Acessibilidade digital WCAG', text: 'Atingir 100% de conformidade WCAG AA nos fluxos principais de cadastro e checkout.' }
    ],
    actions: [
      { icon: 'target', tag: 'Usabilidade · Sprint', title: 'Montar pool prévio de usuários para testes', text: 'Criar banco de participantes qualificados em parceria com operações para agilizar os testes.' },
      { icon: 'clipboardCheck', tag: 'Acessibilidade · Quinzenal', title: 'Auditoria de acessibilidade com leitores de tela', text: 'Testar componentes críticos com NVDA e VoiceOver antes da entrega final para desenvolvimento.' },
      { icon: 'users', tag: 'PDI · Próximo ciclo', title: 'Acordo observável de conformidade', text: 'Zerar apontamentos de acessibilidade em auditorias automatizadas do front-end.' }
    ],
    courseIds: ['des-1', 'pln-1', 'com-1', 'fdb-1']
  }
};

function getLeaderConclusion(name = 'Marina Costa'){
  const pIndex = people.findIndex(p => p[0] === name);
  if (pIndex !== -1 && drafts[pIndex]) {
    const d = drafts[pIndex];
    if (d.strength || d.improve || d.summary) {
      return {
        strength: d.strength || 'Não preenchido.',
        improve: d.improve || 'Não preenchido.',
        summary: d.summary || 'Não preenchido.',
        author: 'Beatriz Rodrigues',
        role: 'Liderança de Engenharia'
      };
    }
  }
  const defaults = {
    'Marina Costa': {
      strength: 'Consistência exemplar na entrega de projetos e postura colaborativa ativa com o time. Liderou a resiliência e estabilidade da infraestrutura, mantendo disponibilidade de 99.95% no período crítico. Reconhecida por pares pela agilidade técnica.',
      improve: 'Para as próximas etapas de desenvolvimento, recomenda-se antecipar o compartilhamento de riscos em cenários de alta complexidade com os stakeholders, evitando bloqueios tardios em sprints.',
      summary: 'No ciclo 2025.1, Marina consolidou uma trajetória de excelência e alta entrega técnica. O cumprimento das metas de infraestrutura comprovou sua autonomia. O foco prioritário para o próximo ciclo será fortalecer a comunicação proativa de riscos e formalizar ações no Plano de Desenvolvimento Individual (PDI).'
    },
    'Alexandre Torres': {
      strength: 'Excelente condução das dinâmicas de descoberta com clientes Enterprise, validando hipóteses com rigor analítico e clareza de proposta de valor para o produto.',
      improve: 'Aprofundar a interlocução prévia com o time de engenharia ao ajustar escopos, garantindo que impedimentos técnicos sejam mapeados antes dos sprints.',
      summary: 'Alexandre teve papel fundamental na consolidação da visão de produto do trimestre. Para o próximo ciclo, o alinhamento com a engenharia será a chave para acelerar a entrega da nova experiência de onboarding.'
    },
    'Gustavo Bezerra': {
      strength: 'Forte espírito colaborativo e mentoria ativa aos colegas de equipe. Conduziu a migração de microsserviços com autonomia técnica e atingiu 100% da meta de otimização de consultas críticas.',
      improve: 'Continuar ampliando sua participação nas decisões de arquitetura e liderança técnica de iniciativas maiores do squad.',
      summary: 'Gustavo demonstrou alto amadurecimento profissional e consistência nas entregas backend. Tem potencial claro para assumir protagonismo técnico crescente nos próximos ciclos.'
    },
    'Mariana Diamante': {
      strength: 'Atuação como referência técnica e padronizadora de APIs no time. Seus alinhamentos e revisões elevaram expressivamente a qualidade do código de todo o grupo.',
      improve: 'Automatizar rotinas de rollback e monitoramento de falhas para reduzir o MTTR em incidentes de severidade 1.',
      summary: 'Mariana é um pilar de qualidade e documentação na engenharia. O próximo ciclo consolidará sua transição para uma liderança técnica formal com apoio das trilhas de PDI.'
    },
    'Aline Sordi da Silva': {
      strength: 'Liderança inspiradora no processo de design ops e governança de tokens do design system. Conduziu o redesign do fluxo de admissão atingindo 88% de conclusão de perfil.',
      improve: 'Estruturar planos de mentoria continuada para designers juniores e sistematizar a documentação de decisões de produto.',
      summary: 'Aline realizou um trimestre de altíssimo impacto no produto e na experiência dos clientes. Segue como referência sólida e exemplo para a área de Design.'
    },
    'Isabela Vieira': {
      strength: 'Sensibilidade visual notável e cuidado minucioso com a consistência de interface e acessibilidade digital nos novos fluxos desenvolvidos.',
      improve: 'Planejar com mais antecedência o recrutamento de usuários para testes de usabilidade e definir metas observáveis para o PDI em acessibilidade.',
      summary: 'Isabela apresentou evolução nítida ao longo do período. O direcionamento do próximo ciclo concentrará apoio na governança de testes e cumprimento integral das metas de conformidade WCAG.'
    }
  };

  const c = defaults[name] || defaults['Marina Costa'];
  return {
    ...c,
    author: 'Beatriz Rodrigues',
    role: 'Liderança de Engenharia'
  };
}

function getPersonQuality(name, status = 'pending') {
  if (peopleQualityData[name]) {
    const q = { ...peopleQualityData[name] };
    if (status === 'pending') {
      q.completeness = 'Pendente: não iniciada';
      q.completenessFull = false;
    } else if (status === 'waiting') {
      q.completeness = '75% · Em preenchimento';
      q.completenessFull = false;
    }
    return q;
  }
  const hash = Array.from(name).reduce((sum, c) => sum + c.charCodeAt(0), 0);
  const isReview = (hash % 3) === 0;
  const score = isReview ? 58 + (hash % 10) : 75 + (hash % 22);
  const tier = score >= 90 ? 'excellent' : score >= 70 ? 'consistent' : 'review';
  const tierLabel = tier === 'excellent' ? 'Excelente' : tier === 'consistent' ? 'Consistente' : 'Merece revisão';
  const aiUsed = (hash % 2) === 0;
  const aiEdited = aiUsed ? (hash % 4 !== 0) : false;
  return {
    completeness: status === 'pending' ? 'Pendente: não iniciada' : status === 'waiting' ? '75% · Em preenchimento' : '100% · Fontes completas',
    completenessFull: status === 'sent',
    score,
    tier,
    tierLabel,
    aiUsed,
    aiEdited,
    criteria: [
      { name: 'Exemplos e fatos concretos', points: isReview ? '+12 pts' : '+24 pts', ok: !isReview, detail: isReview ? 'Faltam exemplos específicos de entregas ou momentos do ciclo.' : 'Traz referências concretas de entregas no período.' },
      { name: 'Fundamentação de pontos fortes e melhoria', points: isReview ? '+14 pts' : '+23 pts', ok: !isReview, detail: isReview ? 'Pontos de melhoria carecem de justificativa com base na rotina.' : 'Explica claramente o racional de cada ponto avaliado.' },
      { name: 'Próximos passos e plano de ação', points: isReview ? '+12 pts' : '+24 pts', ok: !isReview, detail: isReview ? 'O próximo passo é vago e não orienta a conversa 1:1.' : 'Apresenta próximos passos acionáveis para o PDI.' },
      { name: 'Coerência com evidências do ciclo', points: '+20 pts', ok: true, detail: 'Coerente com a matriz de competências do ciclo.' }
    ],
    issues: isReview ? ['Faltam exemplos concretos', 'Próximos passos não estão claros'] : []
  };
}

document.querySelectorAll('.sidebar-glyph[data-icon]').forEach(el=>{el.innerHTML=icon(el.dataset.icon,18)});
const chip=(label,tone='neutral',iconName='',extraClass='')=>`<span class="chip chip-${tone} ${extraClass}">${iconName?icon(iconName,12):''}<span>${esc(label)}</span></span>`;
const badge=s=>chip(labels[s],s==='sent'?'success':s==='waiting'?'info':'warning',s==='sent'?'check':'clock',`badge ${s}`);
const avatarIds={'Marina Costa':47,'Alexandre Torres':12,'Gustavo Bezerra':11,'Mariana Diamante':44,'Aline Sordi da Silva':32,'Isabela Vieira':49,'Alex Silva':15,'Amanda Lopes':45,'Augusto Rodrigues':13,'Juliana Nogueira':48,'Felipe Lima':53,'Beatriz Rodrigues':43,'Turah Xavier':42,'João Silva':14};
const avatarId=n=>avatarIds[n]||((Array.from(n).reduce((sum,c)=>sum+c.charCodeAt(0),0)%70)+1);
const who=(n,r='Analista')=>`<div class="who"><img class="avatar" src="https://i.pravatar.cc/96?img=${avatarId(n)}" alt="Foto de ${esc(n)}"><span><strong>${esc(n)}</strong><small>${esc(r)}</small></span></div>`;
const feedbackMeta=(glyph,label,value,raw=false)=>`<div class="feedback-field feedback-meta">${icon(glyph,16)}<span class="sr-only">${label}: </span>${raw?value:`<strong>${esc(value)}</strong>`}</div>`;
const feedbackStatus=closed=>`<div class="feedback-field feedback-status"><span class="sr-only">Status: </span><span class="cycle-status ${closed?'closed':'open'}">${closed?'Finalizada':'Aberta'}</span></div>`;
const progress=(a,b,c)=>`<div class="progress"><span style="width:${a}%"></span><span style="width:${b}%"></span><span style="width:${c}%"></span></div>`;
function toast(t){const el=document.querySelector('#toast');el.textContent=t;el.style.display='block';clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.style.display='none',3500)}
function modal(html){document.querySelector('#modal-body').innerHTML=html;document.querySelector('#modal').showModal()}
function info(){modal('<h2>Avaliações do ciclo</h2><p>Competências · Colaboração · Comunicação · Entregas · Desenvolvimento · Autoavaliação</p><p class="muted">Dados ilustrativos desta demonstração.</p>')}
function heading(title,sub='',action=''){return `<div class="heading"><div><h1>${title}</h1>${sub?`<p>${sub}</p>`:''}</div>${action}</div>`}

function showQualityModal(personName) {
  const q = getPersonQuality(personName, 'sent');
  const aiNotice = q.aiUsed
    ? (q.aiEdited ? 'Gerado com apoio de IA e personalizado pelo líder' : 'Gerado com apoio de IA (sem edições adicionais)')
    : 'Redigido diretamente pelo líder (sem uso de IA)';
  const tierTone = q.tier === 'excellent' ? 'success' : q.tier === 'consistent' ? 'info' : 'warning';
  const tierIcon = q.tier === 'review' ? 'alertTriangle' : 'checkCircle';

  const html = `
    <h2>Qualidade do Conteúdo: ${esc(personName)}</h2>
    <div class="compact-meta">
      <span>${icon('file', 14)} <strong>Auditoria de Devolutiva · RH</strong></span>
      <span class="meta-divider" aria-hidden="true"></span>
      <span class="chip chip-${tierTone}">${icon(tierIcon, 12)} Score ${q.score}/100 · ${q.tierLabel}</span>
      <span class="meta-divider" aria-hidden="true"></span>
      <span>${esc(aiNotice)}</span>
    </div>

    <div class="notice">
      ${icon('info', 14)} <strong>Regra de Governança:</strong> O score avalia a <em>utilidade prática da devolutiva escrita</em> (exemplos concretos, equilíbrio de forças/melhoria, próximos passos claros e coerência), e <strong>NÃO</strong> a habilidade de escrita do líder nem o uso da IA. A IA é neutra no cálculo (0 pts).
    </div>

    <div class="section-head" style="margin:22px 0 8px">
      <h3>Critérios que formaram este score (0 a 100)</h3>
      <p class="section-description">Avaliação em 4 dimensões essenciais para subsidiar uma conversa 1:1 de desenvolvimento.</p>
    </div>

    <div class="competencies-list">
      ${q.criteria.map(c => `
        <details class="competency">
          <summary>
            <div class="competency-main">
              <span class="competency-icon">${icon(c.ok ? 'checkCircle' : 'alertTriangle', 15)}</span>
              <span class="competency-title">${esc(c.name)}</span>
            </div>
            <div class="competency-meta">
              <span class="chip chip-${c.ok ? 'success' : 'warning'}">${esc(c.points)}</span>
              <span class="competency-chevron" aria-hidden="true">${icon('chevronRight', 16)}</span>
            </div>
          </summary>
          <div class="conclusion-text">
            ${esc(c.detail)}
          </div>
        </details>
      `).join('')}
    </div>

    <div class="compact-meta" style="margin-top:20px;padding-top:16px;border-top:1px solid var(--line)">
      <span>Completude: <strong>${esc(q.completeness)}</strong></span>
      <span class="meta-divider" aria-hidden="true"></span>
      <span>Supervisão humana: <strong>${q.aiEdited ? 'Revisado pelo líder' : 'Original mantido'}</strong></span>
      <span class="meta-divider" aria-hidden="true"></span>
      <span>Impacto no Score: <strong>Neutro (0 pts)</strong></span>
    </div>

    <div class="actions" style="margin-top:24px">
      <button type="button" class="tertiary" onclick="document.querySelector('#modal').close()">Fechar</button>
      <button type="button" class="primary" onclick="document.querySelector('#modal').close();showReport('${esc(personName)}')">Ver relatório completo</button>
    </div>
  `;
  modal(html);
}

function showScoreGovernanceModal(){
  const html = `
    <h2>Políticas e Governança do Score de Devolutiva</h2>
    <div class="compact-meta">
      <span>${icon('clipboardCheck', 14)} <strong>Escala Objetiva 0–100</strong></span>
      <span class="meta-divider" aria-hidden="true"></span>
      <span>${icon('users', 14)} <strong>Matriz de Permissões</strong></span>
      <span class="meta-divider" aria-hidden="true"></span>
      <span>${icon('sparkles', 14)} <strong>Uso de IA Neutro</strong></span>
    </div>

    <div class="notice">
      ${icon('info', 14)} <strong>Princípio Fundamental:</strong> O score avalia exclusivamente a <em>utilidade prática da devolutiva</em> para a conversa de desenvolvimento e alinhamento de expectativas. Ele não avalia habilidade de escrita, não ranqueia líderes publicamente e não pune nem premia o uso assistivo de IA.
    </div>

    <div class="section-head" style="margin:24px 0 10px">
      <h3>1. Critérios Objetivos de Pontuação (0 a 100 pts)</h3>
      <p class="section-description">A devolutiva é estruturada em 4 dimensões de igual peso (25 pontos cada).</p>
    </div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Dimensão</th>
            <th>Peso</th>
            <th>O que avalia</th>
            <th>Sinal de alerta (< 18 pts)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Exemplos e fatos concretos</strong></td>
            <td><span class="chip chip-info">25 pts</span></td>
            <td>Citação de projetos, entregas ou situações observáveis do ciclo.</td>
            <td>Afirmações genéricas ("foi bem", "entregou tudo").</td>
          </tr>
          <tr>
            <td><strong>Fundamentação de forças e melhorias</strong></td>
            <td><span class="chip chip-info">25 pts</span></td>
            <td>Equilíbrio e explicação do impacto prático das atitudes.</td>
            <td>Críticas vagas ("melhorar comunicação") sem contexto.</td>
          </tr>
          <tr>
            <td><strong>Próximos passos e acordos</strong></td>
            <td><span class="chip chip-info">25 pts</span></td>
            <td>Ações claras, mensuráveis ou temas para o PDI e a conversa 1:1.</td>
            <td>Falta de direcionamento prático para os próximos 30–60 dias.</td>
          </tr>
          <tr>
            <td><strong>Coerência com evidências</strong></td>
            <td><span class="chip chip-info">25 pts</span></td>
            <td>Consistência com notas de competências, OKRs e feedbacks contínuos.</td>
            <td>Contradição evidente com as evidências registradas no período.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section-head" style="margin:28px 0 10px">
      <h3>2. Matriz de Permissões e Confidencialidade</h3>
      <p class="section-description">Regras de visibilidade desenhadas para preservar a segurança psicológica no diálogo.</p>
    </div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Perfil</th>
            <th>Score 0–100</th>
            <th>Critérios e Alertas</th>
            <th>Finalidade do acesso</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Líder (Gestor)</strong></td>
            <td><span class="chip chip-success">Sim (Pré-envio)</span></td>
            <td><span class="chip chip-success">Sim (Perguntas reflexivas)</span></td>
            <td>Autocorreção e enriquecimento do texto antes do envio oficial.</td>
          </tr>
          <tr>
            <td><strong>RH (Pessoas & Cultura)</strong></td>
            <td><span class="chip chip-info">Sim (Visão geral)</span></td>
            <td><span class="chip chip-info">Sim (Auditoria consultiva)</span></td>
            <td>Identificar líderes que precisam de mentoria e suporte pedagógico.</td>
          </tr>
          <tr>
            <td><strong>Colaborador</strong></td>
            <td><span class="chip chip-neutral">Não (Oculto)</span></td>
            <td><span class="chip chip-neutral">Não (Oculto)</span></td>
            <td>Preservar a segurança psicológica; o foco é o conteúdo humano e o PDI.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section-head" style="margin:28px 0 10px">
      <h3>3. Políticas de Intervenção e Alertas do RH</h3>
      <p class="section-description">Como o RH atua com base nos indicadores sem microgerenciamento punitivo.</p>
    </div>
    <div class="conclusion-topics">
      <div class="conclusion-topic">
        <h4>Faixa &lt; 70 pts · Merece revisão</h4>
        <div class="conclusion-text">Sinaliza devolutiva com risco de frustração por falta de exemplos ou próximos passos vagos. O RH oferece suporte consultivo e sugere que o líder utilize o assistente com fontes ou revise as evidências antes do 1:1. O envio não é bloqueado de forma punitiva.</div>
      </div>
      <div class="conclusion-topic">
        <h4>Faixa 70–89 pts · Consistente</h4>
        <div class="conclusion-text">Devolutiva balanceada e apta para guiar o alinhamento de desenvolvimento.</div>
      </div>
      <div class="conclusion-topic">
        <h4>Faixa 90–100 pts · Excelente</h4>
        <div class="conclusion-text">Referência em contextualização com OKRs e alta clareza de acordos para o próximo ciclo.</div>
      </div>
    </div>

    <div class="actions" style="margin-top:24px">
      <button type="button" class="primary" onclick="document.querySelector('#modal').close()">Fechar políticas</button>
    </div>
  `;
  modal(html);
}

function rh(){
  const closed=location.hash.split('/')[2]==='1';
  const leaderTotals=closed?[0,0,leaders.length]:leaders.reduce((totals,leader)=>{if(leader.counts[2]===leader.teamSize)totals[2]++;else if(leader.counts[0]===leader.teamSize)totals[0]++;else totals[1]++;return totals},[0,0,0]);
  const filters=[['all','Todos',leaders.length,''],['pending','Pendentes',leaderTotals[0],'pending'],['waiting','Em andamento',leaderTotals[1],'waiting'],['sent','Finalizados',leaderTotals[2],'sent']];
  rhPage=1;rhFilter='all';rhArea='all';
  app.innerHTML=heading(esc(plan),'',`<div class="rh-heading-actions"><button type="button" class="rh-score-info tertiary icon-button" aria-label="Políticas e pesos do score" title="Políticas e pesos do score" onclick="showScoreGovernanceModal()">${icon('info',18)}</button><details class="rh-more"><summary aria-label="Mais opções" title="Mais opções">${icon('more',20)}</summary><div class="rh-more-menu"><button type="button" onclick="this.closest('details').removeAttribute('open');editPlan()">${icon('edit',16)} Editar</button></div></details></div>`)+`<section class="rh-content"><div class="compact-meta"><span>${icon('layers')} <strong>2025.1</strong></span><span>${icon('calendar')} <strong>24 fev 2025 – 04 abr 2025</strong></span><span class="meta-deadline">${icon('clock')} <strong>Faltam 12 dias</strong></span><span class="meta-divider" aria-hidden="true"></span><button class="tertiary" onclick="info()">${icon('file')} <strong>6 avaliações</strong></button><span>${icon('users')} <strong>50 líderes · Engenharia e Design</strong></span></div><div class="toolbar rh-toolbar"><div class="rh-filter-group" role="group" aria-label="Filtrar líderes por status">${filters.map(([state,label,count,tone])=>`<button type="button" class="rh-filter ${tone}" data-state="${state}" aria-pressed="${state==='all'}" onclick="setRhFilter('${state}')">${tone?'<i aria-hidden="true"></i>':''}<span>${label}</span><b>${count}</b></button>`).join('')}</div><div class="rh-toolbar-controls"><label class="rh-area-filter"><span>Área</span><select id="rh-area" aria-label="Filtrar líderes por área" onchange="setRhArea(this.value)"><option value="all">Todas as áreas</option>${['Produto','Engenharia','Design','Comercial','Operações'].map(area=>`<option value="${area}">${area}</option>`).join('')}</select></label><label class="rh-search">${icon('search',18)}<input id="search" aria-label="Buscar por nome ou cargo" placeholder="Buscar por nome ou cargo…" oninput="rhPage=1;filterLeaders()"></label></div></div><div class="table-wrap rh-leader-table"><table><thead><tr><th>Líder</th><th>Liderados</th><th>Andamento das devolutivas</th><th aria-label="Qualidade dos relatórios"></th><th class="end" aria-label="Enviar e-mail"></th></tr></thead><tbody id="leaders"></tbody></table></div><div class="rh-pagination" id="rh-pagination"></div></section>`;
  filterLeaders();
}
let rhFilter='all',rhArea='all';
function setRhFilter(state){rhFilter=state;rhPage=1;document.querySelectorAll('.rh-filter').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.state===state)));filterLeaders()}
function setRhArea(area){rhArea=area;rhPage=1;filterLeaders()}
function filterLeaders(){
  const query=document.querySelector('#search').value.toLowerCase();
  const closed=location.hash.split('/')[2]==='1';
  const areaLeaders=leaders.map((leader,i)=>({leader,i,counts:closed?[0,0,leader.teamSize]:leader.counts,state:closed?'sent':leader.counts[2]===leader.teamSize?'sent':leader.counts[0]===leader.teamSize?'pending':'waiting'})).filter(({leader})=>rhArea==='all'||leader.role===`Liderança de ${rhArea}`);
  document.querySelectorAll('.rh-filter').forEach(button=>{button.querySelector('b').textContent=button.dataset.state==='all'?areaLeaders.length:areaLeaders.filter(item=>item.state===button.dataset.state).length});
  const matching=areaLeaders.filter(({leader,state})=>(leader.name+' '+leader.role).toLowerCase().includes(query)&&(rhFilter==='all'||state===rhFilter));
  const pages=Math.max(1,Math.ceil(matching.length/rhPageSize));rhPage=Math.min(rhPage,pages);
  const visible=matching.slice((rhPage-1)*rhPageSize,rhPage*rhPageSize);
  document.querySelector('#leaders').innerHTML=visible.map(({leader,i,counts})=>{
    let reviewCount = 0;
    for (let j = 0; j < counts[2]; j++) {
      const p = teamPeople[(i + j) % teamPeople.length];
      const q = getPersonQuality(p[0], 'sent');
      if (q.tier === 'review') reviewCount++;
    }

    return `<tr>
      <td>
        <div class="leader-identity">
          <button type="button" class="team-toggle tertiary" aria-expanded="false" aria-controls="team-${i}" aria-label="Expandir ${leader.teamSize} liderados de ${esc(leader.name)}" onclick="expandLeader(${i},this)">${icon('chevronRight',16)}</button>
          ${who(leader.name,leader.role)}
        </div>
      </td>
      <td class="end"><span class="leader-team-count" aria-label="${leader.teamSize} liderados">${icon('users',16)} <strong>${leader.teamSize}</strong></span></td>
      <td>
        <div class="leader-status">
          <small class="progress-labels">
            ${[['pendentes',counts[0]],['aguardando envio',counts[1]],['enviados',counts[2]]].filter(([,value])=>value>0).map(([label,value])=>`<span>${value} ${label}</span>`).join('')}
          </small>
          <div class="progress" role="img" aria-label="${counts[0]} pendentes, ${counts[1]} aguardando envio e ${counts[2]} enviados para ${esc(leader.name)}">
            <span style="width:${counts[0]/leader.teamSize*100}%"></span>
            <span style="width:${counts[1]/leader.teamSize*100}%"></span>
            <span style="width:${counts[2]/leader.teamSize*100}%"></span>
          </div>
        </div>
      </td>
      <td class="leader-review-cell">
        ${reviewCount > 0
          ? `<span class="leader-review-tag" title="${reviewCount} devolutivas merecem revisão de conteúdo">${icon('alertTriangle',14)} <strong>${reviewCount} merecem revisão</strong></span>`
          : counts[2] > 0
            ? `<span class="leader-review-clear">${icon('checkCircle',14)} Sem revisão</span>`
            : `<span class="leader-review-empty" aria-label="Ainda não há relatórios enviados">—</span>`}
      </td>
      <td class="end">
        <button type="button" class="leader-email tertiary icon-button" aria-label="Enviar e-mail para ${esc(leader.name)}" title="Enviar e-mail" onclick="emailLeader(${i})">${icon('mail',18)}</button>
      </td>
    </tr>
    <tr class="leader-team-row" id="team-${i}" hidden>
      <td colspan="5">
        <div class="leader-team">
          ${Array.from({length:leader.teamSize},(_,j)=>{
            const p = teamPeople[(i+j)%teamPeople.length];
            const status = j<counts[2]?'sent':j<counts[2]+counts[1]?'waiting':'pending';
            const q = getPersonQuality(p[0], status);
            return `<div class="team-person">
              ${who(p[0],p[1])}
              ${badge(status)}
              <div class="team-meta-indicators">
                ${status === 'sent' 
                  ? `<span class="team-quality-label ${q.tier === 'review' ? 'needs-review' : ''}" title="Indicador ilustrativo da qualidade do relatório">${icon(q.tier === 'review' ? 'alertTriangle' : 'checkCircle', 15)} Score ${q.score}/100 · ${q.tierLabel}</span>` 
                  : status === 'waiting' ? `<span class="team-completeness-text">${esc(q.completeness)}</span>` : ''}
              </div>
              <button type="button" class="tertiary" onclick="showReport('${esc(p[0])}')">Relatório</button>
            </div>`;
          }).join('')}
        </div>
      </td>
    </tr>`;
  }).join('')||'<tr><td colspan="5" class="empty">Nenhum líder encontrado.</td></tr>';
  document.querySelector('#rh-pagination').innerHTML=`<span>Mostrando ${matching.length?((rhPage-1)*rhPageSize)+1:0}–${Math.min(rhPage*rhPageSize,matching.length)} de ${matching.length} líderes</span><div><button class="tertiary" ${rhPage===1?'disabled':''} onclick="rhPage--;filterLeaders()">${icon('arrowLeft',15)} Anterior</button><strong>${rhPage} de ${pages}</strong><button class="tertiary" ${rhPage===pages?'disabled':''} onclick="rhPage++;filterLeaders()">Próxima ${icon('chevronRight',15)}</button></div>`;
}
function expandLeader(i,button){const row=document.querySelector('#team-'+i);row.hidden=!row.hidden;button.setAttribute('aria-expanded',String(!row.hidden));button.setAttribute('aria-label',`${row.hidden?'Expandir':'Recolher'} ${leaders[i].teamSize} liderados de ${leaders[i].name}`)}
function emailLeader(i){const l=leaders[i],first=esc(l.name.split(' ')[0]),pend=(l.pending||0)+(l.waiting||0);modal(`<div class="email-modal"><h2>Lembrar líder das devolutivas</h2><div class="email-to"><span>Para</span>${who(l.name,l.role||'Liderança')}</div><label class="email-field">Assunto<input id="email-subject" value="Devolutivas do ciclo 2025.1: faltam 12 dias"></label><label class="email-field">Mensagem<textarea id="email-body" rows="8">Olá, ${first}!\n\nO prazo das devolutivas do ciclo 2025.1 termina em 12 dias, e ${pend>0?pend+' pessoa'+(pend>1?'s':'')+' do seu time ainda '+(pend>1?'estão':'está')+' sem a devolutiva enviada':'ainda há devolutivas para revisar'}.\n\nO relatório individual de cada pessoa já está na plataforma e a Gupy IA pode sugerir a conclusão para você revisar.\n\nQualquer dúvida, estou à disposição.\nMarina, RH</textarea></label><p class="muted email-note">O e-mail sai pela plataforma com o link direto para as devolutivas pendentes.</p><div class="actions"><button type="button" class="tertiary" onclick="document.querySelector('#modal').close()">Cancelar</button><button type="button" class="primary" onclick="document.querySelector('#modal').close();toast('Lembrete enviado para ${esc(l.name)}')">Enviar lembrete</button></div></div>`)}
function editPlan(){modal(`<h2>Editar devolutiva</h2><label>Nome da devolutiva<input id="plan-name" value="${esc(plan)}"></label><button class="primary" onclick="savePlan()">Salvar alterações</button><hr>`)}
function savePlan(){const value=document.querySelector('#plan-name').value.trim();if(!value)return;plan=value;persist();document.querySelector('#modal').close();rh();toast('Alterações salvas')}
function manager(){const count=s=>people.filter(p=>p[2]===s).length;app.innerHTML=heading(esc(plan),'Veja o relatório individual e prepare a devolutiva de cada pessoa.')+`<div class="manager-layout"><aside-box class="card info"><h3>Informações</h3><div><small>Nome da devolutiva</small><strong>${esc(plan)}</strong></div><div><small>Período</small>23/02/2024 — 03/04/2024</div><div><small>Ciclo de referência</small>2025.1</div><div><small>Avaliações referentes</small><button onclick="info()">6 avaliações</button></div><hr><small>Status</small>${progress(...['pending','waiting','sent'].map(s=>count(s)/6*100))}${['pending','waiting','sent'].map(s=>`<p>${badge(s)} <b>${count(s)}</b></p>`).join('')}</aside-box><section class="card"><div class="report-head"><h2>Liderados</h2><small>Total: 6 pessoas</small></div><div class="table-wrap"><table><thead><tr><th>Nome</th><th>Status</th><th></th></tr></thead><tbody>${people.map((p,i)=>`<tr><td>${who(p[0],p[1])}</td><td>${badge(p[2])}</td><td class="end">${p[2]==='sent'?`<button onclick="showReport('${p[0]}')">Visualizar</button>`:`<a class="${p[2]==='pending'?'primary':''}" style="border-radius:99px;padding:9px 16px;display:inline-block" href="#gestor/editar/${i}">${p[2]==='pending'?'Responder':'Revisar e enviar'}</a>`}</td></tr>`).join('')}</tbody></table></div></section></div>`}
function okrsSection(name='Marina Costa', initiallyOpen=false){
  const okrs = personOkrsData[name] || personOkrsData['Marina Costa'];

  return `<section class="okrs-section">
    <div class="section-head">
      <h3>Objetivos e OKRs <span class="editor-new-tag">Novo</span></h3>
      <p class="section-description">Acompanhamento dos resultados-chave do período como evidência de contexto e esforço.</p>
    </div>
    <div class="competencies-list">
      ${okrs.map(o=>`
        <details class="competency" ${initiallyOpen?'open':''}>
          <summary>
            <div class="competency-main">
              <span class="competency-icon">${icon('target', 16)}</span>
              <span class="competency-title">${esc(o.title)} <small class="muted">(${esc(o.period)})</small></span>
            </div>
            <div class="competency-meta">
              <span class="chip chip-${o.tone}">${esc(o.status)} · ${o.progress}%</span>
              <span class="competency-chevron" aria-hidden="true">${icon('chevronRight', 16)}</span>
            </div>
          </summary>
          <p><strong>Resultado-chave (KR):</strong> ${esc(o.kr)}</p>
          <p><strong>Esperado:</strong> ${esc(o.expected)} &nbsp;·&nbsp; <strong>Alcançado:</strong> <strong>${esc(o.achieved)}</strong></p>
          <div class="conclusion-text">
            <strong>Contexto informado pela liderança:</strong> ${esc(o.context)}
          </div>
        </details>
      `).join('')}
    </div>
  </section>`;
}

function feedbacksSection(name='Marina Costa', initiallyOpen=false){
  const data = personFeedbacksData[name] || personFeedbacksData['Marina Costa'];
  const { total, breakdown, themes, quotes } = data;

  return `<section class="cycle-feedbacks-section">
    <div class="section-head">
      <h3>Feedbacks ao longo do ciclo <span class="editor-new-tag">Novo</span></h3>
      <p class="section-description">Registros contínuos de trocas e 1:1s durante o período avaliado.</p>
    </div>
    <div class="compact-meta feedback-summary">
      <span>${icon('messagesSquare', 14)} <strong>${total} feedbacks registrados</strong></span>
      <span class="meta-divider" aria-hidden="true"></span>
      <span>${icon('users', 14)} <strong>${esc(breakdown)}</strong></span>
    </div>
    <div class="feedback-themes">${themes.map(t=>`<span class="chip chip-neutral">${esc(t)}</span>`).join('')}</div>
    <div class="competencies-list">
      ${quotes.map(q=>`
        <details class="competency" ${initiallyOpen?'open':''}>
          <summary>
            <div class="competency-main">
              <span class="competency-icon">${icon('message', 16)}</span>
              <span class="competency-title">${esc(q.author)} <small class="muted">(${esc(q.role)})</small></span>
            </div>
            <div class="competency-meta">
              <span class="chip chip-info">${esc(q.type)}</span>
              <small class="muted">${esc(q.date)}</small>
              <span class="competency-chevron" aria-hidden="true">${icon('chevronRight', 16)}</span>
            </div>
          </summary>
          <div class="conclusion-text">
            “${esc(q.text)}”
          </div>
        </details>
      `).join('')}
    </div>
  </section>`;
}

function report(name='Marina Costa', role='Analista', separateFeedback=false, showFeedback=true){
  const personFound = people.find(p => p[0] === name);
  const displayRole = personFound ? personFound[1] : role;
  const competencies=[
    {title:'Juntos somos mais fortes',description:'Colabora com o time, compartilha conhecimento e contribui para as entregas em conjunto.',comments:5,text:'Demonstra forte espírito de equipe e proatividade para apoiar os colegas nos momentos de maior demanda.'},
    {title:'Ser referência',description:'Demonstra domínio nas atividades e busca aprimorar a qualidade das entregas.',comments:4,text:'Apresenta entregas consistentes com alta qualidade técnica e serve de exemplo para os demais.'},
    {title:'Comunicação e colaboração',description:'Comunica decisões com clareza e alinha expectativas com frequência.',comments:3,text:'Comunica decisões com clareza. Pode antecipar riscos e alinhar expectativas com mais frequência.'}
  ];
  return `<section class="card report">
    <div class="report-top-row">
      ${who(name, displayRole)}
      <div class="report-top-meta">
        <span>Líder: <strong>Beatriz Rodrigues</strong></span>
        <span>Ciclo: <strong>2025.1</strong></span>
        <button type="button" class="tertiary icon-button report-header-1on1-btn" onclick="prepareOneOnOne('${esc(name)}')">${icon('messagesSquare', 14)} Roteiro 1:1</button>
      </div>
    </div>
    <div class="report-body">
    <div class="section-head">
      <h3>Competências</h3>
      <p class="section-description">Avaliação qualitativa com base nas competências comportamentais e organizacionais demonstradas no ciclo.</p>
    </div>
    <div class="chart-block">
      <div class="charts">
        <div>
          <div class="donut" style="background:conic-gradient(#3694d9 0 50%,#afd06b 50% 87.5%,#f28d36 87.5% 100%)"><div><b>8</b><small>Respostas</small></div></div>
          <p class="chart-caption">Distribuição consolidada das avaliações</p>
        </div>
        <div>
          <div class="bars">
            <div><div class="bar"><i style="background:#3694d9;height:100%">100%</i></div><small>Líder</small></div>
            <div><div class="bar"><i style="background:#afd06b;height:50%">50%</i><i style="background:#3694d9;height:50%">50%</i></div><small>Pares</small></div>
            <div><div class="bar"><i style="background:#afd06b;height:50%">50%</i><i style="background:#f28d36;height:50%">50%</i></div><small>Outros</small></div>
            <div><div class="bar"><i style="background:#3694d9;height:100%">100%</i></div><small>Auto</small></div>
          </div>
          <p class="chart-caption">Respostas por perspectiva de avaliação</p>
        </div>
      </div>
      <div class="chart-legend-row qualitative-legend">
        <span><i style="background:#afd06b"></i> Referência</span>
        <span><i style="background:#3694d9"></i> Esperado</span>
        <span><i style="background:#f28d36"></i> Em desenvolvimento</span>
        <span><i style="background:#92969f"></i> Não observado</span>
      </div>
    </div>
    <div class="competencies-list">
      ${competencies.map((c,i)=>`<details class="competency"><summary><div class="competency-main"><span class="competency-icon" aria-hidden="true">${icon('clipboardCheck',16)}</span><span class="competency-title">${c.title}</span><span class="competency-comments" title="Comentários recebidos">${icon('messagesSquare',14)} <span>${c.comments}</span></span></div><div class="competency-meta"><span class="assessment-scale">Qualitativa</span><span class="competency-chevron" aria-hidden="true">${icon('chevronRight',16)}</span></div></summary><p>${c.text}</p><p><b>Percepção da liderança:</b> Dentro do esperado.</p><p><b>Autoavaliação:</b> Dentro do esperado.</p></details>`).join('')}
    </div>
    ${performance()}
    ${okrsSection(name)}
    ${separateFeedback || !showFeedback?'':feedbacksSection(name)}
    </div>
  </section>${separateFeedback?`<section class="card editor-feedback-card"><div class="report-body">${feedbacksSection(name,false)}</div></section>`:''}`
}
function showReport(name){
  const person = people.find(p => p[0] === name);
  const role = person ? person[1] : 'Engenheira de Software';
  modal(`<div class="report-modal"><div class="report-modal-header"><h2>Relatório de devolutiva · ${esc(name)}</h2></div>${report(name, role)}${leaderConclusion(name)}</div>`);
}
function collaborator(){app.innerHTML=`<div class="collaborator-list-page">${heading('Minhas devolutivas','Acompanhe as devolutivas recebidas e consulte seu histórico de desenvolvimento.')}<section class="feedback-list">${['2025.1','2024.2'].map((cycle,i)=>`<a class="feedback-row" href="#colaborador/relatorio/${i}"><strong class="feedback-name">Devolutiva Geral ${cycle}</strong>${feedbackMeta('users','Líder',who('Beatriz Rodrigues','Design de Produto I'),true)}${feedbackMeta('layers','Ciclo de referência',i?'2024.2':'2025.1')}${feedbackStatus(!!i)}<span class="row-chevron">${icon('chevronRight',18)}</span></a>`).join('')}</section></div>`}
function cycleSelector(role){const isRh=role==='rh',title=isRh?'Devolutivas':'Devolutivas da equipe',subtitle=isRh?'Escolha uma devolutiva para acompanhar o andamento do ciclo.':'Escolha uma devolutiva para acompanhar e preparar as conversas da equipe.',cycles=[['Devolutiva Engenharia 2025.1','2025.1','24 fev 2025 – 04 abr 2025',isRh?'6 líderes · Engenharia e Design':'6 liderados'],['Devolutiva Produto 2024.2','2024.2','19 ago 2025 – 27 set 2025',isRh?'5 líderes · Produto':'5 liderados']];app.innerHTML=`<div class="collaborator-list-page role-list-page">${heading(title,subtitle)}<section class="feedback-list">${cycles.map((item,i)=>`<a class="feedback-row" href="#${role}/ciclo/${i}"><strong class="feedback-name">${item[0]}</strong>${feedbackMeta('layers','Ciclo de referência',item[1])}${feedbackMeta('calendar','Período',item[2])}${feedbackMeta('users',isRh?'Público':'Equipe',item[3])}${feedbackStatus(!!i)}<span class="row-chevron">${icon('chevronRight',18)}</span></a>`).join('')}</section></div>`}
const scoreColors=['#a50e1b','#cd1929','#ed263b','#f34d59','#ef7911','#f4ad37','#56c66c','#39ac51','#2f9441','#267536'];
function performance(){
  const perfList=[
    {title:'Juntos somos mais fortes',comments:5},
    {title:'Liderança',comments:5},
    {title:'Trabalho em equipe',comments:5}
  ];
  return `<section class="performance-section">
    <div class="section-head">
      <h3>Performance</h3>
      <p class="section-description">Avaliação numérica com base no cumprimento de metas, entregas e impacto individual no período.</p>
    </div>
    <div class="chart-block">
      <div class="charts">
        <div>
          <div class="donut numeric-donut" role="img" aria-label="Distribuição realista das avaliações" style="background:conic-gradient(#267536 0 25%, #2f9441 25% 62.5%, #39ac51 62.5% 87.5%, #56c66c 87.5% 100%)"><div><b>8</b><small>Respostas</small></div></div>
          <p class="chart-caption">Distribuição consolidada das notas (1 a 10)</p>
        </div>
        <div>
          <div class="bars">
            <div><div class="bar numeric-bar"><i style="background:#2f9441;height:100%">100%</i></div><small>Líder</small></div>
            <div><div class="bar numeric-bar"><i style="background:#267536;height:50%">50%</i><i style="background:#2f9441;height:25%">25%</i><i style="background:#39ac51;height:25%">25%</i></div><small>Pares</small></div>
            <div><div class="bar numeric-bar"><i style="background:#39ac51;height:50%">50%</i><i style="background:#56c66c;height:50%">50%</i></div><small>Outros</small></div>
            <div><div class="bar numeric-bar"><i style="background:#2f9441;height:100%">100%</i></div><small>Auto</small></div>
          </div>
          <p class="chart-caption">Notas por perspectiva de avaliação</p>
        </div>
      </div>
      <div class="chart-legend-row score-legend">
        ${scoreColors.map((c,i)=>`<span><i style="background:${c}"></i>${i+1}</span>`).join('')}
      </div>
    </div>
    <div class="competencies-list">
      ${perfList.map(item=>`<details class="competency"><summary><div class="competency-main"><span class="competency-icon" aria-hidden="true">${icon('clipboardCheck',16)}</span><span class="competency-title">${item.title}</span><span class="competency-comments" title="Comentários recebidos">${icon('messagesSquare',14)} <span>${item.comments}</span></span></div><div class="competency-meta"><span class="assessment-scale">Numérica</span><span class="competency-chevron" aria-hidden="true">${icon('chevronRight',16)}</span></div></summary><p>Escala de avaliação: 1 a 10.</p><p>Os resultados por tipo de avaliador estão consolidados nos gráficos abaixo.</p></details>`).join('')}
    </div>
  </section>`
}
function leaderConclusion(name='Marina Costa'){
  const conc = getLeaderConclusion(name);
  return `<section class="card leader-conclusion-card">
    <div class="section-head">
      <h3>Conclusão do Líder</h3>
    </div>
    ${who(conc.author, conc.role)}
    <div class="conclusion-topics">
      <div class="conclusion-topic">
        <h4>Pontos fortes</h4>
        <div class="conclusion-text">${esc(conc.strength)}</div>
      </div>
      <div class="conclusion-topic">
        <h4>Pontos de melhoria</h4>
        <div class="conclusion-text">${esc(conc.improve)}</div>
      </div>
      <div class="conclusion-topic">
        <h4>Conclusão geral</h4>
        <div class="conclusion-text">${esc(conc.summary)}</div>
      </div>
    </div>
  </section>`;
}
let commentStore={};try{commentStore=JSON.parse(localStorage.getItem('devolutivas-comments')||'{}')}catch{}
let commentEditing=null;
function commentKey(){return location.hash.split('/')[2]||'0'}
function comments(){const key=commentKey();if(!commentStore[key])commentStore[key]=[{author:'João Silva',role:'Head de produto',text:'Adicione conteúdos para ajudar a pessoa colaboradora no seu desenvolvimento. Esses links vão fazer parte do seu PDI.',date:'23 de janeiro de 2024',own:false}];return commentStore[key]}
function recommendationsMockup(name='Marina Costa'){
  const recData = personRecommendationsData[name] || personRecommendationsData['Marina Costa'];
  const { leadSummary, signals, actions, courseIds } = recData;
  const courses = (courseIds || []).map(id => courseCatalog.find(c => c.id === id)).filter(Boolean);

  return `<div class="recommendations-page">
    <section class="recommendation-hero">
      <div class="recommendation-kicker">${icon('sparkles',16)} Assistente de desenvolvimento <span>Integração com Catálogo de Cursos</span></div>
      <h2>Um próximo passo para o seu desenvolvimento</h2>
      <p>${esc(leadSummary)}</p>
      <div class="recommendation-note">${icon('info',16)} Sugestões personalizadas geradas com base nas evidências de OKRs, feedbacks do ciclo e avaliação do líder. Combine as prioridades com sua liderança antes de consolidar no PDI.</div>
    </section>
    <section class="recommendation-section">
      <div class="recommendation-section-head">
        <div><span class="recommendation-label">01 · Síntese</span><h3>O que vale levar adiante</h3></div>
      </div>
      <div class="recommendation-signals">
        ${signals.map(s => `
          <article>
            <span class="signal-icon ${s.tone}">${icon(s.icon, 18)}</span>
            <strong>${esc(s.title)}</strong>
            <h4>${esc(s.name)}</h4>
            <p>${esc(s.text)}</p>
          </article>
        `).join('')}
      </div>
    </section>
    <section class="recommendation-section">
      <div class="recommendation-section-head">
        <div><span class="recommendation-label">02 · Prática</span><h3>Ações sugeridas para o PDI/CDI</h3></div>
      </div>
      <div class="recommendation-actions">
        ${actions.map((item,i)=>`<article class="recommendation-action"><span class="recommendation-number">0${i+1}</span><span class="recommendation-action-icon">${icon(item.icon,18)}</span><div><small>${esc(item.tag)}</small><h4>${esc(item.title)}</h4><p>${esc(item.text)}</p></div><span class="recommendation-pill">Sugestão de ação</span></article>`).join('')}
      </div>
    </section>
    <section class="recommendation-section">
      <div class="recommendation-section-head">
        <div><span class="recommendation-label">03 · Aprendizado</span><h3>Conteúdos corporativos para se aprofundar</h3></div>
      </div>
      <div class="recommendation-courses">
        ${courses.map(item=>`<article class="recommendation-course"><span class="course-icon">${icon(item.icon,20)}</span><small>${esc(item.type)}</small><h4>${esc(item.title)}</h4><p>${esc(item.detail)}</p><div class="course-footer"><span>${esc(item.meta)}</span><span>${esc(item.area)}</span></div></article>`).join('')}
      </div>
    </section>
    <section class="recommendation-plan">
      <div><span class="recommendation-label">04 · Aplicação</span><h3>Um roteiro possível para 30 dias</h3><p>Uma forma de ligar aprendizado e prática, sem transformar a recomendação em obrigação.</p></div>
      <ol>
        <li><b>Semana 1</b><span>Escolher uma prioridade de desenvolvimento com a liderança em 1:1.</span></li>
        <li><b>Semana 2</b><span>Iniciar um conteúdo recomendado e aplicar uma técnica na rotina.</span></li>
        <li><b>Semanas 3–4</b><span>Registrar um exemplo concreto e colher feedback contínuo.</span></li>
      </ol>
    </section>
  </div>`;
}
function switchCollaboratorTab(tab){
  document.querySelectorAll('.collaborator-tab').forEach(button=>{const active=button.dataset.tab===tab;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1});
  document.querySelector('#collaborator-report-panel').hidden=tab!=='report';
  document.querySelector('#collaborator-recommendations-panel').hidden=tab!=='recommendations';
  const pdfButton=document.querySelector('.collaborator-report .heading .primary');if(pdfButton)pdfButton.hidden=tab!=='report';
}
function collaboratorReport(){
  commentEditing=null;
  const collaboratorName = 'Marina Costa';
  const person = people.find(p => p[0] === collaboratorName);
  const role = person ? person[1] : 'Engenheira de Software';
  app.innerHTML=`<div class="report-wrap collaborator-report">${heading(esc(plan),'',`<div class="actions"><button class="tertiary back-button icon-button" onclick="location.hash='colaborador'">${icon('arrowLeft')} Voltar</button><button class="primary icon-button" onclick="window.print()">${icon('download')} Baixar PDF</button></div>`)}<div class="collaborator-tabs" role="tablist" aria-label="Conteúdo da devolutiva"><button class="collaborator-tab" type="button" role="tab" data-tab="report" id="tab-report" aria-controls="collaborator-report-panel" aria-selected="true" onclick="switchCollaboratorTab('report')">Relatório</button><button class="collaborator-tab" type="button" role="tab" data-tab="recommendations" id="tab-recommendations" aria-controls="collaborator-recommendations-panel" aria-selected="false" tabindex="-1" onclick="switchCollaboratorTab('recommendations')">Recomendações <span class="tab-badge">Novo</span></button></div><div id="collaborator-report-panel" role="tabpanel" aria-labelledby="tab-report">${report(collaboratorName, role, false, false)}${leaderConclusion(collaboratorName)}<section class="card comments-section"><h2>Comentários</h2><p>Adicione comentários necessários para compor a devolutiva. Todos os envolvidos com a devolutiva poderão ver os comentários registrados.</p><div id="comment-list"></div><form id="comment-form"><label class="comment-count" for="comment-input"><span class="muted">Novo comentário</span><small id="comment-count">0/1000</small></label><textarea id="comment-input" maxlength="1000" required placeholder="Escreva um comentário…" oninput="updateCommentCount()"></textarea><div class="actions"><button type="button" id="comment-cancel" hidden onclick="cancelCommentEdit()">Cancelar edição</button><button class="primary" id="comment-submit" disabled>Adicionar</button></div></form></section></div><div id="collaborator-recommendations-panel" role="tabpanel" aria-labelledby="tab-recommendations" hidden>${recommendationsMockup(collaboratorName)}</div></div>`;
  renderComments();
  document.querySelector('#comment-form').onsubmit=event=>{event.preventDefault();saveComment()}
}
function renderComments(){document.querySelector('#comment-list').innerHTML=comments().map((c,i)=>`<article class="comment-card"><div class="report-head">${who(c.author,c.role)}${c.own?`<button aria-label="Editar seu comentário" onclick="editComment(${i})">✎ Editar</button>`:''}</div><p class="comment-text">${esc(c.text)}</p><small>${esc(c.date)}${c.edited?' · Editado':''}</small></article>`).join('')}
function updateCommentCount(){const input=document.querySelector('#comment-input');document.querySelector('#comment-count').textContent=input.value.length+'/1000';document.querySelector('#comment-submit').disabled=!input.value.trim()}
function saveComment(){const text=document.querySelector('#comment-input').value.trim();if(!text)return;const list=comments();if(commentEditing!==null){list[commentEditing].text=text;list[commentEditing].edited=true}else list.push({author:'Marina Costa',role:'Analista',text,date:new Date().toLocaleDateString('pt-BR',{day:'numeric',month:'long',year:'numeric'}),own:true});try{localStorage.setItem('devolutivas-comments',JSON.stringify(commentStore))}catch{}renderComments();cancelCommentEdit();toast('Comentário salvo nesta demonstração')}
function editComment(i){if(!comments()[i]?.own)return;commentEditing=i;document.querySelector('#comment-input').value=comments()[i].text;document.querySelector('#comment-submit').textContent='Salvar alterações';document.querySelector('#comment-cancel').hidden=false;updateCommentCount();document.querySelector('#comment-input').focus()}
function cancelCommentEdit(){commentEditing=null;document.querySelector('#comment-input').value='';document.querySelector('#comment-submit').textContent='Adicionar';document.querySelector('#comment-cancel').hidden=true;updateCommentCount()}
const fields=[['strength','Pontos fortes'],['improve','Pontos de melhoria'],['summary','Conclusão geral']];let editing=0;
function editor(id){
  editing=Math.max(0,Math.min(5,Number(id)||0));
  const person=people[editing],draft=drafts[editing]||{};
  app.innerHTML=`<div class="editor-page">
    <section class="editor-compose">
      <button class="tertiary editor-back icon-button" onclick="location.hash='gestor/ciclo/0'">${icon('arrowLeft',15)} Voltar</button>
      ${heading(esc(person[0]))}
      <form class="card" id="editor-form">
        <section class="ai">
          <div class="ai-title">${icon('sparkles',18)}<h3>Assistente de devolutivas</h3><span class="ai-beta">Beta</span></div>
          <p>Crie uma sugestão com base no relatório individual, com rastreabilidade de fontes e identificação de lacunas, e personalize o conteúdo antes de enviar.</p>
          <div class="ai-action-buttons">
            <button class="primary icon-button" type="button" onclick="suggest()">${icon('sparkles',15)} Gerar sugestão com IA</button>
            <button class="tertiary icon-button" type="button" onclick="prepareOneOnOne('${esc(person[0])}')">${icon('messagesSquare',15)} Roteiro para conversa 1:1 <span class="editor-new-tag">Novo</span></button>
          </div>
        </section>

        <details class="competency editor-guide" style="margin-bottom:24px">
          <summary>
            <div class="competency-main">
              <span class="competency-icon">${icon('info', 16)}</span>
              <span class="competency-title">Guia de boas práticas: 4 critérios de uma devolutiva de qualidade</span>
            </div>
            <div class="competency-meta">
              <span class="chip chip-info">Critérios (0–100)</span>
              <span class="competency-chevron" aria-hidden="true">${icon('chevronRight', 16)}</span>
            </div>
          </summary>
          <div class="conclusion-text">
            <p class="guide-item"><strong>Exemplos e fatos concretos <span class="guide-pts">25 pts</span></strong>Mencione situações observáveis, entregas ou projetos do ciclo.</p>
            <p class="guide-item"><strong>Fundamentação equilibrada <span class="guide-pts">25 pts</span></strong>Explique com empatia o impacto prático dos comportamentos observados.</p>
            <p class="guide-item"><strong>Próximos passos e acordos <span class="guide-pts">25 pts</span></strong>Defina 1 a 2 prioridades claras ou ações para o PDI e a conversa 1:1.</p>
            <p class="guide-item"><strong>Coerência com evidências <span class="guide-pts">25 pts</span></strong>Alinhe o texto com as notas de competências e os OKRs do período.</p>
          </div>
        </details>

        ${fields.map(([key,label])=>`<div class="field"><label for="${key}">${label} * <small id="count-${key}">${(draft[key]||'').length}/1000</small></label><textarea id="${key}" maxlength="1000" required placeholder="Escreva aqui…" oninput="document.querySelector('#count-${key}').textContent=this.value.length+'/1000'">${esc(draft[key]||'')}</textarea></div>`).join('')}
        <div class="actions">
          <button type="button" class="tertiary icon-button" onclick="reviewAiQuality()">${icon('sparkles',15)} Revisar qualidade com IA <span class="editor-new-tag">Novo</span></button>
          <button type="button" onclick="saveDraft()">Salvar rascunho</button>
          <button class="primary" type="submit">Continuar e revisar</button>
        </div>
      </form>
    </section>
    <section class="report-preview"><button class="expand" onclick="showReport('${person[0]}')">⤢ Expandir relatório</button>${report(person[0],person[1],true)}</section>
  </div>`;
  document.querySelector('#editor-form').onsubmit=e=>{e.preventDefault();review()}
}
function capture(){drafts[editing]=Object.fromEntries(fields.map(([key])=>[key,document.getElementById(key).value]));persist()}
function saveDraft(){capture();toast('Rascunho salvo neste navegador')}

const aiSuggestionsMap = {
  get(personName, personRole) {
    const pName = personName || 'Marina Costa';
    const conc = getLeaderConclusion(pName);
    const okrs = personOkrsData[pName] || personOkrsData['Marina Costa'];
    const fb = personFeedbacksData[pName] || personFeedbacksData['Marina Costa'];
    const okrItem = okrs[0] || { period: 'Q4 2023', title: 'Entregas do período', achieved: 'Atingido' };
    const fbCount = fb.total || 7;

    return {
      strengthHtml: `<span class="source-tag st-comp">${icon('clipboardCheck',12)} Avaliação de competências</span> ${esc(conc.strength)} <span class="source-tag st-okr">${icon('target',12)} OKR ${esc(okrItem.period)}</span> ${esc(okrItem.title)}: ${esc(okrItem.achieved)}. <span class="source-tag st-fb">${icon('messagesSquare',12)} ${fbCount} feedbacks do ciclo</span> Reconhecido por pares e liderança pela postura colaborativa.`,
      improveHtml: `<span class="source-tag st-comp">${icon('clipboardCheck',12)} Oportunidades observadas</span> ${esc(conc.improve)} <span class="source-tag st-fb">${icon('messagesSquare',12)} Feedbacks contínuos</span> Alinhamento sugerido em trocas de sprint e alinhamento prévio de dependências.`,
      summaryHtml: `${esc(conc.summary)} <span class="source-tag st-okr">${icon('target',12)} Alinhamento com PDI</span> Metas acordadas para os primeiros 30–60 dias.`,
      rawStrength: `${conc.strength} Destaque para o cumprimento do OKR "${okrItem.title}" (${okrItem.achieved}) e reconhecimento consistente nos feedbacks do ciclo.`,
      rawImprove: `${conc.improve}`,
      rawSummary: `${conc.summary}`
    };
  }
};
let aiAnimationTimer1 = null, aiAnimationTimer2 = null, aiAnimationTimer3 = null;

function suggest(){
  const person = people[editing] || ['Marina Costa', 'Analista'];
  const data = aiSuggestionsMap.get(person[0], person[1]);
  clearTimeout(aiAnimationTimer1);
  clearTimeout(aiAnimationTimer2);
  clearTimeout(aiAnimationTimer3);

  const html = `
    <h2>Sugestão de Devolutiva com Rastreabilidade</h2>
    <div class="compact-meta">
      <span>${icon('sparkles', 14)} <strong>Assistente de Devolutiva · Síntese com Fontes</strong></span>
      <span class="meta-divider" aria-hidden="true"></span>
      <span>${icon('layers', 14)} <strong>Ciclo 2025.1</strong></span>
      <span class="meta-divider" aria-hidden="true"></span>
      <span>${esc(person[0])} · ${esc(person[1])}</span>
    </div>

    <div class="ai-loading-panel" id="ai-loading-panel" style="margin:24px 0">
      <div class="ai-step-single" id="ai-step-single" role="status" aria-live="polite" aria-atomic="true">
        <span class="ai-step-icon" id="ai-step-icon" aria-hidden="true">${icon('file',22)}</span>
        <strong id="ai-step-title">Lendo avaliações individuais</strong>
        <span id="ai-step-detail">Processando 8 feedbacks de autoavaliação, pares e liderança</span>
      </div>
      <div class="ai-loading-track" role="progressbar" aria-label="Preparando sugestão de devolutiva"></div>
    </div>

    <div class="ai-result-panel" id="ai-result-panel" style="display:none;margin-top:20px">
      <div class="notice" style="margin-bottom:20px">
        ${icon('alertTriangle', 15)} <strong>Sinalização de cobertura (lacuna de dados identificada):</strong> Não há registros de feedbacks entre pares nos últimos 45 dias do ciclo. A IA priorizou evidências de OKRs e autoavaliação; explore a percepção da dinâmica de equipe diretamente na conversa presencial, sem inventar conclusões.
      </div>

      <div class="conclusion-topics">
        <div class="conclusion-topic">
          <h4>Pontos fortes</h4>
          <div class="conclusion-text ai-sourced-text">${data.strengthHtml}</div>
        </div>

        <div class="conclusion-topic">
          <h4>Pontos de melhoria</h4>
          <div class="conclusion-text ai-sourced-text">${data.improveHtml}</div>
        </div>

        <div class="conclusion-topic">
          <h4>Conclusão geral</h4>
          <div class="conclusion-text ai-sourced-text">${data.summaryHtml}</div>
        </div>
      </div>

      <div class="actions" style="margin-top:24px">
        <button type="button" class="tertiary" onclick="suggest()">Gerar novamente</button>
        <button type="button" class="primary icon-button" onclick="useSuggestion()">${icon('check',16)} Usar como ponto de partida</button>
      </div>
      <p class="muted text-xs" style="margin-top:12px">Sugestão gerada por IA com base em evidências com fontes identificadas. Ao aplicar, o texto limpo preencherá os 3 campos editáveis da devolutiva para sua revisão humana.</p>
    </div>
  `;

  modal(html);

  aiAnimationTimer1 = setTimeout(()=>{
    setAiLoadingStep('layers','Cruzando competências, OKRs e feedbacks','Mapeando metas alcançadas, colaboração e registros do ciclo');
  }, 1800);

  aiAnimationTimer2 = setTimeout(()=>{
    setAiLoadingStep('check','Compilando síntese estruturada com fontes','Gerando pontos fortes, oportunidades e sinalizando lacunas honestas');
  }, 3600);

  aiAnimationTimer3 = setTimeout(()=>{
    const loadingPanel = document.querySelector('#ai-loading-panel');
    const resultPanel = document.querySelector('#ai-result-panel');
    if (loadingPanel && resultPanel) {
      loadingPanel.style.display = 'none';
      resultPanel.style.display = 'block';
      resultPanel.classList.add('fade-in-slide');
    }
  }, 5400);
}

function setAiLoadingStep(iconName,title,detail){
  const panel=document.querySelector('#ai-step-single');
  if(!panel)return;
  panel.classList.remove('ai-step-enter');
  panel.classList.add('ai-step-exit');
  setTimeout(()=>{
    if(!panel.isConnected)return;
    panel.querySelector('#ai-step-icon').innerHTML=icon(iconName,22);
    panel.querySelector('#ai-step-title').textContent=title;
    panel.querySelector('#ai-step-detail').textContent=detail;
    panel.classList.remove('ai-step-exit');
    void panel.offsetWidth;
    panel.classList.add('ai-step-enter');
  },260);
}

function useSuggestion(){
  const person = people[editing] || ['Marina Costa', 'Analista'];
  const data = aiSuggestionsMap.get(person[0], person[1]);
  const mapping = {
    strength: data.rawStrength,
    improve: data.rawImprove,
    summary: data.rawSummary
  };
  fields.forEach(([key])=>{
    const input = document.getElementById(key);
    if (input && mapping[key]) {
      input.value = mapping[key];
      const counter = document.querySelector('#count-' + key);
      if (counter) counter.textContent = mapping[key].length + '/1000';
    }
  });
  if (peopleQualityData[person[0]]) {
    peopleQualityData[person[0]].aiUsed = true;
    peopleQualityData[person[0]].aiEdited = false;
  }
  document.querySelector('#modal').close();
  toast('✨ Sugestão da IA aplicada com sucesso nos 3 tópicos! Personalize antes de enviar.');
}

function reviewAiQuality(){
  capture();
  const draft = drafts[editing] || {};
  const strength = (draft.strength || '').trim();
  const improve = (draft.improve || '').trim();
  const summary = (draft.summary || '').trim();
  const person = people[editing] || ['Marina Costa', 'Analista'];

  const isBlank = !strength && !improve && !summary;
  const isShort = (strength.length + improve.length + summary.length) < 130;
  const hasGenericWord = /bom|boa|legal|ok|regular|melhorar/i.test(improve) && improve.length < 80;
  const hasNextStep = /pdi|próximo|plano|meta|objetivo|ação|acordo|acompanhar/i.test(summary + ' ' + improve);

  let estimatedScore = isBlank ? 25 : isShort ? 55 : hasGenericWord ? 68 : 88;
  if (hasNextStep && estimatedScore < 92) estimatedScore += 6;

  const tierTone = estimatedScore >= 90 ? 'success' : estimatedScore >= 70 ? 'info' : 'warning';
  const tierIcon = estimatedScore >= 70 ? 'checkCircle' : 'alertTriangle';

  const alerts = [];
  if (hasGenericWord) alerts.push('<strong>Trecho potencialmente vago no ponto de melhoria:</strong> Frases como "precisa melhorar comunicação" sem citar uma reunião, projeto ou consequência prática podem gerar insegurança.');
  if (!hasNextStep) alerts.push('<strong>Ausência de próximo passo observável:</strong> O texto não especifica em qual prioridade a pessoa deve focar nos primeiros 30–60 dias após a conversa.');
  alerts.push('<strong>Conexão com metas:</strong> Lembre-se de vincular a conversa aos OKRs alcançados no ciclo para contextualizar o esforço.');

  const html = `
    <h2>Revisão de Qualidade Pré-Envio · ${esc(person[0])}</h2>
    <div class="compact-meta">
      <span>${icon('sparkles', 14)} <strong>Auditoria Assistiva de Qualidade</strong></span>
      <span class="meta-divider" aria-hidden="true"></span>
      <span class="chip chip-${tierTone}">${icon(tierIcon, 12)} Estimativa: ${estimatedScore}/100</span>
      <span class="meta-divider" aria-hidden="true"></span>
      <span>Confidencial da Liderança</span>
    </div>

    <div class="notice">
      ${icon('info', 14)} <strong>Orientação:</strong> Esta análise verifica se o texto oferece subsídios práticos para a conversa 1:1. Ela serve para guiar seu aperfeiçoamento prévio e <em>não será exibida ao colaborador</em>. O uso de IA é neutro no cálculo.
    </div>

    <div class="conclusion-topics" style="margin-top:22px">
      <div class="conclusion-topic">
        <h4>${icon('checkCircle', 14)} O que está bem estruturado</h4>
        <div class="conclusion-text">
          Linguagem respeitosa e construtiva, com reconhecimento claro do esforço nas entregas do ciclo.
        </div>
      </div>

      <div class="conclusion-topic">
        <h4>${icon('alertTriangle', 14)} Oportunidades de melhoria antes de enviar</h4>
        <div class="conclusion-text">
          ${alerts.map(a => `<p style="margin-bottom:6px">• ${a}</p>`).join('')}
        </div>
      </div>

      <div class="conclusion-topic">
        <h4>${icon('helpCircle', 14)} Perguntas reflexivas para apoiar a conversa</h4>
        <div class="conclusion-text">
          <p>1. <em>“Em qual entrega recente essa oportunidade de melhoria se manifestou com mais clareza?”</em></p>
          <p>2. <em>“Qual combinado observável indicará que a pessoa evoluiu nesse ponto no próximo ciclo?”</em></p>
        </div>
      </div>
    </div>

    <div class="actions" style="margin-top:24px">
      <button type="button" class="tertiary" onclick="document.querySelector('#modal').close()">Voltar ao editor e enriquecer</button>
      <button type="button" class="primary" onclick="document.querySelector('#modal').close();review()">Prosseguir para envio</button>
    </div>
  `;
  modal(html);
}

function prepareOneOnOne(personName = ''){
  const name = personName || (people[editing] ? people[editing][0] : 'Marina Costa');
  const html = `
    <h2>Roteiro da Reunião 1:1: ${esc(name)}</h2>
    <div class="compact-meta">
      <span>${icon('messagesSquare', 14)} <strong>Preparação de Conversa de Devolutiva</strong></span>
      <span class="meta-divider" aria-hidden="true"></span>
      <span>4 etapas · 45 minutos sugeridos</span>
    </div>

    <div class="notice">
      ${icon('info', 14)} <strong>Dica de condução:</strong> A devolutiva é um alinhamento bilateral para construir o próximo ciclo, não uma leitura passiva de relatório. Crie espaço para escuta ativa antes de apresentar suas conclusões.
    </div>

    <div class="conclusion-topics" style="margin-top:22px">
      <div class="conclusion-topic">
        <h4>01 · Abertura e Conexão (5 min)</h4>
        <div class="conclusion-text">
          <p>Crie um ambiente de confiança e reforce que a devolutiva é um momento de alinhamento bilateral, não um julgamento unidirecional.</p>
          <p class="muted">💬 Pergunta aberta: <em>“Como você avalia seu último trimestre e o que mais te motivou no período?”</em></p>
        </div>
      </div>

      <div class="conclusion-topic">
        <h4>02 · Celebração de Conquistas e Forças (10 min)</h4>
        <div class="conclusion-text">
          <p>Reconheça fatos específicos: o cumprimento das metas de infraestrutura e a postura colaborativa elogiada pelos pares.</p>
          <p class="muted">💬 Pergunta aberta: <em>“Qual entrega desse ciclo te deu mais orgulho técnico e por quê?”</em></p>
        </div>
      </div>

      <div class="conclusion-topic">
        <h4>03 · Oportunidades de Evolução com Empatia (15 min)</h4>
        <div class="conclusion-text">
          <p>Aborde a comunicação antecipada de riscos. Explore o que gerou o atraso no aviso em vez de apontar culpa.</p>
          <p class="muted">💬 Pergunta aberta: <em>“O que poderíamos ter feito no processo para que você se sentisse mais seguro para sinalizar o risco antes?”</em></p>
        </div>
      </div>

      <div class="conclusion-topic">
        <h4>04 · Acordos Práticos e Conexão com o PDI (15 min)</h4>
        <div class="conclusion-text">
          <p>Definam juntos 1 a 2 prioridades para os primeiros 30–60 dias e vinculem às ações e cursos recomendados na plataforma.</p>
          <p class="muted">💬 Pergunta aberta: <em>“Qual apoio específico meu e do time você precisa para consolidar esse próximo passo?”</em></p>
        </div>
      </div>
    </div>

    <div class="actions" style="margin-top:24px">
      <button type="button" class="tertiary icon-button" onclick="copyOneOnOneScript()">${icon('copy', 15)} Copiar roteiro</button>
      <button type="button" class="primary" onclick="document.querySelector('#modal').close()">Pronto para a reunião</button>
    </div>
  `;
  modal(html);
}

function copyOneOnOneScript(){
  const text = `Roteiro de Devolutiva 1:1:\n1. Abertura & Conexão: "Como você avalia seu último trimestre e o que mais te motivou?"\n2. Celebração de Conquistas: Foco na entrega dos OKRs e colaboração.\n3. Oportunidades com Empatia: "O que podemos ajustar para sinalizar riscos antes?"\n4. Acordos de PDI: 1 a 2 prioridades claras com apoio da liderança.`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text);
  }
  toast('Roteiro copiado para a área de transferência!');
}

function review(){capture();modal(`<h2>Revisar devolutiva · ${esc(people[editing][0])}</h2>${fields.map(([key,label])=>`<h3>${label}</h3><p class="review-text">${esc(drafts[editing][key])}</p>`).join('')}<p class="muted">O envio é simulado nesta demonstração.</p><div class="actions"><button class="primary" onclick="sendFeedback()">Confirmar envio</button></div><hr>`)}
function sendFeedback(){
  const person = people[editing];
  person[2]='sent';
  const draft = drafts[editing] || {};
  const strength = (draft.strength || '').trim();
  const improve = (draft.improve || '').trim();
  const summary = (draft.summary || '').trim();
  if (strength || improve || summary) {
    const isShort = (strength.length + improve.length + summary.length) < 130;
    const hasGenericWord = /bom|boa|legal|ok|regular|melhorar/i.test(improve) && improve.length < 80;
    const hasNextStep = /pdi|próximo|plano|meta|objetivo|ação|acordo|acompanhar/i.test(summary + ' ' + improve);
    let score = isShort ? 58 : hasGenericWord ? 68 : 88;
    if (hasNextStep && score < 92) score += 6;
    const tier = score >= 90 ? 'excellent' : score >= 70 ? 'consistent' : 'review';
    const tierLabel = tier === 'excellent' ? 'Excelente' : tier === 'consistent' ? 'Consistente' : 'Merece revisão';
    if (!peopleQualityData[person[0]]) {
      peopleQualityData[person[0]] = getPersonQuality(person[0], 'sent');
    }
    peopleQualityData[person[0]].score = score;
    peopleQualityData[person[0]].tier = tier;
    peopleQualityData[person[0]].tierLabel = tierLabel;
    peopleQualityData[person[0]].completeness = '100% · Enviada';
    peopleQualityData[person[0]].completenessFull = true;
    if (peopleQualityData[person[0]].aiUsed) {
      peopleQualityData[person[0]].aiEdited = true;
    }
  }
  persist();
  document.querySelector('#modal').close();
  location.hash='gestor';
  toast('Devolutiva enviada com sucesso nesta demonstração!');
}
function managerOverview(id){
  const closed=Number(id)===1;
  const cycle=closed?'2024.2':'2025.1';
  const title=closed?'Devolutiva Produto 2024.2':'Devolutiva Engenharia 2025.1';
  const period=closed?'19 ago 2025 – 27 set 2025':'24 fev 2025 – 04 abr 2025';
  const cycleStatus=chip(closed?'Fechada':'Aberta',closed?'neutral':'success','','cycle-heading-status');
  const deadline=closed?'':`<span class="meta-deadline">${icon('clock')} <strong>Faltam 12 dias</strong></span>`;
  const action=(person,i)=>closed||person[2]==='sent'
    ?`<button class="tertiary icon-button" onclick="showReport('${person[0]}')">Relatório</button>`
    :`<a class="person-action ${person[2]==='pending'?'primary':'table-action'}" href="#gestor/editar/${i}">${person[2]==='pending'?'Responder':'Revisar e enviar'}</a>`;
  app.innerHTML=`<div class="manager-reference">${heading(`${esc(title)} ${cycleStatus}`)}<div class="compact-meta"><span>${icon('layers')} <strong>${cycle}</strong></span><span>${icon('calendar')} <strong>${period}</strong></span>${deadline}</div><div class="table-wrap manager-team-table"><table><thead><tr><th>Pessoa</th><th>Cargo</th><th>Status</th><th class="end" aria-label="Ação"></th></tr></thead><tbody>${people.map((p,i)=>`<tr><td>${who(p[0],'')}</td><td class="muted">${esc(p[1])}</td><td>${closed?badge('sent'):badge(p[2])}</td><td class="end">${action(p,i)}</td></tr>`).join('')}</tbody></table></div><div class="table-footer">Mostrando 6 de 6 liderados</div></div>`
}
function filterTeam(){const q=document.querySelector('#team-search').value.toLowerCase(),state=document.querySelector('#team-filter').value;const rows=people.map((p,i)=>({p,i})).filter(({p})=>(p[0]+' '+p[1]).toLowerCase().includes(q)&&(state==='all'||p[2]===state));document.querySelector('#team-rows').innerHTML=rows.map(({p,i})=>`<tr><td>${who(p[0],'')}</td><td class="muted">${esc(p[1])}</td><td>${badge(p[2])}</td><td>${p[2]==='sent'?`<button class="person-action" onclick="showReport('${p[0]}')">◎ &nbsp; Ver</button>`:`<a class="person-action ${p[2]==='pending'?'primary':'table-action'}" href="#gestor/editar/${i}">${p[2]==='pending'?'Responder':'Enviar'}</a>`}</td></tr>`).join('')||'<tr><td colspan="4" class="empty">Nenhuma pessoa encontrada.</td></tr>';document.querySelector('#team-total').textContent='Mostrando '+rows.length+' de 6 pessoas'}
function adaptRhCycle(){
  const closed=location.hash.split('/')[2]==='1',title=app.querySelector(':scope>.heading h1'),meta=app.querySelector('.rh-content .compact-meta');
  if(!title||!meta)return;
  title.innerHTML=`${closed?'Devolutiva Produto 2024.2':esc(plan)} ${chip(closed?'Fechada':'Aberta',closed?'neutral':'success','','cycle-heading-status')}`;
  const metaItems=meta.querySelectorAll(':scope>span');
  if(metaItems[0])metaItems[0].querySelector('strong').textContent=closed?'2024.2':'2025.1';
  if(metaItems[1])metaItems[1].querySelector('strong').textContent=closed?'19 ago 2025 – 27 set 2025':'24 fev 2025 – 04 abr 2025';
  if(closed){
    meta.querySelector('.meta-deadline')?.remove();
    meta.querySelector('.meta-divider')?.remove();
    app.querySelector('.heading .rh-more')?.remove();
  }
}
function enhanceView(role,view){app.dataset.view=role||'rh';app.dataset.page=view||'';const hasBack=app.querySelector('.back-button,.editor-back,.page-back');if(view&&!hasBack)app.insertAdjacentHTML('afterbegin',`<div class="page-back-row"><button class="tertiary icon-button page-back" onclick="location.hash='${role||'rh'}'">${icon('arrowLeft',15)} Voltar</button></div>`);document.querySelectorAll('.cycle-status.open').forEach(el=>el.classList.add('chip','chip-success'));document.querySelectorAll('.cycle-status.closed').forEach(el=>el.classList.add('chip','chip-neutral'));if(role==='rh'&&view==='ciclo')adaptRhCycle()}
function render(){const parts=location.hash.slice(1).split('/'),role=parts[0]||'rh',view=parts[1],id=parts[2];document.querySelectorAll('aside nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+role));if(role==='gestor'){if(view==='editar')editor(id);else if(view==='ciclo')managerOverview(id);else cycleSelector('gestor')}else if(role==='colaborador')view==='relatorio'?collaboratorReport():collaborator();else view==='ciclo'?rh():cycleSelector('rh');enhanceView(role,view);window.scrollTo(0,0)}
addEventListener('hashchange',render);render();

import { projects } from '../data';

const asList = (v: unknown, fallback: string[] = []) => (Array.isArray(v) ? v : v ? [v] : fallback) as string[];

// Métodos e etapas de cada projeto, para os cases que não listam isso no próprio conteúdo
const METHODS: Record<string, string[]> = {
  'kba-senha': [
    'Análise de tickets de suporte',
    'Hotjar e Google Analytics',
    'Benchmark',
    'Árvore de oportunidades',
    'Facilitação com stakeholders',
    'Prototipação de alternativas',
    'Especificação de eventos',
    'Handoff',
  ],
  'admin-global-docs': [
    'Liderança de Design da iniciativa',
    'Consolidação de pesquisas existentes',
    'Visão de produto e ecossistema',
    'Mediação entre produtos e áreas',
    'Recontextualização do time',
    'Documentação de decisões',
  ],
  'analise-metricas': [
    'Definição da métrica (CES)',
    'Mapeamento de fluxos por persona',
    'Configuração das pesquisas no Hotjar',
    'Acompanhamento mensal',
    'Análise de comentários',
    'Apresentação de resultados',
  ],
};

function PillGroup({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <p className="text-[12px] font-semibold text-[#6F625B] mb-3">{label}</p>
      <div className="flex flex-wrap gap-2.5">
        {items.map(i => (
          <span key={i} className="px-4 py-2 bg-white border border-[#E2DCD4] rounded-full text-[13px] font-semibold text-[#241510]">
            {i}
          </span>
        ))}
      </div>
    </div>
  );
}

// Resumo da atuação no projeto: métodos/etapas e ferramentas, em pills
export function AtuacaoInfo({ projectId, methods }: { projectId: string; methods?: string[] }) {
  const project = projects.find(p => p.id === projectId) as any;
  if (!project) return null;

  return (
    <div className="not-prose flex flex-col gap-8">
      <PillGroup label="Métodos e etapas" items={methods ?? METHODS[projectId] ?? []} />
      <PillGroup label="Ferramentas" items={asList(project.tools)} />
    </div>
  );
}

// Projetos que já têm a própria seção "Minha atuação" no conteúdo
export const HAS_OWN_ATUACAO = ['devolutiva', 'dashboard-admissao'];

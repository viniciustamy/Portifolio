import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight, Building2, ChevronDown, ChevronRight, CircleCheck, CloudUpload, Download, FileText,
  LayoutGrid, MapPin, Network, Plus, Search, TriangleAlert, Users,
} from 'lucide-react';
import { wait } from './DevolutivaIaMotion';

/*
 * Thumb animada do case "Admin Global": a Administração Global recriada em código sobre o fundo
 * azul-marinho do menu lateral. Parada, mostra a tela Geral. Em foco, o cursor clica nos itens do
 * menu e as telas vão trocando: Importação unificada → Entidades → Posições → Pessoas usuárias → Geral.
 */

const STAGE_W = 760;
const NAVY = '#061329';
const SIDEBAR_W = 190;

const C = {
  ink: '#1F2328',
  sub: '#4B5058',
  muted: '#8A8F98',
  line: '#E3E5E8',
  page: '#F0F2F5',
  blue: '#1A66DB',
  head: '#E8EEFB',
};

const MENU = [
  { id: 'geral', label: 'Geral', Icon: Building2 },
  { id: 'importacao', label: 'Importação unificada', Icon: CloudUpload },
  { id: 'entidades', label: 'Entidades', Icon: MapPin },
  { id: 'posicoes', label: 'Posições', Icon: Network },
  { id: 'pessoas', label: 'Pessoas usuárias', Icon: Users },
] as const;

type PageId = typeof MENU[number]['id'];

const ease = [0.65, 0, 0.35, 1] as const;

function PageTitle({ title, desc, link }: { title: string; desc: string; link?: string }) {
  return (
    <div>
      <p className="text-[21px] font-semibold leading-none">{title}</p>
      <p className="text-[11px] mt-2" style={{ color: C.sub }}>
        {desc}{link && <> <span style={{ color: C.blue }}>{link}</span></>}
      </p>
    </div>
  );
}

function Panel({ children, className = '' }: { children: any; className?: string }) {
  return <div className={`bg-white rounded-xl ${className}`}>{children}</div>;
}

function ActionButtons({ create }: { create: string }) {
  return (
    <div className="flex items-center gap-2 text-[11px] shrink-0">
      <span className="flex items-center gap-1.5 rounded-full border-2 px-3 py-1" style={{ borderColor: '#141B2D' }}>Ações <ChevronDown size={11} /></span>
      <span className="flex items-center gap-1 rounded-full px-3 py-1.5 text-white" style={{ background: C.blue }}><Plus size={11} /> {create}</span>
    </div>
  );
}

function Initials({ text, bg, fg }: { text: string; bg: string; fg: string }) {
  return <span className="flex items-center justify-center rounded-full text-[10px] shrink-0" style={{ width: 26, height: 26, background: bg, color: fg }}>{text}</span>;
}

function GeralPage() {
  return (
    <div className="flex flex-col gap-3">
      {/* Um único card: boas-vindas em azul em cima, passos de configuração em branco embaixo */}
      <div className="rounded-xl overflow-hidden bg-white">
        <div className="px-6 py-5 text-white" style={{ background: '#03122B' }}>
          <p className="text-[19px] font-semibold leading-tight max-w-[340px]">Gestão centralizada da sua empresa em um único lugar</p>
          <p className="text-[11px] mt-2 text-white/85 max-w-[300px]">Gerencie estruturas, posições e acessos de forma simples e escalável.</p>
          <span className="inline-flex items-center gap-1 mt-3.5 rounded-full border px-3 py-1 text-[10.5px]" style={{ borderColor: '#B7F36B', color: '#B7F36B' }}>
            Conhecer o Admin Global <ArrowUpRight size={11} />
          </span>
        </div>
        <div className="px-5 py-4 flex gap-4">
          <div className="shrink-0" style={{ width: 142 }}>
            <p className="text-[12.5px] font-semibold leading-snug">Configure em poucos passos</p>
            <p className="text-[10px] mt-1.5 leading-snug" style={{ color: C.sub }}>Estruture sua empresa e prepare os acessos para usar os produtos da Gupy.</p>
            <p className="flex items-center gap-1 text-[10px] mt-2.5 underline whitespace-nowrap" style={{ color: C.blue }}>Aprenda como configurar <ArrowUpRight size={10} /></p>
          </div>
          {[
            { n: 1, Icon: MapPin, t: 'Cadastrar Entidades', d: 'Unidades operacionais, centros de custo, departamento, área, cargo' },
            { n: 2, Icon: Network, t: 'Cadastrar Posições', d: 'Defina as posições e monte a hierarquia da sua empresa' },
            { n: 3, Icon: Users, t: 'Cadastrar Usuários', d: 'Adicione colaboradores a sua empresa' },
          ].map(s => (
            <div key={s.n} className="flex-1 min-w-0">
              {/* Número + linha até o próximo passo */}
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-4 h-4 rounded-full text-[9px] shrink-0" style={{ background: C.line }}>{s.n}</span>
                {s.n < 3 && <span className="flex-1 h-px" style={{ background: C.line }} />}
              </div>
              <p className="flex items-center gap-1.5 text-[11px] font-semibold mt-2.5 whitespace-nowrap"><s.Icon size={12} color={C.sub} /> {s.t}</p>
              <p className="text-[9.5px] mt-1 leading-snug pl-[18px]" style={{ color: C.sub }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
      <Panel className="px-5 py-4">
        <p className="flex items-center gap-2 text-[15px] font-medium">
          Gupy Soluções de RH
          <span className="text-[9.5px] font-normal rounded border px-1.5 py-0.5" style={{ borderColor: '#9AA3AE' }}>501 - 1.000 colaboradores</span>
        </p>
        <div className="border-t my-3" style={{ borderColor: C.line }} />
        <p className="text-[12px] font-semibold">Informações da empresa</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mt-2.5 text-[10.5px]">
          {[['Nome fantasia', 'Gupy'], ['Setor', 'Tecnologia e Informação'], ['CNPJ', '12.345.678/0001-95'], ['Idioma', 'Português (Brasil)']].map(([k, v]) => (
            <div key={k}><p style={{ color: C.sub }}>{k}</p><p className="text-[11.5px] mt-0.5">{v}</p></div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function ImportacaoPage() {
  const rows = [
    { f: 'atualizacao_cargos_v2.csv', d: 'Hoje, 14:30', n: '890', ok: true },
    { f: 'onboarding_lote4.xlsx', d: 'Ontem, 09:15', n: '45', ok: true },
    { f: 'correcao_emails.csv', d: '14 de Mai, 16:40', n: '12', ok: false },
  ];
  return (
    <div className="flex flex-col gap-3">
      <PageTitle title="Importação unificada" desc="Carregue novos usuários ou atualize a base unificada através de planilhas, distribuídas para todos os produtos da suite." />
      <Panel className="px-5 py-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[14px] font-medium">Importar arquivo</p>
            <p className="text-[10px] mt-1" style={{ color: C.sub }}>Use o modelo oficial para garantir que todos os produtos recebam os dados corretamente.</p>
          </div>
          <span className="flex items-center gap-1 text-[10px] rounded-full border-2 px-2.5 py-1 shrink-0" style={{ borderColor: '#141B2D' }}><Download size={11} /> Baixar planilha modelo</span>
        </div>
        <div className="mt-3 rounded-lg border-2 border-dashed flex flex-col items-center justify-center py-6" style={{ borderColor: '#D3D7DC' }}>
          <CloudUpload size={24} color="#6B7078" />
          <p className="text-[11px] font-semibold mt-1.5">Arraste a planilha ou clique para selecionar</p>
          <p className="text-[9.5px] mt-1" style={{ color: C.sub }}>Arquivos suportados: .csv, .xlsx.</p>
        </div>
      </Panel>
      <Panel className="px-5 py-4">
        <p className="text-[14px] font-medium">Histórico de Importações</p>
        <div className="mt-3 rounded-lg border overflow-hidden text-[10.5px]" style={{ borderColor: C.line }}>
          <div className="grid grid-cols-[2fr_1.2fr_1.2fr_1fr] px-3 py-2 font-semibold" style={{ background: C.head }}>
            <span>Arquivo</span><span>Data</span><span>Registros</span><span>Status</span>
          </div>
          {rows.map(r => (
            <div key={r.f} className="grid grid-cols-[2fr_1.2fr_1.2fr_1fr] items-center px-3 py-2 border-t" style={{ borderColor: C.line }}>
              <span className="flex items-center gap-1.5 truncate"><FileText size={11} color={C.sub} /> {r.f}</span>
              <span style={{ color: C.sub }}>{r.d}</span>
              <span>{r.n}</span>
              <span className="inline-flex items-center gap-1 w-fit rounded px-1.5 py-0.5 text-[9.5px] text-white" style={{ background: r.ok ? '#2E7D32' : '#B85C1E' }}>
                {r.ok ? <CircleCheck size={10} /> : <TriangleAlert size={10} />} {r.ok ? 'Concluído' : 'Parcial'}
              </span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function EntidadesPage() {
  const rows = ['Operações', 'Vendas', 'Suporte', 'Desenvolvimento', 'Marketing', 'Recursos Humanos', 'Financeiro'];
  return (
    <div className="flex flex-col gap-3">
      <PageTitle title="Entidades" desc="Centralize as informações da sua empresa para facilitar a gestão nos produtos." link="Entenda como funciona as entidades." />
      <div className="flex gap-6 text-[12px] border-b" style={{ borderColor: C.line }}>
        {['Centros de custo', 'Unidades operacionais', 'Departamentos', 'Áreas', 'Cargos'].map((t, i) => (
          <span key={t} className="pb-2 whitespace-nowrap" style={{ color: i === 0 ? C.blue : C.ink, borderBottom: i === 0 ? `2px solid ${C.blue}` : '2px solid transparent' }}>{t}</span>
        ))}
      </div>
      <Panel className="px-5 py-4">
        <div className="flex items-center justify-between">
          <p className="text-[11px]"><b>25</b> centros de custo</p>
          <ActionButtons create="Criar Centro" />
        </div>
        <div className="mt-3 rounded-lg border overflow-hidden text-[10.5px]" style={{ borderColor: C.line }}>
          <div className="grid grid-cols-[1fr_2fr] px-3 py-2 font-semibold" style={{ background: C.head }}><span>Código</span><span>Nome</span></div>
          {rows.map((n, i) => (
            <div key={n} className="grid grid-cols-[1fr_2fr] px-3 py-2 border-t" style={{ borderColor: C.line }}>
              <span>CC-00{i + 1}</span><span className="font-semibold">{n}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function SearchBar({ placeholder, scope, count }: { placeholder: string; scope: string; count: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-1 rounded-md border overflow-hidden text-[11px]" style={{ borderColor: '#9AA3AE' }}>
        <span className="flex-1 px-3 py-1.5" style={{ color: C.muted }}>{placeholder}</span>
        <span className="flex items-center gap-1.5 px-3 border-l" style={{ borderColor: '#9AA3AE' }}>{scope} <ChevronDown size={11} /></span>
        <span className="flex items-center px-2.5 text-white" style={{ background: '#6B7280' }}><Search size={12} /></span>
      </div>
      <span className="text-[10.5px] whitespace-nowrap"><b>{count}</b></span>
    </div>
  );
}

function PosicoesPage() {
  const rows = [
    { i: 'VF', n: 'Vinicius Fernandes', r: 'CEO (POS-001)', t: 'Diretoria', bg: '#EEF0F3', fg: '#4B5058', indent: 0 },
    { i: 'EM', n: 'Eduardo Martins', r: 'CTO (POS-002)', t: 'Tecnologia', bg: '#DFF5E3', fg: '#1E7A3A', indent: 1 },
    { i: 'IF', n: 'Igor Ferreira', r: 'CHRO (POS-003)', t: 'Recursos Humanos', bg: '#EDE4FB', fg: '#6B3FC4', indent: 1 },
    { i: 'BP', n: 'Bruno Pereira', r: 'Analista de RH Senior (POS-010-244)', t: 'Recursos Humanos', bg: '#FDE6DA', fg: '#C2501E', indent: 1 },
    { i: 'UO', n: 'Ursula Oliveira', r: 'Desenvolvedor Junior (POS-009-286)', t: 'Tecnologia', bg: '#EDE4FB', fg: '#6B3FC4', indent: 1 },
  ];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <PageTitle title="Posições" desc="Gerencie a estrutura organizacional da sua empresa." link="Saiba mais" />
        <ActionButtons create="Criar posição" />
      </div>
      <Panel className="px-5 py-4">
        <SearchBar placeholder="Pesquisar posições" scope="em Posição" count="457 posições" />
        <div className="mt-3 rounded-lg border overflow-hidden" style={{ borderColor: C.line }}>
          <div className="px-3 py-2 text-[10.5px] font-semibold" style={{ background: C.head }}>Posição</div>
          {rows.map(r => (
            <div key={r.n} className="flex items-start gap-2 py-2 border-t" style={{ borderColor: C.line, paddingLeft: 12 + r.indent * 18 }}>
              <ChevronRight size={11} color={C.sub} className="mt-1.5" />
              <Initials text={r.i} bg={r.bg} fg={r.fg} />
              <div className="text-[10px]">
                <p className="text-[11px] font-semibold">{r.n}</p>
                <p style={{ color: C.sub }}>{r.r}</p>
                <p className="flex items-center gap-2.5 mt-0.5" style={{ color: C.sub }}>
                  <span className="flex items-center gap-1"><Building2 size={10} /> São Paulo - SP</span>
                  <span className="flex items-center gap-1"><Network size={10} /> {r.t}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function PessoasPage() {
  const rows = [
    { i: 'QP', n: 'Quintino Pereira', p: 'Desenvolvedor Senior', m: 'MAT-10500', chips: ['Recrutamento e Seleção', 'Admissão'], bg: '#EDE4FB', fg: '#6B3FC4' },
    { i: 'FG', n: 'Fernanda Gomes', p: 'Analista de RH Senior', m: 'MAT-10498', chips: ['Performance', 'Treinamentos', '+2'], bg: '#E3EEFB', fg: '#1A5FB4' },
    { i: 'UP', n: 'Ursula Pereira', p: 'CTO', m: 'MAT-10497', chips: ['Admissão', 'Treinamentos', '+1'], bg: '#EEF0F3', fg: '#4B5058' },
    { i: 'VA', n: 'Vitoria Alves', p: 'CHRO', m: 'MAT-10496', chips: ['Treinamentos', 'Engajamento', '+2'], bg: '#E3EEFB', fg: '#1A5FB4' },
    { i: 'NC', n: 'Nicolas Carvalho', p: 'Gerente de Engenharia', m: 'MAT-10494', chips: ['Admissão', 'Engajamento'], bg: '#DFF5E3', fg: '#1E7A3A' },
  ];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <PageTitle title="Pessoas usuárias" desc="Gerencie as informações das pessoas usuárias para usar nos produtos da Gupy." link="Saiba mais" />
        <ActionButtons create="Criar pessoa usuária" />
      </div>
      <Panel className="px-5 py-4">
        <SearchBar placeholder="Pesquisar pessoas usuárias" scope="em Nome" count="450 pessoas" />
        <div className="mt-3 rounded-lg border overflow-hidden text-[10px]" style={{ borderColor: C.line }}>
          <div className="grid grid-cols-[1.6fr_1.3fr_0.9fr_2fr] px-3 py-2 font-semibold text-[10.5px]" style={{ background: C.head }}>
            <span>Pessoa usuária</span><span>Posição</span><span>Matrícula</span><span>Acesso aos produtos</span>
          </div>
          {rows.map(r => (
            <div key={r.n} className="grid grid-cols-[1.6fr_1.3fr_0.9fr_2fr] items-center px-3 py-2 border-t" style={{ borderColor: C.line }}>
              <span className="flex items-center gap-2 min-w-0"><Initials text={r.i} bg={r.bg} fg={r.fg} /><b className="truncate text-[10.5px]">{r.n}</b></span>
              <span className="truncate">{r.p}</span>
              <span>{r.m}</span>
              <span className="flex gap-1 flex-wrap">
                {r.chips.map(c => <span key={c} className="rounded border px-1 py-px text-[9px] whitespace-nowrap" style={{ borderColor: '#9AA3AE', background: '#F7F8FA' }}>{c}</span>)}
              </span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

const PAGES: Record<PageId, () => any> = {
  geral: GeralPage,
  importacao: ImportacaoPage,
  entidades: EntidadesPage,
  posicoes: PosicoesPage,
  pessoas: PessoasPage,
};

// `fill`: a janela ocupa o palco inteiro, sem moldura (uso dentro do notebook)
export function AdminThumbMotion({ active, fill = false }: { active: boolean; fill?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const menuRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [size, setSize] = useState({ w: 0, h: 0 });
  const [page, setPage] = useState<PageId>('geral');
  const [cursor, setCursor] = useState({ x: 420, y: 420, visible: false, down: false });

  const stageW = fill ? 900 : STAGE_W;
  const scale = size.w / stageW;
  const stageH = scale ? size.h / scale : 0;

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setSize({ w: entry.contentRect.width, h: entry.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!active || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setPage('geral');
      setCursor(c => ({ ...c, visible: false, down: false }));
      return;
    }

    const token = { cancelled: false };

    const centerOf = (el: HTMLElement | null) => {
      const stage = stageRef.current;
      if (!el || !stage) return { x: 120, y: 200 };
      const r = el.getBoundingClientRect();
      const s = stage.getBoundingClientRect();
      const k = s.width / stageW;
      return { x: (r.left + r.width * 0.35 - s.left) / k, y: (r.top + r.height / 2 - s.top) / k };
    };

    const run = async () => {
      setPage('geral');
      setCursor({ x: 420, y: 420, visible: false, down: false });
      await wait(700, token);
      // Percorre o menu e volta para Geral
      const order = [1, 2, 3, 4, 0];
      while (!token.cancelled) {
        for (const i of order) {
          setCursor(c => ({ ...c, ...centerOf(menuRefs.current[i]), visible: true }));
          await wait(1200, token);
          setCursor(c => ({ ...c, down: true }));
          await wait(180, token);
          setCursor(c => ({ ...c, down: false }));
          setPage(MENU[i].id);
          await wait(2300, token);
        }
      }
    };

    run().catch(() => {});
    return () => { token.cancelled = true; };
  }, [active, stageW]);

  const Page = PAGES[page];

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden select-none" aria-hidden="true">
      {scale > 0 && (
        <div ref={stageRef} className="absolute left-0 top-0 origin-top-left font-sans" style={{ width: stageW, height: stageH, transform: `scale(${scale})`, color: C.ink }}>
          {/* Janela da Administração Global — sai pelas bordas da direita e de baixo */}
          <div
            className={`absolute overflow-hidden flex flex-col ${fill ? '' : 'rounded-tl-[16px]'}`}
            style={fill ? { inset: 0 } : { left: 36, top: 36, width: 900, bottom: 0, boxShadow: '0 0 0 1px rgb(255 255 255 / .12), 0 24px 50px rgb(0 0 0 / .45)' }}
          >
            {/* Barra de produtos */}
            <div className="flex items-center gap-5 px-5 bg-white border-b shrink-0 text-[10.5px] font-medium" style={{ height: 40, borderColor: C.line }}>
              <span className="text-[16px] font-bold mr-2">Gupy</span>
              {['Central de Carreiras', 'Recrutamento e Seleção', 'Admissão', 'Engajamento', 'Performance'].map(p => (
                <span key={p} className="whitespace-nowrap rounded px-1.5 py-1" style={p === 'Admissão' ? { background: '#E8EEFB', color: C.blue } : undefined}>{p}</span>
              ))}
              <span className={`ml-auto ${fill ? '' : 'mr-[150px]'} flex items-center gap-1.5 rounded-full border-2 px-2.5 py-1 whitespace-nowrap`} style={{ borderColor: '#141B2D' }}><LayoutGrid size={11} /> Admin global</span>
            </div>

            <div className="flex flex-1 min-h-0">
              {/* Menu lateral */}
              <div className="shrink-0 px-2.5 pt-5 text-white" style={{ width: fill ? 200 : SIDEBAR_W, background: NAVY }}>
                <p className={`px-2.5 text-[15px] font-semibold ${fill ? "whitespace-nowrap" : ""}`}>Administração Global</p>
                <p className="px-2.5 text-[9.5px] mt-1.5 leading-snug text-white/75">Gerencie as configurações que afetam os produtos e pessoas usuárias da plataforma.</p>
                <div className="mt-5 flex flex-col gap-1">
                  {MENU.map(({ id, label, Icon }, i) => (
                    <span key={id} ref={el => { menuRefs.current[i] = el; }} className="relative flex items-center gap-2.5 px-2.5 py-2 text-[12px] rounded-lg">
                      {page === id && <motion.span layoutId="admin-thumb-active" className="absolute inset-0 rounded-lg" style={{ background: 'rgb(255 255 255 / .13)' }} transition={{ duration: 0.35, ease }} />}
                      <Icon size={15} className="relative" />
                      <span className="relative whitespace-nowrap">{label}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Conteúdo da tela */}
              <div className="relative flex-1 min-w-0 overflow-hidden px-6 pt-5" style={{ background: C.page }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={page}
                    style={fill ? { maxWidth: 610, margin: '0 auto' } : { width: 620 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    <Page />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Cursor */}
          <motion.div
            className="absolute left-0 top-0 z-30 pointer-events-none"
            initial={false}
            animate={{ x: cursor.x - 4, y: cursor.y - 2, opacity: cursor.visible ? 1 : 0, scale: cursor.down ? 0.85 : 1 }}
            transition={{ x: { duration: 1.1, ease }, y: { duration: 1.1, ease }, opacity: { duration: 0.3 }, scale: { duration: 0.12 } }}
          >
            <svg width="24" height="28" viewBox="0 0 26 30" fill="none">
              <path d="M2 2l20 11.5-9 2.2-4.3 8.6L2 2z" fill="#111" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion } from 'motion/react';
import {
  BarChart3, CalendarDays, Check, ChevronDown, ClipboardList, Clock, Info, LayoutGrid, ListFilter, LogOut,
  Menu, Puzzle, Settings, SlidersHorizontal, TrendingUp, Users, Briefcase,
} from 'lucide-react';
import { wait } from './DevolutivaIaMotion';
import { APP_W, Cursor, LaptopMockup, stagePoint, useLaptopViewport } from './LaptopMockup';

/*
 * Hero do case "Redesenhando o Dashboard de Admissão": a tela "Analisar dados" (aba Resumo) dentro
 * do notebook. Os números contam, as barras do funil crescem e o cursor alterna a visualização do
 * funil entre Linha, Funil e Barras. Roda em loop enquanto está visível.
 */

const C = { ink: '#1F2328', sub: '#4B5058', muted: '#8A8F98', line: '#E3E5E8', page: '#F5F6F8', blue: '#1A66DB', navy: '#141B2D' };

// Degradê do funil: azul nas primeiras etapas, verde nas últimas
const COLORS = ['#3D6BF2', '#4775E8', '#4E81D6', '#5089C2', '#4F8FAE', '#4F9696', '#559D83', '#5FA46F'];
const FUNNEL = [
  { label: 'Admissão não iniciada', v: 100 },
  { label: 'Convite enviado', v: 98 },
  { label: 'Dados Exame', v: 97 },
  { label: 'Envio documentação', v: 96 },
  { label: 'Benefícios', v: 93 },
  { label: 'Integração Folha Pgto', v: 91 },
  { label: 'Assinatura contrato', v: 89 },
  { label: 'Admissão concluída', v: 88 },
];

type View = 'barras' | 'linha' | 'funil';

const grow = [0.16, 1, 0.3, 1] as const;

function Counter({ to, decimals = 0, play, delay = 0 }: { to: number; decimals?: number; play: boolean; delay?: number }) {
  const [v, setV] = useState(play ? 0 : to);
  useEffect(() => {
    if (!play) { setV(to); return; }
    setV(0);
    const c = animate(0, to, { duration: 1.3, delay, ease: grow, onUpdate: setV });
    return () => c.stop();
  }, [play, to, delay]);
  return <>{v.toFixed(decimals).replace('.', ',')}</>;
}

const CHART_H = 250; // altura útil do gráfico (100 no topo, 0 na base)
const CHART_W = 1020;
const COL_W = CHART_W / FUNNEL.length;

function BarsView({ play }: { play: boolean }) {
  return (
    <div className="absolute inset-0 flex">
      {FUNNEL.map((b, i) => (
        <div key={b.label} className="relative flex flex-col items-center justify-end" style={{ width: COL_W }}>
          <motion.span className="text-[11px] font-medium mb-1 whitespace-nowrap" initial={play ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.5 + i * 0.08 + 0.6 }}>
            {b.v} ({b.v}%)
          </motion.span>
          <motion.span
            className="block rounded-t-[4px]"
            style={{ width: 82, height: (b.v / 100) * CHART_H, background: COLORS[i], transformOrigin: 'bottom' }}
            initial={play ? { scaleY: 0 } : false}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 0.5 + i * 0.08, ease: grow }}
          />
        </div>
      ))}
    </div>
  );
}

function LineView() {
  const pts = FUNNEL.map((b, i) => ({ x: COL_W * i + COL_W / 2, y: CHART_H - (b.v / 100) * CHART_H + 20 }));
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x},${p.y}`).join(' ');
  return (
    <svg className="absolute inset-0 overflow-visible" width={CHART_W} height={CHART_H + 20}>
      <defs>
        <linearGradient id="dash-line" x1="0" x2="1">
          <stop offset="0" stopColor={COLORS[0]} />
          <stop offset="1" stopColor={COLORS[7]} />
        </linearGradient>
        <linearGradient id="dash-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={COLORS[3]} stopOpacity=".22" />
          <stop offset="1" stopColor={COLORS[3]} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path d={`${d} L${pts[pts.length - 1].x},${CHART_H + 20} L${pts[0].x},${CHART_H + 20} Z`} fill="url(#dash-area)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.9 }} />
      <motion.path d={d} fill="none" stroke="url(#dash-line)" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.3, ease: 'easeInOut' }} />
      {pts.map((p, i) => (
        <motion.g key={i} initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.15 + i * 0.15 }} style={{ transformOrigin: `${p.x}px ${p.y}px` }}>
          <circle cx={p.x} cy={p.y} r={7} fill="#fff" stroke={COLORS[i]} strokeWidth={3} />
          <text x={p.x} y={p.y - 16} textAnchor="middle" fontSize={11} fontWeight={500} fill={C.ink}>{FUNNEL[i].v} ({FUNNEL[i].v}%)</text>
        </motion.g>
      ))}
    </svg>
  );
}

function FunnelView() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-[7px]">
      {FUNNEL.map((b, i) => (
        <div key={b.label} className="flex items-center gap-4">
          <span className="text-[12px] text-right shrink-0" style={{ width: 170, color: C.sub }}>{b.label}</span>
          <div className="flex-1 flex justify-center">
            <motion.span
              className="block rounded-[4px]"
              style={{ height: 22, width: `${b.v - 12}%`, background: `linear-gradient(90deg, ${COLORS[i]}cc, ${COLORS[i]})`, transformOrigin: 'center' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: grow }}
            />
          </div>
          <span className="text-[12px] font-medium shrink-0" style={{ width: 72 }}>{b.v} ({b.v}%)</span>
        </div>
      ))}
    </div>
  );
}

// `key` declarado porque o projeto não tem @types/react instalado
function AnalisarDadosScreen({ view, play, toggleRefs }: { view: View; play: boolean; toggleRefs: any; key?: number }) {
  const rail = [Briefcase, ClipboardList, Settings, Users, Puzzle, BarChart3, LogOut];
  const kpis = [
    { title: 'Taxa de admissões concluídas no período', value: <><Counter to={88} decimals={1} play={play} delay={0.2} />%</>, sub: <><b>88</b> concluídas de <b>100</b> iniciadas</> },
    { title: 'Tempo médio de admissão no período', value: <><Counter to={10} play={play} delay={0.3} /> dias</>, sub: <>eficiência operacional no período</> },
    { title: 'Taxa de conversão dos documentos no período', value: <><Counter to={84.4} decimals={1} play={play} delay={0.4} />%</>, sub: <><b>2.111</b> validados de <b>2.500</b> enviados</> },
    { title: 'Admissões com diversidade no período', value: <><Counter to={11} play={play} delay={0.5} /><span className="text-[13px] ml-2" style={{ color: C.sub }}>39,3% do total de admissões</span></>, sub: null },
  ];
  const toggles: { id: View; label: string; Icon: any }[] = [
    { id: 'funil', label: 'Funil', Icon: SlidersHorizontal },
    { id: 'linha', label: 'Linha', Icon: TrendingUp },
    { id: 'barras', label: 'Barras', Icon: Check },
  ];

  return (
    <div className="absolute inset-0 font-sans" style={{ width: APP_W, background: C.page, color: C.ink }}>
      {/* Barra de produtos */}
      <div className="absolute left-0 right-0 top-0 flex items-center gap-8 bg-white border-b px-5" style={{ height: 46, borderColor: C.line }}>
        <Menu size={18} />
        <span className="text-[22px] font-extrabold tracking-tight -ml-3" style={{ color: '#2D6CDF' }}>Gupy</span>
        <span className="flex items-center gap-1 text-[12px] font-medium">
          {['Central de Carreiras', 'Recrutamento e Seleção', 'Admissão', 'Engajamento', 'Performance', 'Treinamentos'].map(p => (
            <span key={p} className="rounded-md px-3 py-1.5" style={p === 'Admissão' ? { background: '#E8EEFB', color: C.blue } : undefined}>{p}</span>
          ))}
        </span>
        <span className="ml-auto flex items-center gap-2 rounded-full border-2 px-3 py-1 text-[12px] font-medium" style={{ borderColor: '#2D3340' }}><LayoutGrid size={13} /> Conhecer mais produtos</span>
      </div>

      {/* Menu lateral */}
      <div className="absolute left-0 bottom-0 bg-white flex flex-col items-center pt-3 gap-[22px]" style={{ top: 46, width: 52 }}>
        <span className="rounded-full" style={{ width: 28, height: 28, background: 'linear-gradient(135deg,#8B4A2B,#D49A73)' }} />
        {rail.map((Icon, i) => (
          <span key={i} className="flex items-center justify-center rounded-md" style={{ width: 40, height: 30, background: i === 5 ? '#E8EEFB' : 'transparent' }}>
            <Icon size={17} strokeWidth={2.2} />
          </span>
        ))}
      </div>

      {/* Conteúdo */}
      <div className="absolute" style={{ left: 52 + 42, right: 42, top: 46 + 26 }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[26px] font-semibold leading-none">Analisar dados</p>
            <p className="flex items-center gap-1.5 text-[12.5px] mt-2.5" style={{ color: C.sub }}><Clock size={14} /> Última atualização hoje às 04h49</p>
          </div>
          <div className="flex items-center gap-5 text-[13px]">
            <span className="flex items-center gap-1.5 font-medium"><Settings size={15} /> Configurações</span>
            <span className="flex items-center gap-2.5 rounded-full border px-4 py-1.5 bg-white font-medium" style={{ borderColor: C.line }}>
              Créditos
              <span className="w-12 h-1.5 rounded-full overflow-hidden" style={{ background: '#E3E5E8' }}><span className="block h-full w-1/2" style={{ background: '#1A5FB4' }} /></span>
              <span className="text-[11px] font-normal" style={{ color: C.sub }}>50% (500/1000)</span>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 text-[13px]">
            <span className="flex rounded-full border overflow-hidden bg-white" style={{ borderColor: C.line }}>
              <span className="flex items-center gap-1.5 px-3.5 py-2 text-white" style={{ background: C.navy }}><Check size={13} /> Período</span>
              <span className="flex items-center gap-1.5 px-3.5 py-2"><CalendarDays size={13} /> Janelas</span>
            </span>
            <span className="flex items-center gap-10 rounded-md border px-3 py-2 bg-white text-[14px]" style={{ borderColor: '#B9BEC6' }}>Últimos 90 dias <ChevronDown size={14} /></span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border-2 px-4 py-1.5 text-[13px] font-medium" style={{ borderColor: C.navy }}><ListFilter size={14} /> Filtros</span>
        </div>

        <div className="flex gap-7 mt-6 text-[14px] border-b" style={{ borderColor: C.line }}>
          {['Resumo', 'Volume das admissões', 'Eficiência operacional', 'Documentos', 'Diversidade', 'Minhas análises'].map((t, i) => (
            <span key={t} className="pb-2.5 px-2 relative" style={{ color: i === 0 ? C.blue : C.ink }}>
              {t}
              {t === 'Minhas análises' && <span className="ml-2 text-[10.5px] font-semibold text-white rounded px-1.5 py-0.5" style={{ background: '#4CAF50' }}>Novo</span>}
              {i === 0 && <span className="absolute left-0 right-0 bottom-0 h-[2px]" style={{ background: C.blue }} />}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-4 mt-4">
          {kpis.map((k, i) => (
            <motion.div key={k.title} className="bg-white rounded-xl border px-5 py-4" style={{ borderColor: C.line, height: 160 }} initial={play ? { opacity: 0, y: 12 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1, ease: grow }}>
              <div className="flex justify-between gap-3">
                <p className="text-[13px] leading-[1.35]">{k.title}</p>
                <Info size={15} color={C.sub} className="shrink-0" />
              </div>
              <p className="text-[34px] leading-none mt-4 tabular-nums">{k.value}</p>
              {k.sub && <p className="text-[11.5px] mt-3" style={{ color: C.sub }}>{k.sub}</p>}
            </motion.div>
          ))}
        </div>

        <motion.div className="bg-white rounded-xl border mt-4 px-5 pt-4" style={{ borderColor: C.line, height: 460 }} initial={play ? { opacity: 0, y: 12 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35, ease: grow }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="flex items-center gap-1.5 text-[15px] font-medium">Funil de admissões concluídas no período <Info size={15} color={C.sub} /></p>
              <p className="text-[12px] mt-1" style={{ color: C.sub }}>O gráfico mostra a quantidade de pré-colaboradores que passaram por cada etapa do processo.</p>
            </div>
            <div className="flex rounded-full border overflow-hidden text-[13px]" style={{ borderColor: C.line }}>
              {toggles.map(t => (
                <span
                  key={t.id}
                  ref={el => { toggleRefs.current[t.id] = el; }}
                  className="flex items-center gap-1.5 px-4 py-1.5 border-l first:border-l-0 transition-colors duration-200"
                  style={{ borderColor: C.line, background: view === t.id ? C.navy : '#fff', color: view === t.id ? '#fff' : C.ink }}
                >
                  {view === t.id ? <Check size={13} /> : <t.Icon size={13} />} {t.label}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mt-8 ml-10" style={{ height: CHART_H + 20, width: CHART_W }}>
            {view !== 'funil' && [100, 80, 60, 40, 20, 0].map((t, i) => (
              <div key={t} className="absolute left-0 right-0 border-t" style={{ top: 20 + (i / 5) * CHART_H, borderColor: '#EEF0F2' }}>
                <span className="absolute -left-9 -top-2 text-[11px] w-6 text-right" style={{ color: C.sub }}>{t}</span>
              </div>
            ))}
            <AnimatePresence mode="wait">
              <motion.div key={view} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                {view === 'barras' && <BarsView play={play} />}
                {view === 'linha' && <LineView />}
                {view === 'funil' && <FunnelView />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function DashboardLaptopMotion() {
  const { viewRef, width, inView } = useLaptopViewport();
  const stageRef = useRef<HTMLDivElement>(null);
  const toggleRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const [view, setView] = useState<View>('barras');
  const [play, setPlay] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [cursor, setCursor] = useState<Cursor>({ x: 1150, y: 760, visible: false, down: false });

  useEffect(() => {
    if (!inView || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const token = { cancelled: false };

    const clickToggle = async (id: View) => {
      setCursor(c => ({ ...c, ...stagePoint(stageRef.current, toggleRefs.current[id]), visible: true }));
      await wait(1100, token);
      setCursor(c => ({ ...c, down: true }));
      await wait(160, token);
      setCursor(c => ({ ...c, down: false }));
      setView(id);
    };

    const run = async () => {
      while (!token.cancelled) {
        // Números contam e barras crescem
        setView('barras');
        setPlay(true);
        setCycle(n => n + 1);
        setCursor(c => ({ ...c, visible: false }));
        await wait(3400, token);

        // Alterna as visualizações do funil
        await clickToggle('linha');
        await wait(2800, token);
        await clickToggle('funil');
        await wait(2800, token);
        await clickToggle('barras');
        await wait(3000, token);
      }
    };

    run().catch(() => {});
    return () => { token.cancelled = true; };
  }, [inView]);

  return (
    <LaptopMockup
      viewRef={viewRef}
      width={width}
      stageRef={stageRef}
      tabs={[{ title: 'Analisar dados', url: 'app.gupy.io/admissao/analisar-dados/resumo' }]}
      activeTab={0}
      cursor={cursor}
      label="Notebook com o Dashboard de Admissão: números do resumo e funil alternando entre barras, linha e funil"
    >
      <AnalisarDadosScreen key={cycle} view={view} play={play} toggleRefs={toggleRefs} />
    </LaptopMockup>
  );
}

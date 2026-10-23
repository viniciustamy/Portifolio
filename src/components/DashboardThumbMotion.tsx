import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion } from 'motion/react';
import { CalendarDays, Check, ChevronDown, Clock, Info, ListFilter, Settings } from 'lucide-react';
import { wait } from './DevolutivaIaMotion';

/*
 * Thumb animada do case "Redesenhando o Dashboard de Admissão": a tela "Analisar dados" recriada
 * em código. Parada, mostra a aba Resumo com os valores finais (igual à thumbnail). Em foco:
 * os cards entram e os números contam até o valor, as barras do funil crescem, o cursor clica em
 * "Volume das admissões" e os três gráficos dessa aba entram; depois volta ao Resumo e recomeça.
 */

const STAGE_W = 760;
const PANEL_LEFT = 36;
const PANEL_TOP = 28;

const C = {
  ink: '#1F2328',
  sub: '#4B5058',
  muted: '#8A8F98',
  line: '#E3E5E8',
  page: '#F6F7F9',
  tab: '#1A66DB',
};

// Degradê do funil: azul nas primeiras etapas, verde nas últimas
const FUNNEL_COLORS = ['#1043E0', '#0F4FD0', '#0E57BF', '#0F5FAE', '#11688F', '#137178', '#167A62', '#1B8A4E'];
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

const KPIS = [
  { title: 'Taxa de admissões concluídas no período', to: 88, decimals: 1, suffix: '%', sub: <><b>88</b> concluídas de <b>100</b> iniciadas</> },
  { title: 'Tempo médio de admissão no período', to: 10, decimals: 0, suffix: ' dias', sub: <>eficiência operacional no período</> },
  { title: 'Taxa de conversão dos documentos no período', to: 84.4, decimals: 1, suffix: '%', sub: <><b>2.111</b> validados de <b>2.500</b> enviados</> },
  { title: 'Admissões com diversidade no período', to: 11, decimals: 0, suffix: '', sub: <>39,3% do total de admissões</> },
];

const REASONS = [
  { label: 'Condições de trabalho (escala, carga horária)', v: 12, color: '#8E1B1B' },
  { label: 'Pessoa reprovada no exame médico', v: 8, color: '#D92D2D' },
  { label: 'Retenção na empresa atual', v: 6, color: '#E64545' },
  { label: 'Vaga cancelada ou congelada', v: 4, color: '#EE5B5B' },
  { label: 'Desistência por motivos pessoais', v: 3, color: '#F27A7A' },
  { label: 'Documentação inconsistente', v: 3, color: '#F48C8C' },
  { label: 'Falta de retorno do candidato', v: 2, color: '#F7A3A3' },
];

const TABS = ['Resumo', 'Volume das admissões', 'Eficiência operacional', 'Documentos', 'Diversidade', 'Minhas análises'];

type Page = 'resumo' | 'volume';

const ease = [0.65, 0, 0.35, 1] as const;
const grow = [0.16, 1, 0.3, 1] as const;

function formatNumber(v: number, decimals: number) {
  return v.toFixed(decimals).replace('.', ',');
}

// Número que conta de 0 até `to` quando `play`; parado, mostra direto o valor final
function Counter({ to, decimals, suffix, play, delay }: { to: number; decimals: number; suffix: string; play: boolean; delay: number }) {
  const [v, setV] = useState(play ? 0 : to);
  useEffect(() => {
    if (!play) { setV(to); return; }
    setV(0);
    const controls = animate(0, to, { duration: 1.3, delay, ease: grow, onUpdate: setV });
    return () => controls.stop();
  }, [play, to, delay]);
  return <>{formatNumber(v, decimals)}{suffix}</>;
}

// `key` declarado porque o projeto não tem @types/react instalado
function Card({ children, className = '', play, delay = 0 }: { children: any; className?: string; play: boolean; delay?: number; key?: string }) {
  return (
    <motion.div
      className={`bg-white rounded-xl border ${className}`}
      style={{ borderColor: C.line }}
      initial={play ? { opacity: 0, y: 14 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: grow }}
    >
      {children}
    </motion.div>
  );
}

function CardTitle({ children }: { children: string }) {
  return (
    <p className="flex items-center gap-1.5 text-[13.5px] font-medium">
      {children} <Info size={13} color={C.sub} />
    </p>
  );
}

function ResumoPage({ play }: { play: boolean }) {
  const chartH = 190;
  return (
    <div className="flex flex-col gap-3.5">
      <div className="grid grid-cols-4 gap-3">
        {KPIS.map((k, i) => (
          <Card key={k.title} play={play} delay={i * 0.12} className="px-3.5 py-3" >
            <div className="flex justify-between gap-2">
              <p className="text-[11.5px] leading-[1.35]">{k.title}</p>
              <Info size={13} color={C.sub} className="shrink-0" />
            </div>
            <p className="text-[30px] leading-none mt-3 tabular-nums">
              <Counter to={k.to} decimals={k.decimals} suffix={k.suffix} play={play} delay={0.25 + i * 0.12} />
            </p>
            <p className="text-[10.5px] mt-3" style={{ color: C.sub }}>{k.sub}</p>
          </Card>
        ))}
      </div>

      <Card play={play} delay={0.45} className="px-4 pt-3.5 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Funil de admissões concluídas no período</CardTitle>
            <p className="text-[10.5px] mt-1" style={{ color: C.sub }}>O gráfico mostra a quantidade de pré-colaboradores que passaram por cada etapa do processo.</p>
          </div>
          <div className="flex text-[11px] rounded-full border overflow-hidden shrink-0" style={{ borderColor: C.line }}>
            <span className="px-3 py-1">Funil</span>
            <span className="px-3 py-1 border-l" style={{ borderColor: C.line }}>Linha</span>
            <span className="px-3 py-1 flex items-center gap-1 text-white" style={{ background: '#141B2D' }}><Check size={11} /> Barras</span>
          </div>
        </div>

        <div className="relative mt-4 ml-7" style={{ height: chartH }}>
          {[100, 80, 60, 40, 20, 0].map((t, i) => (
            <div key={t} className="absolute left-0 right-0 border-t" style={{ top: (i / 5) * chartH, borderColor: '#EEF0F2' }}>
              <span className="absolute -left-7 -top-2 text-[9.5px] w-5 text-right" style={{ color: C.sub }}>{t}</span>
            </div>
          ))}
          <div className="absolute inset-0 flex items-end justify-around px-2">
            {FUNNEL.map((b, i) => (
              <div key={b.label} className="relative flex flex-col items-center justify-end h-full" style={{ width: 62 }}>
                <motion.span
                  className="text-[9px] font-medium mb-1 whitespace-nowrap"
                  initial={play ? { opacity: 0 } : false}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.9 + i * 0.09 + 0.6 }}
                >
                  {b.v} ({b.v}%)
                </motion.span>
                <motion.span
                  className="block w-full rounded-t-[3px]"
                  style={{ background: FUNNEL_COLORS[i], height: (b.v / 100) * (chartH - 14), transformOrigin: 'bottom' }}
                  initial={play ? { scaleY: 0 } : false}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 1, delay: 0.9 + i * 0.09, ease: grow }}
                />
                <span className="absolute -bottom-6 text-[8.5px] whitespace-nowrap -rotate-[18deg]" style={{ color: C.sub }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: 22 }} />
      </Card>
    </div>
  );
}

// Fluxo de navegação simplificado: colunas por etapa ligadas por faixas que vão afinando
function Sankey({ play }: { play: boolean }) {
  const W = 860;
  const H = 230;
  const heights = [220, 220, 196, 184, 162, 150, 120, 112];
  const labels = ['Início', 'Convite enviado', 'Dados Exame', 'Envio documentação', 'Benefícios', 'Folha Pgto', 'Assinatura', 'Concluído'];
  const step = (W - 40) / (heights.length - 1);
  const top = (h: number) => (H - h) / 2 - 6;

  return (
    <svg viewBox={`0 0 ${W} ${H + 20}`} className="w-full" style={{ height: H + 20 }}>
      <defs>
        <clipPath id="sankey-reveal">
          <motion.rect
            x={0}
            y={0}
            height={H + 20}
            initial={{ width: play ? 0 : W }}
            animate={{ width: W }}
            transition={{ duration: 2, delay: 0.5, ease: [0.45, 0, 0.25, 1] }}
          />
        </clipPath>
      </defs>
      <g clipPath="url(#sankey-reveal)">
        {heights.slice(0, -1).map((h, i) => {
          const x1 = 10 + i * step + 14;
          const x2 = 10 + (i + 1) * step;
          const h2 = heights[i + 1];
          return (
            <path
              key={`band-${i}`}
              d={`M${x1},${top(h)} C${(x1 + x2) / 2},${top(h)} ${(x1 + x2) / 2},${top(h2)} ${x2},${top(h2)} L${x2},${top(h2) + h2} C${(x1 + x2) / 2},${top(h2) + h2} ${(x1 + x2) / 2},${top(h) + h} ${x1},${top(h) + h} Z`}
              fill={FUNNEL_COLORS[i]}
              opacity={0.18}
            />
          );
        })}
        {/* Desvios: quem pulou etapas */}
        <path d={`M${10 + step + 14},${top(220) + 200} C${10 + step * 1.5},${top(220) + 205} ${10 + step * 1.6},${H - 2} ${10 + step * 2},${H - 2}`} stroke="#E5484D" strokeOpacity={0.35} strokeWidth={6} fill="none" />
        <rect x={10 + step * 2} y={H - 8} width={14} height={8} fill="#E5484D" />
        <path d={`M${10 + step * 3 + 14},${top(184) + 170} C${10 + step * 3.5},${top(184) + 175} ${10 + step * 3.6},${H - 22} ${10 + step * 4},${H - 22}`} stroke="#E5484D" strokeOpacity={0.35} strokeWidth={6} fill="none" />
        <rect x={10 + step * 4} y={H - 28} width={14} height={8} fill="#E5484D" />
        {heights.map((h, i) => (
          <g key={`node-${i}`}>
            <rect x={10 + i * step} y={top(h)} width={14} height={h} fill={FUNNEL_COLORS[i]} />
            <text x={10 + i * step + 18} y={top(h) + h / 2} fontSize={10} fill={C.ink}>{labels[i]}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function VolumePage({ play }: { play: boolean }) {
  return (
    <div className="flex flex-col gap-3.5">
      <Card play={play} className="px-4 pt-3.5 pb-4">
        <CardTitle>Aderência das admissões concluídas ao fluxo ideal no período</CardTitle>
        <div className="flex items-center gap-3 mt-4">
          <span className="text-[10px] whitespace-nowrap" style={{ color: C.sub }}>Admissões concluídas</span>
          <div className="relative flex-1 h-6">
            <div className="absolute inset-y-0 left-0 flex" style={{ width: '88%' }}>
              {[{ w: 92, c: '#1B8A4E' }, { w: 6, c: '#E8A23A' }, { w: 2, c: '#E5484D' }].map((seg, i) => (
                <motion.span
                  key={seg.c}
                  className="h-full"
                  style={{ width: `${seg.w}%`, background: seg.c, transformOrigin: 'left' }}
                  initial={play ? { scaleX: 0 } : false}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.5, ease: grow }}
                />
              ))}
            </div>
            <span className="absolute text-[10px] font-semibold top-1" style={{ left: '89%' }}>88</span>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-3 text-[10px]" style={{ color: C.sub }}>
          {[['#1B8A4E', 'Passaram por todas as etapas'], ['#E8A23A', 'Pularam 1 etapa'], ['#E5484D', 'Pularam múltiplas etapas']].map(([c, l]) => (
            <span key={l} className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />{l}</span>
          ))}
        </div>
      </Card>

      <Card play={play} delay={0.15} className="px-4 pt-3.5 pb-3">
        <CardTitle>Fluxo de navegação das admissões concluídas no período</CardTitle>
        <div className="mt-3"><Sankey play={play} /></div>
      </Card>

      <Card play={play} delay={0.3} className="px-4 pt-3.5 pb-4">
        <CardTitle>Motivos das admissões enviadas para etapa fora do processo (cancelada) no período</CardTitle>
        <div className="flex flex-col gap-2 mt-4">
          {REASONS.map((r, i) => (
            <div key={r.label} className="flex items-center gap-2">
              <span className="text-[9.5px] text-right leading-tight shrink-0" style={{ width: 150, color: C.sub }}>{r.label}</span>
              <div className="flex-1 flex items-center gap-1.5">
                <motion.span
                  className="block h-3.5"
                  style={{ width: `${(r.v / 12) * 90}%`, background: r.color, transformOrigin: 'left' }}
                  initial={play ? { scaleX: 0 } : false}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 1.2 + i * 0.1, ease: grow }}
                />
                <span className="text-[9.5px] font-semibold">{r.v}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function DashboardThumbMotion({ active }: { active: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [size, setSize] = useState({ w: 0, h: 0 });
  const [page, setPage] = useState<Page>('resumo');
  const [cycle, setCycle] = useState(0); // remonta as páginas para repetir a entrada
  const [play, setPlay] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [cursor, setCursor] = useState({ x: 700, y: 520, visible: false, down: false });

  const scale = size.w / STAGE_W;
  const stageH = scale ? size.h / scale : 0;

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setSize({ w: entry.contentRect.width, h: entry.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const reset = () => {
      setPage('resumo');
      setPlay(false);
      setScroll(0);
      setCursor(c => ({ ...c, visible: false, down: false }));
      setCycle(n => n + 1);
    };

    if (!active || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      reset();
      return;
    }

    const token = { cancelled: false };

    const centerOf = (el: HTMLElement | null) => {
      const stage = stageRef.current;
      if (!el || !stage) return { x: 300, y: 60 };
      const r = el.getBoundingClientRect();
      const s = stage.getBoundingClientRect();
      const k = s.width / STAGE_W;
      return { x: (r.left + r.width / 2 - s.left) / k, y: (r.top + r.height / 2 - s.top) / k };
    };

    const clickTab = async (i: number) => {
      setCursor(c => ({ ...c, ...centerOf(tabRefs.current[i]), visible: true }));
      await wait(1400, token);
      setCursor(c => ({ ...c, down: true }));
      await wait(200, token);
      setCursor(c => ({ ...c, down: false }));
    };

    const run = async () => {
      while (!token.cancelled) {
        // 1. Resumo: cards entram, números contam, barras do funil crescem
        setPage('resumo');
        setScroll(0);
        setPlay(true);
        setCycle(n => n + 1);
        await wait(3600, token);

        // 2. Clique em "Volume das admissões" e os três gráficos entram
        await clickTab(1);
        setPage('volume');
        setCycle(n => n + 1);
        setCursor(c => ({ ...c, x: c.x + 90, y: c.y + 140 }));
        await wait(3400, token);
        setScroll(280);
        await wait(3200, token);

        // 3. Volta ao Resumo e recomeça
        await clickTab(0);
        setCursor(c => ({ ...c, visible: false }));
      }
    };

    run().catch(() => {});
    return () => { token.cancelled = true; };
  }, [active]);

  const activeTab = page === 'resumo' ? 0 : 1;

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden select-none" aria-hidden="true">
      {scale > 0 && (
        <div ref={stageRef} className="absolute left-0 top-0 origin-top-left font-sans" style={{ width: STAGE_W, height: stageH, transform: `scale(${scale})`, color: C.ink }}>
          {/* Tela "Analisar dados" — sai pelas bordas da direita e de baixo, como na thumbnail */}
          <div className="absolute rounded-tl-[18px] overflow-hidden flex flex-col" style={{ left: PANEL_LEFT, top: PANEL_TOP, width: 940, bottom: 0, background: C.page, boxShadow: '0 18px 40px rgb(16 24 40 / .14)' }}>
            {/* Cabeçalho da página + abas: fixos; o conteúdo rola por baixo deles */}
            <div className="relative z-10 px-6 pt-5 shrink-0" style={{ background: C.page }}>
              <div className="flex items-start justify-between" style={{ width: 690 }}>
                <div>
                  <p className="text-[22px] font-medium leading-none">Analisar dados</p>
                  <p className="flex items-center gap-1.5 text-[11px] mt-2" style={{ color: C.sub }}>
                    <Clock size={12} /> Última atualização hoje às 04h49
                  </p>
                </div>
                <div className="flex items-center gap-4 text-[11.5px]">
                  <span className="flex items-center gap-1.5"><Settings size={13} /> Configurações</span>
                  <span className="flex items-center gap-2 rounded-full border px-3 py-1.5 bg-white" style={{ borderColor: C.line }}>
                    Créditos
                    <span className="w-10 h-1.5 rounded-full overflow-hidden" style={{ background: '#E3E5E8' }}><span className="block h-full w-1/2" style={{ background: '#1A5FB4' }} /></span>
                    <span style={{ color: C.sub }}>50% (500/1000)</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4" style={{ width: 690 }}>
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="flex rounded-full border overflow-hidden bg-white" style={{ borderColor: C.line }}>
                    <span className="flex items-center gap-1 px-3 py-1.5 text-white" style={{ background: '#141B2D' }}><Check size={12} /> Período</span>
                    <span className="flex items-center gap-1 px-3 py-1.5"><CalendarDays size={12} /> Janelas</span>
                  </span>
                  <span className="flex items-center gap-6 rounded-md border px-3 py-1.5 bg-white" style={{ borderColor: '#C9CDD3' }}>
                    Últimos 90 dias <ChevronDown size={13} />
                  </span>
                </div>
                <span className="flex items-center gap-1.5 text-[12px] rounded-full border-2 px-3 py-1" style={{ borderColor: '#141B2D' }}>
                  <ListFilter size={13} /> Filtros
                </span>
              </div>
              <div className="flex gap-7 text-[14px] mt-4 border-b" style={{ borderColor: C.line }}>
                {TABS.map((t, i) => (
                  <span key={t} ref={el => { tabRefs.current[i] = el; }} className="relative pb-3 whitespace-nowrap" style={{ color: i === activeTab ? C.tab : C.ink }}>
                    {t}
                    {t === 'Minhas análises' && <span className="ml-1.5 text-[10px] font-semibold text-white rounded px-1.5 py-0.5" style={{ background: '#4CAF50' }}>Novo</span>}
                    {i === activeTab && <motion.span layoutId="dash-thumb-tab" className="absolute left-0 right-0 bottom-0 h-[2px]" style={{ background: C.tab }} transition={{ duration: 0.35, ease }} />}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative flex-1 min-h-0 overflow-hidden">
              <motion.div className="px-6 pt-4 pb-8" initial={false} animate={{ y: -scroll }} transition={{ duration: 1.3, ease }} style={{ width: 900 }}>
                <AnimatePresence mode="wait">
                  <motion.div key={`${page}-${cycle}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                    {page === 'resumo' ? <ResumoPage play={play} /> : <VolumePage play={play} />}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* Cursor */}
          <motion.div
            className="absolute left-0 top-0 z-30 pointer-events-none"
            initial={false}
            animate={{ x: cursor.x - 4, y: cursor.y - 2, opacity: cursor.visible ? 1 : 0, scale: cursor.down ? 0.85 : 1 }}
            transition={{ x: { duration: 1.3, ease }, y: { duration: 1.3, ease }, opacity: { duration: 0.3 }, scale: { duration: 0.12 } }}
          >
            <svg width="26" height="30" viewBox="0 0 26 30" fill="none">
              <path d="M2 2l20 11.5-9 2.2-4.3 8.6L2 2z" fill="#111" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      )}
    </div>
  );
}

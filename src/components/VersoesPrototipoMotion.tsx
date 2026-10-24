import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Bell, Briefcase, ChartColumn, Check, ChevronDown, Clock, Expand, Filter, Home, Info,
  LayoutGrid, LogOut, MessageCircle, MonitorSmartphone, Plus, Puzzle, Settings, Shuffle, Users,
} from 'lucide-react';
import { wait } from './DevolutivaIaMotion';

/*
 * Motion da seção de prototipação (Dashboard de Admissão): o protótipo no Google AI Studio, da barra
 * do app para baixo. A cada troca, a câmera aproxima no seletor de versão, o cursor escolhe a próxima
 * (Versão 1 → 2 → 3) e a câmera volta para mostrar as novas abas e conteúdo. Roda em loop enquanto
 * está visível.
 */

const W = 1400;
const H = 840;
const STUDIO_H = 52; // barra do AI Studio
const ZOOM = 2.1;
const NAV_H = 70; // barra de produtos da Gupy
const RAIL_W = 64;

const C = { ink: '#1F2328', sub: '#4B5058', muted: '#8A8F98', line: '#E3E5E8', page: '#F7F8FA', blue: '#2563EB' };
const ease = [0.65, 0, 0.35, 1] as const;
const grow = [0.16, 1, 0.3, 1] as const;

type Version = 0 | 1 | 2;

const VERSIONS = ['Versão 1 (Simplificada)', 'Versão 2 (Completa)', 'Versão 3 (V1 + Fluxo)'];

// Abas de cada versão: `novo` marca o que muda em relação à versão anterior (pisca ao trocar)
const TABS: { label: string; active?: boolean; badge?: boolean; novo?: boolean }[][] = [
  [
    { label: 'Resumo' }, { label: 'Admissões' }, { label: 'Eficiência operacional', active: true }, { label: 'Documentos' },
    { label: 'Diversidade' }, { label: 'Minhas análises', badge: true }, { label: 'Configurações' },
  ],
  [
    { label: 'Visão Geral', novo: true }, { label: 'Admissões' }, { label: 'Eficiência operacional' }, { label: 'Documentos' },
    { label: 'Diversidade' }, { label: 'Minhas análises', badge: true, active: true }, { label: 'Configurações' }, { label: 'Visão Executiva', novo: true },
  ],
  [
    { label: 'Resumo' }, { label: 'Admissões' }, { label: 'Janelas de Admissão', novo: true }, { label: 'Eficiência operacional' },
    { label: 'Documentos' }, { label: 'Diversidade', active: true }, { label: 'Minhas análises', badge: true }, { label: 'Configurações' },
  ],
];

// Curva suave passando pelos pontos (Catmull-Rom → Bézier)
function smoothPath(pts: { x: number; y: number }[]) {
  return pts.reduce((d, p, i, a) => {
    if (i === 0) return `M${p.x},${p.y}`;
    const p0 = a[i - 2] ?? a[i - 1];
    const p1 = a[i - 1];
    const p2 = p;
    const p3 = a[i + 1] ?? p;
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    return `${d} C${c1.x},${c1.y} ${c2.x},${c2.y} ${p2.x},${p2.y}`;
  }, '');
}

function Card({ children, className = '', style }: { children: any; className?: string; style?: any }) {
  return <div className={`bg-white rounded-2xl border ${className}`} style={{ borderColor: C.line, ...style }}>{children}</div>;
}

// Versão 1: análise da operação + tempo médio ao longo do ano
function V1() {
  const values = [14, 13, 15, 16, 14, 12, 11, 13, 12, 10, 9, 11];
  const cw = 560, ch = 230;
  const pts = values.map((v, i) => ({ x: 30 + i * ((cw - 60) / 11), y: ch - (v / 18) * ch + 10 }));
  const donut = [{ v: 150, c: '#3B82F6' }, { v: 60, c: '#9CA3AF' }, { v: 30, c: '#EF4444' }];
  const total = donut.reduce((s, d) => s + d.v, 0);
  let acc = 0;
  return (
    <div className="grid grid-cols-[1fr_1.85fr] gap-4">
      <Card className="px-6 py-5">
        <p className="flex items-center gap-1.5 text-[16px] font-semibold">Análise da operação <Info size={14} color={C.muted} /></p>
        <p className="text-[11px] tracking-wider mt-6" style={{ color: C.muted }}>TEMPO MÉDIO DE ADMISSÃO</p>
        <p className="text-[54px] font-bold leading-none mt-1 tracking-tight">10 dias</p>
        <div className="border-t mt-5 pt-4" style={{ borderColor: C.line }}>
          <p className="text-[11px]" style={{ color: C.muted }}>Faixa de tempo</p>
          <p className="text-[13px] mt-1" style={{ color: C.sub }}>Entenda a distribuição dos tempos das admissões.</p>
          <svg viewBox="0 0 200 140" className="w-full mt-1" style={{ height: 150 }}>
            {donut.map(d => {
              const r = 44, circ = 2 * Math.PI * r;
              const len = (d.v / total) * circ;
              const el = (
                <motion.circle key={d.c} cx={100} cy={72} r={r} fill="none" stroke={d.c} strokeWidth={20} strokeDasharray={`${len - 3} ${circ}`}
                  transform={`rotate(${(acc / total) * 360 - 90} 100 72)`} initial={{ strokeDashoffset: len }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.7, delay: 0.2 + (acc / total) * 0.8 }} />
              );
              acc += d.v;
              return el;
            })}
          </svg>
        </div>
      </Card>
      <Card className="px-6 py-5">
        <div className="flex justify-between">
          <p className="flex items-center gap-1.5 text-[16px] font-semibold">Tempo médio das admissões <Info size={14} color={C.muted} /></p>
          <span className="text-[13px]" style={{ color: C.sub }}>Últimos 12 meses</span>
        </div>
        <svg viewBox={`0 0 ${cw} ${ch + 30}`} className="w-full mt-4" style={{ height: ch + 30 }}>
          {[18, 15, 12, 9, 6, 3, 0].map(t => (
            <g key={t}>
              <line x1={22} x2={cw} y1={ch - (t / 18) * ch + 10} y2={ch - (t / 18) * ch + 10} stroke="#EEF0F3" />
              <text x={0} y={ch - (t / 18) * ch + 14} fontSize={10} fill={C.sub}>{t}</text>
            </g>
          ))}
          <motion.path d={smoothPath(pts)} fill="none" stroke="#3BA6E0" strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.3, ease: 'easeInOut' }} />
          {pts.map((p, i) => (
            <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 + i * 0.09 }}>
              <circle cx={p.x} cy={p.y} r={3.5} fill="#3BA6E0" />
              <text x={p.x} y={p.y - 10} fontSize={10} fontWeight={600} textAnchor="middle" fill={C.ink}>{values[i]}</text>
            </motion.g>
          ))}
        </svg>
      </Card>
    </div>
  );
}

// Versão 2: KPIs + tempo médio por cargo + espaço para novo gráfico
function V2() {
  const kpis = [['Admissões concluídas', '654'], ['Candidatos que desistiram/saíram', '42'], ['Tempo até aceite do convite', '1.2 dias'], ['Tempo até último documento', '3.5 dias']];
  const bars = [4, 8, 12, 3, 15, 5];
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-4">
        {kpis.map(([t, v], i) => (
          <motion.div key={t} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="px-5 py-4" style={{ height: 120 }}>
              <p className="flex items-start gap-2 text-[13.5px] font-medium leading-snug"><LayoutGrid size={12} color={C.muted} className="mt-1 shrink-0" />{t}</p>
              <p className="text-[32px] font-bold mt-3 leading-none">{v}</p>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card className="px-5 py-4" style={{ height: 300 }}>
          <p className="flex items-center gap-2 text-[15px] font-semibold"><LayoutGrid size={12} color={C.muted} /> Tempo médio de admissões por cargo</p>
          <div className="flex items-end gap-4 mt-6 pl-6 border-b" style={{ height: 190, borderColor: C.line }}>
            {bars.map((b, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                <span className="text-[11px] font-semibold mb-1">{b}</span>
                <motion.span className="block w-full rounded-t-[3px]" style={{ height: (b / 15) * 160, background: '#3B82F6', transformOrigin: 'bottom' }}
                  initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.8, delay: 0.3 + i * 0.08, ease: grow }} />
              </div>
            ))}
          </div>
        </Card>
        <div className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center" style={{ height: 300, borderColor: '#C9D3E3' }}>
          <span className="flex items-center justify-center w-12 h-12 rounded-full" style={{ background: '#E8EEFB', color: C.blue }}><ChartColumn size={20} /></span>
          <p className="text-[16px] font-semibold mt-4">Adicione um novo gráfico</p>
          <p className="text-[13px] mt-1" style={{ color: C.sub }}>Comece sua análise criando<br />visualizações personalizadas.</p>
        </div>
      </div>
    </div>
  );
}

// Versão 3: diversidade vs não diversidade ao longo do tempo
function V3() {
  const series = [
    { c: '#22B07D', v: [335, 225, 212, 240, 358, 290, 400, 403, 330, 405, 445, 325] },
    { c: '#9AA4B5', v: [272, 325, 325, 215, 350, 203, 335, 300, 410, 282, 365, 285] },
    { c: '#D3D8E0', v: [80, 38, 63, 52, 63, 45, 50, 105, 105, 87, 65, 80] },
  ];
  const cw = 1040, ch = 250;
  const toPts = (v: number[]) => v.map((y, i) => ({ x: 60 + i * ((cw - 100) / 11), y: ch - (y / 500) * ch + 10 }));
  return (
    <Card className="px-7 py-6">
      <p className="text-[18px] font-semibold">Diversidade vs Não diversidade</p>
      <p className="text-[13.5px] mt-1" style={{ color: C.sub }}>Comparativo total ao longo do tempo</p>
      <svg viewBox={`0 0 ${cw} ${ch + 60}`} className="w-full mt-6" style={{ height: ch + 60 }}>
        {[500, 400, 300, 200, 100, 0].map(t => (
          <g key={t}>
            <line x1={50} x2={cw} y1={ch - (t / 500) * ch + 10} y2={ch - (t / 500) * ch + 10} stroke="#EEF0F3" />
            <text x={10} y={ch - (t / 500) * ch + 14} fontSize={11} fill={C.sub}>{t}</text>
          </g>
        ))}
        {['ago. de 2025', 'out. de 2025', 'dez. de 2025', 'fev. de 2026', 'abr. de 2026', 'jun. de 2026'].map((m, i) => (
          <text key={m} x={60 + i * 2 * ((cw - 100) / 11)} y={ch + 32} fontSize={11} fill={C.sub} textAnchor="middle">{m}</text>
        ))}
        {series.map((s, si) => {
          const pts = toPts(s.v);
          return (
            <g key={s.c}>
              <motion.path d={smoothPath(pts)} fill="none" stroke={s.c} strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, delay: si * 0.2, ease: 'easeInOut' }} />
              {pts.map((p, i) => <motion.circle key={i} cx={p.x} cy={p.y} r={4} fill="#fff" stroke={s.c} strokeWidth={2} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.09 + si * 0.2 }} />)}
            </g>
          );
        })}
        {[['#22B07D', 'Diversidade'], ['#9AA4B5', 'Sem diversidade'], ['#D3D8E0', 'Não se identificaram']].map(([c, l], i) => (
          <g key={l} transform={`translate(${cw / 2 - 210 + i * 150}, ${ch + 52})`}>
            <circle cx={0} cy={-4} r={6} fill={c} />
            <text x={12} y={0} fontSize={12} fill={C.sub}>{l}</text>
          </g>
        ))}
      </svg>
    </Card>
  );
}

export function VersoesPrototipoMotion() {
  const viewRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const optionRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [width, setWidth] = useState(0);
  const [inView, setInView] = useState(false);
  const [version, setVersion] = useState<Version>(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [zoom, setZoom] = useState<{ on: boolean; x: number; y: number }>({ on: false, x: W - 160, y: 140 });
  const [cursor, setCursor] = useState({ x: 1100, y: 600, visible: false, down: false });

  useLayoutEffect(() => {
    const el = viewRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);

  useEffect(() => {
    if (!inView || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const token = { cancelled: false };

    // Centro de um elemento em coordenadas da camada (vale com ou sem zoom)
    const point = (el: HTMLElement | null) => {
      const layer = layerRef.current;
      if (!layer || !el) return { x: W / 2, y: H / 2 };
      const s = layer.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      const k = s.width / W;
      return { x: (r.left + r.width / 2 - s.left) / k, y: (r.top + r.height / 2 - s.top) / k };
    };

    const click = async () => {
      setCursor(c => ({ ...c, down: true }));
      await wait(160, token);
      setCursor(c => ({ ...c, down: false }));
    };

    // Aproxima no seletor, troca a versão e afasta para mostrar o resultado
    const switchTo = async (v: Version) => {
      const trigger = point(triggerRef.current);
      setCursor(c => ({ ...c, ...trigger, visible: true }));
      await wait(900, token);
      // Âncora na borda direita: o seletor e o menu inteiro ficam no quadro
      setZoom({ on: true, x: W, y: trigger.y + 30 });
      await wait(1000, token);
      await click();
      setMenuOpen(true);
      await wait(600, token);
      setCursor(c => ({ ...c, ...point(optionRefs.current[v]) }));
      await wait(1000, token);
      await click();
      setVersion(v);
      await wait(250, token);
      setMenuOpen(false);
      await wait(500, token);
      setZoom(z => ({ ...z, on: false }));
      setCursor(c => ({ ...c, x: c.x - 220, y: c.y + 320, visible: false }));
    };

    const run = async () => {
      setVersion(0);
      setMenuOpen(false);
      setZoom(z => ({ ...z, on: false }));
      await wait(2200, token);
      while (!token.cancelled) {
        await switchTo(1);
        await wait(3200, token);
        await switchTo(2);
        await wait(3400, token);
        await switchTo(0);
        await wait(3200, token);
      }
    };

    run().catch(() => {});
    return () => { token.cancelled = true; };
  }, [inView]);

  const s = width / W;
  const tabs = TABS[version];

  return (
    <div ref={viewRef} className="not-prose relative w-full select-none" style={{ aspectRatio: `${W} / ${H}` }} role="img" aria-label="Protótipo no Google AI Studio trocando entre a versão simplificada, a completa e a versão com fluxo">
        {width > 0 && (
          <div className="absolute left-0 top-0 origin-top-left font-sans rounded-[22px] overflow-hidden bg-white" style={{ width: W, height: H, transform: `scale(${s})`, color: C.ink, boxShadow: '0 0 0 1px #E3E5E8, 0 24px 50px rgb(36 21 16 / .12)' }}>
            <motion.div
              ref={layerRef}
              className="absolute inset-0"
              style={{ transformOrigin: `${zoom.x}px ${zoom.y}px` }}
              initial={false}
              animate={{ scale: zoom.on ? ZOOM : 1 }}
              transition={{ duration: 0.9, ease }}
            >
              {/* Barra do AI Studio */}
              <div className="relative flex items-center justify-center border-b text-[15px]" style={{ height: STUDIO_H, borderColor: C.line }}>
                Analisar dados admissão
                <span className="absolute right-5 flex items-center gap-5 text-[14px]">
                  <span className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5" style={{ borderColor: C.line }}><Shuffle size={14} /> Remix</span>
                  <span className="flex items-center gap-1.5"><MonitorSmartphone size={15} /> Device</span>
                  <Expand size={15} />
                </span>
              </div>

              {/* App */}
              <div className="absolute left-0 right-0 bottom-0" style={{ top: STUDIO_H, background: C.page }}>
                {/* Menu lateral */}
                <div className="absolute left-0 top-0 bottom-0 bg-white border-r flex flex-col items-center gap-[22px] pt-4" style={{ width: RAIL_W, borderColor: C.line }}>
                  <span className="flex items-center justify-center w-9 h-9 rounded-full border-2" style={{ borderColor: C.blue, color: C.blue }}><Bell size={16} /></span>
                  <span className="w-8 h-8 rounded-full" style={{ background: 'linear-gradient(135deg,#8B4A2B,#D49A73)' }} />
                  {[Home, Briefcase, Users, ChartColumn, MessageCircle, Settings, Users, Puzzle].map((Icon, i) => (
                    <span key={i} className="flex items-center justify-center w-9 h-9 rounded-lg" style={{ background: i === 3 ? '#E8EEFB' : 'transparent', color: i === 3 ? C.blue : C.ink }}><Icon size={17} /></span>
                  ))}
                  <span className="font-bold text-[16px]">G</span>
                  <LogOut size={16} className="mt-auto mb-4" />
                </div>

                {/* Barra de produtos + seletor de versão */}
                <div className="absolute right-0 top-0 bg-white border-b flex items-center gap-9 pl-8 pr-6" style={{ left: RAIL_W, height: NAV_H, borderColor: C.line }}>
                  <span className="text-[22px] font-bold">Gupy</span>
                  {['Recrutamento e Seleção', 'Admissão', 'Engajamento', 'Performance', 'Treinamentos'].map(p => (
                    <span key={p} className="text-[14.5px] rounded-md px-3 py-2" style={p === 'Admissão' ? { background: '#E8EEFB', color: C.blue, fontWeight: 600 } : { color: C.sub }}>{p}</span>
                  ))}
                  <span ref={triggerRef} className="ml-auto flex items-center justify-between gap-3 rounded-lg border px-4 py-2 text-[15px] font-medium bg-white" style={{ borderColor: C.line, width: 260 }}>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span key={version} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>{VERSIONS[version]}</motion.span>
                    </AnimatePresence>
                    <ChevronDown size={16} />
                  </span>

                  {/* Menu do seletor */}
                  <AnimatePresence>
                    {menuOpen && (
                      <motion.div
                        className="absolute right-6 z-20 rounded-2xl bg-white py-2"
                        style={{ top: NAV_H - 8, width: 300, boxShadow: '0 20px 40px rgb(15 23 42 / .18), 0 0 0 1px rgb(15 23 42 / .06)' }}
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                      >
                        {VERSIONS.map((v, i) => (
                          <span key={v} ref={el => { optionRefs.current[i] = el; }} className="flex items-center gap-3 px-4 py-2.5 text-[16px]" style={{ background: i === version ? '#F1F5FE' : 'transparent' }}>
                            <span className="w-4">{i === version && <Check size={16} />}</span>{v}
                          </span>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Página */}
                <div className="absolute overflow-hidden" style={{ left: RAIL_W, right: 0, top: NAV_H, bottom: 0 }}>
                  <div className="px-[120px] pt-8">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[32px] font-bold leading-none tracking-tight">Analisar dados</p>
                        <p className="flex items-center gap-1.5 text-[14px] mt-2.5" style={{ color: C.sub }}><Clock size={14} /> Última atualização hoje às 04h49</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-3 rounded-xl border bg-white px-4 py-2 text-[14px]" style={{ borderColor: C.line }}>
                          <b>Créditos</b><span className="w-14 h-1.5 rounded-full overflow-hidden" style={{ background: '#E3E5E8' }}><span className="block h-full w-1/2" style={{ background: C.blue }} /></span><span style={{ color: C.sub }}>50% (500/1000)</span>
                        </span>
                        <AnimatePresence>
                          {version === 1 && (
                            <motion.span className="flex items-center gap-1.5 rounded-full px-4 py-2 text-white text-[14px] font-semibold" style={{ background: C.blue }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                              <Plus size={15} /> Adicionar gráfico
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-7">
                      <span className="flex items-center gap-3 text-[15px]">
                        <span className="flex items-center gap-2 font-semibold"><Filter size={15} fill={C.ink} /> Filtros aplicados</span>
                        <span className="rounded-md border bg-white px-3 py-1.5 text-[14px]" style={{ borderColor: C.line }}><b>Período:</b> Últimos 90 dias</span>
                      </span>
                      <span className="flex items-center gap-2 rounded-full border-2 px-4 py-1.5 text-[15px] font-medium" style={{ borderColor: C.ink }}><Filter size={14} fill={C.ink} /> Filtros</span>
                    </div>

                    {/* Abas: mudam a cada versão; as novas piscam */}
                    <div className="flex gap-7 mt-7 border-b text-[15.5px]" style={{ borderColor: C.line }}>
                      {tabs.map(t => (
                        <motion.span
                          key={`${version}-${t.label}`}
                          className="relative pb-3 px-1 rounded-t-md whitespace-nowrap"
                          style={{ color: t.active ? C.blue : C.sub, fontWeight: t.active ? 600 : 400 }}
                          initial={{ opacity: 0, y: 6, backgroundColor: t.novo ? 'rgba(250, 204, 21, .45)' : 'rgba(250, 204, 21, 0)' }}
                          animate={{ opacity: 1, y: 0, backgroundColor: 'rgba(250, 204, 21, 0)' }}
                          transition={{ opacity: { duration: 0.25 }, y: { duration: 0.25 }, backgroundColor: { duration: 1.6, delay: 0.3 } }}
                        >
                          {t.label}
                          {t.badge && <span className="ml-1.5 rounded px-1.5 py-0.5 text-[11px] font-bold text-white" style={{ background: C.blue }}>Novo</span>}
                          {t.active && <span className="absolute left-0 right-0 -bottom-px h-[2px]" style={{ background: C.blue }} />}
                        </motion.span>
                      ))}
                    </div>

                    <div className="mt-6">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div key={version} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease }}>
                          {version === 0 && <V1 />}
                          {version === 1 && <V2 />}
                          {version === 2 && <V3 />}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cursor: dentro da camada, acompanha o zoom */}
              <motion.div
                className="absolute left-0 top-0 z-30 pointer-events-none"
                initial={false}
                animate={{ x: cursor.x - 4, y: cursor.y - 2, opacity: cursor.visible ? 1 : 0, scale: cursor.down ? 0.85 : 1 }}
                transition={{ x: { duration: 0.9, ease }, y: { duration: 0.9, ease }, opacity: { duration: 0.25 }, scale: { duration: 0.12 } }}
              >
                <svg width="30" height="34" viewBox="0 0 26 30" fill="none">
                  <path d="M2 2l20 11.5-9 2.2-4.3 8.6L2 2z" fill="#111" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        )}
    </div>
  );
}

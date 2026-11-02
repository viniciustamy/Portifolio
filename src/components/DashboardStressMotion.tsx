import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion } from 'motion/react';
import { BarChart3, Briefcase, CalendarDays, Check, ChevronDown, ClipboardList, Clock, FlaskConical, Info, ListFilter, LogOut, Menu, Puzzle, Settings, Users } from 'lucide-react';
import { wait } from './DevolutivaIaMotion';
import { C, COLORS } from './DashboardLaptopMotion';
import { useLaptopViewport } from './LaptopMockup';

/*
 * Cenários de estresse do Dashboard de Admissão (seção de handoff): a tela codada com o botão de
 * teste flutuante. A câmera dá zoom no botão, o cursor abre o menu e escolhe um volume de dados;
 * o zoom sai e a página mostra o mesmo layout sem dados, com poucos dados, uso médio ou extremo.
 */

const W = 1366;
const H = 854;
const ZOOM = 2;
const ease = [0.65, 0, 0.35, 1] as const;

const STAGES = ['Admissão não iniciada', 'Convite enviado', 'Dados Exame', 'Envio documentação', 'Benefícios', 'Integração Folha Pgto', 'Assinatura contrato', 'Admissão concluída'];

type Scenario = {
  id: string; label: string; desc: string;
  kpis: { value: number | null; decimals?: number; suffix?: string; sub?: string }[];
  funnel: number[] | null;
};

const SCENARIOS: Scenario[] = [
  { id: 'vazio', label: 'Sem dados', desc: 'Nenhum dado disponível: empty states em toda a interface.', kpis: [{ value: null }, { value: null }, { value: null }, { value: null }], funnel: null },
  {
    id: 'poucos', label: 'Poucos dados', desc: 'Volume baixo com números pequenos.',
    kpis: [{ value: 75, decimals: 1, suffix: '%', sub: '3 concluídas de 4 iniciadas' }, { value: 12, suffix: ' dias' }, { value: 66.7, decimals: 1, suffix: '%', sub: '4 validados de 6 enviados' }, { value: 1 }],
    funnel: [4, 4, 4, 3, 3, 3, 3, 3],
  },
  {
    id: 'medio', label: 'Uso médio', desc: 'Cenário padrão de demonstração.',
    kpis: [{ value: 88, decimals: 1, suffix: '%', sub: '88 concluídas de 100 iniciadas' }, { value: 10, suffix: ' dias' }, { value: 84.4, decimals: 1, suffix: '%', sub: '2.111 validados de 2.500 enviados' }, { value: 11 }],
    funnel: [100, 98, 97, 96, 93, 91, 89, 88],
  },
  {
    id: 'extremo', label: 'Uso extremo', desc: 'Números muito grandes e gráficos densos.',
    kpis: [{ value: 92.4, decimals: 1, suffix: '%', sub: '46.210 concluídas de 50.012 iniciadas' }, { value: 8, suffix: ' dias' }, { value: 96.1, decimals: 1, suffix: '%', sub: '1.204.330 validados de 1.253.200 enviados' }, { value: 18402 }],
    funnel: [50012, 49870, 49311, 48902, 48120, 47655, 46980, 46210],
  },
];
const DEFAULT = 2;

const fmt = (v: number, decimals = 0) => v.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

function Num({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const c = animate(0, to, { duration: 1.1, ease: [0.16, 1, 0.3, 1], onUpdate: setV });
    return () => c.stop();
  }, [to]);
  return <>{fmt(v, decimals)}</>;
}

const KPI_TITLES = ['Taxa de admissões concluídas no período', 'Tempo médio de admissão no período', 'Taxa de conversão dos documentos no período', 'Admissões com diversidade no período'];
const CHART_H = 260;

function Page({ s }: { s: Scenario }) {
  const rail = [Briefcase, ClipboardList, Settings, Users, Puzzle, BarChart3, LogOut];
  const max = s.funnel ? s.funnel[0] : 1;
  return (
    <div className="absolute inset-0 font-sans" style={{ background: C.page, color: C.ink }}>
      <div className="absolute left-0 right-0 top-0 flex items-center gap-8 bg-white border-b px-5" style={{ height: 46, borderColor: C.line }}>
        <Menu size={18} />
        <span className="text-[22px] font-extrabold tracking-tight -ml-3" style={{ color: '#2D6CDF' }}>Gupy</span>
        <span className="flex items-center gap-1 text-[12px] font-medium">
          {['Central de Carreiras', 'Recrutamento e Seleção', 'Admissão', 'Engajamento', 'Performance'].map(p => (
            <span key={p} className="rounded-md px-3 py-1.5" style={p === 'Admissão' ? { background: '#E8EEFB', color: C.blue } : undefined}>{p}</span>
          ))}
        </span>
      </div>
      <div className="absolute left-0 bottom-0 bg-white flex flex-col items-center pt-3 gap-[22px]" style={{ top: 46, width: 52 }}>
        <span className="rounded-full" style={{ width: 28, height: 28, background: 'linear-gradient(135deg,#8B4A2B,#D49A73)' }} />
        {rail.map((Icon, i) => (
          <span key={i} className="flex items-center justify-center rounded-md" style={{ width: 40, height: 30, background: i === 5 ? '#E8EEFB' : 'transparent' }}><Icon size={17} strokeWidth={2.2} /></span>
        ))}
      </div>

      <div className="absolute" style={{ left: 52 + 42, right: 42, top: 46 + 26 }}>
        <p className="text-[26px] font-semibold leading-none">Analisar dados</p>
        <p className="flex items-center gap-1.5 text-[12.5px] mt-2.5" style={{ color: C.sub }}><Clock size={14} /> Última atualização hoje às 04h49</p>
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

        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="grid grid-cols-4 gap-4 mt-6">
              {s.kpis.map((k, i) => (
                <div key={i} className="bg-white rounded-xl border px-5 py-4" style={{ borderColor: C.line, height: 150 }}>
                  <div className="flex justify-between gap-3">
                    <p className="text-[13px] leading-[1.35]">{KPI_TITLES[i]}</p>
                    <Info size={15} color={C.sub} className="shrink-0" />
                  </div>
                  {k.value === null ? (
                    <>
                      <p className="text-[34px] leading-none mt-4" style={{ color: C.muted }}>–</p>
                      <p className="text-[11.5px] mt-3" style={{ color: C.sub }}>Sem dados no período</p>
                    </>
                  ) : (
                    <>
                      <p className="text-[34px] leading-none mt-4 tabular-nums whitespace-nowrap"><Num to={k.value} decimals={k.decimals} />{k.suffix}</p>
                      {k.sub && <p className="text-[11.5px] mt-3" style={{ color: C.sub }}>{k.sub}</p>}
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border mt-4 px-5 pt-4" style={{ borderColor: C.line, height: 420 }}>
              <p className="flex items-center gap-1.5 text-[15px] font-medium">Funil de admissões concluídas no período <Info size={15} color={C.sub} /></p>
              <p className="text-[12px] mt-1" style={{ color: C.sub }}>O gráfico mostra a quantidade de pré-colaboradores que passaram por cada etapa do processo.</p>
              {s.funnel ? (
                <div className="relative mt-6 ml-12" style={{ height: CHART_H + 20, width: 1040 }}>
                  {[1, 0.8, 0.6, 0.4, 0.2, 0].map((t, i) => (
                    <div key={t} className="absolute left-0 right-0 border-t" style={{ top: 20 + (i / 5) * CHART_H, borderColor: '#EEF0F2' }}>
                      <span className="absolute -left-12 -top-2 text-[11px] w-10 text-right" style={{ color: C.sub }}>{fmt(Math.round(max * t))}</span>
                    </div>
                  ))}
                  <div className="absolute inset-0 flex">
                    {s.funnel.map((v, i) => (
                      <div key={i} className="relative flex-1 flex flex-col items-center justify-end">
                        <span className="text-[11px] font-medium mb-1 whitespace-nowrap">{fmt(v)} ({Math.round((v / max) * 100)}%)</span>
                        <motion.span className="block rounded-t-[4px]" style={{ width: 82, height: (v / max) * CHART_H, background: COLORS[i], transformOrigin: 'bottom' }} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }} />
                        <span className="absolute -bottom-6 text-[10.5px] whitespace-nowrap" style={{ color: C.sub }}>{STAGES[i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center" style={{ height: 320 }}>
                  <span className="flex items-center justify-center w-12 h-12 rounded-full" style={{ background: '#EEF0F2', color: C.muted }}><BarChart3 size={22} /></span>
                  <p className="text-[15px] font-semibold mt-4">Ainda não há admissões no período</p>
                  <p className="text-[12.5px] mt-1.5" style={{ color: C.sub }}>Assim que as primeiras admissões começarem, o funil aparece aqui.</p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Menu do botão de teste: só o grupo "Volume de dados". Alturas fixas para o cursor achar cada opção
const BTN = 52;
const GAP = 24;
const MENU_W = 270;
const HEAD_H = 36;
const OPT_H = 60;
const MENU_PAD = 8;
const MENU_BOTTOM = GAP + BTN + 12;
const MENU_H = MENU_PAD * 2 + HEAD_H + OPT_H * SCENARIOS.length;
const btnCenter = { x: W - GAP - BTN / 2, y: H - GAP - BTN / 2 };
const optCenter = (i: number) => ({ x: W - GAP - MENU_W / 2, y: H - MENU_BOTTOM - MENU_H + MENU_PAD + HEAD_H + OPT_H * i + OPT_H / 2 });

export function DashboardStressMotion() {
  const { viewRef, width, inView } = useLaptopViewport();
  const [scenario, setScenario] = useState(DEFAULT);
  const [zoom, setZoom] = useState(1);
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: W - 260, y: H - 180, visible: false, down: false });
  const k = width / W;

  useEffect(() => {
    if (!inView || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const token = { cancelled: false };
    const click = async () => {
      setCursor(c => ({ ...c, down: true }));
      await wait(160, token);
      setCursor(c => ({ ...c, down: false }));
    };

    const run = async () => {
      await wait(1800, token);
      // Sem dados → poucos → extremo → médio, e recomeça
      const order = [0, 1, 3, 2];
      while (!token.cancelled) {
        for (const next of order) {
          setZoom(ZOOM);
          await wait(900, token);
          setCursor({ x: W - 300, y: H - 150, visible: true, down: false });
          await wait(200, token);
          setCursor(c => ({ ...c, ...btnCenter }));
          await wait(1000, token);
          await click();
          setOpen(true);
          await wait(800, token);
          setCursor(c => ({ ...c, ...optCenter(next) }));
          await wait(1000, token);
          await click();
          setScenario(next);
          await wait(600, token);
          setOpen(false);
          setCursor(c => ({ ...c, visible: false }));
          await wait(200, token);
          setZoom(1);
          await wait(3600, token);
        }
      }
    };

    run().catch(() => {});
    return () => { token.cancelled = true; };
  }, [inView]);

  return (
    <div className="w-full">
      <div ref={viewRef} className="relative w-full overflow-hidden rounded-xl shadow-2xl select-none" style={{ aspectRatio: `${W} / ${H}`, background: C.page }} role="img" aria-label="Tela do dashboard com o botão de teste: o menu troca o volume de dados entre sem dados, poucos dados, uso médio e uso extremo">
        {width > 0 && (
          <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${k})` }}>
            {/* Câmera: zoom no canto do botão de teste */}
            <motion.div className="absolute inset-0" style={{ transformOrigin: '100% 100%' }} initial={false} animate={{ scale: zoom }} transition={{ duration: 0.9, ease }}>
              <Page s={SCENARIOS[scenario]} />

              {/* Menu de cenários */}
              <AnimatePresence>
                {open && (
                  <motion.div
                    className="absolute bg-white rounded-xl border font-sans"
                    style={{ right: GAP, bottom: MENU_BOTTOM, width: MENU_W, padding: MENU_PAD, borderColor: C.line, boxShadow: '0 12px 32px rgb(20 27 45 / .18)', transformOrigin: 'bottom right' }}
                    initial={{ opacity: 0, scale: 0.94, y: 6 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-center px-3 text-[12px] font-medium" style={{ height: HEAD_H, color: C.sub }}>Volume de dados</p>
                    {SCENARIOS.map((o, i) => (
                      <div key={o.id} className="relative flex flex-col justify-center px-3 rounded-lg transition-colors duration-200" style={{ height: OPT_H, background: i === scenario ? '#E8EEFB' : 'transparent' }}>
                        <p className="text-[13.5px] font-medium flex items-center gap-2">{o.label}{i === scenario && <Check size={14} color={C.blue} strokeWidth={2.6} />}</p>
                        <p className="text-[11.5px] leading-snug mt-0.5" style={{ color: C.sub }}>{o.desc}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Botão flutuante de teste */}
              <span className="absolute flex items-center justify-center rounded-xl text-white" style={{ right: GAP, bottom: GAP, width: BTN, height: BTN, background: C.blue, boxShadow: '0 6px 16px rgb(26 102 219 / .35)' }}>
                <FlaskConical size={22} />
              </span>

              {/* Cursor (desfaz o zoom para manter o tamanho) */}
              <motion.div
                className="absolute left-0 top-0 z-30 pointer-events-none"
                initial={false}
                animate={{ x: cursor.x - 4, y: cursor.y - 2, opacity: cursor.visible ? 1 : 0, scale: (cursor.down ? 0.85 : 1) / zoom }}
                transition={{ x: { duration: 0.9, ease }, y: { duration: 0.9, ease }, opacity: { duration: 0.2 }, scale: { duration: 0.15 } }}
                style={{ transformOrigin: '4px 2px' }}
              >
                <svg width="28" height="32" viewBox="0 0 26 30" fill="none">
                  <path d="M2 2l20 11.5-9 2.2-4.3 8.6L2 2z" fill="#111" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Cenário atual */}
      <div className="flex flex-wrap justify-center gap-2 mt-5">
        {SCENARIOS.map((o, i) => (
          <span key={o.id} className="rounded-full px-3.5 py-1.5 text-[13px] transition-colors duration-300" style={i === scenario ? { background: '#fff', color: '#151516', fontWeight: 600 } : { border: '1px solid rgb(255 255 255 / .18)', color: 'rgb(255 255 255 / .7)' }}>
            {o.label}
          </span>
        ))}
      </div>
    </div>
  );
}

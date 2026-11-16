import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertTriangle, ArrowLeft, Bell, Bookmark, Download, Eye, Megaphone, RefreshCw, Search, Send, Server, Smartphone, Star, TrendingUp, UserRound } from 'lucide-react';
import { wait } from './DevolutivaIaMotion';
import { APP_W, Cursor, useLaptopViewport } from './LaptopMockup';
import { Logo } from './MindiThumbMotion';

/*
 * Admin do Mindi recriado (sem moldura, para ficar grande): o cursor passa pelas abas Visão geral, Uso do app,
 * Usuários, Erros e Notificações, e cada uma monta os seus gráficos. Os números são da base real
 * (agregados); na aba Usuários, nomes e e-mails são fictícios.
 */

const C = { bg: '#09090B', card: '#141417', line: 'rgb(255 255 255 / .08)', text: '#FAFAFA', sub: '#A1A1AA', muted: '#71717A', accent: '#8B8CF0', track: '#27272A', red: '#F06464', orange: '#E0A030', green: '#4ADE80' };
const ease = [0.16, 1, 0.3, 1] as const;

const TABS = ['Visão geral', 'Uso do app', 'Usuários', 'Erros', 'Notificações'];

const Card = ({ children, className = '', style }: { children: any; className?: string; style?: any }) => (
  <div className={`rounded-2xl p-5 ${className}`} style={{ background: C.card, border: `1px solid ${C.line}`, ...style }}>{children}</div>
);
const Title = ({ t, s }: { t: string; s?: string }) => (
  <div className="mb-4"><p className="text-[17px] font-semibold">{t}</p>{s && <p className="text-[12px] mt-0.5" style={{ color: C.sub }}>{s}</p>}</div>
);

function Kpi({ label, value, note, delta, Icon }: { label: string; value: string; note?: string; delta?: string; Icon?: any; key?: string }) {
  return (
    <Card className="!p-4">
      <p className="flex items-center gap-2 text-[12.5px]" style={{ color: C.sub }}>{Icon && <span className="flex items-center justify-center w-7 h-7 rounded-lg" style={{ background: 'rgb(139 140 240 / .14)', color: C.accent }}><Icon size={14} /></span>}{label}</p>
      <p className="text-[26px] font-bold mt-2 leading-none">{value}</p>
      {delta && <p className="text-[11.5px] mt-2" style={{ color: C.sub }}><span style={{ color: delta.startsWith('-') ? C.red : C.green }}>↗ {delta}</span> vs. 30 dias anteriores</p>}
      {note && <p className="text-[11.5px] mt-1.5" style={{ color: C.sub }}>{note}</p>}
    </Card>
  );
}

function Bars({ rows, max, delay = 0 }: { rows: [string, number, string][]; max: number; delay?: number }) {
  return (
    <div className="flex flex-col gap-2.5">
      {rows.map(([l, v, r], i) => (
        <div key={l} className="flex items-center gap-3 text-[12.5px]">
          <span className="w-[150px] shrink-0 truncate">{l}</span>
          <span className="flex-1 h-[7px] rounded-full overflow-hidden" style={{ background: C.track }}>
            <motion.span className="block h-full rounded-full" style={{ background: C.accent }} initial={{ width: 0 }} animate={{ width: `${(v / max) * 100}%` }} transition={{ duration: 0.8, delay: delay + i * 0.05, ease }} />
          </span>
          <span className="w-[86px] shrink-0 text-right tabular-nums whitespace-nowrap" style={{ color: C.sub }}>{r}</span>
        </div>
      ))}
    </div>
  );
}

function Columns({ values, max, height = 150, colors }: { values: number[]; max: number; height?: number; colors?: string[] }) {
  return (
    <div className="flex items-end gap-[5px]" style={{ height }}>
      {values.map((v, i) => (
        <motion.span key={i} className="flex-1 rounded-t-[3px]" style={{ background: colors?.[i] ?? C.accent, transformOrigin: 'bottom', height: `${Math.max(v / max, 0.01) * 100}%` }} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.7, delay: 0.2 + i * 0.02, ease }} />
      ))}
    </div>
  );
}

/* --------------------------------- Abas --------------------------------- */

function Overview() {
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <Kpi label="Contas" value="21" note="+1 em 7 dias · +1 em 30 dias" />
        <Kpi label="Ativas em 7 dias" value="4" note="19% das contas" />
        <Kpi label="Ativas em 30 dias" value="5" note="24% das contas" />
        <Kpi label="Avaliações" value="684" note="640 filmes · 44 séries" />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Card>
          <Title t="Ativação" s="Quantas contas chegaram a cada etapa" />
          <Bars max={21} rows={[['Criou conta', 21, '21 · 100%'], ['Concluiu o onboarding', 21, '21 · 100%'], ['Avaliou 1 título', 20, '20 · 95%'], ['Avaliou 5 títulos', 17, '17 · 81%'], ['Avaliou 20 títulos', 8, '8 · 38%'], ['Salvou algo na Lista', 7, '7 · 33%'], ['Tem amigos', 7, '7 · 33%']]} />
        </Card>
        <Card>
          <Title t="Novas contas por semana" s="Últimas 12 semanas" />
          <Columns height={170} max={13} values={[1, 13, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1]} />
        </Card>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <Card><Title t="Notas dadas" s="Filmes e séries" /><Bars delay={0.3} max={237} rows={[['Péssimo', 7, '7 · 1%'], ['Regular', 45, '45 · 7%'], ['Bom', 181, '181 · 26%'], ['Muito bom', 237, '237 · 35%'], ['Obra-prima', 105, '105 · 15%']]} /></Card>
        <Card><Title t="Streamings escolhidos" s="Contas que assinam cada um" /><Bars delay={0.35} max={21} rows={[['Disney+', 19, '19 · 90%'], ['Prime Video', 18, '18 · 86%'], ['Netflix', 17, '17 · 81%'], ['Max', 17, '17 · 81%'], ['Apple TV+', 12, '12 · 57%']]} /></Card>
        <Card><Title t="Gêneros favoritos" s="Escolhidos no onboarding" /><Bars delay={0.4} max={21} rows={[['Comédia', 15, '15 · 71%'], ['Ficção', 14, '14 · 67%'], ['Ação', 12, '12 · 57%'], ['Aventura', 11, '11 · 52%'], ['Animação', 11, '11 · 52%']]} /></Card>
      </div>
    </>
  );
}

const VIEWS = [90, 20, 70, 50, 160, 80, 60, 15, 5, 80, 210, 260, 90, 90, 55, 310, 200, 165, 65, 65, 40, 30, 15, 690, 40, 370, 570, 240, 200, 230];

function Usage() {
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <Kpi Icon={Eye} label="Visualizações de tela" value="4.645" delta="+28%" />
        <Kpi Icon={UserRound} label="Visitantes por dia" value="4" delta="+100%" />
        <Kpi Icon={Star} label="Avaliações" value="130" delta="+465%" note='67% de quem abriu "Avaliar" concluiu' />
        <Kpi Icon={Bookmark} label="Salvos na Lista" value="57" delta="+159%" />
      </div>
      <Card className="mt-4">
        <Title t="Visualizações por dia" s="Últimos 30 dias" />
        <Columns height={150} max={700} values={VIEWS} />
      </Card>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Card><Title t="Telas" s="Visualizações e tempo médio em cada uma" /><Bars delay={0.3} max={4773} rows={[['Início', 4773, '1 min 22 s'], ['Página do título', 1191, '53 s'], ['Histórico', 723, '1 min 6 s'], ['Explorar', 694, '34 s'], ['Lista', 630, '47 s']]} /></Card>
        <Card><Title t="Onde as pessoas salvam" s="Itens adicionados à Lista por tela" /><Bars delay={0.35} max={40} rows={[['Página do título', 40, '40'], ['Início', 23, '23'], ['Página de pessoa', 10, '10'], ['Busca', 4, '4'], ['Explorar', 3, '3']]} /></Card>
      </div>
    </>
  );
}

// Pessoas fictícias: os nomes e e-mails reais do admin não aparecem no portfólio
const PEOPLE = [
  ['Ana Ribeiro', 'an•••@gmail.com', '18/05/26', 'Hoje', 315, 31, 39, 3],
  ['Bruno Tavares', 'br•••@gmail.com', '26/08/26', 'Hoje', 9, 0, 1, 2],
  ['Carla Mendes', 'ca•••@outlook.com', '01/11/26', 'Hoje', 7, 0, 7, 0],
  ['Diego Prado', 'di•••@gmail.com', '13/08/26', '3 dias atrás', 48, 0, 0, 2],
  ['Elisa Moura', 'el•••@gmail.com', '10/08/26', '4 dias atrás', 64, 2, 1, 3],
  ['Felipe Araújo', 'fe•••@gmail.com', '10/08/26', '17 dias atrás', 8, 0, 0, 0],
  ['Gabriela Nunes', 'ga•••@gmail.com', '27/08/26', '24/09/26', 16, 4, 0, 2],
  ['Henrique Lopes', 'he•••@gmail.com', '08/09/26', '08/09/26', 0, 0, 1, 0],
  ['Isabela Rocha', 'is•••@gmail.com', '27/08/26', '07/09/26', 8, 0, 0, 0],
] as const;

function Users() {
  return (
    <>
      <div className="flex gap-3">
        <span className="flex-1 flex items-center gap-2 rounded-xl px-4 text-[13px]" style={{ height: 40, background: C.card, border: `1px solid ${C.line}`, color: C.muted }}><Search size={15} /> Buscar por nome, e-mail ou UID</span>
        <span className="flex items-center gap-2 rounded-xl px-4 text-[13px] font-semibold" style={{ height: 40, background: C.card, border: `1px solid ${C.line}` }}><Download size={14} /> Exportar CSV</span>
      </div>
      <Card className="mt-4 !p-0 overflow-hidden">
        <div className="grid text-[12px] px-5 py-3" style={{ gridTemplateColumns: '2.4fr 1fr 1.3fr .7fr .7fr .7fr .7fr', color: C.sub, borderBottom: `1px solid ${C.line}` }}>
          <span>Pessoa</span><span>Cadastro</span><span className="font-semibold" style={{ color: C.text }}>Última atividade ↓</span><span className="text-right">Filmes</span><span className="text-right">Séries</span><span className="text-right">Na Lista</span><span className="text-right">Amigos</span>
        </div>
        {PEOPLE.map(([n, e, cad, last, f, s, l, a], i) => (
          <motion.div key={n} className="grid items-center text-[13px] px-5 py-2.5" style={{ gridTemplateColumns: '2.4fr 1fr 1.3fr .7fr .7fr .7fr .7fr', borderTop: i ? `1px solid ${C.line}` : 'none' }} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
            <span><span className="block font-semibold">{n}</span><span className="text-[11.5px]" style={{ color: C.sub }}>{e}</span></span>
            <span style={{ color: C.sub }}>{cad}</span><span style={{ color: C.sub }}>{last}</span>
            <span className="text-right font-semibold">{f}</span><span className="text-right font-semibold">{s}</span><span className="text-right font-semibold">{l}</span><span className="text-right font-semibold">{a}</span>
          </motion.div>
        ))}
      </Card>
    </>
  );
}

const ERRORS = [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 2, 2, 0, 1, 0, 4, 6, 4, 2, 3, 2, 1, 1, 1];
const CRITICAL = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];

function Errors() {
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <Kpi Icon={AlertTriangle} label="Erros em 30 dias" value="48" note="8 críticos" />
        <Kpi Icon={Server} label="Registrados" value="51" note="Os 100 mais recentes, mais os antigos" />
      </div>
      <Card className="mt-4">
        <Title t="Erros por dia" s="Últimos 30 dias, por gravidade" />
        <div className="flex gap-4 text-[11.5px] mb-3" style={{ color: C.sub }}><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: C.red }} />Críticos</span><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: C.orange }} />Avisos</span></div>
        <Columns height={170} max={6} values={ERRORS.map((v, i) => v + CRITICAL[i] * 2)} colors={ERRORS.map((_, i) => (CRITICAL[i] ? C.red : C.orange))} />
      </Card>
      <Card className="mt-4">
        <Title t="Origem dos erros" s="Últimos 30 dias" />
        <Bars delay={0.3} max={39} rows={[['TMDB', 39, '39'], ['App', 8, '8'], ['Rede', 2, '2']]} />
      </Card>
    </>
  );
}

function Notifications() {
  return (
    <>
      <Card className="flex items-center justify-between !py-4">
        <p className="flex items-center gap-3"><span className="flex items-center justify-center w-9 h-9 rounded-xl" style={{ background: 'rgb(139 140 240 / .14)', color: C.accent }}><Megaphone size={17} /></span><span><span className="block text-[15px] font-semibold">Aviso manual</span><span className="text-[12px]" style={{ color: C.sub }}>Chega no iPhone de quem tem push e fica na caixa de notificações do app</span></span></p>
        <span className="flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold" style={{ background: '#484AAC' }}><Send size={13} /> Novo aviso</span>
      </Card>
      <div className="grid grid-cols-4 gap-4 mt-4">
        <Kpi Icon={Bell} label="Notificações ativas" value="2" note="10% das contas" />
        <Kpi Icon={Smartphone} label="Aparelhos" value="2" note="iPhones registrados para push" />
        <Kpi Icon={Send} label="Enviadas em 30 dias" value="7" note="Avisos criados na caixa do app" />
        <Kpi Icon={TrendingUp} label="Push entregue" value="14%" note="1 de 7 envios para quem tem aparelho" />
      </div>
      <div className="grid grid-cols-[1fr_2fr] gap-4 mt-4">
        <Card>
          <Title t="Contas com push" s="Ativaram as notificações no iPhone" />
          <div className="flex items-center gap-6">
            <svg width="130" height="130" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke={C.track} strokeWidth="3.2" />
              <motion.circle cx="18" cy="18" r="15.9" fill="none" stroke={C.accent} strokeWidth="3.2" strokeLinecap="round" pathLength={100} strokeDasharray="100" transform="rotate(-90 18 18)" initial={{ strokeDashoffset: 100 }} animate={{ strokeDashoffset: 90 }} transition={{ duration: 0.9, ease }} />
              <text x="18" y="18.5" textAnchor="middle" fontSize="6" fontWeight="700" fill={C.text}>10%</text>
              <text x="18" y="23" textAnchor="middle" fontSize="2.6" fill={C.sub}>com push</text>
            </svg>
            <div className="text-[13px]"><p style={{ color: C.sub }}>Com push</p><p className="text-[20px] font-bold">2</p><p className="mt-2" style={{ color: C.sub }}>Sem push</p><p className="text-[20px] font-bold">19</p></div>
          </div>
        </Card>
        <Card>
          <Title t="Tipos automáticos" s="Enviados pelo servidor" />
          {[['Chegou ao streaming', 'Título salvo chegou a um streaming que a pessoa assina'], ['Estreia no cinema', 'Título salvo estreou nos cinemas do Brasil'], ['Novo episódio', 'Série salva ganhou episódio novo']].map(([t, d], i) => (
            <div key={t} className="flex items-center justify-between py-2.5" style={{ borderTop: i ? `1px solid ${C.line}` : 'none' }}>
              <span><span className="block text-[13.5px] font-semibold">{t}</span><span className="text-[12px]" style={{ color: C.sub }}>{d}</span></span>
              <span className="relative w-10 h-6 rounded-full" style={{ background: '#484AAC' }}><span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" /></span>
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}

const SCREENS = [Overview, Usage, Users, Errors, Notifications];

function AdminScreen({ tab, tabRefs }: { tab: number; tabRefs: any }) {
  const els = useRef<(HTMLSpanElement | null)[]>([]);
  const [pill, setPill] = useState({ x: 0, w: 0 });
  useLayoutEffect(() => {
    const m = () => { const el = els.current[tab]; if (el) setPill({ x: el.offsetLeft, w: el.offsetWidth }); };
    m();
    document.fonts?.ready.then(m);
  }, [tab]);
  const Screen = SCREENS[tab];
  return (
    <div className="absolute inset-0 font-sans overflow-hidden" style={{ width: APP_W, background: C.bg, color: C.text }}>
      <div className="mx-auto" style={{ width: 1120, paddingTop: 22 }}>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-3"><Logo height={20} /><span className="text-[13px]" style={{ color: C.sub }}>Analytics</span></span>
          <span className="flex items-center gap-4 text-[12.5px]" style={{ color: C.sub }}>
            Atualizado às 19:24
            <span className="flex items-center gap-2 rounded-full px-3.5 py-1.5 font-semibold" style={{ background: C.track, color: C.text }}><RefreshCw size={13} /> Atualizar</span>
            <span className="flex items-center gap-1.5"><ArrowLeft size={14} /> Voltar ao app</span>
          </span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="relative flex gap-1 text-[13.5px]">
            {pill.w > 0 && <motion.span className="absolute top-0 bottom-0 rounded-full" style={{ background: C.track }} initial={false} animate={{ x: pill.x, width: pill.w }} transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }} />}
            {TABS.map((t, i) => (
              <span key={t} ref={el => { els.current[i] = el; tabRefs.current[i] = el; }} className="relative px-4 py-2 rounded-full transition-colors duration-200" style={{ color: i === tab ? C.text : C.sub, fontWeight: i === tab ? 600 : 500 }}>
                {t}{t === 'Usuários' && <span className="ml-1.5" style={{ color: C.muted }}>21</span>}
              </span>
            ))}
          </div>
          {tab > 0 && tab !== 2 && (
            <span className="flex rounded-full p-1 text-[12px]" style={{ background: C.card, border: `1px solid ${C.line}` }}>
              {['7 dias', '30 dias', '90 dias'].map(p => <span key={p} className="px-3 py-1 rounded-full" style={p === '30 dias' ? { background: C.track, fontWeight: 600 } : { color: C.sub }}>{p}</span>)}
            </span>
          )}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={tab} className="mt-5" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <Screen />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Palco solto (sem notebook): a tela do admin em 1366 × 800, escalada para a largura disponível
const STAGE_H = 800;

export function MindiAdminMotion() {
  const { viewRef, width, inView } = useLaptopViewport();
  const stageRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [tab, setTab] = useState(0);
  const [cursor, setCursor] = useState<Cursor>({ x: 1100, y: 700, visible: false, down: false });
  const k = width / APP_W;

  // Centro de um elemento em coordenadas do palco
  const point = (el: HTMLElement | null) => {
    const st = stageRef.current;
    if (!st || !el) return { x: APP_W / 2, y: 60 };
    const sr = st.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const kk = sr.width / APP_W;
    return { x: (r.left + r.width / 2 - sr.left) / kk, y: (r.top + r.height / 2 - sr.top) / kk };
  };

  useEffect(() => {
    if (!inView || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const token = { cancelled: false };
    const clickTab = async (i: number) => {
      setCursor(c => ({ ...c, ...point(tabRefs.current[i]), visible: true }));
      await wait(1000, token);
      setCursor(c => ({ ...c, down: true }));
      await wait(150, token);
      setCursor(c => ({ ...c, down: false }));
      setTab(i);
    };
    const run = async () => {
      await wait(3200, token);
      while (!token.cancelled) {
        for (const i of [1, 2, 3, 4, 0]) {
          await clickTab(i);
          await wait(3300, token);
        }
      }
    };
    run().catch(() => {});
    return () => { token.cancelled = true; };
  }, [inView]);

  return (
    <div ref={viewRef} className="relative w-full overflow-hidden rounded-2xl select-none" style={{ aspectRatio: `${APP_W} / ${STAGE_H}`, background: C.bg, boxShadow: '0 24px 60px rgb(36 21 16 / .22)' }} role="img" aria-label="Admin do Mindi: o cursor passa pelas abas Visão geral, Uso do app, Usuários, Erros e Notificações">
      {width > 0 && (
        <div ref={stageRef} className="absolute left-0 top-0 origin-top-left" style={{ width: APP_W, height: STAGE_H, transform: `scale(${k})` }}>
          <AdminScreen tab={tab} tabRefs={tabRefs} />
          <motion.div className="absolute left-0 top-0 z-30 pointer-events-none" initial={false} animate={{ x: cursor.x - 4, y: cursor.y - 2, opacity: cursor.visible ? 1 : 0, scale: cursor.down ? 0.85 : 1 }} transition={{ x: { duration: 0.9, ease: [0.65, 0, 0.35, 1] }, y: { duration: 0.9, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.25 }, scale: { duration: 0.12 } }}>
            <svg width="26" height="30" viewBox="0 0 26 30" fill="none"><path d="M2 2l20 11.5-9 2.2-4.3 8.6L2 2z" fill="#fff" stroke="#111" strokeWidth="2" strokeLinejoin="round" /></svg>
          </motion.div>
        </div>
      )}
    </div>
  );
}

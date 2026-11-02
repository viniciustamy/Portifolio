import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Apple, Bell, Bot, Clapperboard, Database, Eraser, Gauge, GitMerge, GitPullRequest, Hammer, KeyRound, LayoutDashboard, Shuffle, Smartphone, Star, Trophy, Upload, UserRound } from 'lucide-react';
import { FigmaLogo, GithubLogo } from './AiWorkflowDiagram';
import claudeLogo from '../assets/images/Logos IA/Claude.webp';
import aiStudioLogo from '../assets/images/Logos IA/Google IA Studio.png';

/*
 * Diagramas do case Mindi: a linha do tempo das ferramentas (Figma → vibe code → Claude Code),
 * o mapa de como o app conversa com as APIs e o Firebase, o motor de recomendação e o caminho do
 * código até a App Store.
 */

const C = { ink: '#241510', sub: '#6F625B', soft: '#8A7F78', line: '#E2DCD4', accent: '#9E4322', cream: '#F6EAE3', card: '#FAF9F7' };

/* ---------------------------------- Linha do tempo ---------------------------------- */

// Lovable e Base44: marcas simplificadas (coração em degradê e o "44"), no lugar dos logos oficiais
function LovableMark() {
  return (
    <svg viewBox="0 0 24 24" width={30} height={30}>
      <defs><linearGradient id="lv" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FF8A3D" /><stop offset=".5" stopColor="#FF3D7F" /><stop offset="1" stopColor="#5B6CFF" /></linearGradient></defs>
      <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.9 4.5 6.6 4.5c2.2 0 3.7 1.2 5.4 3 1.7-1.8 3.2-3 5.4-3 3.7 0 5.7 3.9 4.2 7.3C19.5 16.4 12 21 12 21z" fill="url(#lv)" />
    </svg>
  );
}
const Base44Mark = () => <span className="text-[15px] font-black tracking-tight" style={{ color: '#FF6A2B' }}>B44</span>;

const TIMELINE = [
  { when: '~2020', tool: 'Figma', logo: <span className="scale-[0.62] block"><FigmaLogo /></span>, text: 'Anos desenhando o app que eu queria usar, sem conseguir tirá-lo do papel sozinho.' },
  { when: '2025', tool: 'Base44', logo: <Base44Mark />, text: 'Primeiro teste com vibe code: virava site rápido, mas parava nas integrações.' },
  { when: '2025', tool: 'Lovable', logo: <LovableMark />, text: 'Mais controle da interface, ainda sem dar conta de um app completo.' },
  { when: '2025', tool: 'Google AI Studio', logo: <img src={aiStudioLogo} alt="" className="w-8 h-8 object-contain" />, text: 'A base do app: API do TMDB, protótipo publicado e a primeira rodada de testes.' },
  { when: '2026', tool: 'Claude Code', logo: <img src={claudeLogo} alt="" className="w-8 h-8 object-contain" />, text: 'Revisei o app inteiro. O código ganhou estrutura e virou app iOS.', highlight: true },
];

export function MindiTimeline() {
  return (
    <div className="not-prose relative">
      {/* Linha horizontal (vertical no mobile) */}
      <span aria-hidden="true" className="absolute md:hidden left-[27px] top-4 bottom-4 w-px" style={{ background: C.line }} />
      <span aria-hidden="true" className="absolute hidden md:block left-[10%] right-[10%] top-[27px] h-px" style={{ background: C.line }} />
      <ol className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
        {TIMELINE.map((t, i) => (
          <motion.li key={t.tool} className="relative flex md:flex-col md:items-center md:text-center gap-5 md:gap-0" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5, delay: i * 0.12 }}>
            <span className="relative z-10 flex items-center justify-center w-14 h-14 shrink-0 rounded-2xl bg-white" style={{ border: `1.5px solid ${t.highlight ? C.accent : C.line}`, boxShadow: t.highlight ? `0 0 0 4px ${C.cream}` : 'none' }}>{t.logo}</span>
            <div className="md:mt-4">
              <span className="text-[13px]" style={{ color: t.highlight ? C.accent : C.soft }}>{t.when}</span>
              <p className="font-serif font-bold text-[18px] leading-snug mt-0.5" style={{ color: C.ink }}>{t.tool}</p>
              <p className="text-[14px] leading-relaxed mt-1.5 md:px-1" style={{ color: C.sub }}>{t.text}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

/* -------------------------------- Mapa das integrações ------------------------------- */

const MW = 1040;
const MH = 590;

type Node = { x: number; y: number; w: number; h: number; Icon: any; color: string; title: string; sub: string; feeds?: string };
const NODES: Record<string, Node> = {
  app: { x: 20, y: 244, w: 230, h: 112, Icon: Smartphone, color: '#484AAC', title: 'App Mindi · iPhone', sub: 'React + Capacitor, empacotado como app iOS' },
  admin: { x: 20, y: 470, w: 230, h: 90, Icon: LayoutDashboard, color: '#6F625B', title: 'Admin web', sub: 'Só no navegador, fora do app do iPhone' },
  fn: { x: 400, y: 60, w: 250, h: 112, Icon: KeyRound, color: '#E37400', title: 'Cloud Function "api"', sub: 'Guarda as chaves e repassa as consultas, com cache' },
  db: { x: 400, y: 250, w: 250, h: 104, Icon: Database, color: '#F5A623', title: 'Firebase Auth + Firestore', sub: 'Contas, notas, lista, amigos e o cache compartilhado' },
  push: { x: 470, y: 452, w: 240, h: 116, Icon: Bell, color: '#E5484D', title: 'Notificações', sub: 'Cloud Functions → APNs → iPhone, quando um título salvo estreia' },
  tmdb: { x: 800, y: 24, w: 230, h: 118, Icon: Clapperboard, color: '#01B4E4', title: 'TMDB', sub: 'Catálogo, elenco, imagens', feeds: 'Início · Explorar · Título' },
  omdb: { x: 800, y: 158, w: 230, h: 118, Icon: Star, color: '#F5C518', title: 'OMDb', sub: 'Notas do IMDb e Rotten', feeds: 'Notas na Início e no Título' },
  gemini: { x: 800, y: 292, w: 230, h: 118, Icon: Bot, color: '#4F7DF3', title: 'Gemini', sub: 'Respostas do chat em texto livre', feeds: 'Chat' },
  wiki: { x: 800, y: 440, w: 230, h: 118, Icon: Trophy, color: '#339966', title: 'Wikidata', sub: 'Prêmios de atores e diretores', feeds: 'Página do título · Pessoas' },
};

const R = (n: Node) => ({ x: n.x + n.w, y: n.y + n.h / 2 });
const L = (n: Node) => ({ x: n.x, y: n.y + n.h / 2 });
const curve = (p: { x: number; y: number }, q: { x: number; y: number }) => {
  const m = (p.x + q.x) / 2;
  return `M ${p.x} ${p.y} C ${m} ${p.y}, ${m} ${q.y}, ${q.x} ${q.y}`;
};

const N = NODES;
const EDGES = [
  { d: curve({ x: R(N.app).x, y: N.app.y + 20 }, L(N.fn)), label: 'pede dados, sem chave', lx: 325, ly: 186, both: true },
  { d: curve(R(N.fn), L(N.tmdb)), label: 'catálogo', lx: 725, ly: 96 },
  { d: curve(R(N.fn), L(N.omdb)), label: 'notas · cache 7 dias', lx: 725, ly: 176 },
  { d: curve(R(N.fn), L(N.gemini)), label: 'pedidos do chat', lx: 725, ly: 280 },
  { d: curve({ x: R(N.app).x, y: N.app.y + 56 }, { x: L(N.db).x, y: N.db.y + 52 }), label: 'login e sincronização', lx: 325, ly: 288, both: true },
  { d: `M ${R(N.app).x} ${N.app.y + 92} C 320 ${N.app.y + 92}, 320 410, 400 410 L 680 410 C 740 410, 740 ${N.wiki.y + N.wiki.h / 2}, ${L(N.wiki).x} ${N.wiki.y + N.wiki.h / 2}`, label: 'direto, sem chave (dados abertos)', lx: 560, ly: 410 },
  { d: `M 425 ${N.db.y + N.db.h} V 480 Q 425 515 390 515 H ${R(N.admin).x + 2}`, label: 'métricas e erros', lx: 330, ly: 515 },
];

function MapNode({ n }: { n: Node; key?: string }) {
  return (
    <div className="absolute rounded-2xl bg-white px-4 py-3.5 flex gap-3" style={{ left: n.x, top: n.y, width: n.w, minHeight: n.h, border: `1px solid ${C.line}`, boxShadow: '0 1px 2px rgb(36 21 16 / .04)' }}>
      <span className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0" style={{ background: `${n.color}1A`, color: n.color }}><n.Icon size={18} /></span>
      <div className="min-w-0">
        <p className="text-[14.5px] font-semibold leading-tight" style={{ color: C.ink }}>{n.title}</p>
        <p className="text-[12.5px] leading-snug mt-1" style={{ color: C.sub }}>{n.sub}</p>
        {n.feeds && <p className="text-[11.5px] font-semibold mt-1.5" style={{ color: C.accent }}>Alimenta: {n.feeds}</p>}
      </div>
    </div>
  );
}

export function MindiArchitectureMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setK(Math.min(1, e.contentRect.width / MW)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="not-prose overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
      <div ref={ref} className="relative min-w-[720px]" style={{ height: MH * Math.max(k, 720 / MW) }}>
        <div className="absolute left-0 top-0 origin-top-left" style={{ width: MW, height: MH, transform: `scale(${Math.max(k, 720 / MW)})` }}>
          {/* Colunas */}
          {[['Onde roda', 20, 214], ['No meio', 400, 30], ['De onde vêm os dados', 800, 0]].map(([t, x, y]) => (
            <p key={t as string} className="absolute text-[12px] font-semibold uppercase tracking-[0.08em]" style={{ left: x as number, top: y as number, color: C.soft }}>{t}</p>
          ))}
          <svg width={MW} height={MH} className="absolute inset-0 overflow-visible">
            <defs>
              <marker id="mindi-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#B9AEA6" /></marker>
            </defs>
            {EDGES.map((e, i) => (
              <motion.path key={i} d={e.d} fill="none" stroke="#C9BDB4" strokeWidth={1.6} markerEnd="url(#mindi-arrow)" markerStart={e.both ? 'url(#mindi-arrow)' : undefined}
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: 'easeInOut' }} />
            ))}
          </svg>
          {EDGES.map((e, i) => (
            <span key={i} className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-[11.5px]" style={{ left: e.lx, top: e.ly, color: C.sub, border: `1px solid ${C.line}` }}>{e.label}</span>
          ))}
          {Object.entries(NODES).map(([id, n]) => <MapNode key={id} n={n} />)}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Fluxo em zigue-zague ------------------------------ */

type FlowStep = { Icon?: any; logo?: any; title: string; text: string; highlight?: boolean };

function Step({ s, i }: { s: FlowStep; i: number; key?: string }) {
  const Icon = s.Icon ?? Upload;
  return (
    <div className="relative z-10 rounded-2xl p-5 h-full" style={{ background: s.highlight ? C.cream : '#fff', border: s.highlight ? 'none' : `1px solid ${C.line}` }}>
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center w-10 h-10 rounded-xl" style={{ background: s.highlight ? '#fff' : C.card }}>{s.logo ?? <Icon size={18} color={C.accent} />}</span>
        <span className="text-[12px] font-semibold tabular-nums" style={{ color: C.soft }}>{String(i + 1).padStart(2, '0')}</span>
      </div>
      <p className="font-sans font-semibold text-[16px] mt-3" style={{ color: C.ink }}>{s.title}</p>
      <p className="text-[14px] leading-relaxed mt-1" style={{ color: C.sub }}>{s.text}</p>
    </div>
  );
}

const Arrow = ({ dir }: { dir: 'right' | 'left' }) => (
  <span aria-hidden="true" className={`absolute top-1/2 w-10 h-px ${dir === 'right' ? '-right-10' : '-left-10'}`} style={{ background: '#C9BDB4' }}>
    <span className={`absolute -top-[3.5px] border-y-[4px] border-y-transparent ${dir === 'right' ? '-right-0.5 border-l-[6px]' : '-left-0.5 border-r-[6px]'}`} style={dir === 'right' ? { borderLeftColor: '#B9AEA6' } : { borderRightColor: '#B9AEA6' }} />
  </span>
);

// Duas linhas: a de cima da esquerda para a direita, a de baixo da direita para a esquerda.
// loop: uma linha pela esquerda volta do último passo para o primeiro
function SnakeFlow({ steps, loop }: { steps: FlowStep[]; loop?: string }) {
  const top = steps.slice(0, 3);
  const bottom = steps.slice(3, 6);
  return (
    <div className="not-prose relative">
      <div className={`hidden md:block relative ${loop ? 'pl-14' : ''}`}>
        <div className="grid grid-cols-3 gap-10">
          {top.map((s, i) => <div key={s.title} className="relative"><Step s={s} i={i} />{i < 2 && <Arrow dir="right" />}</div>)}
        </div>
        <div className="relative h-14">
          <span aria-hidden="true" className="absolute right-[16.66%] top-0 bottom-0 w-px" style={{ background: '#C9BDB4' }} />
          <span aria-hidden="true" className="absolute right-[16.66%] bottom-0 translate-x-1/2 border-x-[4px] border-x-transparent border-t-[6px]" style={{ borderTopColor: '#B9AEA6' }} />
        </div>
        <div className="grid grid-cols-3 gap-10">
          {[...bottom].reverse().map((s, j) => <div key={s.title} className="relative"><Step s={s} i={3 + (2 - j)} />{j > 0 && <Arrow dir="left" />}</div>)}
        </div>
        {loop && (
          <>
            {/* Volta: sai do último passo (embaixo à esquerda) e sobe até o primeiro */}
            <span aria-hidden="true" className="absolute left-5 top-[22%] bottom-[22%] w-9 rounded-l-[18px]" style={{ border: '1.5px dashed #C9BDB4', borderRight: 'none' }} />
            <span aria-hidden="true" className="absolute left-[50px] top-[22%] -translate-y-1/2 border-y-[4px] border-y-transparent border-l-[6px]" style={{ borderLeftColor: '#B9AEA6' }} />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-center whitespace-nowrap text-[11.5px] font-semibold -translate-x-[38%]" style={{ color: C.accent }}>{loop}</span>
          </>
        )}
      </div>
      {/* Mobile: um embaixo do outro */}
      <ol className="md:hidden relative flex flex-col gap-4">
        {steps.map((s, i) => <li key={s.title}><Step s={s} i={i} /></li>)}
        {loop && <li className="text-[13px] font-semibold text-center" style={{ color: C.accent }}>↺ {loop}</li>}
      </ol>
    </div>
  );
}

/* ------------------------------ Motor de recomendação ------------------------------ */

// Exemplo calculado com as regras do recommendationEngine.ts do app (pesos e fórmula reais)
const tm = (p: string) => `https://image.tmdb.org/t/p/w185/${p}`;
const RATED = [
  { title: 'Interestelar', poster: tm('gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'), emoji: '🤯', label: 'Obra-prima', w: '+7' },
  { title: 'A Origem', poster: tm('9e3Dz7aCANy5aRUQF745IlNloJ1.jpg'), emoji: '🤯', label: 'Obra-prima', w: '+7' },
  { title: 'Duna', poster: tm('d5NXSklXo0qyIYkgV94XAgMIckC.jpg'), emoji: '🤩', label: 'Excelente', w: '+5' },
  { title: 'Mad Max: Estrada da Fúria', poster: tm('8tZYtuWezp8JbcsvHYO0O46tFbo.jpg'), emoji: '😍', label: 'Muito bom', w: '+3' },
  { title: 'Titanic', poster: tm('As0zX43h3w6kD2NS4uVHu9HKdEh.jpg'), emoji: '😐', label: 'Regular', w: '0' },
];
const PROFILE = [
  { label: 'Ficção científica', v: 27, note: '5 do cadastro + 7 + 7 + 5 + 3' },
  { label: 'Aventura', v: 27, note: '5 do cadastro + 7 + 7 + 5 + 3' },
  { label: 'Ação', v: 10, note: '7 + 3' },
  { label: 'Drama', v: 7, note: '7 + 0' },
  { label: 'Terror', v: -25, note: 'evitado no cadastro' },
];
const MATH = [
  { label: 'Ponto de partida', detail: 'Todo título começa neutro', v: 50, base: true },
  { label: 'Gêneros em comum', detail: 'Ação (10) e Ficção científica (27): média 18,5 de um máximo de 27, vale +14,2, mais +2 por casar dois gêneros', v: 16.2 },
  { label: 'Diretor que você curte', detail: 'Christopher Nolan acumulou +12 com duas Obras-primas; vale 3 pontos por ponto, com teto de +18', v: 18 },
  { label: 'Nota do público', detail: 'Média 7,2 no TMDB, com milhares de votos: 0,4 acima da referência de 6,8, vezes 6', v: 2.3 },
];

function Panel({ n, title, children }: { n: number; title: string; children: any }) {
  return (
    <div className="rounded-2xl bg-white p-6" style={{ border: `1px solid ${C.line}` }}>
      <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em]" style={{ color: C.soft }}><span className="flex items-center justify-center w-6 h-6 rounded-full text-[11px] text-white" style={{ background: C.accent }}>{n}</span>{title}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function MindiEngineExample() {
  const total = MATH.reduce((acc, m) => acc + m.v, 0);
  const fmt = (v: number) => v.toLocaleString('pt-BR');
  return (
    <div className="not-prose flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Panel n={1} title="A pessoa avalia 5 filmes">
          <p className="text-[13.5px] mb-4" style={{ color: C.sub }}>No cadastro, escolheu Ficção científica e Aventura e disse que evita Terror. Depois avaliou:</p>
          <div className="flex flex-col gap-2.5">
            {RATED.map((r, i) => (
              <motion.div key={r.title} className="flex items-center gap-3" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <img src={r.poster} alt="" className="w-8 h-12 rounded-[5px] object-cover" />
                <span className="flex-1 text-[14px] font-medium" style={{ color: C.ink }}>{r.title}</span>
                <span className="text-[13px]" style={{ color: C.sub }}>{r.emoji} {r.label}</span>
                <span className="w-9 text-right text-[13px] font-bold tabular-nums" style={{ color: r.w === '0' ? C.soft : C.accent }}>{r.w}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-[12px] mt-4" style={{ color: C.soft }}>Cada nota vira um peso: de +7 para Obra-prima até −8 para Péssimo.</p>
        </Panel>

        <Panel n={2} title="O app monta o perfil de gosto">
          <p className="text-[13.5px] mb-4" style={{ color: C.sub }}>O peso de cada nota vai para os gêneros, o diretor e o elenco do filme.</p>
          <div className="flex flex-col gap-2.5">
            {PROFILE.map((p, i) => (
              <div key={p.label}>
                <div className="flex justify-between text-[13.5px]"><span className="font-medium" style={{ color: C.ink }}>{p.label}</span><span className="font-bold tabular-nums" style={{ color: p.v < 0 ? '#C0392B' : C.ink }}>{p.v > 0 ? '+' : ''}{p.v}</span></div>
                <div className="relative h-1.5 rounded-full mt-1.5" style={{ background: '#F0EBE6' }}>
                  <motion.span className="absolute top-0 bottom-0 rounded-full" style={{ background: p.v < 0 ? '#E07A6E' : C.accent, left: p.v < 0 ? 'auto' : 0, right: p.v < 0 ? 0 : 'auto' }} initial={{ width: 0 }} whileInView={{ width: `${(Math.abs(p.v) / 27) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 + i * 0.08 }} />
                </div>
                <p className="text-[11.5px] mt-1" style={{ color: C.soft }}>{p.note}</p>
              </div>
            ))}
          </div>
          <p className="text-[13px] mt-4 pt-3" style={{ color: C.sub, borderTop: `1px solid ${C.line}` }}>Diretores: <b style={{ color: C.ink }}>Christopher Nolan +12</b> · Denis Villeneuve +4,5</p>
        </Panel>
      </div>

      <Panel n={3} title="Busca candidatos e tira o que já foi visto">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <p className="text-[14px] leading-relaxed md:max-w-[52%]" style={{ color: C.sub }}>
            Os filmes com nota de Bom para cima viram <b style={{ color: C.ink }}>sementes</b>. O TMDB devolve títulos parecidos com cada uma, e tudo o que a pessoa já avaliou, viu ou dispensou sai da lista antes da conta. É por isso que a Início nunca repete o que você já viu.
          </p>
          <div className="flex items-center gap-2 text-[13px]" style={{ color: C.sub }}>
            <span className="rounded-full px-3 py-1.5" style={{ background: C.card, border: `1px solid ${C.line}` }}>Parecidos com A Origem</span>
            <span>→</span>
            <span className="rounded-full px-3 py-1.5 line-through" style={{ background: C.card, border: `1px solid ${C.line}` }}>Interestelar</span>
            <span className="rounded-full px-3 py-1.5 font-semibold text-white" style={{ background: C.accent }}>Tenet</span>
          </div>
        </div>
      </Panel>

      <Panel n={4} title="Calcula a afinidade de cada candidato">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-8">
          <div className="flex md:flex-col items-center gap-4 md:w-[150px]">
            <img src={tm('k68nPLbIST6NP96JmTxmZijEvCA.jpg')} alt="Pôster de Tenet" className="w-[110px] md:w-[150px] rounded-xl object-cover" style={{ aspectRatio: '2 / 3' }} />
            <div className="md:text-center">
              <p className="font-serif font-bold text-[18px]" style={{ color: C.ink }}>Tenet</p>
              <p className="text-[12.5px]" style={{ color: C.sub }}>Nolan · Ação, Ficção científica</p>
            </div>
          </div>
          <div>
            <div className="flex flex-col">
              {MATH.map((m, i) => (
                <motion.div key={m.label} className="flex items-start gap-4 py-3" style={{ borderTop: i ? `1px solid ${C.line}` : 'none' }} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.15 }}>
                  <div className="flex-1"><p className="text-[14.5px] font-semibold" style={{ color: C.ink }}>{m.label}</p><p className="text-[12.5px] leading-snug mt-0.5" style={{ color: C.sub }}>{m.detail}</p></div>
                  <span className="text-[18px] font-bold tabular-nums" style={{ color: m.base ? C.ink : C.accent }}>{m.base ? m.v : `+${fmt(m.v)}`}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center justify-between rounded-xl px-5 py-4 mt-2" style={{ background: C.cream }}>
              <p className="text-[14px] font-semibold" style={{ color: C.ink }}>Afinidade de Tenet</p>
              <p className="text-right"><span className="font-serif text-[30px] font-bold leading-none" style={{ color: C.accent }}>{Math.round(total)}%</span><span className="block text-[11.5px] mt-1" style={{ color: C.soft }}>{fmt(total)}, arredondado</span></p>
            </div>
            <p className="text-[13px] leading-relaxed mt-3" style={{ color: C.sub }}>
              Acima de 70%, entra no destaque da Início com o motivo <b style={{ color: C.ink }}>"Similar a A Origem"</b>. Na mesma rodada, <b style={{ color: C.ink }}>Invocação do Mal</b> faz 50 − 26 (Terror evitado, sem nada que compense) + 4 de público = <b style={{ color: C.ink }}>28%</b>, abaixo do mínimo de 45%, e nem aparece. <span style={{ color: C.soft }}>Para simplificar, o exemplo não soma o elenco em comum; diretor e elenco juntos têm teto de +24.</span>
            </p>
          </div>
        </div>
      </Panel>

      <div className="flex items-start gap-4 rounded-2xl p-6" style={{ background: C.cream }}>
        <span className="text-[22px] leading-none" style={{ color: C.accent }}>↺</span>
        <p className="text-[14.5px] leading-relaxed" style={{ color: C.ink }}>
          <b>O ciclo fecha na próxima nota.</b> Se a pessoa der Obra-prima para Tenet, ele sai da Início e vai para o Histórico, Ação sobe de 10 para 17 e Nolan de +12 para +18. A próxima rodada já pesa mais filmes de ação, e cada avaliação deixa o feed mais certeiro.
        </p>
      </div>
    </div>
  );
}

/* --------------------------------- Até a App Store --------------------------------- */

const PIPELINE: FlowStep[] = [
  { logo: <img src={claudeLogo} alt="" className="w-6 h-6 object-contain" />, title: 'Claude Code', text: 'Desenvolvo no Windows, numa branch por funcionalidade.' },
  { Icon: GitPullRequest, logo: <span className="scale-[0.45] block"><GithubLogo /></span>, title: 'Pull request', text: 'Cada mudança sobe para o GitHub como PR, com a descrição do que mudou.' },
  { Icon: GitMerge, title: 'Merge na main', text: 'Reviso o PR e faço o merge.' },
  { Icon: Hammer, title: 'Codemagic', text: 'Um Mac mini na nuvem gera o build iOS, assina o app e numera a versão.' },
  { Icon: Smartphone, title: 'TestFlight', text: 'A versão chega no meu iPhone e no dos testadores.' },
  { Icon: Apple, title: 'App Store', text: 'Envio para a revisão da Apple.', highlight: true },
];

export function MindiPipeline() {
  return <SnakeFlow steps={PIPELINE} />;
}

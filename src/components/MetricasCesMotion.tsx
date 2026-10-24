import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

/*
 * Hero do post "Métricas de Experiência": no topo, a janelinha de CES do Hotjar flutuando, com os
 * emojis pulsando um a um como se esperassem a resposta; logo abaixo, a visão geral do H1 sendo montada
 * linha a linha (fluxos, persona, nota, respondentes, distribuição 1–5 e comentários).
 */

const W = 1110;
const POPUP_W = 360;
const POPUP_TOP = 24;
const TABLE_TOP = 380; // tabela logo abaixo da janelinha

const ease = [0.16, 1, 0.3, 1] as const;

const C = {
  ink: '#1F2328',
  sub: '#6B7078',
  line: '#ECEDEF',
  green: '#2E9B4F',
  red: '#D64545',
  orange: '#E08A00',
  colab: '#7B3FB5',
  lider: '#2563EB',
  rh: '#4B5058',
};

type Row = {
  fluxo: string; persona: 'Colaborador' | 'Líder' | 'RH'; nota: string; medio?: boolean;
  resp: string; pct: string; pctTone: 'green' | 'soft' | 'red'; dist: number[]; coment: string; pctComent: string;
  box?: 'green' | 'orange';
};

const ROWS: Row[] = [
  { fluxo: 'PDI Colab', persona: 'Colaborador', nota: '4,00', resp: '587', pct: '167,7%', pctTone: 'green', dist: [36, 19, 71, 250, 211], coment: '92', pctComent: '15,67%', box: 'green' },
  { fluxo: 'Feedback Colab', persona: 'Colaborador', nota: '5,00', resp: '259', pct: '74,0%', pctTone: 'soft', dist: [19, 7, 16, 77, 140], coment: '40', pctComent: '15,44%', box: 'green' },
  { fluxo: 'Feedback Líder', persona: 'Líder', nota: '5,00', resp: '43', pct: '12,3%', pctTone: 'red', dist: [11, 1, 2, 18, 11], coment: '7', pctComent: '16,28%' },
  { fluxo: 'Devolutiva Colab', persona: 'Colaborador', nota: '5,00', resp: '26', pct: '7,4%', pctTone: 'red', dist: [0, 0, 0, 11, 15], coment: '3', pctComent: '11,54%' },
  { fluxo: 'Devolutiva Líder', persona: 'Líder', nota: '4,00', resp: '58', pct: '16,6%', pctTone: 'red', dist: [3, 5, 13, 20, 17], coment: '12', pctComent: '20,69%' },
  { fluxo: 'Devolutiva RH', persona: 'RH', nota: '5,00', resp: '9', pct: '2,6%', pctTone: 'red', dist: [2, 0, 1, 0, 6], coment: '3', pctComent: '33,33%' },
  { fluxo: 'Comitê', persona: 'RH', nota: '4,00', resp: '60', pct: '17,1%', pctTone: 'red', dist: [6, 4, 8, 16, 26], coment: '3', pctComent: '5,00%' },
  { fluxo: 'Responder avaliação', persona: 'Colaborador', nota: '4,00', resp: '2158', pct: '616,6%', pctTone: 'green', dist: [132, 107, 171, 837, 911], coment: '517', pctComent: '23,96%', box: 'green' },
  { fluxo: 'Rede RH', persona: 'RH', nota: '3,00', medio: true, resp: '16', pct: '4,6%', pctTone: 'red', dist: [4, 3, 3, 3, 3], coment: '3', pctComent: '18,75%', box: 'orange' },
  { fluxo: 'Rede Colab', persona: 'Colaborador', nota: '4,00', resp: '469', pct: '134,0%', pctTone: 'green', dist: [24, 13, 37, 169, 226], coment: '79', pctComent: '16,84%', box: 'green' },
  { fluxo: 'Rede Líder', persona: 'Líder', nota: '4,00', resp: '40', pct: '11,4%', pctTone: 'red', dist: [7, 4, 6, 12, 11], coment: '5', pctComent: '12,50%' },
];

// Larguras das colunas (somam W - padding)
const COLS = [170, 104, 72, 112, 100, 96, 48, 48, 48, 48, 48, 92, 90];
const HEAD = ['Fluxos', 'Persona', 'Nota (CES mediana)', 'Classificação', 'Respondentes', '% em relação à amostragem', '1', '2', '3', '4', '5', 'Comentários', '% comentário'];
// Fundo das colunas da distribuição (o verde concentra nas notas 4 e 5)
const DIST_BG = ['#F1F7F1', 'transparent', '#F6FAF6', '#E1F0E2', '#D3E9D5'];
const ROW_H = 46;
const HEAD_H = 56;
const H = TABLE_TOP + HEAD_H + 11 * ROW_H + 40;

const PCT_COLOR = { green: C.green, soft: '#6DBB84', red: C.red };
const PERSONA_COLOR = { Colaborador: C.colab, 'Líder': C.lider, RH: C.rh };

// Rosto em balão amarelo, como na pesquisa do Hotjar
function EmojiFace({ mood }: { mood: 0 | 1 | 2 | 3 | 4 }) {
  const eyes = mood === 4
    ? <><path d="M15 17c-1.6-1.8-4.4-.4-3 1.6l3 3 3-3c1.4-2-1.4-3.4-3-1.6z" fill="#E5243B" /><path d="M31 17c-1.6-1.8-4.4-.4-3 1.6l3 3 3-3c1.4-2-1.4-3.4-3-1.6z" fill="#E5243B" /></>
    : mood === 0
      ? <><path d="M11 15l7 3M35 15l-7 3" stroke="#3A2A00" strokeWidth={2.2} strokeLinecap="round" /><circle cx={15} cy={20} r={2.3} fill="#3A2A00" /><circle cx={31} cy={20} r={2.3} fill="#3A2A00" /></>
      : <><circle cx={15} cy={19} r={2.4} fill="#3A2A00" /><circle cx={31} cy={19} r={2.4} fill="#3A2A00" /></>;
  const mouth = [
    <rect key="0" x={16} y={27} width={14} height={6} rx={2} fill="#3A2A00" />,
    <path key="1" d="M16 31c4-4 10-4 14 0" stroke="#3A2A00" strokeWidth={2.2} fill="none" strokeLinecap="round" />,
    <path key="2" d="M17 29h12" stroke="#3A2A00" strokeWidth={2.2} strokeLinecap="round" />,
    <path key="3" d="M16 27c4 4 10 4 14 0" stroke="#3A2A00" strokeWidth={2.2} fill="none" strokeLinecap="round" />,
    <path key="4" d="M15 26c4 6 12 6 16 0z" fill="#3A2A00" />,
  ][mood];
  return (
    <svg viewBox="0 0 46 44" width={54} height={52}>
      <path d="M4 2h38a3 3 0 013 3v26a3 3 0 01-3 3H30l-7 8-7-8H4a3 3 0 01-3-3V5a3 3 0 013-3z" fill="#FFD21F" />
      {eyes}
      {mouth}
    </svg>
  );
}

export function MetricasCesMotion() {
  const viewRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [play, setPlay] = useState(false);

  useLayoutEffect(() => {
    const el = viewRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setPlay(true); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);

  const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const on = play || reduced;

  const rowStart = 0.9; // a tabela começa depois que a janelinha aparece
  const rowStep = 0.16;

  return (
    <div ref={viewRef} className="not-prose relative w-full select-none" style={{ aspectRatio: `${W} / ${H}` }} role="img" aria-label="Pesquisa de CES do Hotjar e a visão geral do H1 com os 11 fluxos monitorados">
      {width > 0 && (
        <div className="absolute left-0 top-0 origin-top-left font-sans" style={{ width: W, height: H, transform: `scale(${width / W})`, color: C.ink }}>
          {/* Janelinha do Hotjar */}
          <motion.div
            className="absolute bg-white rounded-[4px] px-8 pt-10 pb-7"
            style={{ left: (W - POPUP_W) / 2, top: POPUP_TOP, width: POPUP_W, boxShadow: '0 30px 60px rgb(36 21 16 / .16), 0 4px 14px rgb(36 21 16 / .08)' }}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={on ? { opacity: 1, y: [0, -8, 0], scale: 1 } : { opacity: 0, y: 30, scale: 0.96 }}
            transition={on ? { opacity: { duration: 0.5 }, scale: { duration: 0.6, ease }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } } : { duration: 0.3 }}
          >
            <span className="absolute -top-3.5 -right-3.5 flex items-center justify-center w-9 h-9 rounded-full text-white" style={{ background: '#F0384F', boxShadow: '0 0 0 3px #fff' }}>
              <X size={18} strokeWidth={3} />
            </span>
            <p className="text-center text-[21px] leading-snug" style={{ color: '#333' }}>Foi fácil concluir<br />esta tarefa?</p>
            <div className="flex justify-between mt-8">
              {([0, 1, 2, 3, 4] as const).map(m => (
                <motion.span
                  key={m}
                  className="block"
                  animate={on ? { scale: [1, 1.22, 1] } : { scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + m * 0.22, repeat: Infinity, repeatDelay: 5 * 0.22 + 0.9, ease: 'easeInOut' }}
                >
                  <EmojiFace mood={m} />
                </motion.span>
              ))}
            </div>
            <div className="flex justify-between text-[12px] mt-2.5" style={{ color: C.sub }}>
              <span>Muito difícil</span><span>Muito fácil</span>
            </div>
            <p className="text-[13px] mt-9" style={{ color: '#333' }}>
              <span className="mr-1.5" style={{ color: '#F0384F' }}>🔥</span>Ainda não usa o <span className="underline">Hotjar</span>?
            </p>
          </motion.div>

          {/* Visão geral do H1 */}
          <motion.div
            className="absolute bg-white rounded-2xl px-4 py-4"
            style={{ left: 0, top: TABLE_TOP, width: W }}
            initial={{ opacity: 0, y: 20 }}
            animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
          >
            {/* Fundo das colunas 1–5 */}
            <div className="absolute flex pointer-events-none" style={{ left: 16 + COLS.slice(0, 6).reduce((a, b) => a + b, 0), top: 16 + HEAD_H, height: ROWS.length * ROW_H }}>
              {DIST_BG.map((bg, i) => <span key={i} style={{ width: COLS[6 + i], background: bg }} />)}
            </div>

            {/* Cabeçalho */}
            <div className="relative flex items-end text-[12px] leading-tight text-center" style={{ height: HEAD_H, color: C.sub }}>
              {HEAD.map((h, i) => (
                <span key={h} className="px-1.5 pb-2.5" style={{ width: COLS[i], fontSize: i >= 6 && i <= 10 ? 15 : 12, color: i >= 6 && i <= 10 ? C.ink : C.sub, textAlign: i === 0 ? 'left' : 'center', paddingLeft: i === 0 ? 14 : undefined }}>{h}</span>
              ))}
            </div>

            {/* Linhas */}
            {ROWS.map((r, i) => (
              <motion.div
                key={r.fluxo}
                className="relative flex items-center text-[14.5px] text-center"
                style={{ height: ROW_H }}
                initial={{ opacity: 0, y: 8 }}
                animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.4, delay: rowStart + i * rowStep, ease }}
              >
                {/* Destaque dos fluxos com melhor (verde) e pior (laranja) desempenho */}
                {r.box && (
                  <motion.span
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    style={{ boxShadow: `inset 0 0 0 1.5px ${r.box === 'green' ? '#9CD3A8' : '#F4C98A'}` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: on ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: rowStart + ROWS.length * rowStep + 0.3 }}
                  />
                )}
                <span className="text-left font-medium" style={{ width: COLS[0], paddingLeft: 14 }}>{r.fluxo}</span>
                <span style={{ width: COLS[1], color: PERSONA_COLOR[r.persona], fontSize: 13.5 }}>{r.persona}</span>
                <span className="font-bold" style={{ width: COLS[2], color: r.medio ? C.orange : C.green }}>{r.nota}</span>
                <span style={{ width: COLS[3], color: r.medio ? C.orange : C.green }}>{r.medio ? 'Médio esforço' : 'Baixo esforço'}</span>
                <span style={{ width: COLS[4] }}>{r.resp}</span>
                <span style={{ width: COLS[5], color: PCT_COLOR[r.pctTone] }}>{r.pct}</span>
                {r.dist.map((d, j) => <span key={j} className="tabular-nums" style={{ width: COLS[6 + j] }}>{d}</span>)}
                <span style={{ width: COLS[11] }}>{r.coment}</span>
                <span style={{ width: COLS[12] }}>{r.pctComent}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}

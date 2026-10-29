import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import googleIaStudioLogo from '../assets/images/Logos IA/Google IA Studio.png';
import cursorLogo from '../assets/images/Logos IA/Cursor.png';

/*
 * Fluxo de construção com IA usado nos cases de Dashboard de Admissão, Admin Global e KBA:
 * Figma → protótipo rápido no Google AI Studio → volta para ajustes no Figma → Cursor conectado ao
 * MCP do Design System → GitHub → time de desenvolvimento. As etapas aparecem em sequência ao
 * entrar na tela e o desenho fica parado.
 */

const H = 460;
const TILE = 96;
const ROW = 300; // linha principal
const TOP = 96; // ramo do AI Studio

const ease = [0.16, 1, 0.3, 1] as const;

const half = TILE / 2;

// Centro de cada etapa: o padrão é o dos cases; o largo (apresentação) espaça mais as etapas na horizontal
const LAYOUTS = {
  normal: { W: 1040, x: { figma: 110, studio: 330, cursor: 520, github: 730, team: 930 } },
  wide: { W: 1360, x: { figma: 120, studio: 420, cursor: 700, github: 980, team: 1240 } },
};

function layout(kind: keyof typeof LAYOUTS) {
  const { W, x } = LAYOUTS[kind];
  const N = {
    figma: { x: x.figma, y: ROW },
    studio: { x: x.studio, y: TOP },
    cursor: { x: x.cursor, y: ROW },
    github: { x: x.github, y: ROW },
    team: { x: x.team, y: ROW },
  };
  const mid = (a: number, b: number) => (a + b) / 2;
  // Setas tracejadas (caminho em L/U, com rótulo) — na ordem em que aparecem
  const ARROWS = [
    { d: `M ${N.figma.x} ${ROW - half - 8} V ${TOP} H ${N.studio.x - half - 10}`, label: 'protótipo rápido', lx: mid(N.figma.x, N.studio.x), ly: TOP - 32 },
    { d: `M ${N.studio.x} ${TOP + half + 62} V ${ROW - 70} H ${N.figma.x + 28} V ${ROW - half - 10}`, label: 'volta para ajustes', lx: mid(N.figma.x, N.studio.x), ly: ROW - 96 },
    { d: `M ${N.figma.x + half + 10} ${ROW} H ${N.cursor.x - half - 12}`, label: 'via MCP do Design System', lx: mid(N.figma.x, N.cursor.x), ly: ROW + 22 },
    { d: `M ${N.cursor.x + half + 10} ${ROW} H ${N.github.x - half - 12}`, label: 'push do código', lx: mid(N.cursor.x, N.github.x), ly: ROW + 22 },
    { d: `M ${N.github.x + half + 10} ${ROW} H ${N.team.x - half - 12}`, label: 'handoff', lx: mid(N.github.x, N.team.x), ly: ROW + 22 },
  ];
  return { W, N, ARROWS };
}

function FigmaLogo() {
  return (
    <svg viewBox="0 0 38 57" width={36} height={54}>
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
    </svg>
  );
}

function GithubLogo() {
  return (
    <svg viewBox="0 0 24 24" width={54} height={54}>
      <path fill="#181717" d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.7-2.8 5.7-5.5 6 .5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
    </svg>
  );
}

const STEPS = [
  { key: 'figma', title: 'Figma', sub: 'Design e planejamento', icon: <FigmaLogo /> },
  { key: 'studio', title: 'Google AI Studio', sub: 'Protótipo em vibe code', icon: <img src={googleIaStudioLogo} alt="" className="w-[80px] h-auto object-contain" />, tileBg: '#0B0B0C' },
  { key: 'cursor', title: 'Cursor', sub: 'Código com o Design System', icon: <img src={cursorLogo} alt="" className="w-[56px] h-[56px] object-contain" /> },
  { key: 'github', title: 'GitHub', sub: 'Repositório', icon: <GithubLogo /> },
  { key: 'team', title: 'Time de desenvolvimento', sub: 'Produto em produção', icon: <span className="text-[50px] leading-none">🧑‍💻</span> },
] as const;

// Ordem de entrada: etapa, seta, etapa...
const ORDER: [string, number][] = [['figma', 0], ['arrow', 0], ['studio', 1], ['arrow', 1], ['arrow', 2], ['cursor', 2], ['arrow', 3], ['github', 3], ['arrow', 4], ['team', 4]];
const delayOf = (kind: string, i: number) => ORDER.findIndex(([k, n]) => k === kind && n === i) * 0.28;

export function AiWorkflowDiagram({ wide = false }: { wide?: boolean }) {
  const { W, N, ARROWS } = layout(wide ? 'wide' : 'normal');
  const viewRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [on, setOn] = useState(false);

  useLayoutEffect(() => {
    const el = viewRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setOn(true); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) setOn(true);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);

  return (
    <div className="not-prose rounded-2xl bg-[#F1EEEA] p-4 md:p-8">
      <div ref={viewRef} className="relative w-full select-none" style={{ aspectRatio: `${W} / ${H}` }} role="img" aria-label="Fluxo com IA: Figma, protótipo no Google AI Studio, ajustes no Figma, Cursor conectado ao MCP do Design System, GitHub e time de desenvolvimento">
        {width > 0 && (
          <div className="absolute left-0 top-0 origin-top-left font-sans" style={{ width: W, height: H, transform: `scale(${width / W})`, color: '#241510' }}>
            <svg width={W} height={H} className="absolute inset-0 overflow-visible">
              <defs>
                <marker id="ai-flow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto-start-reverse">
                  <path d="M0 1 L9 5 L0 9 Z" fill="#241510" />
                </marker>
              </defs>
              {ARROWS.map((a, i) => (
                <motion.path
                  key={i}
                  d={a.d}
                  fill="none"
                  stroke="#241510"
                  strokeWidth={1.4}
                  strokeDasharray="6 6"
                  markerEnd="url(#ai-flow-arrow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: on ? 1 : 0 }}
                  transition={{ duration: 0.4, delay: delayOf('arrow', i) }}
                />
              ))}
            </svg>

            {/* Rótulos das setas */}
            {ARROWS.map((a, i) => (
              <motion.span
                key={a.label}
                className="absolute -translate-x-1/2 whitespace-nowrap text-[14px] text-[#4F4440]"
                style={{ left: a.lx, top: a.ly }}
                initial={{ opacity: 0 }}
                animate={{ opacity: on ? 1 : 0 }}
                transition={{ duration: 0.4, delay: delayOf('arrow', i) + 0.1 }}
              >
                {a.label}
              </motion.span>
            ))}

            {/* Etapas */}
            {STEPS.map((s, i) => {
              const p = N[s.key];
              return (
                <motion.div
                  key={s.key}
                  className="absolute flex flex-col items-center text-center"
                  style={{ left: p.x - 90, top: p.y - half, width: 180 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: delayOf(s.key, i), ease }}
                >
                  <span className="flex items-center justify-center rounded-[22px]" style={{ background: 'tileBg' in s ? s.tileBg : '#fff', width: TILE, height: TILE, boxShadow: '0 1px 2px rgb(36 21 16 / .06), 0 8px 20px rgb(36 21 16 / .06)' }}>
                    {s.icon}
                  </span>
                  <span className="text-[17px] font-semibold mt-3.5 leading-tight">{s.title}</span>
                  <span className="text-[13px] text-[#6F625B] mt-1 leading-tight">{s.sub}</span>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

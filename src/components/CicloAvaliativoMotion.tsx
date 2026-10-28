import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { TriangleAlert } from 'lucide-react';
import { wait } from './DevolutivaIaMotion';

/*
 * Motion do ciclo avaliativo (seção "A única etapa que acontecia fora do produto"): as etapas num
 * circuito retangular, em duas linhas, ligadas por setas retas e cotovelos de 90°. "Etapas do ciclo
 * avaliativo" fica no centro. As etapas aparecem uma a uma e as setas se desenham; "Devolutivas"
 * aparece em vermelho (era a etapa fora do produto). Ao voltar para "Preparação", recomeça.
 * Roda só enquanto está visível na tela.
 */

const W = 900;
const H = 330;
const BOX_W = 200;
const BOX_H = 56;
const TOP = 70;
const BOTTOM = 260;
const COLS = [150, 450, 750];
const GAP = 6; // espaço entre a ponta da seta e a caixa
const SIDE = 24; // até onde os cotovelos saem pelas laterais

// Sentido horário: linha de cima da esquerda para a direita, linha de baixo da direita para a esquerda
const STEPS = [
  { label: 'Preparação', x: COLS[0], y: TOP },
  { label: 'Definição de avaliadores', x: COLS[1], y: TOP },
  { label: 'Avaliações', x: COLS[2], y: TOP },
  { label: 'Comitês', x: COLS[2], y: BOTTOM },
  { label: 'Devolutivas', x: COLS[1], y: BOTTOM, alert: true },
  { label: 'PDI', x: COLS[0], y: BOTTOM },
];

const L = BOX_W / 2;
// Seta que sai de cada etapa até a próxima (as dos cantos fazem dois cotovelos de 90°)
const ARROWS = [
  `M ${COLS[0] + L + GAP} ${TOP} H ${COLS[1] - L - GAP}`,
  `M ${COLS[1] + L + GAP} ${TOP} H ${COLS[2] - L - GAP}`,
  `M ${COLS[2] + L + GAP} ${TOP} H ${W - SIDE} V ${BOTTOM} H ${COLS[2] + L + GAP}`,
  `M ${COLS[2] - L - GAP} ${BOTTOM} H ${COLS[1] + L + GAP}`,
  `M ${COLS[1] - L - GAP} ${BOTTOM} H ${COLS[0] + L + GAP}`,
  `M ${COLS[0] - L - GAP} ${BOTTOM} H ${SIDE} V ${TOP} H ${COLS[0] - L - GAP}`,
];

const NEUTRAL = '#9B908A';
const RED = '#B42318';

export function CicloAvaliativoMotion() {
  const viewRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [inView, setInView] = useState(false);
  const [step, setStep] = useState(STEPS.length * 2); // parado: ciclo completo
  const [shown, setShown] = useState(true);

  useLayoutEffect(() => {
    const el = viewRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);

  useEffect(() => {
    if (!inView || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const token = { cancelled: false };
    const run = async () => {
      while (!token.cancelled) {
        setShown(false);
        await wait(450, token);
        setStep(0);
        setShown(true);
        await wait(500, token);
        // etapa, seta, etapa, seta... até a seta que volta para Preparação
        for (let i = 1; i <= STEPS.length * 2; i++) {
          setStep(i);
          await wait(i % 2 === 1 ? 600 : 500, token);
        }
        await wait(2200, token);
      }
    };
    run().catch(() => {});
    return () => { token.cancelled = true; };
  }, [inView]);

  const s = width / W;
  const grow = [0.16, 1, 0.3, 1] as const;

  return (
    <div ref={viewRef} className="relative w-full select-none" style={{ aspectRatio: `${W} / ${H}` }} role="img" aria-label="Etapas do ciclo avaliativo: preparação, definição de avaliadores, avaliações, comitês, devolutivas e PDI. A devolutiva era a única etapa fora do produto.">
      {width > 0 && (
        <motion.div
          className="absolute left-0 top-0 origin-top-left font-sans"
          style={{ width: W, height: H, transform: `scale(${s})` }}
          animate={{ opacity: shown ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <svg width={W} height={H} className="absolute inset-0 overflow-visible">
            <defs>
              {[['neutral', NEUTRAL], ['red', RED]].map(([id, c]) => (
                <marker key={id} id={`ciclo-arrow-${id}`} viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="13" markerHeight="13" orient="auto-start-reverse">
                  <path d="M1 1 L8 5 L1 9" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </marker>
              ))}
            </defs>
            {ARROWS.map((d, i) => {
              const next = STEPS[(i + 1) % STEPS.length];
              const visible = step >= i * 2 + 2;
              const red = STEPS[i].alert || next.alert;
              return (
                <motion.path
                  key={d}
                  d={d}
                  fill="none"
                  stroke={red ? RED : NEUTRAL}
                  strokeWidth={1.5}
                  strokeLinejoin="miter"
                  markerEnd={visible ? `url(#ciclo-arrow-${red ? 'red' : 'neutral'})` : undefined}
                  initial={false}
                  animate={{ pathLength: visible ? 1 : 0, opacity: visible ? 1 : 0 }}
                  transition={{ pathLength: { duration: 0.45, ease: 'easeInOut' }, opacity: { duration: 0.15 } }}
                />
              );
            })}
          </svg>

          {/* Centro */}
          <p className="absolute text-center font-sans font-medium text-[19px] leading-tight text-[#6F625B]" style={{ left: W / 2 - 200, top: (TOP + BOTTOM) / 2 - 12, width: 400 }}>
            Etapas do ciclo avaliativo
          </p>

          {/* Etapas */}
          {STEPS.map((st, i) => {
            const visible = step >= i * 2 + 1;
            return (
              <motion.div
                key={st.label}
                className="absolute flex items-center justify-center gap-2 rounded-md border-2 bg-white text-center text-[17px] font-medium px-4"
                style={{
                  left: st.x - L,
                  top: st.y - BOX_H / 2,
                  width: BOX_W,
                  height: BOX_H,
                  borderColor: st.alert ? RED : '#C9C0B6',
                  color: st.alert ? RED : '#241510',
                  fontWeight: st.alert ? 700 : 500,
                  boxShadow: st.alert ? '0 0 0 6px rgb(180 35 24 / .08)' : 'none',
                }}
                initial={false}
                animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.85, y: visible ? 0 : 8 }}
                transition={{ duration: 0.4, ease: grow }}
              >
                {st.alert && <TriangleAlert size={18} strokeWidth={2.2} className="shrink-0" />}
                <span className="leading-tight">{st.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}

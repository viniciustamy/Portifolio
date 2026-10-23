import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { TriangleAlert } from 'lucide-react';
import { wait } from './DevolutivaIaMotion';

/*
 * Motion do ciclo avaliativo (seção "A única etapa que acontecia fora do produto"):
 * "Ciclo avaliativo" no centro e as etapas aparecendo em volta, uma a uma, ligadas por setas que se
 * desenham. "Devolutivas" aparece em vermelho (era a etapa fora do produto). Ao voltar para
 * "Preparação", tudo some e o ciclo recomeça. Roda só enquanto está visível na tela.
 */

const W = 900;
const H = 520;
const CX = W / 2;
const CY = H / 2;
const RX = 330;
const RY = 185;
const GAP = 24; // graus livres em volta de cada etapa para a seta não encostar na caixa

const STEPS = [
  { label: 'Preparação', angle: 180 },
  { label: 'Definição de avaliadores', angle: 240 },
  { label: 'Avaliações', angle: 300 },
  { label: 'Comitês', angle: 0 },
  { label: 'Devolutivas', angle: 60, alert: true },
  { label: 'PDI', angle: 120 },
];

const NEUTRAL = '#9B908A';
const RED = '#B42318';

const point = (deg: number) => {
  const r = (deg * Math.PI) / 180;
  return { x: CX + RX * Math.cos(r), y: CY + RY * Math.sin(r) };
};

// Arco da elipse de uma etapa até a próxima (sentido horário)
function arcPath(from: number, to: number) {
  const end = to < from ? to + 360 : to;
  const a = point(from + GAP);
  const b = point(end - GAP);
  return `M ${a.x} ${a.y} A ${RX} ${RY} 0 0 1 ${b.x} ${b.y}`;
}

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
          await wait(i % 2 === 1 ? 650 : 550, token);
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
    <div ref={viewRef} className="relative w-full select-none" style={{ aspectRatio: `${W} / ${H}` }} role="img" aria-label="Ciclo avaliativo: preparação, definição de avaliadores, avaliações, comitês, devolutivas e PDI. A devolutiva era a única etapa fora do produto.">
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
                <marker key={id} id={`ciclo-arrow-${id}`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M1 1 L8 5 L1 9" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </marker>
              ))}
            </defs>
            {STEPS.map((st, i) => {
              const next = STEPS[(i + 1) % STEPS.length];
              const visible = step >= i * 2 + 2;
              const red = st.alert || next.alert;
              return (
                <motion.path
                  key={st.label}
                  d={arcPath(st.angle, next.angle)}
                  fill="none"
                  stroke={red ? RED : NEUTRAL}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  markerEnd={visible ? `url(#ciclo-arrow-${red ? 'red' : 'neutral'})` : undefined}
                  initial={false}
                  animate={{ pathLength: visible ? 1 : 0, opacity: visible ? 1 : 0 }}
                  transition={{ pathLength: { duration: 0.5, ease: 'easeInOut' }, opacity: { duration: 0.15 } }}
                />
              );
            })}
          </svg>

          {/* Centro */}
          <motion.p
            className="absolute text-center font-sans font-medium text-[20px] leading-tight text-[#6F625B]"
            style={{ left: CX - 150, top: CY - 14, width: 300 }}
            initial={false}
            animate={{ opacity: step >= 0 ? 1 : 0, scale: 1 }}
          >
            Ciclo avaliativo
          </motion.p>

          {/* Etapas */}
          {STEPS.map((st, i) => {
            const p = point(st.angle);
            const visible = step >= i * 2 + 1;
            return (
              <motion.div
                key={st.label}
                className="absolute flex items-center justify-center gap-2 rounded-lg border-2 bg-white text-center text-[19px] font-medium px-5"
                style={{
                  left: p.x - 105,
                  top: p.y - 34,
                  width: 210,
                  height: 68,
                  borderColor: st.alert ? RED : '#C9C0B6',
                  color: st.alert ? RED : '#241510',
                  fontWeight: st.alert ? 700 : 500,
                  boxShadow: st.alert ? '0 0 0 6px rgb(180 35 24 / .08)' : 'none',
                }}
                initial={false}
                animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.85, y: visible ? 0 : 8 }}
                transition={{ duration: 0.45, ease: grow }}
              >
                {st.alert && <TriangleAlert size={20} strokeWidth={2.2} className="shrink-0" />}
                <span className="leading-tight">{st.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}

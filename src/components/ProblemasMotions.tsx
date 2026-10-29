import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CircleCheck, CircleHelp, Clock, EyeOff, FileText } from 'lucide-react';

/*
 * Três motions simples do slide "A devolutiva tinha valor, mas acontecia sem padrão" (apresentação
 * da Devolutiva), um para cada dor:
 * - Gestores: os arquivos de fora da plataforma (planilha, apresentação, PDF) flutuando.
 * - Colaboradores: devoluções de ciclos diferentes que se espalham e somem, até sobrar um documento com "?".
 * - RH: a pessoa do RH no centro e os gestores em volta, com o status trocando entre "?", em
 *   andamento e feito, sem ela saber quem terminou.
 * Cada um fica parado e apagado até receber active (mouse em cima, na apresentação) e então roda
 * em loop numa área de 400×290, direto sobre o fundo branco do slide.
 */

const BOX_W = 400;
const BOX_H = 290;
const C = { ink: '#241510', sub: '#6F625B', line: '#E2DCD4', accent: '#9E4322', cream: '#F6EAE3' };
const PEOPLE = '/apresentacao/devolutiva/pessoas';

function Box({ children, active }: { children: any; active: boolean }) {
  return (
    <div className="relative mx-auto transition-[opacity,filter] duration-300" style={{ width: BOX_W, height: BOX_H, opacity: active ? 1 : 0.4, filter: active ? 'none' : 'grayscale(.7)' }}>
      {children}
    </div>
  );
}

// Ícones de arquivo no estilo das ferramentas (letra + cor), sem reproduzir marcas
const FILES = [
  { label: 'X', name: 'Planilha', color: '#1D7044', x: 40, y: 30 },
  { label: 'P', name: 'Apresentação', color: '#C4502C', x: 168, y: 12 },
  { label: 'PDF', name: 'PDF', color: '#D63B30', x: 296, y: 40 },
  { label: '▦', name: 'Planilha online', color: '#1E9E5A', x: 92, y: 165 },
  { label: '▭', name: 'Slides online', color: '#E7A713', x: 236, y: 170 },
];

export function FerramentasMotion({ active }: { active: boolean }) {
  return (
    <Box active={active}>
      {FILES.map((f, i) => (
        <motion.div
          key={f.name}
          className="absolute flex flex-col items-center"
          style={{ left: f.x, top: f.y }}
          initial={false}
          animate={active ? { y: [0, -8, 0], rotate: [i % 2 ? 4 : -4, i % 2 ? -3 : 3, i % 2 ? 4 : -4] } : { y: 0, rotate: i % 2 ? 4 : -4 }}
          transition={active ? { y: { duration: 2.6 + i * 0.3, repeat: Infinity }, rotate: { duration: 3.2 + i * 0.2, repeat: Infinity } } : { duration: 0.4 }}
        >
          <span className="relative flex items-end justify-center rounded-[8px] bg-white pb-1.5" style={{ width: 62, height: 76, boxShadow: '0 6px 16px rgb(36 21 16 / .12)' }}>
            <span className="absolute left-0 right-0 top-0 h-[34px] rounded-t-[8px] flex items-center justify-center text-white font-black" style={{ background: f.color, fontSize: f.label.length > 1 ? 15 : 20 }}>{f.label}</span>
            <span className="flex flex-col gap-1 w-[38px]">
              <span className="h-1 rounded-full" style={{ background: '#E5E1DC' }} />
              <span className="h-1 w-3/4 rounded-full" style={{ background: '#E5E1DC' }} />
            </span>
          </span>
          <span className="text-[11px] font-semibold mt-1.5" style={{ color: C.sub }}>{f.name}</span>
        </motion.div>
      ))}
    </Box>
  );
}

// Devolutivas de ciclos anteriores que não ficam guardadas
const PAST = [
  { cycle: '2023.1', via: 'E-mail', x: 34, y: 54, r: -6 },
  { cycle: '2023.2', via: 'Apresentação', x: 140, y: 34, r: 3 },
  { cycle: '2024.1', via: 'Conversa', x: 246, y: 58, r: -2 },
];

export function HistoricoMotion({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0); // 0: chegam, 1: se perdem, 2: sobra a dúvida
  useEffect(() => {
    if (!active) { setPhase(0); return; }
    const steps = [2200, 1600, 3000];
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const next = () => { i = (i + 1) % 3; setPhase(i); t = setTimeout(next, steps[i]); };
    t = setTimeout(next, steps[0]);
    return () => clearTimeout(t);
  }, [active]);
  return (
    <Box active={active}>
      {PAST.map((d, i) => (
        <motion.div
          key={d.cycle}
          className="absolute rounded-[12px] bg-white px-3 py-3"
          style={{ left: d.x, top: d.y, width: 118, boxShadow: `0 0 0 1px ${C.line}, 0 6px 14px rgb(36 21 16 / .08)` }}
          initial={false}
          animate={phase === 0
            ? { opacity: 1, x: 0, y: 0, rotate: d.r, scale: 1 }
            : { opacity: 0, x: (i - 1) * 90, y: 140 + i * 20, rotate: d.r * 4, scale: 0.7 }}
          transition={{ duration: phase === 0 ? 0.5 : 0.9, delay: phase === 0 ? i * 0.2 : i * 0.12, ease: [0.65, 0, 0.35, 1] }}
        >
          <p className="flex items-center gap-1.5 text-[12px] font-bold m-0" style={{ color: C.ink }}><FileText size={13} color={C.accent} /> Ciclo {d.cycle}</p>
          <p className="text-[11px] mt-1 m-0" style={{ color: C.sub }}>via {d.via}</p>
          <span className="block h-1 rounded-full mt-2" style={{ background: '#EDE7E2' }} />
          <span className="block h-1 w-2/3 rounded-full mt-1" style={{ background: '#EDE7E2' }} />
        </motion.div>
      ))}
      {/* Sobra só a pergunta: onde está o meu histórico? */}
      <motion.div
        className="absolute flex flex-col items-center"
        style={{ left: 130, top: 70 }}
        initial={false}
        animate={{ opacity: phase === 2 ? 1 : 0, scale: phase === 2 ? 1 : 0.85 }}
        transition={{ duration: 0.5 }}
      >
        <span className="relative flex items-center justify-center rounded-[12px] bg-white" style={{ width: 140, height: 160, boxShadow: `0 0 0 1.5px ${C.line}, 0 10px 24px rgb(36 21 16 / .1)` }}>
          <span className="absolute left-4 right-4 top-5 flex flex-col gap-1.5">
            <span className="h-1.5 w-1/2 rounded-full" style={{ background: '#EDE7E2' }} />
            <span className="h-1.5 rounded-full" style={{ background: '#F3EEEA' }} />
          </span>
          <CircleHelp size={58} color={C.accent} strokeWidth={1.6} />
        </span>
      </motion.div>
    </Box>
  );
}

// Gestores (fotos) com status que o RH não consegue confirmar
const LEADERS = ['p12', 'p44', 'p51', 'p53', 'p5', 'p68'];
type Status = 'unknown' | 'doing' | 'done';
const STATES: Status[][] = [
  ['unknown', 'doing', 'unknown', 'unknown', 'done', 'unknown'],
  ['doing', 'unknown', 'unknown', 'done', 'unknown', 'doing'],
  ['unknown', 'unknown', 'done', 'unknown', 'doing', 'unknown'],
];

export function VisibilidadeMotion({ active }: { active: boolean }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!active) { setStep(0); return; }
    const t = setInterval(() => setStep(s => (s + 1) % STATES.length), 1400);
    return () => clearInterval(t);
  }, [active]);
  return (
    <Box active={active}>
      {LEADERS.map((l, i) => {
        const a = (i / LEADERS.length) * Math.PI * 2 - Math.PI / 2;
        const x = 200 + Math.cos(a) * 150 - 26;
        const y = 145 + Math.sin(a) * 108 - 26;
        const st = STATES[step][i];
        return (
          <div key={l}>
            {/* Linha tracejada até o RH */}
            <svg className="absolute inset-0 pointer-events-none" width={BOX_W} height={BOX_H}>
              <line x1={200} y1={145} x2={x + 26} y2={y + 26} stroke={C.line} strokeWidth="1.5" strokeDasharray="4 5" />
            </svg>
            <span className="absolute rounded-full" style={{ left: x, top: y, width: 52, height: 52 }}>
              <img src={`${PEOPLE}/${l}.jpg`} alt="" className="w-full h-full rounded-full object-cover" style={{ boxShadow: '0 0 0 2px #fff, 0 2px 8px rgb(0 0 0 / .12)' }} />
              <motion.span
                key={st + step}
                className="absolute -right-1 -bottom-1 flex items-center justify-center rounded-full bg-white"
                style={{ width: 22, height: 22, boxShadow: '0 1px 3px rgb(0 0 0 / .15)' }}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {st === 'unknown' && <CircleHelp size={16} color={C.accent} />}
                {st === 'doing' && <Clock size={15} color="#9A6A0B" />}
                {st === 'done' && <CircleCheck size={15} color="#2E8B2E" />}
              </motion.span>
            </span>
          </div>
        );
      })}
      {/* A pessoa do RH no centro, maior, sem enxergar o andamento */}
      <span className="absolute rounded-full" style={{ left: 155, top: 100, width: 90, height: 90 }}>
        <img src={`${PEOPLE}/p32.jpg`} alt="" className="w-full h-full rounded-full object-cover" style={{ boxShadow: `0 0 0 3px #fff, 0 0 0 5px ${C.accent}, 0 8px 20px rgb(36 21 16 / .18)` }} />
        <motion.span className="absolute -right-1 -top-1 flex items-center justify-center rounded-full" style={{ width: 30, height: 30, background: C.ink, color: '#fff' }} animate={active ? { scale: [1, 1.12, 1] } : { scale: 1 }} transition={active ? { duration: 1.4, repeat: Infinity } : { duration: 0.3 }}>
          <EyeOff size={15} />
        </motion.span>
      </span>
      <span className="absolute rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white" style={{ left: 183, top: 196, background: C.accent }}>RH</span>
    </Box>
  );
}

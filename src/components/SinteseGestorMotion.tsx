import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Clock, FileText, Quote, Star } from 'lucide-react';
import { wait } from './DevolutivaIaMotion';

/*
 * Motion do slide "A síntese ainda tomava tempo" (apresentação da Devolutiva): tudo o que o gestor
 * tinha sobre o colaborador (autoavaliação, avaliações de pares, notas, competências, feedbacks,
 * metas, calibração…) aparece espalhado em cima, passa um a um pelo gestor no meio e só então vira
 * a devolutiva embaixo. O relógio ao lado do gestor mostra o tempo de preparo crescendo.
 * Roda em loop enquanto o slide está aberto.
 */

const W = 540;
const H = 680;
const MANAGER = { x: 270, y: 430 };

const C = { ink: '#241510', sub: '#6F625B', line: '#E2DCD4', accent: '#9E4322', cream: '#F6EAE3' };
const ease = [0.65, 0, 0.35, 1] as const;

type Item =
  | { kind: 'quote'; label: string; text: string }
  | { kind: 'score'; label: string; value: string }
  | { kind: 'bars'; label: string; values: number[] }
  | { kind: 'tag'; label: string; value: string };

// Cada item empilhado em duas colunas no "monte" de cima, um sobre o outro
const ITEMS: (Item & { x: number; y: number; w: number; r: number })[] = [
  { kind: 'quote', label: 'Autoavaliação', text: '“Me dediquei ao projeto, mas senti falta de alinhamento.”', x: 14, y: 0, w: 242, r: -2 },
  { kind: 'score', label: 'Nota do gestor', value: '4,2', x: 284, y: 0, w: 242, r: 2 },
  { kind: 'quote', label: 'Avaliação de par', text: '“Ótima parceria com o time de Produto.”', x: 14, y: 64, w: 242, r: 1 },
  { kind: 'bars', label: 'Competências', values: [80, 55, 70, 40], x: 284, y: 64, w: 242, r: -1 },
  { kind: 'tag', label: 'Comitê de calibração', value: 'Alto desempenho', x: 14, y: 128, w: 242, r: 2 },
  { kind: 'quote', label: 'Feedback contínuo', text: '“Entregou o relatório antes do prazo.”', x: 284, y: 128, w: 242, r: -2 },
  { kind: 'score', label: 'Avaliação de pares', value: '4,6', x: 14, y: 192, w: 242, r: 1 },
  { kind: 'tag', label: 'Metas do ciclo', value: '3 de 4 concluídas', x: 284, y: 192, w: 242, r: -1 },
  { kind: 'quote', label: 'Avaliação 180°', text: '“Poderia dar mais autonomia ao time.”', x: 14, y: 256, w: 242, r: 2 },
  { kind: 'quote', label: 'PDI anterior', text: '“Desenvolver comunicação com liderança.”', x: 284, y: 256, w: 242, r: -2 },
];

// Tempo de preparo que o relógio mostra conforme o gestor lê os itens
const TIME = ['', '1 dia', '1 dia', '2 dias', '3 dias', '4 dias', '1 semana', '1 semana', '2 semanas', '2 semanas', '3 semanas'];

function ItemCard({ item, state }: { item: typeof ITEMS[number]; state: 'hidden' | 'shown' | 'read'; key?: string }) {
  const target = state === 'read'
    ? { x: MANAGER.x - item.x - item.w / 2, y: MANAGER.y - item.y - 30, scale: 0.15, opacity: 0, rotate: 0 }
    : state === 'shown'
      ? { x: 0, y: 0, scale: 1, opacity: 1, rotate: item.r }
      : { x: -20, y: 10, scale: 0.85, opacity: 0, rotate: item.r };
  return (
    <motion.div
      className="absolute rounded-[14px] bg-white px-4 py-3"
      style={{ left: item.x, top: item.y, width: item.w, boxShadow: `0 0 0 1px ${C.line}, 0 8px 20px rgb(36 21 16 / .08)` }}
      initial={false}
      animate={target}
      transition={{ duration: state === 'read' ? 0.7 : 0.45, ease }}
    >
      <p className="flex items-center gap-1.5 text-[12px] font-semibold m-0" style={{ color: C.accent }}>
        {item.kind === 'quote' && <Quote size={12} />}{item.kind === 'score' && <Star size={12} />}{item.label}
      </p>
      {item.kind === 'quote' && <p className="text-[14px] italic leading-snug mt-1.5 m-0" style={{ color: C.ink }}>{item.text}</p>}
      {item.kind === 'score' && <p className="font-serif text-[30px] font-bold leading-none mt-1.5 m-0" style={{ color: C.ink }}>{item.value}<span className="text-[14px] font-medium" style={{ color: C.sub }}> / 5</span></p>}
      {item.kind === 'tag' && <p className="text-[15px] font-semibold mt-1.5 m-0" style={{ color: C.ink }}>{item.value}</p>}
      {item.kind === 'bars' && (
        <div className="flex flex-col gap-1.5 mt-2">
          {item.values.map((v, i) => (
            <span key={i} className="h-2 rounded-full" style={{ background: '#F0E7E1' }}>
              <span className="block h-full rounded-full" style={{ width: `${v}%`, background: i % 2 ? '#D9A68C' : C.accent }} />
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export function SinteseGestorMotion() {
  const viewRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [shown, setShown] = useState(0); // itens no monte
  const [read, setRead] = useState(0); // itens que o gestor já leu
  const [doc, setDoc] = useState(0); // linhas da devolutiva escritas

  useLayoutEffect(() => {
    const el = viewRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { setShown(ITEMS.length); return; }
    const token = { cancelled: false };
    const run = async () => {
      while (!token.cancelled) {
        setShown(0); setRead(0); setDoc(0);
        await wait(500, token);
        // O monte de informações aparece
        for (let i = 1; i <= ITEMS.length; i++) { setShown(i); await wait(180, token); }
        await wait(1200, token);
        // O gestor lê um por um, e o tempo de preparo cresce
        for (let i = 1; i <= ITEMS.length; i++) { setRead(i); await wait(650, token); }
        // Só então a devolutiva é escrita
        for (let i = 1; i <= 3; i++) { setDoc(i); await wait(700, token); }
        await wait(3200, token);
      }
    };
    run().catch(() => {});
    return () => { token.cancelled = true; };
  }, []);

  const s = width / W;
  const reading = read > 0 && read < ITEMS.length;

  return (
    <div ref={viewRef} className="relative w-full select-none" style={{ aspectRatio: `${W} / ${H}` }} role="img" aria-label="Autoavaliação, avaliações de pares, notas, competências, feedbacks e metas passando pelo gestor até virar a devolutiva">
      {width > 0 && (
        <div className="absolute left-0 top-0 origin-top-left font-sans" style={{ width: W, height: H, transform: `scale(${s})` }}>
          {ITEMS.map((item, i) => (
            <ItemCard key={item.label + i} item={item} state={i < read ? 'read' : i < shown ? 'shown' : 'hidden'} />
          ))}

          {/* Gestor */}
          <div className="absolute flex items-center gap-6" style={{ left: MANAGER.x - 60, top: MANAGER.y - 60 }}>
            <motion.span
              className="relative flex items-center justify-center w-[120px] h-[120px] rounded-full shrink-0"
              style={{ background: C.cream, color: C.accent }}
              animate={reading ? { scale: [1, 1.05, 1] } : { scale: 1 }}
              transition={reading ? { duration: 0.65, repeat: Infinity } : { duration: 0.3 }}
            >
              <img src="/apresentacao/devolutiva/pessoas/p53.jpg" alt="" className="absolute inset-[7px] w-[106px] h-[106px] rounded-full object-cover" />
              {/* Progresso da leitura em volta */}
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="57" fill="none" stroke={C.line} strokeWidth="3" />
                <motion.circle cx="60" cy="60" r="57" fill="none" stroke={C.accent} strokeWidth="3" strokeLinecap="round" pathLength={1} strokeDasharray="1 1" initial={false} animate={{ strokeDashoffset: 1 - read / ITEMS.length }} transition={{ duration: 0.5 }} />
              </svg>
            </motion.span>
            <div>
            <p className="text-[20px] font-bold m-0" style={{ color: C.ink }}>Gestor</p>
            <p className="text-[14px] mt-1 m-0 tabular-nums" style={{ color: C.sub }}>{read === 0 ? `${ITEMS.length} itens para ler` : `Leu ${read} de ${ITEMS.length}`}</p>
            <motion.p className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[14px] font-semibold mt-3 m-0 whitespace-nowrap" style={{ background: C.ink, color: '#fff' }} animate={{ opacity: read > 0 ? 1 : 0 }}>
              <Clock size={14} /> {TIME[read] || '1 dia'}
            </motion.p>
            </div>
          </div>

          {/* Seta até a devolutiva */}
          <motion.span className="absolute w-[2px] origin-top" style={{ left: MANAGER.x - 1, top: MANAGER.y + 66, height: 40, background: C.accent }} initial={false} animate={{ scaleY: doc > 0 ? 1 : 0 }} transition={{ duration: 0.4 }} />

          {/* Devolutiva */}
          <motion.div
            className="absolute rounded-[16px] bg-white px-5 py-5"
            style={{ left: MANAGER.x - 210, top: MANAGER.y + 112, width: 420, boxShadow: `0 0 0 1.5px ${doc > 0 ? C.accent : C.line}, 0 10px 24px rgb(36 21 16 / .08)` }}
            initial={false}
            animate={{ opacity: doc > 0 ? 1 : 0.35, y: doc > 0 ? 0 : 8 }}
            transition={{ duration: 0.4 }}
          >
            <p className="flex items-center gap-2 text-[15px] font-bold m-0" style={{ color: C.ink }}><FileText size={16} color={C.accent} /> Devolutiva</p>
            <div className="grid grid-cols-3 gap-5">
            {['Pontos fortes', 'Pontos de melhoria', 'Conclusão'].map((t, i) => (
              <div key={t} className="mt-4">
                <p className="text-[11px] font-semibold m-0" style={{ color: C.sub }}>{t}</p>
                {[100, 72].map((w, j) => (
                  <motion.span key={j} className="block h-1.5 rounded-full mt-1.5 origin-left" style={{ width: `${w}%`, background: '#E7D3C8' }} initial={false} animate={{ scaleX: doc > i ? 1 : 0 }} transition={{ duration: 0.5, delay: j * 0.15 }} />
                ))}
              </div>
            ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

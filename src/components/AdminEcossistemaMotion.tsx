import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

/*
 * Ecossistema Gupy (case Admin Global): a marca no centro e, saindo de trás dela, as linhas que
 * revelam cada produto — Recrutamento, Admissão, Performance, Clima e Treinamentos. Toca uma vez
 * quando entra na tela.
 */

const W = 1100;
const H = 630;
const CX = 575;
const CY = 290;
const R = 108;

const ease = [0.16, 1, 0.3, 1] as const;

// Centro, largura e cor de cada produto (posições do diagrama original)
const PRODUCTS = [
  { label: 'Recrutamento', x: 275, y: 62, w: 346, color: '#2A5BFF' },
  { label: 'Admissão', x: 876, y: 48, w: 270, color: '#FF5A27' },
  { label: 'Performance', x: 930, y: 392, w: 326, color: '#17706A' },
  { label: 'Clima', x: 570, y: 580, w: 192, color: '#FF2BD6' },
  { label: 'Treinamentos', x: 171, y: 420, w: 342, color: '#2B9A3E' },
];
const PILL_H = 88;

export function AdminEcossistemaMotion() {
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
    }, { threshold: 0.45 });
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);

  const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const on = play || reduced;

  return (
    <div ref={viewRef} className="not-prose relative w-full max-w-[620px] mx-auto select-none" style={{ aspectRatio: `${W} / ${H}` }} role="img" aria-label="Ecossistema Gupy: Recrutamento, Admissão, Performance, Clima e Treinamentos ao redor da marca">
      {width > 0 && (
        <div className="absolute left-0 top-0 origin-top-left font-sans" style={{ width: W, height: H, transform: `scale(${width / W})` }}>
          {/* Linhas: crescem do centro até cada produto */}
          <svg className="absolute inset-0" width={W} height={H}>
            {PRODUCTS.map((p, i) => (
              <motion.line
                key={p.label}
                x1={CX} y1={CY} x2={p.x} y2={p.y}
                stroke="#C8C8C8" strokeWidth={3}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: on ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.55 + i * 0.18, ease }}
              />
            ))}
          </svg>

          {/* Produtos: saem de trás da marca e vão até o fim da linha */}
          {PRODUCTS.map((p, i) => (
            <motion.span
              key={p.label}
              className="absolute flex items-center justify-center rounded-full text-white font-semibold text-[38px] tracking-[-0.01em]"
              style={{ left: p.x - p.w / 2, top: p.y - PILL_H / 2, width: p.w, height: PILL_H, background: p.color }}
              initial={{ x: CX - p.x, y: CY - p.y, scale: 0.3, opacity: 0 }}
              animate={on ? { x: 0, y: 0, scale: 1, opacity: 1 } : { x: CX - p.x, y: CY - p.y, scale: 0.3, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.55 + i * 0.18, ease, opacity: { duration: 0.2, delay: 0.55 + i * 0.18 } }}
            >
              {p.label}
            </motion.span>
          ))}

          {/* Marca, por cima de tudo */}
          <motion.span
            className="absolute flex items-center justify-center rounded-full"
            style={{ left: CX - R, top: CY - R, width: R * 2, height: R * 2, background: '#333333' }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={on ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="text-white font-bold text-[52px] tracking-[-0.02em]">Gupy</span>
          </motion.span>
        </div>
      )}
    </div>
  );
}

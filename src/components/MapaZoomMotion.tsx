import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { wait } from './DevolutivaIaMotion';

/*
 * Tour com zoom pelo mapa da jornada de devolutiva (SVG exportado do Miro), no slide 7 da
 * apresentação: começa com zoom no meio (a Devolutiva), sobe até o Gestor, passa por RH, PDI,
 * Colaborador e Pares, e no fim tira o zoom para mostrar o mapa inteiro. Roda em loop.
 * O SVG é desenhado num tamanho grande (ZMAX × o tamanho que cabe) e reduzido por transform, para
 * continuar nítido no zoom sem ser redesenhado a cada quadro. ZoomTour é a peça genérica, usada
 * também no slide das pesquisas.
 */

const SRC = '/apresentacao/devolutiva/mapa-devolutiva.svg';
const IMG_W = 13509;
const IMG_H = 14224;
const ZMAX = 3.4;

// Ponto do tour em coordenadas relativas da imagem (0 a 1), zoom sobre a imagem inteira, etiqueta
// (sem etiqueta, nada aparece no canto) e quanto tempo fica parado ali
export type TourStep = { u: number; v: number; zoom: number; label?: string; hold?: number };

const TOUR: TourStep[] = [
  { u: 0.546, v: 0.42, zoom: 2.4, label: 'Devolutiva' },
  { u: 0.548, v: 0.13, zoom: 3, label: 'Gestor' },
  { u: 0.17, v: 0.19, zoom: 2.6, label: 'Calibração e RH' },
  { u: 0.83, v: 0.4, zoom: 2.6, label: 'PDI' },
  { u: 0.56, v: 0.66, zoom: 2.8, label: 'Colaborador' },
  { u: 0.56, v: 0.88, zoom: 2.6, label: 'Pares' },
  { u: 0.5, v: 0.5, zoom: 1, label: 'Jornada completa' },
];

const ease = [0.65, 0, 0.35, 1] as const;

export function MapaZoomMotion() {
  return <ZoomTour src={SRC} width={IMG_W} height={IMG_H} tour={TOUR} label="Mapa da jornada de devolutiva conectando RH, gestor, colaborador, pares e PDI" />;
}

export function ZoomTour({ src, width: IMG_W, height: IMG_H, tour: TOUR, label }: { src: string; width: number; height: number; tour: TourStep[]; label: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [step, setStep] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setSize({ w: entry.contentRect.width, h: entry.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { setStep(TOUR.length - 1); return; }
    const token = { cancelled: false };
    const run = async () => {
      while (!token.cancelled) {
        for (let i = 0; i < TOUR.length; i++) {
          setStep(i);
          await wait(TOUR[i].hold ?? (i === 0 ? 2600 : i === TOUR.length - 1 ? 4200 : 3400), token);
        }
      }
    };
    run().catch(() => {});
    return () => { token.cancelled = true; };
  }, [loaded, TOUR]);

  // Mapa inteiro cabendo na área; o SVG fica desenhado ZMAX vezes maior e é reduzido por scale
  const fit = Math.min(size.w / IMG_W, size.h / IMG_H);
  const drawW = IMG_W * fit * ZMAX;
  const drawH = IMG_H * fit * ZMAX;
  const cam = TOUR[step];
  const s = cam.zoom / ZMAX;
  // Com zoom, a câmera não passa da borda do mapa (sem faixa branca nas pontas)
  const clamp = (v: number, view: number, total: number) => (total > view ? Math.min(0, Math.max(view - total, v)) : (view - total) / 2);
  const x = clamp(size.w / 2 - cam.u * drawW * s, size.w, drawW * s);
  const y = clamp(size.h / 2 - cam.v * drawH * s, size.h, drawH * s);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden rounded-[20px]" style={{ background: '#fff', boxShadow: 'inset 0 0 0 1.5px #E2DCD4' }} role="img" aria-label={label}>
      {size.w > 0 && (
        <motion.img
          src={src}
          alt=""
          draggable={false}
          onLoad={() => setLoaded(true)}
          className="absolute left-0 top-0 origin-top-left max-w-none select-none"
          style={{ width: drawW, height: drawH }}
          initial={{ x, y, scale: s, opacity: 0 }}
          animate={{ x, y, scale: s, opacity: loaded ? 1 : 0 }}
          transition={{ x: { duration: 1.8, ease }, y: { duration: 1.8, ease }, scale: { duration: 1.8, ease }, opacity: { duration: 0.6 } }}
        />
      )}
      {/* Parte do mapa em foco */}
      <AnimatePresence mode="wait">
        {loaded && cam.label && (
          <motion.span
            key={cam.label}
            className="absolute left-5 bottom-5 rounded-full px-4 py-2 text-[15px] font-semibold text-white"
            style={{ background: 'rgb(36 21 16 / .85)' }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            {cam.label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Lock, RotateCw, X } from 'lucide-react';
import macbookImg from '../assets/images/Mockups/macbook.webp';

/*
 * Mockup de notebook com navegador, usado nos heros dos cases: a foto real do MacBook (PNG de
 * 2000 × 1300 com a tela transparente) por cima do navegador. Desenhado num palco de 1500px e
 * escalado para a largura disponível. A página fica em px de desenho (APP_W × APP_H) e o cursor
 * em coordenadas do palco (use `stagePoint` para converter um elemento da página).
 */

export const STAGE_W = 1500;
// Foto do MacBook no palco: escala de 2000 → 1500 e corte do espaço vazio acima da tampa
const IMG_K = STAGE_W / 2000;
const IMG_TOP = -77;
const IMG_H = 1300 * IMG_K;
// Tela no PNG: x 234, y 153, 1532 × 994, cantos de ~20px; o notch cobre os ~22px de cima no meio
export const SCREEN_LEFT = 234 * IMG_K;
const SCREEN_TOP = 153 * IMG_K + IMG_TOP;
const SCREEN_W = 1532 * IMG_K;
const SCREEN_H = 994 * IMG_K;
const SCREEN_R = 20 * IMG_K;
// A tela invade um pouco a moldura: a borda do PNG é suavizada e deixaria um filete do fundo aparecendo
const BLEED = 4;
export const BEZEL = 0;
const MENU_H = 24; // barra de menus do macOS, na altura do notch
export const TABS_H = 44;
const URL_H = 40;
const VIEW_W = SCREEN_W;
const VIEW_H = SCREEN_H - MENU_H - TABS_H - URL_H;
export const APP_W = 1366; // largura em que as telas foram desenhadas
const APP_SCALE = VIEW_W / APP_W;
export const APP_H = VIEW_H / APP_SCALE; // altura visível das telas, em px de desenho
const BASE_BOTTOM = 1278 * IMG_K + IMG_TOP; // pés do notebook
export const STAGE_H = Math.ceil(BASE_BOTTOM + 4);
export const TAB_W = 260;

const ease = [0.65, 0, 0.35, 1] as const;

export type Cursor = { x: number; y: number; visible: boolean; down: boolean };

// Centro da aba `i` em coordenadas do palco
export const tabCenter = (i: number) => ({
  x: SCREEN_LEFT + 84 + i * (TAB_W + 6) + TAB_W / 2,
  y: SCREEN_TOP + MENU_H + TABS_H / 2 + 2,
});

// Centro de um elemento da página em coordenadas do palco
export function stagePoint(stage: HTMLElement | null, el: HTMLElement | null) {
  if (!stage || !el) return { x: STAGE_W / 2, y: STAGE_H / 2 };
  const s = stage.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  const k = s.width / STAGE_W;
  return { x: (r.left + r.width / 2 - s.left) / k, y: (r.top + r.height / 2 - s.top) / k };
}

// Largura do palco renderizado + se está visível na tela
export function useLaptopViewport(threshold = 0.3) {
  const viewRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [inView, setInView] = useState(false);
  useLayoutEffect(() => {
    const el = viewRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold });
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, [threshold]);
  return { viewRef, width, inView };
}

export function LaptopMockup({
  viewRef, width, stageRef, screenRef, tabs, activeTab, cursor, label, pageBg = "#fff", showTabs = true, children,
}: {
  viewRef: any;
  width: number;
  stageRef?: any;
  screenRef?: any;
  tabs: { title: string; url: string }[];
  activeTab: number;
  cursor: Cursor;
  label: string;
  pageBg?: string; // fundo sob a página (evita filete branco nas bordas ao escalar)
  showTabs?: boolean; // false: só os botões da janela, sem abas (a troca de tela vem de fora)
  children: any;
}) {
  const s = width / STAGE_W;
  return (
    <div ref={viewRef} className="relative w-full select-none" style={{ aspectRatio: `${STAGE_W} / ${STAGE_H}` }} role="img" aria-label={label}>
      {width > 0 && (
        <div ref={stageRef} className="absolute left-0 top-0 origin-top-left font-sans" style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${s})` }}>
          {/* Tela: barra de menus do macOS + navegador, recortados nos cantos da tela do PNG */}
          <div className="absolute overflow-hidden" style={{ left: SCREEN_LEFT - BLEED, top: SCREEN_TOP - BLEED, width: SCREEN_W + BLEED * 2, height: SCREEN_H + BLEED * 2, borderRadius: SCREEN_R + BLEED, background: pageBg, padding: BLEED, paddingTop: 0 }}>
            <div className="flex items-end justify-between pb-[5px] text-[11px] font-medium text-white/90" style={{ height: MENU_H + BLEED, margin: `0 -${BLEED}px`, paddingLeft: 16 + BLEED, paddingRight: 16 + BLEED, background: '#141416' }}>
              <span className="flex items-center gap-4"><span className="font-semibold">Chrome</span><span>Arquivo</span><span>Editar</span><span>Visualizar</span></span>
              <span>qua. 10:50</span>
            </div>
            <div className="flex items-end gap-1.5" style={{ height: TABS_H, background: '#DEE1E6', margin: `0 -${BLEED}px`, paddingLeft: 14 + BLEED, paddingRight: 14 + BLEED }}>
              <span className="flex gap-2 mr-3 mb-[15px]">
                {['#FF5F57', '#FEBC2E', '#28C840'].map(c => <span key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />)}
              </span>
              {showTabs && tabs.map((t, i) => (
                <span
                  key={t.title}
                  className="relative flex items-center justify-between gap-2 px-4 text-[13px] rounded-t-[10px] transition-colors duration-200"
                  style={{ width: TAB_W, height: 36, background: activeTab === i ? '#fff' : 'transparent', color: activeTab === i ? '#1F2328' : '#4B5058' }}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center text-[9px] font-black text-white" style={{ background: '#0E8270' }}>G</span>
                    <span className="truncate">{t.title}</span>
                  </span>
                  <X size={13} className="shrink-0 opacity-60" />
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 border-b bg-white" style={{ height: URL_H, borderColor: '#E3E5E8', margin: `0 -${BLEED}px`, paddingLeft: 16 + BLEED, paddingRight: 16 + BLEED }}>
              <span className="flex gap-3 text-[#5F6368]"><ChevronLeft size={18} /><ChevronRight size={18} /><RotateCw size={16} /></span>
              <span className="flex-1 flex items-center gap-2 rounded-full px-4 text-[13px] text-[#3C4043]" style={{ height: 28, background: '#F1F3F4' }}>
                <Lock size={12} /> {tabs[activeTab]?.url}
              </span>
            </div>

            {/* Página */}
            <div className="relative overflow-hidden" style={{ width: VIEW_W, height: VIEW_H }}>
              <div ref={screenRef} className="absolute left-0 top-0 origin-top-left" style={{ width: APP_W, height: APP_H, transform: `scale(${APP_SCALE})` }}>
                {children}
              </div>
            </div>
          </div>

          {/* Foto do MacBook por cima (a tela dela é transparente) */}
          <img src={macbookImg} alt="" draggable={false} className="absolute max-w-none pointer-events-none" style={{ left: 0, top: IMG_TOP, width: STAGE_W, height: IMG_H }} />

          {/* Cursor */}
          <motion.div
            className="absolute left-0 top-0 z-30 pointer-events-none"
            initial={false}
            animate={{ x: cursor.x - 4, y: cursor.y - 2, opacity: cursor.visible ? 1 : 0, scale: cursor.down ? 0.85 : 1 }}
            transition={{ x: { duration: 1, ease }, y: { duration: 1, ease }, opacity: { duration: 0.25 }, scale: { duration: 0.12 } }}
          >
            <svg width="28" height="32" viewBox="0 0 26 30" fill="none">
              <path d="M2 2l20 11.5-9 2.2-4.3 8.6L2 2z" fill="#111" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      )}
    </div>
  );
}

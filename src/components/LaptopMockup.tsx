import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Lock, RotateCw, X } from 'lucide-react';

/*
 * Mockup de notebook com navegador, usado nos heros dos cases. Desenhado num palco de 1500px e
 * escalado para a largura disponível. A página fica em px de desenho (APP_W × APP_H) e o cursor
 * em coordenadas do palco (use `stagePoint` para converter um elemento da página).
 */

export const STAGE_W = 1500;
export const SCREEN_LEFT = 50;
const SCREEN_W = 1400;
export const BEZEL = 24;
export const TABS_H = 44;
const URL_H = 40;
const VIEW_W = SCREEN_W - BEZEL * 2; // 1352
const SCREEN_RATIO = 9 / 16; // área da página em 16:9
const VIEW_H = Math.round(VIEW_W * SCREEN_RATIO); // 761
export const APP_W = 1366; // largura em que as telas foram desenhadas
const APP_SCALE = VIEW_W / APP_W;
export const APP_H = VIEW_H / APP_SCALE; // altura visível das telas, em px de desenho
const SCREEN_H = BEZEL + TABS_H + URL_H + VIEW_H + 30;
const BASE_H = 46;
const SHADOW_H = 70; // espaço para a sombra de contato no chão
export const STAGE_H = 20 + SCREEN_H + BASE_H + SHADOW_H;
export const TAB_W = 260;

const ease = [0.65, 0, 0.35, 1] as const;

export type Cursor = { x: number; y: number; visible: boolean; down: boolean };

// Centro da aba `i` em coordenadas do palco
export const tabCenter = (i: number) => ({
  x: SCREEN_LEFT + BEZEL + 14 + i * (TAB_W + 6) + TAB_W / 2,
  y: 20 + BEZEL + TABS_H / 2 + 2,
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
  viewRef, width, stageRef, screenRef, tabs, activeTab, cursor, label, pageBg = "#fff", ratio = SCREEN_RATIO, showTabs = true, children,
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
  ratio?: number; // altura/largura da área da página (padrão 16:9)
  showTabs?: boolean; // false: só os botões da janela, sem abas (a troca de tela vem de fora)
  children: any;
}) {
  const s = width / STAGE_W;
  // Medidas que dependem da proporção da tela
  const viewH = Math.round(VIEW_W * ratio);
  const screenH = BEZEL + TABS_H + URL_H + viewH + 30;
  const stageH = 20 + screenH + BASE_H + SHADOW_H;
  const appH = viewH / APP_SCALE;
  return (
    <div ref={viewRef} className="relative w-full select-none" style={{ aspectRatio: `${STAGE_W} / ${stageH}` }} role="img" aria-label={label}>
      {width > 0 && (
        <div ref={stageRef} className="absolute left-0 top-0 origin-top-left font-sans" style={{ width: STAGE_W, height: stageH, transform: `scale(${s})` }}>
          {/* Tela do notebook */}
          <div className="absolute rounded-[28px]" style={{ left: SCREEN_LEFT, top: 20, width: SCREEN_W, height: screenH, background: '#0E1116', boxShadow: 'inset 0 0 0 2px #2A2F36' }}>
            <span className="absolute left-1/2 -translate-x-1/2 rounded-full" style={{ top: 9, width: 8, height: 8, background: '#2E343C' }} />

            {/* Navegador */}
            <div className="absolute overflow-hidden rounded-[8px]" style={{ background: pageBg, left: BEZEL, top: BEZEL, width: VIEW_W, height: TABS_H + URL_H + viewH }}>
              <div className="flex items-end gap-1.5 px-3.5" style={{ height: TABS_H, background: '#DEE1E6' }}>
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
              <div className="flex items-center gap-4 px-4 border-b bg-white" style={{ height: URL_H, borderColor: '#E3E5E8' }}>
                <span className="flex gap-3 text-[#5F6368]"><ChevronLeft size={18} /><ChevronRight size={18} /><RotateCw size={16} /></span>
                <span className="flex-1 flex items-center gap-2 rounded-full px-4 text-[13px] text-[#3C4043]" style={{ height: 28, background: '#F1F3F4' }}>
                  <Lock size={12} /> {tabs[activeTab]?.url}
                </span>
              </div>

              {/* Página */}
              <div className="relative overflow-hidden" style={{ width: VIEW_W, height: viewH }}>
                <div ref={screenRef} className="absolute left-0 top-0 origin-top-left" style={{ width: APP_W, height: appH, transform: `scale(${APP_SCALE})` }}>
                  {children}
                </div>
              </div>
            </div>
          </div>

          {/* Sombra no chão: uma mancha larga e suave + uma faixa escura de contato colada à base */}
          <span className="absolute rounded-[50%]" style={{ left: 40, right: 40, top: 20 + screenH + BASE_H - 26, height: 64, background: 'radial-gradient(closest-side, rgb(20 22 26 / .30), rgb(20 22 26 / 0))', filter: 'blur(6px)' }} />
          <span className="absolute rounded-[50%]" style={{ left: 120, right: 120, top: 20 + screenH + BASE_H - 12, height: 20, background: 'radial-gradient(closest-side, rgb(20 22 26 / .45), rgb(20 22 26 / 0))', filter: 'blur(2px)' }} />

          {/* Base do notebook */}
          <div className="absolute" style={{ left: 0, top: 20 + screenH - 4, width: STAGE_W, height: BASE_H }}>
            <div className="absolute inset-0 rounded-b-[26px]" style={{ background: 'linear-gradient(#ECEEF1 0%, #D3D7DC 55%, #AEB3BA 100%)', boxShadow: 'inset 0 -2px 0 rgb(0 0 0 / .08)' }} />
            <span className="absolute left-1/2 -translate-x-1/2 top-0 rounded-b-[12px]" style={{ width: 220, height: 14, background: '#C9CDD3' }} />
          </div>

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

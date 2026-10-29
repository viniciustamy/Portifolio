import { forwardRef } from 'react';
import frameImg from '../assets/images/Mockups/iphone-17.webp';

/*
 * Moldura real do iPhone 17 (PNG com a tela transparente) por cima do conteúdo.
 * Medidas da tela no PNG de 389 × 800: começa em x 17 / y 13, tem 355 × 773 e cantos de ~56px.
 * O conteúdo fica recortado no retângulo da tela e a moldura (com a Dynamic Island) vai por cima.
 */
const IMG_W = 389;
const IMG_H = 800;
const SCREEN = { x: 17, y: 13, w: 355, h: 773, r: 56 };

// Altura da tela para uma largura de tela qualquer
export const screenHeight = (width: number) => (width * SCREEN.h) / SCREEN.w;
// Área da barra de status e da Dynamic Island no topo da tela
export const safeTop = (width: number) => (width * 54) / 375;

type Props = { left: number; top: number; width: number; background?: string; children?: any };

export const IPhoneFrame = forwardRef<HTMLDivElement, Props>(function IPhoneFrame({ left, top, width, background = '#fff', children }, ref) {
  const k = width / SCREEN.w;
  return (
    <>
      <div
        ref={ref}
        className="absolute overflow-hidden"
        style={{ left, top, width, height: SCREEN.h * k, borderRadius: SCREEN.r * k, background }}
      >
        {children}
      </div>
      <img
        src={frameImg}
        alt=""
        draggable={false}
        className="absolute max-w-none pointer-events-none select-none"
        style={{ left: left - SCREEN.x * k, top: top - SCREEN.y * k, width: IMG_W * k, height: IMG_H * k, filter: 'drop-shadow(0 30px 40px rgb(0 0 0 / .35))' }}
      />
    </>
  );
});

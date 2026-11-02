import { useLayoutEffect, useRef, useState } from 'react';
import figmaImg from '../assets/images/KBA/KBA-Handoff-Figma.png';
import { KbaThumbMotion } from './KbaThumbMotion';

/*
 * Seção de handoff do case KBA: o board do Figma (fluxo, tamanhos e eventos do GA) à esquerda e,
 * por cima dele à direita, o iPhone com o fluxo completo rodando: do login até o sucesso, sem confetes.
 */

// Palco da thumb: 700px de largura; a altura cabe o iPhone inteiro, sem cortar em baixo
const PHONE_BOX = 'aspect-[700/900]';

export function KbaHandoffMotion() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative w-full aspect-[1720/940] mt-[10%] mb-[8%]">
      <img src={figmaImg} alt="Board do Figma com o fluxo de recuperação de conta, os tamanhos de tela e os eventos do Google Analytics" className="absolute left-0 top-1/2 -translate-y-1/2 w-[56%] h-auto rounded-xl" />
      <div className={`absolute right-0 -top-[12%] h-[124%] ${PHONE_BOX}`}>
        <KbaThumbMotion active={inView} full />
      </div>
    </div>
  );
}

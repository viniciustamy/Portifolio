import { useEffect } from 'react';

// Scroll assistido da página (desktop): cada gesto da roda/trackpad leva até o próximo título de seção.
// Se o próximo título estiver a mais de uma tela de distância, anda uma tela por vez para não pular conteúdo.
// Mesmo critério de gesto da Home: cada clique da roda conta uma vez; a sequência contínua do trackpad é um gesto só.
export function useAssistedPageScroll(enabled: boolean, headingSelector = 'main h2[id]') {
  useEffect(() => {
    if (!enabled || !window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches) return;

    const OFFSET = 96; // espaço para o cabeçalho flutuante acima do título
    let lastWheel = 0;
    let lastDir = 0;
    let target: number | null = null;
    let frame = 0;

    // Rolagem própria com duração fixa: a suave do navegador fica lenta em páginas com muitas animações
    const scrollToY = (to: number) => {
      cancelAnimationFrame(frame);
      const from = window.scrollY;
      const start = performance.now();
      const duration = 700;
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        window.scrollTo(0, from + (to - from) * eased);
        if (t < 1) frame = requestAnimationFrame(step);
        else target = null;
      };
      frame = requestAnimationFrame(step);
    };

    const stops = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const points = [0, max];
      document.querySelectorAll<HTMLElement>(headingSelector).forEach(h => {
        if (h.offsetParent === null) return; // títulos escondidos (outra versão do case)
        points.push(h.getBoundingClientRect().top + window.scrollY - OFFSET);
      });
      return [...new Set(points.map(p => Math.round(Math.min(max, Math.max(0, p)))))].sort((a, b) => a - b);
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX) || e.ctrlKey) return;
      // Lightbox, apresentação e outros modais travam o scroll da página
      if (document.body.style.overflow === 'hidden') return;

      e.preventDefault();
      const now = performance.now();
      const dir = Math.sign(e.deltaY);
      const newGesture = now - lastWheel > 120 || dir !== lastDir;
      lastWheel = now;
      lastDir = dir;
      if (!newGesture) return;

      const from = target ?? window.scrollY;
      const page = window.innerHeight * 0.8;
      const list = stops();
      let next = dir > 0 ? list.find(p => p > from + 4) : [...list].reverse().find(p => p < from - 4);
      if (next === undefined) return;
      if (Math.abs(next - from) > page) next = from + dir * page;

      target = next;
      scrollToY(next);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      cancelAnimationFrame(frame);
    };
  }, [enabled, headingSelector]);
}

import { useEffect, useRef, useState } from 'react';

// Diz se um card está "em foco" para disparar a animação da thumb:
// quando o card está quase todo visível na tela (só cabe um por vez) ou, com mouse, enquanto o cursor está sobre ele.
export function useCardFocus<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => setInView(entry.intersectionRatio >= 0.75), { threshold: [0, 0.75, 1] });
    io.observe(el);

    const enter = () => setHovered(true);
    const leave = () => setHovered(false);
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (canHover) {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    }

    return () => {
      io.disconnect();
      if (canHover) {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      }
    };
  }, []);

  return [ref, inView || hovered] as const;
}

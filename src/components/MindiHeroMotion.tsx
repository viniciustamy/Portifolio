import { useLayoutEffect, useRef, useState } from 'react';
import { MindiThumbMotion } from './MindiThumbMotion';

/*
 * Hero do case Mindi: o celular com o app rodando num banner escuro, na cor de fundo do app.
 */
export function MindiHeroMotion() {
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
    <div ref={ref} className="relative w-full h-[520px] md:h-[640px] rounded-2xl overflow-hidden" style={{ background: '#484AAC' }}>
      <div className="absolute inset-x-0 top-10 bottom-0 mx-auto max-w-[560px]">
        <MindiThumbMotion active={inView} />
      </div>
    </div>
  );
}

import { useLayoutEffect, useRef, useState } from 'react';
import { MindiThumbMotion } from './MindiThumbMotion';
import { AppStoreBadge } from './AppStoreBadge';
import { MINDI_APP_STORE_URL } from '../links';

/*
 * Hero do case Mindi: banner roxo com o chamado para baixar na App Store à esquerda e o celular
 * com o app rodando à direita (no celular, o texto vem em cima).
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
    <div ref={ref} className="relative w-full h-[640px] rounded-2xl overflow-hidden" style={{ background: '#484AAC' }}>
      <div className="absolute z-10 inset-x-0 top-9 px-6 flex flex-col items-center text-center md:items-start md:text-left md:inset-x-auto md:left-14 md:top-1/2 md:-translate-y-1/2 md:max-w-[340px] md:px-0">
        <p className="font-serif text-[28px] md:text-[38px] font-bold leading-[1.1] text-white">Baixe agora na App Store</p>
        <p className="text-[15px] md:text-[16px] leading-relaxed text-white/80 mt-3">O Mindi já está no ar para iPhone.</p>
        <AppStoreBadge url={MINDI_APP_STORE_URL} className="mt-5 md:mt-7" />
      </div>
      <div className="absolute inset-x-0 top-[210px] bottom-0 mx-auto max-w-[560px] md:top-10 md:inset-x-auto md:left-[36%] md:right-0 md:max-w-none md:mx-0">
        <MindiThumbMotion active={inView} />
      </div>
    </div>
  );
}

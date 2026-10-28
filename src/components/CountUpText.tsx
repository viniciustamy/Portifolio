import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

/*
 * Texto com números que contam do zero até o valor ao entrar na tela, mantendo o resto do texto
 * ("+1.000", "~50%", "3–4 dias", "5 · 4 · 5"). Textos sem número aparecem como estão.
 */

const NUMBER = /\d+(?:[.,]\d+)*/g;

// "1.000" → 1000 e "4,5" → 4.5 (formato brasileiro)
const parse = (raw: string) => Number(raw.replace(/\./g, '').replace(',', '.'));

function format(value: number, raw: string) {
  const decimals = raw.includes(',') ? raw.split(',')[1].length : 0;
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: raw.includes('.'),
  });
}

export function CountUpText({ text, duration = 1.4, className }: { text: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { setProgress(1); return; }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      setProgress(1 - Math.pow(1 - t, 3)); // desacelera no fim
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, duration]);

  // Frações ("2/3") não contam: os valores intermediários mudariam o sentido do número
  const isFraction = /\d+\s*\/\s*\d+/.test(text);
  const shown = isFraction ? text : text.replace(NUMBER, raw => {
    const target = parse(raw);
    const decimals = raw.includes(',') ? raw.split(',')[1].length : 0;
    const current = decimals ? target * progress : Math.round(target * progress);
    return format(current, raw);
  });

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}

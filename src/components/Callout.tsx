import { AnimatePresence, motion } from 'motion/react';
import { Lightbulb } from 'lucide-react';

/*
 * Destaque usado nas telas da Devolutiva: anel verde em volta de um bloco e um balão branco com
 * pontinha apontando para ele, com o valor daquela parte da tela (tom de novidade, não de alerta). O pai precisa ser `relative`.
 * `place`: balão acima ("top") ou abaixo ("bottom") do anel; `align`: alinhamento horizontal.
 */

const GREEN = '#1E7A4F';
const grow = [0.16, 1, 0.3, 1] as const;

export function Callout({
  show, text, place = 'top', align = 'center', inset = -10,
}: { show: boolean; text: string; place?: 'top' | 'bottom'; align?: 'left' | 'center' | 'right'; inset?: number }) {
  const above = place === 'top';
  const x = align === 'center' ? '-50%' : '0%';
  const horizontal = align === 'center' ? { left: '50%' } : align === 'left' ? { left: 16 } : { right: 16 };
  const tail = align === 'center' ? { left: '50%', marginLeft: -9 } : align === 'left' ? { left: 32 } : { right: 32 };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.span
            key="ring"
            className="absolute pointer-events-none rounded-2xl z-20"
            style={{ inset, border: `3px solid ${GREEN}`, boxShadow: `0 0 0 6px rgb(30 122 79 / .16)` }}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: grow }}
          />
          <motion.span
            key="bubble"
            className="absolute z-30 flex items-center gap-2.5 whitespace-nowrap rounded-2xl px-6 py-3.5 text-[20px] font-semibold"
            style={{
              ...horizontal,
              background: '#fff',
              color: '#1F2328',
              boxShadow: '0 14px 34px rgb(15 23 42 / .22), 0 0 0 1px rgb(15 23 42 / .06)',
              [above ? 'bottom' : 'top']: `calc(100% + ${-inset + 18}px)`,
            }}
            initial={{ opacity: 0, y: above ? 8 : -8, x }}
            animate={{ opacity: 1, y: 0, x }}
            exit={{ opacity: 0, x }}
            transition={{ duration: 0.4, delay: 0.15, ease: grow }}
          >
            <Lightbulb size={20} color={GREEN} className="shrink-0" />
            {text}
            {/* Pontinha do balão, apontando para o anel */}
            <span
              className="absolute w-[18px] h-[18px] rotate-45"
              style={{ ...tail, background: '#fff', [above ? 'bottom' : 'top']: -8 }}
            />
          </motion.span>
        </>
      )}
    </AnimatePresence>
  );
}

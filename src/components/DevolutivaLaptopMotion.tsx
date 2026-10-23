import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Stage as FormStage, TEXT, wait } from './DevolutivaIaMotion';
import { ReportScreen, RhScreen } from './DevolutivaSolucaoMotion';
import { APP_H, APP_W, Cursor, LaptopMockup, tabCenter, useLaptopViewport } from './LaptopMockup';

/*
 * Hero do case da Devolutiva: notebook com um navegador e três abas, uma por jornada
 * (RH, gestor e colaborador). O cursor clica em cada aba; a tela rola até o fim e volta ao topo,
 * e segue para a próxima aba. Roda em loop enquanto está visível.
 */

const TABS = [
  { title: 'Ciclo avaliativo', url: 'app.gupy.io/performance/devolutivas/plano-2024-1' },
  { title: 'Devolutiva · Marina Costa', url: 'app.gupy.io/performance/devolutivas/engenharia/marina-costa' },
  { title: 'Devolutiva Geral 2024.1', url: 'app.gupy.io/performance/minhas-devolutivas/geral-2024-1' },
];

const ease = [0.65, 0, 0.35, 1] as const;

const filledFields = { fortes: TEXT.fortes, melhoria: TEXT.melhoria, conclusao: TEXT.conclusao };
const FORM_H = 1550;

export function DevolutivaLaptopMotion() {
  const { viewRef, width, inView } = useLaptopViewport();
  const screenRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState(0);
  const [scroll, setScroll] = useState(0);
  const [cursor, setCursor] = useState<Cursor>({ x: 900, y: 600, visible: false, down: false });

  useEffect(() => {
    if (!inView || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const token = { cancelled: false };

    // Quanto a tela atual pode rolar (em px de desenho)
    const maxScroll = (i: number) => {
      if (i === 1) return FORM_H - APP_H;
      const content = screenRef.current?.querySelector<HTMLElement>('[data-scroll-content]');
      const frame = content?.parentElement;
      if (!content || !frame) return 0;
      return Math.max(0, content.offsetHeight - frame.clientHeight);
    };

    const run = async () => {
      setTab(0);
      setScroll(0);
      setCursor({ x: 900, y: 500, visible: false, down: false });
      await wait(600, token);
      let i = 0;
      while (!token.cancelled) {
        // Clica na aba
        setCursor(c => ({ ...c, ...tabCenter(i), visible: true }));
        await wait(1100, token);
        setCursor(c => ({ ...c, down: true }));
        await wait(160, token);
        setCursor(c => ({ ...c, down: false }));
        setScroll(0);
        setTab(i);
        // Tira o cursor de cima das abas enquanto a tela rola
        setCursor(c => ({ ...c, x: 1180, y: 640 }));
        await wait(1600, token);

        // Rola até o fim e volta ao topo
        setScroll(maxScroll(i));
        await wait(3300, token);
        setScroll(0);
        await wait(2600, token);

        i = (i + 1) % TABS.length;
      }
    };

    run().catch(() => {});
    return () => { token.cancelled = true; };
  }, [inView]);

  return (
    <LaptopMockup
      viewRef={viewRef}
      width={width}
      screenRef={screenRef}
      tabs={TABS}
      activeTab={tab}
      cursor={cursor}
      label="Notebook com as telas da solução: plano do RH, devolutiva do gestor e relatório do colaborador"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={tab} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          {tab === 0 && <RhScreen play={false} highlight={null} scroll={scroll} scrollDuration={3} />}
          {tab === 1 && (
            <div className="absolute inset-0 overflow-hidden">
              <motion.div className="absolute left-0 top-0" style={{ width: APP_W, height: FORM_H }} initial={false} animate={{ y: -scroll }} transition={{ duration: 3, ease }}>
                <FormStage fields={filledFields} activeField={null} pressed={null} showLogo={false} />
              </motion.div>
            </div>
          )}
          {tab === 2 && <ReportScreen play={false} scroll={scroll} scrollDuration={3} />}
        </motion.div>
      </AnimatePresence>
    </LaptopMockup>
  );
}

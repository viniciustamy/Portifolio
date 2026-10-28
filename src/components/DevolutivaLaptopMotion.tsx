import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Stage as FormStage, TEXT, wait } from './DevolutivaIaMotion';
import { ReportScreen, RhScreen } from './DevolutivaSolucaoMotion';
import { APP_H, APP_W, LaptopMockup, useLaptopViewport } from './LaptopMockup';

/*
 * Hero do case da Devolutiva: um toggle group (RH, Gestor, Colaborador) acima do notebook troca
 * sozinho de jornada; cada tela rola até o fim e volta ao topo antes de seguir para a próxima.
 * Um clique no toggle vai direto para aquela jornada e o loop continua dali. Roda só visível.
 */

const JOURNEYS = [
  { label: 'RH', url: 'app.gupy.io/performance/devolutivas/plano-2025-1', desc: 'Página de controle da operação: o RH acompanha quem já fez a devolutiva e quem ainda falta.' },
  { label: 'Gestor', url: 'app.gupy.io/performance/devolutivas/engenharia/marina-costa', desc: 'Criação da devolutiva dentro da plataforma, com o apoio da Gupy IA.' },
  { label: 'Colaborador', url: 'app.gupy.io/performance/minhas-devolutivas/geral-2025-1', desc: 'Relatório individual que o colaborador recebe depois da conversa com o gestor.' },
];

const ease = [0.65, 0, 0.35, 1] as const;
const NO_CURSOR = { x: 0, y: 0, visible: false, down: false };

const filledFields = { fortes: TEXT.fortes, melhoria: TEXT.melhoria, conclusao: TEXT.conclusao };
const FORM_H = 1550;

export function DevolutivaLaptopMotion() {
  const { viewRef, width, inView } = useLaptopViewport();
  const screenRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState(0);
  const [scroll, setScroll] = useState(0);
  const [runKey, setRunKey] = useState(0); // muda no clique para recomeçar o loop da jornada escolhida
  const tabRef = useRef(0);
  tabRef.current = tab;

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
      let i = tabRef.current;
      while (!token.cancelled) {
        setScroll(0);
        setTab(i);
        await wait(1800, token);
        // Rola até o fim e volta ao topo
        setScroll(maxScroll(i));
        await wait(3300, token);
        setScroll(0);
        await wait(2600, token);
        i = (i + 1) % JOURNEYS.length;
      }
    };

    run().catch(() => {});
    return () => { token.cancelled = true; };
  }, [inView, runKey]);

  const pick = (i: number) => {
    setTab(i);
    setScroll(0);
    tabRef.current = i;
    setRunKey(k => k + 1);
  };

  return (
    <div className="flex flex-col items-center mt-4 md:mt-6">
      {/* Toggle group das jornadas */}
      <div role="tablist" aria-label="Jornadas da devolutiva" className="relative inline-flex rounded-full bg-[#F0EDE8] p-1 font-sans">
        {JOURNEYS.map((j, i) => (
          <button
            key={j.label}
            role="tab"
            aria-selected={tab === i}
            onClick={() => pick(i)}
            className="relative px-4 md:px-5 py-1.5 text-[13px] md:text-[14px] font-semibold rounded-full transition-colors cursor-pointer"
            style={{ color: tab === i ? '#241510' : '#6F625B' }}
          >
            {tab === i && <motion.span layoutId="devolutiva-journey" className="absolute inset-0 rounded-full bg-white" style={{ boxShadow: '0 1px 3px rgb(36 21 16 / .12)' }} transition={{ duration: 0.35, ease }} />}
            <span className="relative">{j.label}</span>
          </button>
        ))}
      </div>

      {/* O que é cada página */}
      <div className="relative h-12 md:h-7 w-full max-w-[820px] mt-3 mb-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={tab}
            className="absolute inset-0 text-center text-[14px] md:text-[15px] text-[#6F625B] leading-snug px-4"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {JOURNEYS[tab].desc}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="w-full">
        <LaptopMockup
          viewRef={viewRef}
          width={width}
          screenRef={screenRef}
          tabs={JOURNEYS.map(j => ({ title: j.label, url: j.url }))}
          activeTab={tab}
          showTabs={false}
          cursor={NO_CURSOR}
          label="Notebook com as telas da solução: controle do RH, devolutiva do gestor e relatório do colaborador"
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
      </div>
    </div>
  );
}

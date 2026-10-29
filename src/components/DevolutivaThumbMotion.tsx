import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Bold, Italic, Link2, List, ListOrdered, Underline, X } from 'lucide-react';
import { C, FIELDS, FieldKey, TEXT, emptyFields, typeText, wait } from './DevolutivaIaMotion';

/*
 * Versão thumb do motion da Devolutiva (card do case na Home): só o card da devolutiva sobre o
 * fundo verde da thumbnail. Roda devagar e apenas enquanto `active` (card em foco):
 * cursor clica em "Visualizar conclusão da IA" → a modal flutua por cima e escreve a conclusão →
 * "Aplicar" fecha a modal → o card inteiro sobe enquanto os campos são preenchidos → cursor clica em
 * "Continuar e revisar" e tudo recomeça. Ao perder o foco, volta ao estado inicial (igual à thumbnail).
 */

const THUMB_W = 600; // largura do palco; a altura acompanha a proporção da coluna
const CARD_TOP = 56;
const MODAL_MAX_H = 400;

type Pressed = 'ai' | 'apply' | 'continue' | null;

const ease = [0.65, 0, 0.35, 1] as const;

export function DevolutivaThumbMotion({ active }: { active: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLSpanElement>(null);
  const applyRef = useRef<HTMLSpanElement>(null);
  const continueRef = useRef<HTMLSpanElement>(null);
  const fieldRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [size, setSize] = useState({ w: 0, h: 0 });
  const [cursor, setCursor] = useState({ x: 560, y: 440, visible: false, down: false });
  const [pressed, setPressed] = useState<Pressed>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalText, setModalText] = useState(emptyFields);
  const [fields, setFields] = useState(emptyFields);
  const [activeField, setActiveField] = useState<FieldKey | null>(null);
  const [scroll, setScroll] = useState(0);

  // Conversa da modal: quando a resposta cresce além da área, as mensagens sobem e a de cima sai, como num chat
  const chatRef = useRef<HTMLDivElement>(null);
  const chatInnerRef = useRef<HTMLDivElement>(null);
  const [chatShift, setChatShift] = useState(0);
  useLayoutEffect(() => {
    const box = chatRef.current;
    const inner = chatInnerRef.current;
    if (!box || !inner) { setChatShift(0); return; }
    setChatShift(Math.max(0, inner.offsetHeight - box.clientHeight));
  }, [modalText, loading, modalOpen]);

  const scale = size.w / THUMB_W;
  const stageH = scale ? size.h / scale : 0;
  const modalH = Math.min(MODAL_MAX_H, stageH - 52);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setSize({ w: entry.contentRect.width, h: entry.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const reset = () => {
      setCursor(c => ({ ...c, visible: false, down: false }));
      setPressed(null);
      setModalOpen(false);
      setLoading(false);
      setModalText(emptyFields);
      setFields(emptyFields);
      setActiveField(null);
      setScroll(0);
    };

    if (!active || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      reset();
      return;
    }

    const token = { cancelled: false };

    // Centro de um elemento em coordenadas do palco (já considerando o scroll do card)
    const centerOf = (el: HTMLElement | null) => {
      const stage = stageRef.current;
      if (!el || !stage) return { x: 300, y: 300 };
      const r = el.getBoundingClientRect();
      const s = stage.getBoundingClientRect();
      const k = s.width / THUMB_W;
      return { x: (r.left + r.width / 2 - s.left) / k, y: (r.top + r.height / 2 - s.top) / k };
    };

    const moveTo = async (el: HTMLElement | null) => {
      setCursor(c => ({ ...c, ...centerOf(el), visible: true }));
      await wait(1400, token);
    };

    const click = async (which: Pressed) => {
      setCursor(c => ({ ...c, down: true }));
      setPressed(which);
      await wait(200, token);
      setCursor(c => ({ ...c, down: false }));
      setPressed(null);
    };

    // Quanto o card inteiro precisa subir para o rodapé com os botões chegar à base do palco
    const stageHeight = () => {
      const wrap = wrapRef.current;
      return wrap ? wrap.clientHeight / (wrap.clientWidth / THUMB_W) : 0;
    };
    const maxScroll = () => {
      const content = contentRef.current;
      if (!content) return 0;
      return Math.max(0, CARD_TOP + content.offsetHeight - stageHeight());
    };

    const run = async () => {
      while (!token.cancelled) {
        reset();
        setCursor({ x: 560, y: 440, visible: false, down: false });
        await wait(500, token);

        // 1. Cursor clica em "Visualizar conclusão da IA"
        await moveTo(aiRef.current);
        await click('ai');

        // 2. Modal flutua por cima, carrega e escreve a conclusão
        setModalOpen(true);
        setLoading(true);
        setCursor(c => ({ ...c, x: c.x + 120, y: c.y + 70 }));
        await wait(2200, token);
        setLoading(false);
        await typeText(TEXT.fortes, 1800, s => setModalText(m => ({ ...m, fortes: s })), token);
        await typeText(TEXT.melhoria, 1900, s => setModalText(m => ({ ...m, melhoria: s })), token);
        await typeText(TEXT.conclusao, 1900, s => setModalText(m => ({ ...m, conclusao: s })), token);
        await wait(900, token);

        // 3. "Aplicar na devolutiva" fecha a modal
        await moveTo(applyRef.current);
        await click('apply');
        await wait(200, token);
        setModalOpen(false);
        setCursor(c => ({ ...c, visible: false }));
        await wait(600, token);

        // 4. O card inteiro sobe (e vaza pelo topo) enquanto cada campo é preenchido
        for (let i = 0; i < FIELDS.length; i++) {
          const f = FIELDS[i];
          const top = fieldRefs.current[i]?.offsetTop ?? 0;
          setScroll(Math.min(maxScroll(), Math.max(0, CARD_TOP + top - 30)));
          await wait(1400, token);
          setActiveField(f.key);
          await typeText(TEXT[f.key], 2400, s => setFields(v => ({ ...v, [f.key]: s })), token);
          await wait(400, token);
          setActiveField(null);
        }

        // 5. Rola até o fim e clica em "Continuar e revisar"
        setScroll(maxScroll());
        await wait(1400, token);
        await moveTo(continueRef.current);
        await click('continue');
        await wait(1200, token);
        setCursor(c => ({ ...c, visible: false }));
        setScroll(0);
        await wait(1400, token);
      }
    };

    run().catch(() => {});
    return () => { token.cancelled = true; };
  }, [active]);

  const modalDone = !loading && modalText.conclusao.length === TEXT.conclusao.length;

  return (
    // Sem overflow-hidden: o card sobe e vaza até a borda de cima do card da Home, que é quem recorta
    <div ref={wrapRef} className="absolute inset-0 select-none" aria-hidden="true">
      {scale > 0 && (
        <div
          ref={stageRef}
          className="absolute left-0 top-0 origin-top-left font-sans"
          style={{ width: THUMB_W, height: stageH, transform: `scale(${scale})`, color: C.ink }}
        >
          {/* Card da devolutiva — sai pela borda de baixo, como na thumbnail; ao preencher, sobe inteiro */}
          <motion.div
            className="absolute bg-white rounded-t-[18px] overflow-hidden"
            style={{ left: 70, right: 40, top: CARD_TOP, boxShadow: '0 18px 40px rgb(0 0 0 / .18)' }}
            initial={false}
            animate={{ y: -scroll }}
            transition={{ duration: 1.3, ease }}
          >
            <div ref={contentRef} className="relative px-[22px] pt-[22px] pb-6">
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-medium">Devolutiva com Gupy IA</span>
                <span className="ml-2 flex items-center gap-1 text-[11.5px] font-semibold text-white rounded-md px-1.5" style={{ height: 21, background: C.blue }}>
                  Beta
                </span>
              </div>
              <p className="text-[13px] leading-[1.45] mt-3" style={{ color: C.sub }}>
                Utilize nossa inteligência artificial para analisar as informações do relatório da pessoa liderada e ajudar a escreve sua devolutiva.
              </p>
              <p className="text-[13px] leading-[1.45] mt-3" style={{ color: C.sub }}>
                Lembre-se de revisar a conclusão fornecida pela IA, pois ao enviá-la, você concorda e se responsabiliza pelo conteúdo.
              </p>
              <motion.span
                ref={aiRef}
                className="mt-3.5 inline-flex items-center text-white text-[13px] font-semibold rounded-full px-3.5"
                style={{ height: 30, background: C.blue, boxShadow: '0 4px 10px rgb(26 102 219 / .3)' }}
                animate={{ scale: pressed === 'ai' ? 0.94 : 1 }}
                transition={{ duration: 0.12 }}
              >
                Visualizar conclusão da IA
              </motion.span>
              <div className="mt-6 border-t" style={{ borderColor: C.line }} />

              {FIELDS.map((f, i) => {
                const value = fields[f.key];
                const isActive = activeField === f.key;
                return (
                  <div key={f.key} ref={el => { fieldRefs.current[i] = el; }} className="mt-5">
                    <div className="flex justify-between text-[13px]">
                      <span>{f.label} *</span>
                      <span className="text-[11.5px]" style={{ color: C.sub }}>{value.length}/1000</span>
                    </div>
                    <div
                      className="mt-2 rounded-lg overflow-hidden border transition-[border-color,box-shadow] duration-300"
                      style={{ borderColor: isActive ? C.teal : C.line, boxShadow: isActive ? '0 0 0 3px rgb(14 130 112 / .15)' : 'none' }}
                    >
                      <div className="flex items-center gap-[18px] px-3 bg-white border-b" style={{ height: 28, borderColor: C.line }}>
                        {[Bold, Italic, Underline, List, ListOrdered, Link2].map((Icon, j) => <Icon key={j} size={15} color={C.ink} strokeWidth={2.4} />)}
                      </div>
                      <div
                        className="px-3 py-2.5 text-[13px] leading-[1.5] transition-colors duration-500"
                        style={{ height: 118, background: value ? '#fff' : C.field, color: value ? C.ink : C.muted }}
                      >
                        {value || 'Escreva aqui...'}
                        {isActive && <span className="inline-block w-[2px] h-[15px] align-[-3px] ml-[1px] animate-pulse" style={{ background: C.teal }} />}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="mt-6 flex items-center justify-end gap-7">
                <span className="text-[13.5px] font-medium" style={{ color: C.blue }}>Salvar como rascunho</span>
                <motion.span
                  ref={continueRef}
                  className="flex items-center text-white text-[13.5px] font-semibold rounded-full px-5"
                  style={{ height: 38, background: C.teal }}
                  animate={{ scale: pressed === 'continue' ? 0.94 : 1 }}
                  transition={{ duration: 0.12 }}
                >
                  Continuar e revisar
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* Modal flutuante por cima do card */}
          <AnimatePresence>
            {modalOpen && (
              <motion.div
                key="thumb-modal"
                className="absolute z-20 bg-white rounded-[18px] overflow-hidden"
                style={{ left: 36, right: 16, top: 34, height: modalH, boxShadow: '0 30px 60px rgb(0 0 0 / .3)' }}
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 14 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center justify-between px-5 text-white" style={{ height: 50, background: C.navy }}>
                  <span className="text-[16px] font-semibold">Gupy IA</span>
                  <X size={18} />
                </div>
                {/* Conversa: ancorada embaixo da área quando passa do tamanho, empurrando a mensagem de cima */}
                <div ref={chatRef} className="absolute overflow-hidden" style={{ left: 20, right: 20, top: 66, bottom: 66 }}>
                  <motion.div ref={chatInnerRef} className="flex flex-col gap-3" initial={false} animate={{ y: -chatShift }} transition={{ duration: 0.35, ease: 'easeOut' }}>
                    <p className="rounded-xl px-3.5 py-3 text-[12.5px] leading-[1.45]" style={{ background: C.page }}>{TEXT.intro}</p>
                    <div className="rounded-xl px-3.5 py-3 text-[12px] leading-[1.5]" style={{ background: C.page }}>
                      {loading ? (
                        <div className="flex flex-col gap-2.5">
                          <span className="flex items-center gap-1.5 text-[12px]" style={{ color: C.sub }}>
                            {[0, 1, 2].map(i => (
                              <motion.span key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: C.blue }} animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
                            ))}
                            <span className="ml-1">Analisando o relatório individual…</span>
                          </span>
                          {[90, 76, 84, 58].map((w, i) => (
                            <motion.span key={i} className="h-2.5 rounded-full" style={{ width: `${w}%`, background: '#E2E4E8' }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.08 }} />
                          ))}
                        </div>
                      ) : (
                        ([['fortes', 'Pontos fortes:'], ['melhoria', 'Pontos de melhoria:'], ['conclusao', 'Conclusão geral:']] as [FieldKey, string][]).map(([k, title]) => modalText[k] && (
                          <p key={k} className="mb-2.5 last:mb-0">
                            <b className="block">{title}</b>
                            {modalText[k]}
                          </p>
                        ))
                      )}
                    </div>
                  </motion.div>
                </div>
                <motion.span
                  ref={applyRef}
                  className="absolute flex items-center text-white text-[13.5px] font-semibold rounded-full px-5"
                  style={{ right: 20, bottom: 16, height: 38, background: C.teal }}
                  animate={{ scale: pressed === 'apply' ? 0.94 : 1, opacity: modalDone ? 1 : 0.55 }}
                  transition={{ duration: 0.15 }}
                >
                  Aplicar na devolutiva
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cursor */}
          <motion.div
            className="absolute left-0 top-0 z-30 pointer-events-none"
            initial={false}
            animate={{ x: cursor.x - 4, y: cursor.y - 2, opacity: cursor.visible ? 1 : 0, scale: cursor.down ? 0.85 : 1 }}
            transition={{ x: { duration: 1.3, ease }, y: { duration: 1.3, ease }, opacity: { duration: 0.3 }, scale: { duration: 0.12 } }}
          >
            <svg width="24" height="28" viewBox="0 0 26 30" fill="none">
              <path d="M2 2l20 11.5-9 2.2-4.3 8.6L2 2z" fill="#111" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft, Bell, Bold, ChevronDown, ClipboardList, Home, Info, Italic, Link2, List, ListChecks,
  ListOrdered, Maximize2, MessageSquare, MessageSquareText, MessagesSquare, Repeat, Settings, Sparkles,
  ThumbsUp, TrendingUp, Underline, UserCheck, X,
} from 'lucide-react';

/*
 * Motion do fluxo "Devolutiva com Gupy IA": as telas são recriadas em código num palco de 1366×1550px
 * e uma "câmera" (translate + scale) passeia por ele seguindo a linha do tempo em `run()`:
 * clique em "Visualizar conclusão da IA" → modal carrega e escreve a conclusão → clique em
 * "Aplicar na devolutiva" → os três campos são preenchidos.
 */

const STAGE_W = 1366;
const STAGE_H = 1550;
const VIEW_H = 800; // altura visível no zoom 1 (proporção 1366×800)

export const C = {
  teal: '#0E8270',
  blue: '#1A66DB',
  navy: '#141B2D',
  ink: '#1F2328',
  sub: '#4B5058',
  muted: '#8A8F98',
  page: '#F3F4F6',
  side: '#DEE0E4',
  field: '#ECEDEF',
  line: '#E3E5E8',
};

export const TEXT = {
  intro: 'Aqui está a conclusão da Marina, baseado nos resultados do seu relatório individual. Revise as informações antes de enviá-las.',
  fortes: 'Esta colaboradora demonstra um alto nível de comprometimento com as tarefas atribuídas. Sua dedicação é evidente em sua disposição para assumir responsabilidades adicionais sempre que necessário.',
  melhoria: 'Apesar de sua dedicação e habilidades interpessoais, esta colaboradora pode enfrentar dificuldades em gerenciar seu tempo de forma eficaz. Às vezes, ela pode se sobrecarregar com múltiplas tarefas e lutar para priorizá-las adequadamente.',
  conclusao: 'Em resumo, esta colaboradora possui uma série de pontos fortes que beneficiam significativamente sua contribuição para a equipe. Para alcançar seu pleno potencial, seria benéfico focar em gerenciamento de tempo e comunicação.',
};

export const FIELDS = [
  { key: 'fortes', label: 'Pontos fortes', top: 650 },
  { key: 'melhoria', label: 'Pontos de melhoria', top: 898 },
  { key: 'conclusao', label: 'Conclusão geral', top: 1146 },
] as const;

export type FieldKey = typeof FIELDS[number]['key'];
type Camera = { cx: number; cy: number; zoom: number; d: number };
type Point = { x: number; y: number };

export const wait = (ms: number, token: { cancelled: boolean }) =>
  new Promise<void>((resolve, reject) => setTimeout(() => (token.cancelled ? reject('cancelled') : resolve()), ms));

// Revela `full` aos poucos em `ms`, chamando `onUpdate` a cada quadro
export function typeText(full: string, ms: number, onUpdate: (s: string) => void, token: { cancelled: boolean }) {
  return new Promise<void>((resolve, reject) => {
    const start = performance.now();
    const step = (now: number) => {
      if (token.cancelled) return reject('cancelled');
      const p = Math.min(1, (now - start) / ms);
      onUpdate(full.slice(0, Math.round(full.length * p)));
      if (p < 1) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });
}

export const emptyFields: Record<FieldKey, string> = { fortes: '', melhoria: '', conclusao: '' };
const AI_BUTTON: Point = { x: 256, y: 559 };
const APPLY_BUTTON: Point = { x: 1034, y: 688 };

export function DevolutivaIaMotion() {
  const viewRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [inView, setInView] = useState(false);
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const [cam, setCam] = useState<Camera>({ cx: 300, cy: 520, zoom: 2.4, d: 0 });
  const [cursor, setCursor] = useState<Point & { visible: boolean; down: boolean }>({ x: 470, y: 650, visible: false, down: false });
  const [pressed, setPressed] = useState<'ai' | 'apply' | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalText, setModalText] = useState(emptyFields);
  const [fields, setFields] = useState(emptyFields);
  const [activeField, setActiveField] = useState<FieldKey | null>(null);
  const [fade, setFade] = useState(false);

  useLayoutEffect(() => {
    const el = viewRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setFields({ fortes: TEXT.fortes, melhoria: TEXT.melhoria, conclusao: TEXT.conclusao });
      setCam({ cx: 683, cy: 1010, zoom: 1, d: 0 });
      return;
    }
    if (!inView) return;
    const token = { cancelled: false };

    const click = async (which: 'ai' | 'apply') => {
      setCursor(c => ({ ...c, down: true }));
      setPressed(which);
      await wait(180, token);
      setCursor(c => ({ ...c, down: false }));
      setPressed(null);
    };

    const run = async () => {
      while (!token.cancelled) {
        // 1. Começa com a tela inteira, depois dá zoom no card da IA e o cursor vai até o botão
        setFade(false);
        setModalOpen(false);
        setLoading(false);
        setModalText(emptyFields);
        setFields(emptyFields);
        setActiveField(null);
        setCam({ cx: 683, cy: 400, zoom: 1, d: 0 });
        setCursor({ x: 520, y: 660, visible: false, down: false });
        await wait(1400, token);
        setCam({ cx: 330, cy: 500, zoom: 2.3, d: 1.2 });
        await wait(1000, token);
        setCursor(c => ({ ...c, visible: true }));
        await wait(300, token);
        setCursor(c => ({ ...c, ...AI_BUTTON }));
        await wait(1000, token);
        await click('ai');

        // 2. Zoom out e a modal abre carregando
        setCam({ cx: 683, cy: 400, zoom: 1, d: 1.1 });
        setModalOpen(true);
        setLoading(true);
        setCursor(c => ({ ...c, x: 640, y: 560 }));
        await wait(1900, token);
        setLoading(false);

        // 3. A conclusão é escrita na modal
        await typeText(TEXT.fortes, 1100, s => setModalText(m => ({ ...m, fortes: s })), token);
        await typeText(TEXT.melhoria, 1200, s => setModalText(m => ({ ...m, melhoria: s })), token);
        await typeText(TEXT.conclusao, 1200, s => setModalText(m => ({ ...m, conclusao: s })), token);
        await wait(500, token);

        // 4. Zoom no botão "Aplicar na devolutiva" e clique
        setCam({ cx: 960, cy: 640, zoom: 2, d: 1 });
        setCursor(c => ({ ...c, ...APPLY_BUTTON }));
        await wait(1200, token);
        await click('apply');
        await wait(150, token);
        setModalOpen(false);
        setCursor(c => ({ ...c, visible: false }));

        // 5. Câmera desce pelos campos enquanto são preenchidos
        for (const f of FIELDS) {
          setCam({ cx: 416, cy: f.top + 130, zoom: 1.75, d: 1 });
          await wait(f.key === 'fortes' ? 1100 : 700, token);
          setActiveField(f.key);
          await typeText(TEXT[f.key], 1300, s => setFields(v => ({ ...v, [f.key]: s })), token);
          await wait(250, token);
          setActiveField(null);
        }

        // 6. Visão geral com tudo preenchido, depois recomeça
        setCam({ cx: 683, cy: 1010, zoom: 1, d: 1.2 });
        await wait(3200, token);
        setFade(true);
        await wait(500, token);
      }
    };

    run().catch(() => {});
    return () => { token.cancelled = true; };
  }, [inView, reduceMotion]);

  // Câmera: centraliza (cx, cy) do palco na janela, com o zoom pedido
  const base = width / STAGE_W;
  const s = base * cam.zoom;
  const viewH = width * (VIEW_H / STAGE_W);
  const tx = width / 2 - cam.cx * s;
  const ty = viewH / 2 - cam.cy * s;
  const ease = [0.65, 0, 0.35, 1] as const;

  return (
    <div
      ref={viewRef}
      className="relative w-full overflow-hidden rounded-2xl bg-[#DEE0E4] select-none"
      style={{ aspectRatio: `${STAGE_W} / ${VIEW_H}` }}
      aria-label="Animação do fluxo: o gestor gera a conclusão com a Gupy IA e aplica nos campos da devolutiva"
      role="img"
    >
      {width > 0 && (
        <motion.div
          className="absolute left-0 top-0 origin-top-left"
          style={{ width: STAGE_W, height: STAGE_H }}
          initial={false}
          animate={{ x: tx, y: ty, scale: s, opacity: fade ? 0 : 1 }}
          transition={{ x: { duration: cam.d, ease }, y: { duration: cam.d, ease }, scale: { duration: cam.d, ease }, opacity: { duration: 0.45 } }}
        >
          <Stage fields={fields} activeField={activeField} pressed={pressed} />

          <AnimatePresence>
            {modalOpen && (
              <Modal key="modal" loading={loading} text={modalText} pressed={pressed === 'apply'} />
            )}
          </AnimatePresence>

          {/* Cursor */}
          <motion.div
            className="absolute left-0 top-0 z-50 pointer-events-none"
            initial={false}
            animate={{ x: cursor.x - 4, y: cursor.y - 2, opacity: cursor.visible ? 1 : 0, scale: cursor.down ? 0.85 : 1 }}
            transition={{ x: { duration: 0.9, ease }, y: { duration: 0.9, ease }, opacity: { duration: 0.25 }, scale: { duration: 0.12 } }}
          >
            <AnimatePresence>
              {cursor.down && (
                <motion.span
                  key="ripple"
                  className="absolute rounded-full bg-black/15"
                  style={{ left: -14, top: -16, width: 36, height: 36 }}
                  initial={{ scale: 0.2, opacity: 0.8 }}
                  animate={{ scale: 1.4, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </AnimatePresence>
            <svg width="26" height="30" viewBox="0 0 26 30" fill="none">
              <path d="M2 2l20 11.5-9 2.2-4.3 8.6L2 2z" fill="#111" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

function AiIcon({ size = 22, color = C.blue }: { size?: number; color?: string }) {
  return (
    <span className="relative inline-flex items-center justify-center rounded-full shrink-0" style={{ width: size, height: size, border: `2px solid ${color}` }}>
      <Sparkles size={size * 0.55} color={color} strokeWidth={2.4} />
    </span>
  );
}

function Toolbar() {
  const icons = [Bold, Italic, Underline, List, ListOrdered, Link2];
  return (
    <div className="flex items-center gap-[22px] px-4 bg-white border-b" style={{ height: 32, borderColor: C.line }}>
      {icons.map((Icon, i) => <Icon key={i} size={18} color={C.ink} strokeWidth={2.4} />)}
    </div>
  );
}

export function Stage({ fields, activeField, pressed, showLogo = true }: { fields: Record<FieldKey, string>; activeField: FieldKey | null; pressed: 'ai' | 'apply' | null; showLogo?: boolean }) {
  const railIcons = [
    { Icon: Home, y: 141 }, { Icon: UserCheck, y: 279, badge: true }, { Icon: TrendingUp, y: 349 },
    { Icon: ClipboardList, y: 417 }, { Icon: MessageSquare, y: 486, active: true }, { Icon: Repeat, y: 626 },
    { Icon: ThumbsUp, y: 694 }, { Icon: MessagesSquare, y: 762 }, { Icon: ListChecks, y: 830 },
  ];

  return (
    <div className="absolute inset-0 font-sans" style={{ background: C.page, color: C.ink }}>
      {/* Menu lateral */}
      <div className="absolute left-0 top-0 bottom-0 bg-white" style={{ width: 92 }}>
        {showLogo && <span className="absolute font-black text-[30px] leading-none" style={{ left: 33, top: 22, color: C.ink }}>G</span>}
        {railIcons.map(({ Icon, y, badge, active }, i) => (
          <span key={i} className="absolute flex items-center justify-center rounded-full" style={{ left: 24, top: y - 22, width: 44, height: 44, background: active ? '#D5F3EE' : 'transparent' }}>
            <Icon size={22} color={C.ink} strokeWidth={2.2} />
            {badge && <span className="absolute text-[10px] font-bold text-white rounded-full flex items-center justify-center" style={{ right: 0, top: 0, width: 18, height: 18, background: C.ink }}>12</span>}
          </span>
        ))}
      </div>

      {/* Barra do topo */}
      <div className="absolute top-0 right-0 bg-white flex items-center justify-end gap-7 pr-8" style={{ left: 92, height: 72 }}>
        <Bell size={21} strokeWidth={2.2} />
        <Settings size={21} strokeWidth={2.2} />
        <span className="rounded-full" style={{ width: 40, height: 40, background: 'linear-gradient(135deg,#7A3B2E,#C9826B)' }} />
      </div>

      {/* Coluna da devolutiva */}
      <div className="absolute" style={{ left: 124, top: 104, width: 585 }}>
        <div className="flex items-center gap-4">
          <span className="flex items-center justify-center rounded-full" style={{ width: 44, height: 44, border: `2px solid ${C.teal}` }}>
            <ArrowLeft size={20} color={C.teal} />
          </span>
          <span className="text-[34px] font-medium tracking-tight">Marina costa</span>
        </div>
        <p className="text-[20px] font-semibold mt-11">Conclusão da devolutiva</p>
        <p className="text-[14.5px] mt-4 leading-[1.4]" style={{ color: C.sub }}>
          Utilize o relatório individual para concluir, destacar pontos fortes e sugerir melhorias para a pessoa liderada.
        </p>
        <div className="flex items-center gap-2 mt-5 px-3 rounded-md text-[12px] font-medium" style={{ height: 32, background: '#E5E7EB' }}>
          <Info size={14} fill={C.ink} color="#E5E7EB" /> As conclusões serão anexadas ao relatório da pessoa liderada.
        </div>
      </div>

      {/* Card do formulário */}
      <div className="absolute bg-white rounded-[20px]" style={{ left: 124, top: 360, width: 585, height: 1144 }}>
        <div className="absolute" style={{ left: 24, top: 24, right: 24 }}>
          <div className="flex items-center gap-2">
            <span className="text-[17px] font-medium">Devolutiva com Gupy IA</span>
            <span className="ml-3 flex items-center gap-1 text-[13px] font-semibold text-white rounded-md px-2" style={{ height: 24, background: C.blue }}>
              <Sparkles size={12} /> Beta
            </span>
          </div>
          <p className="text-[14.5px] leading-[1.4] mt-4" style={{ color: C.sub }}>
            Utilize nossa inteligência artificial para analisar as informações do relatório da pessoa liderada e ajudar a escreve sua devolutiva.
          </p>
          <p className="text-[14.5px] leading-[1.4] mt-5" style={{ color: C.sub }}>
            Lembre-se de revisar a conclusão fornecida pela IA, pois ao enviá-la, você concorda e se responsabiliza pelo conteúdo.
          </p>
          <motion.span
            className="mt-4 inline-flex items-center gap-2 text-white text-[14.5px] font-semibold rounded-full px-4"
            style={{ height: 32, background: C.blue, boxShadow: '0 4px 10px rgb(26 102 219 / .3)' }}
            animate={{ scale: pressed === 'ai' ? 0.94 : 1 }}
            transition={{ duration: 0.12 }}
          >
            Visualizar conclusão da IA
          </motion.span>
          <div className="mt-9 border-t" style={{ borderColor: C.line }} />
        </div>

        {FIELDS.map(f => {
          const value = fields[f.key];
          const active = activeField === f.key;
          return (
            <div key={f.key} className="absolute" style={{ left: 24, right: 24, top: f.top - 360 }}>
              <div className="flex justify-between text-[14.5px]">
                <span>{f.label} *</span>
                <span className="text-[13px]" style={{ color: C.sub }}>{value.length}/1000</span>
              </div>
              <div
                className="mt-3 rounded-lg overflow-hidden border transition-[border-color,box-shadow] duration-300"
                style={{ borderColor: active ? C.teal : C.line, boxShadow: active ? `0 0 0 3px rgb(14 130 112 / .15)` : 'none' }}
              >
                <Toolbar />
                <div className="px-4 py-3 text-[15px] leading-[1.5] transition-colors duration-500" style={{ height: 164, background: value ? '#fff' : C.field, color: value ? C.ink : C.muted }}>
                  {value || 'Escreva aqui...'}
                  {active && <span className="inline-block w-[2px] h-[17px] align-[-3px] ml-[1px] animate-pulse" style={{ background: C.teal }} />}
                </div>
              </div>
            </div>
          );
        })}

        <div className="absolute flex items-center gap-10" style={{ right: 24, bottom: 24 }}>
          <span className="text-[16px] font-medium" style={{ color: C.blue }}>Salvar como rascunho</span>
          <span className="flex items-center text-white text-[16px] font-semibold rounded-full px-6" style={{ height: 44, background: C.teal }}>Continuar e revisar</span>
        </div>
      </div>

      {/* Coluna do relatório */}
      <div className="absolute" style={{ left: 741, top: 72, right: 0, bottom: 0, background: C.side }}>
        <span className="absolute flex items-center gap-2 text-[14.5px] font-medium" style={{ left: 35, top: 22, color: C.blue }}>
          <Maximize2 size={14} /> Expandir
        </span>
        <div className="absolute bg-white rounded-t-[20px]" style={{ left: 32, top: 60, right: 32, bottom: 0 }}>
          <div className="absolute" style={{ left: 24, right: 24, top: 26 }}>
            <div className="flex justify-between text-[15px]">
              <span className="font-medium">Relatório individual</span>
              <span>Ciclo: <b>4 TRI 2023</b></span>
            </div>
            <div className="flex items-center gap-4 mt-7">
              <span className="rounded-full" style={{ width: 56, height: 56, background: 'linear-gradient(135deg,#5B3A2E,#B98B74)' }} />
              <div>
                <p className="text-[20px] font-medium">Marina Costa</p>
                <p className="text-[15px] mt-1" style={{ color: C.sub }}>Analista</p>
              </div>
            </div>
            <div className="flex justify-between mt-9 text-[15px]">
              <span className="font-medium text-[16px]">Competências</span>
              <span>10 avaliações</span>
            </div>
            <p className="text-[12px] mt-6" style={{ color: C.sub }}>Avaliações com escala qualitativa</p>
            <div className="mt-4 rounded-xl border" style={{ borderColor: C.line }}>
              {['Juntos somos mais forte', 'Ser referência', 'Ser referência', 'Ser referência', 'Ser referência', 'Ser referência', 'Ser referência', 'Ser referência', 'Ser referência'].map((t, i) => (
                <div key={i} className="flex items-center gap-4 px-4 border-b last:border-b-0" style={{ height: 100, borderColor: C.line }}>
                  <div className="flex-1 min-w-0">
                    <p className="flex items-center gap-2 text-[14px] font-medium">
                      {t} <MessageSquareText size={14} color={C.blue} fill={C.blue} stroke="#fff" /> <span className="text-[12px]">5</span>
                    </p>
                    <p className="text-[12.5px] leading-[1.6] mt-1.5 line-clamp-2" style={{ color: C.sub }}>
                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab.
                    </p>
                  </div>
                  <ChevronDown size={20} />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-7">
              <div>
                <p className="text-[14.5px]">Detalhamento geral</p>
                <span className="block mt-5 rounded-full relative" style={{ width: 180, height: 180, background: 'conic-gradient(#3B8ED8 0 25%, #F0913A 0 50%, #8E9198 0 75%, #A8CC5E 0)' }}>
                  <span className="absolute inset-[50px] rounded-full bg-white flex flex-col items-center justify-center text-[11px]"><b className="text-[20px]">8</b>Respostas</span>
                </span>
              </div>
              <div className="flex gap-4 items-end">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="flex flex-col" style={{ width: 46 }}>
                    {['#A8CC5E', '#3B8ED8', '#F0913A', '#8E9198'].map(c => <span key={c} style={{ height: 46, background: c }} />)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Modal({ loading, text, pressed }: { loading: boolean; text: Record<FieldKey, string>; pressed: boolean; key?: string }) {
  const sections: { key: FieldKey; title: string }[] = [
    { key: 'fortes', title: 'Pontos fortes:' },
    { key: 'melhoria', title: 'Pontos de melhoria:' },
    { key: 'conclusao', title: 'Conclusão geral:' },
  ];
  const done = !loading && text.conclusao.length === TEXT.conclusao.length;

  return (
    <>
      <motion.div className="absolute inset-0 z-30" style={{ background: 'rgb(17 24 39 / .45)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} />
      <motion.div
        className="absolute z-40 bg-white rounded-[22px] overflow-hidden font-sans"
        style={{ left: 203, top: 61, width: 960, height: 672, color: C.ink, boxShadow: '0 30px 60px rgb(0 0 0 / .25)' }}
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between px-6 text-white" style={{ height: 72, background: C.navy }}>
          <span className="text-[20px] font-semibold">Gupy IA</span>
          <X size={24} />
        </div>

        <div className="px-6 pt-6 flex flex-col gap-6">
          <div className="flex gap-4">
            <AiIcon size={24} />
            <p className="flex-1 rounded-2xl px-4 py-4 text-[15.5px] leading-[1.5]" style={{ background: C.page }}>{TEXT.intro}</p>
          </div>

          <div className="flex gap-4">
            <AiIcon size={24} />
            <div className="flex-1 rounded-2xl px-4 py-5 text-[15.5px] leading-[1.55] overflow-hidden" style={{ background: C.page, height: 356 }}>
              {loading ? (
                <div className="flex flex-col gap-3">
                  <span className="flex items-center gap-2 text-[14px]" style={{ color: C.sub }}>
                    {[0, 1, 2].map(i => (
                      <motion.span key={i} className="w-2 h-2 rounded-full" style={{ background: C.blue }} animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
                    ))}
                    <span className="ml-1">Analisando 10 avaliações do relatório individual…</span>
                  </span>
                  {[92, 80, 86, 60, 0, 90, 74, 84].map((w, i) => (
                    w ? <motion.span key={i} className="h-3 rounded-full" style={{ width: `${w}%`, background: '#E2E4E8' }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.08 }} /> : <span key={i} className="h-2" />
                  ))}
                </div>
              ) : (
                sections.map(sec => text[sec.key] && (
                  <p key={sec.key} className="mb-5">
                    <b className="block">{sec.title}</b>
                    {text[sec.key]}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>

        <motion.span
          className="absolute flex items-center text-white text-[16px] font-semibold rounded-full px-6"
          style={{ right: 24, bottom: 24, height: 44, background: C.teal, boxShadow: '0 4px 12px rgb(14 130 112 / .3)' }}
          animate={{ scale: pressed ? 0.94 : 1, opacity: done ? 1 : 0.55 }}
          transition={{ duration: 0.15 }}
        >
          Aplicar na devolutiva
        </motion.span>
      </motion.div>
    </>
  );
}

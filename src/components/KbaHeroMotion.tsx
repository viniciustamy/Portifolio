import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Home, Lock, MoreVertical, Wifi } from 'lucide-react';
import { typeText, wait } from './DevolutivaIaMotion';
import { C, EMAIL, EmailScreen, QUESTIONS, QuestionScreen, StartScreen } from './KbaThumbMotion';

/*
 * Hero do case "Recuperação de senha self-service (KBA)": três telas do fluxo, a do meio na frente.
 * Esquerda: o questionário avança pergunta a pergunta. Meio: o novo e-mail é digitado e o botão
 * habilita. Direita: o toque na caixa do Cloudflare gera o "Sucesso!". Cada uma em loop próprio.
 */

const W = 1100;
const H = 560;
const PHONE_W = 375;
const SIDE_SCALE = 0.9;

const ease = [0.65, 0, 0.35, 1] as const;

type Tap = { x: number; y: number; id: number } | null;
type Token = { cancelled: boolean };

// Centro de um elemento em coordenadas do celular (desfaz a escala do palco e do próprio celular)
function phonePoint(phone: HTMLElement | null, el: Element | null | undefined) {
  if (!phone || !el) return { x: PHONE_W / 2, y: 400 };
  const p = phone.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  const k = p.width / PHONE_W;
  return { x: (r.left + r.width / 2 - p.left) / k, y: (r.top + r.height / 2 - p.top) / k };
}

function Phone({ phoneRef, tap, onTapDone, screenKey, children }: { phoneRef: any; tap: Tap; onTapDone: () => void; screenKey: string; children: any }) {
  return (
    <div ref={phoneRef} className="relative bg-white overflow-hidden rounded-t-[16px] font-sans" style={{ width: PHONE_W, height: H + 40, color: C.ink, boxShadow: '0 24px 60px rgb(36 21 16 / .16), 0 0 0 1px rgb(36 21 16 / .06)' }}>
      {/* Barra de status + navegador */}
      <div style={{ background: C.chrome }} className="text-white">
        <div className="flex justify-end items-center gap-1.5 px-5 text-[12px]" style={{ height: 26 }}>
          <Wifi size={13} /> <span className="w-3 h-3" style={{ background: 'linear-gradient(45deg, transparent 50%, #fff 50%)' }} /> 12:30
        </div>
        <div className="flex items-center gap-3 px-3" style={{ height: 48 }}>
          <Home size={18} />
          <span className="flex-1 flex items-center gap-1.5 rounded-full px-3 text-[11px]" style={{ height: 32, background: 'rgb(255 255 255 / .2)' }}>
            <Lock size={10} /> gupy.io/recuperar-conta
          </span>
          <span className="text-[11px] border rounded px-1">1</span>
          <MoreVertical size={16} />
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={screenKey} data-screen initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25, ease }}>
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Toque */}
      <AnimatePresence>
        {tap && (
          <motion.span
            key={tap.id}
            className="absolute rounded-full pointer-events-none z-20"
            style={{ left: tap.x - 22, top: tap.y - 22, width: 44, height: 44, background: 'rgb(20 20 30 / .28)' }}
            initial={{ scale: 0.4, opacity: 0.9 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.5 }}
            onAnimationComplete={onTapDone}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Toque + botão pressionado, compartilhado pelas três telas
function useTap() {
  const [tap, setTap] = useState<Tap>(null);
  const [pressed, setPressed] = useState(false);
  const id = useRef(0);
  const tapAt = async (pt: { x: number; y: number }, token: Token, press = false) => {
    setTap({ ...pt, id: ++id.current });
    if (press) setPressed(true);
    await wait(160, token);
    setPressed(false);
  };
  return { tap, pressed, tapAt, clearTap: () => setTap(null) };
}

const button = (phone: HTMLElement | null) => phone?.querySelector('[data-screen] .rounded-full[style*="height: 48px"]');

// Esquerda: o questionário passando pergunta a pergunta
function QuestionsPhone({ active }: { active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(1);
  const [selected, setSelected] = useState(false);
  const { tap, pressed, tapAt, clearTap } = useTap();

  useEffect(() => {
    if (!active) return;
    const token = { cancelled: false };
    const run = async () => {
      await wait(400, token);
      for (let i = 0; !token.cancelled; i = (i + 1) % QUESTIONS.length) {
        setSelected(false);
        setIndex(i);
        await wait(1000, token);
        const options = ref.current?.querySelectorAll('[data-screen] .flex-col > span');
        await tapAt(phonePoint(ref.current, options?.[QUESTIONS[i].pick]), token);
        setSelected(true);
        await wait(700, token);
        await tapAt(phonePoint(ref.current, button(ref.current)), token, true);
        await wait(150, token);
      }
    };
    run().catch(() => {});
    return () => { token.cancelled = true; };
  }, [active]);

  return (
    <Phone phoneRef={ref} tap={tap} onTapDone={clearTap} screenKey={`q${index}`}>
      <QuestionScreen index={index} selected={selected} pressed={pressed} />
    </Phone>
  );
}

// Meio: o novo e-mail sendo digitado e o botão habilitando
function EmailPhone({ active }: { active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [emails, setEmails] = useState({ first: '', second: '' });
  const { tap, pressed, tapAt, clearTap } = useTap();

  useEffect(() => {
    if (!active) return;
    const token = { cancelled: false };
    const run = async () => {
      while (!token.cancelled) {
        setEmails({ first: '', second: '' });
        await wait(1000, token);
        await typeText(EMAIL, 1300, s => setEmails(v => ({ ...v, first: s })), token);
        await wait(300, token);
        await typeText(EMAIL, 1300, s => setEmails(v => ({ ...v, second: s })), token);
        await wait(1300, token); // botão já habilitado
        await tapAt(phonePoint(ref.current, button(ref.current)), token, true);
        await wait(1800, token);
      }
    };
    run().catch(() => {});
    return () => { token.cancelled = true; };
  }, [active]);

  return (
    <Phone phoneRef={ref} tap={tap} onTapDone={clearTap} screenKey="email">
      <EmailScreen first={emails.first} second={emails.second} pressed={pressed} />
    </Phone>
  );
}

// Direita: o toque na caixa do Cloudflare gera o "Sucesso!"
function CaptchaPhone({ active }: { active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [captcha, setCaptcha] = useState<'idle' | 'loading' | 'done'>('idle');
  const { tap, tapAt, clearTap } = useTap();

  useEffect(() => {
    if (!active) return;
    const token = { cancelled: false };
    const run = async () => {
      while (!token.cancelled) {
        setCaptcha('idle');
        await wait(1800, token);
        const box = ref.current?.querySelector('[data-captcha] > span');
        await tapAt(phonePoint(ref.current, box), token);
        setCaptcha('loading');
        await wait(1300, token);
        setCaptcha('done');
        await wait(3200, token);
      }
    };
    run().catch(() => {});
    return () => { token.cancelled = true; };
  }, [active]);

  return (
    <Phone phoneRef={ref} tap={tap} onTapDone={clearTap} screenKey="start">
      <StartScreen pressed={false} captcha={captcha} />
    </Phone>
  );
}

export function KbaHeroMotion() {
  const viewRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState(false);

  useLayoutEffect(() => {
    const el = viewRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);

  const on = active && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const sideW = PHONE_W * SIDE_SCALE;

  return (
    <div ref={viewRef} className="not-prose relative w-full select-none overflow-hidden" style={{ aspectRatio: `${W} / ${H}` }} role="img" aria-label="Três telas do fluxo de recuperação: perguntas de verificação, alteração do e-mail e confirmação do Cloudflare">
      {width > 0 && (
        <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${width / W})` }}>
          <div className="absolute origin-top-left" style={{ left: 70, top: 60, transform: `scale(${SIDE_SCALE})` }}>
            <QuestionsPhone active={on} />
          </div>
          <div className="absolute origin-top-left" style={{ left: W - 70 - sideW, top: 60, transform: `scale(${SIDE_SCALE})` }}>
            <CaptchaPhone active={on} />
          </div>
          <div className="absolute z-10" style={{ left: (W - PHONE_W) / 2, top: 0 }}>
            <EmailPhone active={on} />
          </div>
          {/* As telas se dissolvem no fundo da página embaixo */}
          <span className="absolute left-0 right-0 -bottom-1 z-20 pointer-events-none" style={{ height: 194, background: 'linear-gradient(to bottom, rgb(255 255 255 / 0), #fff 70%)' }} />
        </div>
      )}
    </div>
  );
}

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronRight, CircleCheck, Headphones, Home, Info, Lock, MoreVertical, TriangleAlert, Wifi } from 'lucide-react';
import { typeText, wait } from './DevolutivaIaMotion';
import { IPhoneFrame } from './IPhoneFrame';

/*
 * Thumb animada do case "Recuperação de senha self-service (KBA)": o fluxo recriado num celular
 * sobre o fundo azul do card. Parada, mostra a tela "Recuperação de conta". Em foco: toque em
 * "Iniciar verificação" → as 4 perguntas passam rápido → "Alterar e-mail" é preenchido →
 * tela de sucesso, e recomeça. Toques aparecem como um círculo (não há cursor no celular).
 */

const STAGE_W = 700;
const PHONE_W = 375;
const PHONE_TOP = 20; // espaço para a moldura do iPhone não ser cortada em cima

// Confetes da tela de sucesso: tons de azul que sobem de trás da parte de baixo do celular
const CONFETTI_COLORS = ['#CFE1FF', '#9EC3FF', '#6FA6FF', '#3D86FF', '#0B4FC9', '#0A3DB0'];
const CONFETTI = Array.from({ length: 48 }, (_, i) => {
  const side = i % 2 === 0 ? -1 : 1;
  return {
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    startX: side * ((i * 23) % 170), // começa escondido atrás do celular
    drift: side * (90 + ((i * 41) % 200)), // abre para os lados enquanto sobe
    rise: 0.55 + ((i * 17) % 40) / 100, // fração da altura que sobe
    rotate: ((i * 71) % 360) * side,
    delay: (i % 10) * 0.06,
    w: i % 3 === 0 ? 12 : 16,
    h: i % 3 === 0 ? 12 : 8,
    round: i % 4 === 0,
  };
});

export const C = {
  ink: '#1F2328',
  sub: '#4B5058',
  muted: '#8A8F98',
  line: '#8A8F98',
  blue: '#0A3DFF',
  chrome: '#1F72F2',
  navy: '#232B55',
  disabled: '#D9DADD',
};

export const QUESTIONS = [
  { q: 'Qual desses endereços você já residiu?', options: ['Rua das Flores', 'Av. Paulista', 'Rua Augusta', 'Rua XV de Novembro'], pick: 1 },
  { q: 'Quais são os últimos 4 dígitos do seu CPF?', options: ['1234', '6587', '9834', '3490'], pick: 2 },
  { q: 'Qual é o número do seu endereço cadastrado?', options: ['123', '1000', '456', '789'], pick: 0 },
  { q: 'Qual seu dia de nascimento cadastrado?', options: ['23', '13', '09', '16'], pick: 0 },
];

export const EMAIL = 'candidato@gmail.com';

type Screen = 'start' | 'q0' | 'q1' | 'q2' | 'q3' | 'email' | 'success';
type Tap = { x: number; y: number; id: number } | null;

const ease = [0.65, 0, 0.35, 1] as const;

function PrimaryButton({ children, color = C.blue, enabled = true, pressed = false }: { children: any; color?: string; enabled?: boolean; pressed?: boolean }) {
  return (
    <motion.span
      className="flex items-center justify-center gap-2 rounded-full text-[16px] font-medium"
      style={{ height: 48, background: enabled ? color : C.disabled, color: enabled ? '#fff' : C.muted, boxShadow: enabled ? '0 4px 10px rgb(10 61 255 / .25)' : 'none' }}
      animate={{ scale: pressed ? 0.96 : 1 }}
      transition={{ duration: 0.12 }}
    >
      {children}
    </motion.span>
  );
}

// captcha: estado da caixa do Cloudflare (a thumb já mostra concluído)
export function StartScreen({ pressed, captcha = 'done' }: { pressed: boolean; captcha?: 'idle' | 'loading' | 'done' }) {
  return (
    <div className="px-6 pt-7">
      <p className="text-[24px] font-semibold leading-tight">Recuperação de conta</p>
      <p className="text-[15px] leading-[1.45] mt-2">Para sua segurança, precisamos verificar sua identidade. Responda 4 perguntas sobre seus dados cadastrados.</p>
      <div className="mt-6 rounded-xl border-2 px-3.5 py-3 flex gap-2.5 text-[13.5px] leading-[1.4]" style={{ borderColor: '#C9A15A', background: '#FBF1CF', color: '#8A5A12' }}>
        <TriangleAlert size={18} className="shrink-0 mt-0.5" fill="#8A5A12" color="#FBF1CF" />
        <span><b>Atenção:</b> Se não conseguir responder corretamente, você precisará <b>aguardar 5 minutos</b> para tentar novamente.</span>
      </div>
      <div className="mt-6 flex items-center justify-between border px-4 py-4" style={{ borderColor: '#D9DADD', background: '#FAFAFA' }}>
        <span data-captcha className="flex items-center gap-3 text-[14px]">
          {captcha === 'done' && <motion.span initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}><CircleCheck size={26} fill="#1F9D3A" color="#fff" /></motion.span>}
          {captcha === 'loading' && <motion.span className="block rounded-full border-[3px]" style={{ width: 26, height: 26, borderColor: '#D9DADD', borderTopColor: '#F38020' }} animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />}
          {captcha === 'idle' && <span className="block rounded-[4px] border-2 bg-white" style={{ width: 26, height: 26, borderColor: '#8A8F98' }} />}
          {captcha === 'done' ? 'Sucesso!' : captcha === 'loading' ? 'Verificando...' : 'Confirme que você é humano'}
        </span>
        <span className="text-right leading-none">
          <span className="block text-[11px] font-black tracking-wide" style={{ color: '#F38020' }}>CLOUDFLARE</span>
          <span className="text-[8.5px]" style={{ color: C.sub }}>Privacy • Terms</span>
        </span>
      </div>
      <div className="mt-8">
        <PrimaryButton color={C.navy} pressed={pressed}>Iniciar verificação <ChevronRight size={18} /></PrimaryButton>
      </div>
      <p className="text-center text-[12px] mt-6" style={{ color: C.sub }}>Powered by Gupy</p>
    </div>
  );
}

export function QuestionScreen({ index, selected, pressed }: { index: number; selected: boolean; pressed: boolean }) {
  const q = QUESTIONS[index];
  const last = index === QUESTIONS.length - 1;
  return (
    <div className="px-6 pt-7">
      <p className="text-[24px] font-semibold leading-tight">Verificação de identidade</p>
      <div className="mt-7 h-2 rounded-full overflow-hidden" style={{ background: '#E1E3E6' }}>
        <motion.div className="h-full rounded-full" style={{ background: C.blue }} initial={{ width: `${(index / 4) * 100}%` }} animate={{ width: `${((index + 1) / 4) * 100}%` }} transition={{ duration: 0.45, ease }} />
      </div>
      <p className="text-[14px] mt-7" style={{ color: C.sub }}>Pergunta {index + 1} de 4</p>
      <p className="text-[19px] font-semibold leading-snug mt-1.5">{q.q}</p>
      <div className="mt-6 flex flex-col gap-[26px]">
        {q.options.map((o, i) => {
          const on = selected && i === q.pick;
          return (
            <span key={o} className="flex items-center gap-3 text-[15px] px-2.5" style={{ color: C.sub }}>
              <span className="relative flex items-center justify-center rounded-full border-2 transition-colors duration-200" style={{ width: 20, height: 20, borderColor: on ? C.blue : '#6B7078' }}>
                {on && <motion.span className="w-2.5 h-2.5 rounded-full" style={{ background: C.blue }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.18 }} />}
              </span>
              {o}
            </span>
          );
        })}
      </div>
      <div className="mt-8">
        <PrimaryButton enabled={selected} pressed={pressed}>{last ? 'Finalizar' : 'Próxima pergunta'} <ChevronRight size={18} /></PrimaryButton>
      </div>
    </div>
  );
}

export function EmailScreen({ first, second, pressed }: { first: string; second: string; pressed: boolean }) {
  const field = (label: string, value: string, active: boolean) => (
    <div className="mt-6">
      <p className="text-[14px]" style={{ color: C.sub }}>{label}</p>
      <div className="mt-2 rounded-lg border px-3 flex items-center text-[16px]" style={{ height: 44, borderColor: active ? C.blue : C.line, boxShadow: active ? '0 0 0 3px rgb(10 61 255 / .12)' : 'none' }}>
        {value}
        {active && <span className="inline-block w-[2px] h-[18px] ml-[1px] animate-pulse" style={{ background: C.blue }} />}
      </div>
    </div>
  );
  const typingFirst = first.length < EMAIL.length;
  return (
    <div className="px-6 pt-7">
      <p className="text-[24px] font-semibold leading-tight">Alterar e-mail</p>
      <p className="text-[15px] leading-[1.45] mt-2">Informe um novo e-mail de acesso para sua conta.</p>
      {field('Novo e-mail', first, typingFirst)}
      {field('Confirmar novo e-mail', second, !typingFirst && second.length < EMAIL.length)}
      <div className="mt-8">
        <PrimaryButton enabled={second.length === EMAIL.length} pressed={pressed}>Confirmar alteração</PrimaryButton>
      </div>
    </div>
  );
}

function SuccessScreen() {
  return (
    <div className="px-6 pt-7">
      <motion.span className="inline-block" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}>
        <CircleCheck size={52} fill="#2E7D32" color="#fff" strokeWidth={1.6} />
      </motion.span>
      <p className="text-[24px] font-semibold leading-tight mt-3">Link de recuperação enviado com sucesso!</p>
      <p className="text-[15px] leading-[1.45] mt-5" style={{ color: C.sub }}>
        <b style={{ color: C.ink }}>Verifique a caixa de entrada</b> ou de spam do e-mail <b style={{ color: C.ink }}>{EMAIL}</b> e clique no link recebido para entrar na sua conta.
      </p>
      <div className="mt-5 rounded-xl border-2 px-3.5 py-3 flex gap-2.5 text-[13.5px] leading-[1.4]" style={{ borderColor: '#6FA8DC', background: '#E3F0FB', color: '#1A5FA0' }}>
        <Info size={18} className="shrink-0 mt-0.5" fill="#1A5FA0" color="#E3F0FB" />
        <span>O e-mail pode levar alguns minutos para ser recebido. Aguarde antes de solicitar um novo link.</span>
      </div>
      <p className="text-center text-[15.5px] font-medium mt-7" style={{ color: C.blue }}>Reenviar link de recuperação</p>
      <div className="border-t my-7" style={{ borderColor: '#E1E3E6' }} />
      <p className="text-center text-[14.5px] leading-[1.45]" style={{ color: C.sub }}>Caso ainda não tenha conseguido recuperar a sua conta, entre em contato.</p>
      <p className="flex items-center justify-center gap-2 text-[15.5px] mt-4"><Headphones size={18} /> Falar com o suporte</p>
    </div>
  );
}

export function KbaThumbMotion({ active }: { active: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState({ w: 0, h: 0 });
  const [screen, setScreen] = useState<Screen>('start');
  const [selected, setSelected] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [emails, setEmails] = useState({ first: '', second: '' });
  const [tap, setTap] = useState<Tap>(null);

  const scale = size.w / STAGE_W;
  const stageH = scale ? size.h / scale : 0;
  const phoneLeft = (STAGE_W - PHONE_W) / 2;

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setSize({ w: entry.contentRect.width, h: entry.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const reset = () => {
      setScreen('start');
      setSelected(false);
      setPressed(false);
      setEmails({ first: '', second: '' });
      setTap(null);
    };

    if (!active || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      reset();
      return;
    }

    const token = { cancelled: false };
    let tapId = 0;

    // Toque num ponto da tela do celular (coordenadas do celular)
    const tapAt = async (x: number, y: number) => {
      setTap({ x, y, id: ++tapId });
      setPressed(true);
      await wait(160, token);
      setPressed(false);
    };

    // O botão principal fica a ~ (centro, y) em cada tela; mede no DOM para acertar o toque
    const buttonY = () => {
      const phone = phoneRef.current;
      const btn = phone?.querySelector<HTMLElement>('[data-screen] .rounded-full[style*="height: 48px"]');
      if (!phone || !btn) return 560;
      const k = phone.getBoundingClientRect().width / PHONE_W;
      return (btn.getBoundingClientRect().top + btn.getBoundingClientRect().height / 2 - phone.getBoundingClientRect().top) / k;
    };

    const run = async () => {
      while (!token.cancelled) {
        reset();
        await wait(1100, token);

        // 1. Iniciar verificação
        await tapAt(PHONE_W / 2, buttonY());
        await wait(150, token);

        // 2. Questionário rápido
        for (let i = 0; i < QUESTIONS.length; i++) {
          setSelected(false);
          setScreen(`q${i}` as Screen);
          await wait(650, token);
          setSelected(true);
          await wait(450, token);
          await tapAt(PHONE_W / 2, buttonY());
          await wait(120, token);
        }

        // 3. Alterar e-mail
        setScreen('email');
        await wait(600, token);
        await typeText(EMAIL, 1000, s => setEmails(v => ({ ...v, first: s })), token);
        await wait(200, token);
        await typeText(EMAIL, 1000, s => setEmails(v => ({ ...v, second: s })), token);
        await wait(400, token);
        await tapAt(PHONE_W / 2, buttonY());
        await wait(150, token);

        // 4. Sucesso
        setScreen('success');
        await wait(3400, token);
      }
    };

    run().catch(() => {});
    return () => { token.cancelled = true; };
  }, [active]);

  const content = (() => {
    if (screen === 'start') return <StartScreen pressed={pressed} />;
    if (screen === 'email') return <EmailScreen first={emails.first} second={emails.second} pressed={pressed} />;
    if (screen === 'success') return <SuccessScreen />;
    return <QuestionScreen index={Number(screen[1])} selected={selected} pressed={pressed} />;
  })();

  return (
    // Sem overflow-hidden: os confetes podem passar das bordas da coluna; o próprio card recorta o resto
    <div ref={wrapRef} className="absolute inset-0 select-none" aria-hidden="true">
      {scale > 0 && (
        <div className="absolute left-0 top-0 origin-top-left font-sans" style={{ width: STAGE_W, height: stageH, transform: `scale(${scale})`, color: C.ink }}>
          {/* Confetes atrás do celular quando chega na tela de sucesso */}
          <AnimatePresence>
            {screen === 'success' && (
              <motion.div key="confetti" className="absolute pointer-events-none" style={{ left: STAGE_W / 2, top: stageH + 20 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                {CONFETTI.map((p, i) => (
                  <motion.span
                    key={i}
                    className="absolute block"
                    style={{ width: p.w, height: p.h, background: p.color, borderRadius: p.round ? 999 : 1.5, left: p.startX - p.w / 2, top: -p.h / 2 }}
                    initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                    animate={{ x: [0, p.drift * 0.7, p.drift], y: [0, -stageH * p.rise, -stageH * p.rise + 60], rotate: p.rotate * 3, opacity: [1, 1, 0] }}
                    transition={{ duration: 2.6, delay: 0.1 + p.delay, ease: 'easeOut', times: [0, 0.6, 1] }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Celular na moldura real do iPhone 17 — sai pela borda de baixo */}
          <IPhoneFrame ref={phoneRef} left={phoneLeft} top={PHONE_TOP} width={PHONE_W}>
            {/* Barra de status do iPhone (em volta da Dynamic Island da moldura) + navegador */}
            <div style={{ background: C.chrome }} className="text-white">
              <div className="relative" style={{ height: 54 }}>
                <span className="absolute text-[16px] font-semibold" style={{ left: 50, top: 18 }}>9:41</span>
                <span className="absolute flex items-center gap-1.5" style={{ right: 30, top: 20 }}>
                  <Wifi size={15} strokeWidth={2.6} />
                  <span className="relative block rounded-[4px]" style={{ width: 25, height: 12, border: '1px solid rgb(255 255 255 / .45)' }}>
                    <span className="absolute rounded-[2px] bg-white" style={{ left: 1.5, top: 1.5, bottom: 1.5, width: 17 }} />
                  </span>
                </span>
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
              <motion.div
                key={screen}
                data-screen
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.22, ease }}
              >
                {content}
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
                  onAnimationComplete={() => setTap(t => (t && t.id === tap.id ? null : t))}
                />
              )}
            </AnimatePresence>
          </IPhoneFrame>
        </div>
      )}
    </div>
  );
}

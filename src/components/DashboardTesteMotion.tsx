import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { CalendarDays, Lightbulb, Quote } from 'lucide-react';
import { wait } from './DevolutivaIaMotion';
import logoPetz from '../assets/images/Admin/petz.png';
import logoAjinomoto from '../assets/images/Admin/ajinomoto.png';
import logoSoma from '../assets/images/Admin/soma.png';

/*
 * Motion da seção "Priorizando os aprendizados do teste em frentes de valor" (Dashboard de Admissão): a One Page dos
 * aprendizados do teste ("O Centro de Comando") e, por cima dela, as falas dos clientes entrando uma a
 * uma. Toca uma vez ao entrar na tela e fica parado, para dar para ler. A base da página some no branco.
 */

const W = 1600;
const H = 860;
const PAGE_X = 260;
const PAGE_W = 970;

const ease = [0.16, 1, 0.3, 1] as const;

const C = { ink: '#1F2937', sub: '#5B6472', muted: '#9AA1AC', line: '#E5E7EB', blue: '#1D4ED8', navy: '#3D5A80' };

const QUOTES = [
  { client: 'Petz', logo: logoPetz, text: '“Envolve a cópia manual de dados das etapas de admissão para planilhas Excel.”', x: 20, y: 170, w: 380 },
  { client: 'Ajinomoto', logo: logoAjinomoto, text: '“Eu aposentaria aquele dash [se tivesse filtro para a data de admissão]. Eu tenho pavor de controle paralelo.”', x: 1180, y: 110, w: 400 },
  { client: 'Grupo Soma', logo: logoSoma, text: '“Meu time precisa começar o dia sabendo exatamente quem está há 3 dias parado para cobrar pelo WhatsApp. A média do tempo para mim é irrelevante… isso gera a minha ação diária.”', x: 1040, y: 540, w: 540 },
];

// Barras do cronograma por lotes (mock à direita)
const LOTS = [
  { x: 18, w: 140, c: '#3B82F6' },
  { x: 94, w: 100, c: '#14B8A6' },
  { x: 146, w: 128, c: '#93C5FD' },
  { x: 232, w: 92, c: '#2DD4BF' },
];

function QuoteCard({ q, show }: { q: typeof QUOTES[number]; show: boolean; key?: string }) {
  return (
    <motion.div
      className="absolute rounded-[16px] px-7 pt-6 pb-6 font-sans"
      style={{ left: q.x, top: q.y, width: q.w, background: '#F6F1EC', border: '1.5px solid #E2DCD4', boxShadow: '0 18px 40px rgb(36 21 16 / .12)' }}
      initial={false}
      animate={show ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.94, y: 14 }}
      transition={{ duration: 0.55, ease }}
    >
      <Quote size={22} className="absolute right-5 top-5" color="#B5A99F" strokeWidth={1.6} />
      <p className="text-[21px] italic leading-[1.5] pr-8" style={{ color: '#241510' }}>{q.text}</p>
      <div className="flex items-center gap-3 mt-6">
        <span className="flex items-center justify-center w-11 h-11 rounded-full bg-white overflow-hidden" style={{ boxShadow: '0 0 0 1px rgb(15 23 42 / .08)' }}>
          <img src={q.logo} alt="" className="w-7 h-auto object-contain" />
        </span>
        <span className="text-[17px] font-semibold" style={{ color: '#6F625B' }}>{q.client}</span>
      </div>
    </motion.div>
  );
}

export function DashboardTesteMotion() {
  const viewRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [inView, setInView] = useState(false); // vira true na primeira vez que aparece e não volta
  const [shown, setShown] = useState(0); // quantos balões estão na tela

  useLayoutEffect(() => {
    const el = viewRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { setShown(QUOTES.length); return; }
    if (!inView) return;
    const token = { cancelled: false };
    // Uma vez só: as falas entram uma a uma e ficam
    const run = async () => {
      await wait(900, token);
      for (let i = 1; i <= QUOTES.length; i++) {
        setShown(i);
        await wait(1300, token);
      }
    };
    run().catch(() => {});
    return () => { token.cancelled = true; };
  }, [inView]);

  const s = width / W;

  return (
    <div ref={viewRef} className="not-prose relative w-full select-none" style={{ aspectRatio: `${W} / ${H}` }} role="img" aria-label="Página-síntese do teste de usabilidade, O Centro de Comando, com falas de clientes da Petz, Ajinomoto e Grupo Soma">
      {width > 0 && (
        <div className="absolute left-0 top-0 origin-top-left font-sans" style={{ width: W, height: H, transform: `scale(${s})`, color: C.ink }}>
          {/* Página-síntese */}
          <motion.div
            className="absolute bg-white overflow-hidden rounded-t-[10px]"
            style={{ left: PAGE_X, top: 0, width: PAGE_W, height: H, boxShadow: '0 0 0 1px #EEF0F3' }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="text-center pt-10 pb-9" style={{ background: '#F4F5F7' }}>
              <p className="text-[34px] font-extrabold tracking-tight">O Centro de Comando</p>
              <p className="text-[21px] font-bold mt-1" style={{ color: C.navy }}>Entendendo a análise de dados na admissão</p>
              <p className="text-[9.5px] mt-3" style={{ color: C.sub }}>Síntese do teste de usabilidade com direcionamentos estratégicos de produto para o H2 2026.</p>
            </div>

            <div className="px-[112px] pt-7 text-center">
              <p className="text-[27px] font-bold">Aprendizados</p>
              <p className="text-[13.5px] leading-[1.75] mt-3" style={{ color: '#4B5563' }}>
                Ao aplicar este teste contextual com grandes contas, identificamos as principais percepções operacionais sobre as dores reais do utilizador da ferramenta de admissão. As quatro percepções estruturais detalhadas a seguir — <b style={{ color: C.ink }}>Pilar 1 (A Gestão por Lotes e Janelas)</b>, <b style={{ color: C.ink }}>Pilar 2 (O Candidato Parado)</b>, <b style={{ color: C.ink }}>O Peso do Trabalho Manual</b> e o <b style={{ color: C.ink }}>Gargalo do ASO</b> — representam os aprendizados fundamentais identificados.
              </p>
            </div>

            <div className="px-8 pt-10">
              <p className="flex items-center gap-3 text-[20px] font-bold"><Lightbulb size={22} color="#3B82F6" /> Gestão por lotes e janelas</p>
              <div className="grid grid-cols-[1fr_440px] gap-7 mt-6">
                <div>
                  <p className="flex items-center gap-3 text-[13.5px] font-semibold">
                    <span className="rounded-md px-2.5 py-1 text-white text-[12px] font-bold" style={{ background: '#1D4ED8' }}>6 de 6 Clientes</span>
                    Validaram essa dor como inegociável.
                  </p>
                  <p className="text-[13.5px] leading-[1.75] mt-5" style={{ color: '#4B5563' }}>
                    <b style={{ color: C.ink }}>100% da base amostral</b> organiza suas admissões em lotes temporais. Sem um filtro pela <b style={{ color: C.ink }}>data prevista de admissão</b>, o dashboard perde completamente a utilidade tática.
                  </p>
                  <div className="mt-6 rounded-xl border px-5 py-5" style={{ borderColor: C.line }}>
                    <p className="flex items-center gap-2 text-[17px] font-semibold" style={{ color: C.navy }}><CalendarDays size={16} /> A Única Visão que Importa</p>
                    <p className="text-[13px] leading-[1.8] mt-3" style={{ color: C.muted }}>
                      O filtro atual de <b>Últimos 90 dias é inútil</b> para a operação. O painel inteiro precisa reagir a um comando central: <b>Mostre-me a saúde apenas do lote que entra no dia 01/06.</b> Se o painel não entende lotes, o usuário volta para o Excel.
                    </p>
                  </div>
                </div>

                {/* Mock do cronograma por lotes */}
                <div className="rounded-xl p-6" style={{ background: '#F1F3F6' }}>
                  <div className="bg-white rounded-lg p-4" style={{ height: 270, boxShadow: '0 1px 2px rgb(15 23 42 / .06)' }}>
                    <div className="flex items-center gap-3 pb-3 border-b" style={{ borderColor: C.line }}>
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#60A5FA' }} />
                      {[52, 36, 28, 28].map((w, i) => <span key={i} className="h-1.5 rounded-full" style={{ width: w, background: i === 1 ? '#93C5FD' : '#E5E7EB' }} />)}
                    </div>
                    <div className="relative mt-6" style={{ height: 150 }}>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => <span key={i} className="absolute top-0 bottom-0 w-px" style={{ left: 18 + i * 38, background: '#F1F3F6' }} />)}
                      {LOTS.map((l, i) => (
                        <motion.span
                          key={i}
                          className="absolute flex items-center gap-1.5 px-2 rounded-md"
                          style={{ left: l.x, top: 8 + i * 34, width: l.w, height: 24, background: '#fff', boxShadow: `0 0 0 1.5px ${l.c}`, transformOrigin: 'left' }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: inView ? 1 : 0 }}
                          transition={{ duration: 0.7, delay: 0.6 + i * 0.2, ease }}
                        >
                          <span className="h-[14px] w-8 rounded-sm" style={{ background: l.c }} />
                          <span className="h-1 flex-1 rounded-full" style={{ background: '#E5E7EB' }} />
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Próximos blocos de falas, que se perdem no fade */}
              <div className="grid grid-cols-3 gap-4 mt-12">
                {['“Eu aposentaria aquele dash [se tivesse filtro…', '“Como é que eu filtro aqui data de admissão…', '“Eu quero fazer um filtro para validar…'].map(t => (
                  <div key={t} className="rounded-xl border px-4 py-4 text-[12px] italic" style={{ borderColor: C.line, color: C.muted }}>{t}</div>
                ))}
              </div>
            </div>

            {/* A parte de baixo da página se dissolve no branco */}
            <span className="absolute left-0 right-0 bottom-0 pointer-events-none" style={{ height: 230, background: 'linear-gradient(to bottom, rgb(255 255 255 / 0), #fff 75%)' }} />
          </motion.div>

          {/* Falas dos clientes por cima da página */}
          {QUOTES.map((q, i) => <QuoteCard key={q.client} q={q} show={shown > i} />)}
        </div>
      )}
    </div>
  );
}

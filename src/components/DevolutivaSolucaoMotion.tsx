import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion } from 'motion/react';
import {
  ArrowLeft, Bell, ChevronDown, ChevronRight, CircleCheck, ClipboardList, Clock, Download, Eye, Home, Info,
  ListChecks, MessageSquare, MessageSquareText, MessagesSquare, Pencil, Repeat, Search, Settings, ThumbsUp,
  Trash2, TrendingUp, User, UserCheck, Users,
} from 'lucide-react';
import { C, FIELDS, FieldKey, Stage as FormStage, TEXT, emptyFields, typeText, wait } from './DevolutivaIaMotion';

/*
 * Motion da "Solução final" do case da Devolutiva: apresenta as três jornadas da entrega.
 * Título "Mais controle para o RH" → tela do plano (big numbers contando, barras dos líderes enchendo
 * e dois destaques) → título do gestor → lista de liderados, clique em "Responder" e a IA preenche a
 * devolutiva → título do colaborador → "Minhas devolutivas", clique e relatório carregando e rolando.
 * Roda em loop enquanto está visível na tela.
 */

const W = 1366;
const H = 800;
const TEAL_BG = '#0E5F55';

const ease = [0.65, 0, 0.35, 1] as const;
const grow = [0.16, 1, 0.3, 1] as const;

const STATUS = { pending: '#9A6A0B', waiting: '#2F7FC1', sent: '#2E8B2E' };

type Scene = 'title-rh' | 'rh' | 'title-gestor' | 'gestor' | 'form' | 'title-colab' | 'colab' | 'report';

const TITLES: Partial<Record<Scene, { kicker: string; text: string }>> = {
  'title-rh': { kicker: 'RH', text: 'Mais controle para o RH' },
  'title-gestor': { kicker: 'Gestor', text: 'Ajuda e padronização para o gestor' },
  'title-colab': { kicker: 'Colaborador', text: 'Garantia de relatório para o colaborador' },
};

function Counter({ to, play, delay = 0 }: { to: number; play: boolean; delay?: number }) {
  const [v, setV] = useState(play ? 0 : to);
  useEffect(() => {
    if (!play) { setV(to); return; }
    setV(0);
    const c = animate(0, to, { duration: 1.2, delay, ease: grow, onUpdate: setV });
    return () => c.stop();
  }, [play, to, delay]);
  return <>{Math.round(v)}</>;
}

// Moldura do produto: menu lateral + barra do topo
function AppFrame({ children }: { children: any }) {
  const rail = [Home, UserCheck, TrendingUp, ClipboardList, MessageSquare, Repeat, ThumbsUp, MessagesSquare, ListChecks];
  return (
    <div className="absolute inset-0 font-sans" style={{ background: C.page, color: C.ink }}>
      <div className="absolute left-0 top-0 bottom-0 bg-white z-10" style={{ width: 92 }}>
        {rail.map((Icon, i) => (
          <span key={i} className="absolute flex items-center justify-center rounded-full" style={{ left: 24, top: [119, 257, 327, 395, 464, 604, 672, 740, 808][i], width: 44, height: 44, background: i === 4 ? '#D5F3EE' : 'transparent' }}>
            <Icon size={22} strokeWidth={2.2} />
          </span>
        ))}
      </div>
      <div className="absolute top-0 right-0 bg-white flex items-center justify-end gap-7 pr-8 z-10" style={{ left: 92, height: 72 }}>
        <Bell size={21} strokeWidth={2.2} />
        <Settings size={21} strokeWidth={2.2} />
        <span className="rounded-full" style={{ width: 40, height: 40, background: 'linear-gradient(135deg,#7A3B2E,#C9826B)' }} />
      </div>
      <div className="absolute overflow-hidden" style={{ left: 92, top: 72, right: 0, bottom: 0 }}>{children}</div>
    </div>
  );
}

function Avatar({ name, size = 40 }: { name: string; size?: number }) {
  const initials = name.split(' ').map(p => p[0]).slice(0, 2).join('');
  const hues = ['#E9D5C8', '#D9E4F2', '#E3DDF3', '#DCEBDD', '#F3DDD8', '#E8E1D3'];
  const bg = hues[name.length % hues.length];
  return <span className="flex items-center justify-center rounded-full shrink-0 text-[13px] font-semibold" style={{ width: size, height: size, background: bg, color: '#3D3D3D' }}>{initials}</span>;
}

function BackTitle({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex items-center justify-center rounded-full" style={{ width: 34, height: 34, border: `2px solid ${C.teal}` }}>
        <ArrowLeft size={17} color={C.teal} />
      </span>
      <span className="text-[30px] font-medium tracking-tight">{children}</span>
    </div>
  );
}

// Destaque: anel em volta de um bloco + balão com a mensagem
function Callout({ show, text, place = 'bottom' }: { show: boolean; text: string; place?: 'bottom' | 'top' }) {
  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.span
            key="ring"
            className="absolute pointer-events-none rounded-2xl z-20"
            style={{ inset: -10, border: '3px solid #F2A93B', boxShadow: '0 0 0 6px rgb(242 169 59 / .18)' }}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: grow }}
          />
          <motion.span
            key="bubble"
            className="absolute z-30 left-1/2 whitespace-nowrap rounded-full px-6 py-3 text-[20px] font-semibold text-white"
            style={{ background: '#141B2D', boxShadow: '0 14px 30px rgb(0 0 0 / .25)', [place === 'bottom' ? 'top' : 'bottom']: 'calc(100% + 22px)' }}
            initial={{ opacity: 0, y: place === 'bottom' ? -8 : 8, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, x: '-50%' }}
            transition={{ duration: 0.4, delay: 0.15, ease: grow }}
          >
            {text}
          </motion.span>
        </>
      )}
    </AnimatePresence>
  );
}

// Barra empilhada de status (pendentes / aguardando envio / enviados)
function StatusBar({ parts, play, delay = 0, width = 296, height = 7 }: { parts: [number, number, number]; play: boolean; delay?: number; width?: number; height?: number }) {
  const total = parts[0] + parts[1] + parts[2];
  const colors = [STATUS.pending, STATUS.waiting, STATUS.sent];
  return (
    <div className="flex rounded-full overflow-hidden" style={{ width, height, background: '#E6E8EB' }}>
      {parts.map((p, i) => p > 0 && (
        <motion.span
          key={i}
          className="h-full"
          style={{ width: `${(p / total) * 100}%`, background: colors[i], transformOrigin: 'left' }}
          initial={play ? { scaleX: 0 } : false}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: delay + i * 0.35, ease: grow }}
        />
      ))}
    </div>
  );
}

function Legend({ parts }: { parts: [number, number, number] }) {
  const labels = ['pendentes', 'aguardando envio', 'enviados'];
  const colors = [STATUS.pending, STATUS.waiting, STATUS.sent];
  return (
    <div className="flex gap-4 text-[12px] mb-2" style={{ color: C.sub }}>
      {parts.map((p, i) => p > 0 && (
        <span key={i} className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: colors[i] }} />{p} {labels[i]}</span>
      ))}
    </div>
  );
}

const LEADERS: { name: string; parts: [number, number, number] }[] = [
  { name: 'Alex Silva', parts: [4, 4, 4] },
  { name: 'Amanda Lopes', parts: [12, 0, 0] },
  { name: 'Augusto Rodrigues', parts: [4, 4, 4] },
  { name: 'Juliana Nogueira', parts: [12, 0, 0] },
  { name: 'Felipe Lima', parts: [4, 4, 4] },
  { name: 'Bruna Martins', parts: [0, 0, 12] },
  { name: 'Rafael Souza', parts: [0, 0, 12] },
  { name: 'Camila Dias', parts: [4, 4, 4] },
];

export function RhScreen({ play, highlight, scroll, scrollDuration = 1.1 }: { play: boolean; highlight: 'numbers' | 'leaders' | null; scroll: number; scrollDuration?: number }) {
  const numbers = [
    { n: 5, pct: '47%', label: 'Total pendentes', color: STATUS.pending },
    { n: 24, pct: '20%', label: 'Total em andamento', color: STATUS.waiting },
    { n: 40, pct: '33%', label: 'Total enviados', color: STATUS.sent },
    { n: 2, pct: '16%', label: 'Líderes finalizados', color: null },
  ];
  return (
    <AppFrame>
      <motion.div data-scroll-content className="px-8 pt-8 pb-10" initial={false} animate={{ y: -scroll }} transition={{ duration: scrollDuration, ease }}>
        <div className="flex items-center justify-between">
          <BackTitle>Plano de devolutivas 2024.1</BackTitle>
          <span className="flex items-center gap-2 rounded-full px-6 py-3 text-white text-[16px] font-semibold" style={{ background: C.teal }}><Pencil size={16} /> Editar</span>
        </div>
        <div className="bg-white rounded-[20px] mt-7 px-6 pt-6 pb-4">
          <p className="text-[16px] font-semibold">Informações</p>
          <div className="grid grid-cols-4 mt-5 text-[13px]">
            {[['Ciclo referente', '2024.1', false], ['Período', '23/02/2024 - 03/04/2024', false], ['Avaliações adicionadas', '6 avaliações', true], ['Público', 'Líderes (6); Área (Design) +2', true]].map(([k, v, link]) => (
              <div key={k as string}><p style={{ color: C.sub }}>{k}</p><p className="text-[14.5px] font-semibold mt-2" style={{ color: link ? C.blue : C.ink, fontWeight: link ? 400 : 600 }}>{v}</p></div>
            ))}
          </div>
          <div className="border-t my-6" style={{ borderColor: C.line }} />
          <p className="text-[16px] font-semibold">Devolutivas</p>
          <div className="relative grid grid-cols-4 gap-3 mt-5">
            {numbers.map((b, i) => (
              <motion.div
                key={b.label}
                className="rounded-xl border px-6 py-4"
                style={{ borderColor: C.line }}
                initial={play ? { opacity: 0, y: 12 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: grow }}
              >
                <p className="text-[32px] leading-none tabular-nums">
                  <Counter to={b.n} play={play} delay={0.2 + i * 0.1} /> <span className="text-[14px]" style={{ color: C.sub }}>({b.pct})</span>
                </p>
                <p className="flex items-center gap-1.5 text-[12.5px] mt-2.5" style={{ color: C.sub }}>
                  {b.color ? <span className="w-2 h-2 rounded-full" style={{ background: b.color }} /> : <User size={13} />}
                  {b.label} <Info size={13} fill={C.ink} color="#fff" />
                </p>
              </motion.div>
            ))}
            <Callout show={highlight === 'numbers'} text="O RH agora tem controle da operação" />
          </div>

          <div className="flex items-center gap-4 mt-8 text-[15px]">
            <span className="flex-1 flex items-center justify-between rounded-full px-5 py-3" style={{ background: '#ECEDEF', color: C.sub }}>Buscar por líder... <Search size={18} /></span>
            <span className="flex items-center justify-between gap-14 rounded-xl px-5 py-3" style={{ background: '#ECEDEF' }}>Todos <ChevronDown size={16} /></span>
            <span style={{ color: C.sub }}>Total: 12 Líderes</span>
          </div>

          <div className="relative mt-6 rounded-xl border" style={{ borderColor: C.line }}>
            <div className="grid grid-cols-[2.2fr_1fr_3.5fr_0.6fr] px-4 py-3 text-[14px] font-medium border-b" style={{ borderColor: C.line }}>
              <span>Líderes</span><span>Liderados</span><span>Status</span><span />
            </div>
            {LEADERS.map((l, i) => (
              <div key={l.name} className="grid grid-cols-[2.2fr_1fr_3.5fr_0.6fr] items-center px-4 border-b last:border-b-0" style={{ height: 68, borderColor: C.line }}>
                <span className="flex items-center gap-3">
                  <Avatar name={l.name} />
                  <span><span className="block text-[16px]">{l.name}</span><span className="block text-[12.5px]" style={{ color: C.sub }}>Head de Produto</span></span>
                </span>
                <span><span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[14px] font-semibold" style={{ background: '#ECEDEF' }}><Users size={15} /> 12</span></span>
                <span>
                  <Legend parts={l.parts} />
                  <StatusBar parts={l.parts} play={play} delay={0.8 + i * 0.08} />
                </span>
                <span className="flex items-center justify-end gap-6"><ChevronDown size={18} /><Trash2 size={17} /></span>
              </div>
            ))}
            <Callout show={highlight === 'leaders'} text="Entende quem cobrar e quando cobrar" place="top" />
          </div>
        </div>
      </motion.div>
    </AppFrame>
  );
}

const TEAM: { name: string; role: string; status: 'pending' | 'waiting' | 'sent' }[] = [
  { name: 'Marina Costa', role: 'Analista', status: 'pending' },
  { name: 'Alexandre Torres', role: 'Analista', status: 'pending' },
  { name: 'Gustavo Bezerra', role: 'Desenvolvedor de Software', status: 'waiting' },
  { name: 'Mariana Diamante', role: 'Desenvolvedor de Software', status: 'waiting' },
  { name: 'Aline Sordi da Silva', role: 'Designer', status: 'sent' },
  { name: 'Isabela Vieira', role: 'Designer', status: 'sent' },
];

function StatusBadge({ status }: { status: 'pending' | 'waiting' | 'sent' }) {
  const map = {
    pending: { label: 'Pendente', bg: '#F7EBD3', fg: '#5C3F06', Icon: Clock, ic: STATUS.pending },
    waiting: { label: 'Aguardando envio', bg: '#DDEBF7', fg: '#173E5E', Icon: Clock, ic: STATUS.waiting },
    sent: { label: 'Enviado', bg: '#DFF0DA', fg: '#1E4D1E', Icon: CircleCheck, ic: STATUS.sent },
  }[status];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[14px] font-medium" style={{ background: map.bg, color: map.fg }}>
      <map.Icon size={14} color="#fff" fill={map.ic} /> {map.label}
    </span>
  );
}

function GestorScreen({ play, pressed, responderRef }: { play: boolean; pressed: boolean; responderRef: any }) {
  return (
    <AppFrame>
      <div className="px-8 pt-8">
        <BackTitle>Devolutiva Engenharia 2024.1</BackTitle>
        <p className="text-[16px] mt-4" style={{ color: C.sub }}>Veja o relatório individual do seu liderado e faça uma conclusão sobre os resultados.</p>
        <div className="flex gap-6 mt-9 items-start">
          <div className="bg-white rounded-[20px] px-6 py-6 shrink-0" style={{ width: 285 }}>
            <p className="text-[16px] font-semibold">Informações</p>
            {[['Nome da devolutiva', 'Devolutiva Engenharia 2024.1'], ['Período', '23/02/2024 - 03/04/2024'], ['Ciclo de referência', '4 TRI 2023']].map(([k, v]) => (
              <div key={k} className="mt-5"><p className="text-[12.5px]" style={{ color: C.sub }}>{k}</p><p className="text-[14px] font-semibold mt-1.5">{v}</p></div>
            ))}
            <div className="mt-5"><p className="text-[12.5px]" style={{ color: C.sub }}>Avaliações referentes</p><p className="text-[14px] mt-1.5" style={{ color: C.blue }}>6 avaliações</p></div>
            <div className="border-t my-5" style={{ borderColor: C.line }} />
            <p className="text-[12.5px]" style={{ color: C.sub }}>Status</p>
            <div className="mt-3"><StatusBar parts={[2, 2, 2]} play={play} delay={0.3} width={237} height={14} /></div>
            <div className="mt-3 flex flex-col gap-2 text-[14px]" style={{ color: C.sub }}>
              {[['2', 'Pendentes', STATUS.pending], ['2', 'Aguardando envio', STATUS.waiting], ['2', 'Enviados', STATUS.sent]].map(([n, l, c]) => (
                <span key={l} className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: c }} /><b className="text-[15px]" style={{ color: C.ink }}>{n}</b> {l}</span>
              ))}
            </div>
          </div>
          <div className="flex-1 bg-white rounded-[20px] px-6 py-6">
            <div className="flex justify-between"><p className="text-[16px] font-semibold">Liderados</p><p className="text-[14px]">Total: 6 pessoas</p></div>
            <div className="mt-4 rounded-xl border" style={{ borderColor: C.line }}>
              <div className="grid grid-cols-[1.4fr_1fr_0.6fr] px-4 py-2 text-[14px] border-b" style={{ borderColor: C.line }}><span>Nome</span><span>Status</span><span /></div>
              {TEAM.map((p, i) => (
                <motion.div
                  key={p.name}
                  className="grid grid-cols-[1.4fr_1fr_0.6fr] items-center px-4 border-b last:border-b-0"
                  style={{ height: 72, borderColor: C.line }}
                  initial={play ? { opacity: 0, x: 10 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                >
                  <span className="flex items-center gap-4"><Avatar name={p.name} size={46} /><span><span className="block text-[16px] font-medium">{p.name}</span><span className="block text-[14px] mt-0.5" style={{ color: C.sub }}>{p.role}</span></span></span>
                  <span><StatusBadge status={p.status} /></span>
                  <span className="flex justify-end">
                    {p.status === 'pending' && (
                      <motion.span ref={i === 0 ? responderRef : undefined} className="rounded-full px-4 py-1.5 text-white text-[14px] font-semibold" style={{ background: C.teal }} animate={{ scale: pressed && i === 0 ? 0.92 : 1 }} transition={{ duration: 0.12 }}>Responder</motion.span>
                    )}
                    {p.status === 'waiting' && <span className="rounded-full px-4 py-1.5 text-[14px] font-semibold border" style={{ color: C.teal, borderColor: C.teal }}>Enviar</span>}
                    {p.status === 'sent' && <Eye size={20} className="mr-3" />}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

function ColabListScreen({ pressed, rowRef }: { pressed: boolean; rowRef: any }) {
  return (
    <AppFrame>
      <div className="px-8 pt-10">
        <p className="text-[30px] font-medium">Minhas devolutivas</p>
        <div className="flex flex-col gap-4 mt-10">
          {['Devolutiva Geral 2024.1', 'Devolutiva Engenharia 2023.2'].map((n, i) => (
            <motion.div
              key={n}
              ref={i === 0 ? rowRef : undefined}
              className="bg-white rounded-2xl px-6 py-5 grid grid-cols-[1.2fr_1.2fr_0.8fr_1.2fr_auto] items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, scale: pressed && i === 0 ? 0.985 : 1 }}
              transition={{ duration: 0.4, delay: pressed ? 0 : i * 0.1 }}
            >
              <div><p className="text-[12.5px]" style={{ color: C.sub }}>Nome</p><p className="text-[16px] font-semibold mt-2">{n}</p></div>
              <div><p className="text-[12.5px]" style={{ color: C.sub }}>Líder</p><p className="flex items-center gap-2.5 mt-1.5"><Avatar name="Beatriz Rodrigues" size={32} /><span><span className="block text-[14px] font-semibold">Beatriz Rodrigues</span><span className="block text-[12px]" style={{ color: C.sub }}>Design de Produto I</span></span></p></div>
              <div><p className="text-[12.5px]" style={{ color: C.sub }}>Ciclo de referência</p><p className="text-[14px] font-semibold mt-2">{i === 0 ? '4 TRI 2023' : '2 TRI 2023'}</p></div>
              <div><p className="text-[12.5px]" style={{ color: C.sub }}>Período</p><p className="text-[14px] font-semibold mt-2">23/02/2024 - 03/04/2024</p></div>
              <ChevronRight size={20} />
            </motion.div>
          ))}
        </div>
      </div>
    </AppFrame>
  );
}

// Rosca animada: cada fatia "desenha" em sequência
function Donut({ play }: { play: boolean }) {
  const r = 70;
  const circ = 2 * Math.PI * r;
  const slices = ['#3B8ED8', '#F0913A', '#8E9198', '#A8CC5E'];
  return (
    <svg viewBox="0 0 200 200" width={200} height={200}>
      {slices.map((c, i) => (
        <motion.circle
          key={c}
          cx={100}
          cy={100}
          r={r}
          fill="none"
          stroke={c}
          strokeWidth={62}
          strokeDasharray={`${circ / 4} ${circ}`}
          transform={`rotate(${-90 + i * 90} 100 100)`}
          initial={play ? { strokeDashoffset: circ / 4 } : false}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 0.45, delay: 0.5 + i * 0.4, ease: 'easeOut' }}
        />
      ))}
      <circle cx={100} cy={100} r={40} fill="#fff" />
      <text x={100} y={100} textAnchor="middle" fontSize={26} fontWeight={600} fill={C.ink}>8</text>
      <text x={100} y={120} textAnchor="middle" fontSize={13} fill={C.ink}>Respostas</text>
    </svg>
  );
}

const QUALI_COLORS = { ref: '#A8CC5E', bem: '#3B8ED8', melhorar: '#F0913A', nao: '#8E9198' };
const LOREM_CONCLUSAO = 'Após revisar sua performance, gostaria de concluir destacando os pontos positivos que observamos em seu trabalho. Sua dedicação e comprometimento foram evidentes em todas as tarefas que realizou. Além disso, sua habilidade em enfrentar desafios e sua busca contínua por excelência foram notáveis. É evidente que você demonstrou um crescimento significativo desde o último review e estamos confiantes de que continuará a contribuir de forma positiva para nossa equipe.';

function ReportSection({ title, children }: { title: string; children: any }) {
  return (
    <div className="mt-8">
      <p className="text-[15px] font-semibold pb-3 border-b" style={{ borderColor: C.line }}>{title}</p>
      {children}
    </div>
  );
}

function MiniTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="mt-3 rounded-xl border text-[12.5px]" style={{ borderColor: C.line }}>
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_0.9fr] px-4 py-2.5 border-b text-[11.5px]" style={{ borderColor: C.line, color: C.sub }}>
        {head.map(h => <span key={h}>{h}</span>)}
      </div>
      {rows.map(r => (
        <div key={r[0]} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_0.9fr] items-center px-4 border-b last:border-b-0" style={{ height: 48, borderColor: C.line }}>
          <span className="font-semibold">{r[0]}</span>
          {r.slice(1).map((c, i) => <span key={i} className={`truncate ${i === 0 ? 'font-semibold' : ''}`}>{c}</span>)}
          <span className="flex items-center gap-1.5 justify-end font-semibold"><MessageSquareText size={13} color={C.blue} fill={C.blue} stroke="#fff" /> 5 <ChevronDown size={14} /></span>
        </div>
      ))}
    </div>
  );
}

// Relatório do colaborador: escala qualitativa, escala numérica, conclusão do líder e anotações
export function ReportScreen({ play, scroll, contentRef, scrollDuration = 2.2 }: { play: boolean; scroll: number; contentRef?: any; scrollDuration?: number }) {
  const directions = ['Líder', 'Pares', 'Outros', 'Auto'];
  return (
    <AppFrame>
      <motion.div ref={contentRef} data-scroll-content className="mx-auto pt-8 pb-10" style={{ width: 880 }} initial={false} animate={{ y: -scroll }} transition={{ duration: scrollDuration, ease }}>
        <div className="flex items-center justify-between">
          <BackTitle>Devolutiva Geral 2024.1</BackTitle>
          <span className="flex items-center gap-2 rounded-full px-4 py-2 text-white text-[14px] font-semibold" style={{ background: C.teal }}><Download size={15} /> Baixar PDF</span>
        </div>

        <motion.div className="bg-white rounded-[20px] mt-7 px-8 py-7" initial={play ? { opacity: 0, y: 16 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: grow }}>
          <div className="flex justify-between">
            <span className="flex items-center gap-4"><Avatar name="Marina Costa" size={52} /><span><span className="block text-[18px] font-medium">Marina Costa</span><span className="block text-[13px] mt-0.5" style={{ color: C.sub }}>Analista</span></span></span>
            <span className="text-right"><span className="block text-[12px]" style={{ color: C.sub }}>Ciclo de referência</span><b className="block text-[15px] mt-1">4 TRI 2023</b></span>
          </div>

          <ReportSection title="Avaliações com escala qualitativa">
            <p className="text-[13px] font-semibold mt-5">Visão geral</p>
            <div className="grid grid-cols-2 gap-8 mt-3">
              <div>
                <p className="text-[12px]" style={{ color: C.sub }}>Geral das avaliações</p>
                <div className="flex items-center gap-6 mt-2">
                  <Donut play={play} />
                  <div className="flex flex-col gap-2.5 text-[11.5px]" style={{ color: C.sub }}>
                    {[['Referência', QUALI_COLORS.ref], ['Mandando bem', QUALI_COLORS.bem], ['Precisa melhorar', QUALI_COLORS.melhorar], ['Não sei avaliar', QUALI_COLORS.nao]].map(([l, c]) => (
                      <span key={l} className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: c }} />{l}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[12px]" style={{ color: C.sub }}>Geral das avaliações por direções</p>
                <div className="mt-3 flex gap-5 items-end" style={{ height: 180 }}>
                  {directions.map((who, i) => (
                    <div key={who} className="flex flex-col items-center">
                      <motion.div className="flex flex-col" style={{ width: 54, transformOrigin: 'bottom' }} initial={play ? { scaleY: 0 } : false} animate={{ scaleY: 1 }} transition={{ duration: 0.8, delay: 0.7 + i * 0.15, ease: grow }}>
                        {Object.values(QUALI_COLORS).map(c => <span key={c} className="flex items-center justify-center text-[10px] font-semibold text-white" style={{ height: 38, background: c }}>25%</span>)}
                      </motion.div>
                      <span className="text-[12px] mt-2">{who}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-[13px] font-semibold mt-6">Médias</p>
            <MiniTable
              head={['Avaliações', 'Líder', 'Pares', 'Outros', 'Auto', 'Comentários']}
              rows={['Empatia', 'Juntos somos mais forte', 'Ser referência'].map(n => [n, 'Referência', 'Mandando bem', 'Precisa melhorar', 'Não sei avaliar'])}
            />
          </ReportSection>

          <ReportSection title="Avaliações com escala numérica">
            <p className="text-[13px] font-semibold mt-5">Visão geral</p>
            <div className="grid grid-cols-2 gap-8 mt-3">
              <div>
                <p className="text-[12px]" style={{ color: C.sub }}>Média geral das avaliações</p>
                <div className="mt-3 rounded-2xl flex items-center justify-center text-[44px] font-medium tabular-nums" style={{ height: 120, background: '#F1F2F4' }}>
                  <NumberCounter to={9.1} play={play} delay={1.6} />
                </div>
              </div>
              <div>
                <p className="text-[12px]" style={{ color: C.sub }}>Média geral das avaliações por direções</p>
                <div className="relative mt-3 ml-6 flex gap-6 items-end border-b" style={{ height: 120, borderColor: C.line }}>
                  {[0, 5, 10].map(t => <span key={t} className="absolute -left-6 text-[10px]" style={{ bottom: (t / 10) * 120 - 6, color: C.muted }}>{t}</span>)}
                  {[['Líder', 7.4, '#3B8ED8'], ['Pares', 4.4, '#E07B39'], ['Outros', 10, '#A2A5AB']].map(([who, v, c], i) => (
                    <div key={who as string} className="relative flex flex-col items-center justify-end h-full">
                      <motion.span
                        className="flex items-start justify-center pt-1 text-[10px] font-semibold text-white rounded-t-[4px]"
                        style={{ width: 56, height: ((v as number) / 10) * 120, background: c as string, transformOrigin: 'bottom' }}
                        initial={play ? { scaleY: 0 } : false}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.8, delay: 1.5 + i * 0.15, ease: grow }}
                      >
                        {String(v)}
                      </motion.span>
                      <span className="absolute -bottom-5 text-[12px]">{who as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-[13px] font-semibold mt-9">Médias</p>
            <MiniTable
              head={['Avaliações', 'Líder', 'Pares', 'Outros', 'Auto', 'Comentários']}
              rows={['Agilidade', 'Liderança', 'Trabalho em equipe'].map(n => [n, '9.2', '9.2', '9.2', '9.2'])}
            />
          </ReportSection>
        </motion.div>

        <div className="bg-white rounded-[20px] mt-6 px-6 py-6">
          <p className="text-[16px] font-semibold">Conclusão do Líder</p>
          <span className="flex items-center gap-3 mt-4"><Avatar name="João Silva" size={40} /><span><span className="block text-[14px] font-medium">João Silva</span><span className="block text-[12.5px]" style={{ color: C.sub }}>Head de Produto</span></span></span>
          <p className="text-[13px] font-semibold mt-5">Conclusão geral</p>
          <p className="mt-2 rounded-xl px-4 py-3 text-[12.5px] leading-[1.55]" style={{ background: '#F1F2F4' }}>{LOREM_CONCLUSAO}</p>
          <p className="text-[13px] font-semibold mt-5">Sugestões de melhoria</p>
          <p className="mt-2 rounded-xl px-4 py-3 text-[12.5px] leading-[1.55]" style={{ background: '#F1F2F4' }}>
            Fortalecer essa habilidade pode facilitar a colaboração e aumentar a eficiência do trabalho em equipe. Além disso, investir em desenvolvimento de habilidades técnicas específicas para o seu papel pode ampliar suas capacidades.
          </p>
        </div>

        <div className="bg-white rounded-[20px] mt-6 px-6 py-6">
          <p className="text-[16px] font-semibold">Anotações</p>
          <p className="text-[13px] mt-1" style={{ color: C.sub }}>Adicione anotações e comentários registrados no momento da devolutiva.</p>
          <div className="mt-4 rounded-xl border px-4 py-4" style={{ borderColor: C.line }}>
            <span className="flex items-center gap-3"><Avatar name="João Silva" size={36} /><span><span className="block text-[13.5px] font-medium">João Silva</span><span className="block text-[12px]" style={{ color: C.sub }}>Head de Produto</span></span></span>
            <p className="text-[12.5px] leading-[1.55] mt-3" style={{ color: C.sub }}>Adicione conteúdos para ajudar a pessoa colaboradora no seu desenvolvimento. Esses links vão fazer parte do seu PDI.</p>
            <p className="text-[11.5px] mt-3" style={{ color: C.muted }}>23 de janeiro de 2024</p>
          </div>
          <p className="text-right text-[11px] mt-4" style={{ color: C.sub }}>0/1000</p>
          <div className="mt-1 rounded-xl px-4 py-3 text-[13px]" style={{ height: 88, background: '#ECEDEF', color: C.muted }}>Escreva sua anotação...</div>
          <div className="flex justify-end mt-4"><span className="rounded-full px-5 py-2 text-white text-[14px] font-semibold" style={{ background: C.teal }}>Adicionar</span></div>
        </div>
      </motion.div>
    </AppFrame>
  );
}

function NumberCounter({ to, play, delay = 0 }: { to: number; play: boolean; delay?: number }) {
  const [v, setV] = useState(play ? 0 : to);
  useEffect(() => {
    if (!play) { setV(to); return; }
    setV(0);
    const c = animate(0, to, { duration: 1.2, delay, ease: grow, onUpdate: setV });
    return () => c.stop();
  }, [play, to, delay]);
  return <>{v.toFixed(1)}</>;
}

function TitleScreen({ kicker, text }: { kicker: string; text: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center font-sans text-white" style={{ background: TEAL_BG }}>
      <div className="text-center px-40">
        <motion.p className="text-[18px] font-semibold uppercase tracking-[0.2em] text-white/70" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>{kicker}</motion.p>
        <motion.p className="font-serif text-[52px] font-extrabold leading-[1.15] mt-5 tracking-tight" initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.8, delay: 0.15, ease: grow }}>{text}</motion.p>
      </div>
    </div>
  );
}

export function DevolutivaSolucaoMotion() {
  const viewRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const responderRef = useRef<HTMLSpanElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState(0);
  const [inView, setInView] = useState(false);
  const [scene, setScene] = useState<Scene>('title-rh');
  const [cycle, setCycle] = useState(0);
  const [highlight, setHighlight] = useState<'numbers' | 'leaders' | null>(null);
  const [scroll, setScroll] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [cursor, setCursor] = useState({ x: 900, y: 600, visible: false, down: false });
  const [fields, setFields] = useState(emptyFields);
  const [activeField, setActiveField] = useState<FieldKey | null>(null);

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
    if (!inView || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const token = { cancelled: false };

    const centerOf = (el: HTMLElement | null) => {
      const stage = stageRef.current;
      if (!el || !stage) return { x: 900, y: 400 };
      const r = el.getBoundingClientRect();
      const s = stage.getBoundingClientRect();
      const k = s.width / W;
      return { x: (r.left + r.width / 2 - s.left) / k, y: (r.top + r.height / 2 - s.top) / k };
    };

    const clickOn = async (el: HTMLElement | null) => {
      setCursor(c => ({ ...c, ...centerOf(el), visible: true }));
      await wait(1200, token);
      setCursor(c => ({ ...c, down: true }));
      setPressed(true);
      await wait(180, token);
      setCursor(c => ({ ...c, down: false }));
      setPressed(false);
      await wait(200, token);
    };

    const go = (s: Scene) => { setScroll(0); setHighlight(null); setCycle(n => n + 1); setScene(s); };

    const run = async () => {
      while (!token.cancelled) {
        // RH
        go('title-rh');
        await wait(3000, token);
        go('rh');
        await wait(2800, token);
        setHighlight('numbers');
        await wait(3600, token);
        setHighlight(null);
        setScroll(330);
        await wait(1400, token);
        setHighlight('leaders');
        await wait(3600, token);

        // Gestor
        go('title-gestor');
        await wait(3000, token);
        go('gestor');
        setCursor({ x: 1100, y: 640, visible: false, down: false });
        await wait(1500, token);
        await clickOn(responderRef.current);
        setCursor(c => ({ ...c, visible: false }));
        setFields(emptyFields);
        go('form');
        await wait(900, token);
        for (const f of FIELDS) {
          setScroll(Math.min(STAGE_FORM_MAX_SCROLL, Math.max(0, f.top - 330)));
          await wait(900, token);
          setActiveField(f.key);
          await typeText(TEXT[f.key], 1500, s => setFields(v => ({ ...v, [f.key]: s })), token);
          setActiveField(null);
          await wait(250, token);
        }
        await wait(1200, token);

        // Colaborador
        go('title-colab');
        await wait(3000, token);
        go('colab');
        setCursor({ x: 1100, y: 640, visible: false, down: false });
        await wait(1200, token);
        await clickOn(rowRef.current);
        setCursor(c => ({ ...c, visible: false }));
        go('report');
        await wait(3000, token);
        // Rola o relatório inteiro em etapas, com pausa para ler cada parte
        const content = reportRef.current;
        const max = content ? Math.max(0, content.offsetHeight - (H - 72)) : 0;
        for (const f of [0.3, 0.6, 1]) {
          setScroll(Math.round(max * f));
          await wait(3200, token);
        }
      }
    };

    run().catch(() => {});
    return () => { token.cancelled = true; };
  }, [inView]);

  const s = width / W;
  const title = TITLES[scene];

  return (
    <div
      ref={viewRef}
      className="relative w-full overflow-hidden rounded-2xl select-none"
      style={{ aspectRatio: `${W} / ${H}`, background: TEAL_BG }}
      role="img"
      aria-label="Animação das três jornadas da solução: RH acompanha o plano, gestor faz a devolutiva com ajuda da IA e colaborador recebe o relatório"
    >
      {width > 0 && (
        <div ref={stageRef} className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${s})` }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${scene}-${cycle}`}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {title && <TitleScreen kicker={title.kicker} text={title.text} />}
              {scene === 'rh' && <RhScreen play highlight={highlight} scroll={scroll} />}
              {scene === 'gestor' && <GestorScreen play pressed={pressed} responderRef={responderRef} />}
              {scene === 'form' && (
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div className="absolute left-0 top-0" style={{ width: W, height: 1550 }} initial={false} animate={{ y: -scroll }} transition={{ duration: 1, ease }}>
                    <FormStage fields={fields} activeField={activeField} pressed={null} showLogo={false} />
                  </motion.div>
                </div>
              )}
              {scene === 'colab' && <ColabListScreen pressed={pressed} rowRef={rowRef} />}
              {scene === 'report' && <ReportScreen play scroll={scroll} contentRef={reportRef} />}
            </motion.div>
          </AnimatePresence>

          {/* Cursor */}
          <motion.div
            className="absolute left-0 top-0 z-50 pointer-events-none"
            initial={false}
            animate={{ x: cursor.x - 4, y: cursor.y - 2, opacity: cursor.visible ? 1 : 0, scale: cursor.down ? 0.85 : 1 }}
            transition={{ x: { duration: 1.1, ease }, y: { duration: 1.1, ease }, opacity: { duration: 0.25 }, scale: { duration: 0.12 } }}
          >
            <svg width="26" height="30" viewBox="0 0 26 30" fill="none">
              <path d="M2 2l20 11.5-9 2.2-4.3 8.6L2 2z" fill="#111" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// O formulário tem 1550px de altura; a janela mostra 800
const STAGE_FORM_MAX_SCROLL = 1550 - H;

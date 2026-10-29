import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertCircle, ArrowUpRight, Bot, CheckCircle, ChevronDown, ChevronUp, Clock, EyeOff, FileSpreadsheet, Flag,
  Code, GitFork, Heart, History, Layers, LayoutGrid, Lightbulb, ScanSearch, SlidersHorizontal, Compass, Lock, MapPin, Maximize, MessageSquare, Minimize, Pause, Pencil, Play, RotateCcw, Route, Target, Users, Workflow, X,
} from 'lucide-react';
import { CountUpText } from './CountUpText';
import { CicloAvaliativoMotion } from './CicloAvaliativoMotion';
import { DevolutivaIaMotion } from './DevolutivaIaMotion';
import { DevolutivaSolucaoMotion } from './DevolutivaSolucaoMotion';
import { DevolutivaLaptopMotion } from './DevolutivaLaptopMotion';
import { DevolutivaThumbMotion } from './DevolutivaThumbMotion';
import { SinteseGestorMotion } from './SinteseGestorMotion';
import { FerramentasMotion, HistoricoMotion, VisibilidadeMotion } from './ProblemasMotions';
import { MapaZoomMotion, ZoomTour, type TourStep } from './MapaZoomMotion';
import { DashboardThumbMotion } from './DashboardThumbMotion';
import { MindiThumbMotion } from './MindiThumbMotion';
import { User as PersonIcon } from '@phosphor-icons/react';
import { VersoesPrototipoMotion } from './VersoesPrototipoMotion';
import { AiWorkflowDiagram } from './AiWorkflowDiagram';
import dashDiscoveryImg from '../assets/images/Admin/discovery.png';
import dashHandoffImg from '../assets/images/Deck/dashboard-cursor.png';
import kbaDiscoveryImg from '../assets/images/KBA/KBA-Discovery.png';
import adminAiStudioImg from '../assets/images/Deck/admin-ai-studio.png';
import adminCursorImg from '../assets/images/Deck/admin-cursor.png';
import { PhotoCarousel } from './PhotoCarousel';

/*
 * Apresentação do case Devolutiva em slides (16:9), aberta pelo botão "Apresentar case" da página.
 * O conteúdo segue o case publicado (fonte da verdade: textos, números e motions) e traz as partes
 * que só existiam no deck antigo: OKR de Jornada Fluida, pesquisas anteriores, insights por persona
 * com falas, as três jornadas, o aprendizado que levou à IA e a evolução proposta.
 * Palco fixo de 1600×900 escalado para caber na tela; os slides correm na vertical (↓ avança, ↑ volta),
 * ← → / espaço também navegam, Esc fecha.
 */

const W = 1600;
const H = 900;
const IMG = '/apresentacao/devolutiva';

const C = { ink: '#241510', sub: '#6F625B', soft: '#7D7169', line: '#E2DCD4', accent: '#9E4322', dark: '#2E211B', cream: '#F6EAE3' };
const ease = [0.16, 1, 0.3, 1] as const;
const BOARD = { background: '#F9FAFB', backgroundImage: 'radial-gradient(#DEE1E5 1.3px, transparent 1.3px)', backgroundSize: '22px 22px' };
const GREEN = '#21858A'; // fundo da thumb do case

// ---------- Peças de layout ----------
// Tipografia em múltiplos de 4/8: 96 · 64 · 56 · 48 · 40 (títulos), 32 · 24 · 20 (subtítulos e apoio),
// 16 (corpo), 14 · 12 (legendas e rótulos)

function Title({ children, dark = false, size = 48 }: { children: any; dark?: boolean; size?: number }) {
  return <h2 className="font-serif font-bold tracking-tight leading-[1.08] m-0" style={{ fontSize: size, color: dark ? '#F4EFEB' : C.ink }}>{children}</h2>;
}

function Lede({ children, dark = false, className = '' }: { children: any; dark?: boolean; className?: string }) {
  return <p className={`text-[20px] leading-[1.55] mt-5 ${className}`} style={{ color: dark ? '#C9BDB4' : C.soft }}>{children}</p>;
}

function Slide({ children, dark = false, className = '', style }: { children: any; dark?: boolean; className?: string; style?: any }) {
  return (
    <div className={`absolute inset-0 flex flex-col px-[120px] py-[88px] ${className}`} style={{ background: dark ? C.dark : '#fff', ...style }}>
      {children}
    </div>
  );
}

// Entrada em sequência dos blocos de um slide
const Reveal = ({ children, i = 0, className = '', style }: { children: any; i?: number; className?: string; style?: any; key?: string }) => (
  <motion.div className={className} style={style} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease }}>
    {children}
  </motion.div>
);

// stacked: ícone em cima do texto; onLight: ícone sem círculo ao lado do título e linhas mais curtas (slide sobre mim)
function Point({ Icon, title, text, dark = false, stacked = false, onLight = false }: { Icon: any; title: string; text: string; dark?: boolean; stacked?: boolean; onLight?: boolean; key?: string }) {
  if (onLight) return (
    <div>
      <p className="flex items-center gap-2.5 text-[16px] font-semibold m-0" style={{ color: C.ink }}><Icon size={20} style={{ color: C.accent }} />{title}</p>
      <p className="text-[16px] leading-[1.5] mt-1.5 m-0 max-w-[480px]" style={{ color: C.sub }}>{text}</p>
    </div>
  );
  return (
    <div className={stacked ? 'flex flex-col items-start gap-4' : 'flex items-start gap-4'}>
      <span className="flex items-center justify-center w-11 h-11 rounded-full shrink-0" style={{ background: dark ? 'rgb(255 255 255 / .08)' : onLight ? '#fff' : C.cream, color: dark ? '#E0A889' : C.accent, boxShadow: onLight ? '0 1px 3px rgb(36 21 16 / .1)' : 'none' }}><Icon size={20} /></span>
      <p className="text-[16px] leading-[1.5] m-0">
        <b className="block font-semibold" style={{ color: dark ? '#F4EFEB' : C.ink }}>{title}</b>
        <span className={onLight ? 'block text-[16px] mt-0.5' : ''} style={{ color: dark ? '#C9BDB4' : C.sub }}>{text}</span>
      </p>
    </div>
  );
}

// ---------- Slides ----------

const SobreMim = () => (
  <Slide className="justify-center" style={{ background: '#F0EDE8' }}>
    <div className="grid grid-cols-[520px_1fr] gap-24 items-center">
      <Reveal><PhotoCarousel className="w-full h-[700px] rounded-[28px]" /></Reveal>
      <div>
        <Reveal i={1}><Title size={64}>Olá, eu sou o Tamy</Title></Reveal>
        <Reveal i={2}><p className="font-serif text-[24px] font-bold leading-tight tracking-tight mt-4 m-0" style={{ color: C.soft }}>Designer sênior de produtos, problemas e IA.</p></Reveal>
        <div className="flex flex-col gap-7 mt-14">
          {[
            { Icon: MapPin, title: 'De onde eu vim', text: 'Sou de Volta Redonda (RJ), onde me formei em Design. Comecei em agências de publicidade até migrar para Produto.' },
            { Icon: Workflow, title: 'Como eu trabalho', text: 'Gosto de processo e de atuar de ponta a ponta, do discovery à entrega, sendo AI-first em todas as etapas.' },
            { Icon: Heart, title: 'O que eu gosto', text: 'Música, esportes, impressora 3D, criar apps e jogos de tabuleiro. Bem ativo e criativo no dia a dia.' },
          ].map((p, i) => <Reveal key={p.title} i={3 + i}><Point onLight {...p} /></Reveal>)}
        </div>
      </div>
    </div>
  </Slide>
);

const Capa = () => (
  <Slide dark style={{ padding: 0, background: GREEN }}>
    <div className="grid grid-cols-2 h-full">
      <div className="flex flex-col justify-center pl-[120px] pr-16">
        <Reveal i={1}><Title dark size={56}>Fechando o ciclo da Avaliação de Desempenho</Title></Reveal>
        <Reveal i={2}><Lede dark className="text-[20px] !text-white/80">Como transformamos um processo descentralizado em uma experiência integrada, com um agente de IA dentro do produto.</Lede></Reveal>
        <Reveal i={3} className="flex flex-col gap-6 mt-14">
          {[['Atuação', 'Senior Product Designer'], ['Time', 'Performance e Desenvolvimento'], ['Personas', 'RH · Gestores · Colaboradores']].map(([k, v]) => (
            <div key={k}>
              <p className="text-[14px] m-0" style={{ color: 'rgb(255 255 255 / .65)' }}>{k}</p>
              <p className="text-[20px] font-semibold mt-1 m-0 text-white">{v}</p>
            </div>
          ))}
        </Reveal>
      </div>
      {/* O mesmo motion da thumb do case na Home */}
      <motion.div className="relative overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
        <DevolutivaThumbMotion active />
      </motion.div>
    </div>
  </Slide>
);

const Impacto = () => (
  <Slide className="justify-center">
    <Reveal i={1}><Title size={48}>Impacto no primeiro ano</Title></Reveal>
    <Reveal i={2}><Lede>Lançada como POC interna na Gupy e liberada aos poucos até chegar a 100% da base em um ano.</Lede></Reveal>
    <div className="grid grid-cols-4 gap-6 mt-14">
      {[
        { value: '+1.000', label: 'empresas com o módulo de Performance' },
        { value: '~50%', label: 'da base usando a devolutiva em um ano' },
        { value: '~200 mil', label: 'devolutivas entregues pela plataforma (estimado)' },
        { value: '~2/3', label: 'dos gestores usaram a conclusão gerada pela Gupy IA' },
      ].map((s, i) => (
        <Reveal key={s.label} i={3 + i} className="rounded-[24px] p-9" style={{ border: `1.5px solid ${C.line}` }}>
          <p className="font-serif text-[48px] font-bold leading-none tracking-tight m-0" style={{ color: C.ink }}><CountUpText text={s.value} /></p>
          <p className="text-[16px] leading-snug mt-5 m-0" style={{ color: C.sub }}>{s.label}</p>
        </Reveal>
      ))}
    </div>
  </Slide>
);

const PorQue = () => (
  <Slide className="justify-center">
    <Reveal i={1}><Title size={48}>Por que a devolutiva entrou no roadmap</Title></Reveal>
    <Reveal i={2}><Lede className="max-w-[1100px]">Três sinais apontavam para a mesma etapa e nos fizeram começar a investigar, antes de qualquer solução.</Lede></Reveal>
    <div className="grid grid-cols-3 gap-8 mt-16">
      {[
        { Icon: Target, title: 'Objetivo de negócio', text: 'A empresa tinha o OKR de Jornada Fluida: revisar as jornadas de cada produto para depois conectar o ecossistema.' },
        { Icon: AlertCircle, title: 'Ruptura operacional', text: 'Reclamações do RH já relatadas pelo CS e nos tickets: processos paralelos e pouco controle da etapa.' },
        { Icon: Route, title: 'Direção estratégica', text: 'Fechar a jornada interna de Performance era a base para integrar o ecossistema depois.' },
      ].map((p, i) => (
        <Reveal key={p.title} i={3 + i} className="rounded-[24px] p-9" style={{ border: `1.5px solid ${C.line}` }}>
          <span className="flex items-center justify-center w-14 h-14 rounded-full mb-7" style={{ background: C.cream, color: C.accent }}><p.Icon size={24} /></span>
          <p className="text-[24px] font-bold m-0" style={{ color: C.ink }}>{p.title}</p>
          <p className="text-[16px] leading-[1.55] mt-3 m-0" style={{ color: C.sub }}>{p.text}</p>
        </Reveal>
      ))}
    </div>
  </Slide>
);

const Desafio = () => (
  <Slide className="justify-center">
    <Reveal i={1}><Title>A única etapa que acontecia fora do produto</Title></Reveal>
    <Reveal i={2}><Lede className="max-w-[1180px]">O produto de Performance já cobria a configuração de ciclos, as avaliações e os comitês de calibração. A jornada era interrompida bem antes da etapa mais importante: a conversa entre gestor e colaborador sobre os resultados.</Lede></Reveal>
    <Reveal i={3} className="mt-12 mx-auto w-[960px]"><CicloAvaliativoMotion /></Reveal>
  </Slide>
);

const Alinhamento = () => (
  <Slide>
    <Reveal i={1}><Title>Uma base compartilhada antes do Discovery</Title></Reveal>
    <Reveal i={2}><Lede>Antes de investigar qualquer solução, Produto, Design e Negócio precisavam partir do mesmo entendimento do problema.</Lede></Reveal>
    <motion.div className="grid grid-cols-4 gap-8 mt-auto" initial="hidden" animate="show">
      {[
        { Icon: Flag, title: 'Kickoff', desc: 'Contexto, objetivos, riscos e métricas de sucesso alinhados com os stakeholders.', img: '/thumb-kickoff.png' },
        { Icon: Pencil, title: 'CSD', desc: '5 stakeholders. Certezas e dúvidas viraram perguntas de pesquisa.', img: '/thumb-csd.png' },
        { Icon: LayoutGrid, title: 'Benchmark', desc: '10 plataformas de mercado comparadas em funcionalidades de devolutiva.', img: '/thumb-bench.png' },
        { Icon: GitFork, title: 'Faz / não faz', desc: 'Limites de escopo definidos antes de aprofundar a pesquisa.', img: '/thumb-faz-naofaz.png' },
      ].map((st, i) => {
        const start = 0.5 + i * 1.25;
        const reveal = (delay: number) => ({
          hidden: { opacity: 0, y: 12 },
          show: { opacity: 1, y: 0, transition: { duration: 0.45, delay: start + delay, ease } },
        });
        return (
          <div key={st.title} className="relative">
            {/* Linha até a próxima etapa */}
            {i < 3 && (
              <motion.span
                className="absolute top-7 h-[1.5px] origin-left"
                style={{ left: 72, width: 'calc(100% - 40px)', background: C.line }}
                variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.7, delay: start + 0.55, ease: 'easeInOut' } } }}
              />
            )}
            <motion.span
              className="relative flex items-center justify-center w-14 h-14 rounded-full bg-white mb-5"
              style={{ border: `1.5px solid ${C.line}`, color: C.accent }}
              variants={{ hidden: { opacity: 0, scale: 0.5 }, show: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: start, ease } } }}
            >
              <st.Icon size={22} />
            </motion.span>
            <motion.p className="text-[20px] font-bold m-0" style={{ color: C.ink }} variants={reveal(0.15)}>{st.title}</motion.p>
            <motion.p className="text-[16px] leading-[1.5] mt-2 mb-6 min-h-[78px]" style={{ color: C.sub }} variants={reveal(0.25)}>{st.desc}</motion.p>
            <motion.img src={st.img} alt="" className="w-full h-[250px] object-cover rounded-xl" style={{ border: `1.5px solid ${C.line}` }} variants={reveal(0.4)} />
          </div>
        );
      })}
    </motion.div>
  </Slide>
);

// Mostra o board inteiro, depois zoom em cada pesquisa (Beni, Serviço, Home), voltando ao todo entre elas
const PESQUISAS_TOUR: TourStep[] = [
  { u: 0.5, v: 0.5, zoom: 1, hold: 1200 },
  { u: 0.163, v: 0.2, zoom: 2.3, label: 'Pesquisa do Beni', hold: 3600 },
  { u: 0.5, v: 0.5, zoom: 1, hold: 1500 },
  { u: 0.5, v: 0.2, zoom: 2.3, label: 'Pesquisa Serviço', hold: 3600 },
  { u: 0.5, v: 0.5, zoom: 1, hold: 1500 },
  { u: 0.838, v: 0.2, zoom: 2.3, label: 'Pesquisa da Home', hold: 3600 },
  { u: 0.5, v: 0.5, zoom: 1, hold: 3500 },
];

const Pesquisas = () => (
  <Slide>
    <Reveal i={1}><Title>Consolidando o que a empresa já sabia</Title></Reveal>
    <Reveal i={2}><Lede className="max-w-[1200px]">Reuni pesquisas anteriores de UX Research, estudos de Service Design e entrevistas de outras iniciativas de Performance, em vez de repetir descobertas já validadas. Os mesmos sinais se repetiam entre elas.</Lede></Reveal>
    <Reveal i={3} className="mt-auto">
      <div className="relative w-full" style={{ aspectRatio: '6000 / 1883' }}>
        <ZoomTour src={`${IMG}/pesquisas.webp`} width={6000} height={1883} tour={PESQUISAS_TOUR} label="Análise das pesquisas anteriores: Beni, Serviço e Home" />
      </div>
      <p className="text-[14px] mt-3 m-0" style={{ color: C.sub }}>Síntese das pesquisas de Research, de Serviço e da Home.</p>
    </Reveal>
  </Slide>
);

const Mapa = () => (
  <Slide>
    <Reveal i={1}><Title>A devolutiva era o elo de todo o ciclo</Title></Reveal>
    <Reveal i={2}><Lede className="max-w-[1200px]">Mapeei a jornada completa conectando RH, gestores e colaboradores. Ficou evidente que essa etapa não era isolada: era o principal elo entre avaliação, calibração e Plano de Desenvolvimento Individual.</Lede></Reveal>
    <Reveal i={3} className="relative mt-14 mb-4 mx-auto w-[88%] flex-1 min-h-0"><MapaZoomMotion /></Reveal>
  </Slide>
);

// Cada dor fica parada e apagada até o mouse passar por cima da coluna, para explicar uma de cada vez
const DORES = [
  { Motion: FerramentasMotion, who: 'Gestores', title: 'Usavam ferramentas externas', text: 'Dependiam de documentos e planilhas para preparar a conversa.', quote: 'Eu faço um ppt para conseguir preparar essa conversa.' },
  { Motion: HistoricoMotion, who: 'Colaboradores', title: 'Ficavam sem histórico', text: 'Não acumulavam um registro consolidado do próprio desenvolvimento.', quote: 'Já recebi devolutivas de várias formas; poucas eu consegui guardar.' },
  { Motion: VisibilidadeMotion, who: 'RH', title: 'Não tinha visibilidade', text: 'Não sabia o que estava feito, pendente ou parado.', quote: 'Não consigo saber quem de fato fez. O processo sempre atrasa.' },
];

function Problemas() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Slide>
      <Reveal i={1}><Title>A devolutiva tinha valor, mas acontecia sem padrão</Title></Reveal>
      <div className="flex mt-auto mb-auto pt-6">
        {DORES.map((p, i) => {
          const on = hover === i;
          return (
            <Reveal key={p.who} i={2 + i} className="relative flex-1" style={{ marginLeft: i ? -36 : 0, zIndex: on ? 10 : 3 - i }}>
              <motion.div
                className="h-full rounded-[28px] bg-white pr-9 pt-8 pb-8"
                style={{ paddingLeft: i ? 72 : 36 }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(h => (h === i ? null : h))}
                animate={{ y: on ? -14 : 0, scale: on ? 1.02 : 1, boxShadow: on ? '0 0 0 1.5px #E2DCD4, 0 28px 60px rgb(36 21 16 / .16)' : '0 0 0 1.5px #E2DCD4, 0 10px 28px rgb(36 21 16 / .07)' }}
                transition={{ duration: 0.3, ease }}
              >
                <p className="text-[16px] font-semibold m-0" style={{ color: C.accent }}>{p.who}</p>
                <p className="text-[20px] font-bold mt-2 m-0" style={{ color: C.ink }}>{p.title}</p>
                <p className="text-[16px] leading-[1.5] mt-1.5 mb-5 m-0" style={{ color: C.sub }}>{p.text}</p>
                <div className="-mx-4"><p.Motion active={on} /></div>
                <p className="font-serif text-[16px] italic leading-snug mt-6 m-0" style={{ color: C.soft }}>“{p.quote}”</p>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </Slide>
  );
}

const Jornadas = () => (
  <Slide style={BOARD}>
    <Reveal i={1}><Title>Padronizar as jornadas sem sobrecarregar o gestor</Title></Reveal>
    <Reveal i={2}><Lede>Antes das interfaces, desenhei os fluxos completos das três jornadas para validar a arquitetura com Produto e Engenharia.</Lede></Reveal>
    <div className="grid grid-cols-3 gap-8 mt-auto">
      {[
        { role: 'RH', title: 'Orquestra o ciclo com governança', text: 'Configura períodos, acompanha lideranças e monitora a execução.', img: '/thumb-fluxo-rh.png' },
        { role: 'Gestor', title: 'Prepara e registra com menos esforço', text: 'Reúne as avaliações e prepara a conversa em um lugar só.', img: '/thumb-fluxo-gestor.png' },
        { role: 'Colaborador', title: 'Consulta o histórico e evolui', text: 'Recebe a devolutiva e acompanha o próprio desenvolvimento.', img: '/thumb-fluxo-colab.png' },
      ].map((p, i) => (
        <Reveal key={p.role} i={3 + i} className="rounded-[24px] p-8 bg-white" style={{ boxShadow: '0 1px 2px rgb(15 23 42 / .06), 0 8px 24px rgb(15 23 42 / .06)' }}>
          <p className="text-[16px] font-semibold m-0" style={{ color: C.accent }}>{p.role}</p>
          <p className="text-[20px] font-bold leading-tight mt-2 m-0" style={{ color: C.ink }}>{p.title}</p>
          <p className="text-[16px] leading-[1.5] mt-2 mb-6" style={{ color: C.sub }}>{p.text}</p>
          <img src={p.img} alt="" className="w-full h-[250px] object-cover rounded-xl bg-white" style={{ border: `1.5px solid ${C.line}` }} />
        </Reveal>
      ))}
    </div>
  </Slide>
);

// Wireframes do Miro (SVG): a faixa ocupa a altura da área e desliza da esquerda para a direita
// mostrando o board inteiro, para e volta, em loop.
const WIRE_RATIO = 30799.58 / 8451.64;

function WireframesPan() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const imgW = size.h * WIRE_RATIO;
  const travel = Math.max(0, imgW - size.w);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <style>{`@keyframes wire-pan{0%,8%{transform:translateX(0)}50%,58%{transform:translateX(var(--travel))}100%{transform:translateX(0)}}`}</style>
      {size.h > 0 && (
        <img
          src={`${IMG}/wireframes.svg`}
          alt="Wireframes dos fluxos de RH, gestor e colaborador"
          draggable={false}
          className="absolute left-0 top-0 max-w-none select-none mix-blend-multiply"
          style={{ height: size.h, width: imgW, ['--travel' as any]: `${-travel}px`, animation: 'wire-pan 24s ease-in-out infinite' }}
        />
      )}
    </div>
  );
}

const Wireframes = () => (
  <Slide style={BOARD}>
    <Reveal i={1}><Title>Testando estrutura antes de fechar layout</Title></Reveal>
    <Reveal i={2}><Lede className="max-w-[1180px]">Com a arquitetura validada, explorei wireframes para testar alternativas de navegação e reduzir a complexidade percebida, antes de qualquer decisão visual.</Lede></Reveal>
    <Reveal i={3} className="relative mt-8 flex-1 min-h-0 -mx-[120px] -mb-[88px]"><WireframesPan /></Reveal>
  </Slide>
);

// Board da aplicação dos testes (Miro, renderizado em alta resolução com os textos): mostra o todo,
// depois zoom no RH e nas anotações, volta ao todo, zoom nos gestores e nas anotações
const TESTES_TOUR: TourStep[] = [
  { u: 0.5, v: 0.5, zoom: 1, hold: 1500 },
  { u: 0.5, v: 0.18, zoom: 2.6, label: 'Testes com o RH', hold: 3200 },
  { u: 0.2, v: 0.13, zoom: 4, label: 'Tarefas e anotações do RH', hold: 3400 },
  { u: 0.5, v: 0.5, zoom: 1, hold: 1500 },
  { u: 0.5, v: 0.55, zoom: 2.4, label: 'Testes com gestores', hold: 3200 },
  { u: 0.2, v: 0.47, zoom: 4, label: 'Tarefas e anotações dos gestores', hold: 3400 },
  { u: 0.5, v: 0.5, zoom: 1, hold: 3000 },
];

const Teste = () => (
  <Slide style={{ padding: 0 }}>
    <div className="grid grid-cols-[3fr_2fr] h-full">
      <div className="flex flex-col justify-center pl-[120px] pr-14 py-[72px]">
        <Reveal i={1}><Title size={40}>Teste de usabilidade com 12 participantes que vivem o processo</Title></Reveal>
        <Reveal i={2}><Lede className="text-[16px]">Aplicamos o teste com 12 participantes entre RH, gestores e lideranças, que navegaram por um protótipo com as jornadas de ponta a ponta.</Lede></Reveal>
        {/* Lado a lado, por perfil; cada ponto com o próprio ícone: check no que funcionou, exclamação nas melhorias */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          {[
            { title: 'O que funcionou', Icon: CheckCircle, color: '#2E7D4F', bg: '#EEF6F0', items: [
              { who: 'RH', text: 'Controle do ciclo: define início e fim e vê quem fez e quem falta' },
              { who: 'Gestor', text: 'Painel lateral com tudo sobre o colaborador no ciclo' },
              { who: 'Colaborador', text: 'Devolutiva salva na plataforma e pronta para baixar' },
            ] },
            { title: 'Oportunidades de melhoria', Icon: AlertCircle, color: '#A26D26', bg: '#FAF4EA', items: [
              { who: 'RH', text: 'Faltavam filtros e recortes' },
              { who: 'RH', text: 'Autonomia para fazer a devolutiva no lugar do gestor' },
              { who: 'Gestor', text: 'Rótulos confusos sobre o que escrever em cada campo' },
              { who: 'Gestor', text: 'Dúvidas sobre o que o colaborador consegue ver' },
            ] },
          ].map((col, i) => (
            <Reveal key={col.title} i={3 + i} className="rounded-[20px] px-6 py-5" style={{ background: col.bg }}>
              <p className="font-serif text-[16px] font-bold m-0 mb-4" style={{ color: col.color }}>{col.title}</p>
              <ul className="flex flex-col gap-4 m-0 p-0 list-none">
                {col.items.map(item => (
                  <li key={item.text} className="flex gap-2.5 text-[14px] leading-snug" style={{ color: '#4F4440' }}>
                    <col.Icon size={16} className="shrink-0 mt-[1px]" style={{ color: col.color }} />
                    <span><b className="block text-[12px] font-semibold uppercase tracking-wide mb-0.5" style={{ color: col.color }}>{item.who}</b>{item.text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
      <motion.div className="relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
        <ZoomTour src={`${IMG}/testes.webp`} width={4081} height={5164} tour={TESTES_TOUR} label="Board da aplicação dos testes com RH e gestores" />
      </motion.div>
    </div>
  </Slide>
);

const Sintese = () => (
  <Slide>
    <div className="grid grid-cols-[1fr_520px] gap-20 items-center h-full">
      <div>
        <Reveal i={1}><Title size={48}>Os testes mostraram que a síntese ainda tomava tempo</Title></Reveal>
        <Reveal i={2}><Lede>A padronização ampliou o esforço de alguns gestores: quem fazia uma preparação simples passou a ler e sintetizar mais informações.</Lede></Reveal>
        <div className="flex flex-col gap-6 mt-10">
          {[
            { Icon: CheckCircle, title: 'Ganho para RH e colaborador', text: 'Governança e histórico organizado.' },
            { Icon: Clock, title: 'Custo para alguns gestores', text: 'Uma etapa extra de leitura e síntese.' },
            { Icon: MessageSquare, title: 'Evidência decisiva', text: 'A alta liderança reforçou a falta de tempo.' },
          ].map((p, i) => <Reveal key={p.title} i={3 + i}><Point {...p} /></Reveal>)}
        </div>
      </div>
      <Reveal i={2}><SinteseGestorMotion /></Reveal>
    </div>
  </Slide>
);

const Ia = () => (
  <Slide dark>
    <div className="grid grid-cols-[440px_1fr] gap-14 h-full items-center">
      <div>
        <Reveal i={1}><Title dark size={40}>Agente de IA para ajudar o gestor</Title></Reveal>
        <Reveal i={2}><Lede dark className="text-[16px]">O problema não era só acessar os dados, era interpretá-los. Com a Gupy IA, o gestor gera a conclusão, revisa e aplica direto nos campos da devolutiva.</Lede></Reveal>
        <div className="flex flex-col gap-5 mt-9">
          {[
            { Icon: Lock, title: 'Restrição inicial', text: 'Complexidade técnica e recorte do MVP.' },
            { Icon: MessageSquare, title: 'Minha influência', text: 'Usei os testes para conquistar apoio à IA.' },
            { Icon: Bot, title: 'Decisão de produto', text: 'Síntese assistida, com revisão do gestor.' },
          ].map((p, i) => <Reveal key={p.title} i={3 + i}><Point dark {...p} /></Reveal>)}
        </div>
      </div>
      <Reveal i={2}><DevolutivaIaMotion viewH={1080} /></Reveal>
    </div>
  </Slide>
);

// Solução em dois slides: o mockup do topo do case (toggle RH / Gestor / Colaborador) com o texto,
// e depois o motion das três jornadas ocupando o slide inteiro
const Solucao = () => (
  <Slide className="items-center" style={{ paddingTop: 52, paddingBottom: 24 }}>
    <Reveal i={1} className="text-center"><Title>O ciclo completo, dentro da plataforma</Title></Reveal>
    <Reveal i={2} className="text-center"><Lede className="text-[20px] mt-3">Cada perfil com funcionalidades próprias, com as informações conectadas em uma única jornada.</Lede></Reveal>
    <Reveal i={3} className="mt-2 w-[1080px]"><DevolutivaLaptopMotion showDesc={false} /></Reveal>
  </Slide>
);

const SolucaoMotion = () => (
  <Slide className="items-center justify-center" style={{ padding: 0, background: '#0E5F55' }}>
    <motion.div className="w-[1320px] shrink-0 rounded-[18px] overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}><DevolutivaSolucaoMotion /></motion.div>
  </Slide>
);

const Resultados = () => (
  <Slide>
    <Reveal i={1}><Title>Resultados depois de um ano</Title></Reveal>
    <Reveal i={2}><Lede>Acompanhamos a funcionalidade com base em métricas do framework HEART, entre outros indicadores do produto.</Lede></Reveal>
    <div className="grid grid-cols-3 gap-6 mt-auto">
      {[
        { dim: 'Adoção', value: '~80%', label: 'dos gestores convidados fizeram a devolutiva dentro da plataforma' },
        { dim: 'Engajamento', value: '95%', label: 'de quem recebeu a devolutiva abriu o relatório; metade também baixou' },
        { dim: 'Sucesso na tarefa', value: '~70%', label: 'das devolutivas iniciadas foram enviadas no prazo do ciclo' },
        { dim: 'Esforço (CES)', value: '5 · 4', label: 'mediana de colaborador e gestor, de 1 a 5 (5 = muito fácil)' },
        { dim: 'Suporte', value: 'Zero', label: 'chamados pedindo relatório para o colaborador ou controle da etapa para o RH' },
        { dim: 'Operação do RH', value: 'Na hora', label: 'o RH sabe quem ainda não fez a devolutiva; antes levava até uma semana' },
      ].map((m, i) => (
        <Reveal key={m.dim} i={3 + i} className="rounded-[22px] px-8 py-7" style={{ border: `1.5px solid ${C.line}` }}>
          <p className="text-[16px] m-0" style={{ color: C.accent }}>{m.dim}</p>
          <p className="font-serif text-[40px] font-bold leading-tight tracking-tight mt-1 m-0" style={{ color: C.ink }}><CountUpText text={m.value} /></p>
          <p className="text-[16px] leading-snug mt-2 m-0" style={{ color: C.sub }}>{m.label}</p>
        </Reveal>
      ))}
    </div>
    <Reveal i={9}><p className="text-[14px] mt-5 m-0" style={{ color: C.soft }}>Eventos do fluxo em um ano de uso (percentuais aproximados). CES: 1º semestre de 2025, 26 colaboradores e 58 gestores.</p></Reveal>
  </Slide>
);

// Os três números da IA: quantos gestores usaram, quanto editaram o texto e a nota do resultado
function IaStat({ title, note, children }: { title: string; note: string; children: any }) {
  return (
    <div className="rounded-[20px] px-7 py-6" style={{ border: `1.5px solid ${C.line}` }}>
      <p className="text-[20px] font-bold m-0" style={{ color: C.ink }}>{title}</p>
      <div className="mt-3">{children}</div>
      <p className="text-[14px] mt-2.5 m-0" style={{ color: C.sub }}>{note}</p>
    </div>
  );
}

const PEOPLE = 12;
const USED = 8; // ~2/3

// Metade branca com os números da IA e metade creme com as falas; os títulos começam na mesma altura
const IaApoio = () => (
  <Slide style={{ padding: 0 }}>
    <div className="grid grid-cols-2 h-full">
      <div className="flex flex-col gap-8 px-[96px] pt-[112px]">
        <Reveal i={1}><Title size={40}>Uso do agente de IA pelos gestores</Title></Reveal>
        <div className="flex flex-col gap-4">
        <Reveal i={2}>
          <IaStat title="Gestores que usaram a IA" note="Em média, 2 de cada 3 gestores abriram a conclusão gerada pela IA">
            <div className="flex gap-1.5">
              {Array.from({ length: PEOPLE }, (_, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }} style={{ color: i < USED ? C.accent : '#E7D3C8' }}>
                  <PersonIcon size={34} weight="fill" />
                </motion.span>
              ))}
            </div>
          </IaStat>
        </Reveal>
        <Reveal i={3}>
          <IaStat title="Como usaram o texto da IA" note="A devolutiva continua sendo do gestor: quase todos adaptaram o texto">
            <div className="flex h-5 rounded-full overflow-hidden">
              <motion.span style={{ background: C.accent }} initial={{ width: 0 }} animate={{ width: '10%' }} transition={{ duration: 0.8, delay: 0.9, ease }} />
              <span className="flex-1" style={{ background: '#E7D3C8' }} />
            </div>
            <div className="flex gap-8 mt-3 text-[14px]" style={{ color: C.sub }}>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: C.accent }} /> ~10% enviaram sem editar</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: '#E7D3C8' }} /> ~90% adaptaram o texto</span>
            </div>
          </IaStat>
        </Reveal>
        <Reveal i={4}>
          <IaStat title="Satisfação com o resultado da IA" note="Começou perto de 3: o tom ainda era formal demais, e foi ajustado nas versões seguintes">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map(n => (
                  <motion.span key={n} className="block w-14 h-5 rounded-full" style={{ background: n <= 3 ? C.accent : '#E7D3C8' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 1.1 + n * 0.08 }} />
                ))}
              </div>
              <span className="font-serif text-[24px] font-bold" style={{ color: C.ink }}>~3<span className="text-[16px] font-sans font-semibold" style={{ color: C.sub }}> / 5</span></span>
            </div>
          </IaStat>
        </Reveal>
      </div>

      </div>

      <div className="flex flex-col gap-8 px-[96px] pt-[112px]" style={{ background: C.cream }}>
        <Reveal i={1}><Title size={40}>O que os usuários disseram</Title></Reveal>
        <div className="flex flex-col gap-14 mt-6">
          {[
            { quote: 'Agora eu consigo saber quem cobrar. Eu não tinha essa informação antes, posso ir direto na pessoa.', who: 'RH de cliente' },
            { quote: 'Eu demorava duas semanas para fazer as devolutivas. Na última avaliação, consegui fazer em poucos dias, de 3 a 4 dias.', who: 'Gestor de cliente' },
            { quote: 'É muito bom ter um material padronizado, que eu não tinha antes.', who: 'Colaborador' },
          ].map((q, i) => (
            <Reveal key={q.quote} i={2 + i} className="pl-6" style={{ borderLeft: `3px solid ${C.accent}` }}>
              <p className="font-serif text-[24px] font-semibold leading-snug m-0" style={{ color: C.ink }}>“{q.quote}”</p>
              <p className="text-[14px] mt-3 m-0" style={{ color: C.sub }}>{q.who}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </Slide>
);

// Cases citados como exemplo no bloco do processo: o link abre o case e o hover mostra a seção do case
// em que aquilo foi feito (título, texto e a imagem ou o motion da seção)
// focus: aproxima a conversa com a IA no print (x = posição horizontal do chat, em %), rola um pouco e volta
type CaseRef = { name: string; href: string; title: string; text: string; img?: string; Motion?: () => any; focus?: { x: number } };
const REFS: Record<string, CaseRef> = {
  dashSintese: { name: 'Dashboard de Admissão', href: '/project/dashboard-admissao#discovery', title: 'Centenas de registros, uma direção clara', text: 'Consolidei solicitações históricas de clientes, feedbacks de CS e demandas de Produto. Com o NotebookLM, organizei esse volume, identifiquei padrões recorrentes e transformei informação dispersa em prioridade.', img: dashDiscoveryImg },
  kbaSintese: { name: 'KBA', href: '/project/kba-senha#discovery', title: 'A recuperação de conta era só o sintoma', text: 'Analisei tickets de suporte, sessões do Hotjar, dados do Google Analytics e benchmarks para entender onde as pessoas travavam na jornada de acesso.', img: kbaDiscoveryImg },
  dashVibe: { name: 'Dashboard de Admissão', href: '/project/dashboard-admissao#prototipacao', title: 'Usando IA para gerar a evolução do produto em média fidelidade', text: 'Usei o Google AI Studio para gerar versões navegáveis do produto em minutos. Cada versão testava uma hipótese e era iterada durante os workshops.', Motion: VersoesPrototipoMotion },
  adminVibe: { name: 'Admin Global', href: '/project/admin-global-docs#ia-aceleradora', title: 'Explorando caminhos rapidamente', text: 'Com o Google AI Studio, explorei possibilidades de arquitetura da informação e transformei ideias em wireframes em poucos minutos, sem várias iterações manuais no Figma.', img: adminAiStudioImg, focus: { x: 0 } },
  adminHandoff: { name: 'Admin Global', href: '/project/admin-global-docs#ia-aceleradora', title: 'Aproximando Design e Engenharia', text: 'Depois da validação, usei o Cursor para transformar parte das decisões de interface em código funcional, em vez de só especificações tradicionais.', img: adminCursorImg, focus: { x: 16 } },
  dashHandoff: { name: 'Dashboard de Admissão', href: '/project/dashboard-admissao#handoff', title: 'Telas funcionais e cenários de estresse', text: 'Com o Cursor integrado ao MCP do Figma e ao Storybook, construí telas próximas do produto real e desenhei grandes volumes de dados, indisponibilidade e erros.', img: dashHandoffImg, focus: { x: 16 } },
};
type RefKey = keyof typeof REFS;
type EvolucaoItem = { Icon: any; title: string; text: string; cases?: RefKey[]; demo?: boolean };

// O balão abre logo acima do link; no card da direita ele alinha pela direita para caber no palco
function CaseLink({ r, alignRight }: { r: CaseRef; alignRight: boolean; key?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <a href={r.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[14px] font-semibold underline underline-offset-4" style={{ color: C.accent }}>
        {r.name} <ArrowUpRight size={14} />
      </a>
      <AnimatePresence>
        {open && (
          <motion.span
            className={`absolute bottom-full mb-2 z-30 block w-[780px] rounded-[24px] overflow-hidden bg-white pointer-events-none ${alignRight ? 'right-0' : '-left-4'}`}
            style={{ boxShadow: `0 0 0 1.5px ${C.line}, 0 24px 60px rgb(15 23 42 / .22)` }}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.22, ease }}
          >
            <span className="block px-8 pt-7 pb-6">
              <span className="block text-[14px] font-semibold uppercase tracking-wide" style={{ color: C.accent }}>{r.name}</span>
              <span className="block font-serif text-[28px] font-bold leading-snug mt-1" style={{ color: C.ink }}>{r.title}</span>
              <span className="block text-[20px] leading-[1.5] mt-2" style={{ color: C.sub }}>{r.text}</span>
            </span>
            <span className="block h-[360px] overflow-hidden" style={{ background: C.cream }}>
              {r.Motion ? <span className="block origin-top-left scale-[0.75] w-[133.34%]"><r.Motion /></span> : r.focus ? (
                <motion.span
                  className="block"
                  style={{ transformOrigin: `${r.focus.x}% 0%` }}
                  initial={{ scale: 1, y: 0 }}
                  animate={{ scale: [1, 1, 2, 2, 2, 2, 2, 1], y: [0, 0, 0, 0, -260, -260, 0, 0] }}
                  transition={{ duration: 9, times: [0, 0.08, 0.2, 0.28, 0.55, 0.63, 0.85, 1], ease: 'easeInOut', repeat: Infinity }}
                >
                  <img src={r.img} alt="" className="block w-full h-auto" />
                </motion.span>
              ) : <img src={r.img} alt="" className="w-full h-full object-cover object-top" />}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

// Os cards do processo ganham fundo creme para se diferenciar dos cards do produto (só contorno)
function EvolucaoCard({ c, last, filled }: { c: EvolucaoItem; last: boolean; filled: boolean; key?: string }) {
  return (
    <div className="rounded-[20px] px-6 py-6 flex flex-col" style={filled ? { background: C.cream } : { border: `1.5px solid ${C.line}` }}>
      <span className="flex items-center justify-center w-10 h-10 rounded-full" style={{ background: filled ? '#fff' : C.cream, color: C.accent }}><c.Icon size={20} /></span>
      <p className="text-[20px] font-bold mt-4 m-0" style={{ color: C.ink }}>{c.title}</p>
      <p className="text-[16px] leading-[1.5] mt-1 m-0" style={{ color: C.sub }}>{c.text}</p>
      {c.cases && (
        <div className="mt-auto pt-5">
          <p className="text-[12px] font-semibold uppercase tracking-wide m-0 mb-1.5" style={{ color: C.soft }}>Como fiz em</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">{c.cases.map(k => <CaseLink key={k} r={REFS[k]} alignRight={last} />)}</div>
        </div>
      )}
      {c.demo && (
        <a href={`${IMG}/redesign/redesign.html`} className="self-start inline-flex items-center gap-1.5 rounded-full px-4 py-2 mt-4 text-[14px] font-semibold text-white no-underline" style={{ background: C.accent }}>
          Ver versão <ArrowUpRight size={15} />
        </a>
      )}
    </div>
  );
}

// Dois blocos: o que mudaria no produto (Hotjar, entrevistas e roadmap) e no processo (IA no desenvolvimento)
const EVOLUCAO: { label: string; desc: string; items: EvolucaoItem[] }[] = [
  {
    label: 'Evoluções no produto', desc: 'Com os dados colhidos após o lançamento, validaria melhorias que já estavam no radar e outras que a IA ajudaria a viabilizar.',
    items: [
      { Icon: Layers, title: 'Novas fontes', text: 'Feedbacks, comitês e outros sinais.' },
      { Icon: SlidersHorizontal, title: 'Recortes do RH', text: 'Áreas, setores e responsáveis.' },
      { Icon: Compass, title: 'IA aplicada ao produto', text: 'Recomendações para o colaborador e para o RH.' },
      { Icon: LayoutGrid, title: 'Hierarquia visual', text: 'Orientar a leitura e a decisão.' },
    ],
  },
  {
    label: 'Mais IA durante o processo', desc: 'Traria mais agentes para me apoiar em etapas do desenvolvimento, não só como agente dentro do produto.',
    items: [
      { Icon: ScanSearch, title: 'IA para síntese', text: 'Conversar com a massa de pesquisas para entender e destacar os problemas.', cases: ['dashSintese', 'kbaSintese'] },
      { Icon: Lightbulb, title: 'Mais ideias via vibe code', text: 'Explorar mais alternativas em protótipos de código.', cases: ['dashVibe', 'adminVibe'] },
      { Icon: Code, title: 'Handoff via código', text: 'Entregar uma versão de código e visual pronta para o desenvolvimento.', cases: ['adminHandoff', 'dashHandoff'], demo: true },
    ],
  },
];

const Evolucao = () => (
  <Slide className="justify-center">
    <Reveal i={1}><Title size={48}>Melhorias que eu faria hoje no projeto</Title></Reveal>
    <div className="flex flex-col gap-8 mt-12">
      {EVOLUCAO.map((b, bi) => (
        <div key={b.label} className="grid grid-cols-[240px_1fr] gap-8 items-stretch">
          <Reveal i={2 + bi * 2} className="pt-2">
            <p className="text-[24px] font-bold m-0" style={{ color: C.ink }}>{b.label}</p>
            <p className="text-[16px] leading-[1.5] mt-2 m-0" style={{ color: C.sub }}>{b.desc}</p>
          </Reveal>
          <Reveal i={3 + bi * 2} className={`grid gap-4 ${b.items.length === 4 ? 'grid-cols-4' : 'grid-cols-3'}`}>
            {b.items.map((c, ci) => <EvolucaoCard key={c.title} c={c} last={ci === b.items.length - 1} filled={bi === 1} />)}
          </Reveal>
        </div>
      ))}
    </div>
  </Slide>
);

const Atuacao = () => (
  <Slide dark className="justify-center">
    <Reveal i={1}><Title dark size={48}>Atuei de ponta a ponta, do Discovery à<br />priorização pós-lançamento</Title></Reveal>
    <div className="grid grid-cols-3 gap-10 mt-20">
      {[
        { Icon: Pencil, title: 'Definição da experiência', text: 'Conduzi a jornada e as escolhas de design.' },
        { Icon: MessageSquare, title: 'Influência com evidências', text: 'Conquistei apoio para a síntese por IA.' },
        { Icon: Users, title: 'Priorização conjunta', text: 'Orientei a evolução com Produto, Engenharia e o time de IA.' },
      ].map((p, i) => <Reveal key={p.title} i={3 + i}><Point dark stacked {...p} /></Reveal>)}
    </div>
    <Reveal i={6} className="mt-24"><p className="text-[16px] font-semibold m-0" style={{ color: '#F4EFEB' }}>Ferramentas e métodos usados</p></Reveal>
    <Reveal i={7} className="flex flex-wrap gap-3 mt-5">
      {['Discovery', 'Facilitação de CSD', 'Benchmark competitivo', 'Mapeamento de jornada', 'Priorização GUT', 'Arquitetura de experiência', 'Wireframes', 'Testes de usabilidade', 'Design de IA aplicada'].map(m => (
        <span key={m} className="rounded-full px-5 py-2.5 text-[16px]" style={{ border: '1px solid rgb(255 255 255 / .18)', color: '#E8DED7' }}>{m}</span>
      ))}
    </Reveal>
  </Slide>
);

const Aprendizados = () => (
  <Slide className="justify-center">
    <Reveal i={1}><Title size={48}>Aprendizados que eu levo deste projeto</Title></Reveal>
    <div className="mt-12">
      {[
        { title: 'Discovery não é começar do zero', text: 'Consolidar pesquisas existentes acelerou o entendimento sem repetir o que já estava validado.' },
        { title: 'O desafio era comportamental', text: 'Gestores só trocam processos que funcionam quando percebem ganho logo no primeiro uso.' },
        { title: 'IA deve potencializar, não decidir', text: 'Ela reduz o esforço de análise; a conversa e a decisão continuam com o gestor.' },
        { title: 'Fechar o ciclo importa tanto quanto abrir', text: 'O resultado não foi uma tela nova, foi conectar uma etapa que estava solta.' },
      ].map((a, i) => (
        <Reveal key={a.title} i={2 + i} className="flex items-baseline gap-6 py-6" style={{ borderBottom: i < 3 ? `1.5px solid ${C.line}` : 'none' }}>
          <span className="text-[16px] font-semibold tabular-nums" style={{ color: C.accent }}>0{i + 1}</span>
          <p className="text-[20px] leading-snug m-0"><b style={{ color: C.ink }}>{a.title}.</b> <span style={{ color: C.sub }}>{a.text}</span></p>
        </Reveal>
      ))}
    </div>
  </Slide>
);

// Outros cases: o mesmo motion da thumb da Home e o que cada um mostra sobre IA no processo
const OUTROS = [
  {
    Motion: DashboardThumbMotion, bg: '#F1F2F6', dark: false, motionProps: {}, kicker: 'Gupy · 2025', title: 'Redesenhando o Dashboard de Admissão',
    points: ['IA na compilação das pesquisas e na síntese dos testes com clientes', 'Protótipos de média fidelidade gerados e evoluídos no AI Studio', 'Um dos primeiros projetos entregues via GitHub, com handoff em código pelo Cursor'],
  },
  {
    Motion: MindiThumbMotion, bg: '#484AAC', dark: true, motionProps: { stageW: 820, phoneTop: 0, showNav: false }, kicker: 'Projeto pessoal · no ar na App Store', title: 'Lançando um app do zero na App Store usando IA',
    points: ['Na Gupy, cheguei a entregar código muito próximo do que ia para o desenvolvimento', 'No Mindi, desenvolvi o app de verdade e publiquei na App Store com o Claude Code', 'Revisei segurança, dados e publicação de ponta a ponta'],
  },
];

// Card na cor da thumb: tag e título em cima, motion embaixo. Com o mouse, sobe uma barra de vidro
// fosco com os diferenciais do case.
function OutroCaseCard({ c, i }: { c: typeof OUTROS[number]; i: number; key?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal i={2 + i} className="relative h-[620px] rounded-[28px] overflow-hidden" style={{ background: c.bg }}>
      <div className="absolute inset-0" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        <div className="relative z-10 px-10 pt-9">
          <p className="text-[14px] font-semibold m-0" style={{ color: c.dark ? 'rgb(255 255 255 / .75)' : C.accent }}>{c.kicker}</p>
          <p className="text-[32px] font-bold leading-tight tracking-tight mt-2 m-0 max-w-[560px]" style={{ color: c.dark ? '#fff' : C.ink }}>{c.title}</p>
        </div>
        <div className="absolute inset-0 top-[184px] left-10"><c.Motion active {...(c.motionProps || {})} /></div>
        <motion.div
          className="absolute left-4 right-4 bottom-4 z-20 rounded-[22px] px-8 pt-6 pb-7"
          style={{ background: 'rgb(255 255 255 / .72)', backdropFilter: 'blur(18px) saturate(1.4)', WebkitBackdropFilter: 'blur(18px) saturate(1.4)', boxShadow: '0 0 0 1px rgb(255 255 255 / .6) inset, 0 20px 50px rgb(15 23 42 / .18)' }}
          initial={false}
          animate={{ y: open ? 0 : '115%', opacity: open ? 1 : 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <p className="text-[14px] font-semibold m-0" style={{ color: C.accent }}>Diferenciais do case</p>
          <ul className="mt-3 m-0 p-0 list-none space-y-2.5">
            {c.points.map(pt => (
              <li key={pt} className="flex gap-3 text-[16px] leading-snug" style={{ color: C.ink }}>
                <span className="mt-[8px] w-1.5 h-1.5 rounded-full shrink-0" style={{ background: C.accent }} />{pt}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Reveal>
  );
}

const OutrosCases = () => (
  <Slide>
    <Reveal i={1}><Title size={40}>Outros cases: a IA cada vez mais perto da entrega</Title></Reveal>
    <div className="grid grid-cols-2 gap-8 mt-auto">
      {OUTROS.map((c, i) => <OutroCaseCard key={c.title} c={c} i={i} />)}
    </div>
  </Slide>
);

// O mesmo fluxo animado dos cases (Figma → AI Studio → Figma → Cursor → GitHub → time de desenvolvimento)
const FluxoIa = () => (
  <Slide className="justify-center" style={{ background: '#F1EEEA' }}>
    <Reveal i={1}><Title size={48}>Do Figma ao código com IA</Title></Reveal>
    <Reveal i={2}><Lede className="max-w-[1100px]">A IA encurtou a distância entre design e código: um protótipo rápido no Google AI Studio para validar a ideia, ajustes no Figma e o Cursor conectado ao MCP do Design System para gerar telas reais, que seguiram pelo GitHub direto para o time de desenvolvimento.</Lede></Reveal>
    <Reveal i={3} className="mt-8 w-full"><AiWorkflowDiagram wide /></Reveal>
  </Slide>
);

const Obrigado = () => (
  <Slide dark className="justify-center items-center text-center">
    <Reveal><Title dark size={96}>Obrigado!</Title></Reveal>
    <Reveal i={1}><Lede dark className="text-[20px]">viniciustamy.com.br</Lede></Reveal>
  </Slide>
);

export const SLIDES: { id: string; Comp: () => any }[] = [
  { id: 'sobre-mim', Comp: SobreMim },
  { id: 'capa', Comp: Capa },
  { id: 'por-que', Comp: PorQue },
  { id: 'desafio', Comp: Desafio },
  { id: 'alinhamento', Comp: Alinhamento },
  { id: 'pesquisas', Comp: Pesquisas },
  { id: 'mapa', Comp: Mapa },
  { id: 'problemas', Comp: Problemas },
  { id: 'jornadas', Comp: Jornadas },
  { id: 'wireframes', Comp: Wireframes },
  { id: 'solucao', Comp: Solucao },
  { id: 'teste', Comp: Teste },
  { id: 'sintese', Comp: Sintese },
  { id: 'ia', Comp: Ia },
  { id: 'solucao-motion', Comp: SolucaoMotion },
  { id: 'impacto', Comp: Impacto },
  { id: 'resultados', Comp: Resultados },
  { id: 'ia-apoio', Comp: IaApoio },
  { id: 'evolucao', Comp: Evolucao },
  { id: 'fluxo-ia', Comp: FluxoIa },
  { id: 'atuacao', Comp: Atuacao },
  // { id: 'aprendizados', Comp: Aprendizados }, // oculto por tempo de apresentação
  { id: 'outros-cases', Comp: OutrosCases },
  { id: 'obrigado', Comp: Obrigado },
];

// ---------- Timer da apresentação ----------

// Contagem regressiva em minutos (15, 20 ou 25): mostra só os minutos que faltam, com um anel de progresso.
// Começa parado; play/pausa e reiniciar. Nos 2 últimos minutos fica em terracota.
const DURATIONS = [15, 20, 25, 30];

function PresentationTimer() {
  const [duration, setDuration] = useState(15);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0); // segundos já corridos
  const startRef = useRef<number | null>(null);
  const baseRef = useRef(0);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu de duração ao clicar fora
  useEffect(() => {
    if (!menu) return;
    const close = (e: PointerEvent) => { if (!menuRef.current?.contains(e.target as Node)) setMenu(false); };
    window.addEventListener('pointerdown', close);
    return () => window.removeEventListener('pointerdown', close);
  }, [menu]);

  useEffect(() => {
    if (!running) return;
    startRef.current = Date.now();
    const tick = () => setElapsed(baseRef.current + (Date.now() - (startRef.current as number)) / 1000);
    tick();
    const t = setInterval(tick, 1000);
    return () => { clearInterval(t); baseRef.current += (Date.now() - (startRef.current as number)) / 1000; };
  }, [running]);

  const total = duration * 60;
  const left = Math.max(0, total - elapsed);
  const minutes = Math.ceil(left / 60);
  const done = left <= 0 && elapsed > 0;
  const urgent = !done && running && minutes <= 2;
  const started = elapsed > 0;
  useEffect(() => { if (done) setRunning(false); }, [done]);

  const reset = () => { setRunning(false); baseRef.current = 0; setElapsed(0); };
  const pick = (d: number) => { setDuration(d); reset(); setMenu(false); };
  const R = 15;
  const C = 2 * Math.PI * R;
  const color = done || urgent ? '#E0A889' : '#fff';

  return (
    <div className="flex items-center gap-2">
      {/* O círculo do timer abre as durações; escolher uma fecha o menu e reinicia a contagem */}
      <div ref={menuRef} className="relative">
        <button type="button" onClick={() => setMenu(v => !v)} className="relative flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-white/10" title={`${minutes} min restantes · trocar a duração`} aria-haspopup="menu" aria-expanded={menu} aria-label="Duração da apresentação">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r={R} fill="none" stroke="rgb(255 255 255 / .15)" strokeWidth="3" />
            <circle cx="20" cy="20" r={R} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - left / total)} style={{ transition: 'stroke-dashoffset 1s linear' }} />
          </svg>
          <span className="text-[12px] font-bold tabular-nums" style={{ color }}>{done ? '0' : minutes}</span>
        </button>
        <AnimatePresence>
          {menu && (
            <motion.div role="menu" className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex flex-col p-1 rounded-[14px] bg-[#2E211B] shadow-[0_12px_32px_rgb(0_0_0_/_.4)] ring-1 ring-white/10"
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.15 }}>
              {DURATIONS.map(d => (
                <button key={d} type="button" role="menuitemradio" aria-checked={duration === d} onClick={() => pick(d)}
                  className={`px-4 h-8 rounded-[10px] text-[12px] font-semibold whitespace-nowrap cursor-pointer transition-colors ${duration === d ? 'bg-white text-[#241510]' : 'text-white/75 hover:bg-white/10 hover:text-white'}`}>{d} min</button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <span className="text-[12px] whitespace-nowrap" style={{ color: done || urgent ? '#E0A889' : undefined }}>{done ? 'Tempo esgotado' : started ? 'min restantes' : 'min'}</span>
      <button type="button" onClick={() => setRunning(v => !v)} disabled={done} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 cursor-pointer disabled:opacity-30" aria-label={running ? 'Pausar timer' : 'Iniciar timer'}>{running ? <Pause size={16} /> : <Play size={16} />}</button>
      {started && <button type="button" onClick={reset} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 cursor-pointer" aria-label="Reiniciar timer"><RotateCcw size={15} /></button>}
    </div>
  );
}

// ---------- Apresentação ----------

export default function DevolutivaDeck({ onClose, startAt }: { onClose: () => void; startAt?: string | null; key?: string }) {
  const [index, setIndex] = useState(() => Math.max(0, SLIDES.findIndex(s => s.id === startAt)));
  const [dir, setDir] = useState(1);
  const [scale, setScale] = useState(0);
  const [full, setFull] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const go = useCallback((d: number) => {
    setDir(d);
    setIndex(i => Math.min(SLIDES.length - 1, Math.max(0, i + d)));
  }, []);

  // Palco escalado para caber na tela; fora da tela cheia, reserva a faixa dos controles embaixo
  useLayoutEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / W, (window.innerHeight - (full ? 0 : 64)) / H));
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [full]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !document.fullscreenElement) onClose();
      else if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); go(1); }
      else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); go(-1); }
      else if (e.key === 'Home') { setDir(-1); setIndex(0); }
      else if (e.key === 'End') { setDir(1); setIndex(SLIDES.length - 1); }
    };
    let lastWheel = 0;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 30 || Date.now() - lastWheel < 700) return;
      lastWheel = Date.now();
      go(e.deltaY > 0 ? 1 : -1);
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    const onFs = () => setFull(!!document.fullscreenElement);
    window.addEventListener('keydown', onKey);
    document.addEventListener('fullscreenchange', onFs);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', onWheel);
      document.removeEventListener('fullscreenchange', onFs);
      document.body.style.overflow = overflow;
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
  }, [go, onClose]);

  const toggleFull = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else rootRef.current?.requestFullscreen?.().catch(() => {});
  };

  const { Comp, id } = SLIDES[index];

  return createPortal(
    <motion.div
      ref={rootRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center select-none font-sans"
      style={{ background: '#140D0A' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Apresentação do case"
    >
      {/* Progresso */}
      <span className="absolute left-0 top-0 h-[3px] transition-[width] duration-500" style={{ width: `${((index + 1) / SLIDES.length) * 100}%`, background: '#E0A889' }} />

      {scale > 0 && (
        <div className={`relative overflow-hidden ${full ? '' : 'rounded-[6px]'}`} style={{ width: W * scale, height: H * scale }}>
          <div className="absolute inset-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${scale})` }}>
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.div
                key={id}
                className="absolute inset-0"
                initial={{ opacity: 0, y: 70 * dir }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -70 * dir }}
                transition={{ duration: 0.35, ease }}
              >
                <Comp />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Controles: numa faixa embaixo do slide; na tela cheia, o timer fica no canto inferior esquerdo
          sobre o slide e a navegação no centro, visível só com o mouse em cima (o timer não remonta) */}
      <div className={full ? 'contents' : 'flex items-center gap-2 h-[64px] text-white/80'}>
        <div className={full ? 'absolute left-5 bottom-5 z-10 rounded-full bg-[#140D0A]/70 backdrop-blur px-3 py-1 text-white/85' : ''}>
          <PresentationTimer />
        </div>
        {!full && <span className="w-px h-5 bg-white/15 mx-2" />}
        <div className={full ? 'absolute bottom-0 left-1/2 -translate-x-1/2 z-10 px-10 pb-5 pt-10 opacity-0 hover:opacity-100 transition-opacity duration-200' : 'contents'}>
        <div className={full ? 'flex items-center gap-2 rounded-full bg-[#140D0A]/70 backdrop-blur px-2 py-1 text-white/85' : 'contents'}>
        <button type="button" onClick={() => go(-1)} disabled={index === 0} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 disabled:opacity-30 cursor-pointer disabled:cursor-default" aria-label="Slide anterior"><ChevronUp size={20} /></button>
        <span className="text-[12px] tabular-nums w-16 text-center">{index + 1} / {SLIDES.length}</span>
        <button type="button" onClick={() => go(1)} disabled={index === SLIDES.length - 1} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 disabled:opacity-30 cursor-pointer disabled:cursor-default" aria-label="Próximo slide"><ChevronDown size={20} /></button>
        <span className="w-px h-5 bg-white/15 mx-2" />
        <button type="button" onClick={toggleFull} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 cursor-pointer" aria-label={full ? 'Sair da tela cheia' : 'Tela cheia'}>{full ? <Minimize size={17} /> : <Maximize size={17} />}</button>
        {!full && <button type="button" onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 cursor-pointer" aria-label="Fechar apresentação"><X size={19} /></button>}
        </div>
        </div>
      </div>
    </motion.div>,
    document.body,
  );
}

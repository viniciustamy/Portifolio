import { Link } from 'react-router-dom';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { Bot, BrainCircuit, ChartColumn, ChevronRight, Download, Shapes } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useProjects, ProjectData } from '../context/ProjectsContext';
import { motion } from 'motion/react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useCardFocus } from '../hooks/useCardFocus';
import { DevolutivaThumbMotion } from '../components/DevolutivaThumbMotion';
import { DashboardThumbMotion } from '../components/DashboardThumbMotion';
import { AdminThumbMotion } from '../components/AdminThumbMotion';
import { KbaThumbMotion } from '../components/KbaThumbMotion';
import { SocialLinks } from '../components/SocialLinks';

// Currículo em public/curriculo.pdf; baixa com o nome abaixo
const RESUME_URL = '/curriculo.pdf';
const RESUME_FILENAME = 'Curriculo-Vinicius-Tamy.pdf';

// Posição do scroll da coluna direita, para voltar no mesmo ponto ao sair de um projeto
const SCROLL_KEY = 'home-content-scroll';

// Cor de fundo escura pede texto claro
function isDark(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b < 150;
}

// Ícone de cada card de "Outros trabalhos"
const workIcons: Record<string, LucideIcon> = {
  'ia-dia-dia': BrainCircuit,
  'framework-dynamics': Shapes,
  'orquestracao-agentes': Bot,
  'analise-metricas': ChartColumn,
};

// Thumbs animadas dos cases: tocam só enquanto o card está em foco (ver useCardFocus)
const caseMotions: Record<string, typeof DevolutivaThumbMotion> = {
  devolutiva: DevolutivaThumbMotion,
  'dashboard-admissao': DashboardThumbMotion,
  'admin-global-docs': AdminThumbMotion,
  'kba-senha': KbaThumbMotion,
};

// Anel branco + sombra suave; no hover só a capa interna (.card-cover) cresce — ver index.css
const cardFrame = 'card-interactive';

// Outros trabalhos e artigos: só o tempo de leitura abaixo do título
function ProjectMeta({ project, tagColor }: { project: ProjectData; tagColor: string }) {
  if (!project.readingTime) return null;
  return <p className={`text-[13px] whitespace-nowrap ${tagColor}`}>{project.readingTime}</p>;
}

// Case: card largo, fundo pintado com a cor predominante da thumbnail, título à esquerda e imagem à direita
// (no mobile, título em cima e o motion embaixo, colado na base)
// (`key` declarado nos cards porque o projeto não tem @types/react instalado)
function CaseCard({ project }: { project: ProjectData; key?: string }) {
  const thumbBg = project.thumbnail ? project.thumbBg : undefined;
  const lightText = thumbBg ? isDark(thumbBg) : false;
  const textColor = thumbBg ? (lightText ? 'text-white' : 'text-[#241510]') : project.textColor;
  const tagColor = thumbBg ? (lightText ? 'text-white/75' : 'text-[#6F625B]') : project.tagColor;
  const ThumbMotion = caseMotions[project.id];
  const [cardRef, focused] = useCardFocus<HTMLAnchorElement>();

  return (
    <Link
      ref={cardRef}
      data-snap="center"
      to={`/project/${project.id}`}
      className={`block w-full shrink-0 ${thumbBg ? 'h-[105vw]' : 'h-[60vw]'} md:h-[500px] min-h-[260px] lg:snap-center lg:snap-always ${thumbBg ? '' : project.bg} rounded-2xl relative overflow-hidden group ${cardFrame} ${thumbBg ? 'grid grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[2fr_3fr]' : 'flex flex-col justify-end p-6 lg:p-8'}`}
      style={thumbBg ? { backgroundColor: thumbBg } : undefined}
    >
      {thumbBg && (
        <div className="row-start-2 md:row-start-1 md:col-start-2 relative min-w-0 min-h-0">
          {/* Respiro em cima e à esquerda; a tela continua saindo pelas bordas da direita e de baixo (no mobile, colada na base do card) */}
          <div className="absolute inset-0 md:top-16 md:left-6">
            {ThumbMotion ? (
              <ThumbMotion active={focused} />
            ) : (
              <img
                src={project.thumbnail}
                alt=""
                className="card-cover absolute inset-0 w-full h-full object-contain object-right-bottom origin-bottom-right"
              />
            )}
          </div>
        </div>
      )}
      <div className={`relative z-10 ${thumbBg ? 'row-start-1 md:col-start-1 md:self-end p-6 pb-5 md:pl-10 md:pb-10 xl:pl-12 xl:pb-12 md:pr-4' : ''} ${textColor}`}>
        {/* Tempo de leitura em cima, título e a descrição curta do case embaixo */}
        {/* Tempo de leitura discreto (menor e mais leve) para destacar título e descrição */}
        {project.readingTime && <p className={`text-[13px] font-normal mb-2 opacity-80 ${tagColor}`}>{project.readingTime}</p>}
        <h3 className="font-sans text-[30px] xl:text-[38px] font-semibold tracking-tight leading-[1.08] mb-2.5">
          {project.title}
        </h3>
        <p className="text-[16px] font-medium opacity-90">{project.tag}</p>
      </div>
    </Link>
  );
}

// Outros trabalhos: card neutro e compacto, dois por linha, ícone acima do título
function WorkCard({ project }: { project: ProjectData; key?: string }) {
  const Icon = workIcons[project.id] ?? BrainCircuit;
  return (
    <Link
      to={`/project/${project.id}`}
      className={`group block w-full h-[180px] md:h-[190px] bg-[#FAF9F7] text-[#241510] rounded-2xl p-5 flex flex-col justify-end relative overflow-hidden ${cardFrame}`}
    >
      <Icon size={24} strokeWidth={1.5} className="card-cover mb-3 text-[#6F625B] origin-bottom-left" />
      <h3 className="font-sans text-base xl:text-lg font-semibold tracking-tight leading-tight mb-1.5">
        {project.title}
      </h3>
      <ProjectMeta project={project} tagColor="text-[#6F625B]" />
    </Link>
  );
}

// Artigo: linha compacta
function ArticleCard({ project }: { project: ProjectData; key?: string }) {
  return (
    <Link
      to={`/project/${project.id}`}
      className={`group flex items-center justify-between gap-6 w-full px-6 py-5 bg-[#FAF9F7] rounded-2xl text-[#241510] ${cardFrame}`}
    >
      <div className="min-w-0">
        <h3 className="font-sans text-base md:text-lg font-semibold tracking-tight leading-tight mb-1.5">
          {project.title}
        </h3>
        <ProjectMeta project={project} tagColor="text-[#6F625B]" />
      </div>
      <ChevronRight size={20} className="card-cover shrink-0 text-[#9E4322]" />
    </Link>
  );
}

function SectionTitle({ title, description }: { title: string; description?: string }) {
  return (
    <h2 className="text-[15px] leading-snug text-[#6F625B] mb-4">
      <span className="font-bold text-[#241510]">{title}</span>
      {description && <span>. {description}</span>}
    </h2>
  );
}

export default function Home() {
  useDocumentTitle('Início');
  const { projects } = useProjects();
  const cases = projects.slice(0, 4);
  const works = projects.slice(4, 8);
  const articles = projects.slice(8);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll assistido (desktop): cada gesto da roda/trackpad avança ou volta exatamente uma parada —
  // topo, o centro de cada case (marcados com data-snap), o início de "Outros trabalhos" e o fim da página
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !window.matchMedia('(min-width: 1024px)').matches) return;

    let lastWheel = 0;
    let lastDir = 0;
    let target: number | null = null; // parada para onde a rolagem está indo
    let settleTimer: number | undefined;

    const stops = () => {
      const base = el.getBoundingClientRect().top - el.scrollTop;
      const max = el.scrollHeight - el.clientHeight;
      const points = [0, max];
      el.querySelectorAll<HTMLElement>('[data-snap]').forEach(node => {
        const r = node.getBoundingClientRect();
        const top = r.top - base;
        points.push(node.dataset.snap === 'center' ? top + r.height / 2 - el.clientHeight / 2 : top - 48);
      });
      return [...new Set(points.map(p => Math.round(Math.min(max, Math.max(0, p)))))].sort((a, b) => a - b);
    };

    // Cada gesto conta uma vez: um clique da roda é um gesto; a sequência contínua de eventos do
    // trackpad (com inércia) também é um gesto só. Um gesto novo vale mesmo com a rolagem ainda andando,
    // e parte da parada para onde ela já estava indo — por isso nunca é preciso rolar duas vezes.
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      e.preventDefault();
      const now = performance.now();
      const dir = Math.sign(e.deltaY);
      const newGesture = now - lastWheel > 120 || dir !== lastDir;
      lastWheel = now;
      lastDir = dir;
      if (!newGesture) return;

      const from = target ?? el.scrollTop;
      const list = stops();
      const next = dir > 0 ? list.find(p => p > from + 4) : [...list].reverse().find(p => p < from - 4);
      if (next === undefined) return;
      target = next;
      el.scrollTo({ top: next, behavior: 'smooth' });
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => { target = null; }, 900);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      window.clearTimeout(settleTimer);
    };
  }, []);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    try {
      el.scrollTop = Number(sessionStorage.getItem(SCROLL_KEY)) || 0;
    } catch {}
    const save = () => {
      try { sessionStorage.setItem(SCROLL_KEY, String(el.scrollTop)); } catch {}
    };
    el.addEventListener('scroll', save, { passive: true });
    return () => el.removeEventListener('scroll', save);
  }, []);

  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[400px_1fr] lg:grid-rows-[minmax(0,1fr)]">
      {/* Coluna esquerda: sobre mim — fundo café, colada na borda esquerda, fixa */}
      <aside className="flex min-h-0 bg-[#F0EDE8] text-[#241510] lg:border-r lg:border-[#241510]/10">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex flex-col min-h-0 px-6 py-8 lg:px-11 lg:pt-[min(3.5rem,6vh)] lg:pb-11"
      >
        {/* Foto já recortada no rosto, em círculo */}
        <div className="w-40 h-40 lg:w-[min(240px,26vh)] lg:h-[min(240px,26vh)] rounded-full overflow-hidden lg:mx-auto shrink-0">
          <img
            src="/profile-face.webp"
            alt="Vinicius Tamy"
            className="w-full h-full object-cover object-[45%_35%] scale-[1.1] origin-[45%_40%]"
          />
        </div>

        <div className="mt-6 lg:mt-[3vh] text-left">
          <h1 className="font-serif font-extrabold text-4xl lg:text-[2rem] xl:text-[2.25rem] tracking-tight leading-[1.05] text-[#241510]">
            Olá, eu sou o Tamy
          </h1>
          <p className="font-serif font-extrabold text-4xl lg:text-[2rem] xl:text-[2.25rem] tracking-tight leading-[1.05] text-[#6F625B] mt-1 [text-wrap:balance]">
            Designer sênior de produtos, problemas e IA.
          </p>
        </div>

        <div className="mt-6 lg:mt-[3vh] lg:flex-1">
          <p className="text-[#6F625B] text-[15px] leading-[1.55]">
            Designer há 12 anos, com os últimos seis dedicados a produtos digitais. Amo projetar produtos de ponta a ponta, transformando problemas complexos em soluções simples e centradas no usuário.
          </p>
          <p className="text-[#6F625B] text-[15px] leading-[1.55] mt-3">
            Totalmente AI-first, usando IA para acelerar pesquisas, explorar ideias, prototipar e entregar funcionalidades de alto nível, tudo isso sem perder o olhar humano.
          </p>
          <Link
            to="/sobre-mim"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#9E4322] hover:opacity-80 transition-opacity group mt-4"
          >
            Mais sobre mim <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-8 lg:mt-6 flex flex-wrap items-center justify-start lg:justify-between gap-2">
          <SocialLinks />
          <a
            href={RESUME_URL}
            download={RESUME_FILENAME}
            title="Baixar currículo"
            className="inline-flex items-center gap-1.5 h-10 px-3.5 rounded-full whitespace-nowrap bg-[#241510] text-white text-[13px] font-semibold tracking-wide hover:opacity-90 transition-opacity"
          >
            <Download size={15} /> Currículo
          </a>
        </div>
      </motion.div>
      </aside>

      {/* Coluna direita: seções de trabalhos — fundo levemente mais escuro, conteúdo centralizado.
          Sem padding embaixo: a área de scroll vai até a borda da tela para não cortar os cards */}
      <section className="relative flex flex-col min-h-0 bg-[#F0EDE8]">
        {/* Scroll assistido: no desktop, cada rolagem para centralizada no próximo case */}
        <div ref={scrollRef} className="flex-1 min-h-0 lg:overflow-y-auto no-scrollbar">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[1080px] mx-auto px-6 md:px-10 pt-8 lg:pt-12 pb-10 flex flex-col gap-14"
          >
            <div className="lg:snap-start lg:scroll-mt-12">
              <SectionTitle title="Cases" description="Trabalhos que desenvolvi nos últimos anos" />
              <div className="flex flex-col gap-10">
                {cases.map(project => <CaseCard key={project.id} project={project} />)}
              </div>
            </div>

            <div data-snap="start" className="lg:snap-start lg:scroll-mt-12">
              <SectionTitle title="Outros trabalhos" description="Dinâmicas e frameworks que apliquei" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {works.map(project => <WorkCard key={project.id} project={project} />)}
              </div>
            </div>

            {articles.length > 0 && (
              <div className="lg:snap-end lg:scroll-mb-10">
                <SectionTitle title="Artigos" />
                <div className="flex flex-col gap-3">
                  {articles.map(project => <ArticleCard key={project.id} project={project} />)}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

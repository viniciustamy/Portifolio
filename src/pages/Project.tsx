import React, { Suspense, lazy, useEffect, useState, useCallback } from 'react';
import { Link, useParams, useLocation, useSearchParams } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { ArrowLeft as ArrowLeftIcon, Presentation } from 'lucide-react';
import { useProjects } from '../context/ProjectsContext';
import { motion } from 'motion/react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { FloatingPostHeader } from '../components/FloatingPostHeader';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useAssistedPageScroll } from '../hooks/useAssistedPageScroll';
import { Button } from '../components/ui/Button';
import { Typography } from '../components/ui/Typography';
import { AtuacaoInfo, HAS_OWN_ATUACAO } from '../components/AtuacaoInfo';
import { DevolutivaLaptopMotion } from '../components/DevolutivaLaptopMotion';
import { DashboardLaptopMotion } from '../components/DashboardLaptopMotion';
import { MetricasCesMotion } from '../components/MetricasCesMotion';
import { KbaHeroMotion } from '../components/KbaHeroMotion';

// Cases cujo hero é um motion (notebook ou composição) no lugar da imagem de capa
const LAPTOP_HEROES: Record<string, () => any> = {
  devolutiva: DevolutivaLaptopMotion,
  'dashboard-admissao': DashboardLaptopMotion,
  'analise-metricas': MetricasCesMotion,
  'kba-senha': KbaHeroMotion,
};

// Cases com apresentação em slides (carregada só ao abrir)
const DECKS: Record<string, React.LazyExoticComponent<(p: { onClose: () => void; startAt?: string | null }) => any>> = {
  devolutiva: lazy(() => import('../components/DevolutivaDeck')),
};

export default function Project() {
  const { id } = useParams();
  const { hash } = useLocation();
  const { projects } = useProjects();

  const project = projects.find(p => p.id === id);
  useDocumentTitle(project ? project.title : 'Projeto');
  const currentIndex = projects.findIndex(p => p.id === id);
  // Próximo case pula os que ainda não têm página ("Em breve")
  const published = projects.filter(p => !(p as { comingSoon?: boolean }).comingSoon);
  const nextProject = published[published.findIndex(p => p.id === id) + 1] || published[0];

  const [sections, setSections] = useState<{ id: string; text: string }[]>([]);
  // Apresentação em slides; ?slide=<id> abre direto num slide (volta da demo da nova versão)
  const [searchParams, setSearchParams] = useSearchParams();
  const Deck = id ? DECKS[id] : undefined;
  const deckStart = searchParams.get('slide');
  const [isDeckOpen, setIsDeckOpen] = useState(() => !!deckStart);
  const closeDeck = useCallback(() => {
    setIsDeckOpen(false);
    if (searchParams.has('slide')) setSearchParams({}, { replace: true });
  }, [searchParams, setSearchParams]);
  // Scroll assistido entre as seções do case (desligado com a apresentação aberta)
  useAssistedPageScroll(!!project && !isDeckOpen);
  const [isSimplified, setIsSimplified] = useState(false);

  // Use the new Scroll Spy hook
  const activeId = useScrollSpy(
    sections.map((s) => s.id),
    { rootMargin: '-130px 0px -40% 0px', threshold: 0 }
  );

  const handleImageClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    // Ignore clicks on buttons, anchors, SVGs, or paths (like navigation arrows/dots in Carousel)
    if (
      target.closest('button') ||
      target.closest('a') ||
      target.tagName === 'BUTTON' ||
      target.tagName === 'A' ||
      target.tagName === 'SVG' ||
      target.tagName === 'path'
    ) {
      return;
    }

    // Find the image element. Only consider clicks directly on an image or its direct wrapper
    let imgElement: HTMLImageElement | null = null;

    if (target.tagName === 'IMG') {
      imgElement = target as HTMLImageElement;
    } else if (target.closest('.group') || target.closest('picture')) {
      // If clicking inside a known image wrapper, find the image inside it
      const wrapper = target.closest('.group') || target.closest('picture');
      if (wrapper) {
        imgElement = wrapper.querySelector('img');
      }
    }

    if (imgElement && imgElement.src) {
      const globalContainer = e.currentTarget;
      if (!globalContainer) return;

      let localContainer: HTMLElement | null = null;
      let curr = imgElement.parentElement;
      while (curr && curr !== globalContainer) {
        if (curr.classList.contains('grid') || curr.classList.contains('flex')) {
          localContainer = curr;
        }
        curr = curr.parentElement;
      }

      if (!localContainer) {
        localContainer = imgElement.parentElement;
      }

      if (!localContainer) {
        localContainer = globalContainer as HTMLElement;
      }

      // Collect all zoomable images in this local container for the lightbox
      const allImgs = (Array.from(localContainer.querySelectorAll('img')) as HTMLImageElement[]).filter(img => {
        const src = img.getAttribute('src') || '';
        // Skip small decorative icons, videos, or profiles
        return !src.includes('Video%20Cursor') && !src.includes('Video Cursor') && !src.includes('profile.jpg');
      });

      const imgSrcs = allImgs.map(img => img.src);
      const currentIndex = imgSrcs.indexOf(imgElement.src);

      if (currentIndex !== -1) {
        const event = new CustomEvent('open-lightbox', {
          detail: {
            images: imgSrcs,
            index: currentIndex
          }
        });
        window.dispatchEvent(event);
      }
    }
  }, []);

  useEffect(() => {
    if (hash) {
      const targetId = decodeURIComponent(hash.substring(1));
      let consecutiveStableChecks = 0;
      let checkCount = 0;
      const maxChecks = 25; // 2.5 segundos no máximo
      let timer: ReturnType<typeof setTimeout> | null = null;

      const checkAndScroll = () => {
        checkCount++;
        const element = document.getElementById(targetId);

        if (element) {
          element.style.scrollMarginTop = '120px';
          const desiredY = Math.max(0, element.getBoundingClientRect().top + window.scrollY - 120);
          const currentY = window.scrollY;

          // Se a distância atual for maior que 15px do alvo desejado, reposiciona
          if (Math.abs(currentY - desiredY) > 15) {
            consecutiveStableChecks = 0;
            const behavior = checkCount <= 6 ? 'auto' : 'smooth';
            window.scrollTo({ top: desiredY, behavior });
          } else {
            consecutiveStableChecks++;
          }
        }

        // Continua verificando até que a posição permaneça estável por 3 checagens seguidas
        if (consecutiveStableChecks < 3 && checkCount < maxChecks) {
          timer = setTimeout(checkAndScroll, checkCount <= 8 ? 80 : 150);
        }
      };

      timer = setTimeout(checkAndScroll, 50);

      return () => {
        if (timer) clearTimeout(timer);
      };
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, id]);

  useEffect(() => {
    // Find all H2 elements inside the prose container
    const container = document.querySelector('.project-content-container');
    if (!container) return;

    const updateHeadings = () => {
      const headings = container.querySelectorAll('h2');
      const sectionsList: { id: string; text: string }[] = [];

      headings.forEach((heading, index) => {
        let id = heading.id;
        if (!id) {
          const text = heading.textContent || '';
          id = text
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // remove accents
            .replace(/[^a-z0-9\s-]/g, '')     // remove invalid characters
            .replace(/\s+/g, '-')             // collapse spaces to dash
            .replace(/-+/g, '-');             // collapse duplicate dashes

          if (!id || id === '-') {
            id = `section-${index}`;
          }

          if (document.getElementById(id)) {
            id = `${id}-${index}`;
          }

          heading.id = id;
        }

        // Apply scroll-margin-top to the heading so scrollIntoView respects the 120px top offset
        heading.style.scrollMarginTop = '120px';

        sectionsList.push({
          id,
          text: heading.textContent || '',
        });
      });

      setSections(sectionsList);
      setIsSimplified(!!container.querySelector('.mode-simplificado'));
    };

    // Run initially
    updateHeadings();

    // Set up MutationObserver to detect content modifications (like tab switching)
    const observer = new MutationObserver(updateHeadings);
    observer.observe(container, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };

  }, [id, project?.content, project?.contentHtml]);

  return (
    <div className="animate-in fade-in duration-500 bg-white min-h-screen">
      <FloatingPostHeader title={project.title} />

      {/* Project Content Grid */}
      <div className="p-6 md:p-10 max-w-[950px] xl:max-w-[1230px] mx-auto flex flex-col xl:flex-row xl:justify-center gap-12 xl:gap-12 2xl:gap-16 relative pt-8 md:pt-12">
        {/* Main Content Area */}
        <div className="flex-1 min-w-0 w-full max-w-[950px] order-2 xl:order-1">
          {/* Breadcrumb back navigation link */}
          <div className="mb-8 flex items-center justify-between gap-4">
            <Button variant="ghost" size="sm" className="group text-muted-foreground hover:text-primary hover:bg-transparent -ml-3" asChild>
              <Link to="/" state={{ restoreScroll: true }}>
                <ArrowLeftIcon className="w-4 h-4 mr-1.5 transition-transform group-hover:-translate-x-1" />
                Voltar
              </Link>
            </Button>
            {Deck && (
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary hover:bg-transparent -mr-3" onClick={() => setIsDeckOpen(true)}>
                <Presentation className="w-4 h-4 mr-1.5" />
                Apresentar case
              </Button>
            )}
          </div>

          {/* Title & Subtitle Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <Typography variant="h2" className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3.25rem] leading-[1.12] mb-0 border-none">
                {project.title}
              </Typography>
            </div>

            <Typography variant="lead" className="md:text-xl text-muted-foreground leading-relaxed mb-6 mt-0">
              {project.description}
            </Typography>
          </div>

          {/* Hero Image / Animation (Main Image) */}
          {LAPTOP_HEROES[project.id] ? (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mb-24 not-prose flex justify-center overflow-visible"
            >
              <div className="w-full max-w-[1020px] px-4">
                {(() => { const Hero = LAPTOP_HEROES[project.id]; return <Hero />; })()}
              </div>
            </motion.div>
          ) : (project.coverImage || project.thumbnail) && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10"
            >
              <img
                src={project.coverImage || project.thumbnail}
                alt={project.title}
                className="w-auto h-auto mx-auto cursor-zoom-in"
                onClick={handleImageClick}
              />
            </motion.div>
          )}

          <div
            onClick={handleImageClick}
            className="project-content-container prose prose-lg prose-p:text-muted-foreground prose-headings:font-serif prose-headings:text-primary prose-h2:mt-24 first:prose-h2:mt-0 prose-h3:mt-16 max-w-none"
          >
            {project.contentHtml ? (
              <div dangerouslySetInnerHTML={{ __html: project.contentHtml }} />
            ) : project.content ? (
              // O conteúdo de cada case vem em um chunk próprio; reserva altura enquanto carrega
              <Suspense fallback={<div className="min-h-[60vh]" />}>{project.content}</Suspense>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">Visão Geral</h2>
                <p className="mb-8 leading-relaxed">
                  Aqui você poderá detalhar todo o processo de discovery, definição do problema e arquitetura da solução. O espaço está pronto para receber os textos e documentar o raciocínio por trás de cada decisão.
                </p>

                <div className="w-full aspect-[16/9] bg-[#E2DCD4] rounded-[2rem] flex items-center justify-center my-12 border border-[#E2DCD4]">
                  <span className="text-[#6F625B] font-medium tracking-widest uppercase text-sm">Espaço para Imagem</span>
                </div>

                <h2 className="text-2xl font-bold mb-4">O Problema</h2>
                <p className="mb-8 leading-relaxed">
                  Descreva o cenário atual, as dores dos usuários e as métricas que justificaram a necessidade desta iniciativa.
                </p>

                <div className="my-16 bg-[#E2DCD4] p-10 lg:p-16 rounded-[2rem] flex items-center justify-center">
                  <div className="w-full max-w-[500px] bg-white rounded-xl shadow-lg p-6 border border-black/5">
                    <div className="flex gap-3 mb-6 items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9E4322] to-[#6DB2B3]"></div>
                      <div>
                        <div className="w-32 h-3 bg-[#E2DFD6] rounded-full mb-2"></div>
                        <div className="w-24 h-2 bg-[#F4F3EE] rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="w-full h-2 bg-[#F4F3EE] rounded-full"></div>
                      <div className="w-[90%] h-2 bg-[#F4F3EE] rounded-full"></div>
                      <div className="w-[60%] h-2 bg-[#F4F3EE] rounded-full"></div>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-4">A Solução</h2>
                <p className="mb-8 leading-relaxed">
                  Apresente a proposta de valor, como ela endereça o problema e quais foram os principais aprendizados e resultados alcançados com o lançamento.
                </p>

                <ul className="list-disc pl-5 mb-8 space-y-2 text-[#4F4440]">
                  <li><strong>Design System:</strong> Atualização dos tokens e adaptação dos componentes.</li>
                  <li><strong>Acessibilidade:</strong> Contraste aprimorado e suporte a navegação.</li>
                  <li><strong>Métricas:</strong> Impacto direto nas taxas de sucesso ou retenção da feature.</li>
                </ul>
              </>
            )}
          </div>

          {/* Minha atuação: papel, time, ferramentas e métodos (para quem não tem a seção no conteúdo) */}
          {!HAS_OWN_ATUACAO.includes(project.id) && (
            <div className="mt-24">
              <h2 id="minha-atuacao" className="font-serif text-3xl font-bold text-[#241510] mb-8">Minha atuação</h2>
              <AtuacaoInfo projectId={project.id} />
            </div>
          )}

          {/* Next Project Footer */}
          <div className="mt-24 pt-12 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase mb-2">Próximo Projeto</p>
              <h4 className="font-serif text-2xl font-bold text-primary">{nextProject.title}</h4>
            </div>
            <Link to={`/project/${nextProject.id}`} className="px-7 py-3 rounded-full bg-primary text-primary-foreground font-medium text-[14px] hover:bg-primary/90 transition-colors shadow-sm">
              Ver Projeto →
            </Link>
          </div>
        </div>

        {/* Table of Contents Right Sidebar (Desktop only) */}
        {sections.length > 0 && !isSimplified && (
          <div className="hidden xl:block xl:w-[200px] 2xl:w-[240px] shrink-0 xl:pt-[120px] xl:order-2">
            <div className="relative xl:sticky top-0 xl:top-[120px] self-start max-h-none xl:max-h-[calc(100vh-120px)] overflow-visible xl:overflow-y-auto pb-4 xl:pb-8 pr-4 scrollbar-hide">
              <p className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase mb-6">
                Neste Case
              </p>
              <ul className="relative border-l border-border pl-4 space-y-4 text-sm">
                {sections.map((section) => {
                  const isActive = activeId === section.id;
                  return (
                    <li key={section.id} className="relative">
                      <button
                        onClick={() => {
                          const el = document.getElementById(section.id);
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className={`block w-full text-left transition-all duration-300 select-none break-words whitespace-normal leading-relaxed ${isActive
                          ? 'text-brand font-semibold translate-x-1'
                          : 'text-muted-foreground hover:text-primary font-normal hover:translate-x-0.5'
                          }`}
                      >
                        {isActive && (
                          <span className="absolute left-[-17px] top-0 bottom-0 w-[2px] bg-brand transition-all duration-300" />
                        )}
                        {section.text}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>

      {Deck && (
        <Suspense fallback={null}>
          <AnimatePresence>{isDeckOpen && <Deck key="deck" onClose={closeDeck} startAt={deckStart} />}</AnimatePresence>
        </Suspense>
      )}
    </div>
  );
}


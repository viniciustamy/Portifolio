import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams, Navigate, useLocation } from 'react-router-dom';
import { ArrowLeft as ArrowLeftIcon, ExternalLink as ExternalLinkIcon, Monitor as MonitorIcon } from 'lucide-react';
import { useProjects } from '../context/ProjectsContext';
import { PresentationMode } from '../components/PresentationMode';
import { motion } from 'motion/react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { FloatingPostHeader } from '../components/FloatingPostHeader';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Project() {
  const { id } = useParams();
  const { hash } = useLocation();
  const { projects } = useProjects();

  const project = projects.find(p => p.id === id);
  useDocumentTitle(project ? project.title : 'Projeto');
  const currentIndex = projects.findIndex(p => p.id === id);
  const nextProject = projects[currentIndex + 1] || projects[0];

  const [sections, setSections] = useState<{ id: string; text: string }[]>([]);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
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

  const rolesList = Array.isArray(project.roles)
    ? project.roles
    : project.roles
      ? [project.roles]
      : project.role
        ? [project.role]
        : ['Product Design'];

  const toolsList = Array.isArray(project.tools)
    ? project.tools
    : project.tools
      ? [project.tools]
      : ['Figma', 'Claude', 'Cursor'];

  const teamList = Array.isArray(project.team)
    ? project.team
    : project.team
      ? [project.team]
      : ['Time de Produto'];

  return (
    <div className="animate-in fade-in duration-500 bg-white min-h-screen">
      <FloatingPostHeader title={project.title} />

      {/* Project Content Grid */}
      <div className="p-6 md:p-10 max-w-[1100px] xl:max-w-[1380px] mx-auto flex flex-col xl:flex-row xl:justify-center gap-12 xl:gap-12 2xl:gap-16 relative pt-8 md:pt-12">
        {/* Main Content Area */}
        <div className="flex-1 min-w-0 w-full max-w-[1100px] order-2 xl:order-1">
          {/* Breadcrumb back navigation link */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#787265] hover:text-[#2C3539] transition-colors group">
              <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Voltar para o início
            </Link>
          </div>

          {/* Title & Subtitle Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3.25rem] leading-[1.12] font-bold text-[#2C3539]">
                {project.title}
              </h1>

              {project.id === 'admin-global-docs' && (
                <button
                  onClick={() => setIsPresentationOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#DCD7CA] bg-transparent hover:bg-[#006266]/5 hover:border-[#006266] text-[#006266] font-semibold text-[13px] transition-all active:scale-[0.98] cursor-pointer shrink-0 sm:mt-1"
                >
                  <MonitorIcon className="w-4 h-4" />
                  Apresentar Case (Slide Deck)
                </button>
              )}
            </div>

            <p className="text-lg md:text-xl text-[#4A5559] leading-relaxed mb-6">
              {project.description}
            </p>
          </div>

          {/* Hero Image / Animation (Main Image) */}
          {project.id === 'devolutiva' ? (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mb-12 not-prose flex justify-center overflow-visible"
            >
              <iframe
                src={`/animacao-notebook.html?v=${Date.now()}`}
                title="Mockup da Solução Final"
                className="w-full max-w-[1600px] border-0 px-4"
                style={{ height: '70vh', minHeight: '620px', maxHeight: '850px' }}
                scrolling="no"
              />
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

          {/* Metadata Columns: Roles, Ferramentas, Time */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8 mb-12">
            <div>
              <h4 className="text-[11px] font-bold tracking-widest text-[#787265] uppercase mb-3">
                ROLES
              </h4>
              <div className="text-[14px] font-medium text-[#2C3539] space-y-1.5">
                {rolesList.map((r, i) => (
                  <p key={i}>{r}</p>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-bold tracking-widest text-[#787265] uppercase mb-3">
                FERRAMENTAS
              </h4>
              <div className="text-[14px] font-medium text-[#2C3539] space-y-1.5">
                {toolsList.map((t, i) => (
                  <p key={i}>{t}</p>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-bold tracking-widest text-[#787265] uppercase mb-3">
                TIME
              </h4>
              <div className="text-[14px] font-medium text-[#2C3539] space-y-1.5">
                {teamList.map((tm, i) => (
                  <p key={i}>{tm}</p>
                ))}
              </div>
            </div>
          </div>

          {/* TLDR Block */}
          {project.tldr && (
            <div className="mb-16">
              <p className="text-[12px] font-bold tracking-widest text-[#006266] uppercase mb-4">
                TL;DR
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose">
                <div className="bg-white border border-[#EBE7DD] p-10 flex flex-col justify-between hover:border-[#006266]/20 transition-all duration-300">
                  <div>
                    <span className="text-[#787265] font-sans font-bold text-[11px] uppercase tracking-wider block mb-3">PROBLEMA</span>
                    <p className="text-sm font-sans text-[#4A5559] leading-relaxed">{project.tldr.problem}</p>
                  </div>
                </div>
                <div className="bg-white border border-[#EBE7DD] p-10 flex flex-col justify-between hover:border-[#006266]/20 transition-all duration-300">
                  <div>
                    <span className="text-[#787265] font-sans font-bold text-[11px] uppercase tracking-wider block mb-3">O QUE EU FIZ</span>
                    <p className="text-sm font-sans text-[#4A5559] leading-relaxed">{project.tldr.action}</p>
                  </div>
                </div>
                <div className="bg-[#1F4E5B] p-10 flex flex-col justify-between transition-all duration-300 text-white">
                  <div>
                    <span className="text-white/80 font-sans font-bold text-[11px] uppercase tracking-wider block mb-3">RESULTADO</span>
                    <p className="text-sm font-sans text-white leading-relaxed font-semibold">{project.tldr.result}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            onClick={handleImageClick}
            className="project-content-container prose prose-lg prose-p:text-[#4A5559] prose-headings:font-serif prose-headings:text-[#2C3539] prose-h2:mt-24 first:prose-h2:mt-0 prose-h3:mt-16 max-w-none"
          >
            {project.contentHtml ? (
              <div dangerouslySetInnerHTML={{ __html: project.contentHtml }} />
            ) : project.content ? (
              project.content
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">Visão Geral</h2>
                <p className="mb-8 leading-relaxed">
                  Aqui você poderá detalhar todo o processo de discovery, definição do problema e arquitetura da solução. O espaço está pronto para receber os textos e documentar o raciocínio por trás de cada decisão.
                </p>

                <div className="w-full aspect-[16/9] bg-[#EBE7DD] rounded-[2rem] flex items-center justify-center my-12 border border-[#DCD7CA]">
                  <span className="text-[#787265] font-medium tracking-widest uppercase text-sm">Espaço para Imagem</span>
                </div>

                <h2 className="text-2xl font-bold mb-4">O Problema</h2>
                <p className="mb-8 leading-relaxed">
                  Descreva o cenário atual, as dores dos usuários e as métricas que justificaram a necessidade desta iniciativa.
                </p>

                <div className="my-16 bg-[#EBE7DD] p-10 lg:p-16 rounded-[2rem] flex items-center justify-center">
                  <div className="w-full max-w-[500px] bg-white rounded-xl shadow-lg p-6 border border-black/5">
                    <div className="flex gap-3 mb-6 items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#006266] to-[#6DB2B3]"></div>
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

                <ul className="list-disc pl-5 mb-8 space-y-2 text-[#4A5559]">
                  <li><strong>Design System:</strong> Atualização dos tokens e adaptação dos componentes.</li>
                  <li><strong>Acessibilidade:</strong> Contraste aprimorado e suporte a navegação.</li>
                  <li><strong>Métricas:</strong> Impacto direto nas taxas de sucesso ou retenção da feature.</li>
                </ul>
              </>
            )}
          </div>

          {/* Next Project Footer */}
          <div className="mt-24 pt-12 border-t border-[#EBE7DD] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold tracking-widest text-[#787265] uppercase mb-2">Próximo Projeto</p>
              <h4 className="font-serif text-2xl font-bold text-[#2C3539]">{nextProject.title}</h4>
            </div>
            <Link to={`/project/${nextProject.id}`} className="px-7 py-3 rounded-full bg-[#2C3539] text-white font-medium text-[14px] hover:bg-[#1a2022] transition-colors shadow-sm">
              Ver Projeto →
            </Link>
          </div>
        </div>

        {/* Table of Contents Right Sidebar (Desktop only) */}
        {sections.length > 0 && !isSimplified && (
          <div className="hidden xl:block xl:w-[200px] 2xl:w-[240px] shrink-0 xl:pt-[120px] xl:order-2">
            <div className="relative xl:sticky top-0 xl:top-[120px] self-start max-h-none xl:max-h-[calc(100vh-120px)] overflow-visible xl:overflow-y-auto pb-4 xl:pb-8 pr-4 scrollbar-hide">
              <p className="text-[11px] font-bold tracking-widest text-[#787265] uppercase mb-6">
                Neste Case
              </p>
              <ul className="relative border-l border-[#EBE7DD] pl-4 space-y-4 text-sm">
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
                          ? 'text-[#006266] font-semibold translate-x-1'
                          : 'text-[#787265] hover:text-[#2C3539] font-normal hover:translate-x-0.5'
                          }`}
                      >
                        {isActive && (
                          <span className="absolute left-[-17px] top-0 bottom-0 w-[2px] bg-[#006266] transition-all duration-300" />
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

      <PresentationMode
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
        projectTitle={project.title}
      />
    </div>
  );
}

function MockHeroUI({ isLight }: { isLight?: boolean }) {
  const bgClass = isLight ? 'bg-white/10 backdrop-blur-md border-white/20' : 'bg-white/40 backdrop-blur-md border-white/40';
  const barDark = isLight ? 'bg-white/80' : 'bg-[#2C3539]';
  const barLight = isLight ? 'bg-white/20' : 'bg-black/10';

  return (
    <div className={`w-[85%] max-w-[600px] h-48 rounded-[1.5rem] shadow-2xl p-8 border flex flex-col justify-center gap-4 transition-transform duration-700 hover:scale-[1.02] ${bgClass}`}>
      <div className={`w-[35%] h-6 rounded-[6px] ${barDark}`}></div>
      <div className={`w-full h-[8px] rounded-full mt-2 ${barLight}`}></div>
      <div className={`w-[85%] h-[8px] rounded-full ${barLight}`}></div>
      <div className={`w-[60%] h-[8px] rounded-full ${barLight}`}></div>
    </div>
  );
}

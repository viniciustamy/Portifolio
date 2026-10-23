import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

import { Slide0, Slide1, Slide2 } from './slides/IntroSlides';
import { Slide3, Slide4, Slide5, Slide6, SlideDorCrescimento } from './slides/CaseSlides1';
import { Slide7, SlideDores, Slide8, Slide9, SlideDefinindoVersoes, Slide10, SlideGoogleAIStudio } from './slides/CaseSlides2';
import { Slide11, Slide12, Slide13, Slide14, Slide15, SlideVideoCursor } from './slides/CaseSlides3';

interface PresentationModeProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
}

export function PresentationMode({ isOpen, onClose, projectTitle }: PresentationModeProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
  const [areControlsVisible, setAreControlsVisible] = useState(true);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Define steps corresponding to groups of slides
  const steps = [
    { name: 'Olá', range: [0, 0] },
    { name: 'Carrreira', range: [1, 1] },
    { name: 'Portfólio', range: [2, 2] },
    { name: 'Case', range: [3, 3] },
    { name: 'Contexto', range: [4, 4] },
    { name: 'A Dor do Crescimento', range: [5, 5] },
    { name: 'Meu Papel', range: [6, 6] },
    { name: 'Descoberta', range: [7, 7] },
    { name: 'Dores', range: [8, 8] },
    { name: 'A Decisão', range: [9, 9] },
    { name: 'O Desafio', range: [10, 10] },
    { name: 'Roadmap', range: [11, 11] },
    { name: 'Definindo versões', range: [12, 12] },
    { name: 'Recorte e IA Studio', range: [13, 13] },
    { name: 'Implementação', range: [14, 14] },
    { name: 'Protótipo', range: [15, 15] },
    { name: 'O Papel da IA', range: [16, 16] },
    { name: 'Acompanhamento', range: [17, 17] },
    { name: 'Resultados', range: [18, 18] },
    { name: 'Legado', range: [19, 19] },
    { name: 'Conclusão', range: [20, 20] }
  ];

  const totalSlides = 21;

  // Handle slide changing with direction
  const goToNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
    }
  }, [currentSlide]);

  const goToPrev = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((prev) => prev - 1);
    }
  }, [currentSlide]);

  const goToSlide = useCallback((index: number) => {
    if (index === currentSlide) return;
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  }, [currentSlide]);

  // Keyboard Navigation
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, goToNext, goToPrev, onClose]);

  // Handle Mouse Move to show/hide controls
  const handleMouseMove = useCallback(() => {
    setAreControlsVisible(true);
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      setAreControlsVisible(false);
    }, 3000);
  }, []);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, []);

  // Slide transition variants (Blur + Slide + Fade) with children staggered triggers
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '12%' : '-12%',
      opacity: 0,
      filter: 'blur(12px)',
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 38 },
        opacity: { duration: 0.3 },
        filter: { duration: 0.3 },
        scale: { duration: 0.4, ease: 'easeOut' },
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-12%' : '12%',
      opacity: 0,
      filter: 'blur(12px)',
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 38 },
        opacity: { duration: 0.25 },
        filter: { duration: 0.25 },
        scale: { duration: 0.3 },
      },
    }),
  };

  const mainRef = useRef<HTMLElement>(null);

  // Prevent scroll when presentation is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      if (document.documentElement) {
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.height = '100vh';
      }
      
      // Reset any accidental horizontal scrolling on parent elements
      window.scrollTo(0, 0);
      if (document.documentElement) {
        document.documentElement.scrollLeft = 0;
      }
      document.body.scrollLeft = 0;
      const rootEl = document.getElementById('root');
      if (rootEl) {
        rootEl.scrollLeft = 0;
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      if (document.documentElement) {
        document.documentElement.style.overflow = '';
        document.documentElement.style.height = '';
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      if (document.documentElement) {
        document.documentElement.style.overflow = '';
        document.documentElement.style.height = '';
      }
    };
  }, [isOpen]);

  useEffect(() => {
    // Prevent accidental horizontal scroll shifting the whole screen on slide changes
    if (isOpen) {
      if (document.documentElement) document.documentElement.scrollLeft = 0;
      document.body.scrollLeft = 0;
      const rootEl = document.getElementById('root');
      if (rootEl) rootEl.scrollLeft = 0;
    }
  }, [currentSlide, isOpen]);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [currentSlide]);

  const navRef = useRef<HTMLElement>(null);

  // Find active step index based on currentSlide
  const activeStepIndex = steps.findIndex(
    (step) => currentSlide >= step.range[0] && currentSlide <= step.range[1]
  );

  useEffect(() => {
    if (navRef.current) {
      const activeBtn = navRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    }
  }, [activeStepIndex]);

  if (!isOpen) return null;

  return (
    <div
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-50 bg-[#0B0E10] text-white flex flex-col justify-between overflow-hidden select-none"
      style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Background Soft Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#9E4322]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#00CBC6]/3 blur-[120px] pointer-events-none" />

      {/* TOP HEADER - Step Progress indicator bar */}
      <AnimatePresence>
        {areControlsVisible && (
          <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full px-6 md:px-12 py-6 flex items-center justify-between border-b border-white/5 bg-gradient-to-b from-[#0B0E10] to-[#0B0E10]/90 backdrop-blur-md z-40"
          >
            {/* Left section: Project label */}
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#00CBC6]" />
              <span className="text-[11px] font-mono tracking-widest text-[#94A3B8] uppercase">
                {projectTitle}
              </span>
            </div>

            {/* Mid section: Slide steps */}
            <nav ref={navRef} className="hidden lg:flex items-center gap-6 text-xs font-mono overflow-x-auto no-scrollbar max-w-[50vw] px-4 snap-x snap-mandatory mask-image-linear">
              {steps.map((step, idx) => {
                const isActive = idx === activeStepIndex;
                return (
                  <button
                    key={step.name}
                    data-active={isActive}
                    onClick={() => goToSlide(step.range[0])}
                    className="relative py-2 transition-colors duration-300 group whitespace-nowrap snap-center"
                  >
                    <span
                      className={`transition-colors duration-300 ${
                        isActive
                          ? 'text-[#00CBC6] font-semibold'
                          : 'text-[#475569] hover:text-[#94A3B8]'
                      }`}
                    >
                      {step.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeStepUnderline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00CBC6]"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right section: Exit CTA */}
            <button
              onClick={onClose}
              className="group flex items-center gap-2 text-xs font-mono text-[#64748B] hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-full border border-white/5 hover:border-white/10 transition-all cursor-pointer"
            >
              <X className="w-3.5 h-3.5 transition-transform group-hover:rotate-90 duration-300" />
              Sair
            </button>
          </motion.header>
        )}
      </AnimatePresence>

      {/* CLICABLE SIDES FOR EASY NAVIGATION */}
      <div
        onClick={goToPrev}
        className={`absolute left-0 top-[15%] bottom-[15%] w-16 md:w-28 z-30 cursor-left flex items-center justify-start pl-4 group ${
          currentSlide === 0 ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <div className="bg-white/5 border border-white/5 group-hover:bg-white/10 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
          <ChevronLeft className="w-5 h-5 text-slate-300" />
        </div>
      </div>

      <div
        onClick={goToNext}
        className={`absolute right-0 top-[15%] bottom-[15%] w-16 md:w-28 z-30 cursor-right flex items-center justify-end pr-4 group ${
          currentSlide === totalSlides - 1 ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <div className="bg-white/5 border border-white/5 group-hover:bg-white/10 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
          <ChevronRight className="w-5 h-5 text-slate-300" />
        </div>
      </div>

      {/* SLIDE CONTENT AREA */}
      <main ref={mainRef} className="flex-1 w-full mx-auto flex items-center justify-center relative px-0 py-8 md:py-16 overflow-y-auto overflow-x-hidden scrollbar-hide">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full flex items-center justify-center overflow-x-hidden"
          >
            {currentSlide === 0 && <Slide0 />}
            {currentSlide === 1 && <Slide1 />}
            {currentSlide === 2 && <Slide2 onNextSlide={() => goToSlide(3)} />}
            {currentSlide === 3 && <Slide3 />}
            {currentSlide === 4 && <Slide4 />}
            {currentSlide === 5 && <SlideDorCrescimento />}
            {currentSlide === 6 && <Slide5 />}
            {currentSlide === 7 && <Slide7 />}
            {currentSlide === 8 && <SlideDores />}
            {currentSlide === 9 && <Slide8 />}
            {currentSlide === 10 && <Slide6 />}
            {currentSlide === 11 && <Slide9 />}
            {currentSlide === 12 && <SlideDefinindoVersoes />}
            {currentSlide === 13 && <SlideGoogleAIStudio />}
            {currentSlide === 14 && <Slide10 />}
            {currentSlide === 15 && <SlideVideoCursor />}
            {currentSlide === 16 && <Slide11 />}
            {currentSlide === 17 && <Slide12 />}
            {currentSlide === 18 && <Slide13 />}
            {currentSlide === 19 && <Slide14 />}
            {currentSlide === 20 && <Slide15 />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* BOTTOM CONTROLS - Progress & Navigation */}
      <AnimatePresence>
        {areControlsVisible && (
          <motion.footer
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="w-full px-6 md:px-12 py-6 flex items-center justify-between border-t border-white/5 bg-gradient-to-t from-[#0B0E10] to-[#0B0E10]/90 backdrop-blur-md z-40"
          >
            {/* Slide counter progress */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-[#64748B]">
                Slide {currentSlide + 1} de {totalSlides}
              </span>
              <div className="w-24 md:w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#00CBC6]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Manual arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={goToPrev}
                disabled={currentSlide === 0}
                className="p-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Slide anterior"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={goToNext}
                disabled={currentSlide === totalSlides - 1}
                className="p-2 rounded-full border border-white/5 bg-[#00CBC6] hover:bg-[#009b9e] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Próximo slide"
              >
                <ChevronRight className="w-4 h-4 text-[#0B0E10]" />
              </button>
            </div>
          </motion.footer>
        )}
      </AnimatePresence>
    </div>
  );
}

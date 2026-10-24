import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft as ArrowLeftIcon } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Button } from './ui/Button';

interface FloatingPostHeaderProps {
  title: string;
}

// Tempo que o header fica na tela depois de aparecer ao rolar para cima
const HIDE_AFTER_MS = 3000;

export function FloatingPostHeader({ title }: FloatingPostHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();
  const hovered = useRef(false);

  const scheduleHide = () => {
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (!hovered.current) setIsVisible(false);
    }, HIDE_AFTER_MS);
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isScrollingUp = latest < lastScrollY.current;
    const isPastThreshold = latest > 500; // Approximately passed the hero and title area

    if (isPastThreshold && isScrollingUp) {
      // Aparece ao rolar para cima e some sozinho depois de alguns segundos
      setIsVisible(true);
      scheduleHide();
    } else {
      clearTimeout(hideTimer.current);
      setIsVisible(false);
    }

    lastScrollY.current = latest;
  });

  useEffect(() => () => clearTimeout(hideTimer.current), []);

  return (
    <motion.div
      initial={{ y: '-100%', opacity: 0 }}
      animate={{
        y: isVisible ? 0 : '-100%',
        opacity: isVisible ? 1 : 0
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      onMouseEnter={() => { hovered.current = true; clearTimeout(hideTimer.current); }}
      onMouseLeave={() => { hovered.current = false; if (isVisible) scheduleHide(); }}
      className="fixed top-0 left-0 right-0 z-[100] h-[48px] md:h-[52px] bg-background/90 backdrop-blur-md shadow-sm flex items-center px-6 md:px-10"
    >
      {/* Voltar à esquerda, título centralizado na página */}
      <div className="w-full max-w-[1100px] xl:max-w-[1380px] mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <Button variant="ghost" size="sm" asChild className="group text-muted-foreground hover:bg-transparent hover:text-primary px-0 justify-self-start">
          <Link to="/" state={{ restoreScroll: true }}>
            <ArrowLeftIcon className="w-4 h-4 mr-1.5 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Voltar</span>
          </Link>
        </Button>

        <p className="truncate max-w-[60vw] text-center font-serif font-bold text-[15px] text-foreground">
          {title}
        </p>
        <span />

      </div>
    </motion.div>
  );
}

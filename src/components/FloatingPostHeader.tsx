import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft as ArrowLeftIcon } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Button } from './ui/Button';
import { Typography } from './ui/Typography';

interface FloatingPostHeaderProps {
  title: string;
}

export function FloatingPostHeader({ title }: FloatingPostHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isScrollingUp = latest < lastScrollY;
    const isPastThreshold = latest > 500; // Approximately passed the hero and title area

    if (isPastThreshold && isScrollingUp) {
      setIsVisible(true);
    } else if (!isPastThreshold || !isScrollingUp) {
      setIsVisible(false);
    }

    setLastScrollY(latest);
  });

  return (
    <motion.div
      initial={{ y: '-100%', opacity: 0 }}
      animate={{
        y: isVisible ? 0 : '-100%',
        opacity: isVisible ? 1 : 0
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-[100] h-[64px] md:h-[72px] bg-background/90 backdrop-blur-md shadow-sm flex items-center px-6 md:px-10"
    >
      <div className="w-full max-w-[1100px] xl:max-w-[1380px] mx-auto flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild className="group text-muted-foreground hover:bg-transparent hover:text-primary">
          <Link to="/" state={{ restoreScroll: true }}>
            <ArrowLeftIcon className="w-4 h-4 mr-1.5 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Voltar</span>
          </Link>
        </Button>

        {/* Divider */}
        <div className="w-[1px] h-6 bg-border mx-2 hidden sm:block"></div>

        <Typography variant="h4" className="truncate flex-1">
          {title}
        </Typography>
      </div>
    </motion.div>
  );
}

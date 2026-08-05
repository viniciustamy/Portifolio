import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft as ArrowLeftIcon } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';

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
      className="fixed top-0 left-0 right-0 z-[100] h-[64px] md:h-[72px] bg-white/90 backdrop-blur-md border-b border-black/5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex items-center px-6 md:px-10"
    >
      <div className="w-full max-w-[1100px] xl:max-w-[1380px] mx-auto flex items-center gap-4">
        <Link 
          to="/" 
          className="flex-shrink-0 inline-flex items-center gap-2 text-[13px] font-semibold text-[#787265] hover:text-[#2C3539] transition-colors group"
        >
          <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="hidden sm:inline">Voltar</span>
        </Link>
        
        {/* Divider */}
        <div className="w-[1px] h-6 bg-[#EBE7DD] mx-2 hidden sm:block"></div>

        <h2 className="font-serif font-bold text-[#2C3539] text-lg md:text-xl truncate flex-1">
          {title}
        </h2>
      </div>
    </motion.div>
  );
}

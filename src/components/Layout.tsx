import { Outlet, useLocation, useNavigationType } from 'react-router-dom';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { Button } from './ui/Button';
import { Typography } from './ui/Typography';

const leftDoorVariants = {
  initial: { x: "0%" },
  animate: { x: "-100%" },
  exit: { x: "0%" }
};

const rightDoorVariants = {
  initial: { x: "0%" },
  animate: { x: "100%" },
  exit: { x: "0%" }
};

export default function Layout() {
  const location = useLocation();
  const navType = useNavigationType();
  const isProjectPage = location.pathname.startsWith('/project');
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(`scroll-${location.pathname}`, window.scrollY.toString());
    };
    
    // Add event listener with some throttling or just passive
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (!location.hash) {
      const state = location.state as { restoreScroll?: boolean } | null;
      if (navType === 'POP' || state?.restoreScroll) {
        const savedPosition = sessionStorage.getItem(`scroll-${location.pathname}`);
        if (savedPosition) {
          // Delay to allow framer-motion page transition to settle
          setTimeout(() => {
            window.scrollTo(0, parseInt(savedPosition, 10));
          }, 150);
          return;
        }
      }
      // Default behavior: scroll to top
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash, navType, location.state]);

  // Home: tela única sem scroll no desktop, sem footer (contatos ficam na coluna "sobre mim")
  if (isHome) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen lg:h-screen flex flex-col bg-[var(--color-muted-background)] text-foreground font-sans selection:bg-brand selection:text-white relative overflow-hidden"
      >
        <motion.div
          className="fixed top-0 left-0 w-[51vw] h-full bg-[#2E211B] z-[9999] pointer-events-none"
          variants={leftDoorVariants}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div
          className="fixed top-0 right-0 w-[51vw] h-full bg-[#2E211B] z-[9999] pointer-events-none"
          variants={rightDoorVariants}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="flex-1 min-h-0 w-full relative z-10"
        >
          <Outlet />
        </motion.main>
      </motion.div>
    );
  }

  if (isProjectPage) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-brand selection:text-white relative overflow-hidden"
      >

        {/* Left Curtain Door */}
        <motion.div
          className="fixed top-0 left-0 w-[51vw] h-full bg-[#2E211B] z-[9999] pointer-events-none"
          variants={leftDoorVariants}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />
        {/* Right Curtain Door */}
        <motion.div
          className="fixed top-0 right-0 w-[51vw] h-full bg-[#2E211B] z-[9999] pointer-events-none"
          variants={rightDoorVariants}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="flex-1 w-full relative z-10"
        >
          <Outlet />
        </motion.main>

        {/* Footer */}
        <footer className="w-full max-w-[1240px] mx-auto px-6 md:px-10 lg:px-12 py-8 mt-auto border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <Typography variant="small" className="text-[12px] text-muted-foreground tracking-wide font-medium">© 2020 — 2026 Vinicius Tamy</Typography>
          <div className="flex items-center gap-4">
            <Button variant="brand" className="rounded-full tracking-wide text-[13px] px-6" asChild>
              <a href="https://wa.me/5524974020554" target="_blank" rel="noopener noreferrer">
                Say hello!
              </a>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-[#E2DCD4] bg-background hover:bg-muted-background text-[14px] font-medium" asChild>
              <a href="#">in</a>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-[#E2DCD4] bg-background hover:bg-muted-background text-[14px] font-medium" asChild>
              <a href="#">ig</a>
            </Button>
          </div>
        </footer>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex flex-col bg-[var(--color-muted-background)] text-foreground font-sans selection:bg-brand selection:text-white relative overflow-clip"
    >

      {/* Left Curtain Door */}
      <motion.div
        className="fixed top-0 left-0 w-[51vw] h-full bg-[#2E211B] z-[9999] pointer-events-none"
        variants={leftDoorVariants}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      />
      {/* Right Curtain Door */}
      <motion.div
        className="fixed top-0 right-0 w-[51vw] h-full bg-[#2E211B] z-[9999] pointer-events-none"
        variants={rightDoorVariants}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="flex-1 w-full max-w-[1240px] mx-auto px-6 md:px-10 lg:px-12 py-10 lg:py-16 relative z-10"
      >
        <Outlet />
      </motion.main>

      {/* Footer */}
      <footer className="w-full max-w-[1240px] mx-auto px-6 md:px-10 lg:px-12 py-8 mt-auto border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        <Typography variant="small" className="text-[12px] text-muted-foreground tracking-wide font-medium">© 2020 — 2026 Vinicius Tamy</Typography>
        <div className="flex items-center gap-4">
          <Button variant="brand" className="rounded-full tracking-wide text-[13px] px-6" asChild>
            <a href="https://wa.me/5524974020554" target="_blank" rel="noopener noreferrer">
              Say hello!
            </a>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-[#E2DCD4] bg-background hover:bg-muted-background text-[14px] font-medium" asChild>
            <a href="#">in</a>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-[#E2DCD4] bg-background hover:bg-muted-background text-[14px] font-medium" asChild>
            <a href="#">ig</a>
          </Button>
        </div>
      </footer>
    </motion.div>
  );
}

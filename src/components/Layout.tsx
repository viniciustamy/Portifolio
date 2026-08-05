import { Outlet, Link, useLocation } from 'react-router-dom';
import { ArrowLeft as ArrowLeftIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect } from 'react';

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
  const isProjectPage = location.pathname.startsWith('/project');

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  if (isProjectPage) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen flex flex-col bg-white text-[#2C3539] font-sans selection:bg-[#006266] selection:text-white relative overflow-hidden"
      >

        {/* Left Curtain Door */}
        <motion.div
          className="fixed top-0 left-0 w-[51vw] h-full bg-[#006266] z-[9999] pointer-events-none"
          variants={leftDoorVariants}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />
        {/* Right Curtain Door */}
        <motion.div
          className="fixed top-0 right-0 w-[51vw] h-full bg-[#006266] z-[9999] pointer-events-none"
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
        <footer className="w-full max-w-[1240px] mx-auto px-6 md:px-10 lg:px-12 py-8 mt-auto border-t border-[#EBE7DD] flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <p className="text-[12px] font-medium text-[#787265] tracking-wide">© 2020 — 2026 Vinicius Tamy</p>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/5524974020554"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#006266] text-white px-6 py-2 rounded-full font-medium text-[13px] hover:bg-[#004e52] transition-colors shadow-sm tracking-wide inline-block"
            >
              Say hello!
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-[#DCD7CA] bg-white flex items-center justify-center text-[14px] font-medium text-[#2C3539] hover:bg-[#F9F8F6] transition-colors shadow-sm">
              in
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-[#DCD7CA] bg-white flex items-center justify-center text-[14px] font-medium text-[#2C3539] hover:bg-[#F9F8F6] transition-colors shadow-sm">
              ig
            </a>
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
      className="min-h-screen flex flex-col bg-[#F9F8F6] text-[#2C3539] font-sans selection:bg-[#006266] selection:text-white relative overflow-hidden"
    >

      {/* Left Curtain Door */}
      <motion.div
        className="fixed top-0 left-0 w-[51vw] h-full bg-[#006266] z-[9999] pointer-events-none"
        variants={leftDoorVariants}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      />
      {/* Right Curtain Door */}
      <motion.div
        className="fixed top-0 right-0 w-[51vw] h-full bg-[#006266] z-[9999] pointer-events-none"
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
      <footer className="w-full max-w-[1240px] mx-auto px-6 md:px-10 lg:px-12 py-8 mt-auto border-t border-[#EBE7DD] flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        <p className="text-[12px] font-medium text-[#787265] tracking-wide">© 2020 — 2026 Vinicius Tamy</p>
        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/5524974020554"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#006266] text-white px-6 py-2 rounded-full font-medium text-[13px] hover:bg-[#004e52] transition-colors shadow-sm tracking-wide inline-block"
          >
            Say hello!
          </a>
          <a href="#" className="w-10 h-10 rounded-full border border-[#DCD7CA] bg-white flex items-center justify-center text-[14px] font-medium text-[#2C3539] hover:bg-[#F9F8F6] transition-colors shadow-sm">
            in
          </a>
          <a href="#" className="w-10 h-10 rounded-full border border-[#DCD7CA] bg-white flex items-center justify-center text-[14px] font-medium text-[#2C3539] hover:bg-[#F9F8F6] transition-colors shadow-sm">
            ig
          </a>
        </div>
      </footer>
    </motion.div>
  );
}

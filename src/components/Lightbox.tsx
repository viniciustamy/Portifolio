import React, { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export function Lightbox() {
  const [mounted, setMounted] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  useEffect(() => {
    setMounted(true);

    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ images: string[]; current?: string; index?: number }>;
      if (customEvent.detail && customEvent.detail.images) {
        const { images, current, index } = customEvent.detail;
        setImages(images);
        
        let newIndex = 0;
        if (typeof index === 'number') {
          newIndex = index;
        } else if (current) {
          const found = images.indexOf(current);
          if (found !== -1) newIndex = found;
        }
        
        setSelectedIndex(newIndex);
      }
    };

    window.addEventListener('open-lightbox', handleOpen);
    return () => {
      window.removeEventListener('open-lightbox', handleOpen);
    };
  }, []);

  const onClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const onPrev = useCallback(() => {
    setSelectedIndex((prev) => (prev === null || prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const onNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === null || prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    onPrev();
  }, [onPrev]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    onNext();
  }, [onNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && images.length > 1) {
      onNext();
    } else if (isRightSwipe && images.length > 1) {
      onPrev();
    }
  };

  // Keyboard accessibility
  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        handlePrev();
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, images.length, onClose, handlePrev, handleNext]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {selectedIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 md:p-10 select-none"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-[110] text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#00CBC6]"
            aria-label="Close details"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#00CBC6]"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#00CBC6]"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Lightbox Content Container */}
          <motion.div
            initial={{ scale: 0.95, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-[1240px] w-full flex flex-col rounded-2xl overflow-hidden shadow-2xl my-auto max-h-[90vh] bg-transparent border-0"
          >
            <div className="relative flex items-center justify-center overflow-hidden min-h-[350px] sm:min-h-[450px] md:min-h-[550px] p-2">
              <img
                src={images[selectedIndex]}
                alt={`Imagem ampliadas ${selectedIndex + 1}`}
                className="max-w-[95vw] max-h-[85vh] object-contain rounded-lg"
              />
              
              {/* Image Counter Overlay */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-full text-white font-mono text-xs tracking-wider">
                  {selectedIndex + 1} / {images.length}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { Maximize2 } from 'lucide-react';

interface PlatformTodayProps {
  images: string[];
}

export function PlatformToday({ images }: PlatformTodayProps) {
  return (
    <div className="w-full my-12">
      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <motion.div
            key={index}
            className="group relative cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#E9E4DB] hover:border-[#006266]/30 shadow-sm hover:shadow-md transition-all duration-300 aspect-[4/3] flex items-center justify-center bg-[#F5F2EB]"
            whileHover={{ y: -4 }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              const event = new CustomEvent('open-lightbox', {
                detail: {
                  images: images,
                  current: src
                }
              });
              window.dispatchEvent(event);
            }}
          >
            <img
              src={src}
              alt={`Plataforma hoje - Imagem ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Hover Overlay with Zoom Icon */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <div className="bg-white/90 p-3 rounded-full text-[#006266] shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <Maximize2 className="w-5 h-5" />
              </div>
            </div>
            
            <span className="absolute bottom-3 right-3 bg-black/60 text-white font-mono text-[10px] px-2 py-0.5 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Ampliar {index + 1}/{images.length}
            </span>
          </motion.div>
        ))}
      </div>
      
      {/* Single Caption for the 3 images */}
      <p className="text-center text-sm text-[#787265] mt-4 font-medium">
        Essas são imagens que mostram a plataforma como é hoje.
      </p>
    </div>
  );
}

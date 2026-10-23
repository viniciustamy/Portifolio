import React from 'react';
import { motion } from 'motion/react';
import { Maximize2 } from 'lucide-react';

export interface GalleryItem {
  src: string;
  title: string;
  description: string;
  fullWidth?: boolean;
}

interface GalleryProps {
  items: GalleryItem[];
}

export function Gallery({ items }: GalleryProps) {
  return (
    <div className="w-full">
      {/* Responsive Grid Layout */}
      <div className={`grid gap-6 my-8 ${
        items.length === 1 ? 'grid-cols-1' :
        items.length === 2 || items.length === 4 ? 'grid-cols-1 sm:grid-cols-2' :
        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      }`}>
        {items.map((item, index) => (
          <motion.div
            key={index}
            className={`group relative cursor-pointer bg-white rounded-lg overflow-hidden border border-[#E9E4DB] hover:border-[#9E4322]/30 hover:shadow-md transition-all duration-300 flex items-center justify-center bg-[#F5F2EB] ${
              item.fullWidth && items.length > 1 ? 'col-span-1 sm:col-span-2 lg:col-span-3 aspect-auto' : 
              items.length === 1 ? 'aspect-auto' : 'aspect-[4/3]'
            }`}
            whileHover={{ y: -4 }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              const event = new CustomEvent('open-lightbox', {
                detail: {
                  images: items.map(img => img.src),
                  current: item.src,
                  index: index
                }
              });
              window.dispatchEvent(event);
            }}
          >
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Overlay with zoom icon */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <div className="bg-white/90 p-3 rounded-full text-[#9E4322] shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <Maximize2 className="w-5 h-5" />
              </div>
            </div>
            
            {items.length > 1 && (
              <span className="absolute bottom-3 right-3 bg-black/60 text-white font-mono text-[10px] px-2 py-0.5 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Ampliar {index + 1}/{items.length}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

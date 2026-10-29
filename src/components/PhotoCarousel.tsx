import { useEffect, useState } from 'react';
import perfilImg from '../assets/images/perfil 2.jpg';
import workshopImg from '../assets/images/perfil-workshop.jpg';
import altinhaImg from '../assets/images/perfil-altinha.jpg';

// Fotos do sobre mim (página e slide 1 do deck): trocam sozinhas com um fade.
// pos ajusta o enquadramento de cada foto no recorte
const PHOTOS = [
  { src: perfilImg, pos: '50% 50%' },
  { src: workshopImg, pos: '40% 50%' },
  { src: altinhaImg, pos: '55% 40%' },
];
const INTERVAL = 4000;

export function PhotoCarousel({ className = '', alt = 'Vinicius Tamy' }: { className?: string; alt?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setIndex(i => (i + 1) % PHOTOS.length), INTERVAL);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`} role="img" aria-label={alt}>
      {PHOTOS.map((p, i) => (
        <img
          key={p.src}
          src={p.src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          style={{ objectPosition: p.pos, opacity: i === index ? 1 : 0 }}
        />
      ))}
    </div>
  );
}

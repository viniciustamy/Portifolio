import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import perfilImg from '../assets/images/perfil 2.jpg';
import workshopImg from '../assets/images/perfil-workshop.jpg';
import altinhaImg from '../assets/images/perfil-altinha.jpg';

// Fotos do sobre mim (página e slide 1 do deck): o card vira (flip) e mostra a próxima foto no verso.
// Dá uma volta pelas fotos ao abrir e para na primeira; o hover faz mais uma volta.
// pos ajusta o enquadramento de cada foto no recorte
const PHOTOS = [
  { src: perfilImg, pos: '50% 50%' },
  { src: workshopImg, pos: '40% 50%' },
  { src: altinhaImg, pos: '55% 40%' },
];
const INTERVAL = 4000;

export function PhotoCarousel({ className = '', alt = 'Vinicius Tamy' }: { className?: string; alt?: string }) {
  const [flips, setFlips] = useState(0);
  const [settled, setSettled] = useState(0); // último giro concluído
  const [target, setTarget] = useState(PHOTOS.length); // giros até voltar à primeira foto

  useEffect(() => {
    if (flips >= target || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => setFlips(n => n + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [flips, target]);

  // Parado na primeira foto, o hover começa outra volta já com o primeiro giro
  const replay = () => { if (flips >= target) { setTarget(flips + PHOTOS.length); setFlips(flips + 1); } };

  // A face virada para frente mostra a foto do último giro concluído; a de trás já carrega a próxima.
  // Só troca a foto da face que ficou de costas depois que o giro termina, para não piscar no meio
  const photoFor = (parity: number) => PHOTOS[(settled % 2 === parity ? settled : settled + 1) % PHOTOS.length];
  const front = photoFor(0);
  const back = photoFor(1);

  const face = 'absolute inset-0 overflow-hidden rounded-[inherit] [backface-visibility:hidden]';
  return (
    <div className={`relative [perspective:1600px] ${className}`} role="img" aria-label={alt} onMouseEnter={replay}>
      <motion.div
        className="absolute inset-0 rounded-[inherit] [transform-style:preserve-3d]"
        initial={false}
        animate={{ rotateY: flips * 180 }}
        transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        onAnimationComplete={() => setSettled(flips)}
      >
        <div className={face}>
          <img src={front.src} alt="" className="w-full h-full object-cover" style={{ objectPosition: front.pos }} />
        </div>
        <div className={face} style={{ transform: 'rotateY(180deg)' }}>
          <img src={back.src} alt="" className="w-full h-full object-cover" style={{ objectPosition: back.pos }} />
        </div>
      </motion.div>
    </div>
  );
}

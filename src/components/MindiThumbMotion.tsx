import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { IPhoneFrame, screenHeight } from './IPhoneFrame';
import { AnimatePresence, motion } from 'motion/react';
import { Bookmark, ChevronLeft, ChevronRight, Flame, Search, Send, Star, User, Users, X } from 'lucide-react';
import { BookmarkSimple, ChatCircleDots, Compass, FilmStrip, House, type Icon } from '@phosphor-icons/react';
import { wait } from './DevolutivaIaMotion';
import rottenImg from '../assets/images/Mindi-rotten-tomatoes.png';

/*
 * Thumb animada do case Mindi (app de filmes e séries): o app recriado num celular, a partir das
 * telas reais. Parado, mostra a Início. Em foco: a Início rola até as sugestões → toque num
 * pôster abre a página do filme → toque em "Avaliar" abre a gaveta de nota → a régua sobe até
 * "Obra-prima" → toque em "Avaliar" fecha a gaveta com a nota no botão → volta para a Início →
 * abre "A Origem" → toque em "Salvar" → toque em Lista, com o filme no topo dos salvos. E recomeça.
 * Pôsteres, fundos e logos vêm do TMDB, como no app.
 */

const STAGE_W = 700;
export const PHONE_W = 375;
const PHONE_TOP = 20;
export const SAFE_TOP = 54; // barra de status + Dynamic Island
export const SCREEN_H = screenHeight(PHONE_W);

// Cores do tema escuro do app (index.css do Mindi)
export const C = {
  bg: '#09090B',
  card: '#18181B',
  secondary: '#27272A',
  line: 'rgb(255 255 255 / .1)',
  text: '#FAFAFA',
  sub: '#A1A1AA',
  muted: '#71717A',
  accent: '#9296FF',
  primary: '#484AAC',
  imdb: '#F5C518',
};

export const img = (size: string, path: string) => `https://image.tmdb.org/t/p/${size}/${path}`;

export const POSTERS = {
  guardioes: img('w342', 'r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg'),
  ultimato: img('w342', '9fRX8UKlIW7Lb9GqNsJVakWWFCi.jpg'),
  odisseia: img('w342', 'pVCmLuATJ0lQs4Vx1zUJUN0if2A.jpg'),
  aranhaverso: img('w342', 'fBS6y0LYX4kU6pPSBYMdQy6SIHX.jpg'),
  futuro: img('w342', 'i996T0lI1fGtFEowiH3V6eZthL0.jpg'),
  bladeRunner: img('w342', '49pANIZXRAdHUiWjjBv4vxPeqRC.jpg'),
};
export const STREAMING = {
  disney: img('w92', '5eZ872CghnHFLB1j8grszbrx0dx.png'),
  hbo: img('w92', 'skypuy7SXuugIQeYg0IglmzoKaS.png'),
  netflix: img('w92', 'rK1KljqmbvO9HQa1PBFLILWah72.png'),
  prime: img('w92', 'gMZdpavHmxFNnLpMHwVxfqeux2g.png'),
};
const DUNA_BG = img('w780', 'eZ239CUp1d6OryZEBPnO2n87gMG.jpg');
export const GUARDIOES_BG = img('w780', 'uLtVbjvS1O7gXL8lUOwsFOH4man.jpg');
export const GUARDIOES_LOGO = img('w500', 'bMqfA9CQVZqClAMKZCRBdDChNe4.png');
const ORIGEM_POSTER = img('w342', '9e3Dz7aCANy5aRUQF745IlNloJ1.jpg');

// Os dois filmes que o motion abre
type Film = { bg: string; bgPos: string; logo: string; meta: string; age: string; ageColor: string; genres: string[]; imdb: string; rotten: string; tmdb: string; why: { Icon: any; text: any }[] };
const FILMS: Record<'guardioes' | 'origem', Film> = {
  guardioes: {
    bg: GUARDIOES_BG, bgPos: '60% center', logo: GUARDIOES_LOGO, meta: '2014 • 121 min', age: '12', ageColor: '#F5C518', genres: ['Ação', 'Ficção científica', 'Aventura'], imdb: '8.0', rotten: '91%', tmdb: '7.9',
    why: [
      { Icon: Star, text: <>Você avaliou 4 filmes de ficção e, em média, achou <b>excelente</b>.</> },
      { Icon: Users, text: <>Você viu 2 filmes com <b>Chris Pratt</b> e, em média, achou muito bom.</> },
    ],
  },
  origem: {
    bg: img('w780', '8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg'), bgPos: 'center', logo: img('w500', 'xxgYI7UcYiFalWa8EimBSoc7dlT.png'), meta: '2010 • 148 min', age: '14', ageColor: '#F07B2B', genres: ['Ação', 'Ficção científica', 'Crime'], imdb: '8.8', rotten: '86%', tmdb: '8.4',
    why: [
      { Icon: Star, text: <>Você viu 4 filmes dirigidos por <b>Christopher Nolan</b> e, em média, achou uma obra-prima.</> },
      { Icon: Users, text: <>Parecido com <b>"Interestelar"</b>, que você achou uma obra-prima.</> },
    ],
  },
};

// Escala de notas do app (types.ts do Mindi)
export const RATINGS = [
  { label: 'Péssimo', emoji: '😫' },
  { label: 'Ruim', emoji: '😕' },
  { label: 'Regular', emoji: '😐' },
  { label: 'Bom', emoji: '🙂' },
  { label: 'Muito bom', emoji: '😍' },
  { label: 'Excelente', emoji: '🤩' },
  { label: 'Obra-prima', emoji: '🤯' },
];

export type NavId = 'home' | 'explore' | 'chat' | 'list' | 'history';
// Mesmos ícones da navbar do app (Phosphor): contorno no normal, preenchido no ativo
const TABS: { id: NavId; label: string; Icon: Icon }[] = [
  { id: 'home', label: 'Início', Icon: House },
  { id: 'explore', label: 'Explorar', Icon: Compass },
  { id: 'chat', label: 'Chat', Icon: ChatCircleDots },
  { id: 'list', label: 'Lista', Icon: BookmarkSimple },
  { id: 'history', label: 'Histórico', Icon: FilmStrip },
];

// Wordmark oficial do Mindi (viewBox 865x241), copiado de components/Logo.tsx do app
const LOGO_PATHS = [
  "M47.9045 218.542C47.9045 233.514 40.1422 241 24.6176 241C17.0771 241 11.089 239.101 6.65341 235.302C2.2178 231.503 0 225.917 0 218.542V80.1099C0 53.7418 5.54451 33.854 16.6335 20.4465C27.9443 6.81548 44.5778 0 66.5341 0C82.724 0 96.1417 3.35187 106.787 10.0556C117.433 16.7594 124.53 26.3681 128.078 38.8818C131.627 26.3681 138.724 16.7594 149.369 10.0556C160.014 3.35187 173.654 0 190.287 0C212.909 0 229.653 6.59203 240.521 19.7761C251.388 32.7367 256.822 52.8479 256.822 80.1099V215.191C256.822 224.352 255.047 230.944 251.499 234.967C247.95 238.989 241.962 241 233.535 241C225.107 241 218.897 238.989 214.905 234.967C210.913 230.721 208.917 224.129 208.917 215.191V77.4284C208.917 55.306 199.491 44.2448 180.64 44.2448C171.103 44.2448 164.006 47.4849 159.349 53.9652C154.692 60.2221 152.363 70.2777 152.363 84.1321V211.839C152.363 221 150.589 227.593 147.04 231.615C143.492 235.637 137.504 237.648 129.076 237.648C120.648 237.648 114.439 235.637 110.447 231.615C106.455 227.369 104.458 220.777 104.458 211.839V84.1321C104.458 57.5406 95.0328 44.2448 76.1815 44.2448C57.3302 44.2448 47.9045 55.306 47.9045 77.4284V218.542Z",
  "M327.114 241C310.702 241 302.496 233.514 302.496 218.542V22.4576C302.496 14.6365 304.381 8.93834 308.151 5.363C311.922 1.78766 317.91 0 326.116 0C342.306 0 350.401 7.48586 350.401 22.4576V218.542C350.401 226.14 348.515 231.838 344.745 235.637C341.197 239.212 335.32 241 327.114 241Z",
  "M443.925 218.542C443.925 233.514 436.163 241 420.638 241C413.098 241 407.11 239.101 402.674 235.302C398.238 231.503 396.021 225.917 396.021 218.542V86.8136C396.021 65.8085 398.793 49.0491 404.337 36.5355C409.882 23.7983 418.975 14.5248 431.616 8.71487C444.258 2.90496 461.113 0 482.182 0C510.127 0 531.196 6.59203 545.39 19.7761C559.805 32.7367 567.013 55.0825 567.013 86.8136V218.542C567.013 233.514 559.251 241 543.726 241C536.186 241 530.198 239.101 525.762 235.302C521.326 231.503 519.109 225.917 519.109 218.542V86.8136C519.109 70.2777 516.225 58.5461 510.459 51.6189C504.915 44.4682 495.489 40.8929 482.182 40.8929C471.759 40.8929 463.774 42.4571 458.23 45.5855C452.685 48.7139 448.915 53.63 446.919 60.3338C444.923 67.0376 443.925 75.8642 443.925 86.8136V218.542Z",
  "M627.039 238.319C622.826 238.319 619.166 236.754 616.061 233.626C613.178 230.274 611.736 226.14 611.736 221.224V71.7302C611.736 48.4905 617.946 30.7256 630.366 18.4353C643.008 6.14511 661.193 0 684.924 0C747.022 0 778.072 40.5577 778.072 121.673C778.072 161.225 770.309 190.61 754.785 209.828C739.26 228.822 715.419 238.319 683.261 238.319H627.039ZM659.641 198.766H683.261C699.672 198.766 711.538 192.398 718.856 179.661C726.397 166.7 730.167 145.918 730.167 117.316C730.167 90.0538 726.729 70.7246 719.854 59.3282C713.201 47.7084 701.779 41.8985 685.589 41.8985C668.29 41.8985 659.641 48.267 659.641 61.0042V198.766Z",
  "M841.713 241C825.301 241 817.095 233.514 817.095 218.542V22.4576C817.095 14.6365 818.981 8.93834 822.751 5.363C826.521 1.78766 832.509 0 840.715 0C856.905 0 865 7.48586 865 22.4576V218.542C865 226.14 863.115 231.838 859.345 235.637C855.796 239.212 849.919 241 841.713 241Z",
];

function Logo() {
  return (
    <svg viewBox="0 0 865 241" fill="currentColor" style={{ height: 19, width: 'auto' }} aria-hidden="true">
      {LOGO_PATHS.map(d => <path key={d.slice(0, 12)} d={d} />)}
    </svg>
  );
}

// Barra de status do iPhone (a Dynamic Island vem da moldura)
export function StatusBar({ frosted }: { frosted: boolean }) {
  return (
    <div className="absolute inset-x-0 top-0 z-30 pointer-events-none" style={{ height: SAFE_TOP }}>
      {/* Vidro fosco do topo, como o header do app ao rolar */}
      <motion.span className="absolute inset-x-px top-px bottom-0 backdrop-blur-md rounded-t-[59px]" initial={false} animate={{ opacity: frosted ? 1 : 0 }} transition={{ duration: 0.4 }} style={{ background: 'rgb(9 9 11 / .82)', clipPath: 'inset(0 round 59px 59px 0 0)' }} />
      <span className="absolute text-[16px] font-semibold" style={{ left: 50, top: 18, fontFamily: '-apple-system, "SF Pro Text", "Inter", sans-serif' }}>9:41</span>
      <span className="absolute flex items-center gap-[6px]" style={{ right: 28, top: 21 }}>
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.3c2.3 0 4.4.9 6 2.4l1.2-1.2A10.2 10.2 0 0 0 8 .6 10.2 10.2 0 0 0 .8 3.5L2 4.7a8.5 8.5 0 0 1 6-2.4Zm0 3.4c1.4 0 2.6.5 3.6 1.4l1.2-1.2A6.8 6.8 0 0 0 8 4a6.8 6.8 0 0 0-4.8 1.9l1.2 1.2c1-.9 2.2-1.4 3.6-1.4Zm0 3.4c.5 0 1 .2 1.3.5L8 11 6.7 9.6c.3-.3.8-.5 1.3-.5Z" /></svg>
        <span className="relative" style={{ width: 27, height: 13 }}>
          <span className="absolute inset-0 rounded-[4px]" style={{ border: '1px solid rgb(255 255 255 / .4)' }} />
          <span className="absolute rounded-[2px] bg-white" style={{ left: 2, top: 2, bottom: 2, width: 19 }} />
        </span>
      </span>
    </div>
  );
}

const ease = [0.65, 0, 0.35, 1] as const;

const IconButton = ({ children }: { children: any }) => (
  <span className="flex items-center justify-center w-9 h-9 rounded-full" style={{ background: 'rgb(24 24 27 / .7)', border: `0.5px solid ${C.line}` }}>{children}</span>
);

export function TopBar({ back = false }: { back?: boolean }) {
  return (
    <div className="absolute inset-x-0 z-20 flex items-center justify-between px-[18px]" style={{ top: SAFE_TOP + 6, height: 40 }}>
      {back ? <ChevronLeft size={24} /> : <Logo />}
      <HeaderIcons />
    </div>
  );
}

// Busca e avatar (com o ponto de notificação), à direita de todos os headers
export function HeaderIcons() {
  return (
    <span className="flex items-center gap-3.5">
      <Search size={20} />
      <span className="relative"><IconButton><User size={16} /></IconButton><span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full" style={{ background: C.accent }} /></span>
    </span>
  );
}

export function Chip({ children }: { children: any; key?: string }) {
  return <span className="rounded-full px-3 py-[5px] text-[13px] font-medium" style={{ background: 'rgb(255 255 255 / .1)' }}>{children}</span>;
}

// IMDb · Rotten Tomatoes · TMDB, como na linha de notas do app
export function Ratings({ imdb, rotten, tmdb }: { imdb: string; rotten: string; tmdb: string }) {
  return (
    <div className="flex items-center justify-center gap-2.5 text-[14px] font-semibold">
      <span className="flex items-center gap-1.5"><span className="rounded-[3px] px-1 text-[10px] font-black leading-[15px] text-black" style={{ background: C.imdb }}>IMDb</span>{imdb}</span>
      <span style={{ color: C.muted }}>•</span>
      <span className="flex items-center gap-1.5"><img src={rottenImg} alt="" style={{ height: 15 }} />{rotten}</span>
      <span style={{ color: C.muted }}>•</span>
      <span className="flex items-center gap-1.5"><span className="text-[11px] font-medium" style={{ color: C.sub }}>TMDB</span>{tmdb}</span>
    </div>
  );
}

export function ActionButton({ children, pressed = false, primary = false }: { children: any; pressed?: boolean; primary?: boolean }) {
  return (
    <motion.span
      className="flex items-center justify-center gap-2 rounded-full text-[15px] font-semibold"
      style={{ width: 156, height: 44, background: primary ? C.primary : 'rgb(39 39 42 / .85)', border: `0.5px solid ${C.line}` }}
      animate={{ scale: pressed ? 0.94 : 1 }}
      transition={{ duration: 0.12 }}
    >
      {children}
    </motion.span>
  );
}

// Card de pôster das listas da Início: salvar, afinidade, avaliar e o streaming
export function PosterCard({ src, title, meta, imdb, affinity, streaming, pressed = false }: { src: string; title: string; meta: string; imdb?: string; affinity?: number; streaming?: string; pressed?: boolean; key?: string }) {
  return (
    <motion.div className="shrink-0" style={{ width: 160 }} animate={{ scale: pressed ? 0.95 : 1 }} transition={{ duration: 0.14 }}>
      <span className="relative block rounded-[16px] overflow-hidden" style={{ width: 160, height: 240, background: C.card }}>
        <img src={src} alt="" className="w-full h-full object-cover" />
        <span className="absolute left-2 top-2 flex items-center justify-center w-8 h-8 rounded-full" style={{ background: 'rgb(0 0 0 / .45)', border: '1px solid rgb(255 255 255 / .25)' }}><Bookmark size={14} /></span>
        {streaming && <img src={streaming} alt="" className="absolute right-2 top-2 w-7 h-7 rounded-[7px] object-cover" />}
        {affinity && <span className="absolute left-2 bottom-2 flex items-center gap-1 rounded-full px-2 py-1 text-[11.5px] font-semibold" style={{ background: C.primary }}><Flame size={11} fill="currentColor" /> {affinity}%</span>}
        <span className="absolute right-2 bottom-2 flex items-center justify-center w-8 h-8 rounded-full" style={{ background: 'rgb(0 0 0 / .55)', border: '1px solid rgb(255 255 255 / .25)' }}><Star size={14} /></span>
      </span>
      <p className="text-[15px] font-semibold leading-snug mt-2.5 line-clamp-2">{title}</p>
      <p className="text-[12.5px] mt-0.5" style={{ color: C.muted }}>{meta}</p>
      {imdb && <p className="flex items-center gap-1.5 mt-1 text-[12.5px] font-semibold"><span className="rounded-[3px] px-1 text-[9px] font-black text-black" style={{ background: C.imdb }}>IMDb</span>{imdb}</p>}
    </motion.div>
  );
}

export function SectionTitle({ title, sub, more }: { title: string; sub?: string; more?: boolean }) {
  return (
    <div className="flex items-start justify-between px-[18px] mb-3.5">
      <div>
        <p className="text-[20px] font-bold tracking-tight leading-tight">{title}</p>
        {sub && <p className="text-[13px] mt-1" style={{ color: C.sub }}>{sub}</p>}
      </div>
      {more && <span className="flex items-center gap-1 text-[12.5px] mt-1 whitespace-nowrap" style={{ color: C.sub }}>Ver todos <ChevronRight size={13} /></span>}
    </div>
  );
}

// Posições fixas para os toques (coordenadas da tela do celular, antes da rolagem)
const HERO_H = 640;
const ROW_TOP = HERO_H + 70; // primeira fileira de pôsteres
const HOME_SCROLL = 560;
const TAP_POSTER = { x: 18 + 80, y: ROW_TOP + 120 - HOME_SCROLL };
const TAP_SECOND = { x: 18 + 160 + 14 + 80, y: ROW_TOP + 120 - HOME_SCROLL };

function HomeScreen({ pressedPoster, pressedSecond = false }: { pressedPoster: boolean; pressedSecond?: boolean }) {
  return (
    <div style={{ background: C.bg }}>
      {/* Destaque do carrossel, com o fundo do filme ocupando a tela */}
      <div className="relative" style={{ height: HERO_H }}>
        <img src={DUNA_BG} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <TopBar />
        <span className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgb(9 9 11 / .35) 0%, rgb(9 9 11 / .1) 30%, rgb(9 9 11 / .75) 62%, ${C.bg} 92%)` }} />
        {/* Filmes / Séries */}
        <div className="absolute inset-x-[18px] flex rounded-full p-1" style={{ top: SAFE_TOP + 60, height: 50, background: 'rgb(24 24 27 / .6)', border: `0.5px solid ${C.line}` }}>
          <span className="flex-1 flex items-center justify-center gap-2 rounded-full text-[15px] font-semibold" style={{ background: 'rgb(63 63 70 / .9)' }}>Filmes</span>
          <span className="flex-1 flex items-center justify-center gap-2 text-[15px] font-medium" style={{ color: '#D4D4D8' }}>Séries</span>
        </div>
        <div className="absolute inset-x-0 flex flex-col items-center text-center" style={{ top: 300 }}>
          <span className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-semibold" style={{ background: C.primary }}><Flame size={13} fill="currentColor" /> 82% de afinidade</span>
          <p className="text-[34px] font-extrabold tracking-[0.06em] uppercase leading-none mt-4" style={{ textShadow: '0 2px 12px rgb(0 0 0 / .5)' }}>Duna: Parte Dois</p>
          <p className="text-[13px] mt-3" style={{ color: C.sub }}>2024 • 167 min</p>
          <div className="flex gap-2 mt-3.5"><Chip>Ficção científica</Chip><Chip>Aventura</Chip></div>
          <div className="mt-4"><Ratings imdb="8.5" rotten="92%" tmdb="8.1" /></div>
          <div className="flex gap-3 mt-6">
            <ActionButton><Bookmark size={16} /> Salvar</ActionButton>
            <ActionButton><Star size={16} /> Avaliar</ActionButton>
          </div>
          <div className="flex gap-3 mt-7">
            {[0, 1, 2, 3, 4].map(i => <span key={i} className="h-1.5 rounded-full" style={{ width: i === 2 ? 20 : 6, background: i === 2 ? C.accent : 'rgb(255 255 255 / .3)' }} />)}
          </div>
        </div>
      </div>

      <div style={{ paddingTop: ROW_TOP - HERO_H - 56 }}>
        <SectionTitle title="Sugestões nos seus streamings" more />
        <div className="flex gap-3.5 px-[18px] overflow-hidden">
          <PosterCard src={POSTERS.guardioes} title="Guardiões da Galáxia" meta="Ação • 2014 • 121 min" imdb="8.0" affinity={81} streaming={STREAMING.disney} pressed={pressedPoster} />
          <PosterCard src={ORIGEM_POSTER} title="A Origem" meta="Ação • 2010 • 148 min" imdb="8.8" affinity={84} streaming={STREAMING.hbo} pressed={pressedSecond} />
          <PosterCard src={POSTERS.ultimato} title="Vingadores: Ultimato" meta="Aventura • 2019" streaming={STREAMING.disney} />
        </div>
        <div className="mt-9">
          <SectionTitle title="Viagem no tempo" sub={'Porque você curtiu "Interestelar"'} />
          <div className="flex gap-3.5 px-[18px] overflow-hidden">
            <PosterCard src={POSTERS.futuro} title="De Volta para o Futuro" meta="Aventura • 1985 • 115 min" imdb="8.5" streaming={STREAMING.prime} />
            <PosterCard src={POSTERS.bladeRunner} title="Blade Runner 2049" meta="Ficção • 2017 • 164 min" imdb="8.0" streaming={STREAMING.netflix} />
            <PosterCard src={POSTERS.aranhaverso} title="Homem-Aranha: Através do Aranhaverso" meta="Animação • 2023" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Página do filme, com o botão de nota mudando depois da avaliação
const BTN_TOP = 548;
const TAP_RATE = { x: (PHONE_W + 12) / 2 + 78, y: BTN_TOP + 22 };

function DetailScreen({ film, rated, saved = false, pressedRate, pressedSave = false }: { film: Film; rated: number | null; saved?: boolean; pressedRate: boolean; pressedSave?: boolean }) {
  return (
    <div style={{ background: C.bg }}>
      <div className="relative" style={{ height: 520 }}>
        <img src={film.bg} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: film.bgPos }} />
        <span className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgb(9 9 11 / .3) 0%, rgb(9 9 11 / 0) 25%, rgb(9 9 11 / .7) 62%, ${C.bg} 96%)` }} />
        <div className="absolute inset-x-0 flex flex-col items-center" style={{ top: 330 }}>
          <span className="flex items-end justify-center" style={{ height: 82 }}><img src={film.logo} alt="" style={{ maxHeight: 82, maxWidth: 290, width: 'auto', filter: 'drop-shadow(0 2px 8px rgb(0 0 0 / .5))' }} /></span>
          <p className="flex items-center gap-2 text-[13px] mt-4" style={{ color: C.sub }}>{film.meta} <span className="rounded-[4px] px-1 text-[11px] font-bold text-black" style={{ background: film.ageColor }}>{film.age}</span></p>
          <div className="flex gap-2 mt-3">{film.genres.map(g => <Chip key={g}>{g}</Chip>)}</div>
        </div>
      </div>
      <div className="relative" style={{ marginTop: -14 }}>
        <Ratings imdb={film.imdb} rotten={film.rotten} tmdb={film.tmdb} />
      </div>
      <div className="absolute inset-x-0 flex justify-center gap-3" style={{ top: BTN_TOP }}>
        <ActionButton pressed={pressedSave} primary={saved}><Bookmark size={16} fill={saved ? '#fff' : 'none'} /> {saved ? 'Salvo' : 'Salvar'}</ActionButton>
        <ActionButton pressed={pressedRate} primary={rated !== null}>
          {rated !== null ? <><span className="text-[16px] leading-none">{RATINGS[rated].emoji}</span> {RATINGS[rated].label}</> : <><Star size={16} /> Avaliar</>}
        </ActionButton>
      </div>
      <p className="absolute inset-x-0 flex items-center justify-center gap-2 text-[14px]" style={{ top: BTN_TOP + 64, color: C.sub }}><Send size={15} /> Recomendar</p>
      <div className="absolute inset-x-[18px]" style={{ top: BTN_TOP + 112 }}>
        <p className="text-[20px] font-bold tracking-tight">Por que você vai gostar</p>
        <div className="mt-3 rounded-[18px] overflow-hidden" style={{ background: C.card, border: `0.5px solid ${C.line}` }}>
          {film.why.map(({ Icon, text }, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3.5 text-[14px] leading-snug" style={{ borderTop: i ? `0.5px solid ${C.line}` : 'none' }}>
              <Icon size={18} color={C.accent} className="shrink-0" />
              <span className="flex-1">{text}</span>
              <ChevronRight size={16} color={C.muted} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Lista: o filme recém-salvo entra no topo dos salvos
const LIST = [
  { src: ORIGEM_POSTER, title: 'A Origem', meta: 'Ação • 2010', s: STREAMING.hbo, fresh: true },
  { src: POSTERS.bladeRunner, title: 'Blade Runner 2049', meta: 'Ficção • 2017', s: STREAMING.netflix },
  { src: POSTERS.futuro, title: 'De Volta para o Futuro', meta: 'Aventura • 1985', s: STREAMING.prime },
  { src: POSTERS.aranhaverso, title: 'Homem-Aranha: Através do Aranhaverso', meta: 'Animação • 2023' },
];
function ListScreen() {
  return (
    <div style={{ background: C.bg }}>
      <div className="flex items-center justify-between px-[18px]" style={{ paddingTop: SAFE_TOP + 8, height: SAFE_TOP + 8 + 40 }}>
        <span className="text-[30px] font-bold tracking-[-0.02em]">Lista</span>
        <HeaderIcons />
      </div>
      <div className="mx-[18px] mt-4 flex rounded-full p-1" style={{ height: 50, background: C.card, border: `0.5px solid ${C.line}` }}>
        <span className="flex-1 flex items-center justify-center rounded-full text-[15px] font-semibold" style={{ background: 'rgb(63 63 70 / .9)' }}>Filmes</span>
        <span className="flex-1 flex items-center justify-center text-[15px] font-medium" style={{ color: '#D4D4D8' }}>Séries</span>
      </div>
      <div className="flex items-center justify-between px-[18px] mt-5 text-[14px]"><span style={{ color: C.sub }}>4 filmes salvos</span><span className="flex items-center gap-2">Filtrar</span></div>
      <div className="grid grid-cols-2 gap-x-3.5 gap-y-5 px-[18px] mt-5">
        {LIST.map((x, i) => (
          <motion.div key={x.title} className="relative" initial={x.fresh ? { opacity: 0, scale: 0.9 } : false} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, delay: 0.35 }}>
            <PosterCard src={x.src} title={x.title} meta={x.meta} streaming={x.s} />
            <span className="absolute left-2 top-2 flex items-center justify-center w-8 h-8 rounded-full" style={{ background: C.primary }}><Bookmark size={14} fill="#fff" /></span>
            {x.fresh && <motion.span className="absolute inset-0 rounded-[16px] pointer-events-none" style={{ height: 240, boxShadow: `0 0 0 2px ${C.accent}` }} initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.6, delay: 0.6 }} />}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Gaveta de avaliação: pôster, emoji grande, régua de 7 pontos
const SHEET_TOP = 110;
const SLIDER_Y = 560;
const SLIDER_X0 = 34;
const SLIDER_STEP = (PHONE_W - 68) / 6;
const TAP_CONFIRM = { x: PHONE_W / 2, y: 692 };

function RatingSheet({ score, pressed }: { score: number; pressed: boolean; key?: string }) {
  const r = RATINGS[score];
  return (
    <motion.div className="absolute inset-x-0 bottom-0 z-40 rounded-t-[28px]" style={{ top: SHEET_TOP, background: 'linear-gradient(to bottom, #2A211B, #18181B 30%)', border: `0.5px solid ${C.line}` }} initial={{ y: SCREEN_H }} animate={{ y: 0 }} exit={{ y: SCREEN_H }} transition={{ duration: 0.45, ease }}>
      <span className="absolute left-1/2 -translate-x-1/2 top-3 w-10 h-1 rounded-full" style={{ background: 'rgb(255 255 255 / .25)' }} />
      <X size={20} className="absolute right-5 top-5" color={C.sub} />
      <div className="flex flex-col items-center pt-9">
        <img src={POSTERS.guardioes} alt="" className="rounded-[12px] object-cover" style={{ width: 128, height: 190 }} />
        <p className="text-[17px] font-bold mt-4">Guardiões da Galáxia</p>
        <p className="text-[13px]" style={{ color: C.sub }}>2014</p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={score} className="block leading-none mt-5" style={{ fontSize: 70 }} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.18 }}>{r.emoji}</motion.span>
        </AnimatePresence>
        <p className="text-[19px] font-bold mt-3">{r.label}</p>
        <p className="text-[12px] mt-0.5" style={{ color: C.sub }}>Arraste ou toque para mudar</p>
      </div>
      {/* Régua */}
      <div className="absolute" style={{ left: SLIDER_X0, right: SLIDER_X0, top: SLIDER_Y - SHEET_TOP - 3, height: 6 }}>
        <span className="absolute inset-0 rounded-full" style={{ background: 'rgb(255 255 255 / .12)' }} />
        <motion.span className="absolute left-0 top-0 bottom-0 rounded-full" style={{ background: C.accent }} initial={false} animate={{ width: score * SLIDER_STEP }} transition={{ duration: 0.35, ease }} />
        {RATINGS.map((_, i) => <span key={i} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full" style={{ left: i * SLIDER_STEP, background: i <= score ? '#fff' : 'rgb(255 255 255 / .35)' }} />)}
        <motion.span className="absolute top-1/2 w-7 h-7 rounded-full bg-white" style={{ marginTop: -14, marginLeft: -14, boxShadow: `0 0 0 4px rgb(146 150 255 / .35)` }} initial={false} animate={{ left: score * SLIDER_STEP }} transition={{ duration: 0.35, ease }} />
      </div>
      <div className="absolute flex justify-between" style={{ left: SLIDER_X0 - 10, right: SLIDER_X0 - 10, top: SLIDER_Y - SHEET_TOP + 26 }}>
        {RATINGS.map((x, i) => <span key={i} className="text-[19px] w-5 text-center transition-opacity duration-200" style={{ opacity: i === score ? 1 : 0.45 }}>{x.emoji}</span>)}
      </div>
      <div className="absolute flex justify-between text-[12.5px]" style={{ left: 22, right: 22, top: SLIDER_Y - SHEET_TOP + 64, color: C.sub }}><span>Péssimo</span><span>Obra-prima</span></div>
      <motion.span className="absolute inset-x-[22px] flex items-center justify-center rounded-full text-[15px] font-semibold" style={{ top: TAP_CONFIRM.y - SHEET_TOP - 23, height: 46, background: C.primary }} animate={{ scale: pressed ? 0.96 : 1 }} transition={{ duration: 0.12 }}>Avaliar</motion.span>
      <p className="absolute inset-x-0 text-center text-[14px]" style={{ top: TAP_CONFIRM.y - SHEET_TOP + 40, color: C.sub }}>Não me interessa</p>
    </motion.div>
  );
}

// Centro de cada item do menu de baixo (para os toques)
const navPoint = (i: number) => ({ x: 16 + 6 + ((PHONE_W - 32 - 12) / 5) * (i + 0.5), y: SCREEN_H - 22 - 32 });

// Menu de baixo flutuante, em pílula, com a aba ativa destacada
export function NavPill({ active }: { active: NavId | null }) {
  return (
    <div className="absolute z-30 flex items-center justify-around rounded-full backdrop-blur-md px-1.5" style={{ left: 16, right: 16, top: SCREEN_H - 22 - 64, height: 64, background: 'rgb(24 24 27 / .78)', border: `0.5px solid ${C.line}` }}>
      {TABS.map(({ id, label, Icon }) => {
        const on = id === active;
        return (
          <span key={id} className="relative flex flex-1 flex-col items-center justify-center rounded-full" style={{ height: 52, color: on ? C.accent : C.sub, background: on ? 'rgb(63 63 70 / .55)' : 'transparent' }}>
            <Icon size={22} weight={on ? 'fill' : 'regular'} />
            <span className="text-[10px] leading-[12px] mt-1" style={{ fontWeight: on ? 600 : 500 }}>{label}</span>
          </span>
        );
      })}
    </div>
  );
}

type Tap = { x: number; y: number; id: number } | null;

// stageW maior deixa o celular menor (mostra mais tela); phoneTop sobe ou desce o celular;
// showNav=false esconde o menu de baixo (usado na apresentação, onde o celular sai pela borda)
export function MindiThumbMotion({ active, stageW = STAGE_W, phoneTop = PHONE_TOP, showNav = true }: { active: boolean; stageW?: number; phoneTop?: number; showNav?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState({ w: 0, h: 0 });
  const [screen, setScreen] = useState<'home' | 'detail' | 'detail2' | 'list'>('home');
  const [saved, setSaved] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [sheet, setSheet] = useState(false);
  const [score, setScore] = useState(3);
  const [rated, setRated] = useState<number | null>(null);
  const [pressed, setPressed] = useState<'poster' | 'second' | 'rate' | 'confirm' | 'back' | 'save' | 'nav' | null>(null);
  const [tap, setTap] = useState<Tap>(null);

  const scale = size.w / stageW;
  const stageH = scale ? size.h / scale : 0;
  const phoneLeft = (stageW - PHONE_W) / 2;

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setSize({ w: entry.contentRect.width, h: entry.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const reset = () => { setScreen('home'); setScroll(0); setSheet(false); setScore(3); setRated(null); setSaved(false); setPressed(null); setTap(null); };
    if (!active || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { reset(); return; }

    const token = { cancelled: false };
    let tapId = 0;
    const tapAt = async (pt: { x: number; y: number }, what: 'poster' | 'second' | 'rate' | 'confirm' | 'back' | 'save' | 'nav') => {
      setTap({ ...pt, id: ++tapId });
      setPressed(what);
      await wait(170, token);
      setPressed(null);
    };

    const run = async () => {
      while (!token.cancelled) {
        reset();
        await wait(1500, token);
        // 1. Rola a Início até as sugestões
        setScroll(HOME_SCROLL);
        await wait(2000, token);
        // 2. Abre o filme
        await tapAt(TAP_POSTER, 'poster');
        await wait(120, token);
        setScreen('detail');
        setScroll(0);
        await wait(1900, token);
        // 3. Avaliar: abre a gaveta e sobe a régua até Obra-prima
        await tapAt(TAP_RATE, 'rate');
        setSheet(true);
        await wait(1100, token);
        for (const s of [4, 5, 6]) {
          setScore(s);
          await wait(520, token);
        }
        await wait(700, token);
        await tapAt(TAP_CONFIRM, 'confirm');
        await wait(150, token);
        setSheet(false);
        setRated(6);
        await wait(2200, token);
        // 4. Volta para a Início, já rolada, e abre A Origem
        await tapAt({ x: 30, y: SAFE_TOP + 26 }, 'back');
        setScreen('home');
        setScroll(HOME_SCROLL);
        await wait(1500, token);
        await tapAt(TAP_SECOND, 'second');
        await wait(120, token);
        setScreen('detail2');
        setScroll(0);
        await wait(1800, token);
        // 5. Salva e vai para a Lista
        await tapAt({ x: (PHONE_W - 12) / 2 - 78, y: BTN_TOP + 22 }, 'save');
        setSaved(true);
        await wait(1400, token);
        await tapAt(navPoint(3), 'nav');
        setScreen('list');
        await wait(3400, token);
      }
    };
    run().catch(() => {});
    return () => { token.cancelled = true; };
  }, [active]);

  return (
    <div ref={wrapRef} className="absolute inset-0 select-none" aria-hidden="true">
      {scale > 0 && (
        <div className="absolute left-0 top-0 origin-top-left" style={{ width: stageW, height: stageH, transform: `scale(${scale})`, color: C.text, fontFamily: '"DM Sans", "Inter", sans-serif' }}>
          {/* Celular na moldura real do iPhone 17 */}
          <IPhoneFrame left={phoneLeft} top={phoneTop} width={PHONE_W} background={C.bg}>
            <StatusBar frosted={scroll > 0} />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={screen} className="absolute inset-0" initial={{ opacity: 0, x: screen === 'detail' || screen === 'detail2' ? 30 : -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }}>
                <motion.div initial={false} animate={{ y: -scroll }} transition={{ duration: 1.6, ease }}>
                  {screen === 'home' && <HomeScreen pressedPoster={pressed === 'poster'} pressedSecond={pressed === 'second'} />}
                  {screen === 'detail' && <DetailScreen film={FILMS.guardioes} rated={rated} pressedRate={pressed === 'rate'} />}
                  {screen === 'detail2' && <DetailScreen film={FILMS.origem} rated={null} saved={saved} pressedRate={false} pressedSave={pressed === 'save'} />}
                  {screen === 'list' && <ListScreen />}
                </motion.div>
                {(screen === 'detail' || screen === 'detail2') && <TopBar back />}
              </motion.div>
            </AnimatePresence>

            {showNav && <NavPill active={screen === 'home' ? 'home' : screen === 'list' ? 'list' : null} />}

            {/* Fundo escurecido + gaveta de avaliação */}
            <AnimatePresence>
              {sheet && <motion.span key="dim" className="absolute inset-0 z-30" style={{ background: 'rgb(0 0 0 / .55)', backdropFilter: 'blur(4px)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />}
              {sheet && <RatingSheet key="sheet" score={score} pressed={pressed === 'confirm'} />}
            </AnimatePresence>

            {/* Toque */}
            <AnimatePresence>
              {tap && (
                <motion.span
                  key={tap.id}
                  className="absolute rounded-full pointer-events-none z-50"
                  style={{ left: tap.x - 22, top: tap.y - 22, width: 44, height: 44, background: 'rgb(255 255 255 / .35)' }}
                  initial={{ scale: 0.4, opacity: 0.9 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  onAnimationComplete={() => setTap(t => (t && t.id === tap.id ? null : t))}
                />
              )}
            </AnimatePresence>
          </IPhoneFrame>
        </div>
      )}
    </div>
  );
}

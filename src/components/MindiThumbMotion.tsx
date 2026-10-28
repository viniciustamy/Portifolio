import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Bookmark, ChevronRight, Filter, Search, Star, User } from 'lucide-react';
import { BookmarkSimple, ChatCircleDots, Compass, FilmStrip, House, type Icon } from '@phosphor-icons/react';
import { wait } from './DevolutivaIaMotion';

/*
 * Thumb animada do case Mindi (app de filmes e séries): o app recriado num celular sobre o fundo
 * escuro do próprio app. Parado, mostra a Início. Em foco: rola um pouco a Início → toca em
 * Explorar e rola → Lista e rola → Histórico e rola → volta para a Início. As listas usam
 * títulos de exemplo para simular um app em uso. Os pôsteres vêm do TMDB, como no app.
 */

const STAGE_W = 700;
const PHONE_W = 375;
const PHONE_TOP = 20;
const NAV_H = 62;
const SAFE_TOP = 54; // barra de status + Dynamic Island

const C = {
  bg: '#09090B',
  panel: '#141417',
  line: 'rgb(255 255 255 / .1)',
  text: '#FAFAFA',
  sub: '#A1A1AA',
  muted: '#71717A',
  accent: '#9296FF',
  accentDeep: '#5B5FD6',
  imdb: '#F5C518',
};

const T = (path: string) => `https://image.tmdb.org/t/p/w342/${path}.jpg`;

const P = {
  planeta: T('oX1U93oKoHhIntXLvkCrtGgxM7k'),
  planetaBg: 'https://image.tmdb.org/t/p/w780/5t6ImiTApy90YJ2QgYOCkjeav58.jpg',
  origem: T('9e3Dz7aCANy5aRUQF745IlNloJ1'),
  sonho: T('umX3lBhHoTV7Lsci140Yr8VpXyN'),
  aranha: T('x0nvYzQpyJc5pdT9lMnkMuYAg0O'),
  zona: T('5tQ8kDNk00HPuVb43pZH1BmcNWQ'),
  odisseia: T('muMwJAiMtReEHLKpKMWt2rMkYF7'),
  bosque: T('mcuUYNWGJHPEaRumOlgSZCzMRPc'),
  oppenheimer: T('dUPQszWoRSE9FucJTbVp2bwEi9G'),
  tudo: T('2dSZQGwijlXvMSyuGe0FSgrXnv0'),
  parasita: T('bNGW8zYA91VqTZfV3jnKHPEKKvB'),
  nomadland: T('pLwarSuyUjw6vF0U6JhlHzAa1Gp'),
  devoradores: T('2i8uru7rlbHKaoIbC2V4FZLT7uW'),
  ak47: T('4djODIhP8TZtjkG6w2xZjOuLk6'),
  duna: T('uzERcfV2rSHNhW5eViQiO9hNiA7'),
  clube: T('mCICnh7QBH0gzYaTQChBDDVIKdm'),
  blade: T('49pANIZXRAdHUiWjjBv4vxPeqRC'),
  tenet: T('Ae0pbv4E6YfqfN3UjKWIfQSzP9v'),
  chegada: T('3rDwbFpn6z5HJUgDjpfhEePx8VI'),
  futuro: T('i996T0lI1fGtFEowiH3V6eZthL0'),
  nolan: 'https://image.tmdb.org/t/p/w185/xuAIuYSmsUzKlUMBFGVZaWsY3DZ.jpg',
  villeneuve: 'https://image.tmdb.org/t/p/w185/xzQYqb4nR8xT7Zdw5itbEL9K3fd.jpg',
  kwan: 'https://image.tmdb.org/t/p/w185/rVAZLUZhuKCmdzhCsSiOf8j64IA.jpg',
};

type Tab = 'home' | 'explore' | 'list' | 'history';
// Mesmos ícones da navbar do app (Phosphor): contorno no normal, preenchido no ativo
const TABS: { id: Tab | 'chat'; label: string; Icon: Icon }[] = [
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
    <svg viewBox="0 0 865 241" fill="currentColor" style={{ height: 21, width: 'auto' }} aria-hidden="true">
      {LOGO_PATHS.map(d => <path key={d.slice(0, 12)} d={d} />)}
    </svg>
  );
}

// Barra de status do iPhone, com a Dynamic Island no meio
function StatusBar({ scrolled }: { scrolled: boolean }) {
  return (
    <div className="absolute inset-x-0 top-0 z-30 pointer-events-none" style={{ height: SAFE_TOP }}>
      {/* Vidro fosco do topo, como o header do app ao rolar */}
      <motion.span className="absolute inset-0 backdrop-blur-md rounded-t-[52px]" initial={false} animate={{ opacity: scrolled ? 1 : 0 }} transition={{ duration: 0.4 }} style={{ background: "rgb(9 9 11 / .82)", borderBottom: "0.5px solid rgb(255 255 255 / .06)" }} />
      <span className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black" style={{ top: 11, width: 122, height: 35 }} />
      <span className="absolute text-[16px] font-semibold" style={{ left: 50, top: 18, fontFamily: '-apple-system, "SF Pro Text", "Inter", sans-serif' }}>9:41</span>
      <span className="absolute flex items-center gap-[6px]" style={{ right: 28, top: 21 }}>
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.3c2.3 0 4.4.9 6 2.4l1.2-1.2A10.2 10.2 0 0 0 8 .6 10.2 10.2 0 0 0 .8 3.5L2 4.7a8.5 8.5 0 0 1 6-2.4Zm0 3.4c1.4 0 2.6.5 3.6 1.4l1.2-1.2A6.8 6.8 0 0 0 8 4a6.8 6.8 0 0 0-4.8 1.9l1.2 1.2c1-.9 2.2-1.4 3.6-1.4Zm0 3.4c.5 0 1 .2 1.3.5L8 11 6.7 9.6c.3-.3.8-.5 1.3-.5Z" /></svg>
        <span className="relative" style={{ width: 27, height: 13 }}>
          <span className="absolute inset-0 rounded-[4px]" style={{ border: '1px solid rgb(255 255 255 / .4)' }} />
          <span className="absolute rounded-[2px] bg-white" style={{ left: 2, top: 2, bottom: 2, width: 19 }} />
          <span className="absolute rounded-r-sm" style={{ right: -3, top: 4, width: 1.5, height: 5, background: 'rgb(255 255 255 / .4)' }} />
        </span>
      </span>
    </div>
  );
}

const ease = [0.65, 0, 0.35, 1] as const;

function Header({ title }: { title?: string }) {
  return (
    <div className="flex items-center justify-between px-[18px]" style={{ paddingTop: SAFE_TOP + 14, height: SAFE_TOP + 14 + 40 }}>
      {title
        ? <span className="text-[28px] font-semibold leading-[32px] tracking-[-0.025em]">{title}</span>
        : <Logo />}
      <span className="flex items-center gap-4">
        <Search size={20} />
        <span className="relative flex items-center justify-center w-8 h-8 rounded-full" style={{ background: 'rgb(255 255 255 / .12)' }}>
          <User size={15} />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full" style={{ background: C.accent }} />
        </span>
      </span>
    </div>
  );
}

function Pills({ items }: { items: string[] }) {
  return (
    <div className="flex gap-2 px-[18px] mt-5">
      {items.map((p, i) => (
        <span key={p} className="flex-1 text-center rounded-full py-2 text-[14px] font-semibold" style={i === 0 ? { background: 'rgb(255 255 255 / .15)' } : { border: `1px solid ${C.line}`, color: C.sub }}>{p}</span>
      ))}
    </div>
  );
}

function Poster({ src, w = 160, h = 240, badge }: { src: string; w?: number; h?: number; badge?: 'save' | 'saved' }) {
  return (
    <span className="relative block rounded-[14px] overflow-hidden shrink-0" style={{ width: w, height: h, background: C.panel, boxShadow: `inset 0 0 0 1px ${C.line}` }}>
      <img src={src} alt="" className="w-full h-full object-cover" />
      {badge && (
        <span className="absolute left-2 top-2 flex items-center justify-center w-8 h-8 rounded-full" style={{ background: badge === 'saved' ? C.accentDeep : 'rgb(0 0 0 / .45)', border: badge === 'saved' ? 'none' : '1px solid rgb(255 255 255 / .35)' }}>
          <Bookmark size={14} fill={badge === 'saved' ? '#fff' : 'none'} />
        </span>
      )}
      {badge && (
        <span className="absolute right-2 bottom-2 flex items-center justify-center w-8 h-8 rounded-full" style={{ background: 'rgb(0 0 0 / .55)', border: '1px solid rgb(255 255 255 / .25)' }}>
          <Star size={14} />
        </span>
      )}
    </span>
  );
}

function MovieCard({ src, title, meta, imdb, saved = false }: { src: string; title: string; meta: string; imdb?: string; saved?: boolean; key?: string }) {
  return (
    <div style={{ width: 160 }}>
      <Poster src={src} badge={saved ? 'saved' : 'save'} />
      <p className="text-[15.5px] font-semibold leading-snug mt-2.5 line-clamp-2">{title}</p>
      <p className="text-[12.5px] mt-0.5" style={{ color: C.muted }}>{meta}</p>
      {imdb && (
        <p className="flex items-center gap-1.5 mt-1 text-[12.5px] font-semibold">
          <span className="rounded-[3px] px-1 text-[9px] font-black text-black" style={{ background: C.imdb }}>IMDb</span>{imdb}
        </p>
      )}
    </div>
  );
}

function SectionTitle({ children, more }: { children: string; more?: boolean }) {
  return (
    <div className="flex items-center justify-between px-[18px] mt-7 mb-3.5">
      <span className="text-[19px] font-bold tracking-tight">{children}</span>
      {more && <span className="flex items-center gap-1 text-[12.5px]" style={{ color: C.sub }}>Ver todos <ChevronRight size={13} /></span>}
    </div>
  );
}

function HomeScreen() {
  return (
    <div>
      <div className="relative" style={{ height: 520 }}>
        <img src={P.planetaBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" style={{ filter: 'blur(1px)' }} />
        <span className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgb(9 9 11 / .55), ${C.bg} 92%)` }} />
        <div className="relative">
          <Header />
          <Pills items={['Filmes', 'Séries', 'Anime']} />
          <div className="flex items-center gap-4 px-[18px] mt-16">
            <span className="rounded-[14px] overflow-hidden shrink-0" style={{ width: 160, height: 240 }}><img src={P.planeta} alt="" className="w-full h-full object-cover" /></span>
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px]" style={{ background: 'rgb(146 150 255 / .2)', color: '#C7C9FF' }}>🔥 93% de afinidade</span>
              <p className="text-[20px] font-semibold leading-tight mt-2.5">O Planeta dos Macacos</p>
              <p className="text-[13px] mt-1" style={{ color: C.sub }}>1968</p>
              <div className="flex gap-2 mt-3.5">
                <span className="flex items-center justify-center w-11 h-11 rounded-full" style={{ border: '1px solid rgb(255 255 255 / .3)' }}><Bookmark size={17} /></span>
                <span className="flex items-center gap-2 rounded-full px-4 text-[14px] font-semibold" style={{ border: '1px solid rgb(255 255 255 / .3)' }}><Star size={15} /> Avaliar</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-3 mt-10">
            {[0, 1, 2, 3, 4].map(i => <span key={i} className="h-1.5 rounded-full" style={{ width: i === 1 ? 22 : 6, background: i === 1 ? C.accent : 'rgb(255 255 255 / .3)' }} />)}
          </div>
        </div>
      </div>
      <SectionTitle>Sugestões nos seus streamings</SectionTitle>
      <div className="flex gap-4 px-[18px]">
        <MovieCard src={P.origem} title="A Origem" meta="Ação • 2010 • 148 min" imdb="8.8" />
        <MovieCard src={P.sonho} title="Um Sonho de Liberdade" meta="Drama • 1994 • 142 min" imdb="9.3" />
      </div>
      <SectionTitle>Em outros streamings</SectionTitle>
      <div className="flex gap-4 px-[18px]">
        <MovieCard src={P.aranha} title="Homem-Aranha: Um Novo Dia" meta="Ficção • 2026" />
        <MovieCard src={P.zona} title="Zona Zero" meta="Terror • 2026 • 122 min" />
      </div>
    </div>
  );
}

function ExploreScreen() {
  const genres = [['Ação', P.aranha], ['Aventura', P.odisseia], ['Animação', P.bosque]];
  return (
    <div>
      <Header title="Explorar" />
      <Pills items={['Filmes', 'Séries']} />
      <SectionTitle more>Gêneros</SectionTitle>
      <div className="flex gap-3 px-[18px]">
        {genres.map(([g, src]) => (
          <span key={g} className="relative shrink-0 rounded-[14px] overflow-hidden" style={{ width: 150, height: 150 }}>
            <img src={src} alt="" className="w-full h-full object-cover" />
            <span className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgb(0 0 0 / .75), rgb(0 0 0 / .05) 60%)' }} />
            <span className="absolute left-3 bottom-3 text-[16px] font-semibold">{g}</span>
          </span>
        ))}
      </div>
      <SectionTitle more>Oscar</SectionTitle>
      <div className="flex gap-3 px-[18px]">
        <MovieCard src={P.oppenheimer} title="Oppenheimer" meta="Drama • 2023 • 181 min" imdb="8.2" />
        <MovieCard src={P.tudo} title="Tudo em Todo o Lugar ao Mesmo Tempo" meta="Ação • 2022 • 139 min" imdb="7.8" />
      </div>
      <SectionTitle more>Cineastas</SectionTitle>
      <div className="flex gap-5 px-[18px]">
        {[['Christopher Nolan', P.nolan], ['Denis Villeneuve', P.villeneuve], ['Daniel Kwan', P.kwan]].map(([n, src]) => (
          <span key={n} className="flex flex-col items-center gap-2 w-[96px] text-center">
            <img src={src} alt="" className="w-[72px] h-[72px] rounded-full object-cover" />
            <span className="text-[12.5px] leading-tight">{n}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const SAVED = [
  { src: P.devoradores, title: 'Devoradores de Estrelas', meta: 'Ficção • 2026 • 157 min', imdb: '8.2' },
  { src: P.ak47, title: 'AK-47: A Arma Que Mudou o Mundo', meta: 'Guerra • 2020 • 105 min', imdb: '6.6' },
  { src: P.duna, title: 'Duna', meta: 'Ficção • 2021 • 155 min', imdb: '8.0' },
  { src: P.parasita, title: 'Parasita', meta: 'Suspense • 2019 • 132 min', imdb: '8.5' },
  { src: P.blade, title: 'Blade Runner 2049', meta: 'Ficção • 2017 • 164 min', imdb: '8.0' },
  { src: P.chegada, title: 'A Chegada', meta: 'Drama • 2016 • 116 min', imdb: '7.9' },
];

function ListScreen() {
  return (
    <div>
      <Header title="Lista" />
      <Pills items={['Filmes', 'Séries', 'Anime']} />
      <div className="flex items-center justify-between px-[18px] mt-5 mb-4 text-[13.5px]">
        <span className="flex items-center gap-2" style={{ color: C.sub }}><Filter size={15} /> Filtro</span>
        <span style={{ color: C.sub }}>24 filmes salvos</span>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 px-[18px]">
        {SAVED.map(m => <MovieCard key={m.title} {...m} saved />)}
      </div>
    </div>
  );
}

function HistoryScreen() {
  const notes = [3, 5, 9, 14, 22, 38, 36];
  const max = Math.max(...notes);
  const genres = [['Ficção', 24, '#9296FF'], ['Drama', 20, '#7C80F0'], ['Ação', 17, '#6669DB'], ['Suspense', 14, '#5054C2'], ['Aventura', 13, '#3E41A6'], ['Animação', 12, '#2E3080']] as const;
  return (
    <div>
      <Header title="Histórico" />
      <Pills items={['Filmes', 'Séries', 'Anime']} />
      <div className="mx-[18px] mt-5 rounded-[18px] flex flex-col items-center py-7" style={{ border: `1px solid ${C.line}` }}>
        <span className="text-[64px] font-bold leading-none">127</span>
        <span className="flex items-center gap-1.5 text-[14px] mt-3" style={{ color: C.sub }}>filmes avaliados <ChevronRight size={14} color={C.accent} /></span>
      </div>
      <div className="flex items-center justify-between px-[18px] mt-7">
        <span className="text-[19px] font-bold">Notas</span>
        <span className="flex rounded-full p-1 text-[12.5px]" style={{ border: `1px solid ${C.line}` }}>
          <span className="rounded-full px-3 py-1" style={{ background: 'rgb(255 255 255 / .12)' }}>Gráfico</span>
          <span className="px-3 py-1" style={{ color: C.sub }}>Lista</span>
        </span>
      </div>
      <div className="flex items-end justify-between gap-2 px-[22px] mt-6" style={{ height: 150 }}>
        {notes.map((n, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
            <span className="text-[11px] font-semibold rounded px-1.5 py-0.5 mb-1.5" style={{ background: 'rgb(255 255 255 / .1)' }}>{n}</span>
            <span className="w-full rounded-[10px]" style={{ height: `${(n / max) * 100}%`, minHeight: 8, background: i >= 5 ? C.accent : i >= 3 ? '#6669DB' : '#3E41A6' }} />
          </div>
        ))}
      </div>
      <div className="flex justify-between px-[22px] mt-2 text-[12px] font-semibold" style={{ color: C.sub }}>
        {notes.map((_, i) => <span key={i} className="flex-1 text-center">{i + 1}★</span>)}
      </div>
      <div className="flex items-center justify-between px-[18px] mt-8">
        <span className="text-[19px] font-bold">Gêneros</span>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 px-[22px] mt-5 text-[14px]">
        {genres.map(([g, pct, c]) => (
          <span key={g} className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            <span className="flex-1">{g}</span>
            <span style={{ color: C.sub }}>{pct}%</span>
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between px-[18px] mt-8 mb-3">
        <span className="text-[19px] font-bold">Diretores</span>
      </div>
      {[['Christopher Nolan', P.nolan, '7 filmes'], ['Denis Villeneuve', P.villeneuve, '5 filmes'], ['Daniel Kwan', P.kwan, '2 filmes']].map(([n, src, c], i) => (
        <div key={n} className="flex items-center gap-3 px-[18px] py-2.5">
          <span className="text-[13px] w-5" style={{ color: C.muted }}>#{i + 1}</span>
          <img src={src} alt="" className="w-11 h-11 rounded-full object-cover" />
          <span className="flex-1 text-[15px] font-semibold">{n}</span>
          <span className="rounded-full px-3 py-1 text-[12.5px] font-semibold" style={{ background: 'rgb(255 255 255 / .1)' }}>{c}</span>
        </div>
      ))}
    </div>
  );
}

const SCREENS: Record<Tab, () => any> = { home: HomeScreen, explore: ExploreScreen, list: ListScreen, history: HistoryScreen };
const ORDER: Tab[] = ['home', 'explore', 'list', 'history'];
const SCROLL: Record<Tab, number> = { home: 430, explore: 300, list: 420, history: 380 };

export function MindiThumbMotion({ active }: { active: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState({ w: 0, h: 0 });
  const [tab, setTab] = useState<Tab>('home');
  const [scroll, setScroll] = useState(0);
  const [pressed, setPressed] = useState<Tab | null>(null);

  const scale = size.w / STAGE_W;
  const stageH = scale ? size.h / scale : 0;
  const phoneLeft = (STAGE_W - PHONE_W) / 2;

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setSize({ w: entry.contentRect.width, h: entry.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const reset = () => { setTab('home'); setScroll(0); setPressed(null); };
    if (!active || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { reset(); return; }

    const token = { cancelled: false };

    // Toque no item do menu de baixo
    const tapNav = async (id: Tab) => {
      setPressed(id);
      await wait(160, token);
      setPressed(null);
    };

    const run = async () => {
      reset();
      await wait(900, token);
      let i = 0;
      while (!token.cancelled) {
        const current = ORDER[i];
        // Rola um pouco a tela atual e volta a parar
        setScroll(SCROLL[current]);
        await wait(2600, token);
        // Toca na próxima aba
        const next = ORDER[(i + 1) % ORDER.length];
        await tapNav(next);
        setScroll(0);
        setTab(next);
        await wait(1500, token);
        i = (i + 1) % ORDER.length;
      }
    };
    run().catch(() => {});
    return () => { token.cancelled = true; };
  }, [active]);

  const Screen = SCREENS[tab];

  return (
    <div ref={wrapRef} className="absolute inset-0 select-none" aria-hidden="true">
      {scale > 0 && (
        <div className="absolute left-0 top-0 origin-top-left" style={{ width: STAGE_W, height: stageH, transform: `scale(${scale})`, color: C.text, fontFamily: '"DM Sans", "Inter", sans-serif' }}>
          {/* Celular — sai pela borda de baixo */}
          <div
            className="absolute overflow-hidden rounded-t-[52px]"
            style={{ left: phoneLeft, top: PHONE_TOP, width: PHONE_W, bottom: -40, background: C.bg, boxShadow: '0 0 0 10px #050506, 0 0 0 12px #3A3A40, 0 0 0 13px rgb(255 255 255 / .12), 0 30px 60px rgb(0 0 0 / .5)' }}
          >
            <StatusBar scrolled={scroll > 0} />
            {/* Conteúdo da aba, rolando */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={tab} className="absolute inset-x-0 top-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <motion.div initial={false} animate={{ y: -scroll }} transition={{ duration: 1.6, ease }}>
                  <Screen />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Menu de baixo, fixo na tela visível do celular */}
            <div className="absolute inset-x-0 flex items-center justify-around px-2 backdrop-blur-md" style={{ top: Math.max(0, stageH - PHONE_TOP - NAV_H), height: NAV_H, background: 'rgb(9 9 11 / .8)', borderTop: '0.5px solid rgb(255 255 255 / .08)' }}>
              {TABS.map(({ id, label, Icon }) => {
                const on = id === tab;
                return (
                  <motion.span key={id} className="flex flex-1 flex-col items-center" animate={{ scale: pressed === id ? 0.88 : 1 }} transition={{ duration: 0.15 }} style={{ color: on ? C.accent : C.muted }}>
                    <Icon size={24} weight={on ? 'fill' : 'regular'} />
                    <span className="text-[10px] leading-[12px] tracking-[0.04em] mt-1" style={{ fontWeight: on ? 600 : 500 }}>{label}</span>
                  </motion.span>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion } from 'motion/react';
import { ArrowUp, ArrowUpDown, Bookmark, ChevronRight, Clapperboard, Film, Globe, Heart, Hourglass, Layers, Popcorn, SlidersHorizontal, Star, Trophy, Users, X, Zap } from 'lucide-react';
import { FilmSlate, Television } from '@phosphor-icons/react';
import { IPhoneFrame } from './IPhoneFrame';
import { wait } from './DevolutivaIaMotion';
import { C, Chip, GUARDIOES_BG, GUARDIOES_LOGO, HeaderIcons, NavPill, type NavId, PHONE_W, POSTERS, PosterCard, RATINGS, Ratings, SAFE_TOP, SCREEN_H, STREAMING, StatusBar, TopBar, img } from './MindiThumbMotion';

/*
 * Motions das funcionalidades do Mindi, no case: cada um mostra uma tela do app num iPhone,
 * recriada a partir das telas reais. Página do título (rola até os filmes similares), Explorar
 * (coleções e cinema de outros países), Chat (pedido em texto livre), Lista (filtra por streaming),
 * Histórico (o gosto em números, até a duração) e Sessão conjunta (afinidade entre duas pessoas).
 */

export type MindiFeature = 'titulo' | 'explorar' | 'chat' | 'lista' | 'historico' | 'sessao';

const STAGE_W = 520;
const ease = [0.65, 0, 0.35, 1] as const;

const MORE = {
  gladiador: img('w342', '4DUClyGA6OqjXv6yC0Imf6THGfp.jpg'),
  walle: img('w342', 'qNiwJPVCO4cgiM8LVtxwPV2HxHS.jpg'),
  coringa: img('w342', 'xLxgVxFWvb9hhUyCDDXxRPPnFck.jpg'),
  divertida: img('w342', '62SAZfLfzhxJWUFJvfIPMw6QUpE.jpg'),
  titanic: img('w342', 'As0zX43h3w6kD2NS4uVHu9HKdEh.jpg'),
  homemFerro: img('w342', 'mqN7RxojEiPoh3FTSTwOtwg7KAu.jpg'),
  alien: img('w342', 'rFHzJrkO1kNIezb6rFog5oCJUEn.jpg'),
  vol2: img('w342', 'jGtBLu0JAKf5JxhWgmF68HROzCA.jpg'),
  vol3: img('w342', '4yycSPnchdNAZirGkmCYQwTd3cr.jpg'),
  marvels: img('w342', 'wpp5KIwjtrKoWj5H0TSsJdqsDx7.jpg'),
  estranho: img('w342', '7pLIVfovuIf2KQOOvMsKx3Lanrg.jpg'),
  pantera: img('w342', 'ubXNpxL2ASSzY0f8Hxv08pOsV2L.jpg'),
  oppenheimer: img('w342', 'dUPQszWoRSE9FucJTbVp2bwEi9G.jpg'),
  tudoTodo: img('w342', '2dSZQGwijlXvMSyuGe0FSgrXnv0.jpg'),
  parasita: img('w342', 'bNGW8zYA91VqTZfV3jnKHPEKKvB.jpg'),
  sonho: img('w342', 'umX3lBhHoTV7Lsci140Yr8VpXyN.jpg'),
  chefao: img('w342', 'wOMxE93W6KcZTuCeNUByNTSaLLt.jpg'),
  cavaleiro: img('w342', '4lj1ikfsSmMZNyfdi8R8Tv5tsgb.jpg'),
  ressurge: img('w342', 'j4z01cnbTCaVX69bik1612pSuH6.jpg'),
};
const PEOPLE = {
  gunn: img('w185', 'pnKqZub3IlKYbyH9RRTMDOoqEn0.jpg'),
  pratt: img('w185', 'cRH6HPAQ98PlOwwEvhYO4CM9lwu.jpg'),
  saldana: img('w185', 'vQBwmsSOAd0JDaEcZ5p43J9xzsY.jpg'),
  bautista: img('w185', 'snk6JiXOOoRjPtHU5VMoy6qbd32.jpg'),
  diesel: img('w185', 'nZdVry7lnUkE24PnXakok9okvL4.jpg'),
  cooper: img('w185', '5Dhy50qOMOHfR1NZifKIfffjV9X.jpg'),
};
// Fundos dos cards de coleção do Explorar
const TILES = {
  acao: img('w500', '9FE5eD92WfVCiivM9Pq9GVSrlWk.jpg'),
  aventura: img('w500', 'sl5NJ1vtyhP9Vr88bB4blULsJYp.jpg'),
  animacao: img('w500', 'g7CHF8gTLGooTbP4GznIGwaqAGL.jpg'),
  a24: img('w500', 'nhIL3O4W9h5V5JbNQm7yjoDk3So.jpg'),
  starWars: img('w500', 'zqkmTXzjkAgXmEWLRsY4UpTWCeo.jpg'),
  harry: img('w500', 'bfh9Z3Ghz4FOJAfLOAhmc3ccnHU.jpg'),
  brasil: img('w500', 'uvitbjFU4JqvMwIkMWHp69bmUzG.jpg'),
  coreia: img('w500', 'j96rurZqmBjyY37Fncl3IB0qJNe.jpg'),
  japao: img('w500', 'o73vpmtXq89bfSUMcAulLVN4TKP.jpg'),
  twists: img('w500', 'c6OLXfKAk5BKeR6broC8pYiCquX.jpg'),
  tempo: img('w500', '5bzPWQ2dFUl2aZKkp7ILJVVkRed.jpg'),
};
const flag = (c: string) => `https://flagcdn.com/w40/${c}.png`;

function Count({ to, play, decimals = 0 }: { to: number; play: boolean; decimals?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!play) { setV(0); return; }
    const c = animate(0, to, { duration: 1.2, ease: [0.16, 1, 0.3, 1], onUpdate: setV });
    return () => c.stop();
  }, [play, to]);
  return <>{v.toFixed(decimals).replace('.', ',')}</>;
}

function Header({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between px-[18px]" style={{ paddingTop: SAFE_TOP + 8, height: SAFE_TOP + 8 + 40 }}>
      <span className="text-[30px] font-bold tracking-[-0.02em]">{title}</span>
      <HeaderIcons />
    </div>
  );
}

function FormatToggle() {
  return (
    <div className="mx-[18px] mt-4 flex rounded-full p-1" style={{ height: 50, background: C.card, border: `0.5px solid ${C.line}` }}>
      <span className="flex-1 flex items-center justify-center gap-2 rounded-full text-[15px] font-semibold" style={{ background: 'rgb(63 63 70 / .9)' }}><FilmSlate size={18} /> Filmes</span>
      <span className="flex-1 flex items-center justify-center gap-2 text-[15px] font-medium" style={{ color: '#D4D4D8' }}><Television size={18} /> Séries</span>
    </div>
  );
}

const Card = ({ children, className = '' }: { children: any; className?: string }) => (
  <div className={`mx-[18px] rounded-[18px] overflow-hidden ${className}`} style={{ background: C.card, border: `0.5px solid ${C.line}` }}>{children}</div>
);
const H = ({ children, right }: { children: any; right?: any }) => (
  <div className="flex items-center justify-between px-[18px] mt-8 mb-3"><p className="text-[20px] font-bold tracking-tight">{children}</p>{right}</div>
);

function Person({ src, name, role }: { src: string; name: string; role: string; key?: string }) {
  return (
    <div className="flex flex-col items-start" style={{ width: 104 }}>
      <img src={src} alt="" className="w-[68px] h-[68px] rounded-full object-cover" />
      <p className="text-[13px] font-semibold leading-tight mt-2">{name}</p>
      <p className="text-[12px] leading-tight mt-0.5" style={{ color: C.sub }}>{role}</p>
    </div>
  );
}

/* ------------------------------ Página do título ------------------------------ */

function TitleScreen() {
  const why = [
    { Icon: Star, text: <>Você avaliou 4 filmes de ficção e, em média, achou <b>excelente</b>.</> },
    { Icon: Users, text: <>Você viu 2 filmes com <b>Chris Pratt</b> e, em média, achou muito bom.</> },
    { Icon: Clapperboard, text: <>Parecido com <b>"Vingadores: Ultimato"</b>, que você achou uma obra-prima.</> },
  ];
  return (
    <div style={{ background: C.bg }}>
      <div className="relative" style={{ height: 500 }}>
        <img src={GUARDIOES_BG} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: '60% center' }} />
        <span className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgb(9 9 11 / .3), rgb(9 9 11 / 0) 25%, rgb(9 9 11 / .7) 62%, ${C.bg} 96%)` }} />
        <div className="absolute inset-x-0 flex flex-col items-center" style={{ top: 320 }}>
          <img src={GUARDIOES_LOGO} alt="" style={{ height: 82, width: 'auto' }} />
          <p className="text-[13px] mt-4" style={{ color: C.sub }}>2014 • 121 min</p>
          <div className="flex gap-2 mt-3"><Chip>Ação</Chip><Chip>Ficção científica</Chip><Chip>Aventura</Chip></div>
        </div>
      </div>
      <Ratings imdb="8.0" rotten="91%" tmdb="7.9" />
      <H>Por que você vai gostar</H>
      <Card>
        {why.map(({ Icon, text }, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3.5 text-[14px] leading-snug" style={{ borderTop: i ? `0.5px solid ${C.line}` : 'none' }}>
            <Icon size={18} color={C.accent} className="shrink-0" /><span className="flex-1">{text}</span><ChevronRight size={16} color={C.muted} />
          </div>
        ))}
      </Card>
      <H>Sinopse</H>
      <p className="px-[18px] text-[14.5px] leading-relaxed" style={{ color: '#D4D4D8' }}>Abduzido da Terra ainda criança, Peter Quill vira saqueador e rouba uma esfera cobiçada pelo vilão Ronan. Para escapar, une forças com quatro foras da lei.</p>
      <H>Onde assistir</H>
      <p className="px-[18px] text-[13px] mb-3" style={{ color: C.sub }}>Assinatura</p>
      <div className="flex gap-4 px-[18px]">
        {[['Disney Plus', STREAMING.disney], ['Prime Video', STREAMING.prime]].map(([n, s]) => (
          <div key={n} className="flex flex-col items-center gap-2 w-[72px]">
            <img src={s} alt="" className="w-16 h-16 rounded-full object-cover" style={{ boxShadow: `0 0 0 2px ${C.accent}` }} />
            <span className="text-[12px] text-center" style={{ color: C.sub }}>{n}</span>
          </div>
        ))}
      </div>
      <H>Prêmios</H>
      <Card>
        <div className="flex items-center gap-3 px-4 py-4">
          <Trophy size={20} color="#D4D4D8" />
          <div><p className="text-[15px] font-semibold">2 indicações ao Oscar</p><p className="text-[12.5px]" style={{ color: C.sub }}>Maquiagem e efeitos visuais</p></div>
        </div>
      </Card>
      <H>Sobre o filme</H>
      <Card>
        <div className="flex justify-between px-4 py-3.5 text-[14px]"><span style={{ color: C.sub }}>Classificação</span><span className="rounded-[4px] px-1.5 text-[12px] font-bold text-black" style={{ background: C.imdb }}>12</span></div>
        <div className="flex justify-between px-4 py-3.5 text-[14px]" style={{ borderTop: `0.5px solid ${C.line}` }}><span style={{ color: C.sub }}>Nos cinemas</span><span className="font-semibold">31 de jul. de 2014</span></div>
      </Card>
      <H>Direção</H>
      <div className="px-[18px]"><Person src={PEOPLE.gunn} name="James Gunn" role="Diretor" /></div>
      <H>Elenco</H>
      <div className="grid grid-cols-3 gap-y-5 px-[18px]">
        {[[PEOPLE.pratt, 'Chris Pratt', 'como Peter Quill'], [PEOPLE.saldana, 'Zoe Saldaña', 'como Gamora'], [PEOPLE.bautista, 'Dave Bautista', 'como Drax'], [PEOPLE.diesel, 'Vin Diesel', 'como Groot'], [PEOPLE.cooper, 'Bradley Cooper', 'como Rocket']].map(([p, n, r]) => <Person key={n} src={p} name={n} role={r} />)}
      </div>
      <H right={<span className="text-[12.5px]" style={{ color: C.sub }}>2 títulos</span>}>Sequência e continuação</H>
      <div className="flex gap-3.5 px-[18px]">
        <PosterCard src={MORE.vol2} title="Guardiões da Galáxia - Vol. 2" meta="2017" streaming={STREAMING.disney} />
        <PosterCard src={MORE.vol3} title="Guardiões da Galáxia: Vol. 3" meta="2023" streaming={STREAMING.disney} />
      </div>
      <H>Filmes similares</H>
      <div className="flex gap-3.5 px-[18px] overflow-hidden">
        <PosterCard src={MORE.marvels} title="As Marvels" meta="2023" streaming={STREAMING.disney} />
        <PosterCard src={MORE.estranho} title="Doutor Estranho no Multiverso da Loucura" meta="2022" streaming={STREAMING.disney} />
        <PosterCard src={MORE.pantera} title="Pantera Negra" meta="2018" />
      </div>
      <div style={{ height: 160 }} />
    </div>
  );
}

/* ------------------------------------ Lista ----------------------------------- */

const SAVED = [
  { src: POSTERS.guardioes, title: 'Guardiões da Galáxia', meta: 'Ação • 2014', s: STREAMING.disney, disney: true },
  { src: MORE.gladiador, title: 'Gladiador', meta: 'Ação • 2000', s: STREAMING.prime },
  { src: MORE.walle, title: 'WALL-E', meta: 'Animação • 2008', s: STREAMING.disney, disney: true },
  { src: MORE.coringa, title: 'Coringa', meta: 'Crime • 2019', s: STREAMING.hbo },
  { src: MORE.divertida, title: 'Divertida Mente', meta: 'Animação • 2015', s: STREAMING.disney, disney: true },
  { src: MORE.titanic, title: 'Titanic', meta: 'Drama • 1997', s: STREAMING.netflix },
];

function ListScreen({ filtered, pressed }: { filtered: boolean; pressed: boolean }) {
  const items = filtered ? SAVED.filter(x => x.disney) : SAVED;
  return (
    <div style={{ background: C.bg }}>
      <Header title="Lista" />
      <FormatToggle />
      <div className="flex items-center justify-between px-[18px] mt-5 text-[14px]">
        <span style={{ color: C.sub }}>{items.length} filmes salvos</span>
        <motion.span className="flex items-center gap-2 rounded-full px-3 py-1.5" animate={{ scale: pressed ? 0.92 : 1, background: filtered ? C.primary : 'rgba(0,0,0,0)' }} transition={{ duration: 0.15 }}><SlidersHorizontal size={16} /> Filtrar</motion.span>
      </div>
      <AnimatePresence initial={false}>
        {filtered && (
          <motion.div key="chips" className="flex gap-2 px-[18px] overflow-hidden" initial={{ height: 0, opacity: 0 }} animate={{ height: 46, opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            {[['Disney+', STREAMING.disney, true], ['Netflix', STREAMING.netflix, false], ['Max', STREAMING.hbo, false]].map(([n, s, on]) => (
              <span key={n as string} className="flex items-center gap-1.5 self-end rounded-full pl-1 pr-3 py-1 text-[13px] font-medium" style={{ background: on ? 'rgb(146 150 255 / .2)' : C.card, border: `1px solid ${on ? C.accent : C.line}` }}>
                <img src={s as string} alt="" className="w-6 h-6 rounded-full" /> {n as string}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div layout className="grid grid-cols-2 gap-x-3.5 gap-y-5 px-[18px] mt-5">
        <AnimatePresence initial={false}>
          {items.map((x, i) => (
            <motion.div key={x.title} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.35, delay: i * 0.04 }}>
              <div className="relative">
                <PosterCard src={x.src} title={x.title} meta={x.meta} streaming={x.s} />
                <span className="absolute left-2 top-2 flex items-center justify-center w-8 h-8 rounded-full" style={{ background: C.primary }}><Bookmark size={14} fill="#fff" /></span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ---------------------------------- Histórico --------------------------------- */

const NOTES = [0, 0, 1, 0, 1, 1, 4];
const GENRES = [['Aventura', 4, 67], ['Ação', 3, 50], ['Ficção científica', 3, 50], ['Drama', 2, 33], ['Animação', 1, 17]] as const;

function HistoryScreen({ play }: { play: boolean }) {
  const max = Math.max(...NOTES);
  return (
    <div style={{ background: C.bg }}>
      <Header title="Histórico" />
      <FormatToggle />
      <Card className="mt-4">
        <div className="relative flex items-center justify-between pl-5 pr-0 py-5" style={{ height: 150 }}>
          <div>
            <p className="text-[64px] font-bold leading-none"><Count to={6} play={play} /></p>
            <p className="flex items-center gap-1 text-[13px] mt-2" style={{ color: C.sub }}>filmes avaliados <ChevronRight size={13} /></p>
          </div>
          <div className="relative h-full" style={{ width: 170 }}>
            {[MORE.coringa, POSTERS.bladeRunner, POSTERS.odisseia].map((p, i) => (
              <motion.img key={p} src={p} alt="" className="absolute top-0 h-full rounded-[10px] object-cover" style={{ width: 82, left: i * 44, boxShadow: '-6px 0 12px rgb(0 0 0 / .45)' }} initial={false} animate={{ x: play ? 0 : 30, opacity: play ? 1 : 0 }} transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }} />
            ))}
          </div>
        </div>
      </Card>
      <H>Seu gosto em poucas palavras</H>
      <Card>
        {[
          { Icon: Layers, text: 'Você vê mais aventura, mas suas maiores notas vão para ação.' },
          { Icon: Clapperboard, text: 'Christopher Nolan nunca te decepcionou: 3 filmes, todos bem avaliados.' },
          { Icon: Hourglass, text: 'Sua década favorita são os anos 2020.' },
        ].map(({ Icon, text }, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3.5 text-[14px] leading-snug" style={{ borderTop: i ? `0.5px solid ${C.line}` : 'none' }}>
            <Icon size={18} color={C.accent} className="shrink-0" /><span>{text}</span>
          </div>
        ))}
      </Card>
      <H>Notas</H>
      <div className="flex items-end justify-between gap-2.5 px-[18px]" style={{ height: 170 }}>
        {NOTES.map((n, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
            <span className="text-[11px] font-semibold" style={{ color: n ? C.text : C.muted }}>{n}</span>
            <div className="relative w-full rounded-full overflow-hidden" style={{ height: 120, background: C.card }}>
              <motion.span className="absolute inset-x-0 bottom-0 rounded-full" style={{ background: n === max ? C.accent : '#52525B' }} initial={false} animate={{ height: play ? `${Math.max(n / max, 0) * 100}%` : '0%' }} transition={{ duration: 0.8, delay: 0.3 + i * 0.06, ease: [0.16, 1, 0.3, 1] }} />
            </div>
            <span className="text-[14px]">{RATINGS[i].emoji}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-3 px-[18px] mt-5">
        <Card className="!mx-0 flex-1 px-4 py-3.5"><p className="text-[24px] font-bold"><Count to={6.2} decimals={1} play={play} />★</p><p className="text-[12px]" style={{ color: C.sub }}>Sua média · 🤩 Excelente</p></Card>
        <Card className="!mx-0 flex-1 px-4 py-3.5"><p className="text-[24px] font-bold">1 em 2</p><p className="text-[12px]" style={{ color: C.sub }}>vira obra-prima</p></Card>
      </div>
      <H right={<span className="flex items-center gap-1 text-[12.5px]" style={{ color: C.sub }}><ArrowUpDown size={13} /> Mais vistos</span>}>Gêneros</H>
      <Card>
        {GENRES.map(([g, n, pct], i) => (
          <div key={g} className="px-4 py-3" style={{ borderTop: i ? `0.5px solid ${C.line}` : 'none' }}>
            <div className="flex justify-between text-[14px]"><span className="font-semibold">{g}</span><span className="text-[12px]" style={{ color: C.sub }}>{n} filme{n > 1 ? 's' : ''} · {pct}%</span></div>
            <div className="mt-2 h-2 rounded-full overflow-hidden" style={{ background: C.secondary }}>
              <motion.span className="block h-full rounded-full" style={{ background: C.accent }} initial={false} animate={{ width: play ? `${pct}%` : '0%' }} transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }} />
            </div>
          </div>
        ))}
      </Card>
      <H right={<span className="flex items-center gap-1 text-[12.5px]" style={{ color: C.sub }}><ArrowUpDown size={13} /> Mais vistos</span>}>Diretores</H>
      <Card>
        {[['Christopher Nolan', '🤯 Obra-prima na média', '6,7★', '3 filmes'], ['Jon Favreau', '🤯 Obra-prima na média', '7,0★', '1 filme'], ['Daniel Kwan', '🤯 Obra-prima na média', '7,0★', '1 filme'], ['Chris Sanders', '😐 Regular na média', '3,0★', '1 filme']].map(([n, avg, sc, q], i) => (
          <div key={n} className="flex items-center gap-3 px-4 py-3" style={{ borderTop: i ? `0.5px solid ${C.line}` : 'none' }}>
            <span className="w-5 text-[13px] font-semibold" style={{ color: C.sub }}>{i + 1}</span>
            <span className="flex items-center justify-center w-9 h-9 rounded-full text-[13px] font-bold" style={{ background: C.secondary }}>{n[0]}</span>
            <div className="flex-1"><p className="text-[14px] font-semibold">{n}</p><p className="text-[12px]" style={{ color: C.sub }}>{avg}</p></div>
            <div className="text-right"><p className="text-[14px] font-bold">{sc}</p><p className="text-[11.5px]" style={{ color: C.sub }}>{q}</p></div>
          </div>
        ))}
      </Card>
      <p className="px-[18px] mt-3 text-[13.5px] leading-snug" style={{ color: C.sub }}>Christopher Nolan nunca te decepcionou: 3 filmes, média de 6,7★.</p>
      <H>Épocas</H>
      <Card>
        {[['Anos 2000', 1], ['Anos 2010', 1], ['Anos 2020', 4]].map(([d, n], i) => (
          <div key={d as string} className="flex items-center gap-3 px-4 py-3.5" style={{ borderTop: i ? `0.5px solid ${C.line}` : 'none' }}>
            <span className="w-20 text-[13.5px] font-semibold">{d}</span>
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: C.secondary }}><motion.span className="block h-full rounded-full" style={{ background: C.accent }} initial={false} animate={{ width: play ? `${((n as number) / 4) * 100}%` : '0%' }} transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }} /></div>
            <span className="text-[12.5px]" style={{ color: C.sub }}>{n}</span><ChevronRight size={14} color={C.muted} />
          </div>
        ))}
      </Card>
      <H right={<span className="flex items-center gap-1 text-[12.5px]" style={{ color: C.sub }}>Ver países <ChevronRight size={13} /></span>}>Pelo mundo</H>
      <Card className="px-4 py-4"><p className="flex gap-3 text-[14px] leading-snug"><Globe size={18} color={C.accent} className="shrink-0" />Tudo o que você avaliou é em inglês. Que tal arriscar um título de outro país?</p></Card>
      <H>Popular ou garimpo</H>
      <Card className="px-4 py-4">
        <p className="text-[30px] font-bold leading-none"><Count to={50} play={play} />% <span className="text-[14px] font-medium" style={{ color: C.sub }}>fora do mainstream</span></p>
        <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: C.secondary }}><motion.span className="block h-full rounded-full" style={{ background: C.accent }} initial={false} animate={{ width: play ? '50%' : '0%' }} transition={{ duration: 0.9 }} /></div>
        <p className="text-[12.5px] mt-3" style={{ color: C.sub }}>Você garimpa: 50% dos seus filmes têm menos de 10.000 votos no TMDB.</p>
      </Card>
      <H>Duração</H>
      <Card className="px-4 py-4"><p className="text-[30px] font-bold leading-none">15 h</p><p className="text-[12.5px] mt-1.5" style={{ color: C.sub }}>de filmes avaliados</p></Card>
      <div className="flex gap-3 px-[18px] mt-3">
        <Card className="!mx-0 flex-1 px-4 py-4"><p className="text-[24px] font-bold">2h26</p><p className="text-[12px]" style={{ color: C.sub }}>média de todos</p></Card>
        <Card className="!mx-0 flex-1 px-4 py-4"><p className="text-[24px] font-bold">2h35</p><p className="text-[12px]" style={{ color: C.sub }}>média dos excelentes e obras-primas</p></Card>
      </div>
      <div style={{ height: 160 }} />
    </div>
  );
}

/* ----------------------------------- Explorar ---------------------------------- */

function Tile({ src, label, flagCode, w = 160, h = 130 }: { src: string; label: string; flagCode?: string; w?: number; h?: number; key?: string }) {
  return (
    <span className="relative block shrink-0 rounded-[16px] overflow-hidden" style={{ width: w, height: h, background: C.card }}>
      <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <span className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgb(0 0 0 / .8), transparent 65%)' }} />
      <span className="absolute left-3 bottom-3">
        {flagCode && <img src={flag(flagCode)} alt="" className="w-6 h-6 rounded-full object-cover mb-1.5" style={{ border: '1.5px solid #fff' }} />}
        <span className="block text-[14px] font-semibold leading-tight">{label}</span>
      </span>
    </span>
  );
}

function ExploreScreen() {
  const row = 'flex gap-3.5 px-[18px] overflow-hidden';
  return (
    <div style={{ background: C.bg }}>
      <Header title="Explorar" />
      <FormatToggle />
      <H right={<More />}>Gêneros</H>
      <div className={row}>{[[TILES.acao, 'Ação'], [TILES.aventura, 'Aventura'], [TILES.animacao, 'Animação']].map(([s, l]) => <Tile key={l} src={s} label={l} h={100} />)}</div>
      <H right={<More />}>Oscar</H>
      <div className={row}>
        <PosterCard src={MORE.oppenheimer} title="Oppenheimer" meta="Drama • 2023" imdb="8.2" />
        <PosterCard src={MORE.tudoTodo} title="Tudo em Todo o Lugar ao Mesmo Tempo" meta="Ação • 2022" imdb="7.7" />
        <PosterCard src={MORE.parasita} title="Parasita" meta="Comédia • 2019" />
      </div>
      <H right={<More />}>IMDb Top 250</H>
      <div className={row}>
        <PosterCard src={MORE.sonho} title="#1 Um Sonho de Liberdade" meta="Drama • 1994" imdb="9.3" streaming={STREAMING.netflix} />
        <PosterCard src={MORE.chefao} title="#2 O Poderoso Chefão" meta="Drama • 1972" imdb="9.2" streaming={STREAMING.prime} />
        <PosterCard src={MORE.cavaleiro} title="#3 Batman: O Cavaleiro das Trevas" meta="Ação • 2008" imdb="9.1" />
      </div>
      <H right={<More />}>Estúdios</H>
      <div className={row}>{[[TILES.a24, 'A24'], [TILES.animacao, 'Pixar Animation Studios']].map(([s, l]) => <Tile key={l} src={s} label={l} />)}</div>
      <H right={<More />}>Franquias</H>
      <div className={row}>{[[TILES.starWars, 'Star Wars'], [TILES.harry, 'Harry Potter']].map(([s, l]) => <Tile key={l} src={s} label={l} />)}</div>
      <H right={<More />}>Cinema internacional</H>
      <div className={row}>{[[TILES.brasil, 'Brasil', 'br'], [TILES.coreia, 'Coreia do Sul', 'kr'], [TILES.japao, 'Japão', 'jp']].map(([s, l, c]) => <Tile key={l} src={s} label={l} flagCode={c} />)}</div>
      <H right={<More />}>Estilos</H>
      <div className={row}>{[[TILES.twists, 'Melhores plot twists'], [TILES.tempo, 'Viagem no tempo']].map(([s, l]) => <Tile key={l} src={s} label={l} />)}</div>
      <div style={{ height: 160 }} />
    </div>
  );
}
const More = () => <span className="flex items-center gap-1 text-[12.5px]" style={{ color: C.sub }}>Ver todos <ChevronRight size={13} /></span>;

/* ------------------------------------- Chat ------------------------------------ */

const PROMPTS = [
  { Icon: Heart, text: 'O que assistir a dois hoje?' },
  { Icon: Zap, text: 'Thrillers psicológicos com reviravolta' },
  { Icon: Popcorn, text: 'Séries curtas para maratonar no fim de semana' },
  { Icon: Film, text: 'Filmes de super-herói mais sombrios' },
];
const STEPS = ['Buscando títulos no estilo que você pediu…', 'Conferindo o que está nos seus streamings…', 'Tirando da lista o que você já viu…'];

function ChatScreen({ stage, step, pressed }: { stage: 0 | 1 | 2; step: number; pressed: boolean }) {
  return (
    <div className="absolute inset-0" style={{ background: C.bg }}>
      <div className="absolute inset-x-0 bottom-0 rounded-t-[28px]" style={{ top: SAFE_TOP + 6, background: '#0E0E11', border: `0.5px solid ${C.line}` }}>
        <span className="absolute left-1/2 -translate-x-1/2 top-2.5 w-10 h-1 rounded-full" style={{ background: 'rgb(255 255 255 / .25)' }} />
        <div className="flex items-center justify-center relative h-14 mt-2" style={{ borderBottom: `0.5px solid ${C.line}` }}>
          <p className="text-[16px] font-semibold">Chat Mindi</p>
          <X size={20} className="absolute right-5" color={C.sub} />
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {stage === 0 ? (
            <motion.div key="start" className="px-[18px] pt-12" exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <p className="text-[22px] font-bold text-center">O que você quer assistir hoje?</p>
              <div className="flex flex-col gap-2.5 mt-6">
                {PROMPTS.map(({ Icon, text }, i) => (
                  <motion.span key={text} className="flex items-center gap-3.5 rounded-2xl px-4 py-3.5 text-[14.5px] font-medium" style={{ background: C.card, border: `0.5px solid ${C.line}` }} animate={{ scale: pressed && i === 3 ? 0.97 : 1 }}>
                    <Icon size={19} color={C.accent} /> <span className="truncate">{text}</span>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="talk" className="px-[18px] pt-6 flex flex-col gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.span className="self-end max-w-[80%] rounded-2xl rounded-br-sm px-4 py-3 text-[14.5px]" style={{ background: C.primary }} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>Filmes de super-herói mais sombrios</motion.span>
              {stage === 1 ? (
                <span className="self-start flex items-center gap-1.5 rounded-2xl rounded-bl-sm px-4 py-3.5" style={{ background: C.card, border: `0.5px solid ${C.line}` }}>
                  {[0, 1, 2].map(i => <motion.span key={i} className="w-2 h-2 rounded-full" style={{ background: C.accent }} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />)}
                  <AnimatePresence mode="wait"><motion.span key={step} className="ml-2 text-[12.5px]" style={{ color: C.sub }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{STEPS[step]}</motion.span></AnimatePresence>
                </span>
              ) : (
                <>
                  <motion.span className="self-start max-w-[88%] rounded-2xl rounded-bl-sm px-4 py-3 text-[14.5px] leading-relaxed" style={{ background: C.card, border: `0.5px solid ${C.line}` }} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                    Separei três que fogem do herói clássico: <b>Coringa</b> é um estudo de personagem pesado, e a trilogia do Nolan leva o Batman para o drama policial.
                  </motion.span>
                  <div className="flex gap-3 -mx-[18px] px-[18px]">
                    {[[MORE.coringa, 'Coringa', 'Crime • 2019', STREAMING.hbo], [MORE.cavaleiro, 'Batman: O Cavaleiro das Trevas', 'Ação • 2008', STREAMING.hbo], [MORE.ressurge, 'O Cavaleiro das Trevas Ressurge', 'Ação • 2012', STREAMING.hbo]].map(([p, t, m, st], i) => (
                      <motion.div key={t} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.12, duration: 0.4, ease }} style={{ width: 128 }} className="shrink-0">
                        <span className="relative block rounded-[14px] overflow-hidden" style={{ width: 128, height: 192 }}><img src={p} alt="" className="w-full h-full object-cover" /><img src={st} alt="" className="absolute right-2 top-2 w-6 h-6 rounded-[6px]" /></span>
                        <p className="text-[13px] font-semibold leading-snug mt-2 line-clamp-2">{t}</p>
                        <p className="text-[11.5px]" style={{ color: C.muted }}>{m}</p>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-x-[14px] flex items-center justify-between rounded-full pl-5 pr-1.5" style={{ bottom: 34, height: 52, background: C.card, border: `0.5px solid ${C.line}` }}>
          <span className="text-[14px]" style={{ color: C.muted }}>Peça indicações de filmes ou séries...</span>
          <span className="flex items-center justify-center w-10 h-10 rounded-full" style={{ background: C.primary }}><ArrowUp size={18} /></span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- Sessão conjunta ------------------------------ */

function SessionScreen({ play }: { play: boolean }) {
  return (
    <div className="absolute inset-0" style={{ background: C.bg }}>
      {/* Perfil do amigo, por trás da gaveta */}
      <div className="opacity-40">
        <Header title="" />
        <div className="flex items-center gap-3 px-[18px] mt-2">
          <span className="flex items-center justify-center w-14 h-14 rounded-full text-[20px] font-bold" style={{ background: C.secondary }}>T</span>
          <div><p className="text-[20px] font-bold">Tamy</p><p className="text-[13px]" style={{ color: C.sub }}>503 títulos avaliados</p></div>
        </div>
      </div>
      <span className="absolute inset-0" style={{ background: 'rgb(0 0 0 / .45)' }} />
      <motion.div className="absolute inset-x-0 bottom-0 rounded-t-[28px]" style={{ top: 70, background: '#141417', border: `0.5px solid ${C.line}` }} initial={false} animate={{ y: play ? 0 : SCREEN_H }} transition={{ duration: 0.5, ease }}>
        <span className="absolute left-1/2 -translate-x-1/2 top-3 w-10 h-1 rounded-full" style={{ background: 'rgb(255 255 255 / .25)' }} />
        <div className="flex justify-between px-[18px] pt-8">
          <div><p className="text-[21px] font-bold">Sessão com Tamy</p><p className="text-[13px] mt-1 leading-snug" style={{ color: C.sub }}>Títulos que nenhum dos dois viu, a partir do que vocês dois gostam.</p></div>
          <X size={20} color={C.sub} className="shrink-0" />
        </div>
        <Card className="mt-5 px-4 py-4">
          <p className="text-[30px] font-bold leading-none" style={{ color: C.accent }}><Count to={98} play={play} />% <span className="text-[15px] font-medium" style={{ color: C.sub }}>de afinidade</span></p>
          <p className="text-[13px] mt-4" style={{ color: C.sub }}>Gêneros que vocês dois curtem</p>
          <div className="flex flex-wrap gap-2 mt-2">{['Ação', 'Aventura', 'Ficção científica', 'Thriller'].map((g, i) => <motion.span key={g} initial={false} animate={{ opacity: play ? 1 : 0, y: play ? 0 : 6 }} transition={{ delay: 0.6 + i * 0.08 }}><Chip>{g}</Chip></motion.span>)}</div>
          <p className="text-[13px] mt-4" style={{ color: C.sub }}>Streamings em comum</p>
          <div className="flex flex-wrap gap-2 mt-2">{['Netflix', 'Prime Video', 'Disney+'].map((g, i) => <motion.span key={g} initial={false} animate={{ opacity: play ? 1 : 0, y: play ? 0 : 6 }} transition={{ delay: 0.9 + i * 0.08 }}><Chip>{g}</Chip></motion.span>)}</div>
        </Card>
        <div className="flex items-center justify-between px-[18px] mt-6 mb-3"><p className="text-[17px] font-bold">Filmes para vocês</p><span className="text-[12.5px]" style={{ color: C.sub }}>12 sugestões</span></div>
        <div className="flex gap-3.5 px-[18px] overflow-hidden">
          {[[MORE.alien, 'Alien: O Oitavo Passageiro', 'Terror • 1979', STREAMING.disney], [MORE.homemFerro, 'Homem de Ferro', 'Ação • 2008', STREAMING.disney], [MORE.gladiador, 'Gladiador', 'Ação • 2000', STREAMING.prime]].map(([p, t, m, s], i) => (
            <motion.div key={t} initial={false} animate={{ x: play ? 0 : 80, opacity: play ? 1 : 0 }} transition={{ duration: 0.5, delay: 1.2 + i * 0.12, ease }}>
              <PosterCard src={p} title={t} meta={m} streaming={s} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ----------------------------------- Palco ------------------------------------ */

const NAV: Record<MindiFeature, NavId | null> = { titulo: null, explorar: 'explore', chat: null, lista: 'list', historico: 'history', sessao: null };

export function MindiFeatureMotion({ feature }: { feature: MindiFeature }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [inView, setInView] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [play, setPlay] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [chat, setChat] = useState<{ stage: 0 | 1 | 2; step: number }>({ stage: 0, step: 0 });

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);

  useEffect(() => {
    const reset = () => { setScroll(0); setPlay(false); setFiltered(false); setPressed(false); setChat({ stage: 0, step: 0 }); };
    if (!inView) { reset(); return; }
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { setPlay(true); return; }
    const token = { cancelled: false };
    const press = async () => { setPressed(true); await wait(170, token); setPressed(false); };

    const run = async () => {
      while (!token.cancelled) {
        reset();
        await wait(500, token);
        setPlay(true);
        if (feature === 'titulo') {
          await wait(1600, token);
          for (const y of [470, 980, 1460, 1980, 2440]) { setScroll(y); await wait(2200, token); }
          setScroll(0);
          await wait(1800, token);
        } else if (feature === 'lista') {
          await wait(2000, token);
          await press();
          setFiltered(true);
          await wait(3200, token);
          await press();
          setFiltered(false);
          await wait(1600, token);
          setScroll(380);
          await wait(2400, token);
        } else if (feature === 'historico') {
          await wait(2600, token);
          for (const y of [560, 1120, 1700, 2280, 2820]) { setScroll(y); await wait(2400, token); }
          setScroll(0);
          await wait(1600, token);
        } else if (feature === 'explorar') {
          await wait(1400, token);
          for (const y of [430, 880, 1330, 1680]) { setScroll(y); await wait(2100, token); }
          setScroll(0);
          await wait(1600, token);
        } else if (feature === 'chat') {
          await wait(1800, token);
          await press();
          setChat({ stage: 1, step: 0 });
          for (const st of [1, 2]) { await wait(1000, token); setChat({ stage: 1, step: st }); }
          await wait(1000, token);
          setChat({ stage: 2, step: 0 });
          await wait(4200, token);
        } else {
          await wait(5200, token);
        }
      }
    };
    run().catch(() => {});
    return () => { token.cancelled = true; };
  }, [inView, feature]);

  const scale = size.w / STAGE_W;
  const stageH = scale ? size.h / scale : 0;
  const content = feature === 'titulo' ? <TitleScreen /> : feature === 'explorar' ? <ExploreScreen /> : feature === 'lista' ? <ListScreen filtered={filtered} pressed={pressed} /> : feature === 'historico' ? <HistoryScreen play={play} /> : null;

  return (
    <div ref={wrapRef} className="absolute inset-0 select-none" aria-hidden="true">
      {scale > 0 && (
        <div className="absolute left-0 top-0 origin-top-left" style={{ width: STAGE_W, height: stageH, transform: `scale(${scale})`, color: C.text, fontFamily: '"DM Sans", "Inter", sans-serif' }}>
          <IPhoneFrame left={(STAGE_W - PHONE_W) / 2} top={24} width={PHONE_W} background={C.bg}>
            <StatusBar frosted={scroll > 0} />
            {feature === 'sessao' ? <SessionScreen play={play} /> : feature === 'chat' ? <ChatScreen stage={chat.stage} step={chat.step} pressed={pressed} /> : (
              <motion.div initial={false} animate={{ y: -scroll }} transition={{ duration: 1.5, ease }}>{content}</motion.div>
            )}
            {feature === 'titulo' && <span className="absolute inset-x-0 top-0 z-20" style={{ height: 0 }}><TopBar back /></span>}
            {feature !== 'sessao' && feature !== 'chat' && <NavPill active={NAV[feature]} />}
          </IPhoneFrame>
        </div>
      )}
    </div>
  );
}

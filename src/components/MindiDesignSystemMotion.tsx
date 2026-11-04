import { useEffect, useRef, useState, type CSSProperties, type MutableRefObject } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Bookmark, Check, Clapperboard, Copy, Heart, Loader2, MousePointerClick, Search, Share2, Star, Trash2, Tv } from 'lucide-react';
import { wait } from './DevolutivaIaMotion';
import { APP_W, Cursor, useLaptopViewport } from './LaptopMockup';
import { Logo } from './MindiThumbMotion';

/*
 * Página /ds do Mindi (screens/DesignSystem.tsx) recriada com o mesmo layout, textos e tokens: barra do topo,
 * menu lateral e as seções Fundamentos, Componentes e Regras. O cursor navega pelo menu, rola a página e
 * mexe nos componentes como alguém conhecendo o design system.
 */

const C = { bg: '#09090B', card: '#18181B', secondary: '#27272A', line: 'rgb(255 255 255 / .06)', ring: 'rgb(255 255 255 / .1)', text: '#FAFAFA', sub: '#9F9FA9', primary: '#484AAC', ink: '#9296FF', success: '#47CF79', red: '#FF6467', star: '#FFB900' };
const STAGE_H = 800;
const TOP = 56;
const scrollEase = [0.65, 0, 0.35, 1] as const;
const tm = (p: string) => `https://image.tmdb.org/t/p/w342/${p}`;

/* ---------------------------------------- Dados ---------------------------------------- */

const NAV: { id: string; label: string; children: [string, string][] }[] = [
  { id: 'fundamentos', label: 'Fundamentos', children: [['cores', 'Cores'], ['tipografia', 'Tipografia'], ['cantos', 'Cantos'], ['escala-de-notas', 'Escala de notas'], ['tons', 'Tons'], ['espacamento', 'Espaçamento'], ['camadas', 'Camadas'], ['movimento', 'Movimento']] },
  { id: 'componentes', label: 'Componentes', children: [['button', 'Button'], ['mediatypetoggle', 'MediaTypeToggle'], ['chip', 'Chip'], ['card', 'Card'], ['list', 'List'], ['moviecard', 'MovieCard'], ['sectionheader', 'SectionHeader'], ['pageheader', 'PageHeader'], ['selos', 'Selos'], ['input', 'Input'], ['emptystate', 'EmptyState'], ['dialog', 'Dialog e Drawer'], ['togglegroup', 'ToggleGroup'], ['sortdropdown', 'SortDropdown'], ['drawer', 'Drawer'], ['ratingslider', 'RatingSlider'], ['streamingtile', 'StreamingTile'], ['avatar', 'Avatar e DropdownMenu'], ['carregando', 'Carregando']] },
  { id: 'graficos', label: 'Gráficos', children: [['no-app', 'No app'], ['colunas', 'Colunas das notas'], ['linhas', 'Linhas com barra'], ['medidor', 'Medidor'], ['no-admin', 'No admin'], ['regras-graficos', 'Regras dos gráficos']] },
  { id: 'padroes', label: 'Padrões', children: [['micro', 'Micro-interações'], ['vibracao', 'Vibração'], ['numero', 'Número de destaque'], ['numeros', 'Como escrever números']] },
  { id: 'regras', label: 'Regras', children: [] },
];

const COLORS: [string, string, string, string][] = [
  ['Fundo', C.bg, 'background', 'Fundo de todas as telas'],
  ['Superfície', C.card, 'card', 'Cards, listas e painéis'],
  ['Secundária', C.secondary, 'secondary', 'Botões secundários e chips'],
  ['Apagada', C.secondary, 'muted', 'Trilhos, barras vazias e toques'],
  ['Roxo Mindi', C.primary, 'primary', 'A única cor de destaque: ação principal e seleção'],
  ['Roxo para texto', C.ink, 'primary-ink', 'Ícones e textos em roxo (mais claro, para ler no escuro)'],
  ['Texto', C.text, 'foreground', 'Texto principal'],
  ['Texto de apoio', C.sub, 'muted-foreground', 'Legendas, metadados e rótulos'],
  ['Borda', '#2A2A2D', 'border', 'Divisórias finas entre linhas'],
  ['Sucesso', C.success, 'success', 'Só para estado: deu certo, subiu'],
  ['Perigo', C.red, 'destructive', 'Só para estado: apagar, erro, caiu'],
  ['Estrela', C.star, 'star', 'Só a estrela das notas do IMDb e do TMDB'],
];

const TYPE: [string, string, string, string, CSSProperties][] = [
  ['text-display', '28 / 32 · 700', 'Título da página e números grandes', '465 filmes', { fontSize: 28, lineHeight: '32px', fontWeight: 700 }],
  ['text-heading', '20 / 24 · 600', 'Título de seção', 'Listas para explorar', { fontSize: 20, lineHeight: '24px', fontWeight: 600 }],
  ['text-title', '16 / 20 · 600', 'Nome de filme, card e item', 'Interestelar', { fontSize: 16, lineHeight: '20px', fontWeight: 600 }],
  ['text-body', '16 / 24 · 400', 'Sinopse e texto de leitura', 'Um grupo de astronautas viaja por um buraco de minhoca.', { fontSize: 16, lineHeight: '24px', fontWeight: 400 }],
  ['text-body-sm', '14 / 20 · 400', 'Descrição curta e apoio', 'Você costuma dar notas acima do público.', { fontSize: 14, lineHeight: '20px', fontWeight: 400 }],
  ['text-label', '14 / 18 · 500', 'Botões e controles', 'Salvar na lista', { fontSize: 14, lineHeight: '18px', fontWeight: 500 }],
  ['text-caption', '12 / 16 · 500', 'Ano, duração, contagens', '2014 · 2 h 49 min', { fontSize: 12, lineHeight: '16px', fontWeight: 500 }],
  ['text-overline', '10 / 12 · 600', 'Etiquetas pequenas', 'EM ALTA', { fontSize: 10, lineHeight: '12px', fontWeight: 600 }],
];

const RADII: [string, number, string][] = [['rounded-md', 6, 'Código, etiquetas pequenas'], ['rounded-xl', 12, 'Pôster pequeno, campos'], ['rounded-2xl', 16, 'Cards, pôsteres e painéis'], ['rounded-full', 999, 'Botões, chips, abas e avatares']];
const SCALE: [string, string, number][] = [['🤯', 'Obra-prima', 7], ['🤩', 'Excelente', 6], ['😍', 'Muito bom', 5], ['🙂', 'Bom', 4], ['😐', 'Regular', 3], ['😕', 'Ruim', 2], ['😫', 'Péssimo', 1]];

const RULES: { title: string; items: [string, boolean?][] }[] = [
  { title: 'Visual', items: [['Texto só com os 8 tokens de tipografia; nada de text-[15px] ou combinações soltas.', true], ['Peso no máximo semibold no app (o bold fica só no text-display).', true], ['Cantos só da escala: md, xl, 2xl ou full.', true], ['Cor só por token: nada de paleta do Tailwind (bg-blue-500), hexadecimal ou branco e preto direto.', true], ['Uma cor de destaque, o roxo; verde e vermelho só indicam estado.'], ['Camada global só pelo nome: z-header, z-nav, z-modal, z-fullscreen.', true], ['Sem itálico.', true]] },
  { title: 'Números', items: [['Todo número na tela passa por lib/format: vírgula no decimal, ponto no milhar.'], ['A palavra concorda com o número: "1 filme", "12 filmes", "1,5 ponto".'], ['Média sempre com o nome da nota junto: "😍 Muito bom (4,5 de 7)".'], ['Números e datas com tabular-nums, para alinhar em colunas.']] },
  { title: 'Ícones', items: [['Sempre do lucide-react, nunca SVG feito à mão (a exceção é o logo e os selos de nota).', true], ['Proibido o ícone de brilhos, as estrelinhas de "mágica": ele não diz o que a ação faz.', true], ['size-4 em botões e linhas, size-5 em botões só de ícone; roxo com text-primary-ink.']] },
  { title: 'Toque e telas', items: [['O app é de celular: resposta ao toque com active:, não com hover:.', true], ['Tela ou bloco sem conteúdo usa o EmptyState, sempre com o caminho para sair do vazio.'], ['Área de toque mínima de 44px em ações isoladas.'], ['Toda tela começa com MainHeader ou PageHeader.', true], ['Nada de alert ou confirm do navegador: use Dialog ou Drawer.', true]] },
];

/* ------------------------------------ Peças da página ------------------------------------ */

const overline: CSSProperties = { fontSize: 10, lineHeight: '12px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' };
const caption: CSSProperties = { fontSize: 12, lineHeight: '16px', fontWeight: 500 };
const bodySm: CSSProperties = { fontSize: 14, lineHeight: '20px' };
const heading: CSSProperties = { fontSize: 20, lineHeight: '24px', fontWeight: 600 };
const mono = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

function Section({ eyebrow, title, intro, children, refEl }: { eyebrow: string; title: string; intro: string; children: any; refEl?: any }) {
  return (
    <section ref={refEl} className="pt-14" style={{ borderTop: `1px solid ${C.line}` }}>
      <p style={{ ...overline, color: C.ink }}>{eyebrow}</p>
      <h2 className="mt-2" style={{ fontSize: 28, lineHeight: '32px', fontWeight: 700 }}>{title}</h2>
      <p className="mt-3 max-w-[672px]" style={{ fontSize: 16, lineHeight: '24px', color: C.sub }}>{intro}</p>
      <div className="mt-10 flex flex-col gap-12">{children}</div>
    </section>
  );
}

function Sub({ title, note, children, refEl }: { title: string; note: string; children: any; refEl?: any }) {
  return (
    <div ref={refEl}>
      <h3 style={heading}>{title}</h3>
      <p className="mt-1.5 max-w-[672px]" style={{ ...bodySm, color: C.sub }}>{note}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function ComponentBlock({ name, path, use, rules, children, stageClass = '', refEl }: { name: string; path: string; use: string; rules: string[]; children: any; stageClass?: string; refEl?: any }) {
  return (
    <article ref={refEl} className="grid grid-cols-[5fr_7fr] gap-10 rounded-2xl p-6" style={{ background: C.card }}>
      <div className="min-w-0">
        <h3 style={heading}>{name}</h3>
        <span className="mt-2 inline-flex items-center gap-1.5 rounded-md px-2 py-1" style={{ ...caption, fontFamily: mono, background: C.secondary, color: C.sub }}>{path}<Copy size={12} /></span>
        <p className="mt-4" style={{ ...bodySm, color: C.sub }}>{use}</p>
        <ul className="mt-4 flex flex-col gap-2">
          {rules.map(r => <li key={r} className="flex gap-2.5" style={bodySm}><Check size={16} className="mt-0.5 shrink-0" color={C.ink} />{r}</li>)}
        </ul>
      </div>
      <div className={`flex min-h-40 min-w-0 flex-wrap items-center justify-center gap-3 rounded-xl p-6 ${stageClass}`} style={{ background: C.bg }}>{children}</div>
    </article>
  );
}

// Button do app: as variantes e tamanhos de components/ui/button
function Btn({ v = 'primary', size = 'lg', icon, children, pressed, refEl, style }: { v?: string; size?: 'lg' | 'md'; icon?: any; children?: any; pressed?: boolean; refEl?: any; style?: CSSProperties }) {
  const look: Record<string, CSSProperties> = {
    primary: { background: C.primary, color: '#fff' },
    secondary: { background: C.secondary },
    tertiary: { background: 'transparent' },
    outline: { boxShadow: `inset 0 0 0 1px ${C.ring}` },
    'destructive-outline': { boxShadow: `inset 0 0 0 1px rgb(255 100 103 / .5)`, color: C.red },
  };
  const h = size === 'lg' ? 44 : 36;
  return (
    <motion.span ref={refEl} className="inline-flex items-center justify-center gap-2 rounded-full" style={{ height: h, padding: children ? `0 ${size === 'lg' ? 20 : 14}px` : 0, width: children ? undefined : h, fontSize: 14, fontWeight: 500, ...look[v], ...style }} animate={{ scale: pressed ? 0.95 : 1 }} transition={{ duration: 0.12 }}>
      {icon}{children}
    </motion.span>
  );
}

function MovieCard({ poster, title, meta, rated, saved }: { poster?: string; title: string; meta: string; rated?: string; saved?: boolean }) {
  return (
    <div className="w-[176px] self-start">
      <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '2 / 3', background: C.secondary }}>
        {poster && <img src={poster} alt="" className="absolute inset-0 w-full h-full object-cover" />}
        {rated && <><span className="absolute inset-0" style={{ background: 'rgb(0 0 0 / .65)' }} /><span className="absolute inset-0 flex items-center justify-center text-[40px]">{rated}</span></>}
        {!rated && <span className="absolute left-2 top-2 flex items-center justify-center w-8 h-8 rounded-full backdrop-blur-md" style={{ background: saved ? C.primary : 'rgb(24 24 27 / .55)' }}><Bookmark size={14} fill={saved ? '#fff' : 'none'} /></span>}
        {!rated && <span className="absolute right-2 bottom-2 flex items-center justify-center w-9 h-9 rounded-full backdrop-blur-md" style={{ background: 'rgb(24 24 27 / .55)' }}><Star size={15} /></span>}
      </div>
      <p className="mt-2 line-clamp-2" style={{ fontSize: 16, lineHeight: '20px', fontWeight: 600 }}>{title}</p>
      <p className="mt-1" style={{ ...caption, color: C.sub }}>{meta}</p>
    </div>
  );
}

/* ----------------------------------------- Página ----------------------------------------- */

type Refs = Record<string, HTMLElement | null>;

function DsPage({ refs, current, scroll, navScroll, media, drama, pressedSave }: { refs: MutableRefObject<Refs>; current: string | null; scroll: number; navScroll: number; media: 'movie' | 'tv'; drama: boolean; pressedSave: boolean }) {
  const set = (k: string) => (el: HTMLElement | null) => { refs.current[k] = el; };
  const openSection = NAV.find(n => n.id === current || n.children.some(([id]) => id === current))?.id;
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ width: APP_W, background: C.bg, color: C.text, fontFamily: '"DM Sans", "Inter", sans-serif' }}>
      {/* Conteúdo que rola */}
      <motion.div className="absolute" style={{ left: 320, width: 976, top: TOP }} initial={false} animate={{ y: -scroll }} transition={{ duration: 1.2, ease: scrollEase }}>
        <div ref={set('content')} className="relative pb-24">
          {/* Abertura */}
          <header className="py-20">
            <p style={{ ...overline, color: C.ink }}>Mindi · design system</p>
            <h1 className="mt-3 max-w-[768px]" style={{ fontSize: 44, lineHeight: '48px', fontWeight: 700 }}>Um app de cinema escuro, com uma cor só e muito pôster.</h1>
            <p className="mt-5 max-w-[672px]" style={{ fontSize: 16, lineHeight: '24px', color: C.sub }}>O Mindi recomenda filmes e séries a partir das suas notas. A interface sai do caminho: fundo quase preto para os pôsteres brilharem, o roxo só onde há uma ação ou uma escolha, e oito tamanhos de texto para tudo.</p>
            <div className="mt-10 grid max-w-[672px] grid-cols-3 gap-6">
              {[['1', 'cor de destaque'], ['8', 'tokens de texto'], ['7', 'variantes de botão']].map(([n, l]) => (
                <div key={l}><p className="tabular-nums" style={{ fontSize: 28, lineHeight: '32px', fontWeight: 700 }}>{n}</p><p className="mt-1" style={{ ...caption, color: C.sub }}>{l}</p></div>
              ))}
            </div>
          </header>

          <div className="flex flex-col gap-20">
            <Section eyebrow="01" title="Fundamentos" intro="Os tokens que todo componente usa. Nenhuma cor, tamanho ou canto é escrito direto no código: muda aqui, muda no app inteiro.">
              <Sub refEl={set('cores')} title="Cores" note="O app só tem modo escuro. As superfícies sobem em degraus de cinza, e o roxo é a única cor que chama atenção.">
                <div className="grid grid-cols-4 gap-3">
                  {COLORS.map(([name, color, token, use]) => (
                    <div key={token} className="rounded-2xl p-3" style={{ background: C.card }}>
                      <div className="h-16 rounded-xl" style={{ background: color, boxShadow: `inset 0 0 0 1px ${C.ring}` }} />
                      <p className="mt-3" style={{ fontSize: 14, lineHeight: '18px', fontWeight: 500 }}>{name}</p>
                      <p className="mt-0.5" style={{ ...caption, fontFamily: mono, color: C.sub }}>{token}</p>
                      <p className="mt-2" style={{ ...caption, color: C.sub }}>{use}</p>
                    </div>
                  ))}
                </div>
              </Sub>

              <Sub refEl={set('tipografia')} title="Tipografia" note="DM Sans, pensada para o celular, sem tamanhos que mudam com a tela. Body e title têm o mesmo tamanho: quem separa os dois é o peso.">
                <div className="rounded-2xl" style={{ background: C.card }}>
                  {TYPE.map(([token, spec, use, sample, st], i) => (
                    <div key={token} className="grid grid-cols-[176px_112px_minmax(0,1fr)] items-baseline gap-6 px-5 py-4" style={{ borderTop: i ? `1px solid ${C.line}` : 'none' }}>
                      <span style={{ ...caption, fontFamily: mono }}>{token}</span>
                      <span className="tabular-nums" style={{ ...caption, color: C.sub }}>{spec}</span>
                      <div className="min-w-0"><p className="truncate" style={st}>{sample}</p><p className="mt-1" style={{ ...caption, color: C.sub }}>{use}</p></div>
                    </div>
                  ))}
                </div>
              </Sub>

              <div ref={set('cantos')} className="grid grid-cols-2 gap-12">
                <Sub title="Cantos" note="Quatro raios. Quanto maior a peça, mais redondo o canto.">
                  <div className="grid grid-cols-2 gap-3">
                    {RADII.map(([name, r, use]) => (
                      <div key={name} className="rounded-2xl p-4" style={{ background: C.card }}>
                        <div className="h-14 w-full" style={{ borderRadius: Math.min(r, 28), border: '1px solid rgb(146 150 255 / .5)', background: 'rgb(72 74 172 / .15)' }} />
                        <p className="mt-3" style={{ ...caption, fontFamily: mono }}>{name}</p>
                        <p className="mt-0.5" style={{ ...caption, color: C.sub }}>{use}</p>
                      </div>
                    ))}
                  </div>
                </Sub>
                <Sub title="Escala de notas" note="O coração do app: sete notas com nome e emoji. A média aparece sempre com o nome junto, como em 4,5 de 7.">
                  <ul className="rounded-2xl" style={{ background: C.card }}>
                    {SCALE.map(([e, l, n], i) => (
                      <li key={l} className="flex items-center gap-3 px-4 py-2.5" style={{ borderTop: i ? `1px solid ${C.line}` : 'none' }}>
                        <span className="text-[20px] leading-none">{e}</span>
                        <span className="flex-1" style={{ fontSize: 14, fontWeight: 500 }}>{l}</span>
                        <span className="tabular-nums" style={{ ...caption, color: C.sub }}>{n}</span>
                      </li>
                    ))}
                  </ul>
                </Sub>
              </div>
            </Section>

            <Section eyebrow="02" title="Componentes" intro="Cada exemplo abaixo é o componente usado no app, não um desenho dele. Antes de criar um novo, veja se um destes resolve.">
              <ComponentBlock refEl={set('button')} name="Button" path="components/ui/button" use="Toda ação. A variante diz a importância; o tamanho, onde ele está." stageClass="flex-col"
                rules={['Sete variantes: primary, secondary, tertiary, outline, glass, destructive e destructive-outline. Não crie outras.', 'Um botão primary por tela, no máximo, para a ação que mais importa.', 'lg (44px) para ações isoladas; md e sm dentro de listas e cabeçalhos.', 'glass só em cima de foto; destructive só para confirmar o que não volta atrás.', 'Ícone à esquerda reforça o texto, nunca substitui sem aria-label.']}>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Btn refEl={set('save')} pressed={pressedSave} icon={<Bookmark size={16} />}>Salvar</Btn>
                  <Btn v="secondary" icon={<Star size={16} />}>Avaliar</Btn>
                  <Btn v="tertiary" icon={<Share2 size={16} />}>Compartilhar</Btn>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Btn v="outline" size="md">Ver todos</Btn>
                  <Btn v="destructive-outline" size="md" icon={<Trash2 size={16} />}>Apagar</Btn>
                  <Btn v="secondary" icon={<Heart size={20} />} />
                  <Btn v="tertiary" size="md" icon={<Search size={16} />} />
                </div>
                <div className="flex w-full flex-wrap items-center justify-center gap-3 pt-4" style={{ borderTop: `1px solid ${C.line}` }}>
                  <span className="w-full text-center" style={{ ...overline, color: C.sub }}>Estados</span>
                  <Btn size="md" style={{ opacity: 0.5 }}>Desativado</Btn>
                  <Btn v="secondary" size="md" icon={<Loader2 size={16} className="animate-spin" />}>Salvando</Btn>
                  <span className="relative grid h-24 w-36 place-items-center overflow-hidden rounded-xl" style={{ background: 'rgb(250 250 250 / .15)' }}>
                    <span className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgb(0 0 0 / .6), transparent)' }} />
                    <span className="relative flex items-center justify-center w-11 h-11 rounded-full backdrop-blur-md" style={{ background: 'rgb(24 24 27 / .5)', boxShadow: `inset 0 0 0 1px ${C.ring}` }}><Bookmark size={20} /></span>
                  </span>
                </div>
              </ComponentBlock>

              <ComponentBlock refEl={set('mediatypetoggle')} name="MediaTypeToggle" path="components/MediaTypeToggle" use="A troca entre Filmes e Séries, igual em todas as telas que separam os dois."
                rules={['Sempre no topo da tela, logo abaixo do cabeçalho.', 'Pode mostrar a contagem de cada lado.', 'Para outras escolhas de 2 a 4 opções, use o ToggleGroup com variant="pill".']}>
                <div className="relative flex w-full max-w-[384px] rounded-full p-1" style={{ background: 'rgb(39 39 42 / .6)', boxShadow: `inset 0 0 0 1px ${C.line}` }}>
                  <motion.span className="absolute top-1 bottom-1 rounded-full" style={{ width: 'calc(50% - 4px)', background: 'rgb(250 250 250 / .15)' }} initial={false} animate={{ left: media === 'movie' ? 4 : '50%' }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} />
                  {([['movie', Clapperboard, 'Filmes', 465], ['tv', Tv, 'Séries', 82]] as const).map(([k, Icon, l, n]) => (
                    <span key={k} ref={set(k)} className="relative flex-1 flex items-center justify-center gap-2 h-10" style={{ fontSize: 14, fontWeight: media === k ? 600 : 500, color: media === k ? C.text : C.sub }}>
                      <Icon size={16} /> {l} <span style={{ ...caption, color: C.sub }}>{n}</span>
                    </span>
                  ))}
                </div>
              </ComponentBlock>

              <ComponentBlock refEl={set('chip')} name="Chip" path="components/Chip" use="Gêneros, filtros e etiquetas curtas. Clicável quando filtra; só informação quando não."
                rules={['Uma ou duas palavras.', 'Selecionado fica roxo; o resto, cinza.', 'Use o tamanho md em listas e sm sobre pôsteres.']}>
                {['Ficção científica', 'Drama', 'Suspense', 'Animação'].map(c => {
                  const on = c === 'Ficção científica' || (c === 'Drama' && drama);
                  return <motion.span key={c} ref={c === 'Drama' ? set('drama') : undefined} className="rounded-full px-3 py-1.5" style={{ fontSize: 14, fontWeight: 500 }} initial={false} animate={{ backgroundColor: on ? C.primary : C.secondary, color: on ? '#FFFFFF' : C.text }} transition={{ duration: 0.2 }}>{c}</motion.span>;
                })}
              </ComponentBlock>

              <ComponentBlock refEl={set('moviecard')} name="MovieCard" path="components/MovieCard" use="O pôster de um filme ou série, com salvar e avaliar sem abrir a página do título."
                rules={['Pôster sempre 2:3 e rounded-2xl.', 'Tamanho normal em carrosséis e listas; compact em seções secundárias.', 'A nota que a pessoa deu aparece como emoji no canto.', 'Título longo corta em duas linhas; sem pôster, entra a imagem padrão no mesmo formato.']}>
                <MovieCard poster={tm('tR1XVa5bxgdh2bRw2u0DzrgkO2l.jpg')} title="Interestelar" meta="Aventura • 2014 • 169 min" rated="🤯" />
                <MovieCard poster={tm('VMy4UGsI2u3f4fALGeCqCdsQBb.jpg')} title="Duna: Parte Dois" meta="Ficção científica • 2024 • 166 min" saved />
                <MovieCard title="Um filme com um título bem comprido que não cabe em duas linhas do card" meta="Drama • 2025" />
              </ComponentBlock>
            </Section>

            <Section refEl={set('regras')} eyebrow="05" title="Regras" intro="O que mantém o app coerente. As marcadas como automáticas o comando npm run lint:design confere em cada mudança, e o código não passa se quebrar.">
              <div className="grid grid-cols-2 gap-4 items-start">
                {RULES.map(g => (
                  <div key={g.title} className="rounded-2xl p-6" style={{ background: C.card }}>
                    <h3 style={heading}>{g.title}</h3>
                    <ul className="mt-4 flex flex-col gap-3">
                      {g.items.map(([t, auto]) => (
                        <li key={t} className="flex gap-3">
                          <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full" style={{ background: C.ink }} />
                          <span style={bodySm}>{t}{auto && <span className="ml-2 inline-flex items-center rounded-full px-2 py-0.5 align-middle" style={{ ...overline, textTransform: 'none', letterSpacing: 0, background: 'rgb(72 74 172 / .15)', color: C.ink }}>automática</span>}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl p-6" style={{ background: C.card }}>
                <span className="flex items-center gap-2" style={{ fontSize: 14, fontWeight: 500 }}><MousePointerClick size={16} color={C.ink} /> Medir um botão</span>
                <code className="rounded-md px-1.5 py-0.5" style={{ ...caption, fontFamily: mono, background: C.secondary }}>{'<Button data-track="details_rating_open">Avaliar</Button>'}</code>
                <span style={{ ...caption, color: C.sub }}>O clique passa a aparecer no mapa de cliques do admin, por tela e por dia.</span>
              </div>
            </Section>
          </div>
        </div>
      </motion.div>

      {/* Menu lateral fixo */}
      <div className="absolute overflow-hidden" style={{ left: 64, top: TOP, width: 208, bottom: 0 }}>
        <motion.nav className="pt-10" initial={false} animate={{ y: -navScroll }} transition={{ duration: 0.8, ease: scrollEase }} style={{ fontSize: 14, fontWeight: 500 }}>
          {NAV.map(n => (
            <div key={n.id} className="mb-1">
              <span ref={set('nav-' + n.id)} className="block rounded-xl px-3 py-2 transition-colors duration-300" style={{ color: openSection === n.id || (n.id === 'regras' && current === 'regras') ? C.text : C.sub }}>{n.label}</span>
              {n.children.length > 0 && (
                <ul className="mb-2 ml-3 pl-3 flex flex-col gap-0.5" style={{ borderLeft: `1px solid ${C.line}` }}>
                  {n.children.map(([id, l]) => (
                    <li key={id}>
                      <span ref={set('nav-' + id)} className="-ml-[13px] block py-1 pl-3 transition-colors duration-300" style={{ ...caption, borderLeft: `1px solid ${current === id ? C.ink : 'transparent'}`, color: current === id ? C.text : C.sub }}>{l}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </motion.nav>
      </div>

      {/* Barra do topo */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between backdrop-blur-xl" style={{ height: TOP, padding: '0 64px', background: 'rgb(9 9 11 / .85)', borderBottom: `1px solid ${C.line}` }}>
        <span ref={set('logo')} className="flex items-center gap-3"><Logo height={20} /><span style={{ fontSize: 14, fontWeight: 500, color: C.sub }}>Design system</span></span>
        <span className="flex items-center gap-2 h-9 px-3.5 rounded-full" style={{ fontSize: 14, fontWeight: 500 }}><ArrowLeft size={16} /> Voltar ao app</span>
      </div>
    </div>
  );
}

export function MindiDesignSystemMotion() {
  const { viewRef, width, inView } = useLaptopViewport();
  const stageRef = useRef<HTMLDivElement>(null);
  const refs = useRef<Refs>({});
  const [current, setCurrent] = useState<string | null>(null);
  const [scroll, setScroll] = useState(0);
  const [navScroll, setNavScroll] = useState(0);
  const [media, setMedia] = useState<'movie' | 'tv'>('movie');
  const [drama, setDrama] = useState(false);
  const [pressedSave, setPressedSave] = useState(false);
  const [cursor, setCursor] = useState<Cursor>({ x: 900, y: 500, visible: false, down: false });
  const k = width / APP_W;

  // Centro de um elemento em coordenadas do palco
  const point = (el: HTMLElement | null | undefined) => {
    const st = stageRef.current;
    if (!st || !el) return { x: APP_W / 2, y: 400 };
    const sr = st.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const kk = sr.width / APP_W;
    return { x: (r.left + Math.min(r.width / 2, 60) - sr.left) / kk, y: (r.top + r.height / 2 - sr.top) / kk };
  };
  // Posição de rolagem que deixa o bloco a 80px do topo, como o scroll-mt-20 da página
  const anchor = (key: string) => {
    let el = refs.current[key];
    const root = refs.current.content;
    let top = 0;
    while (el && el !== root) { top += el.offsetTop; el = el.offsetParent as HTMLElement | null; }
    return Math.max(0, top + TOP - 80);
  };

  useEffect(() => {
    if (!inView || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const token = { cancelled: false };
    const click = async (key: string, after?: () => void) => {
      setCursor(c => ({ ...c, ...point(refs.current[key]), visible: true }));
      await wait(950, token);
      setCursor(c => ({ ...c, down: true }));
      await wait(150, token);
      setCursor(c => ({ ...c, down: false }));
      after?.();
    };
    const go = (key: string, cur: string | null) => { setScroll(key === 'top' ? 0 : anchor(key)); setCurrent(cur); };
    // Rolagem "na roda do mouse": o cursor vai para o conteúdo antes de rolar
    const wheel = async (key: string, cur: string) => {
      setCursor(c => ({ ...c, x: 860, y: 470 }));
      await wait(500, token);
      go(key, cur);
    };
    const run = async () => {
      await wait(2600, token);
      while (!token.cancelled) {
        await click('nav-cores', () => go('cores', 'cores'));
        await wait(2700, token);
        await wheel('tipografia', 'tipografia');
        await wait(2700, token);
        await wheel('cantos', 'escala-de-notas');
        await wait(2700, token);
        await click('nav-button', () => go('button', 'button'));
        await wait(1500, token);
        await click('save', () => { setPressedSave(true); setTimeout(() => setPressedSave(false), 160); });
        await wait(1100, token);
        await wheel('mediatypetoggle', 'mediatypetoggle');
        await wait(1500, token);
        await click('tv', () => setMedia('tv'));
        await wait(900, token);
        await click('drama', () => { setDrama(true); setCurrent('chip'); });
        await wait(1500, token);
        await wheel('moviecard', 'moviecard');
        await wait(2700, token);
        // O menu rola até aparecer Regras
        setCursor(c => ({ ...c, x: 170, y: 560 }));
        await wait(500, token);
        setNavScroll(Math.max(0, (refs.current['nav-regras']?.offsetTop ?? 0) - 560));
        await wait(1000, token);
        await click('nav-regras', () => go('regras', 'regras'));
        await wait(4800, token);
        await click('logo', () => { go('top', null); setNavScroll(0); });
        await wait(700, token);
        setMedia('movie');
        setDrama(false);
        setCursor(c => ({ ...c, visible: false }));
        await wait(2400, token);
      }
    };
    run().catch(() => {});
    return () => { token.cancelled = true; };
  }, [inView]);

  return (
    <div ref={viewRef} className="relative w-full overflow-hidden rounded-2xl select-none" style={{ aspectRatio: `${APP_W} / ${STAGE_H}`, background: C.bg, boxShadow: '0 24px 60px rgb(36 21 16 / .22)' }} role="img" aria-label="Página do design system do Mindi: abertura, cores, tipografia, cantos, escala de notas, componentes e as regras que o lint confere">
      {width > 0 && (
        <div ref={stageRef} className="absolute left-0 top-0 origin-top-left" style={{ width: APP_W, height: STAGE_H, transform: `scale(${k})` }}>
          <DsPage refs={refs} current={current} scroll={scroll} navScroll={navScroll} media={media} drama={drama} pressedSave={pressedSave} />
          <motion.div className="absolute left-0 top-0 z-30 pointer-events-none" initial={false} animate={{ x: cursor.x - 4, y: cursor.y - 2, opacity: cursor.visible ? 1 : 0, scale: cursor.down ? 0.85 : 1 }} transition={{ x: { duration: 0.9, ease: scrollEase }, y: { duration: 0.9, ease: scrollEase }, opacity: { duration: 0.3 }, scale: { duration: 0.12 } }}>
            <svg width="26" height="30" viewBox="0 0 26 30" fill="none"><path d="M2 2l20 11.5-9 2.2-4.3 8.6L2 2z" fill="#fff" stroke="#111" strokeWidth="2" strokeLinejoin="round" /></svg>
          </motion.div>
        </div>
      )}
    </div>
  );
}

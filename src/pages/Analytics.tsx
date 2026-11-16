import { useEffect, useMemo, useState } from 'react';
import { collection, getDocs, limit, orderBy, query, Timestamp, where } from 'firebase/firestore';
import { RefreshCw } from 'lucide-react';
import { db } from '../analytics/data';
import { markOwner } from '../analytics/track';
import { projects } from '../data';

/*
 * Painel de visitas do portfólio. Não tem link no site: entra-se direto por /analytics.
 * Por enquanto sem login: os dados são só contagens anônimas. A página pede para não ser indexada.
 */

const C = { ink: '#241510', sub: '#6F625B', soft: '#8A7F78', line: '#E2DCD4', accent: '#9E4322', cream: '#F6EAE3', card: '#FFFFFF', bg: '#FAF9F7', track: '#F0EBE6' };

type View = { id: string; path: string; caseId: string | null; source: string; device: string; sid: string; seconds: number; scroll: number; ts: Date };
type Click = { id: string; label: string; path: string; sid: string; ts: Date };

const PERIODS = [[7, '7 dias'], [30, '30 dias'], [90, '90 dias']] as const;

const pageName = (path: string) => {
  if (path === '/') return 'Home';
  if (path === '/sobre-mim') return 'Sobre mim';
  if (path === '/documentos') return 'Documentos';
  if (path.startsWith('/project/')) {
    const id = path.split('/')[2];
    return projects.find(p => p.id === id)?.title ?? id;
  }
  return path;
};

const fmtInt = (n: number) => n.toLocaleString('pt-BR');
const fmtDur = (s: number) => (s < 60 ? `${Math.round(s)} s` : `${Math.floor(s / 60)} min ${String(Math.round(s % 60)).padStart(2, '0')} s`);
const fmtPct = (n: number) => `${Math.round(n)}%`;
const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
const dayKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

function countBy<T>(xs: T[], key: (x: T) => string) {
  const m = new Map<string, number>();
  xs.forEach(x => m.set(key(x), (m.get(key(x)) ?? 0) + 1));
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
}

/* ------------------------------------------ Peças ------------------------------------------ */

const Card = ({ title, sub, children, className = '' }: { title?: string; sub?: string; children: any; className?: string }) => (
  <section className={`rounded-2xl p-6 ${className}`} style={{ background: C.card, border: `1px solid ${C.line}` }}>
    {title && <h2 className="text-[16px] font-semibold" style={{ color: C.ink }}>{title}</h2>}
    {sub && <p className="text-[13px] mt-0.5" style={{ color: C.sub }}>{sub}</p>}
    <div className={title ? 'mt-5' : ''}>{children}</div>
  </section>
);

function Kpi({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: C.card, border: `1px solid ${C.line}` }}>
      <p className="text-[13px]" style={{ color: C.sub }}>{label}</p>
      <p className="font-serif text-[30px] font-bold leading-none mt-3 tabular-nums" style={{ color: C.ink }}>{value}</p>
      {note && <p className="text-[12px] mt-2" style={{ color: C.soft }}>{note}</p>}
    </div>
  );
}

// Barras horizontais de uma série só: o rótulo e o valor ficam no texto, a barra só mostra o tamanho
function HBars({ rows, max, suffix = '' }: { rows: [string, number][]; max?: number; suffix?: string }) {
  const top = max ?? Math.max(1, ...rows.map(r => r[1]));
  if (!rows.length) return <Empty />;
  return (
    <ul className="flex flex-col gap-3">
      {rows.map(([l, v]) => (
        <li key={l}>
          <div className="flex justify-between gap-4 text-[13.5px]"><span className="truncate" style={{ color: C.ink }}>{l}</span><span className="tabular-nums shrink-0" style={{ color: C.sub }}>{fmtInt(v)}{suffix}</span></div>
          <div className="h-1.5 rounded-full mt-1.5" style={{ background: C.track }}><div className="h-full rounded-full" style={{ width: `${(v / top) * 100}%`, background: C.accent }} /></div>
        </li>
      ))}
    </ul>
  );
}

const Empty = () => <p className="text-[13.5px]" style={{ color: C.soft }}>Ainda sem dados neste período.</p>;

// Colunas por dia com dica ao passar o mouse
function DailyBars({ days }: { days: { key: string; label: string; views: number; sessions: number }[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(1, ...days.map(d => d.views));
  const every = Math.ceil(days.length / 10);
  const h = hover !== null ? days[hover] : null;
  return (
    <div>
      <div className="relative flex items-end gap-[2px] h-44" onMouseLeave={() => setHover(null)}>
        {/* Linhas de grade recessivas */}
        {[0.5, 1].map(f => <span key={f} className="absolute inset-x-0 pointer-events-none" style={{ bottom: `${f * 100}%`, borderTop: `1px dashed ${C.line}` }} />)}
        {days.map((d, i) => (
          <div key={d.key} className="relative flex-1 h-full flex items-end cursor-default" onMouseEnter={() => setHover(i)}>
            <div className="w-full rounded-t-[4px] transition-opacity" style={{ height: `${(d.views / max) * 100}%`, minHeight: d.views ? 2 : 0, background: C.accent, opacity: hover === null || hover === i ? 1 : 0.45 }} />
          </div>
        ))}
        {h && (
          <div className="absolute top-0 z-10 pointer-events-none rounded-lg px-3 py-2 text-[12.5px] whitespace-nowrap shadow-md" style={{ left: `clamp(120px, ${((hover! + 0.5) / days.length) * 100}%, calc(100% - 120px))`, transform: 'translateX(-50%)', background: C.ink, color: '#fff' }}>
            <b>{h.label}</b> · {fmtInt(h.views)} páginas vistas · {fmtInt(h.sessions)} sessões
          </div>
        )}
      </div>
      <div className="flex gap-[2px] mt-2">
        {days.map((d, i) => <span key={d.key} className="flex-1 text-center text-[11px] tabular-nums" style={{ color: C.soft }}>{i % every === 0 ? d.label : ''}</span>)}
      </div>
      <p className="text-[12px] mt-3" style={{ color: C.soft }}>Máximo do período: {fmtInt(max)} páginas vistas num dia.</p>
    </div>
  );
}

/* ------------------------------------------ Página ------------------------------------------ */

export default function Analytics() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [days, setDays] = useState<number>(30);
  const [views, setViews] = useState<View[]>([]);
  const [clicks, setClicks] = useState<Click[]>([]);
  const [reload, setReload] = useState(0);

  // Fora do Google e com título próprio
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    const prev = document.title;
    document.title = 'Analytics | Vinicius Tamy';
    return () => { meta.remove(); document.title = prev; };
  }, []);

  useEffect(() => {
    let alive = true;
    setStatus('loading');
    const since = Timestamp.fromDate(new Date(Date.now() - days * 86400000));
    Promise.all([
      getDocs(query(collection(db, 'views'), where('ts', '>=', since), orderBy('ts', 'desc'), limit(5000))),
      getDocs(query(collection(db, 'clicks'), where('ts', '>=', since), orderBy('ts', 'desc'), limit(2000))),
    ]).then(([v, c]) => {
      if (!alive) return;
      setViews(v.docs.map(d => ({ id: d.id, ...(d.data() as any), ts: (d.data().ts as Timestamp)?.toDate() ?? new Date() })));
      setClicks(c.docs.map(d => ({ id: d.id, ...(d.data() as any), ts: (d.data().ts as Timestamp)?.toDate() ?? new Date() })));
      setStatus('ok');
      // Daqui em diante, as visitas deste navegador não entram na conta
      markOwner();
    }).catch(e => { if (alive) setStatus('error'); });
    return () => { alive = false; };
  }, [days, reload]);

  const stats = useMemo(() => {
    const sessions = new Set(views.map(v => v.sid));
    const sessionSource = new Map<string, string>();
    const sessionDevice = new Map<string, string>();
    views.forEach(v => { sessionSource.set(v.sid, v.source); sessionDevice.set(v.sid, v.device); });
    const caseViews = views.filter(v => v.caseId);

    // Dias do período, inclusive os sem visita
    const byDay = new Map<string, { views: number; sids: Set<string> }>();
    views.forEach(v => {
      const k = dayKey(v.ts);
      const e = byDay.get(k) ?? { views: 0, sids: new Set() };
      e.views++; e.sids.add(v.sid);
      byDay.set(k, e);
    });
    const daily = Array.from({ length: days }, (_, i) => {
      const d = new Date(Date.now() - (days - 1 - i) * 86400000);
      const k = dayKey(d);
      return { key: k, label: d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }), views: byDay.get(k)?.views ?? 0, sessions: byDay.get(k)?.sids.size ?? 0 };
    });

    const pages = countBy<View>(views, v => v.path).map(([path, n]) => {
      const vs = views.filter(v => v.path === path);
      return { path, name: pageName(path), views: n, sessions: new Set(vs.map(v => v.sid)).size, seconds: avg(vs.map(v => v.seconds || 0)), scroll: avg(vs.map(v => v.scroll || 0)) };
    });

    return {
      sessions: sessions.size,
      pagesPerSession: sessions.size ? views.length / sessions.size : 0,
      avgSeconds: avg(views.map(v => v.seconds || 0)),
      caseScroll: avg(caseViews.map(v => v.scroll || 0)),
      mobile: sessions.size ? ([...sessionDevice.values()].filter(d => d === 'Celular').length / sessions.size) * 100 : 0,
      daily,
      sources: countBy([...sessionSource.values()], s => s),
      devices: countBy([...sessionDevice.values()], s => s),
      pages,
      clicks: countBy<Click>(clicks, c => c.label),
    };
  }, [views, clicks, days]);

  const shell = (children: any) => (
    <div className="min-h-screen px-4 md:px-10 py-10 md:py-14" style={{ background: C.bg, color: C.ink }}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </div>
  );

  const maxPage = Math.max(1, ...stats.pages.map(p => p.views));

  return shell(
    <>
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div>
          <p className="text-[13px] font-medium" style={{ color: C.accent }}>viniciustamy.com.br</p>
          <h1 className="font-serif text-[32px] md:text-[38px] font-bold leading-tight mt-1">Analytics do portfólio</h1>
          <p className="text-[14px] mt-1" style={{ color: C.sub }}>Visitas anônimas: sem cookie e sem dado pessoal. As suas visitas, deste navegador, não entram na conta.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-full p-1" style={{ background: C.track }}>
            {PERIODS.map(([d, l]) => (
              <button key={d} onClick={() => setDays(d)} className="rounded-full px-4 h-9 text-[13.5px] font-medium" style={d === days ? { background: C.card, color: C.ink, boxShadow: '0 1px 2px rgb(0 0 0 / .08)' } : { color: C.sub }}>{l}</button>
            ))}
          </div>
          <button onClick={() => setReload(r => r + 1)} aria-label="Atualizar" className="flex items-center justify-center w-11 h-11 rounded-full" style={{ background: C.track }}><RefreshCw size={16} className={status === 'loading' ? 'animate-spin' : ''} /></button>
        </div>
      </header>

      {status === 'error' && <p className="mt-6 rounded-xl px-4 py-3 text-[14px]" style={{ background: '#FBEAEA', color: '#9B2C2C' }}>Não deu para carregar os dados. Tente atualizar.</p>}

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mt-8">
        <Kpi label="Sessões" value={fmtInt(stats.sessions)} note={`${stats.pagesPerSession.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} páginas por sessão`} />
        <Kpi label="Páginas vistas" value={fmtInt(views.length)} />
        <Kpi label="Tempo médio por página" value={fmtDur(stats.avgSeconds)} note="Só com a aba visível" />
        <Kpi label="Rolagem média nos cases" value={fmtPct(stats.caseScroll)} note="Até onde leram cada case" />
        <Kpi label="Sessões no celular" value={fmtPct(stats.mobile)} />
      </div>

      <Card title="Páginas vistas por dia" sub={`Últimos ${days} dias`} className="mt-4">
        <DailyBars days={stats.daily} />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <Card title="De onde vieram" sub="Origem de cada sessão"><HBars rows={stats.sources.slice(0, 8)} /></Card>
        <Card title="Dispositivo" sub="Por sessão"><HBars rows={stats.devices} /></Card>
        <Card title="Cliques em links" sub="E-mail, currículo, redes e sites externos"><HBars rows={stats.clicks.slice(0, 8)} /></Card>
      </div>

      <Card title="Páginas e cases" sub="Quantas vezes cada página foi aberta, por quanto tempo e até onde rolaram" className="mt-4">
        {stats.pages.length ? (
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full min-w-[640px] text-[13.5px]">
              <thead>
                <tr className="text-left" style={{ color: C.sub }}>
                  <th className="font-medium pb-3">Página</th>
                  <th className="font-medium pb-3 text-right">Vistas</th>
                  <th className="font-medium pb-3 text-right">Sessões</th>
                  <th className="font-medium pb-3 text-right">Tempo médio</th>
                  <th className="font-medium pb-3 pl-6 w-[180px]">Rolagem média</th>
                </tr>
              </thead>
              <tbody>
                {stats.pages.map(p => (
                  <tr key={p.path} style={{ borderTop: `1px solid ${C.line}` }}>
                    <td className="py-3 pr-4"><span className="font-medium">{p.name}</span><span className="block text-[12px]" style={{ color: C.soft }}>{p.path}</span></td>
                    <td className="py-3 text-right tabular-nums">
                      <span className="inline-flex items-center gap-2"><span className="h-1.5 rounded-full hidden sm:inline-block" style={{ width: `${(p.views / maxPage) * 60}px`, background: C.accent }} />{fmtInt(p.views)}</span>
                    </td>
                    <td className="py-3 text-right tabular-nums">{fmtInt(p.sessions)}</td>
                    <td className="py-3 text-right tabular-nums">{fmtDur(p.seconds)}</td>
                    <td className="py-3 pl-6">
                      <div className="flex items-center gap-3"><div className="flex-1 h-1.5 rounded-full" style={{ background: C.track }}><div className="h-full rounded-full" style={{ width: `${p.scroll}%`, background: C.accent }} /></div><span className="w-9 text-right tabular-nums" style={{ color: C.sub }}>{fmtPct(p.scroll)}</span></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <Empty />}
      </Card>

      <Card title="Últimas visitas" sub="As 25 páginas vistas mais recentes" className="mt-4">
        {views.length ? (
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full min-w-[640px] text-[13.5px]">
              <thead>
                <tr className="text-left" style={{ color: C.sub }}>
                  <th className="font-medium pb-3">Quando</th>
                  <th className="font-medium pb-3">Página</th>
                  <th className="font-medium pb-3">Origem</th>
                  <th className="font-medium pb-3">Dispositivo</th>
                  <th className="font-medium pb-3 text-right">Tempo</th>
                  <th className="font-medium pb-3 text-right">Rolagem</th>
                </tr>
              </thead>
              <tbody>
                {views.slice(0, 25).map(v => (
                  <tr key={v.id} style={{ borderTop: `1px solid ${C.line}` }}>
                    <td className="py-2.5 pr-4 tabular-nums whitespace-nowrap" style={{ color: C.sub }}>{v.ts.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
                    <td className="py-2.5 pr-4">{pageName(v.path)}</td>
                    <td className="py-2.5 pr-4">{v.source}</td>
                    <td className="py-2.5 pr-4">{v.device}</td>
                    <td className="py-2.5 text-right tabular-nums">{fmtDur(v.seconds || 0)}</td>
                    <td className="py-2.5 text-right tabular-nums">{fmtPct(v.scroll || 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <Empty />}
      </Card>
    </>
  );
}

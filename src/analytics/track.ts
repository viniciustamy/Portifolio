import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from './data';

/*
 * Rastreamento próprio e anônimo do portfólio: uma linha por página vista (com tempo e rolagem)
 * e uma por clique em link de saída. Sem cookie e sem identificador que dure além da aba:
 * a sessão vive no sessionStorage e some quando a aba fecha.
 */

// Em desenvolvimento, mostra no console quando uma gravação falha
const fail = (e: unknown) => { if (import.meta.env.DEV) console.warn('[analytics]', e); return null; };

const OWNER_KEY = 'vt-analytics-owner';
const SID_KEY = 'vt-sid';
const SOURCE_KEY = 'vt-source';

const storage = (s: () => Storage) => {
  try { return s(); } catch { return null; }
};

export const markOwner = () => storage(() => localStorage)?.setItem(OWNER_KEY, '1');

function enabled() {
  if (typeof window === 'undefined' || navigator.webdriver) return false;
  if (storage(() => localStorage)?.getItem(OWNER_KEY)) return false;
  // Em desenvolvimento só conta com ?track=1, para testar sem sujar os dados
  const local = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  if (local) {
    const ss = storage(() => sessionStorage);
    if (new URLSearchParams(location.search).get('track') === '1') ss?.setItem('vt-track-dev', '1');
    return ss?.getItem('vt-track-dev') === '1';
  }
  return true;
}

function sessionId() {
  const ss = storage(() => sessionStorage);
  let sid = ss?.getItem(SID_KEY);
  if (!sid) {
    sid = Math.random().toString(36).slice(2, 12);
    ss?.setItem(SID_KEY, sid);
  }
  return sid;
}

// De onde a pessoa veio, guardado no começo da sessão
function source() {
  const ss = storage(() => sessionStorage);
  const saved = ss?.getItem(SOURCE_KEY);
  if (saved) return saved;
  const utm = new URLSearchParams(location.search).get('utm_source');
  let host = '';
  try { host = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, '') : ''; } catch { /* referrer inválido */ }
  let s = 'Direto';
  if (utm) s = utm.toLowerCase();
  else if (host && host !== location.hostname) {
    if (/linkedin|lnkd/.test(host)) s = 'LinkedIn';
    else if (/google\./.test(host)) s = 'Google';
    else if (/instagram/.test(host)) s = 'Instagram';
    else if (/whatsapp|wa\.me/.test(host)) s = 'WhatsApp';
    else if (/bing|duckduckgo|yahoo/.test(host)) s = 'Outras buscas';
    else s = host;
  }
  ss?.setItem(SOURCE_KEY, s);
  return s;
}

const device = () => (window.innerWidth < 768 ? 'Celular' : window.innerWidth < 1100 ? 'Tablet' : 'Desktop');

let current: { id: Promise<string | null>; active: number; lastTick: number; scroll: number; sent: { seconds: number; scroll: number } } | null = null;

function readScroll() {
  if (!current) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max <= 0 ? 100 : Math.round(((window.scrollY) / max) * 100);
  current.scroll = Math.max(current.scroll, Math.min(100, Math.max(0, pct)));
}

// Tempo só conta com a aba visível
function tick() {
  if (!current) return;
  const now = Date.now();
  if (document.visibilityState === 'visible') current.active += now - current.lastTick;
  current.lastTick = now;
}

async function flush() {
  if (!current) return;
  tick();
  readScroll();
  const seconds = Math.min(3600, Math.round(current.active / 1000));
  if (seconds === current.sent.seconds && current.scroll === current.sent.scroll) return;
  const id = await current.id;
  if (!id) return;
  current.sent = { seconds, scroll: current.scroll };
  updateDoc(doc(db, 'views', id), { seconds, scroll: current.scroll }).catch(fail);
}

export function trackView(path: string) {
  if (!enabled()) return;
  flush();
  const caseId = path.startsWith('/project/') ? path.split('/')[2] ?? null : null;
  const id = addDoc(collection(db, 'views'), {
    path,
    caseId,
    source: source(),
    device: device(),
    sid: sessionId(),
    seconds: 0,
    scroll: 0,
    ts: serverTimestamp(),
  }).then(r => r.id).catch(fail);
  current = { id, active: 0, lastTick: Date.now(), scroll: 0, sent: { seconds: 0, scroll: 0 } };
  // A página nova ainda não rolou
  setTimeout(readScroll, 50);
}

function linkLabel(a: HTMLAnchorElement) {
  const tracked = a.closest<HTMLElement>('[data-track]')?.dataset.track;
  if (tracked) return tracked;
  const href = a.getAttribute('href') ?? '';
  if (href.startsWith('mailto:')) return 'E-mail';
  if (/\.pdf($|\?)/i.test(href)) return 'Currículo (PDF)';
  if (/linkedin\./i.test(href)) return 'LinkedIn';
  if (/wa\.me|whatsapp/i.test(href)) return 'WhatsApp';
  if (/github\./i.test(href)) return 'GitHub';
  if (/behance\./i.test(href)) return 'Behance';
  if (/instagram\./i.test(href)) return 'Instagram';
  if (/^https?:/i.test(href)) { try { return new URL(href).hostname.replace(/^www\./, ''); } catch { return 'Link externo'; } }
  return null;
}

let started = false;
export function startTracking() {
  if (started || !enabled()) return;
  started = true;
  window.addEventListener('scroll', readScroll, { passive: true });
  document.addEventListener('visibilitychange', () => { tick(); if (document.visibilityState === 'hidden') flush(); });
  window.addEventListener('pagehide', () => { flush(); });
  window.setInterval(flush, 15000);
  // Só links de saída (e-mail, currículo, redes, sites externos) viram clique
  document.addEventListener('click', e => {
    const target = e.target as HTMLElement | null;
    // data-track vale mesmo fora de um link (o selo da App Store dentro do card da Home)
    const tracked = target?.closest?.<HTMLElement>('[data-track]')?.dataset.track;
    const a = target?.closest?.('a');
    const label = tracked ?? (a ? linkLabel(a) : null);
    if (!label) return;
    addDoc(collection(db, 'clicks'), {
      label,
      path: location.pathname,
      sid: sessionId(),
      ts: serverTimestamp(),
    }).catch(fail);
  }, { capture: true });
}


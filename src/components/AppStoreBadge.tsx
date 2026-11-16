// Selo "Baixar na App Store" no padrão preto da Apple.
// Dentro de um card que já é link (a thumb da Home), vira um span que abre a loja sem navegar para o case.
const APPLE_PATH = 'M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701';

// compact: versão um pouco menor, para ficar sobre um motion sem cobrir muito
type Props = { url: string; inLink?: boolean; compact?: boolean; className?: string };

export function AppStoreBadge({ url, inLink = false, compact = false, className = '' }: Props) {
  const content = (
    <>
      <svg viewBox="0 0 24 24" width={compact ? 18 : 22} height={compact ? 18 : 22} fill="currentColor" aria-hidden="true"><path d={APPLE_PATH} /></svg>
      <span className="flex flex-col items-start leading-none">
        <span className={`${compact ? 'text-[9px]' : 'text-[10px]'} font-medium tracking-wide`}>Baixar na</span>
        <span className={`${compact ? 'text-[14px]' : 'text-[17px]'} font-semibold tracking-tight mt-0.5`}>App Store</span>
      </span>
    </>
  );
  const cls = `inline-flex items-center ${compact ? 'gap-1.5 h-10 pl-3 pr-3.5 rounded-[10px]' : 'gap-2 h-12 pl-3.5 pr-4 rounded-xl'} bg-black text-white border border-white/25 transition-transform active:scale-95 hover:scale-[1.03] ${className}`;

  if (inLink) {
    const open = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      window.open(url, '_blank', 'noopener');
    };
    return (
      <span role="link" tabIndex={0} aria-label="Baixar o Mindi na App Store" data-track="App Store (Mindi)" className={`${cls} cursor-pointer`} onClick={open} onKeyDown={(e: any) => { if (e.key === 'Enter' || e.key === ' ') open(e); }}>
        {content}
      </span>
    );
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" aria-label="Baixar o Mindi na App Store" data-track="App Store (Mindi)" className={cls}>
      {content}
    </a>
  );
}

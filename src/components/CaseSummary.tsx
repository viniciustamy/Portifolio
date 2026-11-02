/*
 * Resumo no topo do case, logo depois do hero: papel, ano, time e produto, e o TL;DR em três
 * partes (problema, o que eu fiz, resultado). Lê os campos role, year, team, platform e tldr do data.
 */

const asText = (v: unknown) => (Array.isArray(v) ? v.join(', ') : (v as string | undefined));

export function CaseSummary({ project }: { project: any }) {
  const tldr = project.tldr;
  if (!tldr) return null;

  const meta = [
    { label: 'Meu papel', value: asText(project.role) },
    { label: 'Ano', value: asText(project.year) },
    { label: 'Time', value: asText(project.team) },
    { label: 'Produto', value: asText(project.platform) },
  ].filter(m => m.value);

  const parts = [
    { label: 'Problema', text: tldr.problem },
    { label: 'O que eu fiz', text: tldr.action },
    { label: 'Resultado', text: tldr.result, highlight: true },
  ].filter(p => p.text);

  return (
    <section aria-label="Resumo do case" className="not-prose mb-24 rounded-2xl bg-[#FAF9F7] border border-[#E2DCD4] p-6 md:p-8">
      <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 pb-6 border-b border-[#E2DCD4]">
        {meta.map(m => (
          <div key={m.label}>
            <dt className="text-[12px] font-semibold text-[#6F625B]">{m.label}</dt>
            <dd className="text-[15px] font-medium text-[#241510] mt-1 leading-snug">{m.value}</dd>
          </div>
        ))}
      </dl>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-6">
        {parts.map(p => (
          <div key={p.label}>
            <p className={`text-[13px] font-semibold ${p.highlight ? 'text-[#9E4322]' : 'text-[#6F625B]'}`}>{p.label}</p>
            <p className="text-[15px] text-[#4F4440] leading-relaxed mt-1.5">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

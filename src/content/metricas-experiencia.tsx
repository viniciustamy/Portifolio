import React from 'react';
import CESImg from '../assets/images/Post Métricas/CES.png';
import Metrica1Img from '../assets/images/Post Métricas/Métrica 1.png';
import Metrica2Img from '../assets/images/Post Métricas/Métrica 2.png';
import Metrica3Img from '../assets/images/Post Métricas/Métrica 3.png';
import Metrica4Img from '../assets/images/Post Métricas/Métrica 4.png';
import { AnimatedNumber } from '../components/AnimatedNumber';

const H2 = 'font-serif text-3xl font-bold text-[#241510] mb-4';
const LEAD = 'text-[#7D7169] leading-relaxed mb-8';

const QUESTIONS = [
  'Quais fluxos estão funcionando bem?',
  'Quais geram mais esforço?',
  'Como a experiência evolui ao longo do tempo?',
  'Quais problemas aparecem de forma recorrente?',
  'Onde deveríamos concentrar nossos esforços de design?',
];

const FLOWS = [
  { persona: 'RH', items: ['Rede de relacionamento', 'Comitê', 'Devolutivas'] },
  { persona: 'Gestor', items: ['Rede de relacionamento', 'Devolutivas', 'Feedback'] },
  { persona: 'Colaborador', items: ['Rede de relacionamento', 'Responder avaliação', 'Devolutivas', 'PDI', 'Feedback'] },
];

const PAINS = [
  { title: 'Usabilidade', desc: 'Navegação pouco intuitiva, interfaces confusas e muitos passos.' },
  { title: 'Gerenciamento', desc: 'Falta de visão consolidada, filtros e formas de organizar informações.' },
  { title: 'Processos', desc: 'Fluxos repetitivos, burocráticos e etapas incompletas.' },
  { title: 'Interface', desc: 'Problemas de hierarquia, campos pequenos e inconsistências visuais.' },
  { title: 'Estabilidade', desc: 'Erros de login, dados inconsistentes e falhas pontuais.' },
];

const KEEP = [
  { title: 'Feedback', desc: 'Percebido como simples e útil para registrar e acompanhar o desenvolvimento.' },
  { title: 'Devolutiva para líderes', desc: 'A clareza das informações e das avaliações foi bastante elogiada.' },
  { title: 'Rede de relacionamento', desc: 'A experiência para colaboradores foi percebida como simples e intuitiva.' },
];

const NEXT = [
  'Aprofundar a investigação dos fluxos mais críticos.',
  'Avaliar o impacto da nova experiência de ciclos sobre os problemas encontrados.',
  'Levar os aprendizados para o módulo de Desenvolvimento, que também tinha alto uso e demanda por melhorias.',
  'Replicar o acompanhamento para fluxos que ainda não estavam monitorados.',
];

// Número grande + legenda, no mesmo card usado nos outros cases
function Stat({ value, suffix, label, format }: { value: number; suffix?: string; label: string; format?: (v: number) => string }) {
  return (
    <div className="border border-[#E2DCD4] rounded-2xl p-7">
      <span className="font-serif text-6xl font-bold text-[#241510] leading-none tracking-tight">
        <AnimatedNumber value={value} duration={1.6} format={format} />{suffix && <span className="text-3xl ml-2">{suffix}</span>}
      </span>
      <p className="text-[15px] text-[#6F625B] leading-relaxed mt-3">{label}</p>
    </div>
  );
}

export const MetricasExperienciaContent = () => (
  <div className="mode-simplificado">
    {/* Contexto */}
    <div className="mb-32">
      <h2 id="contexto" className={H2}>Saindo da operação para entender o todo</h2>
      <p className="text-[#7D7169] leading-relaxed mb-4">
        Dentro dos times, era comum terminar e lançar um projeto e seguir direto para a próxima iniciativa, sem tempo para acompanhar o que foi lançado.
      </p>
      <p className="text-[#7D7169] leading-relaxed">
        Quando assumi como Design Lead, passei a ter espaço para olhar além da operação. Junto com o Head de Design, identificamos a falta de acompanhamento contínuo dos principais fluxos do produto e começamos a trabalhar.
      </p>
    </div>

    {/* Desafio */}
    <div className="mb-32">
      <h2 id="desafio" className={H2}>Estruturar a primeira rotina de métricas de experiência</h2>
      <p className={LEAD}>O objetivo era responder continuamente algumas perguntas sobre o produto:</p>
      <div className="not-prose flex flex-wrap gap-2.5">
        {QUESTIONS.map(q => (
          <span key={q} className="rounded-full border border-[#E2DCD4] px-4 py-2 text-[14px] text-[#4F4440]">{q}</span>
        ))}
      </div>
    </div>

    {/* Métrica escolhida */}
    <div className="mb-32">
      <h2 id="ces" className={H2}>Começamos pelo esforço</h2>
      <p className={LEAD}>
        Os principais fluxos eram, em grande parte, etapas obrigatórias para gestores e colaboradores. Antes de saber se as pessoas gostavam da experiência, queríamos entender se conseguiam concluir suas tarefas sem esforço excessivo. Por isso escolhemos o CES (Customer Effort Score).
      </p>
      <img src={CESImg} alt="Escala CES (Customer Effort Score)" className="w-full max-w-2xl mx-auto h-auto object-contain" />
    </div>

    {/* Estrutura */}
    <div className="mb-32">
      <h2 id="pesquisas" className={H2}>Pesquisas criadas</h2>
      <p className={LEAD}>Mapeamos as jornadas obrigatórias de cada persona e configuramos uma pesquisa de CES no fim de cada fluxo.</p>

      <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <Stat value={11} suffix="fluxos" label="monitorados" />
        <Stat value={3} suffix="personas" label="RH, Gestor e Colaborador" />
        <Stat value={6} suffix="meses" label="de acompanhamento" />
      </div>

      <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-x-10">
        {FLOWS.map(group => (
          <div key={group.persona}>
            <h3 className="font-sans font-semibold text-[16px] text-[#241510] mb-1">{group.persona}</h3>
            <ul className="divide-y divide-[#E2DCD4]">
              {group.items.map(item => <li key={item} className="py-3 text-[14px] text-[#6F625B]">{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>

    {/* Monitoramento */}
    <div className="mb-32">
      <h2 id="h1" className={H2}>H1, de janeiro a junho</h2>
      <p className={LEAD}>
        Durante o primeiro semestre de 2025, acompanhei os resultados mês a mês, consolidando respostas, amostragem e comentários de cada fluxo.
      </p>

      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <Stat value={3725} label="respostas coletadas" format={v => v.toLocaleString('pt-BR')} />
        <Stat value={764} label="comentários analisados" />
      </div>

      <img src={Metrica1Img} alt="Planilha de monitoramento consolidando respostas, amostragem e comentários por fluxo" className="w-full h-auto rounded-2xl border border-[#E2DCD4]" />
    </div>

    {/* Performance das pesquisas */}
    <div className="mb-32">
      <h2 id="alcance" className={H2}>Alcance e desempenho das pesquisas</h2>
      <p className={LEAD}>Os fluxos de colaboradores concentraram o volume; nos fluxos de RH, o sinal era pequeno demais para conclusões.</p>

      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <div className="border border-[#E2DCD4] rounded-2xl p-7">
          <span className="text-[14px] text-[#2E7D4F]">Melhor desempenho</span>
          <h3 className="font-serif font-bold text-[22px] text-[#241510] leading-snug mt-1 mb-6">Responder avaliação foi o maior fluxo</h3>
          <div className="grid grid-cols-3 gap-4">
            {[['+2 mil', 'respostas'], ['616,6%', 'da amostragem esperada'], ['CES 4,0', 'baixo esforço']].map(([v, l]) => (
              <div key={l}>
                <p className="font-serif text-[24px] font-bold text-[#241510] leading-none">{v}</p>
                <p className="text-[13px] text-[#6F625B] mt-1.5 leading-snug">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-[#E2DCD4] rounded-2xl p-7">
          <span className="text-[14px] text-[#9E4322]">Pouco sinal</span>
          <h3 className="font-serif font-bold text-[22px] text-[#241510] leading-snug mt-1 mb-6">Fluxos de RH tiveram volume muito menor</h3>
          <div className="grid grid-cols-2 gap-4">
            {[['Devolutiva RH', '9 respostas · 2,6% da amostragem'], ['Rede RH', '16 respostas · 4,6% da amostragem']].map(([v, l]) => (
              <div key={v}>
                <p className="font-serif text-[20px] font-bold text-[#241510] leading-tight">{v}</p>
                <p className="text-[13px] text-[#6F625B] mt-1.5 leading-snug">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <img src={Metrica2Img} alt="Slide da apresentação de fechamento do H1 sobre a performance das pesquisas" className="w-full max-w-5xl mx-auto h-auto" />
    </div>

    {/* Dores */}
    <div className="mb-32">
      <h2 id="dores" className={H2}>Principais dores encontradas</h2>
      <p className={LEAD}>Analisei os comentários fluxo a fluxo e consolidei os padrões em uma documentação compartilhada com o time.</p>

      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-x-10">
        {PAINS.map((p, i) => (
          <div key={p.title} className={`flex gap-4 py-5 ${i > 1 ? 'border-t border-[#E2DCD4]' : ''} ${i === 1 ? 'border-t md:border-t-0 border-[#E2DCD4]' : ''}`}>
            <span className="text-[15px] font-semibold text-[#9E4322] tabular-nums pt-px">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h4 className="font-sans font-semibold text-[16px] text-[#241510] leading-snug mb-1">{p.title}</h4>
              <p className="text-[14px] text-[#6F625B] leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* O que preservar */}
    <div className="mb-32">
      <h2 id="preservar" className={H2}>Também descobrimos o que preservar</h2>
      <p className={LEAD}>A análise não serviu só para encontrar problemas. Algumas experiências foram bem avaliadas de forma consistente:</p>

      <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {KEEP.map(k => (
          <div key={k.title} className="bg-[#F6EAE3] rounded-2xl p-7">
            <h4 className="font-serif font-bold text-[19px] text-[#241510] leading-snug mb-2">{k.title}</h4>
            <p className="text-[14px] text-[#6F625B] leading-relaxed">{k.desc}</p>
          </div>
        ))}
      </div>

      <img src={Metrica3Img} alt="Slides da apresentação de fechamento do H1" className="w-full max-w-6xl mx-auto h-auto" />
    </div>

    {/* Próximos passos */}
    <div className="mb-32">
      <h2 id="proximos-passos" className={H2}>Transformando dados em ação</h2>
      <p className={LEAD}>No fechamento do semestre, transformei os resultados em direcionamentos para o time:</p>

      <ol className="not-prose divide-y divide-[#E2DCD4] mb-12">
        {NEXT.map((n, i) => (
          <li key={n} className="flex gap-4 py-4">
            <span className="text-[15px] font-semibold text-[#9E4322] tabular-nums pt-px">{String(i + 1).padStart(2, '0')}</span>
            <p className="text-[15px] text-[#4F4440] leading-relaxed">{n}</p>
          </li>
        ))}
      </ol>

      <img src={Metrica4Img} alt="Slide da apresentação de fechamento do H1 sobre os próximos passos" className="w-full max-w-5xl mx-auto h-auto" />
    </div>

    {/* Impacto */}
    <div className="relative isolate mb-32 py-20 md:py-24">
      {/* Faixa escura de ponta a ponta, mesmo destaque da seção de IA da Devolutiva */}
      <span aria-hidden="true" className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen bg-[#2E211B] -z-10" />
      <h2 id="impacto" className="font-serif text-3xl font-bold text-[#F4EFEB] mb-4">A primeira iniciativa de acompanhamento contínuo de experiência do produto</h2>
      <p className="text-[#C9BDB4] leading-relaxed">
        Hipóteses que pareciam subjetivas passaram a ter evidências para serem discutidas com Produto e Design.
      </p>
    </div>

    {/* Aprendizado */}
    <div className="mb-16">
      <h2 id="aprendizado" className={H2}>O que eu faria diferente hoje</h2>
      <p className="not-prose border-l-2 border-[#9E4322] pl-6 text-[17px] text-[#4F4440] leading-relaxed">
        Hoje eu estruturaria esse processo de forma mais automatizada, <strong className="text-[#241510]">criando um dashboard com IA</strong> conectado às pesquisas para <strong className="text-[#241510]">gerar um relatório centralizado</strong>, com gráficos visuais e classificação automática dos comentários.
      </p>
    </div>
  </div>
);

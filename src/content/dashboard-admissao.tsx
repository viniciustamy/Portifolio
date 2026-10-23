import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Bell,
  AlertTriangle,
  Check,
  ChevronDown,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { Gallery } from '../components/Gallery';
import { PlatformToday } from '../components/PlatformToday';
import dash01 from '../assets/images/Dash/Dash - 01.png';
import dash02 from '../assets/images/Dash/Dash - 02.png';
import dash03 from '../assets/images/Dash/Dash - 03.png';
import dash04 from '../assets/images/Dash/Dash-04.png';
import dash05 from '../assets/images/Dash/Dash-05.png';
import dash06 from '../assets/images/Dash/Dash-06.png';
import dash07 from '../assets/images/Dash/Dash-07.png';
import dash14 from '../assets/images/Dash/Dash-14.png';
import dash15 from '../assets/images/Dash/Dash-15.png';
import dash16 from '../assets/images/Dash/Dash-16.png';
import dash17 from '../assets/images/Dash/Dash-17.png';
import dash18 from '../assets/images/Dash/Dash-18.png';
import dash19 from '../assets/images/Dash/Dash-19.png';
import dash20 from '../assets/images/Dash/Dash-20.png';
import principalHandoff from '../assets/images/Admin/Seção Handoff/Pincipal.png';
import logoCursorHandoff from '../assets/images/Admin/Seção Handoff/logocursorcompleta.png';
import dash18Handoff from '../assets/images/Admin/Seção Handoff/Dash-18 1.png';
import dash19Handoff from '../assets/images/Admin/Seção Handoff/Dash-19 2.png';
import dash20Handoff from '../assets/images/Admin/Seção Handoff/Dash-20 1.png';
import Estresse from '../assets/images/Admin/Seção Handoff/Estresse.png';
import contextoImg from '../assets/images/Admin/contexto.png';
import discoveryImg from '../assets/images/Admin/discovery.png';
import onepageImg from '../assets/images/Admin/onepage.png';
import prototipoImg from '../assets/images/Admin/prototipo.png';
import entrevista1Img from '../assets/images/Admin/entrevitsa-1.png';
import entrevista2Img from '../assets/images/Admin/entrevitsa-2.png';
import entrevista3Img from '../assets/images/Admin/entrevitsa-3.png';
import entrevista4Img from '../assets/images/Admin/entrevitsa-4.png';
import entrevista5Img from '../assets/images/Admin/entrevitsa-5.png';
import entrevista6Img from '../assets/images/Admin/entrevitsa-6.png';
import logoPetz from '../assets/images/Admin/petz.png';
import logoAjinomoto from '../assets/images/Admin/ajinomoto.png';
import logoSoma from '../assets/images/Admin/soma.png';
import logoClaro from '../assets/images/Admin/claro.png';
import dash21 from '../assets/images/Dash/Dash-21.png';
import dash22 from '../assets/images/Dash/Dash-22.mov';
import dash23 from '../assets/images/Dash/Dash-23.png';
import dash24 from '../assets/images/Dash/Dash-24.png';
import LogoLM from '../assets/images/logoLM.png';
import LogoGoogleIA from '../assets/images/google ia.png';
import logocursor from '../assets/images/logocursor.png';
import { AtuacaoInfo } from '../components/AtuacaoInfo';




const discoveryGalleryItems = [
  {
    src: discoveryImg,
    title: "Base de Solicitações e NotebookLM",
    description: "Planilha consolidando solicitações históricas de clientes com análise semântica via NotebookLM.",
    fullWidth: true
  },
  {
    src: dash04,
    title: "NotebookLM e Análise Semântica",
    description: "Uso do NotebookLM para analisar dados de canais de suporte e organizar semanticamente os principais gargalos burocráticos relatados."
  }
];

const prototipacaoGalleryItems = [
  {
    src: prototipoImg,
    title: "Protótipo em Média Fidelidade (Google AI Studio)",
    description: "Exploração de layouts funcionais e geração de visões operacionais rápidas no Google AI Studio.",
    fullWidth: true
  },
  {
    src: dash05,
    title: "Mapeamento de SLAs de Contratação",
    description: "Mapeamento detalhado das etapas críticas do processo admissional e definição de SLAs ideais para alertar sobre atrasos operacionais."
  },
  {
    src: dash06,
    title: "Primeira Ideação Estrutural",
    description: "Exploração de layouts em wireframes funcionais no Google AI Studio para testar visões de prateleiras com foco operacional."
  },
  {
    src: dash07,
    title: "Filtros de Janelas de Contratação",
    description: "Variação de filtros focando na data prevista de admissão e no acompanhamento de SLAs de lotes semanais/mensais."
  }
];

const validacaoGalleryItems = [
  {
    src: entrevista2Img,
    title: "Sessão de Usabilidade - Petz",
    description: "Sessão com coordenação de DP da Petz validando indicadores de aprovação de documentos."
  },
  {
    src: entrevista5Img,
    title: "Sessão de Usabilidade - Ajinomoto",
    description: "Sessão com liderança de RH da Ajinomoto avaliando etapas e gargalos do funil admissional."
  },
  {
    src: entrevista6Img,
    title: "Sessão de Usabilidade - Grupo Soma",
    description: "Validação com o Grupo Soma dos resumos operacionais e acompanhamento por janela de contratação."
  },
  {
    src: entrevista4Img,
    title: "Sessão de Usabilidade - Claro",
    description: "Teste com time da Claro explorando filtros por tipos de documentos e regras de validação."
  }
];

const altaFidelidadeGalleryItems = [
  {
    src: dash24,
    title: "Dashboard de Admissão - Alta Fidelidade",
    description: "Visão consolidada da nova interface do dashboard projetada com alta fidelidade para os operadores e gestores de admissão.",
    fullWidth: true
  }
];

const onePageGalleryItems = [
  {
    src: onepageImg,
    title: "One Page Estratégico do Projeto",
    description: "Síntese dos testes de usabilidade com os direcionamentos estratégicos de produto.",
    fullWidth: true
  },
  {
    src: dash14,
    title: "Análise de Transcrições no NotebookLM",
    description: "Processamento de dezenas de horas de entrevistas gravadas para agrupar automaticamente os feedbacks mais comuns e recorrentes."
  },
  {
    src: dash15,
    title: "Dashboard de Admissão - Visão Geral",
    description: "Telas finais de alta fidelidade integrando a inteligência da Gupy para controle total das próximas contratações."
  },
  {
    src: dash16,
    title: "Gargalos em Detalhes por Etapa",
    description: "Gráfico dinâmico que exibe o tempo médio de permanência em cada etapa e aponta os maiores atrasos de aprovação de documentos."
  },
  {
    src: dash17,
    title: "Ação Rápida de Cobrança Contextual",
    description: "Ação direta que permite ao operador entrar em contato com candidatos parados via WhatsApp com mensagens geradas automaticamente."
  }
];

const handoffGalleryItems = [
  {
    src: dash20,
    title: "One Page Estratégico para Liderança",
    description: "Material consolidando o ROI, dores mapeadas e direcionamento estratégico do novo Dashboard para apresentação executiva à diretoria."
  },
  {
    src: dash21,
    title: "Drill-down Técnico do Roadmap",
    description: "Detalhamento das fases de entrega e metas operacionais alinhadas com as prioridades corporativas."
  },
  {
    src: dash18,
    title: "Status de Validação de Documentos",
    description: "Gráficos de barras que detalham a proporção de documentos corretos, pendentes de envio e reprovados pela equipe ou IA."
  },
  {
    src: dash19,
    title: "Painel de Filtros Avançados",
    description: "Filtros poderosos que refinam as listagens por filiais geográficas, responsáveis de contratação, cargos e lotes específicos."
  },
  {
    src: dash23,
    title: "Handoff Técnico",
    description: "Handoff técnico refinado utilizando Storybook, garantindo fidelidade pixel-perfect em múltiplos estados de dados da aplicação."
  }
];







export const DashboardAdmissaoContent = () => {
  const [viewMode, setViewMode] = useState<'simplificado' | 'relatorio'>('simplificado');

  // Interactive accordions for Section 5
  const [showGreenDetails, setShowGreenDetails] = useState(false);
  const [showYellowDetails, setShowYellowDetails] = useState(false);
  const [showRedDetails, setShowRedDetails] = useState(false);

  return (
    <div className={viewMode === 'simplificado' ? 'mode-simplificado' : 'mode-relatorio'}>
      {/* Switcher - hidden */}
      <div className="hidden justify-center mb-12 not-prose">
        <div className="bg-[#E2DCD4]/60 p-1.5 rounded-full flex gap-1 border border-[#E2DCD4]">
          <button
            onClick={() => setViewMode('simplificado')}
            className={`px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${viewMode === 'simplificado'
              ? 'bg-[#9E4322] text-white '
              : 'text-[#6F625B] hover:text-[#241510]'
              }`}
          >
            <Sparkles size={16} />
            Simplificado
          </button>
          <button
            onClick={() => setViewMode('relatorio')}
            className={`px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${viewMode === 'relatorio'
              ? 'bg-[#9E4322] text-white '
              : 'text-[#6F625B] hover:text-[#241510]'
              }`}
          >
            <BookOpen size={16} />
            Relatório Completo
          </button>
        </div>
      </div>

      {viewMode === 'simplificado' ? (
        <>


          {/* Seção 2: Contexto */}
          <div className="mb-32">
            <h2 id="contexto" className="font-serif text-3xl font-bold text-[#241510] mb-4">Um dashboard defasado</h2>
            <p className="text-[#7D7169] leading-relaxed mb-6">
              Além da necessidade técnica de migrar para uma nova biblioteca de componentes, havia a oportunidade de repensar a experiência inteira. Analisando anos de solicitações de clientes, feedbacks de Customer Success e demandas internas, o problema real não era falta de gráficos: era o desalinhamento entre o dashboard e a rotina operacional do RH.
            </p>

            <img
              src={contextoImg}
              alt="Print do Dashboard anterior defasado"
            />
            {/* Legenda */}
            <p className="text-center text-sm text-[#6F625B] mt-4 font-medium">
              Print do Dashboard anterior defasado
            </p>
          </div>

          {/* Seção 3: O Desafio */}
          <div className="mb-32">
            <h2 id="desafio" className="font-serif text-3xl font-bold text-[#241510] mb-4">Não era sobre replicar o que foi feito em R&S</h2>
            <p className="text-[#7D7169] leading-relaxed mb-8">
              Antes de investigar qualquer solução, precisávamos garantir que Produto, Design e Tecnologia partissem do mesmo entendimento do problema.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose mb-8">
              <div className="bg-[#FAF9F6] border-l-2 border-[#9E4322] border-y-0 border-r-0 p-6 flex flex-col hover:bg-[#FAF9F6]/80 transition-all duration-300 rounded-2xl">
                <h4 className="font-sans font-bold text-[#241510] text-base mb-2">Sobre o que já temos?</h4>
                <p className="text-sm text-[#6F625B] leading-relaxed">
                  Quais informações realmente geravam valor.
                </p>
              </div>
              <div className="bg-[#FAF9F6] border-l-2 border-[#9E4322] border-y-0 border-r-0 p-6 flex flex-col hover:bg-[#FAF9F6]/80 transition-all duration-300 rounded-2xl">
                <h4 className="font-sans font-bold text-[#241510] text-base mb-2">O que precisa ter?</h4>
                <p className="text-sm text-[#6F625B] leading-relaxed">
                  Quais decisões o DP precisava tomar diariamente.
                </p>
              </div>
              <div className="bg-[#FAF9F6] border-l-2 border-[#9E4322] border-y-0 border-r-0 p-6 flex flex-col hover:bg-[#FAF9F6]/80 transition-all duration-300 rounded-2xl">
                <h4 className="font-sans font-bold text-[#241510] text-base mb-2">Contexto admissão</h4>
                <p className="text-sm text-[#6F625B] leading-relaxed">
                  Como virar ferramenta de trabalho, não só de consulta.
                </p>
              </div>
            </div>
          </div>

          {/* Seção 4: Discovery */}
          <div className="mb-32">
            <h2 id="discovery" className="font-serif text-3xl font-bold text-[#241510] mb-4">Centenas de registros, uma direção clara</h2>
            <p className="text-[#7D7169] leading-relaxed mb-6">
              Consolidei solicitações históricas de clientes, feedbacks de Customer Success, demandas do time de Produto e a evolução do Dashboard de Recrutamento. Com apoio do NotebookLM, organizei esse volume, identifiquei padrões recorrentes e transformei informação dispersa em prioridade.
            </p>

            <img
              src={discoveryImg}
              alt="Planilha com solicitações de clientes consolidadas e NotebookLM"
            />
            {/* Legenda */}
            <p className="text-center text-sm text-[#6F625B] mt-4 font-medium">
              Planilha com solicitações de clientes consolidadas
            </p>

            <p className="text-[#7D7169] leading-relaxed mt-6">
              A análise mostrou algo importante: muitos pedidos já tinham sido resolvidos manualmente em ferramentas paralelas, enquanto as necessidades realmente estratégicas seguiam sem solução.
            </p>
          </div>

          {/* Seção 5: Resultado da Análise */}
          <div className="mb-32">
            <h2 id="analise" className="font-serif text-3xl font-bold text-[#241510] mb-4">Três níveis de urgência, um padrão em comum</h2>
            <p className="text-[#7D7169] leading-relaxed mb-8">
              Organizei as solicitações em três níveis de urgência. Todas apontavam para a mesma lacuna: o produto não respondia nativamente às perguntas operacionais do DP.
            </p>

            <div className="not-prose rounded-2xl border border-[#E2DCD4] divide-y divide-[#E2DCD4] overflow-hidden">
              {[
                {
                  open: showGreenDetails, toggle: () => setShowGreenDetails(!showGreenDetails), color: '#9E4322', Icon: Check,
                  title: '6 frentes já atendidas, via soluções pontuais', sub: 'Superset / Metabase, caso a caso, sem solução escalável',
                  items: [
                    'Dados de admissão e etapas (entrada/saída, SLA por etapa) — Panvel, Piracanjuba, Sabesp, Ecolabs, Ero Brasil, Usina Santa Adélia.',
                    'Volume de documentos (enviados, validados, reenviados, recusa) — via consulta paralela no Superset.',
                    'Relatórios customizados — Ailos (planilha manual), Panvel (2x).',
                    'PPCs inseridos manualmente, produtividade do time e admissões por filial.',
                    'Créditos consumidos e admissões concluídas — via queries específicas.',
                    'PPCs com documentos pendentes — automatizado via Airflow.',
                  ],
                  note: 'Quase tudo foi resolvido com soluções manuais no Superset, não de forma nativa na plataforma.',
                },
                {
                  open: showYellowDetails, toggle: () => setShowYellowDetails(!showYellowDetails), color: '#BF6A02', Icon: Bell,
                  title: 'Alguns ainda não atendidos ou pendentes', sub: 'Mapeados, mas precisam de uma análise maior',
                  items: [
                    'Funil de candidatura + admissão (RTE Rodonaves) — não localizado nos registros.',
                    'SLA de admissão no Dashboard Customizado — sem detalhes de empresa ou status.',
                    'Nome da mãe do dependente no relatório — pedido parado sem retorno.',
                    '% de documentos validados por IA vs manual (Iguá Saneamento) — tratado como melhoria de produto.',
                  ],
                  note: '',
                },
                {
                  open: showRedDetails, toggle: () => setShowRedDetails(!showRedDetails), color: '#C00F0C', Icon: AlertTriangle,
                  title: 'Pedidos recentes de clientes-chave', sub: 'Prioritários para o novo Analisar Dados',
                  items: [
                    'Status em tempo real dos candidatos, com filtros por etapa (Imediato Nexway, WEG, Axia Energia).',
                    'Funil completo cruzando R&S + Admissão digital (RTE Rodonaves, Central Ailos).',
                    'Visibilidade de admissões não iniciadas (Fortbras).',
                    'Tempo de movimentação entre etapas, com SLA nativo.',
                    'Motivo de desistência dos candidatos fora do processo.',
                    'Qual documento demora mais para ser enviado.',
                  ],
                  note: '',
                },
              ].map(level => (
                <div key={level.title}>
                  <button onClick={level.toggle} className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-[#FAF9F6] transition-colors">
                    <span className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0" style={{ background: `${level.color}14`, color: level.color }}>
                      <level.Icon size={18} strokeWidth={2.5} />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-semibold text-[15px] text-[#241510]">{level.title}</span>
                      <span className="block text-[13px] text-[#6F625B]">{level.sub}</span>
                    </span>
                    <span className="text-[13px] font-semibold text-[#9E4322] whitespace-nowrap">{level.open ? 'Ocultar' : 'Ver itens'}</span>
                    <ChevronDown size={16} className={`text-[#9E4322] transition-transform ${level.open ? 'rotate-180' : ''}`} />
                  </button>
                  {level.open && (
                    <div className="px-5 pb-4 pl-[72px] animate-in fade-in duration-300">
                      <ul className="list-disc pl-4 text-[13.5px] space-y-1.5 text-[#4F4440]">
                        {level.items.map(item => <li key={item}>{item}</li>)}
                      </ul>
                      {level.note && <p className="text-[12.5px] text-[#6F625B] mt-2 italic">{level.note}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Seção 6: Prototipação com IA */}
          <div className="mb-32">
            <h2 id="prototipacao" className="font-serif text-3xl font-bold text-[#241510] mb-4">Explorando ideias em média fidelidade</h2>
            <p className="text-[#7D7169] leading-relaxed mb-6">
              Em vez de wireframes estáticos no Figma, usei o Google AI Studio para construir protótipos navegáveis de média fidelidade que evoluíam junto com as discussões, reduzindo o tempo entre hipótese e validação.
            </p>

            <img
              src={prototipoImg}
              alt="Protótipo em média fidelidade no Google AI Studio"
            />
            {/* Legenda */}
            <p className="text-center text-sm text-[#6F625B] mt-4 font-medium">
              Protótipo em média fidelidade no Google AI Studio
            </p>
          </div>

          {/* Seção 7: Validação */}
          <div className="mb-32">
            <h2 id="validacao" className="font-serif text-3xl md:text-4xl font-bold text-[#241510] mb-6">Testando com clientes estratégicos</h2>

            <p className="text-[#7D7169] leading-relaxed mb-8">
              <strong className="font-semibold text-[#241510]">6 clientes</strong> testaram novas categorias, gráficos operacionais, Minhas Análises, Resumo Executivo e configurações. As transcrições foram consolidadas no NotebookLM para encontrar padrões entre as sessões.
            </p>

            {/* Linha de Logos dos Clientes */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-12 not-prose">
              <img src={logoClaro} alt="Claro" className="h-4 md:h-5 " />
              <img src={logoSoma} alt="Grupo Soma" className="h-4 md:h-5" />
              <img src={logoAjinomoto} alt="Ajinomoto" className="h-4 md:h-5" />
              <img src={logoPetz} alt="Petz" className="h-4 md:h-5" />
            </div>

            {/* Carrossel Infinito Animado de Entrevistas */}
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden my-10 not-prose">
              <div className="animate-marquee gap-5 py-2 px-3">
                {[
                  { src: entrevista5Img },
                  { src: entrevista6Img },
                  { src: entrevista2Img },
                  { src: entrevista3Img },
                  { src: entrevista4Img },
                  { src: entrevista1Img },
                  { src: entrevista5Img },
                  { src: entrevista6Img },
                  { src: entrevista2Img },
                  { src: entrevista3Img },
                  { src: entrevista4Img },
                  { src: entrevista1Img }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="w-[360px] md:w-[440px] shrink-0 rounded-2xl overflow-hidden border border-[#E2DCD4] bg-[#151516] shadow-md transition-transform duration-300 hover:scale-[1.02] flex flex-col justify-between"
                  >
                    <img
                      src={item.src}
                      alt={`Entrevista ${idx + 1}`}
                      className="w-full h-auto object-cover rounded-t-2xl"
                    />
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-[#6F625B] mt-6 font-sans font-medium tracking-wide">
                Registros em vídeo das sessões individuais de testes de usabilidade e prototipação conduzidas com clientes reais.
              </p>
            </div>
          </div>

          {/* Seção 8: Principal Descoberta */}
          <div className="mb-32">
            <h2 id="descoberta-risco" className="font-serif text-3xl font-bold text-[#241510] mb-4">O foco não é o passado, é o risco em tempo real</h2>
            <p className="text-[#7D7169] leading-relaxed mb-6">
              Os usuários não usavam o dashboard para entender o passado. Eles precisavam saber quais admissões corriam risco, quem estava parado e quais etapas exigiam atenção imediata.
            </p>

            {/* Antes e depois */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 my-10 not-prose">
              <div className="rounded-2xl border border-[#E2DCD4] bg-[#FAF9F7] p-8 flex flex-col">
                <span className="self-start rounded-full bg-[#ECE7E1] px-3 py-1 text-[12px] font-semibold text-[#6F625B]">Antes</span>
                <h3 className="font-serif text-2xl font-bold text-[#241510] mt-4">Dashboard descritivo</h3>
                <ul className="mt-4 space-y-2 text-[14px] text-[#4F4440]">
                  {['Responde "o que já aconteceu"', 'Indicadores históricos e acumulados', 'Navegação colaborador por colaborador'].map(t => (
                    <li key={t} className="flex gap-2"><span className="mt-[8px] w-1.5 h-1.5 rounded-full bg-[#9B908A] shrink-0" />{t}</li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <div className="flex items-end gap-2.5 h-24">
                    {[45, 80, 58, 48, 88, 62].map((h, i) => <span key={i} className="flex-1 rounded-t-lg bg-[#D6CFC7]" style={{ height: `${h}%` }} />)}
                  </div>
                  <p className="mt-4 flex items-center gap-2 text-[13px] font-semibold text-[#6F625B]"><ArrowLeft size={16} /> Gráficos que olham para trás</p>
                </div>
              </div>

              <div className="rounded-2xl bg-[#2E211B] p-8 flex flex-col text-white">
                <span className="self-start rounded-full bg-[#9E4322] px-3 py-1 text-[12px] font-semibold">Depois</span>
                <h3 className="font-serif text-2xl font-bold mt-4">Visão operacional</h3>
                <ul className="mt-4 space-y-2 text-[14px] text-white/80">
                  {['Responde "o que precisa de ação agora"', 'Risco, previsibilidade e janelas de contratação', 'Foco em quem está parado e por quê'].map(t => (
                    <li key={t} className="flex gap-2"><span className="mt-[8px] w-1.5 h-1.5 rounded-full bg-[#E8A27C] shrink-0" />{t}</li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <div className="flex flex-col justify-center gap-2.5 h-24">
                    {[[0, 70], [12, 45], [28, 52], [62, 26], [50, 46]].map(([ml, w], i) => (
                      <span key={i} className="h-3 rounded-full" style={{ marginLeft: `${ml}%`, width: `${w}%`, background: i === 4 ? '#E8A27C' : 'rgb(255 255 255 / .18)' }} />
                    ))}
                  </div>
                  <p className="mt-4 flex items-center gap-2 text-[13px] font-semibold text-[#E8A27C]">Gráficos que olham para frente <ArrowRight size={16} /></p>
                </div>
              </div>

              <span className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-[#E2DCD4] items-center justify-center text-[#9E4322] shadow-sm">
                <ArrowRight size={18} />
              </span>
            </div>
          </div>

          {/* Seção 9: Mais Insights */}
          <div className="mb-32">
            <h2 id="insights" className="font-serif text-3xl font-bold text-[#241510] mb-8">Cinco aprendizados sobre a rotina do DP</h2>

            <div className="not-prose border-y border-[#E2DCD4] divide-y divide-[#E2DCD4]">
              {[
                { title: 'A operação acontece por janelas', text: 'A unidade de trabalho é o lote de admissões, não cada colaborador.' },
                { title: 'O problema não é o tempo médio', text: 'O DP quer ver rápido quem está parado, há quanto tempo e por quê.' },
                { title: 'Operação fora do produto', text: 'Planilhas paralelas controlavam prazos e preparavam reuniões.' },
                { title: 'Gargalos estruturais', text: 'A etapa do ASO concentrava a maior parte dos atrasos.' },
                { title: 'Papel do dashboard', text: 'Evoluir de histórico para diagnóstico e recomendação de ação.' },
              ].map(({ title, text }, i) => (
                <div key={title} className="flex items-start gap-4 py-4">
                  <span className="text-[13px] font-semibold text-[#9E4322] tabular-nums mt-0.5 shrink-0">0{i + 1}</span>
                  <p className="text-[15px] leading-relaxed">
                    <span className="font-semibold text-[#241510]">{title}.</span>{' '}
                    <span className="text-[#6F625B]">{text}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Seção 10: Como isso mudou a solução */}
          <div className="mb-32">
            <h2 id="priorizacao" className="font-serif text-3xl font-bold text-[#241510] mb-4">Dividindo a entrega em frentes de valor</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-10">
              {[
                { title: 'Quick wins', Icon: CheckCircle, color: '#9E4322', bg: '#FAF9F6', items: ['Filtro por janelas de admissão', 'Visão centralizada de gargalos', 'Exportações completas', 'Configuração de SLA', 'Explicações contextuais das métricas'] },
                { title: 'Evoluções estruturais', Icon: AlertCircle, color: '#BF6A02', bg: '#FAF6F0', items: ['Ações em lote', 'Identificação do responsável', 'Alertas preventivos', 'Monitoramento automático de SLA', 'Integrações com ASO'] },
              ].map(col => (
                <div key={col.title} className="rounded-2xl p-5" style={{ background: col.bg }}>
                  <h4 className="flex items-center gap-2 font-serif font-bold text-[16px] mb-3" style={{ color: col.color }}>
                    <col.Icon size={16} /> {col.title}
                  </h4>
                  <ul className="space-y-2">
                    {col.items.map(item => (
                      <li key={item} className="flex gap-2 text-[14px] leading-snug text-[#4F4440]">
                        <span className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0" style={{ background: col.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <img
              src={onepageImg}
              alt="Material One Page estratégico"
            />
            {/* Legenda */}
            <p className="text-center text-sm text-[#6F625B] mt-4 font-medium">
              One Page apresentando os aprendizados do discovery
            </p>
          </div>

          {/* Seção 11: Preparando o Handoff */}
          <div className="mb-32">
            <h2 id="handoff" className="font-serif text-3xl font-bold text-[#241510] mb-4">Telas funcionais e cenários de estresse</h2>
            <p className="text-[#7D7169] leading-relaxed mb-6">
              Após validar o direcionamento estratégico, utilizei o Cursor integrado ao MCP do Figma e ao Storybook para construir telas próximas do produto real. Desenhei comportamentos em cenários extremos, como grandes volumes de dados, indisponibilidade e estados de erro.
            </p>

            {/* Bloco de Imagens do Handoff (Full Screen 100% / Fundo Preto) */}
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#151516] py-16 px-4 md:px-12 my-16 not-prose overflow-hidden rounded-2xl">
              <div className="max-w-8xl mx-auto space-y-6">
                {/* Card Superior Cursor */}
                <div className="max-w-5xl mx-auto overflow-hidden mb-8 transition-transform duration-500 hover:scale-[1.01]">
                  <div className="flex items-center justify-center py-10">
                    <img
                      src={logoCursorHandoff}
                      alt="Cursor Logo"
                      className="h-5 object-contain"
                    />
                  </div>

                  <img
                    src={principalHandoff}
                    alt="Cursor Handoff Interface Principal"
                    className="w-full h-auto rounded-lg shadow-2xl transition-all duration-300 hover:brightness-105"
                  />
                </div>

                {/* Grid Inferior */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 -mt-20 relative z-10">
                  <div className="relative group transition-all duration-300 hover:z-30 hover:-translate-y-4 hover:scale-[1.04] cursor-pointer">
                    <img src={dash18Handoff} alt="" className="w-full h-auto rounded-lg shadow-xl group-hover:shadow-2xl transition-all duration-300 border border-white/5" />
                  </div>

                  <div className="relative group transition-all duration-300 hover:z-30 hover:-translate-y-4 hover:scale-[1.04] cursor-pointer">
                    <img src={dash19Handoff} alt="" className="w-full h-auto rounded-lg shadow-xl group-hover:shadow-2xl transition-all duration-300 border border-white/5" />
                  </div>

                  <div className="relative group transition-all duration-300 hover:z-30 hover:-translate-y-4 hover:scale-[1.04] cursor-pointer">
                    <img src={dash20Handoff} alt="" className="w-full h-auto rounded-lg shadow-xl group-hover:shadow-2xl transition-all duration-300 border border-white/5" />
                  </div>
                </div>

                {/* Grid de 2 Cards: Cenários (Estresse) e Animações/Transições (Vídeo) */}
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[3fr_7fr] gap-6 pt-6">
                  {/* Card 1: Cenários */}
                  <div className="bg-[#232427] p-6 md:p-8 flex flex-col justify-between border border-white/5 rounded-2xl">
                    <div className="mb-6 overflow-hidden p-4 flex items-center justify-center min-h-[220px]">
                      <img
                        src={Estresse}
                        alt="Cenários de Estresse"
                        className="max-h-[220px] w-auto object-contain rounded-lg"
                      />
                    </div>
                    <div>
                      <h3 className="font-sans font-medium text-white text-base mb-2">Cenários</h3>
                      <p className="text-[#A1A1AA] text-sm leading-relaxed">
                        Mecânimos criado direto no cursor para estressar a quantidade de informações na página.
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Animações e Transições */}
                  <div className="bg-[#232427] p-6 md:p-8 flex flex-col justify-between border border-white/5 rounded-2xl">
                    <div className="mb-6 overflow-hidden rounded-md bg-[#18191B] flex items-center justify-center min-h-[220px]">
                      <video
                        src={dash22}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-auto max-h-[240px] object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <h3 className="font-sans font-medium text-white text-base mb-2">Animações e transições</h3>
                      <p className="text-[#A1A1AA] text-sm leading-relaxed">
                        Com o cursor conseguimos alem de implementar toda uma lib nova em minutos, foi possivel desenhar animações e transições nos gráficos e páginas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seção 12: O Papel da IA */}
          <div className="mb-32">
            <h2 id="papel-da-ia" className="font-serif text-3xl font-bold text-[#241510] mb-8">Três momentos cruciais onde a IA apoiou</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose">
              {[
                { step: 'Discovery', text: 'Consolidação de documentos e identificação de padrões.', logo: LogoLM },
                { step: 'Concepção', text: 'Prototipação rápida e exploração de alternativas.', logo: LogoGoogleIA },
                { step: 'Handoff', text: 'Interfaces construídas com componentes reais do Design System.', logo: logocursor },
              ].map(m => (
                <div key={m.step} className="rounded-2xl bg-[#2E211B] p-6 flex flex-col min-h-[200px] text-white">
                  <span className="text-[13px] font-semibold text-[#E8A27C]">{m.step}</span>
                  <p className="text-[17px] leading-snug mt-2">{m.text}</p>
                  <img src={m.logo} alt="" className="h-4 self-start mt-auto pt-6 box-content" />
                </div>
              ))}
            </div>
          </div>

          {/* Seção 13: Resultados */}
          <div className="mb-32">
            <h2 id="resultados" className="font-serif text-3xl font-bold text-[#241510] mb-4">Direcionamento estratégico validado</h2>
            <p className="text-[#7D7169] leading-relaxed mb-8">
              As melhorias seguiram para rollout antes de eu sair do projeto, e a evolução é acompanhada pelo time.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
              <div className="rounded-2xl border border-[#E2DCD4] p-6">
                <p className="text-[15px] leading-relaxed text-[#4F4440]">
                  <strong className="font-semibold text-[#241510]">Nova direção estratégica:</strong> sair de indicadores históricos para uma visão operacional validada com clientes.
                </p>
              </div>
              <div className="rounded-2xl border border-[#E2DCD4] p-6">
                <p className="text-[15px] leading-relaxed text-[#4F4440]">
                  <strong className="font-semibold text-[#241510]">Funcionalidades validadas:</strong> todos os novos gráficos e recursos foram aprovados pelos usuários antes do rollout.
                </p>
              </div>
            </div>
          </div>

          {/* Minha Atuação */}
          <div className="mb-32">
            <h2 id="minha-atuacao-simplificado" className="font-serif text-3xl font-bold text-[#241510] mb-4">Discovery, prototipação e handoff, ponta a ponta</h2>
            <p className="text-[#7D7169] leading-relaxed mb-8">
              Atuei como Product Designer do time de Analytics, conduzindo o projeto do Discovery ao handoff.
            </p>

            <AtuacaoInfo
              projectId="dashboard-admissao"
              methods={['Liderança do Discovery', 'Síntese de solicitações históricas', 'Definição de hipóteses', 'Protótipos rápidos (Google AI Studio)', 'Testes de usabilidade', 'Consolidação de insights (NotebookLM)', 'Handoff (Cursor + Figma + Storybook)']}
            />
          </div>
        </>
      ) : (
        <>
          <h2 id="contexto" className="text-2xl font-bold mb-4">Contexto</h2>
          <p className="mb-6 leading-relaxed">
            O Dashboard de Admissão já não acompanhava a evolução do restante da plataforma. Além da necessidade técnica de migrar para uma nova biblioteca de componentes, havia uma oportunidade de repensar completamente a experiência.
          </p>
          <p className="mb-8 leading-relaxed">
            Ao analisar anos de solicitações de clientes, feedbacks de Customer Success e demandas internas, percebemos que o maior problema não era a falta de gráficos, mas o desalinhamento entre o dashboard e a rotina operacional do RH.
          </p>

          <PlatformToday images={[dash01, dash02, dash03]} />

          <h2 id="o-desafio" className="text-2xl font-bold mb-4">O desafio</h2>
          <p className="mb-6 leading-relaxed">
            O objetivo não era reproduzir o Dashboard de Recrutamento & Seleção. Precisávamos entender:
          </p>
          <ul className="list-disc pl-5 mb-8 space-y-2">
            <li>quais informações realmente geravam valor;</li>
            <li>quais decisões o RH precisava tomar diariamente;</li>
            <li>como reduzir a navegação colaborador por colaborador;</li>
            <li>como transformar o dashboard in uma ferramenta de trabalho, e não apenas de consulta.</li>
          </ul>

          <h2 id="minha-atuacao" className="text-2xl font-bold mb-4">Minha atuação</h2>
          <p className="mb-6 leading-relaxed">Fui responsável por:</p>
          <ul className="list-disc pl-5 mb-8 space-y-2">
            <li>liderar o Discovery;</li>
            <li>sintetizar solicitações históricas junto ao PM;</li>
            <li>definir hipóteses;</li>
            <li>criar protótipos rápidos com Google AI Studio;</li>
            <li>conduzir testes de usabilidade;</li>
            <li>consolidar insights utilizando NotebookLM;</li>
            <li>transformar aprendizados em direcionamentos de produto;</li>
            <li>apoiar o handoff utilizando Cursor integrado ao Figma e Storybook.</li>
          </ul>

          <h2 id="discovery" className="text-2xl font-bold mb-4">Discovery</h2>
          <p className="mb-6 leading-relaxed">Consolidei informações provenientes de:</p>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>solicitações históricas de clientes;</li>
            <li>feedbacks de Customer Success;</li>
            <li>demandas do time de Produto;</li>
            <li>evolução do Dashboard de Recrutamento.</li>
          </ul>
          <p className="mb-6 leading-relaxed">
            Com apoio do NotebookLM, organizei centenas de registros, identifiquei padrões recorrentes e transformei informações dispersas em prioridades claras para o projeto.
          </p>
          <p className="mb-8 leading-relaxed">
            A análise mostrou que muitos pedidos já haviam sido resolvidos de forma manual em ferramentas paralelas, enquanto as necessidades realmente estratégicas permaneciam sem solução.
          </p>

          <div className="my-12">
            <Gallery items={discoveryGalleryItems} />
            <p className="text-center text-sm text-[#6F625B] mt-6 font-medium">Consolidação de solicitações históricas de clientes, cruzamento de dados de uso e mapeamento de dores operacionais.</p>
          </div>

          <h3 className="text-xl font-bold mb-4">Resultado da análise</h3>
          <p className="mb-6 leading-relaxed">
            Após toda a análises dos documentos e algumas sessões de conversas com os stakeholders chegamos à seguinte conclusão:
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-[#E9E4DB] shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold">✅</span>
                <h4 className="font-serif text-lg font-bold text-[#241510]">Já atendidos (via soluções pontuais em Superset/Metabase)</h4>
              </div>
              <p className="text-[#6F625B] text-sm mb-3">A maioria dos pedidos históricos foi resolvida caso a caso, sem uma solução escalável:</p>
              <ul className="list-disc pl-5 text-sm space-y-1 text-[#241510]">
                <li>Dados de admissão e etapas (entrada/saída, SLA por etapa) — Panvel, Piracanjuba, Sabesp, Ecolabs, Ero Brasil, Usina Santa Adélia.</li>
                <li>Volume de documentos (enviados, validados, reenviados, recusa) — validado via consulta paralela no Superset.</li>
                <li>Relatórios customizados — Ailos (planilha manual), Panvel (2x).</li>
                <li>PPCs inseridos manualmente, responsáveis por movimentação (produtividade do time), admissões por filial.</li>
                <li>Créditos consumidos e quantidade de admissões concluídas — via queries específicas.</li>
                <li>PPCs com documentos pendentes — automatizado via Airflow.</li>
              </ul>
              <p className="text-[#6F625B] text-xs mt-3 italic">
                <strong>Padrão importante:</strong> quase todos esses "atendidos" foram soluções manuais/pontuais no Superset, não algo nativo da plataforma — por isso a maioria aparece com a observação "poderíamos atender com gráficos e tabelas no Analisar Dados 2.0 + Self Service", ou seja, hoje são gambiarras que o produto deveria resolver nativamente.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E9E4DB] shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold">⚠️</span>
                <h4 className="font-serif text-lg font-bold text-[#241510]">Alguns ainda não atendidos ou pendentes</h4>
              </div>
              <ul className="list-disc pl-5 text-sm space-y-1 text-[#241510]">
                <li>Funil de candidatura + admissão (RTE Rodonaves) — não localizado nos registros.</li>
                <li>SLA de admissão no Dashboard Customizado — sem detalhes de empresa ou status.</li>
                <li>Nome da mãe do dependente no relatório — pedido parado sem retorno.</li>
                <li>% de documentos validados por IA vs manual (Iguá Saneamento) — tratado como melhoria de produto, não demanda de dados.</li>
                <li>Alguns erros técnicos/operacionais que não são responsabilidade do time de Data.</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E9E4DB] shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold">🔴</span>
                <h4 className="font-serif text-lg font-bold text-[#241510]">Pedidos recentes de clientes-chave (prioritários)</h4>
              </div>
              <p className="text-[#6F625B] text-sm mb-3">Esse é o bloco mais relevante — pedidos de clientes grandes que ainda não têm solução, mas foram mapeados como prioritários para o "novo Analisar Dados":</p>
              <ul className="list-disc pl-5 text-sm space-y-1 text-[#241510]">
                <li>Dashboard consolidado com status em tempo real dos candidatos, filtros por etapa (Imediato Nexway, WEG, Axia Energia).</li>
                <li>Funil completo cruzando R&S + Admissão digital (RTE Rodonaves, Central Ailos).</li>
                <li>Visibilidade de admissões não iniciadas (Fortbras).</li>
                <li>Tempo de movimentação entre etapas (cálculo de SLA nativo).</li>
                <li>Motivo de desistência dos candidatos "fora do processo".</li>
                <li>Qual documento demora mais para ser enviado.</li>
              </ul>
            </div>
          </div>

          <h2 id="prototipacao-acelerada-com-ia" className="text-2xl font-bold mb-4">Prototipação acelerada com IA</h2>
          <p className="mb-6 leading-relaxed">
            Em vez de produzir wireframes estáticos no Figma, utilizei o Google AI Studio para construir protótipos navegáveis, em média fidelidade, que evoluíam junto com as discussões.
          </p>
          <p className="mb-6 leading-relaxed">Essa abordagem permitiu:</p>
          <ul className="list-disc pl-5 mb-8 space-y-2">
            <li>explorar diferentes alternativas em minutos;</li>
            <li>validar hipóteses rapidamente;</li>
            <li>iterar durante workshops;</li>
            <li>testar estruturas antes da alta fidelidade.</li>
          </ul>
          <p className="mb-8 leading-relaxed">Isso reduziu significativamente o tempo entre hipótese e validação.</p>

          <div className="my-12">
            <Gallery items={prototipacaoGalleryItems} />
            <p className="text-center text-sm text-[#6F625B] mt-6 font-medium">Utilizamos o Google AI Studio para idear, criar diferentes versões do produto e gerar um protótipo funcional para os testes de usabilidade.</p>
          </div>

          <h2 id="validacao-com-clientes" className="text-2xl font-bold mb-4">Validação com clientes</h2>
          <p className="mb-6 leading-relaxed">Como os protótipo finalizados, utilizamos os mesmo para realiza testes com 6 clientes estratégicos.</p>
          <p className="mb-6 leading-relaxed">Os participantes exploravam:</p>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>novas categorias do dashboard;</li>
            <li>gráficos operacionais;</li>
            <li>Minhas Análises;</li>
            <li>Resumo Executivo;</li>
            <li>configurações gerais.</li>
          </ul>
          <p className="mb-8 leading-relaxed">
            As transcrições foram consolidadas no NotebookLM para identificar padrões qualitativos recorrentes.
          </p>

          <div className="my-12">
            <Gallery items={validacaoGalleryItems} />
            <p className="text-center text-sm text-[#6F625B] mt-6 font-medium">Registros qualitativos de testes de usabilidade e síntese sistemática de insights colhidos com clientes reais.</p>
          </div>

          <h2 id="principal-descoberta" className="text-2xl font-bold mb-4">Principal descoberta</h2>
          <p className="mb-6 leading-relaxed">O maior aprendizado foi simples, mas transformador.</p>
          <p className="mb-6 leading-relaxed font-bold">Os usuários não utilizavam o dashboard para entender o passado.</p>
          <p className="mb-6 leading-relaxed">Eles precisavam saber:</p>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>quais admissões corriam risco;</li>
            <li>quem estava parado;</li>
            <li>quais etapas exigiam atenção imediata.</li>
          </ul>
          <p className="mb-6 leading-relaxed">
            O RH organiza sua operação em janelas de contratação, com SLAs rígidos e necessidade constante de priorização.
          </p>
          <p className="mb-8 leading-relaxed">
            Essa descoberta redefiniu completamente a estratégia do produto. Passamos de um dashboard descritivo para uma experiência orientada por operação, risco e previsibilidade.
          </p>

          <div className="my-12">
            <Gallery items={altaFidelidadeGalleryItems} />
            <p className="text-center text-sm text-[#6F625B] mt-6 font-medium">Interface redesenhada de alta fidelidade: visão operacional focada no acompanhamento por janelas de contratação e detecção de riscos.</p>
          </div>

          <h2 id="principais-insights" className="text-2xl font-bold mb-4">Mais insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-[#9E4322] shadow-sm hover:bg-[#9E4322]/5 transition-all duration-300 flex flex-col">
              <span className="text-[#9E4322] font-mono text-xs tracking-wider uppercase block mb-2 font-bold">Insight 01</span>
              <h4 className="font-sans text-lg font-bold text-[#241510] mb-2">1. A operação acontece por janelas</h4>
              <p className="text-[#4F4440] text-sm leading-relaxed">
                A unidade de trabalho é o lote de admissões, não cada colaborador individualmente.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#9E4322] shadow-sm hover:bg-[#9E4322]/5 transition-all duration-300 flex flex-col">
              <span className="text-[#9E4322] font-mono text-xs tracking-wider uppercase block mb-2 font-bold">Insight 02</span>
              <h4 className="font-sans text-lg font-bold text-[#241510] mb-2">2. O problema não é o tempo médio</h4>
              <p className="text-[#4F4440] text-sm leading-relaxed">
                Os usuários querem identificar rapidamente quem está parado, há quanto tempo e por qual motivo.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#9E4322] shadow-sm hover:bg-[#9E4322]/5 transition-all duration-300 flex flex-col">
              <span className="text-[#9E4322] font-mono text-xs tracking-wider uppercase block mb-2 font-bold">Insight 03</span>
              <h4 className="font-sans text-lg font-bold text-[#241510] mb-2">3. A operação acontece fora da plataforma</h4>
              <p className="text-[#4F4440] text-sm leading-relaxed">
                Planilhas paralelas eram utilizadas para controlar prazos, acompanhar candidatos e preparar reuniões.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#9E4322] shadow-sm hover:bg-[#9E4322]/5 transition-all duration-300 flex flex-col">
              <span className="text-[#9E4322] font-mono text-xs tracking-wider uppercase block mb-2 font-bold">Insight 04</span>
              <h4 className="font-sans text-lg font-bold text-[#241510] mb-2">4. Gargalos estruturais</h4>
              <p className="text-[#4F4440] text-sm leading-relaxed">
                A etapa do ASO concentrava atrasos devido à ausência de integrações.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#9E4322] shadow-sm hover:bg-[#9E4322]/5 transition-all duration-300 flex flex-col md:col-span-2">
              <span className="text-[#9E4322] font-mono text-xs tracking-wider uppercase block mb-2 font-bold">Insight 05</span>
              <h4 className="font-sans text-lg font-bold text-[#241510] mb-2">5. Evolução do papel do dashboard</h4>
              <p className="text-[#4F4440] text-sm leading-relaxed">
                O produto deveria evoluir de análises históricas para diagnósticos e recomendações de ação.
              </p>
            </div>
          </div>

          <h2 id="como-mudou-solucao" className="text-2xl font-bold mb-4">Como isso mudou a solução</h2>
          <p className="mb-6 leading-relaxed">
            As entregas passaram a ser organizadas em duas frentes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-0">
              <h4 className="font-serif text-lg font-bold text-[#9E4322] mb-3">⚡ Quick Wins</h4>
              <ul className="list-disc pl-5 text-sm space-y-2 text-[#241510]">
                <li>filtro por janelas de admissão;</li>
                <li>visão centralizada de gargalos;</li>
                <li>exportações completas;</li>
                <li>acesso rápido ao WhatsApp;</li>
                <li>configuração de SLA;</li>
                <li>explicações contextuais das métricas.</li>
              </ul>
            </div>

            <div className="bg-white p-0">
              <h4 className="font-serif text-lg font-bold text-[#9E4322] mb-3">🚀 Evoluções estruturais</h4>
              <ul className="list-disc pl-5 text-sm space-y-2 text-[#241510]">
                <li>ações em lote;</li>
                <li>identificação do responsável;</li>
                <li>alertas preventivos;</li>
                <li>monitoramento automático de SLA;</li>
                <li>integrações com ASO.</li>
              </ul>
            </div>
          </div>

          <div className="my-12">
            <Gallery items={onePageGalleryItems} />
            <p className="text-center text-sm text-[#6F625B] mt-6 font-medium">One page criada no google ia studios, consolidando os feedbacks e o direcionamento estratégico do novo Dashboard.</p>
          </div>

          <h2 id="preparando-o-handoff" className="text-2xl font-bold mb-4">Preparando o handoff</h2>
          <p className="mb-6 leading-relaxed">
            Após validar a estratégia, utilizei o Cursor integrado ao MCP do Figma e ao Storybook para construir telas próximas da implementação real.
          </p>
          <p className="mb-6 leading-relaxed">Também simulei estados extremos, como:</p>
          <ul className="list-disc pl-5 mb-8 space-y-2">
            <li>grandes volumes de admissões;</li>
            <li>estados vazios;</li>
            <li>erros;</li>
            <li>indisponibilidade de dados.</li>
          </ul>
          <p className="mb-8 leading-relaxed">
            Isso permitiu entregar um handoff muito mais completo para engenharia.
          </p>

          <div className="my-12">
            <Gallery items={handoffGalleryItems} />
            <p className="text-center text-sm text-[#6F625B] mt-6 font-medium">Imagens geradas no Cursor, onde construímos as telas alinhadas ao Design System, incluindo testes de cenários de estresse para garantir a resiliência da interface no handoff.</p>
          </div>

          <div className="my-12">
            <div className="w-full overflow-hidden rounded-[2rem] border border-[#E2DCD4] bg-black">
              <video
                src={dash22}
                controls
                className="w-full max-h-[500px] object-contain mx-auto"
                preload="metadata"
                playsInline
              >
                Seu navegador não suporta a reprodução de vídeos.
              </video>
            </div>
            <p className="text-center text-sm text-[#6F625B] mt-6 font-medium">Com o Cursor, conseguimos desenhar animações e interações nas páginas de forma mais simples e tangível.</p>
          </div>

          <h2 id="o-papel-da-ia" className="text-2xl font-bold mb-4">O papel da IA</h2>
          <p className="mb-6 leading-relaxed">A IA apoiou diferentes etapas do projeto.</p>
          <ul className="list-disc pl-5 mb-8 space-y-2">
            <li><strong>Discovery:</strong> consolidação de documentos e identificação de padrões.</li>
            <li><strong>Concepção:</strong> prototipação rápida e exploração de alternativas.</li>
            <li><strong>Handoff:</strong> construção de interfaces próximas do produto utilizando componentes reais.</li>
          </ul>
          <p className="mb-8 leading-relaxed">
            Mais do que acelerar entregas, a IA aumentou nossa capacidade de explorar cenários, validar decisões e reduzir riscos.
          </p>

          <h2 id="resultados" className="text-2xl font-bold mb-4">Resultados</h2>
          <p className="mb-6 leading-relaxed">O projeto resultou em:</p>
          <ul className="list-disc pl-5 mb-8 space-y-2">
            <li>consolidação das principais necessidades dos clientes;</li>
            <li>definição de uma nova direção estratégica para o produto;</li>
            <li>validação da mudança de foco para uma visão operacional;</li>
            <li>validação de novos indicadores e funcionalidades com clientes;</li>
            <li>redução significativa do tempo de prototipação;</li>
            <li>handoff robusto para engenharia.</li>
          </ul>
          <p className="mb-8 leading-relaxed">
            Embora eu não tenha acompanhado o rollout final, a estratégia foi validada pelos principais stakeholders e serviu como base para a evolução do roadmap.
          </p>

          <h2 id="reflexao" className="text-2xl font-bold mb-4">Reflexão</h2>
          <p className="mb-6 leading-relaxed">O maior aprendizado não foi apenas redesenhar um dashboard.</p>
          <blockquote className="border-l-4 border-[#9E4322] pl-4 italic text-[#6F625B] mb-6 text-xl">
            Foi perceber que dashboards tradicionais continuam sendo importantes para análises históricas, enquanto informações operacionais fazem mais sentido quando integradas ao fluxo diário do produto.
          </blockquote>
          <p className="mb-8 leading-relaxed">
            Essa hipótese passou a orientar discussões estratégicas sobre a arquitetura da experiência e abriu caminho para futuras evoluções da plataforma.
          </p>
        </>
      )}
    </div>
  );
};

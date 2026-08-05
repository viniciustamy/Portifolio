import React, { useState } from 'react';
import {
  Building,
  UserCog,
  User,
  Sparkles,
  BookOpen,
  Pencil,
  LayoutGrid,
  GitFork,
  Paperclip,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Image,
  Flag,
  Bell,
  AlertTriangle,
  Check
} from 'lucide-react';
import performanceCycleLabeled from '../assets/images/Devolutiva/performance_cycle_labeled_1783032402492.jpg';
import contexto1 from '../assets/images/Devolutiva/Contexto-1.jpg';
import contexto2 from '../assets/images/Devolutiva/Contexto-2.jpg';
import contexto3 from '../assets/images/Devolutiva/Contexto-3.jpg';
import csdImg from '../assets/images/Devolutiva/CSD.png';
import benchImg from '../assets/images/Devolutiva/bench.png';
import fazNaoFazImg from '../assets/images/Devolutiva/faz nao faz.png';
import pesquisasImg from '../assets/images/Devolutiva/Pesquisas.png';
import mapaImg from '../assets/images/Devolutiva/Mapa.jpg';
import fluxoGestorImg from '../assets/images/Devolutiva/fluxo-gestor.png';
import fluxoColabImg from '../assets/images/Devolutiva/Fluxo-colab.png';
import fluxoRhImg from '../assets/images/Devolutiva/Fluxo-rh.png';
import wire1Img from '../assets/images/Devolutiva/wire-1.png';
import wire2Img from '../assets/images/Devolutiva/wire-2.png';
import planilhaErrosImg from '../assets/images/Devolutiva/planilha de erros.png';
import ia1Img from '../assets/images/Devolutiva/IA 1.png';
import ia2Img from '../assets/images/Devolutiva/IA 2.png';
import rh1Img from '../assets/images/Devolutiva/RH-1.png';
import gestor1Img from '../assets/images/Devolutiva/Gestor-1.png';
import colab1Img from '../assets/images/Devolutiva/Colab-1.png';
import { Carousel } from '../components/Carousel';
import { Gallery } from '../components/Gallery';
import { PlatformToday } from '../components/PlatformToday';
import dash01 from '../assets/images/Dash/Dash - 01.png';
import dash02 from '../assets/images/Dash/Dash - 02.png';
import dash03 from '../assets/images/Dash/Dash - 03.png';
import dash04 from '../assets/images/Dash/Dash-04.png';
import dash05 from '../assets/images/Dash/Dash-05.png';
import dash06 from '../assets/images/Dash/Dash-06.png';
import dash07 from '../assets/images/Dash/Dash-07.png';
import dash08 from '../assets/images/Dash/Dash-08.png';
import dash09 from '../assets/images/Dash/Dash-09.png';
import dash10 from '../assets/images/Dash/Dash-10.png';
import dash11 from '../assets/images/Dash/Dash-11.png';
import dash12 from '../assets/images/Dash/Dash-12.png';
import dash13 from '../assets/images/Dash/Dash-13.png';
import dash14 from '../assets/images/Dash/Dash-14.png';
import dash15 from '../assets/images/Dash/Dash-15.png';
import dash16 from '../assets/images/Dash/Dash-16.png';
import dash17 from '../assets/images/Dash/Dash-17.png';
import dash18 from '../assets/images/Dash/Dash-18.png';
import dash19 from '../assets/images/Dash/Dash-19.png';
import dash20 from '../assets/images/Dash/Dash-20.png';
import cursorCortada from '../assets/images/Cursor cortada.png';
import logoCursor from '../assets/images/Logos IA/Cursor.png';
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
import flutuante1Img from '../assets/images/Imagem recorte/Flutuante 1.png';
import dash21 from '../assets/images/Dash/Dash-21.png';
import dash22 from '../assets/images/Dash/Dash-22.mov';
import dash23 from '../assets/images/Dash/Dash-23.png';
import dash24 from '../assets/images/Dash/Dash-24.png';
import k01 from '../assets/images/KBA/Completa/k-01.png';
import k02 from '../assets/images/KBA/Completa/k-02.png';
import k03 from '../assets/images/KBA/Completa/k-03.png';
import k04 from '../assets/images/KBA/Completa/k-04.png';
import k05 from '../assets/images/KBA/Completa/k-05.png';
import k06 from '../assets/images/KBA/Completa/k-06.png';
import k07 from '../assets/images/KBA/Completa/k-07.png';
import k08 from '../assets/images/KBA/Completa/k-08.jpg';
import k09 from '../assets/images/KBA/Completa/k-09.png';
import k10 from '../assets/images/KBA/Completa/k-10.png';
import k11 from '../assets/images/KBA/Completa/k-11.png';
import k12 from '../assets/images/KBA/Completa/k-12.png';
import k13 from '../assets/images/KBA/Completa/k-13.png';
import k14 from '../assets/images/KBA/Completa/k-14.png';
import LogoLM from '../assets/images/logoLM.png';
import LogoGoogleIA from '../assets/images/google ia.png';
import logocursor from '../assets/images/logocursor.png';
import thumbDashboard from '../assets/images/Thumbs/Thumb Dashboard.png';
import thumbDevolutiva from '../assets/images/Thumbs/Thumb Devolutiva.png';
import thumbKba from '../assets/images/Thumbs/Thumb KBA.png';
import thumbAdmin from '../assets/images/Thumbs/Thumb Admin.png';
import capaDashboard from '../assets/images/Capas/Capa Dashboard.png';
import capaDevolutiva from '../assets/images/Capas/Capa Devolutiva.png';
import capaKba from '../assets/images/Capas/Capa KBA.png';
import capaAdmin from '../assets/images/Capas/Capa Admin.png';

const ImagePlaceholder = ({ label = 'Espaço para Imagem' }: { label?: string }) => (
  <div className="w-full aspect-[16/9] bg-[#EBE7DD] rounded-[2rem] flex items-center justify-center my-12 border border-[#DCD7CA]">
    <span className="text-[#787265] font-medium tracking-widest uppercase text-sm">{label}</span>
  </div>
);

const VisualImageWrapper = ({ src, alt, caption }: { src: string; alt: string; caption?: string }) => (
  <div className="my-10 overflow-hidden rounded-2xl border border-[#DCD7CA] bg-[#F9F8F6] p-2 transition-all duration-300 hover:hover:border-[#006266]/30">
    <img src={src} alt={alt} className="w-full h-auto rounded-xl object-contain cursor-zoom-in" />
    {caption && (
      <p className="text-center text-xs text-[#787265] mt-3 font-sans font-medium tracking-wide uppercase">
        {caption}
      </p>
    )}
  </div>
);

const VisualPlaceholder = ({ label }: { label: string }) => (
  <div className="w-full aspect-[16/7] bg-[#F4F2EB] rounded-[1.5rem] flex flex-col items-center justify-center p-6 border border-dashed border-[#DCD7CA] my-10 relative overflow-hidden group hover:border-[#006266]/30 transition-all duration-300">
    <div className="absolute inset-0 bg-[radial-gradient(#DCD7CA_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#787265] mb-3 border border-[#EBE7DD]">
        <Image size={20} />
      </div>
      <span className="text-[#787265] font-sans font-bold text-[11px] tracking-widest uppercase">{label}</span>
    </div>
  </div>
);

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

const kbaContextGallery1 = [
  { src: k01, title: 'Contexto', description: 'Oportunidade e impacto de negócio gerado pelo processo de recuperação', fullWidth: true }
];

const kbaContextGallery2 = [
  { src: k02, title: 'Processo', description: 'Problemas enfrentados ao recuperar o acesso com os antigos fluxos', fullWidth: true }
];

const kbaDiscoveryGallery = [
  { src: k03, title: 'Fluxo anterior', description: 'Mapeamento do fluxo anterior de autenticação' },
  { src: k04, title: 'Análise quantitativa', description: 'Métricas de engajamento das jornadas' },
  { src: k05, title: 'Comportamento do usuário', description: 'Identificação de problemas de usabilidade na recuperação' },
  { src: k06, title: 'Login Social', description: 'Uso de Login Social e fluxos de criação de conta' },
  { src: k07, title: 'Falhas e inconsistências', description: 'Visão das mensagens de erro e inconsistências' }
];

const kbaEstrategiaGallery = [
  { src: k08, title: 'Estudo das opções de KBA', description: 'Análise sobre a arquitetura e fluxos de segurança do KBA', fullWidth: true }
];

const kbaPrototiposGallery = [
  { src: k09, title: 'Prototipação via IA', description: 'Fluxos iniciais criados e validados no Figma Make' },
  { src: k10, title: 'Testes de mesa', description: 'Discussão de fluxos com Stakeholders e Engenharia' },
  { src: k11, title: 'Refinamento', description: 'Evolução da fidelidade usando Design System' },
  { src: k12, title: 'Edge Cases e Limites', description: 'Mapeamento de cenários críticos e limites de tentativas' },
  { src: k13, title: 'Especificações', description: 'Regras de segurança, erros e recuperações malsucedidas' }
];

const kbaEntregaGallery = [
  { src: k14, title: 'Entrega Final e Handoff', description: 'Documentação completa com estados e mapeamentos para Analytics', fullWidth: true }
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
        <div className="bg-[#EBE7DD]/60 p-1.5 rounded-full flex gap-1 border border-[#DCD7CA]">
          <button
            onClick={() => setViewMode('simplificado')}
            className={`px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${viewMode === 'simplificado'
              ? 'bg-[#006266] text-white '
              : 'text-[#787265] hover:text-[#2C3539]'
              }`}
          >
            <Sparkles size={16} />
            Simplificado
          </button>
          <button
            onClick={() => setViewMode('relatorio')}
            className={`px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${viewMode === 'relatorio'
              ? 'bg-[#006266] text-white '
              : 'text-[#787265] hover:text-[#2C3539]'
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
            <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-2">Contexto</span>
            <h2 id="contexto" className="font-serif text-3xl font-bold text-[#2C3539] mb-4">Um dashboard defasado</h2>
            <p className="text-[#4A5559] leading-relaxed mb-6">
              Além da necessidade técnica de migrar para uma nova biblioteca de componentes, havia a oportunidade de repensar a experiência inteira. Analisando anos de solicitações de clientes, feedbacks de Customer Success e demandas internas, o problema real não era falta de gráficos: era o desalinhamento entre o dashboard e a rotina operacional do RH.
            </p>

            <img
              src={contextoImg}
              alt="Print do Dashboard anterior defasado"
            />
            {/* Legenda */}
            <p className="text-center text-sm text-[#787265] mt-4 font-medium">
              Print do Dashboard anterior defasado
            </p>
          </div>

          {/* Seção 3: O Desafio */}
          <div className="mb-32">
            <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-2">O desafio</span>
            <h2 id="desafio" className="font-serif text-3xl font-bold text-[#2C3539] mb-4">Não era sobre replicar o que foi feito em R&S</h2>
            <p className="text-[#4A5559] leading-relaxed mb-8">
              Antes de investigar qualquer solução, precisávamos garantir que Produto, Design e Tecnologia partissem do mesmo entendimento do problema.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose mb-8">
              <div className="bg-[#FAF9F6] border-l-2 border-[#006266] border-y-0 border-r-0 p-6 flex flex-col hover:bg-[#FAF9F6]/80 transition-all duration-300">
                <h4 className="font-sans font-bold text-[#2C3539] text-base mb-2">Sobre o que já temos?</h4>
                <p className="text-sm text-[#787265] leading-relaxed">
                  Quais informações realmente geravam valor.
                </p>
              </div>
              <div className="bg-[#FAF9F6] border-l-2 border-[#006266] border-y-0 border-r-0 p-6 flex flex-col hover:bg-[#FAF9F6]/80 transition-all duration-300">
                <h4 className="font-sans font-bold text-[#2C3539] text-base mb-2">O que precisa ter?</h4>
                <p className="text-sm text-[#787265] leading-relaxed">
                  Quais decisões o DP precisava tomar diariamente.
                </p>
              </div>
              <div className="bg-[#FAF9F6] border-l-2 border-[#006266] border-y-0 border-r-0 p-6 flex flex-col hover:bg-[#FAF9F6]/80 transition-all duration-300">
                <h4 className="font-sans font-bold text-[#2C3539] text-base mb-2">Contexto admissão</h4>
                <p className="text-sm text-[#787265] leading-relaxed">
                  Como virar ferramenta de trabalho, não só de consulta.
                </p>
              </div>
            </div>
          </div>

          {/* Seção 4: Discovery */}
          <div className="mb-32">
            <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-2">Discovery</span>
            <h2 id="discovery" className="font-serif text-3xl font-bold text-[#2C3539] mb-4">Centenas de registros, uma direção clara</h2>
            <p className="text-[#4A5559] leading-relaxed mb-6">
              Consolidei solicitações históricas de clientes, feedbacks de Customer Success, demandas do time de Produto e a evolução do Dashboard de Recrutamento. Com apoio do NotebookLM, organizei esse volume, identifiquei padrões recorrentes e transformei informação dispersa em prioridade.
            </p>

            <img
              src={discoveryImg}
              alt="Planilha com solicitações de clientes consolidadas e NotebookLM"
            />
            {/* Legenda */}
            <p className="text-center text-sm text-[#787265] mt-4 font-medium">
              Planilha com solicitações de clientes consolidadas
            </p>

            <p className="text-[#4A5559] leading-relaxed mt-6">
              A análise mostrou algo importante: muitos pedidos já tinham sido resolvidos manualmente em ferramentas paralelas, enquanto as necessidades realmente estratégicas seguiam sem solução.
            </p>
          </div>

          {/* Seção 5: Resultado da Análise */}
          <div className="mb-32">
            <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-2">Resultado da análise</span>
            <h2 id="analise" className="font-serif text-3xl font-bold text-[#2C3539] mb-4">Três níveis de urgência, um padrão em comum</h2>
            <p className="text-[#4A5559] leading-relaxed mb-8">
              O produto de Performance já cobria a configuração de ciclos, as avaliações e os comitês de calibração. A jornada era interrompida bem antes da etapa mais importante: a conversa entre gestor e colaborador sobre os resultados.
            </p>

            <div className="space-y-4 not-prose">
              {/* Verde: 6 frentes */}
              <div className="border-l-3 border-[#006266] transition-all duration-300 overflow-hidden hover:bg-[#FAF9F6]">
                <div
                  onClick={() => setShowGreenDetails(!showGreenDetails)}
                  className="flex items-center justify-between p-6 cursor-pointer hover:bg-[#006266]/5 transition-all duration-300"
                >
                  <div className="flex items-center gap-6">
                    <div className="text-[#006266] shrink-0">
                      <Check size={28} className="stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-[#2C3539] text-base mb-1">6 frentes já atendidos, via soluções pontuais</h4>
                      <p className="text-sm text-[#787265] leading-relaxed">Superset / Metabase, caso a caso, sem solução escalável</p>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-[#006266] hover:text-[#004d4f] transition-colors uppercase tracking-wider whitespace-nowrap ml-6">
                    {showGreenDetails ? '- Ocultar itens' : '+ Ver mais itens'}
                  </div>
                </div>

                {showGreenDetails && (
                  <div className="px-6 pb-6 pl-20 animate-in fade-in duration-300">
                    <div className="pt-4 border-t border-[#EBE7DD]">
                      <ul className="list-disc pl-5 text-sm space-y-2 text-[#4A5559]">
                        <li>Dados de admissão e etapas (entrada/saída, SLA por etapa) — Panvel, Piracanjuba, Sabesp, Ecolabs, Ero Brasil, Usina Santa Adélia.</li>
                        <li>Volume de documentos (enviados, validados, reenviados, recusa) — validado via consulta paralela no Superset.</li>
                        <li>Relatórios customizados — Ailos (planilha manual), Panvel (2x).</li>
                        <li>PPCs inseridos manualmente, responsáveis por movimentação (produtividade do time), admissões por filial.</li>
                        <li>Créditos consumidos e quantidade de admissões concluídas — via queries específicas.</li>
                        <li>PPCs com documentos pendentes — automatizado via Airflow.</li>
                      </ul>
                      <p className="text-[#787265] text-xs mt-3 italic">
                        <strong>Padrão importante:</strong> quase todos esses "atendidos" foram soluções manuais/pontuais no Superset, não algo nativo da plataforma — ou seja, hoje são gambiarras que o produto deveria resolver nativamente.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Amarelo: Alguns ainda não atendidos */}
              <div className="border-l-3 border-[#BF6A02] transition-all duration-300 overflow-hidden hover:bg-[#FAF9F6]">
                <div
                  onClick={() => setShowYellowDetails(!showYellowDetails)}
                  className="flex items-center justify-between p-6 cursor-pointer hover:bg-[#BF6A02]/5 transition-all duration-300"
                >
                  <div className="flex items-center gap-6">
                    <div className="text-[#BF6A02] shrink-0">
                      <Bell size={28} className="stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-[#2C3539] text-base mb-1">Alguns ainda não atendidos ou pendentes</h4>
                      <p className="text-sm text-[#787265] leading-relaxed">Mapeados mas necessitam de uma análises maior.</p>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-[#006266] hover:text-[#004d4f] transition-colors uppercase tracking-wider whitespace-nowrap ml-6">
                    {showYellowDetails ? '- Ocultar itens' : '+ Ver mais itens'}
                  </div>
                </div>

                {showYellowDetails && (
                  <div className="px-6 pb-6 pl-20 animate-in fade-in duration-300">
                    <div className="pt-4 border-t border-[#EBE7DD]">
                      <ul className="list-disc pl-5 text-sm space-y-2 text-[#4A5559]">
                        <li>Funil de candidatura + admissão (RTE Rodonaves) — não localizado nos registros.</li>
                        <li>SLA de admissão no Dashboard Customizado — sem detalhes de empresa ou status.</li>
                        <li>Nome da mãe do dependente no relatório — pedido parado sem retorno.</li>
                        <li>% de documentos validados por IA vs manual (Iguá Saneamento) — tratado como melhoria de produto, não demanda de dados.</li>
                        <li>Alguns erros técnicos/operacionais que não são responsabilidade do time de Data.</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Vermelho: Pedidos recentes */}
              <div className="border-l-3 border-[#C00F0C] transition-all duration-300 overflow-hidden hover:bg-[#FAF9F6]">
                <div
                  onClick={() => setShowRedDetails(!showRedDetails)}
                  className="flex items-center justify-between p-6 cursor-pointer hover:bg-[#C00F0C]/5 transition-all duration-300"
                >
                  <div className="flex items-center gap-6">
                    <div className="text-[#C00F0C] shrink-0">
                      <AlertTriangle size={28} className="stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-[#2C3539] text-base mb-1">Pedidos recentes de clientes-chave</h4>
                      <p className="text-sm text-[#787265] leading-relaxed">Mapeados como prioritários para o novo Analisar Dados</p>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-[#006266] hover:text-[#004d4f] transition-colors uppercase tracking-wider whitespace-nowrap ml-6">
                    {showRedDetails ? '- Ocultar itens' : '+ Ver mais itens'}
                  </div>
                </div>

                {showRedDetails && (
                  <div className="px-6 pb-6 pl-20 animate-in fade-in duration-300">
                    <div className="pt-4 border-t border-[#EBE7DD]">
                      <ul className="list-disc pl-5 text-sm space-y-2 text-[#4A5559]">
                        <li>Dashboard consolidado com status em tempo real dos candidatos, filtros por etapa (Imediato Nexway, WEG, Axia Energia).</li>
                        <li>Funil completo cruzando R&S + Admissão digital (RTE Rodonaves, Central Ailos).</li>
                        <li>Visibilidade de admissões não iniciadas (Fortbras).</li>
                        <li>Tempo de movimentação entre etapas (cálculo de SLA nativo).</li>
                        <li>Motivo de desistência dos candidatos "fora do processo".</li>
                        <li>Qual documento demora mais para ser enviado.</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Seção 6: Prototipação com IA */}
          <div className="mb-32">
            <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-2">Prototipação com IA</span>
            <h2 id="prototipacao" className="font-serif text-3xl font-bold text-[#2C3539] mb-4">Explorando ideias em média fidelidade</h2>
            <p className="text-[#4A5559] leading-relaxed mb-6">
              Em vez de wireframes estáticos no Figma, usei o Google AI Studio para construir protótipos navegáveis de média fidelidade que evoluíam junto com as discussões, reduzindo o tempo entre hipótese e validação.
            </p>

            <img
              src={prototipoImg}
              alt="Protótipo em média fidelidade no Google AI Studio"
            />
            {/* Legenda */}
            <p className="text-center text-sm text-[#787265] mt-4 font-medium">
              Protótipo em média fidelidade no Google AI Studio
            </p>
          </div>

          {/* Seção 7: Validação */}
          <div className="mb-32">
            <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-2">VALIDAÇÃO COM CLIENTES</span>
            <h2 id="validacao" className="font-serif text-3xl md:text-4xl font-bold text-[#2C3539] mb-6">Testando com quem enfrenta o problema todo dia</h2>

            <p className="text-[#4A5559] text-base leading-relaxed mb-4">
              <strong className="font-bold text-[#2C3539]">6 clientes estratégicos</strong> testaram novas categorias, gráficos operacionais, Minhas Análises, Resumo Executivo e configurações gerais.
            </p>

            <p className="text-[#4A5559] text-base leading-relaxed mb-10">
              As transcrições foram consolidadas no NotebookLM para identificar padrões qualitativos recorrentes entre as sessões.
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
                    className="w-[360px] md:w-[440px] shrink-0 rounded-2xl overflow-hidden border border-[#DCD7CA] bg-[#151516] shadow-md transition-transform duration-300 hover:scale-[1.02] flex flex-col justify-between"
                  >
                    <img
                      src={item.src}
                      alt={`Entrevista ${idx + 1}`}
                      className="w-full h-auto object-cover rounded-t-2xl"
                    />
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-[#787265] mt-6 font-sans font-medium tracking-wide">
                Registros em vídeo das sessões individuais de testes de usabilidade e prototipação conduzidas com clientes reais.
              </p>
            </div>
          </div>

          {/* Seção 8: Principal Descoberta */}
          <div className="mb-32">
            <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-2">Principal descoberta</span>
            <h2 id="descoberta-risco" className="font-serif text-3xl font-bold text-[#2C3539] mb-4">O foco não é o passado, é o risco em tempo real</h2>
            <p className="text-[#4A5559] leading-relaxed mb-6">
              Os usuários não usavam o dashboard para entender o passado. Eles precisavam saber quais admissões corriam risco, quem estava parado e quais etapas exigiam atenção imediata.
            </p>

            {/* Componente Visual Recriado */}
            <div className="w-full overflow-visible my-10 not-prose flex flex-col md:flex-row relative">
              {/* Coluna 1: ANTES */}
              <div className="w-full md:w-1/2 bg-[#E2DDD5] p-14 flex flex-col justify-between relative">
                <div>
                  <span className="text-[#787265] font-sans font-bold text-xs uppercase tracking-wider block mb-4">Antes</span>
                  <h3 className="font-serif text-3xl font-bold text-[#2C3539] mb-6">Dashboard descritivo</h3>
                  <ul className="space-y-3 text-sm text-[#4A5559] list-disc pl-5">
                    <li>Responde "o que já aconteceu"</li>
                    <li>Indicadores históricos e acumulados</li>
                    <li>Navegação colaborador por colaborador</li>
                  </ul>
                </div>

                <div className="mt-12 flex flex-col items-center">
                  {/* Bar Chart Mock */}
                  <div className="flex items-end gap-3 h-28 mb-4">
                    <div className="w-10 bg-[#9B958B] rounded-sm" style={{ height: '55px' }}></div>
                    <div className="w-10 bg-[#9B958B] rounded-sm" style={{ height: '90px' }}></div>
                    <div className="w-10 bg-[#9B958B] rounded-sm" style={{ height: '65px' }}></div>
                    <div className="w-10 bg-[#9B958B] rounded-sm" style={{ height: '55px' }}></div>
                    <div className="w-10 bg-[#9B958B] rounded-sm" style={{ height: '95px' }}></div>
                  </div>
                  <p className="text-sm italic text-[#787265] mb-2 font-medium">
                    Gráficos que olham para <strong className="font-bold text-[#4A5559]">trás</strong>
                  </p>
                  <div className="text-[#C07830] text-4xl font-bold">
                    ←
                  </div>
                </div>

                {/* Seta/Indicador Visual entre Colunas */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[20px] w-0 h-0 border-t-[26px] border-t-transparent border-b-[26px] border-b-transparent border-l-[26px] border-l-[#E2DDD5] z-20 hidden md:block"></div>
              </div>

              {/* Coluna 2: DEPOIS */}
              <div className="w-full md:w-1/2 bg-[#F9F8F6] p-14 flex flex-col justify-between">
                <div>
                  <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-wider block mb-4">Depois</span>
                  <h3 className="font-serif text-3xl font-bold text-[#2C3539] mb-6">Visão Operacional</h3>
                  <ul className="space-y-3 text-sm text-[#4A5559] list-disc pl-5">
                    <li>Responde "o que precisa de ação agora"</li>
                    <li>Risco, previsibilidade e janelas de contratação</li>
                    <li>Foco em quem está parado e por quê</li>
                  </ul>
                </div>

                <div className="mt-12 flex flex-col items-center">
                  {/* Timeline/Horizontal Lanes Mock */}
                  <div className="w-full max-w-[240px] h-28 flex flex-col justify-center gap-2 mb-4">
                    <div className="w-[75%] h-3.5 bg-[#C0BEB8] rounded-full"></div>
                    <div className="w-[45%] h-3.5 bg-[#C0BEB8] rounded-full ml-[15%]"></div>
                    <div className="w-[55%] h-3.5 bg-[#C0BEB8] rounded-full ml-[30%]"></div>
                    <div className="w-[25%] h-3.5 bg-[#C0BEB8] rounded-full ml-[68%]"></div>
                    <div className="w-[45%] h-3.5 bg-[#006266] rounded-full ml-[55%]"></div>
                  </div>
                  <p className="text-sm italic text-[#787265] mb-2 font-medium">
                    Gráficos que olham para <strong className="font-bold text-[#006266]">Frente</strong>
                  </p>
                  <div className="text-[#006266] text-4xl font-bold">
                    →
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seção 9: Mais Insights */}
          <div className="mb-32">
            <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-2">Mais insights</span>
            <h2 id="insights" className="font-serif text-3xl font-bold text-[#2C3539] mb-8">Cinco aprendizados sobre a rotina do DP</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 not-prose">
              <div className="bg-[#FAF9F6] border-l-2 border-[#006266] border-y-0 border-r-0 p-8 flex flex-col hover:bg-[#FAF9F6]/80 transition-all duration-300">
                <span className="text-[#006266] font-mono text-xs uppercase font-bold tracking-widest mb-2 block">Insight 01</span>
                <h4 className="font-sans font-bold text-[#2C3539] text-base mb-1">A operação acontece por janelas</h4>
                <p className="text-xs text-[#787265] leading-relaxed">
                  A unidade de trabalho é o lote de admissões, não cada colaborador individualmente.
                </p>
              </div>
              <div className="bg-[#FAF9F6] border-l-2 border-[#006266] border-y-0 border-r-0 p-8 flex flex-col hover:bg-[#FAF9F6]/80 transition-all duration-300">
                <span className="text-[#006266] font-mono text-xs uppercase font-bold tracking-widest mb-2 block">Insight 02</span>
                <h4 className="font-sans font-bold text-[#2C3539] text-base mb-1">O problema não é o tempo médio</h4>
                <p className="text-xs text-[#787265] leading-relaxed">
                  Os usuários querem identificar rapidamente quem está parado, há quanto tempo e por qual motivo.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose">
              <div className="bg-[#FAF9F6] border-l-2 border-[#006266] border-y-0 border-r-0 p-8 flex flex-col hover:bg-[#FAF9F6]/80 transition-all duration-300">
                <span className="text-[#006266] font-mono text-xs uppercase font-bold tracking-widest mb-2 block">Insight 03</span>
                <h4 className="font-sans font-bold text-[#2C3539] text-base mb-1">Operação fora do produto</h4>
                <p className="text-xs text-[#787265] leading-relaxed">
                  Planilhas paralelas eram utilizadas para controlar prazos e preparar reuniões de acompanhamento.
                </p>
              </div>
              <div className="bg-[#FAF9F6] border-l-2 border-[#006266] border-y-0 border-r-0 p-8 flex flex-col hover:bg-[#FAF9F6]/80 transition-all duration-300">
                <span className="text-[#006266] font-mono text-xs uppercase font-bold tracking-widest mb-2 block">Insight 04</span>
                <h4 className="font-sans font-bold text-[#2C3539] text-base mb-1">Gargalos estruturais</h4>
                <p className="text-xs text-[#787265] leading-relaxed">
                  A etapa do ASO (Atestado de Saúde Ocupacional) concentrava a maior parte dos atrasos do processo.
                </p>
              </div>
              <div className="bg-[#FAF9F6] border-l-2 border-[#006266] border-y-0 border-r-0 p-8 flex flex-col hover:bg-[#FAF9F6]/80 transition-all duration-300">
                <span className="text-[#006266] font-mono text-xs uppercase font-bold tracking-widest mb-2 block">Insight 05</span>
                <h4 className="font-sans font-bold text-[#2C3539] text-base mb-1">Papel do dashboard</h4>
                <p className="text-xs text-[#787265] leading-relaxed">
                  O produto deveria evoluir de análises históricas retrospectivas para diagnósticos de ação e recomendações.
                </p>
              </div>
            </div>
          </div>

          {/* Seção 10: Como isso mudou a solução */}
          <div className="mb-32">
            <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-2">Priorização</span>
            <h2 id="priorizacao" className="font-serif text-3xl font-bold text-[#2C3539] mb-4">Dividindo a entrega em frentes de valor</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose mb-12">
              {/* Quick Wins Column */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <CheckCircle size={22} className="text-[#006266] stroke-[2.5] shrink-0" />
                  <h4 className="font-serif font-bold text-[#006266] text-xl">Quick wins</h4>
                </div>

                <div className="space-y-3">
                  <div className="border-l-3 border-[#006266] bg-[#FAF9F6] p-5 rounded-r-lg hover:bg-[#FAF9F6]/80 transition-all duration-300">
                    <p className="text-sm font-sans font-semibold text-[#2C3539]">Filtro por janelas de admissão</p>
                  </div>
                  <div className="border-l-3 border-[#006266] bg-[#FAF9F6] p-5 rounded-r-lg hover:bg-[#FAF9F6]/80 transition-all duration-300">
                    <p className="text-sm font-sans font-semibold text-[#2C3539]">Visão centralizada de gargalos</p>
                  </div>
                  <div className="border-l-3 border-[#006266] bg-[#FAF9F6] p-5 rounded-r-lg hover:bg-[#FAF9F6]/80 transition-all duration-300">
                    <p className="text-sm font-sans font-semibold text-[#2C3539]">Exportações completas</p>
                  </div>
                  <div className="border-l-3 border-[#006266] bg-[#FAF9F6] p-5 rounded-r-lg hover:bg-[#FAF9F6]/80 transition-all duration-300">
                    <p className="text-sm font-sans font-semibold text-[#2C3539]">Configuração de SLA</p>
                  </div>
                  <div className="border-l-3 border-[#006266] bg-[#FAF9F6] p-5 rounded-r-lg hover:bg-[#FAF9F6]/80 transition-all duration-300">
                    <p className="text-sm font-sans font-semibold text-[#2C3539]">Explicações contextuais das métricas</p>
                  </div>
                </div>
              </div>

              {/* Evoluções Estruturais Column */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <AlertCircle size={22} className="text-[#BF6A02] stroke-[2.5] shrink-0" />
                  <h4 className="font-serif font-bold text-[#BF6A02] text-xl">Evoluções estruturais</h4>
                </div>

                <div className="space-y-3">
                  <div className="border-l-3 border-[#BF6A02] bg-[#FAF9F6] p-5 rounded-r-lg hover:bg-[#FAF9F6]/80 transition-all duration-300">
                    <p className="text-sm font-sans font-semibold text-[#2C3539]">Ações em lote</p>
                  </div>
                  <div className="border-l-3 border-[#BF6A02] bg-[#FAF9F6] p-5 rounded-r-lg hover:bg-[#FAF9F6]/80 transition-all duration-300">
                    <p className="text-sm font-sans font-semibold text-[#2C3539]">Identificação do responsável</p>
                  </div>
                  <div className="border-l-3 border-[#BF6A02] bg-[#FAF9F6] p-5 rounded-r-lg hover:bg-[#FAF9F6]/80 transition-all duration-300">
                    <p className="text-sm font-sans font-semibold text-[#2C3539]">Alertas preventivos</p>
                  </div>
                  <div className="border-l-3 border-[#BF6A02] bg-[#FAF9F6] p-5 rounded-r-lg hover:bg-[#FAF9F6]/80 transition-all duration-300">
                    <p className="text-sm font-sans font-semibold text-[#2C3539]">Monitoramento automático de SLA</p>
                  </div>
                  <div className="border-l-3 border-[#BF6A02] bg-[#FAF9F6] p-5 rounded-r-lg hover:bg-[#FAF9F6]/80 transition-all duration-300">
                    <p className="text-sm font-sans font-semibold text-[#2C3539]">Integrações com ASO</p>
                  </div>
                </div>
              </div>
            </div>

            <img
              src={onepageImg}
              alt="Material One Page estratégico"
            />
            {/* Legenda */}
            <p className="text-center text-sm text-[#787265] mt-4 font-medium">
              One Page apresentando os aprendizados do discovery
            </p>
          </div>

          {/* Seção 11: Preparando o Handoff */}
          <div className="mb-32">
            <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-2">Handoff</span>
            <h2 id="handoff" className="font-serif text-3xl font-bold text-[#2C3539] mb-4">Telas funcionais e cenários de estresse</h2>
            <p className="text-[#4A5559] leading-relaxed mb-6">
              Após validar o direcionamento estratégico, utilizei o Cursor integrado ao MCP do Figma e ao Storybook para construir telas próximas do produto real. Desenhei comportamentos em cenários extremos, como grandes volumes de dados, indisponibilidade e estados de erro.
            </p>

            {/* Bloco de Imagens do Handoff (Full Screen 100% / Fundo Preto) */}
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#151516] py-16 px-4 md:px-12 my-16 not-prose overflow-hidden">
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
                  <div className="bg-[#232427] p-6 md:p-8 flex flex-col justify-between border border-white/5 rounded-md">
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
                  <div className="bg-[#232427] p-6 md:p-8 flex flex-col justify-between border border-white/5 rounded-md">
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
            <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-2">O papel da IA</span>
            <h2 id="papel-da-ia" className="font-serif text-3xl font-bold text-[#2C3539] mb-8">Três momentos cruciais onde a IA apoiou.</h2>

            <div className="bg-[#1D5E65] p-8 md:p-12 text-white not-prose shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                {/* Coluna 1: Discovery */}
                <div className="border-l border-[#8BB1B6]/60 pl-6 flex flex-col justify-between min-h-[200px]">
                  <div>
                    <span className="text-[#B5D3D7] font-sans font-semibold text-xs uppercase tracking-wider block mb-3">DISCOVERY</span>
                    <h3 className="font-sans font-normal text-white text-lg md:text-xl leading-snug">
                      Consolidação de documentos e identificação de padrões.
                    </h3>
                  </div>
                  <div className="mt-auto flex items-center">
                    <img src={LogoLM} className="h-4" />
                  </div>
                </div>

                {/* Coluna 2: Concepção */}
                <div className="border-l border-[#8BB1B6]/60 pl-6 flex flex-col justify-between min-h-[200px]">
                  <div>
                    <span className="text-[#B5D3D7] font-sans font-semibold text-xs uppercase tracking-wider block mb-3">CONCEPÇÃO</span>
                    <h3 className="font-sans font-normal text-white text-lg md:text-xl leading-snug">
                      Prototipação rápida e exploração de alternativas.
                    </h3>
                  </div>
                  <div className="mt-auto flex items-center">
                    <img src={LogoGoogleIA} className="h-4" />
                  </div>
                </div>

                {/* Coluna 3: Handoff */}
                <div className="border-l border-[#8BB1B6]/60 pl-6 flex flex-col justify-between min-h-[200px]">
                  <div>
                    <span className="text-[#B5D3D7] font-sans font-semibold text-xs uppercase tracking-wider block mb-3">HANDOFF</span>
                    <h3 className="font-sans font-normal text-white text-lg md:text-xl leading-snug">
                      Construção de interfaces com componentes reais do Design System.
                    </h3>
                  </div>
                  <div className="mt-auto flex items-center">
                    <img src={logocursor} className="h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seção 13: Resultados */}
          <div className="mb-32">
            <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-2">Resultado</span>
            <h2 id="resultados" className="font-serif text-3xl font-bold text-[#2C3539] mb-8">Direcionamento estratégico validado</h2>

            <div className="space-y-8 mb-12">
              <div className="border-l-3 border-[#C0BEB8] p-10">
                <p className="text-lg text-[#4A5559] leading-relaxed font-sans">
                  O produto passou a ter uma <strong className="font-bold text-[#2C3539]">nova direção estratégica</strong>: sair de indicadores históricos e assumir uma visão operacional validada com clientes.
                </p>
              </div>

              <div className="border-l-3 border-[#C0BEB8] p-10">
                <p className="text-lg text-[#4A5559] leading-relaxed font-sans">
                  Todos novos gráficos e <strong className="font-bold text-[#2C3539]">novas funcionalidades</strong> implementadas foram <strong className="font-bold text-[#2C3539]">validadas</strong> pelos usuários e irão seguir com confiança para o rollout.
                </p>
              </div>
            </div>

            <p className="text-sm text-[#787265] leading-relaxed">
              As melhorias do dahsboard seguiram para rollout antes de eu sair do projeto e a evolução será acompanhada pelo time.
            </p>
          </div>

          {/* Minha Atuação */}
          <div className="mb-32">
            <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-2">MINHA ATUAÇÃO</span>
            <h2 id="minha-atuacao-simplificado" className="font-serif text-3xl font-bold text-[#2C3539] mb-4">Discovery, prototipação e handoff, ponta a ponta</h2>
            <p className="text-[#4A5559] leading-relaxed mb-8">
              A funcionalidade foi lançada como prova de conceito para uso interno antes de uma disponibilização mais ampla.
            </p>

            <div className="flex flex-wrap gap-3 not-prose">
              {[
                'Liderança do Discovery',
                'Síntese de solicitações históricas',
                'Definição de hipóteses',
                'Protótipos rápidos (Google AI Studio)',
                'Testes de usabilidade',
                'Consolidação de insights (NotebookLM)',
                'Handoff (Cursor + Figma + Storybook)'
              ].map((item, index) => (
                <span key={`${item}-${index}`} className="px-5 py-2.5 bg-white border border-[#DCD7CA] rounded-full text-sm font-semibold text-[#2C3539]">
                  {item}
                </span>
              ))}
            </div>
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
            <p className="text-center text-sm text-[#787265] mt-6 font-medium">Consolidação de solicitações históricas de clientes, cruzamento de dados de uso e mapeamento de dores operacionais.</p>
          </div>

          <h3 className="text-xl font-bold mb-4">Resultado da análise</h3>
          <p className="mb-6 leading-relaxed">
            Após toda a análises dos documentos e algumas sessões de conversas com os stakeholders chegamos à seguinte conclusão:
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-[#E9E4DB] shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold">✅</span>
                <h4 className="font-serif text-lg font-bold text-[#2C3539]">Já atendidos (via soluções pontuais em Superset/Metabase)</h4>
              </div>
              <p className="text-[#787265] text-sm mb-3">A maioria dos pedidos históricos foi resolvida caso a caso, sem uma solução escalável:</p>
              <ul className="list-disc pl-5 text-sm space-y-1 text-[#2C3539]">
                <li>Dados de admissão e etapas (entrada/saída, SLA por etapa) — Panvel, Piracanjuba, Sabesp, Ecolabs, Ero Brasil, Usina Santa Adélia.</li>
                <li>Volume de documentos (enviados, validados, reenviados, recusa) — validado via consulta paralela no Superset.</li>
                <li>Relatórios customizados — Ailos (planilha manual), Panvel (2x).</li>
                <li>PPCs inseridos manualmente, responsáveis por movimentação (produtividade do time), admissões por filial.</li>
                <li>Créditos consumidos e quantidade de admissões concluídas — via queries específicas.</li>
                <li>PPCs com documentos pendentes — automatizado via Airflow.</li>
              </ul>
              <p className="text-[#787265] text-xs mt-3 italic">
                <strong>Padrão importante:</strong> quase todos esses "atendidos" foram soluções manuais/pontuais no Superset, não algo nativo da plataforma — por isso a maioria aparece com a observação "poderíamos atender com gráficos e tabelas no Analisar Dados 2.0 + Self Service", ou seja, hoje são gambiarras que o produto deveria resolver nativamente.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E9E4DB] shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold">⚠️</span>
                <h4 className="font-serif text-lg font-bold text-[#2C3539]">Alguns ainda não atendidos ou pendentes</h4>
              </div>
              <ul className="list-disc pl-5 text-sm space-y-1 text-[#2C3539]">
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
                <h4 className="font-serif text-lg font-bold text-[#2C3539]">Pedidos recentes de clientes-chave (prioritários)</h4>
              </div>
              <p className="text-[#787265] text-sm mb-3">Esse é o bloco mais relevante — pedidos de clientes grandes que ainda não têm solução, mas foram mapeados como prioritários para o "novo Analisar Dados":</p>
              <ul className="list-disc pl-5 text-sm space-y-1 text-[#2C3539]">
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
            <p className="text-center text-sm text-[#787265] mt-6 font-medium">Utilizamos o Google AI Studio para idear, criar diferentes versões do produto e gerar um protótipo funcional para os testes de usabilidade.</p>
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
            <p className="text-center text-sm text-[#787265] mt-6 font-medium">Registros qualitativos de testes de usabilidade e síntese sistemática de insights colhidos com clientes reais.</p>
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
            <p className="text-center text-sm text-[#787265] mt-6 font-medium">Interface redesenhada de alta fidelidade: visão operacional focada no acompanhamento por janelas de contratação e detecção de riscos.</p>
          </div>

          <h2 id="principais-insights" className="text-2xl font-bold mb-4">Mais insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-[#006266] shadow-sm hover:bg-[#006266]/5 transition-all duration-300 flex flex-col">
              <span className="text-[#006266] font-mono text-xs tracking-wider uppercase block mb-2 font-bold">Insight 01</span>
              <h4 className="font-sans text-lg font-bold text-[#2C3539] mb-2">1. A operação acontece por janelas</h4>
              <p className="text-[#4A5559] text-sm leading-relaxed">
                A unidade de trabalho é o lote de admissões, não cada colaborador individualmente.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#006266] shadow-sm hover:bg-[#006266]/5 transition-all duration-300 flex flex-col">
              <span className="text-[#006266] font-mono text-xs tracking-wider uppercase block mb-2 font-bold">Insight 02</span>
              <h4 className="font-sans text-lg font-bold text-[#2C3539] mb-2">2. O problema não é o tempo médio</h4>
              <p className="text-[#4A5559] text-sm leading-relaxed">
                Os usuários querem identificar rapidamente quem está parado, há quanto tempo e por qual motivo.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#006266] shadow-sm hover:bg-[#006266]/5 transition-all duration-300 flex flex-col">
              <span className="text-[#006266] font-mono text-xs tracking-wider uppercase block mb-2 font-bold">Insight 03</span>
              <h4 className="font-sans text-lg font-bold text-[#2C3539] mb-2">3. A operação acontece fora da plataforma</h4>
              <p className="text-[#4A5559] text-sm leading-relaxed">
                Planilhas paralelas eram utilizadas para controlar prazos, acompanhar candidatos e preparar reuniões.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#006266] shadow-sm hover:bg-[#006266]/5 transition-all duration-300 flex flex-col">
              <span className="text-[#006266] font-mono text-xs tracking-wider uppercase block mb-2 font-bold">Insight 04</span>
              <h4 className="font-sans text-lg font-bold text-[#2C3539] mb-2">4. Gargalos estruturais</h4>
              <p className="text-[#4A5559] text-sm leading-relaxed">
                A etapa do ASO concentrava atrasos devido à ausência de integrações.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#006266] shadow-sm hover:bg-[#006266]/5 transition-all duration-300 flex flex-col md:col-span-2">
              <span className="text-[#006266] font-mono text-xs tracking-wider uppercase block mb-2 font-bold">Insight 05</span>
              <h4 className="font-sans text-lg font-bold text-[#2C3539] mb-2">5. Evolução do papel do dashboard</h4>
              <p className="text-[#4A5559] text-sm leading-relaxed">
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
              <h4 className="font-serif text-lg font-bold text-[#006266] mb-3">⚡ Quick Wins</h4>
              <ul className="list-disc pl-5 text-sm space-y-2 text-[#2C3539]">
                <li>filtro por janelas de admissão;</li>
                <li>visão centralizada de gargalos;</li>
                <li>exportações completas;</li>
                <li>acesso rápido ao WhatsApp;</li>
                <li>configuração de SLA;</li>
                <li>explicações contextuais das métricas.</li>
              </ul>
            </div>

            <div className="bg-white p-0">
              <h4 className="font-serif text-lg font-bold text-[#006266] mb-3">🚀 Evoluções estruturais</h4>
              <ul className="list-disc pl-5 text-sm space-y-2 text-[#2C3539]">
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
            <p className="text-center text-sm text-[#787265] mt-6 font-medium">One page criada no google ia studios, consolidando os feedbacks e o direcionamento estratégico do novo Dashboard.</p>
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
            <p className="text-center text-sm text-[#787265] mt-6 font-medium">Imagens geradas no Cursor, onde construímos as telas alinhadas ao Design System, incluindo testes de cenários de estresse para garantir a resiliência da interface no handoff.</p>
          </div>

          <div className="my-12">
            <div className="w-full overflow-hidden rounded-[2rem] border border-[#DCD7CA] bg-black">
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
            <p className="text-center text-sm text-[#787265] mt-6 font-medium">Com o Cursor, conseguimos desenhar animações e interações nas páginas de forma mais simples e tangível.</p>
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
          <blockquote className="border-l-4 border-[#006266] pl-4 italic text-[#787265] mb-6 text-xl">
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

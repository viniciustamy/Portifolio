
import React from 'react';
import { Building, UserCog, User } from 'lucide-react';
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
import thumbDashboard from '../assets/images/Thumbs/Thumb Dashboard.png';
import thumbDevolutiva from '../assets/images/Thumbs/Thumb Devolutiva.png';
import thumbKba from '../assets/images/Thumbs/Thumb KBA.png';
import thumbAdmin from '../assets/images/Thumbs/Thumb Admin.png';
import capaDashboard from '../assets/images/Capas/Capa Dashboard.png';
import capaDevolutiva from '../assets/images/Capas/Capa Devolutiva.png';
import capaKba from '../assets/images/Capas/Capa KBA.png';
import capaAdmin from '../assets/images/Capas/Capa Admin.png';

import evolucaoImg from '../assets/images/Imagens IA/Evolução.png';
import cardSorting1 from '../assets/images/Imagens IA/Card sorting 1.png';
import cardSorting2 from '../assets/images/Imagens IA/card sortin 2.png';
import wpp1 from '../assets/images/Imagens IA/wpp 1.png';
import wpp2 from '../assets/images/Imagens IA/wpp 2.png';
import wpp3 from '../assets/images/Imagens IA/wpp 3.png';
import wpp4 from '../assets/images/Imagens IA/wpp 4.png';
import gerenciador1 from '../assets/images/Imagens IA/Gerenciador de tarefas 1.png';
import gerenciador2 from '../assets/images/Imagens IA/Gerenciador de tarefas 2.png';
import onboarding1 from '../assets/images/Imagens IA/onbording 1.png';
import onboarding2 from '../assets/images/Imagens IA/onbording 2.png';
import onboarding3 from '../assets/images/Imagens IA/onbording 3.png';
import baseImg from '../assets/images/Imagem recorte/Base.png';
import flutuante2Img from '../assets/images/Imagem recorte/Flutuante 2.png';
import videoCursor from '../assets/Video Cursor.mov';

const ImagePlaceholder = ({ label = 'Espaço para Imagem' }: { label?: string }) => (

  <div className="w-full aspect-[16/9] bg-[#EBE7DD] rounded-[2rem] flex items-center justify-center my-12 border border-[#DCD7CA]">
    <span className="text-[#787265] font-medium tracking-widest uppercase text-sm">{label}</span>
  </div>
);

const discoveryGalleryItems = [
  {
    src: dash04,
    title: "NotebookLM e Análise Semântica",
    description: "Uso do NotebookLM para analisar dados de canais de suporte e organizar semanticamente os principais gargalos burocráticos relatados.",
    fullWidth: true
  }
];

const prototipacaoGalleryItems = [
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
    src: dash08,
    title: "Resumo Executivo Inteligente",
    description: "Desenho da funcionalidade de resumo apoiada por IA, projetada para destacar furos de prazos, anomalias e riscos imediatos de forma textual."
  },
  {
    src: dash09,
    title: "Explorando a Densidade de Informação",
    description: "Estudo de grids e tabelas para entender a melhor relação entre quantidade de dados exibidos e usabilidade em telas de baixa resolução."
  },
  {
    src: dash10,
    title: "Acompanhamento Integrado do Funil",
    description: "Visualização experimental do funil cruzando R&S e Admissão digital para localizar gargalos entre a proposta aceita e o primeiro dia de trabalho."
  },
  {
    src: dash11,
    title: "Estudo de Layout de Gráficos",
    description: "Exploração de visualizações gráficas de barras e barras empilhadas para representar a velocidade de validação documental."
  },
  {
    src: dash12,
    title: "Gravação Qualitativa das Sessões",
    description: "Entrevistas individuais em profundidade e testes de usabilidade gravados com analistas e gestores de DP de contas estratégicas."
  },
  {
    src: dash13,
    title: "Análise e Mapeamento de Feedbacks",
    description: "Matriz qualitativa consolidando comentários, reações a novos componentes e avaliações de utilidade de cada indicador proposto."
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

export const IaDiaDiaContent = () => (
    (
      <>
        <h2 className="text-2xl font-bold mb-4">IA como parte do meu processo de Design</h2>
        <p className="mb-6 leading-relaxed">
          A inteligência artificial deixou de ser apenas uma ferramenta para acelerar tarefas. Hoje ela faz parte da forma como conduzo projetos de Design, desde a descoberta do problema até a entrega para engenharia.
        </p>
        <p className="mb-6 leading-relaxed">
          Utilizo IA para sintetizar pesquisas, explorar soluções, construir protótipos funcionais, produzir documentação e até desenvolver ferramentas internas quando as soluções existentes não atendem às necessidades do projeto.
        </p>
        <p className="mb-12 leading-relaxed">
          Mais do que ganhar velocidade, meu objetivo é melhorar a qualidade das decisões, reduzir incertezas e aproximar Design, Produto e Engenharia ao longo de todo o processo.
        </p>

        <h2 id="ia-acelerando" className="text-2xl font-bold mb-6">IA acelerando o processo de Design</h2>
        
        <h3 className="text-xl font-bold mb-3">Protótipos muito mais próximos do produto final</h3>
        <p className="mb-6 leading-relaxed">
          Uma das aplicações mais valiosas da IA no meu trabalho é a criação de protótipos funcionais em código.
        </p>
        <p className="mb-6 leading-relaxed">
          Em vez de validar apenas interfaces estáticas, consigo simular comportamentos reais da aplicação, incluindo estados, animações, regras de negócio e microinterações. Isso torna os testes mais próximos da experiência final e reduz a diferença entre o que foi desenhado e o que será desenvolvido.
        </p>
        <p className="mb-4 leading-relaxed">Os principais benefícios dessa abordagem são:</p>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li><strong>Feedbacks mais consistentes:</strong> usuários interagem com experiências que respondem às suas ações, tornando os testes mais naturais.</li>
          <li><strong>Validações mais confiáveis:</strong> comportamentos complexos podem ser avaliados antes do desenvolvimento.</li>
          <li><strong>Handoff mais eficiente:</strong> os protótipos servem como uma referência prática para engenharia, reduzindo ambiguidades durante a implementação.</li>
        </ul>

        <div className="my-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img src={dash07} alt="Dashboard 7" className="w-full rounded-2xl border border-[#DCD7CA] shadow-sm" />
            <img src={dash12} alt="Dashboard 12" className="w-full rounded-2xl border border-[#DCD7CA] shadow-sm" />
          </div>
          <p className="text-sm text-center mt-3 text-gray-500">Protótipo criado no google ia studio e usado em teste de usabilidade.</p>
        </div>

        <h3 className="text-xl font-bold mb-3">Exploração de soluções</h3>
        <p className="mb-6 leading-relaxed">
          Também utilizo IA para acelerar a fase de exploração.
        </p>
        <p className="mb-6 leading-relaxed">
          Em poucos minutos consigo gerar diferentes alternativas de layout, arquitetura da informação e fluxos de navegação para discutir em workshops e sessões de critique.
        </p>
        <p className="mb-6 leading-relaxed">
          Isso reduz o tempo gasto desenhando diversas variações iniciais e me permite concentrar o esforço nas decisões estratégicas do produto, avaliando rapidamente diferentes caminhos antes de aprofundar uma solução.
        </p>

        <div className="my-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img src={baseImg} alt="Interface Base" className="w-full rounded-2xl border border-[#DCD7CA] shadow-sm" />
            <img src={flutuante2Img} alt="Interface Flutuante" className="w-full rounded-2xl border border-[#DCD7CA] shadow-sm" />
          </div>
          <p className="text-sm text-center mt-3 text-gray-500">Alternativas e evoluções do fluxo de admin criadas dentro do mesmo protótipo</p>
        </div>

        <h3 id="handoff-completo" className="text-xl font-bold mb-3">Handoff mais completo para Engenharia</h3>
        <p className="mb-6 leading-relaxed">
          Os protótipos criados com IA também melhoram significativamente o processo de handoff.
        </p>
        <p className="mb-6 leading-relaxed">
          Em vez de entregar apenas telas estáticas, consigo compartilhar versões navegáveis que utilizam componentes do Design System e demonstram comportamentos reais da interface.
        </p>
        <p className="mb-4 leading-relaxed">Entre os aspectos que normalmente apresento estão:</p>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Componentes reutilizados do Design System.</li>
          <li>Layout responsivo.</li>
          <li>Estados de interface (hover, focus, disabled, loading etc.).</li>
          <li>Validação de formulários.</li>
          <li>Microinterações e animações.</li>
        </ul>
        <p className="mb-6 leading-relaxed">
          Isso reduz dúvidas durante o desenvolvimento e aproxima a implementação da experiência planejada em Design.
        </p>

        <div className="my-12">
          <video src={videoCursor} autoPlay loop muted playsInline className="w-full rounded-2xl border border-[#DCD7CA] shadow-sm" />
          <p className="text-sm text-center mt-3 text-gray-500">Video de handoff de funcionalidade realizada diretamente no cursor.</p>
        </div>

        <h2 id="evolucao-incremental" className="text-2xl font-bold mb-4">Evolução incremental de funcionalidades</h2>
        <p className="mb-6 leading-relaxed">
          Uma prática que passei a adotar com frequência é utilizar protótipos assistidos por IA para representar a evolução de uma funcionalidade ao longo do tempo.
        </p>
        <p className="mb-6 leading-relaxed">
          Em vez de apresentar apenas a visão ideal do produto, construo diferentes versões que mostram como aquela experiência pode evoluir de forma incremental.
        </p>
        <p className="mb-4 leading-relaxed">Normalmente organizo essa evolução em quatro etapas:</p>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li><strong>Versão atual:</strong> ponto de partida do produto.</li>
          <li><strong>MVP:</strong> primeira entrega focada em resolver as principais dores dos usuários.</li>
          <li><strong>Evolução:</strong> novas capacidades adicionadas com base nos aprendizados iniciais.</li>
          <li><strong>Visão futura:</strong> direcionamento estratégico de longo prazo.</li>
        </ul>
        <p className="mb-6 leading-relaxed">
          Essa abordagem facilita discussões de escopo, ajuda a priorizar entregas e cria um alinhamento mais claro entre Design, Produto e Engenharia.
        </p>
        <p className="mb-8 leading-relaxed">
          Utilizei esse formato em projetos como Dashboard Analytics, Admin Global e Gestão de Perfis de Acesso.
        </p>

        <div className="my-12">
          <img src={evolucaoImg} alt="Linha do Tempo e Evolução Incremental das Interfaces" className="w-full rounded-2xl border border-[#DCD7CA] shadow-sm" />
          <p className="text-sm text-center mt-3 text-gray-500">Linha do Tempo e Evolução Incremental das Interfaces</p>
        </div>

        <h2 id="pesquisa-sintese" className="text-2xl font-bold mb-4">Pesquisa qualitativa e síntese de dados</h2>
        <p className="mb-6 leading-relaxed">
          Após entrevistas em profundidade ou testes de usabilidade, utilizo ferramentas como Google NotebookLM e Claude para acelerar a análise das informações coletadas.
        </p>
        <p className="mb-6 leading-relaxed">
          As transcrições servem como base para identificar padrões, agrupar insights, localizar citações relevantes e estruturar relatórios de pesquisa. Isso reduz significativamente o tempo dedicado ao processamento manual dos dados e me permite concentrar o esforço na interpretação dos resultados e na definição dos próximos passos.
        </p>
        <p className="mb-12 leading-relaxed">
          A IA auxilia na organização das informações, mas a análise crítica, a priorização e as decisões de produto continuam sendo conduzidas por mim.
        </p>

        <h2 className="text-2xl font-bold mb-6">Construindo ferramentas internas com IA</h2>
        <p className="mb-6 leading-relaxed">
          Além de apoiar o processo de Design, a IA também me permite desenvolver ferramentas específicas para resolver problemas do dia a dia da equipe.
        </p>
        <p className="mb-12 leading-relaxed">
          Em vez de adaptar o processo às limitações de uma ferramenta existente, consigo construir soluções sob medida para atender às necessidades de cada projeto.
        </p>

        <h3 className="text-xl font-bold mb-3">Card Sorting personalizado</h3>
        <p className="mb-6 leading-relaxed">
          Durante um projeto de arquitetura da informação, as ferramentas disponíveis não ofereciam a flexibilidade necessária para a dinâmica de pesquisa que planejamos.
        </p>
        <p className="mb-8 leading-relaxed">
          Com apoio da IA, desenvolvi uma aplicação de Card Sorting personalizada, adaptada ao fluxo da pesquisa. Isso proporcionou uma experiência mais simples para os participantes e facilitou a organização dos dados para análise posterior.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-12">
          <img src={cardSorting1} alt="Card Sorting 1" className="w-full rounded-2xl border border-[#DCD7CA] shadow-sm" />
          <img src={cardSorting2} alt="Card Sorting 2" className="w-full rounded-2xl border border-[#DCD7CA] shadow-sm" />
        </div>

        <h3 className="text-xl font-bold mb-3">Simulação de conversas no WhatsApp</h3>
        <p className="mb-6 leading-relaxed">
          Em um projeto de assistente conversacional, precisávamos validar fluxos de mensagens antes do desenvolvimento.
        </p>
        <p className="mb-6 leading-relaxed">
          Em vez de utilizar diagramas estáticos, desenvolvi um simulador inspirado na interface do WhatsApp, permitindo que stakeholders e usuários interagissem com a conversa como se estivessem utilizando o produto real.
        </p>
        <p className="mb-8 leading-relaxed">
          Essa abordagem tornou as validações mais naturais e ajudou a identificar melhorias no fluxo e no tom de voz antes do início da implementação.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-12">
          <img src={wpp1} alt="WhatsApp 1" className="w-full rounded-2xl border border-[#DCD7CA] shadow-sm hover:scale-[1.02] transition-transform" />
          <img src={wpp2} alt="WhatsApp 2" className="w-full rounded-2xl border border-[#DCD7CA] shadow-sm hover:scale-[1.02] transition-transform" />
          <img src={wpp3} alt="WhatsApp 3" className="w-full rounded-2xl border border-[#DCD7CA] shadow-sm hover:scale-[1.02] transition-transform" />
          <img src={wpp4} alt="WhatsApp 4" className="w-full rounded-2xl border border-[#DCD7CA] shadow-sm hover:scale-[1.02] transition-transform" />
        </div>

        <h3 className="text-xl font-bold mb-3">Gerenciador de tarefas para Design</h3>
        <p className="mb-6 leading-relaxed">
          Atuando na liderança de múltiplos squads, percebi que acompanhar projetos distribuídos entre diferentes quadros do Jira e outras ferramentas dificultava a visualização da capacidade do time e das prioridades de cada iniciativa.
        </p>
        <p className="mb-6 leading-relaxed">
          Para resolver esse problema, desenvolvi uma ferramenta interna utilizando IA, centralizando as principais informações do fluxo de trabalho em um único painel.
        </p>
        <p className="mb-4 leading-relaxed">A solução reúne:</p>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Visão integrada das atividades de discovery e delivery.</li>
          <li>Capacidade e alocação dos designers.</li>
          <li>Acompanhamento de marcos e entregas do trimestre.</li>
          <li>Cronogramas em gráfico de Gantt.</li>
          <li>Dependências entre Design, Produto e Engenharia.</li>
          <li>Contexto rápido para apoiar discussões de priorização e trade-offs.</li>
        </ul>
        <p className="mb-8 leading-relaxed">
          Além de facilitar meu acompanhamento como líder, a ferramenta tornou as conversas de planejamento muito mais objetivas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-12">
          <img src={gerenciador1} alt="Gerenciador de tarefas 1" className="w-full rounded-2xl border border-[#DCD7CA] shadow-sm" />
          <img src={gerenciador2} alt="Gerenciador de tarefas 2" className="w-full rounded-2xl border border-[#DCD7CA] shadow-sm" />
        </div>

        <h3 className="text-xl font-bold mb-3">Prototipando onboarding sem barreiras</h3>
        <p className="mb-6 leading-relaxed">
          Em outro projeto, precisávamos validar fluxos de onboarding sem depender de plataformas externas ou disputar licenças de ferramentas utilizadas por outras áreas.
        </p>
        <p className="mb-6 leading-relaxed">
          Com apoio da IA, recriei as principais telas do produto em protótipos navegáveis independentes, permitindo construir e testar rapidamente diferentes experiências de onboarding.
        </p>
        <p className="mb-4 leading-relaxed">Esses protótipos incluíam:</p>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Tours guiados.</li>
          <li>Hotspots.</li>
          <li>Modais de primeiro acesso.</li>
          <li>Dicas contextuais.</li>
        </ul>
        <p className="mb-8 leading-relaxed">
          Isso acelerou o processo de validação e permitiu iterar as soluções antes do desenvolvimento.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-12">
          <img src={onboarding1} alt="Onboarding 1" className="w-full rounded-2xl border border-[#DCD7CA] shadow-sm hover:scale-[1.02] transition-transform" />
          <img src={onboarding2} alt="Onboarding 2" className="w-full rounded-2xl border border-[#DCD7CA] shadow-sm hover:scale-[1.02] transition-transform" />
          <img src={onboarding3} alt="Onboarding 3" className="w-full rounded-2xl border border-[#DCD7CA] shadow-sm hover:scale-[1.02] transition-transform" />
        </div>

        <h2 className="text-2xl font-bold mb-6">Ferramentas que utilizo</h2>
        <p className="mb-6 leading-relaxed">
          Cada ferramenta desempenha um papel diferente dentro do meu processo de Design.
        </p>
        
        <div className="mb-12 overflow-hidden rounded-2xl border border-[#DCD7CA]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#EBE7DD] border-b border-[#DCD7CA]">
                <th className="py-3 px-4 font-bold text-gray-900 w-1/3">Ferramenta</th>
                <th className="py-3 px-4 font-bold text-gray-900">Como utilizo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCD7CA]">
              <tr>
                <td className="py-3 px-4 font-medium">Google AI Studio</td>
                <td className="py-3 px-4">Exploração de soluções, construção de protótipos, testes de conceitos e apoio na resolução de problemas.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Cursor</td>
                <td className="py-3 px-4">Desenvolvimento assistido de protótipos funcionais e ferramentas internas.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Figma Make</td>
                <td className="py-3 px-4">Exploração rápida de interfaces e conceitos visuais.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">NotebookLM</td>
                <td className="py-3 px-4">Organização e síntese de entrevistas, pesquisas e documentação.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Claude</td>
                <td className="py-3 px-4">Apoio na análise qualitativa, estruturação de conteúdo e refinamento de documentação.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mb-4">Impacto</h2>
        <p className="mb-6 leading-relaxed">
          A inteligência artificial passou a fazer parte da minha forma de trabalhar, não como um substituto do processo de Design, mas como uma ferramenta para ampliar sua capacidade.
        </p>
        <p className="mb-6 leading-relaxed">
          Ao incorporá-la em diferentes etapas do projeto, consegui reduzir significativamente o tempo entre uma hipótese e sua validação, explorar mais alternativas em menos tempo e produzir entregas com maior fidelidade para Produto e Engenharia.
        </p>
        <p className="mb-6 leading-relaxed">
          Além de acelerar atividades operacionais, a IA ampliou minha capacidade de experimentação e permitiu desenvolver soluções que dificilmente seriam viáveis utilizando apenas ferramentas tradicionais de Design.
        </p>
        <p className="mb-12 leading-relaxed">
          Hoje, ela faz parte do meu processo de ponta a ponta: da descoberta de problemas à construção de protótipos, da análise de pesquisas ao desenvolvimento de ferramentas internas que tornam o trabalho do time mais eficiente.
        </p>
      </>
    )
);

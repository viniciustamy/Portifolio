
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

import cine1 from '../assets/images/Imagens Dinamicas/Cine-1.png';
import cine2 from '../assets/images/Imagens Dinamicas/Cine-2.png';
import cine3 from '../assets/images/Imagens Dinamicas/Cine-3.png';
import cine4 from '../assets/images/Imagens Dinamicas/Cine-4.png';
import atomic1 from '../assets/images/Imagens Dinamicas/Atomic-1.png';
import atomic2 from '../assets/images/Imagens Dinamicas/Atomic 2.png';
import l1 from '../assets/images/Imagens Dinamicas/L-1.png';
import l2 from '../assets/images/Imagens Dinamicas/L-2.png';
import l3 from '../assets/images/Imagens Dinamicas/L-3.png';
import l4 from '../assets/images/Imagens Dinamicas/L-4.png';
import l5 from '../assets/images/Imagens Dinamicas/L-5.jpg';
import l6 from '../assets/images/Imagens Dinamicas/L-6.jpg';

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

const cineGallery = [
  { src: cine1, title: 'Cine Hotjar 1', description: 'Sessão de Cine Hotjar' },
  { src: cine2, title: 'Cine Hotjar 2', description: 'Sessão de Cine Hotjar' },
  { src: cine3, title: 'Cine Hotjar 3', description: 'Sessão de Cine Hotjar' },
  { src: cine4, title: 'Cine Hotjar 4', description: 'Sessão de Cine Hotjar' }
];

const atomicGallery = [
  { src: atomic1, title: 'Atomic Research 1', description: 'Quadro de Atomic Research e Cruzamento de Evidências' },
  { src: atomic2, title: 'Atomic Research 2', description: 'Quadro de Atomic Research e Cruzamento de Evidências' }
];

const ldjGallery = [
  { src: l1, title: 'Light Decision Jam 1', description: 'Sessão de Light Decision Jam' },
  { src: l2, title: 'Light Decision Jam 2', description: 'Sessão de Light Decision Jam' },
  { src: l3, title: 'Light Decision Jam 3', description: 'Sessão de Light Decision Jam' },
  { src: l4, title: 'Light Decision Jam 4', description: 'Sessão de Light Decision Jam' },
  { src: l5, title: 'Light Decision Jam 5', description: 'Sessão de Light Decision Jam' },
  { src: l6, title: 'Light Decision Jam 6', description: 'Sessão de Light Decision Jam' }
];

export const FrameworkDynamicsContent = () => (
    (
      <>
        <p className="mb-6 leading-relaxed">
          Ao longo da minha trajetória na Gupy, sempre enxerguei processos de Design como ferramentas para acelerar alinhamentos, gerar aprendizado coletivo e transformar percepções em decisões. Por isso, conduzi dezenas de workshops, dinâmicas e frameworks de Discovery em diferentes contextos: desde investigações de usabilidade até sessões estratégicas com clientes, stakeholders e times multidisciplinares.
        </p>
        <p className="mb-8 leading-relaxed">
          Nos últimos anos, a chegada da IA mudou significativamente esse processo. Muitas etapas tradicionais de Discovery passaram a ser aceleradas por prototipação, experimentação e validações rápidas. Ainda assim, continuo acreditando que momentos estruturados de investigação e colaboração são fundamentais quando o objetivo é compreender problemas complexos antes de buscar soluções.
        </p>

        <h2 id="cine-hotjar" className="text-2xl font-bold mb-4">Cine Hotjar</h2>
        <p className="mb-6 leading-relaxed">
          Uma das dinâmicas que mais utilizei foi o <strong>Cine Hotjar</strong>, voltado para análise colaborativa de gravações reais de usuários.
        </p>
        <p className="mb-6 leading-relaxed">
          O processo começava com uma curadoria das gravações mais relevantes. Em seguida, reunia stakeholders de diferentes áreas para assistir aos vídeos em conjunto. Durante a sessão, cada participante registrava individualmente seus insights, dúvidas e observações.
        </p>
        <p className="mb-8 leading-relaxed">
          Após a visualização, consolidávamos todas as anotações em um quadro compartilhado, discutíamos os principais pontos observados e realizávamos uma clusterização dos padrões encontrados. A partir desses agrupamentos, sintetizávamos os principais problemas identificados e, junto ao Product Manager, priorizávamos quais oportunidades deveriam seguir para investigação ou solução. Essa dinâmica aproximava diferentes perspectivas sobre o comportamento dos usuários e criava alinhamento entre Design, Produto e demais áreas envolvidas.
        </p>

        <Gallery items={cineGallery} />

        <h2 id="atomic-research" className="text-2xl font-bold mb-4">Atomic Research</h2>
        <p className="mb-6 leading-relaxed">
          Outro framework que utilizei com frequência foi o <strong>Atomic Research</strong>, principalmente em projetos de Discovery.
        </p>
        <p className="mb-6 leading-relaxed">
          Em vez de analisar pesquisas isoladamente, utilizávamos o método para consolidar aprendizados provenientes de diferentes fontes, como entrevistas, pesquisas quantitativas, tickets de suporte, análises de comportamento e feedbacks de clientes.
        </p>
        <p className="mb-8 leading-relaxed">
          O objetivo era transformar cada evidência em um insight estruturado e, posteriormente, cruzar essas informações para identificar padrões recurrentes. Quando um mesmo problema surgia em múltiplos canais e com diferentes perfis de usuários, aumentava nossa confiança na relevância daquele tema. Essa abordagem ajudava a reduzir decisões baseadas em percepções individuais e fortalecia a priorização de problemas realmente estruturantes para o produto.
        </p>

        <Gallery items={atomicGallery} />

        <h2 id="light-decision-jam" className="text-2xl font-bold mb-4">Light Decision Jam</h2>
        <p className="mb-6 leading-relaxed">
          O <strong>Light Decision Jam (LDJ)</strong> foi uma das dinâmicas colaborativas que mais utilizei para facilitar discussões, priorizar problemas e construir direcionamentos junto a clientes e stakeholders.
        </p>
        <p className="mb-6 leading-relaxed">
          Uma das aplicações mais marcantes aconteceu em um workshop presencial com cerca de 20 profissionais de RH de empresas estratégicas da Gupy. O objetivo era mapear toda a jornada de aquisição de talentos e identificar as maiores oportunidades de evolução.
        </p>
        <p className="mb-6 leading-relaxed">
          Organizamos a jornada em grandes etapas e, inicialmente, buscamos construir um entendimento comum sobre o que acontecia em cada momento do processo, considerando que cada empresa possuía fluxos e maturidades diferentes.
        </p>
        <p className="mb-6 leading-relaxed">
          Com essa visão compartilhada, os participantes identificaram os fatores que impulsionavam cada etapa e, principalmente, os principais impedimentos enfrentados no dia a dia. Esses impedimentos foram discutidos, agrupados e priorizados por votação.
        </p>
        <p className="mb-6 leading-relaxed">
          A partir das dores priorizadas, conduzimos um processo de aprofundamento, transformando problemas em desafios e, posteriormente, convertendo esses desafios em oportunidades de produto.
        </p>
        <p className="mb-8 leading-relaxed">
          Toda a dinâmica foi realizada presencialmente, utilizando post-its, votação por adesivos e clusterização coletiva. Além de gerar alinhamento entre empresas com contextos bastante distintos, o workshop produziu oportunidades concretas que posteriormente influenciaram iniciativas relacionadas à visibilidade de informações, geração de insights acionáveis e melhorias na experiência da plataforma. Foi uma das sessões de facilitação mais bem avaliadas que conduzi, tanto pela participação ativa dos stakeholders quanto pela qualidade dos resultados obtidos.
        </p>

        <Gallery items={ldjGallery} />
      </>
    )
);

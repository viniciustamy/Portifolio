
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

export const DesignIaEaiContent = () => (
    (
      <>
        <h2 className="text-2xl font-bold mb-4">Uma Nova Era de Relevância</h2>
        <p className="mb-6 leading-relaxed">
          Quando a inteligência artificial generativa decolou no mundo criativo, o primeiro sentimento de muitos profissionais foi de hesitação ou medo. Surgiram questionamentos: "A IA vai criar interfaces em segundos? Qual será o papel dos designers?"
        </p>
        <p className="mb-8 leading-relaxed">
          Minha experiência me mostrou exatamente o oposto. A inteligência artificial não veio para nos apagar, mas para remover o peso da execução puramente mecânica e liberar espaço mental para o que realmente importa: entender as pessoas, investigar dores profundas e desenhar estratégias robustas de produto.
        </p>

        <ImagePlaceholder label="Ilustração: Co-criação Homem-Máquina" />

        <h2 className="text-2xl font-bold mb-4">O Designer como Orquestrador de Contexto</h2>
        <p className="mb-6 leading-relaxed">
          O trabalho de design de produto sempre envolveu uma enorme quantidade de tarefas operacionais: alinhar pixels manuais, documentar meticulosamente as mesmas regras de interação repetidas vezes, e reescrever variações de textos de placeholder.
        </p>
        <p className="mb-8 leading-relaxed">
          Com a IA assumindo essa camada de suporte bruto, nosso papel sobe de patamar. Passamos a atuar como diretores criativos e estrategistas de negócio. Ao invés de passarmos dias desenhando caminhos alternativos no Figma, usamos plataformas como o Google AI Studio para materializar variações de fluxo lógico em minutos, discutindo essas hipóteses instantaneamente com stakeholders.
        </p>

        <h2 className="text-2xl font-bold mb-4">Prototipagem de Alta Resolução</h2>
        <p className="mb-6 leading-relaxed">
          Outra mudança monumental está na nossa capacidade de entrega física. Historicamente, os designers entregavam arquivos estáticos do Figma que precisavam ser interpretados por desenvolvedores, gerando fricção e perda de qualidade de interação.
        </p>
        <p className="mb-8 leading-relaxed">
          Ferramentas de código impulsionadas por IA, como o Cursor, capacitam designers a criar e testar protótipos em código real de forma incrivelmente ágil. Ao entregar o handoff não apenas em imagens, mas em códigos limpos e funcionais, encurtamos drasticamente a distância entre a ideia projetada e o software real em produção.
        </p>

        <h2 className="text-2xl font-bold mb-4">O Toque Humano é Insubstituível</h2>
        <p className="mb-6 leading-relaxed">
          Modelos de linguagem são excepcionais para cruzar referências e sintetizar padrões existentes na internet. Mas eles não possuem empatia humana real, não conseguem escutar de forma sensível as nuances não-verbais de uma entrevista qualitativa, e não conhecem as especificidades de cultura interna e governança estratégica que influenciam as decisões em grandes corporações.
        </p>
        <p className="mb-8 leading-relaxed">
          A IA oferece infinitos pontos de partida e acelera nossa velocidade de voo a níveis inimagináveis. No entanto, o direcionamento, a sensibilidade artística, o julgamento de negócios e a sensibilidade ética continuam sendo — e sempre serão — papéis puramente humanos.
        </p>
      </>
    )
);

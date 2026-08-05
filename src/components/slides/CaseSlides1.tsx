import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { containerVariants, itemVariants, visualVariants } from './SlideVariants';

export function Slide3() {
  return (
    <motion.div 
      variants={containerVariants}
      className="flex flex-col items-center justify-center text-center h-full w-full max-w-4xl mx-auto px-6"
    >
      <motion.p
        variants={itemVariants}
        className="text-[#00CBC6] font-mono text-xs tracking-[0.3em] uppercase mb-4"
      >
        Case
      </motion.p>
      <motion.h1
        variants={itemVariants}
        className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight mb-6 leading-tight"
      >
        Admin Global
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="text-base text-[#94A3B8] font-light max-w-2xl leading-relaxed mb-12"
      >
        Construindo uma base única para escalar o ecossistema Gupy
      </motion.p>

      {/* Guide Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ delay: 1, duration: 3, repeat: Infinity }}
        className="absolute bottom-4 text-[10px] font-mono text-[#64748B] tracking-wider uppercase"
      >
        Use as setas ← → ou clique nas laterais para navegar
      </motion.div>
    </motion.div>
  );
}


const productDetails: Record<string, {
  title: string;
  objective: string;
  color: string;
  bulletColor: string;
  features: string[];
}> = {
  recrutamento: {
    title: "Recrutamento & Seleção",
    objective: "Ajudar empresas a atrair, selecionar e contratar os melhores talentos de forma mais rápida e eficiente.",
    color: "#3668F3",
    bulletColor: "bg-[#3668F3]",
    features: [
      "Publicação de vagas em múltiplos canais.",
      "Gestão de candidatos em um funil de recrutamento.",
      "Triagem de currículos com IA.",
      "Agendamento de entrevistas.",
      "Aplicação de testes e avaliações.",
      "Comunicação com candidatos.",
      "Relatórios e métricas do processo seletivo."
    ]
  },
  performance: {
    title: "Performance & Desenvolvimento",
    objective: "Impulsionar o desempenho e o crescimento dos colaboradores por meio de avaliações e desenvolvimento contínuo.",
    color: "#207B64",
    bulletColor: "bg-[#207B64]",
    features: [
      "Gestão de ciclos de avaliação de desempenho.",
      "Avaliações 90°, 180° e 360°.",
      "Feedback contínuo.",
      "Gestão de metas e objetivos.",
      "Planos de Desenvolvimento Individual (PDI).",
      "Calibração de desempenho e potencial.",
      "Acompanhamento da evolução dos colaboradores.",
      "Dashboards para lideranças e RH."
    ]
  },
  clima: {
    title: "Clima & Engajamento",
    objective: "Medir e melhorar a experiência dos colaboradores para aumentar engajamento e retenção.",
    color: "#FF18DB",
    bulletColor: "bg-[#FF18DB]",
    features: [
      "Pesquisas de clima organizacional.",
      "Pesquisas de eNPS e satisfação.",
      "Pesquisas de pulso (Pulse Surveys).",
      "Análise de indicadores de engajamento.",
      "Dashboards com insights.",
      "Identificação de riscos de turnover.",
      "Acompanhamento da evolução do clima organizacional."
    ]
  },
  admissao: {
    title: "Admissão",
    objective: "Automatizar e simplificar o processo de contratação após a aprovação do candidato.",
    color: "#FF6527",
    bulletColor: "bg-[#FF6527]",
    features: [
      "Coleta de documentos de forma digital.",
      "Assinatura eletrônica de contratos.",
      "Validação de informações.",
      "Integração com sistemas de folha de pagamento e RH.",
      "Acompanhamento do status da admissão.",
      "Redução de tarefas manuais e do tempo de contratação."
    ]
  },
  treinamentos: {
    title: "Educação Corporativa",
    objective: "Desenvolver as competências dos colaboradores e promover aprendizado contínuo.",
    color: "#21973E",
    bulletColor: "bg-[#21973E]",
    features: [
      "Criação e gestão de treinamentos.",
      "Trilhas de aprendizagem.",
      "Onboarding de novos colaboradores.",
      "Cursos obrigatórios e facultativos.",
      "Avaliações de aprendizagem.",
      "Certificados e acompanhamento de progresso.",
      "Relatórios de capacitação."
    ]
  },
  gupy: {
    title: "Plataforma Gupy (ecossistema)",
    objective: "Centralizar toda a jornada do colaborador em uma única plataforma de gestão de pessoas.",
    color: "#FFFFFF",
    bulletColor: "bg-white",
    features: [
      "Integra os produtos de Recrutamento & Seleção, Admissão, Educação Corporativa, Clima & Engajamento e Performance & Desenvolvimento.",
      "Compartilha dados entre os módulos.",
      "Centraliza usuários, permissões e informações organizacionais.",
      "Oferece indicadores consolidados para RH e lideranças.",
      "Reduz retrabalho entre processos de gestão de pessoas."
    ]
  }
};

interface PopoverProps {
  id: string;
  hoveredProduct: string | null;
  selectedProduct: string | null;
  align: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'top-center' | 'center';
  onClose: () => void;
}

function ProductPopover({ id, hoveredProduct, selectedProduct, align, onClose }: PopoverProps) {
  const isVisible = hoveredProduct === id || selectedProduct === id;
  if (!isVisible) return null;
  
  const details = productDetails[id];
  if (!details) return null;

  let alignClasses = "";
  if (align === 'bottom-right') {
    alignClasses = "top-4 left-4 origin-top-left";
  } else if (align === 'bottom-left') {
    alignClasses = "top-4 right-4 origin-top-right";
  } else if (align === 'top-right') {
    alignClasses = "bottom-4 left-4 origin-bottom-left";
  } else if (align === 'top-left') {
    alignClasses = "bottom-4 right-4 origin-bottom-right";
  } else if (align === 'top-center') {
    alignClasses = "bottom-6 left-1/2 -translate-x-1/2 origin-bottom";
  } else if (align === 'center') {
    alignClasses = "top-12 left-1/2 -translate-x-1/2 origin-top";
  }

  const isLocked = selectedProduct === id;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: align.startsWith('top') ? 8 : -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      style={{ borderColor: `${details.color}40` }}
      className={`absolute ${alignClasses} z-40 w-72 md:w-80 bg-slate-950/98 backdrop-blur-md border rounded-2xl p-4 shadow-[0_15px_35px_rgba(0,0,0,0.6)] ${isLocked ? 'pointer-events-auto' : 'pointer-events-none'} text-left`}
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${details.bulletColor} ${!isLocked ? 'animate-pulse' : ''}`} />
          <h4 className="font-serif font-bold text-white text-sm md:text-base leading-tight">
            {details.title}
          </h4>
        </div>
        {isLocked && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-1 rounded-full transition-all cursor-pointer pointer-events-auto"
            title="Fechar"
          >
            <X size={12} />
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        <div>
          <span className="text-[9px] uppercase tracking-wider font-mono text-slate-400 block mb-0.5">Objetivo</span>
          <p className="text-slate-200 text-xs font-light leading-relaxed">
            {details.objective}
          </p>
        </div>
        
        <div>
          <span className="text-[9px] uppercase tracking-wider font-mono text-slate-400 block mb-1">O que faz</span>
          <ul className="space-y-1">
            {details.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300 font-light leading-relaxed">
                <span className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${details.bulletColor} opacity-70`} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export function Slide4() {
  const [hoveredProduct, setHoveredProduct] = React.useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = React.useState<string | null>(null);

  const activeProduct = hoveredProduct || selectedProduct;

  const handleProductClick = (id: string) => {
    if (selectedProduct === id) {
      setSelectedProduct(null);
    } else {
      setSelectedProduct(id);
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full w-full max-w-6xl mx-auto px-6"
    >
      <div className="space-y-6">
        <motion.span variants={itemVariants} className="text-[#00CBC6] font-mono text-xs tracking-widest uppercase block">Contexto</motion.span>
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
          O ecossistema cresceu, a implementação não acompanhou
        </motion.h2>
        <motion.p variants={itemVariants} className="text-[#94A3B8] text-base leading-relaxed font-light">
          Cada produto Gupy tinha sua própria camada administrativa. Clientes recadastravam as mesmas informações toda vez que contratavam um novo produto.
        </motion.p>
        <motion.p variants={itemVariants} className="text-[#94A3B8] text-base leading-relaxed font-light">
          O desafio ia além do técnico. Era organizacional: um projeto de anos, com conhecimento espalhado entre pessoas e documentos.
        </motion.p>
      </div>
      <motion.div variants={visualVariants} className="relative flex flex-col justify-center items-center lg:items-end w-full">
        <div className="w-full max-w-lg lg:max-w-xl aspect-[4/3] relative flex flex-col justify-around overflow-visible bg-transparent p-4">
          
          <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Recrutamento */}
            <motion.path 
              d="M 18 15 L 50 50" 
              stroke={activeProduct === 'recrutamento' ? '#3668F3' : 'rgba(255, 255, 255, 0.12)'} 
              strokeWidth={activeProduct === 'recrutamento' ? '1.5' : '0.65'} 
              strokeLinecap="round" strokeLinejoin="round" fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            />
            {/* Admissão */}
            <motion.path 
              d="M 82 15 L 50 50" 
              stroke={activeProduct === 'admissao' ? '#FF6527' : 'rgba(255, 255, 255, 0.12)'} 
              strokeWidth={activeProduct === 'admissao' ? '1.5' : '0.65'} 
              strokeLinecap="round" strokeLinejoin="round" fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            />
            {/* Performance */}
            <motion.path 
              d="M 85 70 L 50 50" 
              stroke={activeProduct === 'performance' ? '#207B64' : 'rgba(255, 255, 255, 0.12)'} 
              strokeWidth={activeProduct === 'performance' ? '1.5' : '0.65'} 
              strokeLinecap="round" strokeLinejoin="round" fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
            />
            {/* Clima */}
            <motion.path 
              d="M 50 90 L 50 50" 
              stroke={activeProduct === 'clima' ? '#FF18DB' : 'rgba(255, 255, 255, 0.12)'} 
              strokeWidth={activeProduct === 'clima' ? '1.5' : '0.65'} 
              strokeLinecap="round" strokeLinejoin="round" fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
            />
            {/* Treinamentos */}
            <motion.path 
              d="M 15 75 L 50 50" 
              stroke={activeProduct === 'treinamentos' ? '#21973E' : 'rgba(255, 255, 255, 0.12)'} 
              strokeWidth={activeProduct === 'treinamentos' ? '1.5' : '0.65'} 
              strokeLinecap="round" strokeLinejoin="round" fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 1.3, ease: "easeOut" }}
            />
          </svg>
          
          <div className="absolute inset-0 z-10 w-full h-full">
            {/* Center Circle - Gupy */}
            <div className="absolute left-1/2 top-1/2 z-20">
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
                className="-translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-48 md:h-48 rounded-full border border-white bg-black flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)] select-none"
              >
                <span className="text-4xl md:text-6xl font-bold text-white tracking-tighter" style={{ fontFamily: 'sans-serif' }}>Gupy</span>
              </motion.div>
            </div>

            {/* Recrutamento */}
            <div 
              className={`absolute left-[18%] top-[15%] ${activeProduct === 'recrutamento' ? 'z-50' : 'z-20'}`}
              onMouseEnter={() => setHoveredProduct('recrutamento')}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => handleProductClick('recrutamento')}
            >
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: activeProduct === 'recrutamento' ? 1.08 : 1, opacity: 1 }}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="-translate-x-1/2 -translate-y-1/2 bg-[#3668F3] px-4 py-2 rounded-full text-white text-xs md:text-sm font-bold whitespace-nowrap shadow-lg cursor-pointer select-none transition-all"
              >
                Recrutamento
              </motion.div>
              <ProductPopover 
                id="recrutamento" 
                hoveredProduct={hoveredProduct} 
                selectedProduct={selectedProduct} 
                align="bottom-right" 
                onClose={() => setSelectedProduct(null)} 
              />
            </div>

            {/* Performance */}
            <div 
              className={`absolute left-[85%] top-[70%] ${activeProduct === 'performance' ? 'z-50' : 'z-20'}`}
              onMouseEnter={() => setHoveredProduct('performance')}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => handleProductClick('performance')}
            >
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: activeProduct === 'performance' ? 1.08 : 1, opacity: 1 }}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="-translate-x-1/2 -translate-y-1/2 bg-[#207B64] px-4 py-2 rounded-full text-white text-xs md:text-sm font-bold whitespace-nowrap shadow-lg cursor-pointer select-none transition-all"
              >
                Performance
              </motion.div>
              <ProductPopover 
                id="performance" 
                hoveredProduct={hoveredProduct} 
                selectedProduct={selectedProduct} 
                align="top-left" 
                onClose={() => setSelectedProduct(null)} 
              />
            </div>

            {/* Clima */}
            <div 
              className={`absolute left-[50%] top-[90%] ${activeProduct === 'clima' ? 'z-50' : 'z-20'}`}
              onMouseEnter={() => setHoveredProduct('clima')}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => handleProductClick('clima')}
            >
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: activeProduct === 'clima' ? 1.08 : 1, opacity: 1 }}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="-translate-x-1/2 -translate-y-1/2 bg-[#FF18DB] px-4 py-2 rounded-full text-white text-xs md:text-sm font-bold whitespace-nowrap shadow-lg cursor-pointer select-none transition-all"
              >
                Clima
              </motion.div>
              <ProductPopover 
                id="clima" 
                hoveredProduct={hoveredProduct} 
                selectedProduct={selectedProduct} 
                align="top-center" 
                onClose={() => setSelectedProduct(null)} 
              />
            </div>

            {/* Admissão */}
            <div 
              className={`absolute left-[82%] top-[15%] ${activeProduct === 'admissao' ? 'z-50' : 'z-20'}`}
              onMouseEnter={() => setHoveredProduct('admissao')}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => handleProductClick('admissao')}
            >
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: activeProduct === 'admissao' ? 1.08 : 1, opacity: 1 }}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="-translate-x-1/2 -translate-y-1/2 bg-[#FF6527] px-4 py-2 rounded-full text-white text-xs md:text-sm font-bold whitespace-nowrap shadow-lg cursor-pointer select-none transition-all"
              >
                Admissão
              </motion.div>
              <ProductPopover 
                id="admissao" 
                hoveredProduct={hoveredProduct} 
                selectedProduct={selectedProduct} 
                align="bottom-left" 
                onClose={() => setSelectedProduct(null)} 
              />
            </div>

            {/* Treinamentos */}
            <div 
              className={`absolute left-[15%] top-[75%] ${activeProduct === 'treinamentos' ? 'z-50' : 'z-20'}`}
              onMouseEnter={() => setHoveredProduct('treinamentos')}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => handleProductClick('treinamentos')}
            >
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: activeProduct === 'treinamentos' ? 1.08 : 1, opacity: 1 }}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="-translate-x-1/2 -translate-y-1/2 bg-[#21973E] px-4 py-2 rounded-full text-white text-xs md:text-sm font-bold whitespace-nowrap shadow-lg cursor-pointer select-none transition-all"
              >
                Treinamentos
              </motion.div>
              <ProductPopover 
                id="treinamentos" 
                hoveredProduct={hoveredProduct} 
                selectedProduct={selectedProduct} 
                align="top-right" 
                onClose={() => setSelectedProduct(null)} 
              />
            </div>
          </div>

        </div>

      </motion.div>
    </motion.div>
  );
}


interface NetworkNode {
  id: string;
  label: string;
  roleName: string;
  description: string;
  colorClass: string;
  ring: 'inner' | 'middle';
  x: number; // percentage
  y: number; // percentage
  isUser?: boolean;
}

const networkNodes: NetworkNode[] = [
  // Inner Ring Nodes (Radius 23%)
  {
    id: 'user',
    label: '',
    roleName: 'Você (UX Lead)',
    description: 'Ponto focal de design do ecossistema. Além de mediar acordos complexos entre Produto e Engenharia, fui o responsável por liderar e realizar todo o processo de discovery, definição da arquitetura de informação e concepção de toda a interface (UI) da plataforma, garantindo a governança técnica e a consistência da jornada.',
    colorClass: '', // uses profile image
    ring: 'inner',
    x: 33.7,
    y: 33.7,
    isUser: true
  },
  {
    id: 'pm-inner-1',
    label: 'PM',
    roleName: 'Product Manager (Frente Principal)',
    description: 'Parceria de rotina diária no alinhamento de entregas, refinamento de novos requisitos do produto e tradução de necessidades de negócio em valor para o usuário.',
    colorClass: 'bg-[#2D3139] border-white/20 shadow-md',
    ring: 'inner',
    x: 66.3,
    y: 33.7
  },
  {
    id: 'pm-inner-2',
    label: 'PM',
    roleName: 'Product Manager (Core e Alavancas)',
    description: 'Intercâmbio estratégico de dados e integrações horizontais entre módulos. Garantia de sinergia entre produtos da plataforma.',
    colorClass: 'bg-[#FF6527] border-white/20 shadow-[0_0_15px_rgba(255,101,39,0.4)]',
    ring: 'inner',
    x: 72.9,
    y: 52.0
  },
  {
    id: 'pm-inner-3',
    label: 'PM',
    roleName: 'Product Manager (Apoio)',
    description: 'Suporte na coordenação de fluxos e priorização de backlog das frentes de captação e canais de entrada.',
    colorClass: 'bg-[#2D3139] border-white/20 shadow-md',
    ring: 'inner',
    x: 63.2,
    y: 68.8
  },
  {
    id: 'tl-inner-1',
    label: 'TL',
    roleName: 'Tech Lead (Arquitetura Principal)',
    description: 'Parceiro fundamental de desenvolvimento. Cooperação constante para garantir que os componentes de interface propostos fossem altamente viáveis e performáticos.',
    colorClass: 'bg-[#FF6527] border-white/20 shadow-[0_0_15px_rgba(255,101,39,0.4)]',
    ring: 'inner',
    x: 44.0,
    y: 72.2
  },
  {
    id: 'tl-inner-2',
    label: 'TL',
    roleName: 'Tech Lead (Plataforma)',
    description: 'Validação e estudos de limitações técnicas de carregamento de APIs e governança de dados cruzados nos fluxos mapeados pelo design.',
    colorClass: 'bg-[#2D3139] border-white/20 shadow-md',
    ring: 'inner',
    x: 29.2,
    y: 59.7
  },

  // Middle Ring Nodes (Radius 38%)
  {
    id: 'gpm-middle-1',
    label: 'GPM',
    roleName: 'Group Product Manager (Estratégia)',
    description: 'Apoio tático geral na unificação das jornadas do ecossistema e facilitação de pontes entre equipes de negócio e o time técnico de design.',
    colorClass: 'bg-[#3668F3] border-white/20 shadow-[0_0_15px_rgba(54,104,243,0.4)]',
    ring: 'middle',
    x: 50.0,
    y: 12.0
  },
  {
    id: 'head-middle-1',
    label: 'Head',
    roleName: 'Head de Engenharia (Qualidade)',
    description: 'Alinhamento periódico tático para garantir a governança e conformidade técnica das especificações e design tokens propostos nas interfaces.',
    colorClass: 'bg-[#3668F3] border-white/20 shadow-[0_0_15px_rgba(54,104,243,0.4)]',
    ring: 'middle',
    x: 17.1,
    y: 31.0
  },
  {
    id: 'gpm-middle-2',
    label: 'GPM',
    roleName: 'Group Product Manager (Canais)',
    description: 'Sincronia de metas de ativação de usuários e refinamento das métricas quantitativas atreladas às melhorias de experiência visual.',
    colorClass: 'bg-[#207B64] border-white/20 shadow-[0_0_15px_rgba(32,123,100,0.4)]',
    ring: 'middle',
    x: 18.9,
    y: 71.8
  },
  {
    id: 'head-middle-2',
    label: 'Head',
    roleName: 'Head de Engenharia (Operações)',
    description: 'Alinhamento geral de recursos de engenharia, atuando em conjunto para destravar complexidades de infraestrutura e viabilizar novas frentes.',
    colorClass: 'bg-[#FF18DB] border-white/20 shadow-[0_0_15px_rgba(255,24,219,0.4)]',
    ring: 'middle',
    x: 50.0,
    y: 88.0
  },
  {
    id: 'gpm-middle-3',
    label: 'GPM',
    roleName: 'Group Product Manager (Educação & Admissão)',
    description: 'Alinhamento e trocas constantes sobre a consistência e navegação das pontas do ecossistema envolvendo novos colaboradores contratados.',
    colorClass: 'bg-[#207B64] border-white/20 shadow-[0_0_15px_rgba(32,123,100,0.4)]',
    ring: 'middle',
    x: 79.1,
    y: 74.4
  },
  {
    id: 'gpm-middle-4',
    label: 'GPM',
    roleName: 'Group Product Manager (Engajamento)',
    description: 'Intercâmbio de aprendizados de testes com usuários e suporte tático no design estratégico das frentes de Clima e Performance.',
    colorClass: 'bg-[#FF18DB] border-white/20 shadow-[0_0_15px_rgba(255,24,219,0.4)]',
    ring: 'middle',
    x: 86.7,
    y: 40.2
  }
];

export function Slide5() {
  const userNode = networkNodes.find(n => n.id === 'user') || null;
  const [hoveredNode] = React.useState<NetworkNode | null>(userNode);

  const displayedInfo = hoveredNode || {
    roleName: "Você (UX Lead)",
    description: "Ponto focal de design do ecossistema. Além de mediar acordos entre Produto e Engenharia, fui o responsável por liderar e realizar um novo o processo de discovery, redefinição da arquitetura de informação e concepção de toda a interface (UI) da plataforma, garantindo a governança técnica e a consistência da jornada."
  };

  return (
    <motion.div 
      variants={containerVariants}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full w-full max-w-6xl mx-auto px-6"
    >
      <div className="flex flex-col justify-center h-full py-4">
        <div className="space-y-6">
          <motion.span variants={itemVariants} className="text-[#00CBC6] font-mono text-xs tracking-widest uppercase block">Meu papel</motion.span>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
            Liderando a frente de design em um projeto estratégico
          </motion.h2>
          <motion.p variants={itemVariants} className="text-[#94A3B8] text-base leading-relaxed font-light">
            3 PMs, 2 Tech Leads, GPMs e Heads de Engenharia e Design passaram e participaram deste projeto ao longo do tempo.
          </motion.p>

          {/* Dynamic Interactive Card Info */}
          <motion.div 
            key={displayedInfo.roleName}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="p-6 rounded-2xl bg-slate-950/40 border border-white/5 backdrop-blur-sm min-h-[120px] flex flex-col justify-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-[#00CBC6]" />
            <p className="text-slate-300 text-sm font-light leading-relaxed">
              {displayedInfo.description}
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div variants={visualVariants} className="flex justify-center lg:justify-end items-center w-full relative">
        {/* Network Container with dark background frame matching reference */}
        <div className="w-full max-w-[340px] xs:max-w-[380px] md:max-w-[430px] lg:max-w-[440px] aspect-square relative select-none rounded-full flex items-center justify-center p-2 bg-black/40 border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.6)]">
          
          {/* Concentric rings drawn via SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500">
            {/* Outer ring */}
            <circle cx="250" cy="250" r="245" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.8" />
            {/* Middle ring */}
            <circle cx="250" cy="250" r="190" fill="none" stroke="rgba(255, 255, 255, 0.09)" strokeWidth="0.8" />
            {/* Inner ring */}
            <circle cx="250" cy="250" r="115" fill="none" stroke="rgba(255, 255, 255, 0.14)" strokeWidth="0.8" />
          </svg>

          {/* Render Nodes */}
          {networkNodes.map((node) => {
            const isDimmed = hoveredNode !== null && hoveredNode.id !== node.id;
            const isActive = hoveredNode !== null && hoveredNode.id === node.id;

            if (node.isUser) {
              return (
                <motion.div
                  key={node.id}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer"
                  whileHover={{ scale: 1.15 }}
                  animate={{
                    opacity: 1,
                    scale: 1.12
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-white/80 p-0.5 bg-slate-900 shadow-[0_0_20px_rgba(255,255,255,0.15)] overflow-hidden">
                    <img 
                      src="/profile.jpg" 
                      alt="Você" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={node.id}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-default w-9 h-9 md:w-11 md:h-11 rounded-full border flex items-center justify-center text-[10px] md:text-xs font-bold font-sans tracking-tight text-white select-none ${node.colorClass}`}
                animate={{
                  opacity: isDimmed ? 0.45 : 1,
                  scale: isActive ? 1.12 : 1
                }}
                transition={{ duration: 0.2 }}
              >
                {node.label}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Slide6() {
  return (
    <motion.div 
      variants={containerVariants}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full w-full max-w-6xl mx-auto px-6"
    >
      <div className="space-y-6 max-w-sm lg:max-w-md relative z-50">
        <motion.span variants={itemVariants} className="text-[#00CBC6] font-mono text-xs tracking-widest uppercase block">O Desafio</motion.span>
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
          Reset Cognitivo
        </motion.h2>
        <motion.p variants={itemVariants} className="text-[#94A3B8] text-base leading-relaxed font-light">
          O problema não era falta de informação. Era excesso dela, dispersa e sem dono.
        </motion.p>
        <motion.p variants={itemVariants} className="text-[#94A3B8] text-base leading-relaxed font-light mt-4">
          Sempre que alguém novo entrava no projeto, era preciso reconstruir o contexto quase que do zero. Isso virou parte central da liderança do projeto.
        </motion.p>
      </div>

      <motion.div variants={visualVariants} className="relative w-full aspect-square lg:aspect-[4/3] flex items-center justify-center">
        <div className="relative w-full h-full mt-10 lg:mt-0">
          {/* Card 1 - Back Left */}
          <motion.img
            src="/src/assets/images/Imagem Reset/1.png"
            alt="Reset 1"
            initial={{ opacity: 0, x: -40, y: -30, rotate: -4 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: -2 }}
            whileHover={{ scale: 1.05, zIndex: 60, transition: { duration: 0.2, delay: 0 } }}
            transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-0 w-[55%] md:w-[60%] left-[-2%] md:left-[-5%] top-[5%] md:top-[0%] rounded-xl shadow-2xl border border-white/5 object-contain cursor-pointer"
          />
          {/* Card 2 - Top Right */}
          <motion.img
            src="/src/assets/images/Imagem Reset/2.png"
            alt="Reset 2"
            initial={{ opacity: 0, x: 40, y: -30, rotate: 4 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: 1 }}
            whileHover={{ scale: 1.05, zIndex: 60, transition: { duration: 0.2, delay: 0 } }}
            transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-10 w-[55%] md:w-[60%] right-[0%] md:right-[-5%] top-[15%] md:top-[10%] rounded-xl shadow-2xl border border-white/5 object-contain cursor-pointer"
          />
          {/* Card 4 - Bottom Right */}
          <motion.img
            src="/src/assets/images/Imagem Reset/4.png"
            alt="Reset 4"
            initial={{ opacity: 0, x: 40, y: 30, rotate: 4 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: 2 }}
            whileHover={{ scale: 1.05, zIndex: 60, transition: { duration: 0.2, delay: 0 } }}
            transition={{ duration: 0.9, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-20 w-[55%] md:w-[60%] right-[0%] md:right-[-5%] bottom-[10%] md:bottom-[0%] rounded-xl shadow-2xl border border-white/5 object-contain cursor-pointer"
          />
          {/* Card 3 - Bottom Left (Most front) */}
          <motion.img
            src="/src/assets/images/Imagem Reset/3.png"
            alt="Reset 3"
            initial={{ opacity: 0, x: -40, y: 30, rotate: -4 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: -1 }}
            whileHover={{ scale: 1.05, zIndex: 60, transition: { duration: 0.2, delay: 0 } }}
            transition={{ duration: 0.9, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-50 w-[60%] md:w-[65%] left-[-2%] md:left-[-5%] bottom-[5%] md:bottom-[-5%] rounded-xl shadow-2xl border border-white/5 object-contain cursor-pointer"
          />

          {/* Simulated Carousel Controls */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="absolute -bottom-12 md:-bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-4 z-[70] bg-[#0F172A]/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-xl"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="m15 18-6-6 6-6"/></svg>
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-white/20"></div>
              <div className="w-2 h-2 rounded-full bg-white/20"></div>
              <div className="w-6 h-2 rounded-full bg-[#00CBC6]"></div>
              <div className="w-2 h-2 rounded-full bg-white/20"></div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function SlideDorCrescimento() {
  return (
    <motion.div 
      variants={containerVariants}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full w-full max-w-6xl mx-auto px-6"
    >
      <div className="space-y-6">
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
          A dor do crescimento
        </motion.h2>
        <motion.p variants={itemVariants} className="text-[#94A3B8] text-base leading-relaxed font-light">
          Com a expansão da Gupy por meio de aquisições, passamos a operar três estruturas independentes para gerenciar as mesmas informações.
        </motion.p>
        
        <div className="space-y-4 pt-4">
          <motion.div variants={itemVariants} className="flex gap-4 items-start">
            <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg shrink-0 mt-1">
              <span className="text-xl leading-none block">📄</span>
            </div>
            <div>
              <h3 className="text-white text-base font-medium mb-1">Cadastros duplicados</h3>
              <p className="text-[#94A3B8] text-sm font-light">A mesma informação precisava existir em diferentes produtos.</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4 items-start">
            <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg shrink-0 mt-1">
              <span className="text-xl leading-none block">↔️</span>
            </div>
            <div>
              <h3 className="text-white text-base font-medium mb-1">Fluxos desconectados</h3>
              <p className="text-[#94A3B8] text-sm font-light">Cada solução possuía processos e regras próprias.</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4 items-start">
            <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg shrink-0 mt-1">
              <span className="text-xl leading-none block">📈</span>
            </div>
            <div>
              <h3 className="text-white text-base font-medium mb-1">Menor expansão</h3>
              <p className="text-[#94A3B8] text-sm font-light">Mais dificuldade para adoção de novos produtos, cross-sell e upsell.</p>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div variants={visualVariants} className="relative flex justify-center items-center h-full w-full">
        {/* Abstract visual representing disconnected/duplicate data */}
        <div className="relative w-full max-w-md aspect-square">
          {/* Main central node conceptually */}
          <div className="absolute inset-0 flex items-center justify-center">
            
            {/* Structure 1 */}
            <motion.div 
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ x: -80, y: -60, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, type: "spring" }}
              className="absolute w-24 h-24 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center shadow-lg"
            >
              <div className="flex flex-col gap-2 w-1/2">
                <div className="h-1.5 w-full bg-white/20 rounded-full" />
                <div className="h-1.5 w-3/4 bg-white/20 rounded-full" />
                <div className="h-1.5 w-full bg-[#00CBC6]/40 rounded-full" />
              </div>
            </motion.div>

            {/* Structure 2 */}
            <motion.div 
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ x: 80, y: -20, opacity: 1 }}
              transition={{ delay: 0.7, duration: 1, type: "spring" }}
              className="absolute w-24 h-24 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center shadow-lg"
            >
              <div className="flex flex-col gap-2 w-1/2">
                <div className="h-1.5 w-full bg-white/20 rounded-full" />
                <div className="h-1.5 w-5/6 bg-white/20 rounded-full" />
                <div className="h-1.5 w-full bg-[#00CBC6]/40 rounded-full" />
              </div>
            </motion.div>

            {/* Structure 3 */}
            <motion.div 
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ x: -20, y: 80, opacity: 1 }}
              transition={{ delay: 0.9, duration: 1, type: "spring" }}
              className="absolute w-28 h-28 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center shadow-lg"
            >
              <div className="flex flex-col gap-2 w-1/2">
                <div className="h-1.5 w-full bg-white/20 rounded-full" />
                <div className="h-1.5 w-2/3 bg-white/20 rounded-full" />
                <div className="h-1.5 w-full bg-[#00CBC6]/40 rounded-full" />
                <div className="h-1.5 w-1/2 bg-white/20 rounded-full" />
              </div>
            </motion.div>

            {/* Disconnected lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10" viewBox="0 0 100 100">
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ delay: 1.5, duration: 1 }}
                d="M30 30 Q50 40 70 40"
                fill="none"
                stroke="url(#dashed)"
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ delay: 1.7, duration: 1 }}
                d="M70 50 Q60 60 40 70"
                fill="none"
                stroke="url(#dashed)"
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ delay: 1.9, duration: 1 }}
                d="M35 75 Q40 50 35 40"
                fill="none"
                stroke="url(#dashed)"
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
              
              <defs>
                <linearGradient id="dashed" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.5" />
                </linearGradient>
              </defs>
            </svg>

            {/* Error/Warning indicators */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2.1, type: "spring", bounce: 0.5 }}
              className="absolute left-1/4 top-1/3 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.6)]"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2.3, type: "spring", bounce: 0.5 }}
              className="absolute right-1/3 bottom-1/3 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.6)]"
            />

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}


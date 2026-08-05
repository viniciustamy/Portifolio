import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { containerVariants, itemVariants, visualVariants } from './SlideVariants';
import { FileMinus, Table, Lock, Database, Link, HelpCircle, EyeOff, Maximize2, Users, Shield, Briefcase, Network, Layers, DollarSign, TrendingUp, Zap, Upload, FileText, ChevronDown, ChevronUp, Sparkles, User, Building2, FileSearch, ArrowRight } from 'lucide-react';

export function Slide7() {
  const [activePopover, setActivePopover] = React.useState<'pesquisas' | 'empresas' | 'pessoas' | null>(null);

  const popoverData = {
    pesquisas: {
      title: 'Pesquisas',
      icon: FileSearch,
      color: '#00CBC6',
      bgColor: 'bg-[#00CBC6]/10',
      borderColor: 'border-[#00CBC6]/30',
      arrowLeft: '16.66%',
      content: (
        <ul className="flex flex-col w-full">
          {[
            'Entrevistas Internas com Especialistas (André e Babi).',
            'Teste de Usabilidade do Protótipo (Babi).',
            'Teste de Usabilidade do MVP (Ana).',
            'Validação do Novo Admin Global (Tamy)'
          ].map((item, idx, arr) => (
            <li key={idx} className={`py-3.5 text-[13px] sm:text-sm text-slate-200 font-light leading-snug ${idx !== arr.length - 1 ? 'border-b border-white/10' : ''}`}>
              {item}
            </li>
          ))}
        </ul>
      )
    },
    empresas: {
      title: 'Empresas',
      icon: Building2,
      color: '#3668F3',
      bgColor: 'bg-[#3668F3]/10',
      borderColor: 'border-[#3668F3]/30',
      arrowLeft: '50%',
      content: (
        <ul className="flex flex-col w-full">
          {[
            { name: 'Grupo SC', desc: 'Distribuidora de grande porte' },
            { name: 'Ted Sustentável', desc: 'Serviços/Telecomunicações' },
            { name: 'Grupo Sinova', desc: 'Logística/Vendas' },
            { name: 'OLX', desc: 'Tecnologia/Marketplace' },
            { name: 'Gupy', desc: 'Testes especialistas e RH' }
          ].map((company, idx, arr) => (
            <li key={idx} className={`py-3.5 text-[13px] sm:text-sm text-slate-200 font-light leading-snug flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 ${idx !== arr.length - 1 ? 'border-b border-white/10' : ''}`}>
              <strong className="text-white font-medium">{company.name}</strong>
              <span className="text-slate-400">{company.desc}</span>
            </li>
          ))}
        </ul>
      )
    },
    pessoas: {
      title: 'Pessoas',
      icon: Users,
      color: '#FF18DB',
      bgColor: 'bg-[#FF18DB]/10',
      borderColor: 'border-[#FF18DB]/30',
      arrowLeft: '83.33%',
      content: (
        <ul className="flex flex-col w-full">
          <li className="py-3.5 text-[13px] sm:text-sm text-slate-200 font-light leading-snug border-b border-white/10 flex flex-col gap-1.5">
            <strong className="text-white font-medium">Especialistas Internos (10)</strong>
            <span className="text-slate-400">Laryssa N., Luisa, Priscila C., Joice, Ricardo, Sabrina, Geruza, Rafael F., Safyre O., Naíse M.</span>
          </li>
          <li className="py-3.5 text-[13px] sm:text-sm text-slate-200 font-light leading-snug flex flex-col gap-1.5">
            <strong className="text-white font-medium">Usuários e Clientes (8)</strong>
            <span className="text-slate-400">João Pedro (Ted), Ana Karoline (OLX), Neto Jose (Sinova), Priscila P., Cristiani L. (RHs no mercado), Evelyn, Fábio, Raíssa (Grupo SC).</span>
          </li>
        </ul>
      )
    }
  };

  const GoogleDocsIcon = () => (
    <img 
      src="/src/assets/images/Imagem LM/Docs.png" 
      alt="Google Docs" 
      className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-[0_12px_28px_rgba(26,115,232,0.4)] select-none shrink-0" 
      referrerPolicy="no-referrer"
    />
  );

  const MiroIcon = () => (
    <img 
      src="/src/assets/images/Imagem LM/Miro.png" 
      alt="Miro" 
      className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-[0_12px_28px_rgba(255,208,47,0.4)] select-none shrink-0" 
      referrerPolicy="no-referrer"
    />
  );

  const NotebookLMMockup = () => (
    <div className="w-full max-w-[440px] sm:max-w-[480px] aspect-[1.38] bg-slate-900 border border-white/10 rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative z-10 overflow-hidden flex flex-col">
      <img 
        src="/src/assets/images/Imagem LM/LM.png" 
        alt="NotebookLM" 
        className="w-full h-full object-cover" 
        style={{ width: '402.778px' }}
        referrerPolicy="no-referrer"
      />
    </div>
  );

  return (
    <motion.div 
      variants={containerVariants}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full w-full max-w-6xl mx-auto px-6"
    >
      <div className="space-y-6 lg:col-span-5">
        <motion.span variants={itemVariants} className="text-[#00CBC6] font-mono text-xs tracking-widest uppercase block">
          Descoberta
        </motion.span>
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
          Consolidação de múltiplos materiais e histórico
        </motion.h2>
        <motion.p variants={itemVariants} className="text-[#94A3B8] text-base leading-relaxed font-light">
          Para mapear o histórico completo do produto distribuído em múltiplos canais e documentos, realizamos uma consolidação profunda de dados de pesquisas e teste anteriores.
        </motion.p>
        <motion.p variants={itemVariants} className="text-[#94A3B8] text-base leading-relaxed font-light">
          Utilizando IA do NotebookLM, conseguimos cruzar e processar com alta eficiência fontes de dados heterogêneas, extraindo padrões e sintetizando o conhecimento acumulado para direcionar a nova arquitetura do Admin Global de forma extremamente precisa e ágil.
        </motion.p>
      </div>

      {/* Second Column - Interactive NotebookLM diagram or active details */}
      <div className="w-full lg:col-span-7 flex flex-col items-center gap-6">
        
        {/* Visual Box (Illustration OR Active Details) */}
        <motion.div 
          variants={visualVariants} 
          className="w-full flex justify-center items-center relative min-h-[350px] sm:min-h-[400px]"
        >
          <div className="relative w-full max-w-xl aspect-[1.38] flex items-center justify-center bg-transparent border-none outline-none shadow-none">
            <AnimatePresence mode="wait">
              {activePopover ? (
                <motion.div
                  key={activePopover}
                  initial={{ opacity: 0, scale: 0.95, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 12 }}
                  transition={{ type: "spring", stiffness: 350, damping: 26 }}
                  className="w-full h-full flex flex-col justify-start p-6 sm:p-8 bg-[#111111] backdrop-blur-md border border-white/10 rounded-2xl text-white shadow-2xl"
                >
                  <div className="flex items-center gap-4 mb-6 sm:mb-8">
                    {React.createElement(popoverData[activePopover].icon, { 
                      className: "w-7 h-7 sm:w-8 sm:h-8", 
                      style: { color: popoverData[activePopover].color },
                      strokeWidth: 2 
                    })}
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                      {popoverData[activePopover].title}
                    </h3>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 flex flex-col items-start w-full">
                    {popoverData[activePopover].content}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="illustration"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  {/* Central NotebookLM Mockup Component */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <NotebookLMMockup />
                  </motion.div>

                  {/* Floating Google Docs & Miro Icons with independent gentle animation */}
                  {/* 1. Google Doc (Top Left) */}
                  <motion.div 
                    style={{ left: '10%', top: '6%' }}
                    className="absolute z-20"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.4,
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }}
                  >
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <GoogleDocsIcon />
                    </motion.div>
                  </motion.div>

                  {/* 2. Miro Board (Top Right) */}
                  <motion.div 
                    style={{ right: '9%', top: '7%' }}
                    className="absolute z-20"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.6,
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }}
                  >
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    >
                      <MiroIcon />
                    </motion.div>
                  </motion.div>

                  {/* 3. Miro Board (Middle Left) */}
                  <motion.div 
                    style={{ left: '3%', top: '35%' }}
                    className="absolute z-20"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.8,
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }}
                  >
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    >
                      <MiroIcon />
                    </motion.div>
                  </motion.div>

                  {/* 4. Google Doc (Middle Right) */}
                  <motion.div 
                    style={{ right: '2%', top: '37%' }}
                    className="absolute z-20"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 1.0,
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }}
                  >
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                    >
                      <GoogleDocsIcon />
                    </motion.div>
                  </motion.div>

                  {/* 5. Google Doc (Bottom Left) */}
                  <motion.div 
                    style={{ left: '14%', bottom: '8%' }}
                    className="absolute z-20"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 1.2,
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }}
                  >
                    <motion.div
                      animate={{ y: [0, -4.5, 0] }}
                      transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                    >
                      <GoogleDocsIcon />
                    </motion.div>
                  </motion.div>

                  {/* 6. Miro Board (Bottom Right) */}
                  <motion.div 
                    style={{ right: '14%', bottom: '6%' }}
                    className="absolute z-20"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 1.4,
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }}
                  >
                    <motion.div
                      animate={{ y: [0, -5.5, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                    >
                      <MiroIcon />
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Buttons row - placed directly underneath the visual box */}
        <div className="w-full max-w-xl grid grid-cols-3 gap-3">
          {[
            { id: 'pesquisas' as const, number: '4', label: 'Pesquisas', sublabel: 'Consolidadas', color: '#00CBC6', hoverBorder: 'hover:border-[#00CBC6]/40' },
            { id: 'empresas' as const, number: '5', label: 'Empresas', sublabel: 'Mapeadas', color: '#3668F3', hoverBorder: 'hover:border-[#3668F3]/40' },
            { id: 'pessoas' as const, number: '18', label: 'Pessoas', sublabel: 'Envolvidas', color: '#FF18DB', hoverBorder: 'hover:border-[#FF18DB]/40' }
          ].map((card) => {
            const isActive = activePopover === card.id;
            return (
              <button
                key={card.id}
                onMouseEnter={() => setActivePopover(card.id)}
                onMouseLeave={() => setActivePopover(null)}
                onClick={() => setActivePopover(activePopover === card.id ? null : card.id)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                  isActive 
                    ? 'border-white/20 bg-slate-950/40 scale-[1.03] z-10' 
                    : `border-white/5 bg-slate-950/20 ${card.hoverBorder} hover:bg-slate-950/40`
                }`}
              >
                {/* Accent Top Line */}
                <div 
                  className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-300"
                  style={{ 
                    backgroundColor: card.color,
                    opacity: isActive ? 1 : 0.25 
                  }}
                />
                <span 
                  className="text-2xl sm:text-3xl md:text-4xl font-serif font-black tracking-tight mb-0.5 transition-colors duration-300"
                  style={{ color: isActive ? card.color : '#E2E8F0' }}
                >
                  {card.number}
                </span>
                <span className="text-[10px] font-bold text-slate-200 tracking-wide leading-none">
                  {card.label}
                </span>
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mt-0.5 leading-none">
                  {card.sublabel}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </motion.div>
  );
}

export function SlideDores() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const dores = [
    { 
      title: "Processo Fragmentado", 
      icon: FileMinus, 
      desc: "O cadastro dividido em quatro etapas principais gera uma sobrecarga de trabalho e retrabalho operacional alto para o cliente.",
      quotes: [
        "O cadastro é dividido em quatro etapas principais: Gestão de Atributos, Perfis de Acesso, Cadastro de Colaboradores e Permissões. Essa fragmentação gera uma carga de trabalho alta para o cliente.",
        "Como são muitos passos, o cliente faz de qualquer jeito. Isso gera retrabalho para nós. Tenho clientes que não atualizam a base há meses porque é muito complexo."
      ]
    },
    { 
      title: "A Dor das Planilhas", 
      icon: Table, 
      desc: "Rigidez no preenchimento de arquivos complexos com ordens rígidas de colunas que travam e geram erros frequentes de importação.",
      quotes: [
        "Antigamente, a gente tinha uma única planilha para atualização, mas ela tinha 54 colunas de preenchimento.",
        "A nossa planilha não pode mudar a ordem das colunas. As informações que vêm da folha deles são em ordens diferentes, então eles têm que ficar copiando e colando na ordem exata da nossa planilha, senão dá erro.",
        "Existe uma ordem obrigatória para evitar erros: primeiro cadastra-se a Gestão de Atributos... depois as lideranças e, por fim, os demais colaboradores. Se a sequência falhar, a importação trava.",
        "O que é mais complexo é a manual. Eu subo uma planilha e tenho que esperar um e-mail chegar para conferir se teve erro, para depois corrigir e subir de novo.",
        "As transformações de arquivo... baixar CSV, transformar para Excel, fazer o preenchimento, transformar para CSV, mudar o nome do arquivo [para um padrão específico]... isso gera muito impacto."
      ]
    },
    { 
      title: "Falta de Autonomia", 
      icon: Lock, 
      desc: "O cliente não tem autonomia total para editar a árvore hierárquica na interface, dependendo de chamados para o suporte ou reimportações.",
      quotes: [
        "Não tem autonomia total. Ela vai ficar dependendo de abrir chamado com o nosso suporte. E fora o trabalho de 'putz, lá vou eu preencher aquela planilha de novo'.",
        "A subida, que eu saiba, é via suporte ou se estiver ativado um modo específico... o cliente fica travado.",
        "Muitas vezes o cliente não tem autonomia para editar a árvore hierárquica na interface, dependendo de abrir chamados para o suporte ou reimportar planilhas complexas."
      ]
    },
    { 
      title: "Dados Sujos & Pulse", 
      icon: Database, 
      desc: "Bases desatualizadas levam a colaboradores desligados recebendo pesquisas Pulse, distorcendo os indicadores de engajamento da empresa.",
      quotes: [
        "Aí a base fica suja, com colaborador desligado recebendo Pulse, o que afeta o resultado dele.",
        "Isso resulta em dados 'sujos', como colaboradores desligados recebendo pesquisas Pulse, o que distorce os indicadores de engajamento da empresa."
      ]
    },
    { 
      title: "Gargalos de Integração", 
      icon: Link, 
      desc: "Falta de integração ativa com sistemas de folha, exigindo APIs próprias construídas pelos clientes ou consultorias externas caras.",
      quotes: [
        "Hoje não temos um vínculo ativo com sistemas de folha (tipo clicar em um botão e integrar). Temos uma API que o próprio cliente tem que construir.",
        "Temos clientes que pagam consultoria externa só para construir a API e não ter que fazer manualmente.",
        "Poxa, mas eu já cadastrei a minha árvore lá em Recrutamento e Seleção, por que eu não consigo usar a mesma árvore aqui?... e daí a gente não consegue importar."
      ]
    },
    {
      title: "Ambiguidade de Termos e Modelo Mental",
      icon: HelpCircle,
      desc: "Os usuários frequentemente se confundem com a terminologia da plataforma, como a diferença entre \"Grupos\" (localização na empresa) e \"Atributos\" (características do indivíduo). Além disso, o termo \"Filiais\" no menu muitas vezes é usado para representar a estrutura organizacional, o que causa confusão conceitual.",
      quotes: [
        "A gente tem 'Filiais', sendo que a estrutura organizacional sobe junto com a filial. Isso eu já de cara te falaria que é uma dor.",
        "O nome 'Empresas' no menu superior gerou confusão para alguns, que pensaram se tratar de um seletor para trocar de ambiente e não de uma área de configuração de estrutura.",
        "Unidade de Negócio vs. Unidade Organizacional: Estes foram os termos mais confusos. Para alguns, 'Unidade de Negócio' parecia uma tag ou segmento."
      ]
    }
  ];

  return (
    <motion.div 
      variants={containerVariants}
      className="flex flex-col h-full w-full max-w-[1240px] mx-auto px-6 justify-center py-2 sm:py-4"
    >
      <div className="text-center mb-6 sm:mb-8">
        <motion.span variants={itemVariants} className="text-red-500 font-mono text-xs tracking-widest uppercase block mb-1 font-semibold">
          Dores da Descoberta
        </motion.span>
        <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight leading-tight mb-2">
          O que precisava ser resolvido?
        </motion.h2>
        <motion.p variants={itemVariants} className="text-[#94A3B8] text-xs md:text-sm font-light max-w-lg mx-auto">
          Passe o mouse sobre os cards para expandi-los e ler os depoimentos reais colhidos durante a descoberta.
        </motion.p>
      </div>

      <motion.div 
        variants={visualVariants} 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      >
        {dores.map((dor, i) => {
          const isHovered = hoveredIndex === i;
          return (
            <div 
              key={i}
              className="relative h-[110px] sm:h-[120px]"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div 
                layout
                animate={{
                  height: isHovered ? "auto" : "100%",
                  scale: isHovered ? 1.05 : 1,
                  y: isHovered ? -4 : 0,
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 180, 
                  damping: 24,
                  layout: { type: "spring", stiffness: 180, damping: 24 }
                }}
                className={`absolute inset-x-0 ${i >= 3 ? 'bottom-0' : 'top-0'} rounded-xl p-4 cursor-default flex flex-col ${
                  isHovered 
                    ? 'z-40 bg-slate-950 border border-red-900/50 shadow-2xl shadow-black/80' 
                    : 'z-10 bg-[#0F172A]/50 border border-white/10 hover:border-red-500/20 shadow-lg'
                }`}
              >
                {/* Gradient background decoration */}
                <div className={`absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-xl transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

                {/* Unified Header (Icon & Title) */}
                <motion.div 
                  layout="position"
                  className={`relative flex items-center gap-2.5 ${
                    isHovered 
                      ? 'flex-row mb-2.5 pb-2 w-full justify-start' 
                      : 'flex-col justify-center text-center h-full w-full'
                  }`}
                >
                  <motion.div 
                    layout="position"
                    className={`rounded-full bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 ${
                      isHovered ? 'w-7 h-7' : 'w-9 h-9'
                    }`}
                  >
                    <dor.icon size={isHovered ? 14 : 18} />
                  </motion.div>
                  <motion.h3 
                    layout="position"
                    className={`font-serif font-bold transition-colors duration-300 tracking-tight ${
                      isHovered ? 'text-sm text-red-400 text-left' : 'text-xs sm:text-sm text-white text-center'
                    }`}
                  >
                    {dor.title}
                  </motion.h3>
                </motion.div>

                {/* Description and Quotes (only visible on hover) */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ 
                        opacity: { delay: 0.12, duration: 0.2 }, 
                        y: { delay: 0.12, duration: 0.2 } 
                      }}
                      className="relative flex flex-col h-full mt-1"
                    >
                      <p className="text-[11px] text-slate-300 font-light leading-relaxed mb-3">
                        {dor.desc}
                      </p>

                      <div className="pt-2.5 mt-auto">
                        <h4 className="text-[9px] font-mono font-semibold text-red-500 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                          Relatos Reais dos Usuários
                        </h4>
                        <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
                          {dor.quotes.map((quote, qIdx) => (
                            <p 
                              key={qIdx} 
                              className="text-[10px] text-[#94A3B8] border-l-2 border-red-500/30 pl-2 leading-relaxed italic"
                            >
                              "{quote}"
                            </p>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

export function Slide8() {
  return (
    <motion.div 
      variants={containerVariants}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center h-full w-full max-w-[1240px] mx-auto px-6"
    >
      {/* Column 1 - Cadeira (Left on desktop, order-2 on mobile) */}
      <motion.div 
        variants={visualVariants} 
        className="lg:col-span-3 flex flex-col items-center text-center order-2 lg:order-1"
      >
        <div className="bg-transparent border-transparent p-5 w-full max-w-[320px] flex flex-col items-center transition-all duration-300">
          <motion.img 
            src="/src/assets/images/Job x Position/Cadeira.png" 
            alt="Cadeira" 
            className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 object-contain drop-shadow-[0_15px_30px_rgba(0,203,198,0.25)] mb-5"
            referrerPolicy="no-referrer"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            <strong className="text-[#00CBC6] block mb-1.5 font-mono text-xs sm:text-sm uppercase tracking-wider">Cadeira (Position)</strong>
            Representa uma posição na hierarquia da empresa que não é removida quando alguém sai dela.
          </p>
        </div>
      </motion.div>

      {/* Column 2 - Content (Middle on desktop, order-1 on mobile) */}
      <div className="lg:col-span-6 space-y-6 text-center order-1 lg:order-2 px-2 lg:px-6">
        <div className="space-y-4 flex flex-col items-center text-center">
          <motion.span variants={itemVariants} className="text-[#00CBC6] font-mono text-xs tracking-widest uppercase block">
            A Decisão
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight max-w-md mx-auto">
            Job Manager x Position Manager
          </motion.h2>
          <motion.p variants={itemVariants} className="text-[#94A3B8] text-base leading-relaxed font-light max-w-lg mx-auto">
            O time caminhava para Position Manager em todos os cenários. Porém, os dados de descoberta mostraram que clientes SMB sequer compreendem o conceito de "posição".
          </motion.p>
          <motion.p variants={itemVariants} className="text-[#94A3B8] text-base leading-relaxed font-light max-w-lg mx-auto">
            Defendi começar pelo Job Manager, que é mais simples, fluido e ágil, evoluindo para o Position Manager apenas nos cenários de clientes de alta maturidade organizacional.
          </motion.p>
        </div>
      </div>

      {/* Column 3 - Banco (Right on desktop, order-3 on mobile) */}
      <motion.div 
        variants={visualVariants} 
        className="lg:col-span-3 flex flex-col items-center text-center order-3 lg:order-3"
      >
        <div className="bg-transparent border-transparent p-5 w-full max-w-[320px] flex flex-col items-center transition-all duration-300">
          <motion.img 
            src="/src/assets/images/Job x Position/Banco.png" 
            alt="Banco" 
            className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 object-contain drop-shadow-[0_15px_30px_rgba(255,24,219,0.25)] mb-5"
            referrerPolicy="no-referrer"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          />
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            <strong className="text-[#FF18DB] block mb-1.5 font-mono text-xs sm:text-sm uppercase tracking-wider">Banco (Job)</strong>
            Representa uma estrutura mais flexível onde, quando uma pessoa sai, este ramo da árvore some.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Slide9() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const images = [
    {
      id: 0,
      src: "/src/assets/images/Imagem make/Make 1.png",
      alt: "Visão Geral",
    },
    {
      id: 1,
      src: "/src/assets/images/Imagem make/Make 2.png",
      alt: "Position Manager",
    },
    {
      id: 2,
      src: "/src/assets/images/Imagem make/Make 3.png",
      alt: "Fluxo Detalhado",
    },
    {
      id: 3,
      src: "/src/assets/images/Imagem make/Make 4.png",
      alt: "Validações",
    },
  ];

  const getCardStyle = (index: number) => {
    if (index === activeIndex) {
      return {
        zIndex: 50,
        scale: 1,
        y: -35,
        opacity: 1,
        filter: "blur(0px) brightness(1)",
        boxShadow: "0 35px 70px -15px rgba(0, 0, 0, 0.98)",
      };
    }

    const position = (index - activeIndex + images.length) % images.length;

    return {
      zIndex: 50 - position * 10,
      scale: 1 - position * 0.08,
      y: -35 + position * 55,
      opacity: Math.max(0.15, 0.9 - position * 0.25),
      filter: "blur(2.5px) brightness(0.5)",
      boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.8)",
    };
  };

  return (
    <motion.div 
      variants={containerVariants}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full w-full max-w-6xl mx-auto px-0"
    >
      <div className="space-y-6 lg:col-span-4">
        <motion.span variants={itemVariants} className="text-[#00CBC6] font-mono text-xs tracking-widest uppercase block">Roadmap</motion.span>
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
          De discussão abstrata a artefato visual
        </motion.h2>
        <motion.p variants={itemVariants} className="text-[#94A3B8] text-base leading-relaxed font-light">
          Com a direção definida, usei Figma Make pra transformar o roadmap em uma representação visual da arquitetura, já considerando a variação entre Job x Position Manager.
        </motion.p>
        <motion.p variants={itemVariants} className="text-[#94A3B8] text-base leading-relaxed font-light">
          Esse material foi importante para entender a arquitetura e a amplitude do admin global. Virou a principal ferramenta de alinhamento entre Produto, Engenharia e liderança.
        </motion.p>
      </div>

      <motion.div variants={visualVariants} className="lg:col-span-8 flex justify-center items-center w-full relative select-none">
        <div className="flex items-center gap-6 w-full max-w-[760px]">
          {/* Stack Container */}
          <div className="relative flex-1 aspect-[1.62/1] mt-8 flex justify-center items-center">
            {images.map((img, idx) => {
              const cardStyle = getCardStyle(idx);
              const isActive = idx === activeIndex;

              return (
                <motion.div
                  key={img.id}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                  }}
                  animate={cardStyle}
                  transition={{
                    type: 'spring',
                    stiffness: 28,
                    damping: 14,
                  }}
                  className="rounded-2xl border border-white/10 overflow-hidden bg-transparent"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-contain select-none pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              );
            })}

            {/* Click & Interaction Overlays to avoid cursor shifting issues */}
            <div className="absolute inset-0 z-[60]">
              {/* Active Image Zone - Click to expand */}
              <div 
                className="absolute left-0 right-0 top-0 bottom-[30%] cursor-zoom-in"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-lightbox', {
                    detail: { images: images.map(img => img.src), index: activeIndex }
                  }));
                }}
              />

              {/* Stack Card 1 Peeking Zone */}
              <div 
                className="absolute left-0 right-0 bottom-[20%] h-[10%] cursor-pointer"
                onClick={() => setActiveIndex((activeIndex + 1) % images.length)}
              />

              {/* Stack Card 2 Peeking Zone */}
              <div 
                className="absolute left-0 right-0 bottom-[10%] h-[10%] cursor-pointer"
                onClick={() => setActiveIndex((activeIndex + 2) % images.length)}
              />
              
              {/* Stack Card 3 Peeking Zone */}
              <div 
                className="absolute left-0 right-0 bottom-[0%] h-[10%] cursor-pointer"
                onClick={() => setActiveIndex((activeIndex + 3) % images.length)}
              />
            </div>
          </div>

          {/* Vertical Image Navigator / Controller on the right */}
          <div className="flex flex-col gap-4 py-4 shrink-0 border-l border-white/5 pl-4">
            {images.map((img, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={img.id}
                  onClick={() => setActiveIndex(idx)}
                  className="group relative flex items-center justify-center focus:outline-none"
                >
                  {/* Indicator bullet */}
                  <div className={`transition-all duration-500 rounded-full ${
                    isActive 
                      ? 'w-2 h-6 bg-[#00CBC6] shadow-[0_0_10px_rgba(0,203,198,0.3)]' 
                      : 'w-2 h-2 bg-slate-600 group-hover:bg-slate-400'
                  }`} />
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const imageEntranceVariants = {
  enter: { 
    opacity: 0, 
    x: 200, 
    filter: 'blur(8px)' 
  },
  center: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { 
      type: 'spring', 
      stiffness: 60, 
      damping: 15, 
      delay: 0.8 
    },
  },
  exit: { 
    opacity: 0, 
    x: -120, 
    filter: 'blur(8px)', 
    transition: { duration: 0.2 } 
  },
};

export function Slide10() {
  return (
    <>
      <motion.div 
        variants={containerVariants}
        className="flex flex-col justify-center h-full w-full max-w-[1240px] mx-auto relative z-10 pointer-events-none"
      >
        <div className="w-full lg:w-5/12 space-y-6 px-6 lg:px-12 lg:pr-16 pointer-events-auto">
          <motion.span variants={itemVariants} className="text-[#00CBC6] font-mono text-xs tracking-widest uppercase block">Handoff</motion.span>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
            Entregando mais que telas
          </motion.h2>
          <motion.p variants={itemVariants} className="text-[#94A3B8] text-base leading-relaxed font-light">
            Após a priorização das funcionalidade de Importação Unificada, pessoas, Posições e Entidades, usei o Cursor integrado ao nosso Design System pra ir direto a telas quase finais. Isso acelerou o handoff e revelou gargalos no Design System antes mesmo do desenvolvimento começar.
          </motion.p>
          <motion.div variants={itemVariants} className="pt-6 flex justify-start">
             <img 
               src="/src/assets/images/Logos IA/Cursor.png" 
               alt="Cursor Logo" 
               className="h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" 
               referrerPolicy="no-referrer"
             />
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div 
        variants={imageEntranceVariants} 
        className="absolute right-0 top-0 bottom-0 w-full lg:w-[50%] flex justify-end items-center pointer-events-none z-0 overflow-hidden border-y border-l border-white/10 shadow-2xl rounded-l-2xl"
      >
        <img 
          src="/src/assets/images/Cursor cortada.png" 
          alt="Implementação com Cursor" 
          className="h-[85vh] lg:h-full w-[calc(100%+32px)] max-w-none object-cover object-right mr-[-32px] pointer-events-auto cursor-pointer transition-transform hover:scale-[1.01]"
          onClick={() => {
            window.dispatchEvent(new CustomEvent('open-lightbox', {
              detail: { images: ["/src/assets/images/Cursor cortada.png"], index: 0 }
            }));
          }}
        />
      </motion.div>
    </>
  );
}

export function SlideDefinindoVersoes() {
  const images = [
    { src: "/src/assets/images/Imagens versionamento/Mapeamento de campos 1.png", alt: "Mapeamento 1" },
    { src: "/src/assets/images/Imagens versionamento/Mapeamento de campos 2.png", alt: "Mapeamento 2" },
    { src: "/src/assets/images/Imagens versionamento/v1 e v2 .png", alt: "v1 e v2" },
    { src: "/src/assets/images/Imagens versionamento/v3 e v4.png", alt: "v3 e v4" },
  ];

  return (
    <motion.div 
      variants={containerVariants}
      className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center h-full w-full max-w-[1240px] mx-auto px-6 py-2"
    >
      <div className="space-y-6 lg:col-span-7 relative z-10">
        <motion.span variants={itemVariants} className="text-[#00CBC6] font-mono text-xs tracking-widest uppercase block">
          Estratégia
        </motion.span>
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
          Definição de versões
        </motion.h2>
        <motion.p variants={itemVariants} className="text-[#94A3B8] text-base leading-relaxed font-light">
          Para tornar a transformação viável, priorizamos com ajuda dos stakeholders um conjunto de iniciativas que resolvesse as principais dores dos clientes e, ao mesmo tempo, criasse a fundação para a unificação da plataforma.
        </motion.p>
        
        <motion.div variants={itemVariants} className="space-y-3">
          <p className="text-white font-medium text-sm">Os primeiros recortes foram:</p>
          <ul className="space-y-2">
            {[
              { title: 'Pessoas e Contas', desc: 'unificação do cadastro de usuários entre todos os produtos.' },
              { title: 'Entidades', desc: 'consolidação da estrutura organizacional e seus diferentes modelos.' },
              { title: 'Posições', desc: 'continuidade do trabalho já iniciado, agora alinhado à estratégia de unificação.' },
              { title: 'Importação Unificada', desc: 'um único ponto de entrada para distribuir dados para todo o ecossistema.' },
            ].map((item, idx) => (
              <li key={idx} className="flex gap-2 text-sm text-[#94A3B8] font-light leading-snug">
                <span className="text-[#00CBC6] font-bold shrink-0">•</span>
                <span><strong className="text-slate-300 font-medium">{item.title}:</strong> {item.desc}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-3 pt-2">
          <p className="text-white font-medium text-sm">A estratégia era evoluir em etapas:</p>
          <div className="flex flex-row items-stretch gap-2 mt-4">
            <div className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 text-sm text-[#94A3B8] font-light leading-snug">
              <strong className="text-white font-medium">1.</strong> Centralizar o cadastro das informações.
            </div>
            <div className="flex-shrink-0 text-[#00CBC6] self-center">
              <ArrowRight size={16} />
            </div>
            <div className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 text-sm text-[#94A3B8] font-light leading-snug">
              <strong className="text-white font-medium">2.</strong> Transformar essa central na principal fonte de dados.
            </div>
            <div className="flex-shrink-0 text-[#00CBC6] self-center">
              <ArrowRight size={16} />
            </div>
            <div className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 text-sm text-[#94A3B8] font-light leading-snug">
              <strong className="text-white font-medium">3.</strong> Concentrar toda a gestão administrativa em um único ambiente.
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        variants={visualVariants}
        className="lg:col-span-5 flex flex-col gap-8 h-full justify-center relative items-center -mt-18"
      >
        <div className="relative w-full max-w-md aspect-[16/9] group cursor-zoom-in" onClick={() => window.dispatchEvent(new CustomEvent('open-lightbox', { detail: { images: images.map(i => i.src), index: 0 } }))}>
          <img 
            src={images[0].src} 
            alt={images[0].alt} 
            className="absolute top-0 left-0 w-11/12 rounded-xl border border-white/10 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 group-hover:-translate-x-2"
            referrerPolicy="no-referrer"
          />
          <img 
            src={images[1].src} 
            alt={images[1].alt} 
            className="absolute top-8 right-0 w-11/12 rounded-xl border border-white/10 shadow-2xl transition-transform duration-500 group-hover:translate-y-2 group-hover:translate-x-2"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative w-full max-w-md aspect-[16/9] group cursor-zoom-in -mt-8" onClick={() => window.dispatchEvent(new CustomEvent('open-lightbox', { detail: { images: images.map(i => i.src), index: 2 } }))}>
          <img 
            src={images[2].src} 
            alt={images[2].alt} 
            className="absolute top-0 left-0 w-11/12 rounded-xl border border-white/10 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 group-hover:-translate-x-2"
            referrerPolicy="no-referrer"
          />
          <img 
            src={images[3].src} 
            alt={images[3].alt} 
            className="absolute top-8 right-0 w-11/12 rounded-xl border border-white/10 shadow-2xl transition-transform duration-500 group-hover:translate-y-2 group-hover:translate-x-2"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function SlideGoogleAIStudio() {
  return (
    <motion.div 
      variants={containerVariants}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center h-full w-full max-w-[1240px] mx-auto px-6 py-2"
    >
      <div className="space-y-6 lg:col-span-5 relative z-10">
        <motion.span variants={itemVariants} className="text-[#00CBC6] font-mono text-xs tracking-widest uppercase block">
          Recorte & Versionamento
        </motion.span>
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
          Simulando Cenários no Google AI Studio
        </motion.h2>
        <motion.p variants={itemVariants} className="text-[#94A3B8] text-base leading-relaxed font-light">
          Antes de fazer uma versão final, utilizei o Google AI Studio para testar exaustivamente o comportamento da arquitetura sob diferentes versões e evoluções da funcionalidade.
        </motion.p>
        <motion.p variants={itemVariants} className="text-[#94A3B8] text-base leading-relaxed font-light">
          Essa simulação rápida de regras de negócio me permitiu fazer o recorte preciso do escopo do MVP e definir o versionamento seguro da iniciativa.
        </motion.p>
      </div>

      {/* Visual Workspace representing Google AI Studio layout with spaces for images */}
      <motion.div 
        variants={visualVariants}
        className="lg:col-span-7 flex justify-center items-center w-full relative"
      >
        <div className="relative w-full h-auto">
          <img 
            src="/src/assets/images/Imagem recorte/Base.png" 
            alt="Google AI Studio Base" 
            className="w-full h-auto object-contain rounded-2xl shadow-2xl" 
            referrerPolicy="no-referrer"
          />
          
          <motion.img 
            initial={{ opacity: 0, y: 20, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            src="/src/assets/images/Imagem recorte/Flutuante 2.png" 
            alt="Menu Lateral" 
            className="absolute -bottom-10 -left-12 w-[28%] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.6)]" 
            referrerPolicy="no-referrer"
          />
          
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            src="/src/assets/images/Imagem recorte/Flutuante 1.png" 
            alt="Menu Dropdown" 
            className="absolute -top-12 -right-12 w-[30%] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.6)]" 
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}


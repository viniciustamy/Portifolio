import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { containerVariants, itemVariants, visualVariants } from './SlideVariants';
import { Users, Shield, Briefcase, Network, Layers, DollarSign, TrendingUp, Lock, Zap, Upload, FileText, ChevronDown, ChevronUp, Play, Monitor } from 'lucide-react';

export function Slide11() {
  return (
    <motion.div 
      variants={containerVariants}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full w-full max-w-6xl mx-auto px-6"
    >
      <div className="space-y-6">
        <motion.span variants={itemVariants} className="text-[#00CBC6] font-mono text-xs tracking-widest uppercase block">O Papel da IA</motion.span>
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
          Cada ferramenta, um papel específico
        </motion.h2>
        <motion.p variants={itemVariants} className="text-[#94A3B8] text-base leading-relaxed font-light">
          Aceleração ponta a ponta: do entendimento estrutural até a interface final.
        </motion.p>
      </div>
      <div className="space-y-4 w-full">
        {[
          { 
            tool: "NotebookLM", 
            desc: "Síntese de anos de pesquisa",
            logos: [
              "/src/assets/images/Logos IA/Notebook LM.svg"
            ]
          },
          { 
            tool: "Figma Make", 
            desc: "Tangibilizar o roadmap e Arquitetura",
            logos: [
              "/src/assets/images/Logos IA/Figma Make.png"
            ]
          },
          { 
            tool: "Google AI Studio", 
            desc: "Sandbox de regras de negócios",
            logos: [
              "/src/assets/images/Logos IA/Google IA Studio.png"
            ]
          },
          { 
            tool: "Cursor", 
            desc: "Interface quase final, em código",
            logos: [
              "/src/assets/images/Logos IA/Cursor.png"
            ]
          }
        ].map((item, i) => (
          <motion.div 
            key={i} 
            variants={{
              enter: { opacity: 0, x: 20 },
              center: { 
                opacity: 1, 
                x: 0, 
                transition: { type: 'spring', stiffness: 100, damping: 15, delay: i * 0.1 + 0.4 } 
              },
              exit: { opacity: 0, x: -10, transition: { duration: 0.2 } }
            }}
            className="flex gap-4 items-center bg-slate-950/40 border border-white/5 p-4 rounded-xl hover:border-[#00CBC6]/30 hover:bg-slate-900/50 transition-all duration-300 backdrop-blur-sm shadow-md"
          >
            {/* Logos Container */}
            <div className="flex items-center shrink-0">
              {item.logos.map((logoPath, logoIdx) => (
                <div 
                  key={logoIdx} 
                  className={`w-14 h-14 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center p-1.5 shadow-md shrink-0 relative ${
                    logoIdx > 0 ? "ml-[-12px] z-20 border-l border-white/20" : "z-10"
                  }`}
                >
                  <img 
                    src={logoPath} 
                    alt={item.tool} 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-white font-medium text-sm md:text-base tracking-tight mb-0.5">{item.tool}</h4>
              <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function Slide12() {
  return (
    <motion.div 
      variants={containerVariants}
      className="flex flex-col justify-center h-full w-full max-w-5xl mx-auto px-6 text-center"
    >
      <motion.span variants={itemVariants} className="text-[#00CBC6] font-mono text-xs tracking-widest uppercase mb-4 block">Acompanhamento</motion.span>
      <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-8 leading-tight max-w-4xl mx-auto">
        Indicadores e métricas pensadas antes do produto ir ao ar
      </motion.h2>
      
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {[
          { title: "Eficiência de Onboarding", desc: "Redução no tempo de implementação dos produtos e menor dependência do time de onboarding." },
          { title: "Impacto Financeiro", desc: "Impacto positivo na receita recurrente Penetração na base de clientes e novos clientes de contratando todo o ecossistema." },
          { title: "Satisfação (UX)", desc: "Acompanhamento rigoroso de CES, CSAT e SUS nos peridos respectivos." },
          { title: "Comportamento", desc: "Análise contínua dos eventos no GA e do Clarity (heatmaps e gravações)." }
        ].map((item, idx) => (
          <motion.div 
            key={idx} 
            variants={{
              enter: { opacity: 0, y: 15 },
              center: { 
                opacity: 1, 
                y: 0, 
                transition: { type: 'spring', stiffness: 100, damping: 15, delay: idx * 0.1 + 0.3 } 
              },
              exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
            }}
            className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl text-left"
          >
            <h4 className="text-sm font-semibold text-white mb-2">{item.title}</h4>
            <p className="text-xs text-[#94A3B8] leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export function Slide13() {
  return (
    <motion.div 
      variants={containerVariants}
      className="flex flex-col justify-center h-full w-full max-w-5xl mx-auto px-6"
    >
      <div className="text-center mb-10">
        <motion.span variants={itemVariants} className="text-[#00CBC6] font-mono text-xs tracking-widest uppercase mb-2 block">Resultados</motion.span>
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">+3 frentes de valor de negócio</motion.h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { metric: "Unificação", desc: "De 13 planilhas e 3 setups para uma estrutura centralizada 1." },
          { metric: "Penetração", desc: "Quase 3 mil clientes, 60% sem o ecossistema completo. Menos fricção = mais up-sell e cross-sell." },
          { metric: "Ecossitema", desc: "Remove o atrito de configuração repetitiva a Gupy pode afirmar que é um Ecossistema." }
        ].map((item, idx) => (
          <motion.div 
            key={idx} 
            variants={{
              enter: { opacity: 0, y: 15 },
              center: { 
                opacity: 1, 
                y: 0, 
                transition: { type: 'spring', stiffness: 100, damping: 15, delay: idx * 0.08 + 0.3 } 
              },
              exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
            }}
            className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl hover:border-[#00CBC6]/30 transition-all duration-300"
          >
            <div className="text-xl font-bold text-[#00CBC6] mb-3">{item.metric}</div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function Slide14() {
  const [isStructureExpanded, setIsStructureExpanded] = React.useState(true);
  const [selectedItem, setSelectedItem] = React.useState('entidades');

  const menuItems = [
    { id: 'usuarios', label: 'Usuários', icon: Users },
    { id: 'perfis', label: 'Perfis de Acesso', icon: Shield },
    { id: 'grupos', label: 'Grupos', icon: Users },
    { 
      id: 'estrutura', 
      label: 'Estrutura', 
      icon: Briefcase,
      hasSubmenu: true,
      submenu: [
        { id: 'arvore', label: 'Árvore', icon: Network },
        { id: 'posicoes', label: 'Posições', icon: Layers },
        { id: 'entidades', label: 'Entidades', icon: DollarSign },
        { id: 'analise', label: 'Análise', icon: TrendingUp },
      ]
    },
    { id: 'seguranca', label: 'Segurança', icon: Lock },
    { id: 'apis', label: 'Gestão de APIs', icon: Zap },
    { id: 'importacoes', label: 'Importações', icon: Upload },
    { id: 'auditoria', label: 'Auditoria', icon: FileText },
  ];

  return (
    <motion.div 
      variants={containerVariants}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full w-full max-w-6xl mx-auto px-6"
    >
      <div className="space-y-6">
        <motion.span variants={itemVariants} className="text-[#00CBC6] font-mono text-xs tracking-widest uppercase block">Legado</motion.span>
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
          A base para os próximos dois anos
        </motion.h2>
        <motion.p variants={itemVariants} className="text-[#94A3B8] text-base leading-relaxed font-light">
          A estruturação de roadmap deixa um caminho pavimentado de proximos passos. Um conteudo que pode gerar anos de roadmap
        </motion.p>
      </div>
      <motion.div 
        variants={visualVariants} 
        className="flex justify-center items-center w-full relative z-20 pointer-events-auto"
      >
        <div className="w-full max-w-[360px] md:max-w-[400px] bg-[#000B15]/95 border border-white/10 rounded-2xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col relative group backdrop-blur-md">
          {/* Mac Window Titlebar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 bg-[#00050d]">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">Gupy Design System</span>
            <span className="text-[9px] font-mono bg-[#00CBC6]/10 text-[#00CBC6] px-2 py-0.5 rounded border border-[#00CBC6]/20">Simulador</span>
          </div>

          {/* Sidebar Menu Content */}
          <div className="p-6 md:p-8 flex flex-col justify-between select-none">
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-white text-lg font-bold tracking-tight">Administração Global</h3>
              <p className="text-[#94A3B8] text-xs leading-relaxed mt-1.5 font-light">
                Gerencie as configurações que afetam os produtos e usuários da plataforma.
              </p>
            </div>

            {/* List */}
            <div className="space-y-1">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                const isSelected = selectedItem === item.id;
                
                if (item.hasSubmenu) {
                  return (
                    <div key={item.id} className="space-y-1">
                      {/* Parent Item */}
                      <button
                        onClick={() => setIsStructureExpanded(!isStructureExpanded)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-[#94A3B8] hover:bg-white/[0.03] hover:text-white transition-all duration-200`}
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-4 h-4 text-slate-400 shrink-0" />
                          <span className="font-semibold">{item.label}</span>
                        </div>
                        {isStructureExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </button>

                      {/* Submenu Items */}
                      <AnimatePresence initial={false}>
                        {isStructureExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="overflow-hidden pl-4 space-y-1"
                          >
                            {item.submenu?.map((sub) => {
                              const SubIcon = sub.icon;
                              const isSubSelected = selectedItem === sub.id;
                              return (
                                <button
                                  key={sub.id}
                                  onClick={() => setSelectedItem(sub.id)}
                                  className={`w-full flex items-center gap-3 pl-4 pr-3 py-2 rounded-lg text-xs transition-all duration-200 ${
                                    isSubSelected
                                      ? 'border border-white/20 bg-white/5 text-white font-semibold shadow-md shadow-black/20'
                                      : 'text-[#94A3B8]/80 hover:bg-white/[0.02] hover:text-white'
                                  }`}
                                >
                                  <SubIcon className="w-3.5 h-3.5 shrink-0" />
                                  <span>{sub.label}</span>
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-all duration-200 ${
                      isSelected
                        ? 'border border-white/20 bg-white/5 text-white font-semibold shadow-md shadow-black/20'
                        : 'text-[#94A3B8] hover:bg-white/[0.03] hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-semibold">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Slide15() {
  return (
    <motion.div 
      variants={containerVariants}
      className="flex flex-col items-center justify-center text-center h-full w-full max-w-3xl mx-auto px-6"
    >
      <motion.div
        variants={{
          enter: { scale: 0.8, opacity: 0 },
          center: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 120, delay: 0.2 } },
          exit: { scale: 0.8, opacity: 0 }
        }}
        className="w-16 h-16 rounded-full bg-[#00CBC6]/10 border border-[#00CBC6]/30 flex items-center justify-center mb-8"
      >
        <span className="text-2xl text-[#00CBC6]">✦</span>
      </motion.div>
      <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
        O maior resultado não foram só as interfaces
      </motion.h2>
      <motion.p variants={itemVariants} className="text-base text-[#94A3B8] font-light max-w-lg leading-relaxed mb-8">
        Foi transformar um projeto de anos, com interpretações divergentes, em uma direção única. Este projeto vai guiar os próximos passos e talvez anos da plataforma. Habilitando o maior objetivo da empresa. Ser um Ecossistema completo pro RH
      </motion.p>
      <motion.div variants={itemVariants} className="text-xs font-mono text-[#64748B] border-t border-white/10 pt-6 w-full max-w-xs mx-auto">
        <p className="text-slate-400 font-semibold">Vinícius Tamy</p>
        <p className="mt-1 text-slate-500">viniciusttamy@gmail.com</p>
      </motion.div>
    </motion.div>
  );
}

export function SlideVideoCursor() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.log("Video play interrupted:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      className="flex flex-col items-center justify-center space-y-4 h-full w-full max-w-4xl mx-auto px-6 py-2"
    >
      {/* Visual Window with Video (Large, Single Column) */}
      <motion.div 
        variants={visualVariants}
        className="w-full flex justify-center items-center relative"
      >
        <div className="w-full bg-[#00050d] border border-white/10 rounded-2xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col backdrop-blur-md relative group">
          {/* Windows bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-slate-950/80">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00CBC6] animate-pulse" />
              <span>Video_Cursor.mov</span>
            </div>
            <span className="text-[9px] font-mono bg-[#00CBC6]/10 text-[#00CBC6] px-2 py-0.5 rounded border border-[#00CBC6]/20">1080p</span>
          </div>

          {/* Video Container */}
          <div className="relative aspect-[16/9] bg-slate-950 flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src="/src/assets/Video Cursor.mov"
              className="w-full h-full object-cover"
              controls
              loop
              muted
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Custom Overlay Play Button when paused */}
            {!isPlaying && (
              <button 
                onClick={togglePlay}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#00CBC6]/90 hover:bg-[#00CBC6] text-[#0b0e10] flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer z-20 group-hover:opacity-100"
                aria-label="Play video"
              >
                <Play className="w-6 h-6 fill-[#0b0e10] translate-x-0.5" />
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Simple Legend/Caption beneath */}
      <motion.p 
        variants={itemVariants}
        className="text-center text-xs text-[#94A3B8] font-light max-w-xl leading-relaxed mt-2"
      >
        Nevegaçõa no protótipo desenvolvido no cursor conectado com o DS.
      </motion.p>
    </motion.div>
  );
}


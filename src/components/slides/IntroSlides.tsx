import React from 'react';
import { motion } from 'motion/react';
import { containerVariants, itemVariants, visualVariants } from './SlideVariants';

export function Slide0() {
  return (
    <motion.div 
      variants={containerVariants}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full w-full max-w-6xl mx-auto px-6"
    >
      <motion.div variants={visualVariants} className="flex justify-center items-center w-full">
        <div className="relative group max-w-sm w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/[0.02]">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00CBC6] to-cyan-500 rounded-2xl blur opacity-15 group-hover:opacity-25 transition duration-500"></div>
          <img 
            src="/profile.jpg" 
            alt="Vinicius Tamy" 
            className="relative w-full h-full object-cover rounded-2xl transition-all duration-700"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>

      <div className="space-y-6">
        <div className="space-y-4">
          <motion.span variants={itemVariants} className="text-4xl md:text-5xl font-serif font-bold text-[#00CBC6] tracking-tight leading-tight block">Olá, eu sou</motion.span>
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            o Tamy
          </motion.h1>
          <motion.p variants={itemVariants} className="text-[#00CBC6] font-mono text-sm tracking-wide">
            Designer de produtos • Volta Redonda-RJ.
          </motion.p>
          <motion.p variants={itemVariants} className="text-[#94A3B8] text-base leading-relaxed font-light">
            12 anos dentro do design onde dediquei os últimos 6 anos especificamente para idealizar, validar e escalar produtos complexos no ecossistema de Recursos Humanos (RH) e Departamento Pessoal (DP), resolvendo dores operacionais e gerando valor estratégico de ponta a ponta. Tenho sido um designer IA first acompanhando a evolução do mercado e me jogando de cabeça em plataforma como, Lovable, Claude, Cursor, IA Studio Etc.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

export function Slide1() {
  return (
    <motion.div 
      variants={containerVariants}
      className="flex flex-col h-full w-full max-w-[1240px] mx-auto px-6 md:px-12 justify-center"
    >
      <div className="mb-8 md:mb-8">
        <motion.span variants={itemVariants} className="text-[#00CBC6] font-mono text-xs tracking-widest uppercase block mb-3">Carreira</motion.span>
        <motion.h2 variants={itemVariants} className="text-4xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
          Minha Trajetória
        </motion.h2>
      </div>
      
      <motion.div variants={visualVariants} className="relative w-full overflow-x-auto custom-scrollbar pb-8">
        {/* Horizontal Timeline Line */}
        <div className="absolute top-[7px] left-[7px] right-0 h-[1px] bg-white/20 z-0 hidden md:block"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
          
          {/* Zoyca */}
          <div className="relative pt-10">
            <div className="hidden md:flex absolute top-0 left-0 w-3.5 h-3.5 rounded-full bg-white z-10"></div>
            <div>
              <div className="flex items-center gap-3 mb-6">
              <h4 className="text-lg font-serif font-bold text-white">
                Zoyca
              </h4>

              <span className="text-[10px] font-mono bg-white/10 text-slate-300 px-2 py-1 rounded uppercase tracking-wider font-bold">
                2014 – 2016
              </span>
            </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-[11px] lg:text-xs font-medium text-white">Graphic & Brand Designer</h5>
                  <p className="text-[10px] lg:text-[11px] text-[#94A3B8] mt-1.5 leading-relaxed font-light">Criação de identidades visuais, branding e materiais gráficos para diferentes clientes.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tract Co */}
          <div className="relative pt-10">
            <div className="hidden md:flex absolute top-0 left-0 w-3.5 h-3.5 rounded-full bg-white z-10"></div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <h4 className="text-lg font-serif font-bold text-white">
                  Tract Co
                </h4>

                <span className="text-[10px] font-mono bg-white/10 text-slate-300 px-2 py-1 rounded uppercase tracking-wider font-bold">
                  2016 – 2021
                </span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h5 className="text-[11px] lg:text-xs font-medium text-white">Product Designer <span className="font-normal text-[#94A3B8]">(2019 – 2021)</span></h5>
                  <p className="text-[10px] lg:text-[11px] text-[#94A3B8] mt-1.5 leading-relaxed font-light">Pesquisa, prototipação e evolução de produtos digitais para diferentes clientes e startups.</p>
                </div>
                <div>
                  <h5 className="text-[11px] lg:text-xs font-medium text-white">Graphic & Brand Designer <span className="font-normal text-[#94A3B8]">(2016 – 2019)</span></h5>
                  <p className="text-[10px] lg:text-[11px] text-[#94A3B8] mt-1.5 leading-relaxed font-light">Projetos de branding, identidade visual, interfaces web e sites institucionais.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Umamão */}
          <div className="relative pt-10">
            <div className="hidden md:flex absolute top-0 left-0 w-3.5 h-3.5 rounded-full bg-white z-10"></div>
            <div>
              <div className="flex items-center gap-3 mb-6">
              <h4 className="text-lg font-serif font-bold text-white">
                Umamão
              </h4>

              <span className="text-[10px] font-mono bg-white/10 text-slate-300 px-2 py-1 rounded uppercase tracking-wider font-bold">
                2019 – 2021
              </span>
            </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-[11px] lg:text-xs font-medium text-white">Product Designer</h5>
                  <p className="text-[10px] lg:text-[11px] text-[#94A3B8] mt-1.5 leading-relaxed font-light">Construção da startup do MVP à validação de mercado, conduzindo discovery, UX, prototipação e evolução do produto.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Gupy */}
          <div className="relative pt-10">
            <div className="hidden md:flex absolute top-0 left-0 w-3.5 h-3.5 rounded-full bg-[#00CBC6] z-10"></div>
            <div>
              <div className="flex items-center gap-3 mb-6">
              <h4 className="text-lg font-serif font-bold text-white">
               Gupy
               </h4>

              <span className="text-[10px] font-mono bg-[#00CBC6]/10 text-[#00CBC6] px-2 py-1 rounded uppercase tracking-wider font-bold">
               2021 – 2026
              </span>
            </div>
              
              <div className="space-y-6">
                <div>
                  <h5 className="text-[11px] lg:text-xs font-medium text-white">Staff Product Designer <span className="font-normal text-[#94A3B8]">(2025 – 2026)</span></h5>
                  <p className="text-[10px] lg:text-[11px] text-[#94A3B8] mt-1.5 leading-relaxed font-light">Estratégia de produtos transversais, Admin Global, Dashboards de Admissão e iniciativas de ecossistema.</p>
                </div>
                <div>
                  <h5 className="text-[11px] lg:text-xs font-medium text-white">Design Lead <span className="font-normal text-[#94A3B8]">(2024 – 2025)</span></h5>
                  <p className="text-[10px] lg:text-[11px] text-[#94A3B8] mt-1.5 leading-relaxed font-light">Liderança de designers em Performance & Cross Products, evolução do módulo de Metas & OKRs e operação orientada por ciclos.</p>
                </div>
                <div>
                  <h5 className="text-[11px] lg:text-xs font-medium text-white">Senior Product Designer <span className="font-normal text-[#94A3B8]">(2023 – 2024)</span></h5>
                  <p className="text-[10px] lg:text-[11px] text-[#94A3B8] mt-1.5 leading-relaxed font-light">Redesign da plataforma de Performance, evolução das devolutivas e transformação da visão do produto para jornadas orientadas por ciclos.</p>
                </div>
                <div>
                  <h5 className="text-[11px] lg:text-xs font-medium text-white">Product Designer (Junior/Pleno) <span className="font-normal text-[#94A3B8]">(2021 – 2023)</span></h5>
                  <p className="text-[10px] lg:text-[11px] text-[#94A3B8] mt-1.5 leading-relaxed font-light">Recrutamento & Seleção e Admissão, liderando discovery, novas funcionalidades, Banco de Talentos, Lista Segmentada e validação do eSocial.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}

export function Slide2({ onNextSlide }: { onNextSlide?: () => void }) {
  return (
    <motion.div 
      variants={containerVariants}
      className="flex flex-col justify-center h-full w-full max-w-5xl mx-auto px-6"
    >
      <div className="text-center mb-6">
        <motion.span variants={itemVariants} className="text-[#00CBC6] font-mono text-xs tracking-widest uppercase mb-2 block">Cases</motion.span>
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">Meus Cases</motion.h2>
        <motion.p variants={itemVariants} className="text-sm text-[#94A3B8] font-light max-w-xl mx-auto mt-2 leading-relaxed">
          Alguns dos principais desafios que liderei nos últimos anos.
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: "Dashboard de Admissão", tag: "Case 1", desc: "Transição do dashboard de análise histórica para uma ferramenta de controle operacional e prevenção de riscos em tempo real." },
          { title: "Avaliação de Desempenho", tag: "Case 2", desc: "Nativização do fluxo de devolutivas de performance apoiada por IA, gerando 95% de adoção entre gestores e eliminando planilhas." },
          { title: "Recuperação de senha self-service (KBA)", tag: "Case 3", desc: "Transformação de um processo manual em self-service através do fluxo de recuperação via Knowledge-Based Authentication." },
          { title: "Admin Global", tag: "Case 4", desc: "Unificando a administração entre produtos para reduzir esforço de implantação e criar uma base escalável para crescimento" }
        ].map((project, idx) => (
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
            onClick={idx === 3 ? onNextSlide : undefined}
            className={`bg-white/[0.01] border border-white/5 p-8 rounded-xl flex flex-col justify-between hover:border-[#00CBC6]/30 hover:bg-white/[0.02] transition-all duration-300 group ${idx === 3 ? 'cursor-pointer' : ''}`}
          >
            <div>
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-semibold text-white group-hover:text-[#00CBC6] transition-colors">{project.title}</h4>
              </div>
              <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed font-light">{project.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

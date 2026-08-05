const fs = require('fs');

const caseSlidesPath = './src/components/slides/CaseSlides1.tsx';
let caseSlidesContent = fs.readFileSync(caseSlidesPath, 'utf8');

const slideDorCrescimentoCode = `
export function SlideDorCrescimento() {
  return (
    <motion.div 
      variants={containerVariants}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full w-full max-w-6xl mx-auto px-6"
    >
      <div className="space-y-6">
        <motion.span variants={itemVariants} className="text-[#00CBC6] font-mono text-xs tracking-widest uppercase block">
          A dor do crescimento
        </motion.span>
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
          O problema de gerenciar as mesmas informações em locais diferentes
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

`;

if (!caseSlidesContent.includes('SlideDorCrescimento')) {
  caseSlidesContent += slideDorCrescimentoCode;
  fs.writeFileSync(caseSlidesPath, caseSlidesContent, 'utf8');
  console.log('Added SlideDorCrescimento to CaseSlides1.tsx');
} else {
  console.log('SlideDorCrescimento already exists');
}

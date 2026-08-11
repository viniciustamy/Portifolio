import { Link } from 'react-router-dom';
import { Briefcase, Heart, MapPin, Palette, Wrench, Lightbulb, Instagram, Linkedin, ArrowLeft } from 'lucide-react';
import perfilImg from '../assets/images/perfil 2.jpg';
import { motion } from 'motion/react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function About() {
  useDocumentTitle('Sobre Mim');
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="bg-[#f9f8f6] min-h-screen">
      <motion.div 
        className="w-full relative z-10 max-w-[1240px] mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-8 pt-8" variants={itemVariants}>
          <Link to="/" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#787265] hover:text-[#2C3539] transition-colors group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Voltar para o início
          </Link>
        </motion.div>
        
        {/* Profile Card / Header */}
        <motion.div className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-center" variants={itemVariants}>
          <div className="flex flex-col gap-3 text-center md:text-left order-2 md:order-1">
            <div>
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-2 justify-center md:justify-start">
                <h1 className="font-serif text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] font-bold text-[#2C3539] tracking-tight leading-none">
                  Vinicius Tamy
                </h1>
              </div>
              <p className="text-[#787265] text-lg font-medium mb-1">
                30 anos - Virginiano
              </p>
              <p className="text-[#006266] text-xl font-medium tracking-wide mb-6">
                Volta Redonda - Rio de Janeiro
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4 w-full sm:w-auto">
                <a 
                  href="https://www.instagram.com/viniciustamy" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 gap-2 rounded-full border border-[#DCD7CA] bg-white text-[#2C3539] hover:text-[#E1306C] hover:border-[#E1306C] transition-all shrink-0 w-full sm:w-auto"
                  title="Instagram"
                >
                  <Instagram size={20} />
                  <span className="font-medium text-sm">@viniciustamy</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/viniciustamy" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 gap-2 rounded-full border border-[#DCD7CA] bg-white text-[#2C3539] hover:text-[#0077b5] hover:border-[#0077b5] transition-all shrink-0 w-full sm:w-auto"
                  title="LinkedIn"
                >
                  <Linkedin size={20} />
                  <span className="font-medium text-sm">/viniciustamy</span>
                </a>
              </div>
            </div>
          </div>
          <div className="w-full h-[300px] md:h-[400px] order-1 md:order-2">
            <img 
              src={perfilImg} 
              alt="Vinicius Tamy" 
              className="w-full h-full object-cover rounded-xl shadow-sm border border-[#EBE7DD]"
            />
          </div>
        </motion.div>

        <motion.div className="prose prose-lg max-w-none text-[#4A5559] leading-[1.8] text-lg md:text-xl" variants={itemVariants}>
          <h3 className="font-serif text-[24px] leading-[32px] font-bold text-[#2C3539] mt-12 mb-6 flex items-center gap-3 not-prose">
            <MapPin className="text-[#006266]" size={28} /> Minhas origens
          </h3>
          <p className="mb-6 text-[16px] leading-[28px]">
            Cresci em Volta Redonda, no interior do Rio de Janeiro, filho de uma faxineira e de um operário da siderúrgica. Foi com meus pais que aprendi valores que levo até hoje: dedicação, curiosidade e a vontade de colocar a mão na massa.
          </p>

          <h3 className="font-serif text-2xl font-bold text-[#2C3539] mt-10 mb-4 flex items-center gap-2 not-prose">
            <Palette className="text-[#006266]" size={22} /> Como cheguei ao Design
          </h3>
          <p className="mb-6 text-[16px] leading-[28px]">
            Minha primeira oportunidade veio em uma agência de publicidade, onde descobri que queria seguir carreira em Design. Me formei pela FOA em 2018 e, após alguns anos atuando em agências, fiz a transição para Produto em 2020.
          </p>
          <p className="mb-6 text-[16px] leading-[28px]">
            Foi nesse momento que encontrei o tipo de desafio que mais me motiva: entender pessoas, resolver problemas complexos e transformar descobertas em produtos que geram impacto.
          </p>

          <h3 className="font-serif text-2xl font-bold text-[#2C3539] mt-10 mb-4 flex items-center gap-2 not-prose">
            <Wrench className="text-[#006266]" size={22} /> Como gosto de trabalhar
          </h3>
          <p className="mb-6 text-[16px] leading-[28px]">
            Sou um designer generalista, com atuação de ponta a ponta. Gosto de participar desde a descoberta até a entrega e acredito que um produto só começa de verdade quando chega às mãos das pessoas.
          </p>
          <p className="mb-6 text-[16px] leading-[28px]">
            Nos últimos anos, a Inteligência Artificial se tornou parte do meu processo de trabalho. Uso IA para acelerar pesquisas, explorar ideias, criar protótipos e validar hipóteses, sempre com foco em aprender mais rápido e tomar melhores decisões.
          </p>
          <p className="mb-6 text-[16px] leading-[28px]">
            Acredito em processos bem estruturados, mas também em ciclos curtos de aprendizado. Para mim, o melhor feedback é aquele que vem do uso real do produto.
          </p>

          <h3 className="font-serif text-2xl font-bold text-[#2C3539] mt-10 mb-4 flex items-center gap-2 not-prose">
            <Heart className="text-[#006266]" size={22} /> Fora do trabalho
          </h3>
          <p className="mb-6 text-[16px] leading-[28px]">
            Continuo sendo alguém que gosta de construir coisas. Tenho uma impressora 3D, desenvolvo projetos pessoais, crio pequenos aplicativos e jogos de tabuleiro e estou sempre aprendendo alguma tecnologia ou ferramenta nova.
          </p>
          <p className="mb-6 text-[16px] leading-[28px]">
            Também sou apaixonado por esportes. Já pratiquei rugby por quase 16 anos, além de beisebol, natação, corrida, ciclismo, tênis e futevôlei. O esporte me ensinou disciplina, colaboração e resiliência — valores que também levo para o meu trabalho.
          </p>
          <p className="mb-6 text-[16px] leading-[28px]">
            Viajar é outra grande paixão. Cresci em uma família simples e conhecer outros países era um sonho distante. Hoje, poder explorar novas culturas é uma das maiores conquistas que o Design me proporcionou.
          </p>

          <h3 className="font-serif text-2xl font-bold text-[#2C3539] mt-10 mb-4 flex items-center gap-2 not-prose">
            <Lightbulb className="text-[#006266]" size={22} /> Em poucas palavras
          </h3>
          <p className="mb-6 text-[16px] leading-[28px]">
            Se existe algo que resume minha trajetória, é a vontade de construir. Construir produtos, experiências, ferramentas e soluções que façam diferença para as pessoas. É essa curiosidade que me move desde a infância e que continua guiando minha forma de trabalhar até hoje.
          </p>
        </motion.div>

        <motion.div className="border-t border-[#EBE7DD] pt-12 mt-12" variants={itemVariants}>
          
          <div className="space-y-10">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#2C3539] mb-6 flex items-center gap-2">
                <Briefcase className="text-[#006266]" size={22} /> Minha Trajetória
              </h3>
              
              <div className="space-y-8">
                {/* Gupy */}
                <div className="relative pl-6 border-l-2 border-[#EBE7DD] hover:border-[#006266] transition-colors pb-1">
                  <div className="absolute w-3 h-3 bg-[#006266] rounded-full -left-[7px] top-[6px]"></div>
                  <h4 className="font-bold text-[#2C3539] text-base">Gupy <span className="text-xs font-semibold tracking-wider text-[#787265] uppercase ml-1">[2021 – 2026]</span></h4>
                  
                  <div className="mt-4 space-y-4">
                    <div>
                      <h5 className="text-sm font-bold text-[#2C3539]">Staff Product Designer <span className="font-normal text-[#787265]">(2025 – 2026)</span></h5>
                      <p className="text-sm text-[#4A5559] leading-relaxed mt-1">Estratégia de produtos transversais, Admin Global, Dashboards de Admissão e iniciativas de ecossistema.</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-[#2C3539]">Design Lead <span className="font-normal text-[#787265]">(2024 – 2025)</span></h5>
                      <p className="text-sm text-[#4A5559] leading-relaxed mt-1">Liderança de designers em Performance & Cross Products, evolução do módulo de Metas & OKRs e operação orientada por ciclos.</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-[#2C3539]">Senior Product Designer <span className="font-normal text-[#787265]">(2023 – 2024)</span></h5>
                      <p className="text-sm text-[#4A5559] leading-relaxed mt-1">Redesign da plataforma de Performance, evolução das devolutivas e transformação da visão do produto para jornadas orientadas por ciclos.</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-[#2C3539]">Product Designer <span className="font-normal text-[#787265]">(2021 – 2023)</span></h5>
                      <p className="text-sm text-[#4A5559] leading-relaxed mt-1">Recrutamento & Seleção e Admissão, liderando discovery, novas funcionalidades, Banco de Talentos, Lista Segmentada e validação do eSocial.</p>
                    </div>
                  </div>
                </div>

                {/* Tract Co */}
                <div className="relative pl-6 border-l-2 border-[#EBE7DD] hover:border-[#006266] transition-colors pb-1">
                  <div className="absolute w-3 h-3 bg-[#CBC4B4] rounded-full -left-[7px] top-[6px]"></div>
                  <h4 className="font-bold text-[#2C3539] text-base">Tract Co <span className="text-xs font-semibold tracking-wider text-[#787265] uppercase ml-1">[2019 – 2021]</span></h4>
                  
                  <div className="mt-4 space-y-4">
                    <div>
                      <h5 className="text-sm font-bold text-[#2C3539]">Product Designer <span className="font-normal text-[#787265]">(2019 – 2021)</span></h5>
                      <p className="text-sm text-[#4A5559] leading-relaxed mt-1">Pesquisa, prototipação e evolução de produtos digitais para diferentes clientes e startups.</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-[#2C3539]">Graphic & Brand Designer <span className="font-normal text-[#787265]">(2016 – 2019)</span></h5>
                      <p className="text-sm text-[#4A5559] leading-relaxed mt-1">Projetos de branding, identidade visual, interfaces web e sites institucionais.</p>
                    </div>
                  </div>
                </div>

                {/* Umamão */}
                <div className="relative pl-6 border-l-2 border-[#EBE7DD] hover:border-[#006266] transition-colors pb-1">
                  <div className="absolute w-3 h-3 bg-[#CBC4B4] rounded-full -left-[7px] top-[6px]"></div>
                  <h4 className="font-bold text-[#2C3539] text-base">Umamão <span className="text-xs font-semibold tracking-wider text-[#787265] uppercase ml-1">[2019 – 2020]</span></h4>
                  
                  <div className="mt-4 space-y-4">
                    <div>
                      <h5 className="text-sm font-bold text-[#2C3539]">Product Designer</h5>
                      <p className="text-sm text-[#4A5559] leading-relaxed mt-1">Construção da startup do MVP à validação de mercado, conduzindo discovery, UX, prototipação e evolução do produto.</p>
                    </div>
                  </div>
                </div>

                {/* Zoyca Art & Design */}
                <div className="relative pl-6 border-l-2 border-[#EBE7DD] hover:border-[#006266] transition-colors pb-1">
                  <div className="absolute w-3 h-3 bg-[#CBC4B4] rounded-full -left-[7px] top-[6px]"></div>
                  <h4 className="font-bold text-[#2C3539] text-base">Zoyca Art & Design <span className="text-xs font-semibold tracking-wider text-[#787265] uppercase ml-1">[2014 – 2016]</span></h4>
                  
                  <div className="mt-4 space-y-4">
                    <div>
                      <h5 className="text-sm font-bold text-[#2C3539]">Graphic & Brand Designer</h5>
                      <p className="text-sm text-[#4A5559] leading-relaxed mt-1">Criação de identidades visuais, branding e materiais gráficos para diferentes clientes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

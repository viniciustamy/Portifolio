import { Link } from 'react-router-dom';
import { Briefcase, Heart, MapPin, Palette, Wrench, Lightbulb, Instagram, Linkedin, ArrowLeft } from 'lucide-react';
import { PhotoCarousel } from '../components/PhotoCarousel';
import { motion } from 'motion/react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const career = [
  {
    company: 'Gupy',
    period: '2021 – 2026',
    current: true,
    roles: [
      { title: 'Staff Product Designer', period: '2025 – 2026', desc: 'Estratégia de produtos transversais, Admin Global, Dashboards de Admissão e iniciativas de ecossistema.' },
      { title: 'Design Lead', period: '2024 – 2025', desc: 'Liderança de designers em Performance & Cross Products, evolução do módulo de Metas & OKRs e operação orientada por ciclos.' },
      { title: 'Senior Product Designer', period: '2023 – 2024', desc: 'Redesign da plataforma de Performance, evolução das devolutivas e transformação da visão do produto para jornadas orientadas por ciclos.' },
      { title: 'Product Designer', period: '2021 – 2023', desc: 'Recrutamento & Seleção e Admissão, liderando discovery, novas funcionalidades, Banco de Talentos, Lista Segmentada e validação do eSocial.' },
    ],
  },
  {
    company: 'Tract Co',
    period: '2016 – 2021',
    roles: [
      { title: 'Product Designer', period: '2019 – 2021', desc: 'Pesquisa, prototipação e evolução de produtos digitais para diferentes clientes e startups.' },
      { title: 'Graphic & Brand Designer', period: '2016 – 2019', desc: 'Projetos de branding, identidade visual, interfaces web e sites institucionais.' },
    ],
  },
  {
    company: 'Umamão',
    period: '2019 – 2020',
    roles: [
      { title: 'Product Designer', desc: 'Construção da startup do MVP à validação de mercado, conduzindo discovery, UX, prototipação e evolução do produto.' },
    ],
  },
  {
    company: 'Zoyca Art & Design',
    period: '2014 – 2016',
    roles: [
      { title: 'Graphic & Brand Designer', desc: 'Criação de identidades visuais, branding e materiais gráficos para diferentes clientes.' },
    ],
  },
];

function SectionTitle({ icon: Icon, children }: { icon: typeof MapPin; children: string }) {
  return (
    <h3 className="font-serif text-lg font-bold text-[#241510] mt-10 mb-3 flex items-center gap-2">
      <Icon className="text-[#9E4322]" size={18} /> {children}
    </h3>
  );
}

function P({ children }: { children: any }) {
  return <p className="mb-4 text-[14px] leading-[24px] text-[#4F4440]">{children}</p>;
}

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
    <div className="bg-[#F0EDE8] min-h-screen">
      <motion.div
        className="w-full relative z-10 max-w-[1100px] mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Duas colunas: foto grande à esquerda, fixa enquanto o conteúdo da direita rola */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
          <motion.div className="md:sticky md:top-8" variants={itemVariants}>
            {/* No mobile, o voltar fica acima da foto */}
            <Link to="/" className="md:hidden inline-flex items-center gap-2 text-[13px] font-semibold text-[#6F625B] hover:text-[#241510] transition-colors group mb-5">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Voltar
            </Link>
            <PhotoCarousel className="w-full aspect-[4/5] md:aspect-auto md:h-[calc(100vh-4rem)] rounded-2xl" />
          </motion.div>

          <div>
            <motion.div variants={itemVariants}>
              <Link to="/" className="hidden md:inline-flex items-center gap-2 text-[13px] font-semibold text-[#6F625B] hover:text-[#241510] transition-colors group mb-6">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Voltar
              </Link>
              <h1 className="font-serif text-[2.5rem] sm:text-[3rem] font-bold text-[#241510] tracking-tight leading-none">
                Vinicius Tamy
              </h1>
              <p className="text-[#6F625B] text-lg font-medium mt-4">31 anos - Virginiano</p>
              <p className="text-[#241510] text-lg font-medium mt-1">Volta Redonda - Rio de Janeiro</p>
              <div className="flex flex-row gap-3 mt-6">
                <a
                  href="https://www.instagram.com/viniciustamy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 sm:px-5 py-2.5 gap-2 rounded-full border border-[#E2DCD4] bg-white text-[#241510] hover:text-[#9E4322] hover:border-[#9E4322] transition-colors"
                  title="Instagram"
                >
                  <Instagram size={18} />
                  <span className="font-medium text-sm">@viniciustamy</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/viniciustamy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 sm:px-5 py-2.5 gap-2 rounded-full border border-[#E2DCD4] bg-white text-[#241510] hover:text-[#9E4322] hover:border-[#9E4322] transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin size={18} />
                  <span className="font-medium text-sm">/viniciustamy</span>
                </a>
              </div>
            </motion.div>

            {/* Trajetória primeiro: é o que quem visita procura antes */}
            <motion.div variants={itemVariants}>
              <SectionTitle icon={Briefcase}>Minha trajetória</SectionTitle>
              <div className="space-y-8">
                {career.map(job => (
                  <div key={job.company} className="relative pl-6 border-l-2 border-[#E2DCD4] hover:border-[#9E4322] transition-colors pb-1">
                    <div className={`absolute w-3 h-3 rounded-full -left-[7px] top-[6px] ${job.current ? 'bg-[#9E4322]' : 'bg-[#C9C0B6]'}`} />
                    <h4 className="font-bold text-[#241510] text-base">
                      {job.company} <span className="text-xs font-semibold text-[#6F625B] ml-1">{job.period}</span>
                    </h4>
                    <div className="mt-4 space-y-4">
                      {job.roles.map(role => (
                        <div key={role.title + (role.period ?? '')}>
                          <h5 className="text-sm font-bold text-[#241510]">
                            {role.title} {role.period && <span className="font-normal text-[#6F625B]">({role.period})</span>}
                          </h5>
                          <p className="text-sm text-[#4F4440] leading-relaxed mt-1">{role.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-4">
              <SectionTitle icon={MapPin}>Minhas origens</SectionTitle>
              <P>
                Cresci em Volta Redonda, no interior do Rio de Janeiro, filho de uma faxineira e de um operário da siderúrgica. Foi com meus pais que aprendi valores que levo até hoje: dedicação, curiosidade e a vontade de colocar a mão na massa.
              </P>

              <SectionTitle icon={Palette}>Como cheguei ao Design</SectionTitle>
              <P>
                Minha primeira oportunidade veio em uma agência de publicidade, onde descobri que queria seguir carreira em Design. Me formei pela UniFOA em 2018 e, depois de alguns anos atuando em agências, fiz a transição para Produto em 2019.
              </P>
              <P>
                Foi nesse momento que encontrei o tipo de desafio que mais me motiva: entender pessoas, resolver problemas complexos e transformar descobertas em produtos que geram impacto.
              </P>

              <SectionTitle icon={Wrench}>Como gosto de trabalhar</SectionTitle>
              <P>
                Sou um designer generalista, com atuação de ponta a ponta. Gosto de participar desde a descoberta até a entrega e acredito que um produto só começa de verdade quando chega às mãos das pessoas.
              </P>
              <P>
                Nos últimos anos, a Inteligência Artificial se tornou parte do meu processo de trabalho. Uso IA para acelerar pesquisas, explorar ideias, criar protótipos e validar hipóteses, sempre com foco em aprender mais rápido e tomar melhores decisões.
              </P>
              <P>
                Acredito em processos bem estruturados, mas também em ciclos curtos de aprendizado. Para mim, o melhor feedback é aquele que vem do uso real do produto.
              </P>

              <SectionTitle icon={Heart}>Fora do trabalho</SectionTitle>
              <P>
                Continuo sendo alguém que gosta de construir coisas. Tenho uma impressora 3D, desenvolvo projetos pessoais, crio pequenos aplicativos e jogos de tabuleiro e estou sempre aprendendo alguma tecnologia ou ferramenta nova.
              </P>
              <P>
                Também sou apaixonado por esportes. Já pratiquei rugby por quase 16 anos, além de beisebol, natação, corrida, ciclismo, tênis e futevôlei. O esporte me ensinou disciplina, colaboração e resiliência — valores que também levo para o meu trabalho.
              </P>
              <P>
                Viajar é outra grande paixão. Cresci em uma família simples e conhecer outros países era um sonho distante. Hoje, poder explorar novas culturas é uma das maiores conquistas que o Design me proporcionou.
              </P>

              <SectionTitle icon={Lightbulb}>Em poucas palavras</SectionTitle>
              <P>
                Se existe algo que resume minha trajetória, é a vontade de construir. Construir produtos, experiências, ferramentas e soluções que façam diferença para as pessoas. É essa curiosidade que me move desde a infância e que continua guiando minha forma de trabalhar até hoje.
              </P>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

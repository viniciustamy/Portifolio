import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { skills } from '../data';
import { ChevronRight } from 'lucide-react';
import { useProjects } from '../context/ProjectsContext';
import { motion, AnimatePresence } from 'motion/react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Home() {
  useDocumentTitle('Início');
  const { projects } = useProjects();
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const selectedSkill = skills.find(s => s.id === activeSkill);

  const blurSlideVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="w-full">
      {/* Sobre Mim / Hero Section — full-bleed com imagem colada na borda direita */}
      <div
        className="hero-grid relative mb-24 overflow-hidden"
        style={{
          marginLeft: 'calc(50% - 50vw)',
          marginRight: 'calc(50% - 50vw)',
          marginTop: 'calc(-1 * var(--page-py, 2.5rem))',
          width: '100vw',
        }}
      >
        {/* Left Column: Hero Content — 42% via grid */}
        <div
          className="hero-text-col flex flex-col justify-center py-8 md:py-12"
          style={{
            paddingLeft: 'max(var(--page-px, 3rem), calc((100vw - 1240px) / 2 + var(--page-px, 3rem)))',
            paddingRight: '1.5rem',
          }}
        >
          {/* Headline + tagline com animação de entrada e desfoque ao ser visto */}
          <div className="flex flex-col">
            <motion.h1
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 45, filter: "blur(12px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)" }
              }}
              transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-semibold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#2C3539] mb-8 tracking-tight leading-[0.95]"
            >
              Vinicius<br />Tamy
            </motion.h1>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 35, filter: "blur(10px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)" }
              }}
              transition={{ duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#006266] text-[24px] font-normal leading-[1.5] ml-4 mb-8"
            >
              Designer de problemas,<br />produtos e IA.
            </motion.p>
            <motion.span
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 25, filter: "blur(6px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)" }
              }}
              transition={{ duration: 1.4, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#787265] font-sans font-semibold text-[13px] tracking-wide block ml-4"
            >
              Volta Redonda - RJ
            </motion.span>
          </div>
        </div>

        {/* Right Column: Portrait — Animação de entrada suave com blur ao ser visto */}
        <motion.div
          className="hero-img-col min-h-[320px] overflow-hidden group cursor-pointer rounded-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, scale: 0.9, y: 45, filter: "blur(14px)" },
            visible: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
          }}
          whileHover={{
            scale: 1.03,
            y: -10,
            rotate: 1,
            boxShadow: "0 25px 35px -10px rgba(0, 0, 0, 0.25)"
          }}
          transition={{
            duration: 1.5,
            delay: 0.25,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          <img
            src="/profile.jpg"
            alt="Vinicius Tamy"
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-108"
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
          />
        </motion.div>
      </div>

      {/* Bio Section - texto descritivo abaixo da hero */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0, y: 35, filter: "blur(8px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" }
        }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="my-48 w-full"
      >
        <p className="text-[#4A5559] text-[20px] font-normal leading-[1.8] mb-6">
          Atuo como designer há 12 anos, sendo os últimos seis dedicados a produtos digitais. Sou apaixonado por pessoas, esportes, viagens, arte e tecnologia. Tenho um perfil end-to-end, onde gosto de tranformar problemas complexos em soluções simples, estratégicas e centradas no usuário. Tenho me tornado cada dia mais AI-first, utilizando IA para acelerar pesquisas, explorar ideias e criar protótipos, sempre mantendo o olhar humano como principal guia.
        </p>
        <Link
          to="/sobre-mim"
          className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#006266] hover:text-[#004d50] transition-colors group"
        >
          Conheça mais sobre mim <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>

      {/* Rest of the Page contents */}
      <div className="w-full">

        {/* Skills Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={blurSlideVariants}
          className="mb-14"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
            <h2 className="font-sans text-[13px] text-[#787265] font-semibold tracking-wide whitespace-nowrap">
              Navegue por habilidades
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <button
                  key={skill.id}
                  onClick={() => setActiveSkill(skill.id === activeSkill ? null : skill.id)}
                  className={`px-4 py-2 rounded-full text-[12px] font-semibold transition-all ${activeSkill === skill.id
                    ? 'bg-[#006266] text-white shadow-md'
                    : 'bg-white text-[#787265] border border-[#EBE7DD] hover:border-[#006266] hover:text-[#006266]'
                    }`}
                >
                  {skill.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active Skill Content */}
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, height: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, height: 'auto', filter: "blur(0px)" }}
              exit={{ opacity: 0, height: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#F9F8F6] border border-[#EBE7DD] rounded-2xl overflow-hidden"
            >
              <div className="p-5 sm:p-8 lg:p-10">
                <h3 className="text-xl font-bold text-[#2C3539] mb-4">{selectedSkill.name}</h3>
                <p className="text-[#4A5559] leading-relaxed mb-6 max-w-3xl">
                  {selectedSkill.description}
                </p>
                <div>
                  <p className="text-[11px] font-semibold tracking-widest text-[#787265] uppercase mb-4">
                    Onde apliquei
                  </p>
                  <ul className="space-y-3">
                    {selectedSkill.links.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.url}
                          className="inline-flex items-center gap-2 text-[#006266] hover:underline font-medium"
                        >
                          {link.label}
                          <ChevronRight size={14} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Seção 1: Cases Estruturados */}
        <div className="mt-14 mb-40">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={blurSlideVariants}
            className="mb-8"
          >
            <h2 className="font-serif text-[48px] leading-[1.1] font-semibold tracking-tight text-[#2C3539] mb-2">
              Cases
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-2"
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {projects.slice(0, 4).map((project) => (
              <motion.div key={project.id} variants={blurSlideVariants}>
                <Link
                  to={`/project/${project.id}`}
                  className={`block w-full aspect-[4/3] ${project.bg} rounded-xl p-6 sm:p-8 lg:p-10 flex flex-col justify-end relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl transition-all duration-300`}
                >
                  {project.thumbnail && (
                    <div
                      className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${project.thumbnail})` }}
                    />
                  )}
                  <div className={`relative z-10 mt-auto ${project.thumbnail ? 'opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300' : project.textColor}`}>
                    <div className={`flex flex-wrap items-center gap-2 mb-3`}>
                      <p className={`text-[10px] md:text-[11px] font-semibold tracking-widest ${project.thumbnail ? 'text-white' : project.tagColor} uppercase line-clamp-1`}>
                        {project.tag}
                      </p>
                      {project.readingTime && (
                        <div className="flex items-center gap-2">
                          <span className={`w-1 h-1 rounded-full ${project.thumbnail ? 'bg-white' : 'bg-current'} opacity-40`}></span>
                          <p className={`text-[10px] md:text-[11px] font-medium tracking-wide uppercase opacity-80 ${project.thumbnail ? 'text-white' : ''}`}>
                            {project.readingTime}
                          </p>
                        </div>
                      )}
                      {project.status && (
                        <div className="flex items-center gap-2">
                          <span className={`w-1 h-1 rounded-full ${project.thumbnail ? 'bg-white' : 'bg-current'} opacity-40`}></span>
                          <span className={`px-2 py-0.5 text-[9px] md:text-[10px] font-bold tracking-wider uppercase rounded-sm border ${project.thumbnail
                            ? 'border-white/30 bg-white/10 text-white'
                            : project.status.progress === 100
                              ? 'border-[#006266]/20 bg-[#006266]/5 text-[#006266]'
                              : project.status.progress === 0
                                ? 'border-gray-500/20 bg-gray-50 text-gray-600'
                                : 'border-amber-600/20 bg-amber-50 text-amber-700'
                            }`}>
                            {project.status.label}
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className={`font-sans text-[1.5rem] md:text-[1.85rem] font-semibold tracking-wide leading-tight ${project.thumbnail ? 'text-white' : ''}`}>
                      {project.title}
                    </h3>
                  </div>
                  {project.thumbnail && (
                    <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Seção 2: Trabalhos Pontuais & Recursos */}
        <div className="mb-40">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={blurSlideVariants}
            className="mb-8"
          >
            <h2 className="font-serif text-[48px] leading-[1.1] font-semibold tracking-tight text-[#2C3539] mb-2">
              Trabalhos Pontuais & Ferramentas
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-2"
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {projects.slice(4, 8).map((project) => (
              <motion.div key={project.id} variants={blurSlideVariants}>
                <Link
                  to={`/project/${project.id}`}
                  className={`block w-full aspect-[2/1] ${project.bg} rounded-xl p-6 lg:p-8 flex flex-col justify-end relative overflow-hidden group hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}
                >
                  <div className={`relative z-10 mt-auto ${project.textColor}`}>
                    <div className={`flex flex-wrap items-center gap-2 mb-2`}>
                      <p className={`text-[10px] md:text-[11px] font-semibold tracking-widest ${project.tagColor} uppercase line-clamp-1`}>
                        {project.tag}
                      </p>
                      {project.readingTime && (
                        <div className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-current opacity-40"></span>
                          <p className={`text-[10px] md:text-[11px] font-medium tracking-wide uppercase opacity-80`}>
                            {project.readingTime}
                          </p>
                        </div>
                      )}
                      {project.status && (
                        <div className="flex items-center gap-2">
                          <span className={`w-1 h-1 rounded-full bg-current opacity-40`}></span>
                          <span className={`px-2 py-0.5 text-[9px] md:text-[10px] font-bold tracking-wider uppercase rounded-sm border ${project.status.progress === 100
                            ? 'border-[#006266]/20 bg-[#006266]/5 text-[#006266]'
                            : project.status.progress === 0
                              ? 'border-gray-500/20 bg-gray-50 text-gray-600'
                              : 'border-amber-600/20 bg-amber-50 text-amber-700'
                            } ${project.bg.includes('bg-[#7D888B]') || project.bg.includes('from-[#8C9A9E]') ? 'border-white/30 bg-white/10 text-white' : ''}`}>
                            {project.status.label}
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="font-sans text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Seção 3: Pensamentos & Aprendizados */}
        <div className="mb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={blurSlideVariants}
            className="mb-8"
          >
            <h2 className="font-serif text-[48px] leading-[1.1] font-semibold tracking-tight text-[#2C3539] mb-2">
              Artigos
            </h2>
          </motion.div>

          <motion.div
            className="space-y-6"
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {projects.slice(8).map((project) => (
              <motion.div key={project.id} variants={blurSlideVariants}>
                <Link
                  to={`/project/${project.id}`}
                  className="block w-full p-8 bg-[#F9F8F6] border border-[#EBE7DD] hover:border-[#006266] rounded-[1.5rem] group transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="max-w-3xl">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-[#006266] bg-[#E8F3F1] rounded-full uppercase">
                          {project.tag}
                        </span>
                        {project.readingTime && (
                          <span className="text-xs text-[#787265] font-mono">
                            {project.readingTime}
                          </span>
                        )}
                        {project.status && (
                          <span className={`px-2 py-0.5 text-[9px] md:text-[10px] font-bold tracking-wider uppercase rounded-sm border ${project.status.progress === 100
                            ? 'border-[#006266]/20 bg-[#006266]/5 text-[#006266]'
                            : project.status.progress === 0
                              ? 'border-gray-500/20 bg-gray-50 text-gray-600'
                              : 'border-amber-600/20 bg-amber-50 text-amber-700'
                            }`}>
                            {project.status.label}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-[#2C3539] mb-3 group-hover:text-[#006266] transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-[#4A5559] text-sm md:text-[14px] leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    <div className="self-end md:self-start flex items-center gap-1.5 text-sm font-semibold text-[#006266] group-hover:translate-x-1 transition-transform">
                      Ler artigo <ChevronRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

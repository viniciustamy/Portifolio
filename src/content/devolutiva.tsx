import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  BookOpen,
  Flag,
  Pencil,
  LayoutGrid,
  GitFork,
  EyeOff,
  FileSpreadsheet,
  History,
  Link2,
  RefreshCw,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { DevolutivaIaMotion } from '../components/DevolutivaIaMotion';
import { DevolutivaSolucaoMotion } from '../components/DevolutivaSolucaoMotion';
import { CicloAvaliativoMotion } from '../components/CicloAvaliativoMotion';
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
import testes1Img from '../assets/images/Devolutiva/Testes-1.png';
import testes2Img from '../assets/images/Devolutiva/Testes-2.png';
import { Carousel } from '../components/Carousel';
import { AtuacaoInfo } from '../components/AtuacaoInfo';












 

export const DevolutivaContent = () => {
  const [viewMode, setViewMode] = useState<'simplificado' | 'relatorio'>('simplificado');

  return (
    <div className={viewMode === 'simplificado' ? 'mode-simplificado' : 'mode-relatorio'}>
      {/* Switcher - hidden */}
      <div className="hidden justify-center mb-12 not-prose">
        <div className="bg-[#E2DCD4]/60 p-1.5 rounded-full flex gap-1 border border-[#E2DCD4]">
          <button
            onClick={() => setViewMode('simplificado')}
            className={`px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${viewMode === 'simplificado'
              ? 'bg-[#9E4322] text-white '
              : 'text-[#6F625B] hover:text-[#241510]'
              }`}
          >
            <Sparkles size={16} />
            Simplificado
          </button>
          <button
            onClick={() => setViewMode('relatorio')}
            className={`px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${viewMode === 'relatorio'
              ? 'bg-[#9E4322] text-white '
              : 'text-[#6F625B] hover:text-[#241510]'
              }`}
          >
            <BookOpen size={16} />
            Relatório Completo
          </button>
        </div>
      </div>

      {viewMode === 'simplificado' ? (
        <>

          {/* O Desafio */}
          <div className="mb-32">
            <h2 id="o-desafio" className="font-serif text-3xl font-bold text-[#241510] mb-4">A única etapa que acontecia fora do produto</h2>
            <p className="text-[#7D7169] leading-relaxed mb-8">
              O produto de Performance já cobria a configuração de ciclos, as avaliações e os comitês de calibração. A jornada era interrompida bem antes da etapa mais importante: a conversa entre gestor e colaborador sobre os resultados.
            </p>

            <div className="w-full md:w-[80%] mx-auto not-prose">
              <CicloAvaliativoMotion />
            </div>
          </div>

          {/* Alinhando o problema */}
          <div className="mb-32">
            <h2 id="alinhando-o-problema" className="font-serif text-3xl font-bold text-[#241510] mb-4">Uma base compartilhada antes do Discovery</h2>
            <p className="text-[#7D7169] leading-relaxed mb-10">
              Antes de investigar qualquer solução, precisávamos garantir que Produto, Design e Negócio partissem do mesmo entendimento do problema.
            </p>

            {/* Etapas em sequência: bolinha → título → texto → imagem, e a linha cresce até a próxima */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-8 not-prose mb-10"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
            >
              {[
                { Icon: Flag, title: 'Kickoff', desc: 'Contexto, objetivos, riscos e métricas de sucesso alinhados com os stakeholders.', img: '/thumb-kickoff.png' },
                { Icon: Pencil, title: 'CSD', desc: '5 stakeholders. Certezas e dúvidas viraram perguntas de pesquisa.', img: '/thumb-csd.png' },
                { Icon: LayoutGrid, title: 'Benchmark', desc: '10 plataformas de mercado comparadas em funcionalidades de devolutiva.', img: '/thumb-bench.png' },
                { Icon: GitFork, title: 'Faz / não faz', desc: 'Limites de escopo definidos antes de aprofundar a pesquisa.', img: '/thumb-faz-naofaz.png' },
              ].map((step, i) => {
                const start = i * 1.25;
                const reveal = (delay: number) => ({
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.45, delay: start + delay, ease: [0.16, 1, 0.3, 1] } },
                });
                return (
                  <div key={step.title} className="relative flex flex-col items-center md:items-start text-center md:text-left">
                    {/* Linha até a próxima etapa */}
                    {i < 3 && (
                      <motion.span
                        className="absolute top-8 h-px bg-[#E2DCD4] hidden md:block origin-left"
                        style={{ left: '4rem', width: 'calc(100% - 2rem)' }}
                        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.7, delay: start + 0.55, ease: 'easeInOut' } } }}
                      />
                    )}
                    <motion.div
                      className="w-16 h-16 rounded-full border border-[#E2DCD4] bg-white flex items-center justify-center text-[#9E4322] mb-6"
                      variants={{ hidden: { opacity: 0, scale: 0.5 }, show: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: start, ease: [0.16, 1, 0.3, 1] } } }}
                    >
                      <step.Icon size={20} />
                    </motion.div>
                    <motion.h4 className="font-sans font-bold text-base text-[#241510] mb-2" variants={reveal(0.15)}>{step.title}</motion.h4>
                    <motion.p className="text-xs text-[#6F625B] leading-relaxed mb-6 min-h-[60px]" variants={reveal(0.25)}>{step.desc}</motion.p>
                    <motion.div className="w-full border border-[#E2DCD4] rounded-lg overflow-hidden hover:border-[#9E4322]/30 transition-colors duration-300" variants={reveal(0.4)}>
                      <img src={step.img} alt={step.title} className="w-full h-[188px] object-cover" />
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Discovery */}
          <div className="mb-32">
            <h2 id="discovery" className="font-serif text-3xl font-bold text-[#241510] mb-4">Consolidando o que a empresa já sabia</h2>
            <p className="text-[#7D7169] leading-relaxed mb-4">
              Reuni pesquisas anteriores de UX Research, estudos de Service Design e entrevistas de outras iniciativas do produto de Performance, em vez de repetir descobertas já validadas. Essa base reduziu o tempo de investigação e concentrou esforço nas lacunas reais.
            </p>
            <p className="text-[#7D7169] leading-relaxed mb-6">
              A partir dela, mapeei a jornada completa de devolutiva conectando RH, gestores e colaboradores, e ficou evidente que essa etapa não era isolada: era o principal elo entre avaliação, calibração e Plano de Desenvolvimento Individual.
            </p>

            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] my-12 overflow-hidden">
              <img
                src="/mapa.png"
                alt="Mapa da Jornada de Devolutiva"
                className="w-[90%] h-auto block translate-x-30"
              />
            </div>

            {/* Legenda */}
            <p className="text-center text-sm text-[#6F625B] mt-4 font-medium">
              Mapa mental criado para analisar os fluxos de devolutiva entre RH, gestores e colaboradores.
            </p>
          </div>

          {/* Principais Insights */}
          <div className="mb-32">
            <h2 id="principais-insights" className="font-serif text-3xl font-bold text-[#241510] mb-6">Os 5 problemas estruturais</h2>

            <div className="not-prose divide-y divide-[#E2DCD4]">
              {[
                { Icon: FileSpreadsheet, title: 'Gestores com ferramentas externas', text: 'Dependiam de documentos e planilhas para preparar a conversa.' },
                { Icon: History, title: 'Colaboradores sem histórico', text: 'Não acumulavam um registro consolidado do próprio desenvolvimento.' },
                { Icon: EyeOff, title: 'RH sem visibilidade', text: 'Não sabia o que estava feito, pendente ou parado.' },
                { Icon: Link2, title: 'O elo da jornada', text: 'Era na devolutiva que avaliações e feedbacks viravam ação.' },
                { Icon: RefreshCw, title: 'Cada empresa reinventava o processo', text: 'Sem um modelo, o produto não padronizava nem evoluía essa etapa.' },
              ].map(({ Icon, title, text }) => (
                <div key={title} className="flex items-start gap-4 py-4">
                  <Icon size={18} className="text-[#A21C26] mt-0.5 shrink-0" />
                  <p className="text-[15px] leading-relaxed">
                    <span className="font-semibold text-[#241510]">{title}.</span>{' '}
                    <span className="text-[#6F625B]">{text}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Explorando soluções */}
          <div className="mb-32">
            <h2 id="explorando-solucoes" className="font-serif text-3xl font-bold text-[#241510] mb-4">Testando estrutura antes de fechar layout</h2>
            <p className="text-[#7D7169] leading-relaxed mb-8">
              Com a arquitetura validada, explorei wireframes para testar alternativas de navegação e reduzir a complexidade percebida, antes de qualquer decisão visual.
            </p>

            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] my-0 overflow-hidden">
              <img
                src="/Wire.png"
                alt="Wireframes da Solução"
                className="w-full h-auto block"
              />
            </div>

            {/* Legenda */}
            <p className="text-center text-sm text-[#6F625B] font-medium">
              Wireframe dos fluxos de cada persona.
            </p>
          </div>

          {/* Validação */}
          <div className="mb-32">
            <h2 id="validacao" className="font-serif text-3xl font-bold text-[#241510] mb-4">Teste de usabilidade com 12 participantes que vivem o processo</h2>
            <p className="text-[#7D7169] leading-relaxed mb-8">
              RH, gestores e lideranças testaram o protótipo navegável para responder uma pergunta: a devolutiva ficou mais simples do que os processos paralelos que já existiam?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 not-prose">
              {[
                { title: 'O que funcionou', Icon: CheckCircle, color: '#9E4322', bg: '#FAF9F6', items: ['Painel lateral centralizou as informações da conversa', 'Consolidação automática reduziu retrabalho manual', 'Fluxo simples, sem precisar de treinamento', 'Exportação em PDF valorizada para registro'] },
                { title: 'Oportunidades de melhoria', Icon: AlertCircle, color: '#A26D26', bg: '#FAF6F0', items: ['Confusão entre avaliação e devolutiva', 'Rótulos pouco claros na navegação', 'Faltavam filtros e indicadores para RH e gestores', 'Dúvidas sobre anotações privadas e colapsáveis'] },
              ].map(col => (
                <div key={col.title} className="rounded-xl p-5" style={{ background: col.bg }}>
                  <h3 className="flex items-center gap-2 font-serif font-bold text-[16px] mb-3" style={{ color: col.color }}>
                    <col.Icon size={16} /> {col.title}
                  </h3>
                  <ul className="space-y-2">
                    {col.items.map(item => (
                      <li key={item} className="flex gap-2 text-[14px] leading-snug text-[#4F4440]">
                        <span className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0" style={{ background: col.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <img
              src="/Pesquisas-juntas.png"
              alt="Miro - Consolidação de Testes"
              className="w-full"
            />

            {/* Legenda */}
            <p className="text-center text-sm text-[#6F625B] font-medium">
              Miro com as análises das entrevistas.
            </p>
          </div>

          {/* Da pesquisa à Inteligência Artificial */}
          <div className="relative isolate mb-32 py-20 md:py-24">
            {/* Faixa escura de ponta a ponta: dá peso à seção da IA sem tirar o conteúdo do alinhamento */}
            <span aria-hidden="true" className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen bg-[#2E211B] -z-10" />
            <h2 id="da-pesquisa-a-inteligencia-artificial" className="font-serif text-3xl font-bold text-[#F4EFEB] mb-4">Agente de IA para ajudar o gestor</h2>
            <p className="text-[#C9BDB4] leading-relaxed mb-10">
              O problema não era só acessar os dados, era interpretá-los: gestores gastavam tempo demais lendo o volume de avaliações antes da conversa. Com a Gupy IA, o gestor gera a conclusão, revisa e aplica direto nos campos da devolutiva.
            </p>

            {/* Motion do fluxo com a Gupy IA */}
            <div className="not-prose">
              <DevolutivaIaMotion />
            </div>
          </div>

          {/* Solução Final */}
          <div className="mb-32">
            <h2 id="solucao-final" className="font-serif text-3xl font-bold text-[#241510] mb-4">O ciclo completo, dentro da plataforma</h2>
            <p className="text-[#7D7169] leading-relaxed mb-8">
              Cada perfil passou a contar com funcionalidades específicas, mantendo todas as informações conectadas em uma única jornada.
            </p>

            {/* Motion das três jornadas (RH, gestor e colaborador) num banner que passa da largura do texto */}
            <div className="w-[80vw] max-w-[1280px] relative left-1/2 -translate-x-1/2 my-10 not-prose">
              <DevolutivaSolucaoMotion />
            </div>
          </div>

          {/* Resultados — mais respiro em cima e embaixo para separar dos blocos vizinhos */}
          <div className="mb-32 py-16">
            <h2 id="resultados" className="font-serif text-3xl font-bold text-[#241510] mb-4">Da POC interna à adoção oficial</h2>
            <p className="text-[#7D7169] leading-relaxed mb-8">
              A funcionalidade foi lançada como prova de conceito para uso interno antes de uma disponibilização mais ampla.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose">
              <div className="bg-[#2E211B] p-8 text-left flex flex-col justify-start min-h-[200px] hover:bg-[#2E211B]/95 transition-all duration-300 rounded-2xl">
                <span className="text-6xl font-serif font-bold text-[#E8DCC4] mb-3 leading-none">95%</span>
                <p className="text-sm text-white/90 leading-relaxed font-sans">
                  de adoção entre os gestores. E 100% do RH usando.
                </p>
              </div>
              <div className="bg-[#2E211B] p-8 text-left flex flex-col justify-start min-h-[200px] hover:bg-[#2E211B]/95 transition-all duration-300 rounded-2xl">
                <span className="text-4xl font-serif font-bold text-[#E8DCC4] mb-3 leading-tight">Dias para horas</span>
                <p className="text-sm text-white/90 leading-relaxed font-sans">
                  Gestores relataram que demoravam dias para fazer a devolutiva agora fazem em horas.
                </p>
              </div>
              <div className="bg-[#2E211B] p-8 text-left flex flex-col justify-start min-h-[200px] hover:bg-[#2E211B]/95 transition-all duration-300 rounded-2xl">
                <span className="text-4xl font-serif font-bold text-[#E8DCC4] mb-3 leading-tight">Nota 4,5/5</span>
                <p className="text-sm text-white/90 leading-relaxed font-sans">
                  em satisfação pelos RH entre os 6 RHs entrevistados. “Tenho visibilidade”
                </p>
              </div>
            </div>
          </div>

          {/* Minha Atuação */}
          <div className="mb-32">
            <h2 id="minha-atuacao" className="font-serif text-3xl font-bold text-[#241510] mb-4">Ponta a ponta, do Discovery à priorização pós-lançamento</h2>
            <p className="text-[#7D7169] leading-relaxed mb-6">
              Atuei como Product Designer do time de Performance e Desenvolvimento, conduzindo o projeto do Discovery à priorização depois do lançamento.
            </p>

            <AtuacaoInfo
              projectId="devolutiva"
              methods={['Discovery', 'Facilitação de CSD', 'Benchmark competitivo', 'Mapeamento de jornada', 'Priorização GUT', 'Arquitetura de experiência', 'Wireframes', 'Testes de usabilidade', 'Design de IA aplicada']}
            />
          </div>

          {/* Principais Aprendizados */}
          <div className="mb-32">
            <h2 id="principais-aprendizados" className="font-serif text-3xl font-bold text-[#241510] mb-6">Aprendizados</h2>

            <div className="not-prose divide-y divide-[#E2DCD4]">
              {[
                { title: 'Discovery não é começar do zero', text: 'Consolidar pesquisas existentes acelerou o entendimento sem repetir o que já estava validado.' },
                { title: 'O desafio era comportamental', text: 'Gestores só trocam processos que funcionam quando percebem ganho logo no primeiro uso.' },
                { title: 'IA deve potencializar, não decidir', text: 'Ela reduz o esforço de análise; a conversa e a decisão continuam com o gestor.' },
                { title: 'Fechar o ciclo importa tanto quanto abrir', text: 'O resultado não foi uma tela nova, foi conectar uma etapa que estava solta.' },
              ].map(({ title, text }, i) => (
                <div key={title} className="flex items-start gap-4 py-4">
                  <span className="text-[13px] font-semibold text-[#9E4322] tabular-nums mt-0.5 shrink-0">0{i + 1}</span>
                  <p className="text-[15px] leading-relaxed">
                    <span className="font-semibold text-[#241510]">{title}.</span>{' '}
                    <span className="text-[#6F625B]">{text}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Relatório (Conteúdo original completo rico em texto) */}
          <h2 id="visao-geral" className="text-2xl font-bold mb-4">Visão geral</h2>
          <p className="mb-6 leading-relaxed">
            O produto de Performance já permitia que empresas configurassem ciclos avaliativos, conduzissem avaliações e realizassem comitês de calibração. No entanto, a jornada era interrompida justamente antes da etapa mais importante do processo: a devolutiva entre gestor e colaborador.
          </p>
          <p className="mb-6 leading-relaxed">
            Na prática, isso significava que cada empresa precisava criar seu próprio fluxo para compartilhar os resultados das avaliações. Gestores recorriam a apresentações, documentos ou planilhas, enquanto o RH perdia visibilidade sobre a execução desse processo e os colaboradores não possuíam um histórico estruturado do seu desenvolvimento.
          </p>
          <p className="mb-8 leading-relaxed">
            Nosso desafio era incorporar essa etapa ao produto, eliminando controles paralelos e transformando a devolutiva em uma experiência estruturada, registrada e integrada ao restante da jornada de Performance.
          </p>

          <h2 id="o-desafio-relatorio" className="text-2xl font-bold mb-4">O desafio</h2>
          <p className="mb-6 leading-relaxed">
            A devolutiva é o momento em que gestor e colaborador discutem os resultados da avaliação de desempenho, alinham expectativas e definem os próximos passos para o desenvolvimento profissional. Apesar de sua importância, era justamente a única etapa que acontecia totalmente fora da plataforma.
          </p>
          <p className="mb-4 leading-relaxed">Essa desconexão gerava problemas para todos os envolvidos.</p>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>Os gestores utilizavam documentos, apresentações ou planilhas para organizar as conversas.</li>
            <li>O RH não conseguia acompanhar quais devolutivas haviam sido realizadas, identificar pendências ou medir a evolução do processo.</li>
            <li>Já os colaboradores não tinham acesso a um histórico consolidado de desenvolvimento, tornando difícil acompanhar sua própria evolução ao longo do tempo.</li>
          </ul>
          <p className="mb-6 leading-relaxed">
            Além disso, cada empresa criava seu próprio modelo de devolutiva, dificultando a padronização do processo e reduzindo a capacidade do produto de apoiar uma etapa estratégica da gestão de desempenho.
          </p>
          <p className="mb-8 leading-relaxed">
            Nosso objetivo era concluir todo o ciclo avaliativo dentro da plataforma, oferecendo uma experiência consistente para RH, gestores e colaboradores.
          </p>

          <h2 id="alinhando-o-problema-relatorio" className="text-2xl font-bold mb-4">Alinhando o problema</h2>
          <p className="mb-6 leading-relaxed">
            Antes de iniciar o Discovery, precisávamos garantir que todas as pessoas envolvidas compartilhassem o mesmo entendimento sobre o problema.
          </p>
          <p className="mb-6 leading-relaxed">
            Estruturei uma etapa inicial de alinhamento composta por um kickoff do projeto, uma dinâmica de CSD (Certezas, Suposições e Dúvidas), um benchmark de mercado e um exercício de definição de escopo utilizando a matriz Faz / Não Faz.
          </p>
          <p className="mb-6 leading-relaxed">
            Mais do que organizar informações, esse trabalho permitiu transformar percepções iniciais em hipóteses estruturadas, definir quais perguntas precisávamos responder durante a pesquisa e criar uma visão compartilhada entre Produto, Design e Negócios.
          </p>
          <p className="mb-8 leading-relaxed">
            Todo o Discovery foi conduzido a partir dessa base.
          </p>

          <h3 className="text-xl font-bold mb-3">Kickoff</h3>
          <p className="mb-6 leading-relaxed">
            O projeto começou com um kickoff reunindo Produto, Design e stakeholders de negócio. O objetivo era construir uma visão compartilhada antes de qualquer decisão de solução.
          </p>
          <p className="mb-6 leading-relaxed">
            Durante o encontro alinhamos o contexto da iniciativa, os objetivos do projeto, os principais riscos, as métricas de sucesso, as personas impactadas e os materiais já existentes sobre o tema.
          </p>
          <p className="mb-8 leading-relaxed">
            Também discutimos por que resolver esse problema era importante tanto para os clientes quanto para o negócio, garantindo que toda a equipe iniciasse a fase de Discovery com os mesmos direcionamentos.
          </p>

          <div className="my-12">
            <Carousel images={[contexto1, contexto2, contexto3]} />
            <p className="text-center text-sm text-[#6F625B] mt-4 font-medium">Framework utilizado durante o kickoff para alinhar objetivos, riscos, hipóteses e critérios de sucesso do projeto.</p>
          </div>

          <h3 className="text-xl font-bold mb-3">CSD (Certezas, Suposições e Dúvidas)</h3>
          <p className="mb-6 leading-relaxed">
            Com o contexto alinhado, facilitei uma dinâmica de CSD envolvendo cinco stakeholders das áreas de Produto, Design e Negócios.
          </p>
          <p className="mb-6 leading-relaxed">
            O objetivo era organizar tudo o que acreditávamos saber sobre a devolutiva antes de validar essas percepções com usuários.
          </p>
          <p className="mb-6 leading-relaxed">
            Durante a dinâmica levantamos certezas, hipóteses, dúvidas, riscos e oportunidades. Em seguida, consolidei esses insumos em categorias e transformei as principais dúvidas em perguntas de pesquisa.
          </p>
          <p className="mb-8 leading-relaxed">
            Essas perguntas passaram a orientar toda a fase de Discovery, servindo como ponto de partida para análise das pesquisas existentes e para as demais atividades conduzidas ao longo do projeto.
          </p>

          <div className="my-12">
            <img src={csdImg} alt="Matriz CSD" className="w-full h-auto rounded-2xl border border-[#E2DCD4]  max-w-4xl mx-auto" />
            <p className="text-center text-sm text-[#6F625B] mt-4 font-medium">Consolidação das principais certezas, hipóteses e dúvidas levantadas pelos stakeholders.</p>
          </div>

          <h3 className="text-xl font-bold mb-3">Benchmark de mercado</h3>
          <p className="mb-6 leading-relaxed">
            Em paralelo ao alinhamento interno, realizamos um benchmark com dez plataformas de gestão de desempenho.
          </p>
          <p className="mb-6 leading-relaxed">
            A análise comparou funcionalidades relacionadas à devolutiva, acompanhamento pelo RH, histórico do colaborador e integração com planos de desenvolvimento.
          </p>
          <p className="mb-6 leading-relaxed">
            Com esse material construí um mapa comparativo de funcionalidades, identificando padrões de mercado, oportunidades de diferenciação e lacunas que ainda não eram bem resolvidas pelos concorrentes.
          </p>
          <p className="mb-8 leading-relaxed">
            Mais do que buscar referências visuais, esse benchmark ajudou a fundamentar decisões estratégicas sobre o que deveria fazer parte da solução.
          </p>
          <div className="my-12">
            <img src={benchImg} alt="Benchmark de mercado" className="w-full h-auto rounded-2xl border border-[#E2DCD4]  max-w-4xl mx-auto" />
            <p className="text-center text-sm text-[#6F625B] mt-4 font-medium">Comparativo entre plataformas de mercado destacando padrões, oportunidades e diferenciais competitivos.</p>
          </div>

          <h2 id="definindo-o-escopo" className="text-2xl font-bold mb-4">Definindo o escopo</h2>
          <p className="mb-6 leading-relaxed">
            Antes de aprofundarmos a pesquisa, conduzi uma dinâmica de Faz / Não Faz com um grupo reduzido de stakeholders.
          </p>
          <p className="mb-6 leading-relaxed">
            O objetivo era definir claramente quais responsabilidades pertenciam à funcionalidade de devolutiva e quais deveriam continuar em outros módulos do produto.
          </p>
          <p className="mb-8 leading-relaxed">
            Esse alinhamento evitou expansão desnecessária de escopo e manteve o projeto concentrado no problem que realmente precisávamos resolver, reduzindo riscos e facilitando a tomada de decisão durante todo o desenvolvimento.
          </p>
          <div className="my-12">
            <img src={fazNaoFazImg} alt="Matriz Faz / Não Faz" className="w-full h-auto rounded-2xl border border-[#E2DCD4]  max-w-4xl mx-auto" />
            <p className="text-center text-sm text-[#6F625B] mt-4 font-medium">Matriz utilizada para alinhar responsabilidades da funcionalidade e estabelecer os limites da solução.</p>
          </div>

          <h2 id="consolidando-pesquisas" className="text-2xl font-bold mb-4">Consolidando pesquisas existentes</h2>
          <p className="mb-6 leading-relaxed">
            Com o problema alinhado e o escopo definido, iniciamos a fase de Discovery.
          </p>
          <p className="mb-6 leading-relaxed">
            Antes de realizar novas entrevistas, busquei entender tudo o que a empresa já havia aprendido sobre o tema. Reuni pesquisas conduzidas anteriormente pelo time de UX Research, estudos de Service Design e entrevistas realizadas em outras iniciativas do produto de Performance.
          </p>
          <p className="mb-6 leading-relaxed">
            Grande parte desse material já explorava o momento da devolutiva sob diferentes perspectivas, permitindo que o projeto começasse com uma base sólida de evidências, sem a necessidade de repetir descobertas que já haviam sido validadas.
          </p>
          <p className="mb-8 leading-relaxed">
            Essa consolidação reduziu o tempo de investigação, aumentou a confiança nas decisões e permitiu concentrar esforços nas lacunas que realmente precisavam ser exploradas.
          </p>
          <div className="my-12">
            <img src={pesquisasImg} alt="Consolidação de pesquisas existentes" className="w-full h-auto rounded-2xl border border-[#E2DCD4]  max-w-4xl mx-auto" />
            <p className="text-center text-sm text-[#6F625B] mt-4 font-medium">Organização e síntese das pesquisas existentes sobre devolutiva e feedback.</p>
          </div>

          <p className="mb-8 leading-relaxed">
            A seguir no bloco de Jornada e Insights, vou apresentar as descobertas desta consolidação.
          </p>

          <h2 id="mapeando-a-jornada" className="text-2xl font-bold mb-4">Mapeando a jornada</h2>
          <p className="mb-6 leading-relaxed">
            Com todas as pesquisas consolidadas, o próximo passo foi transformar essas evidências em uma visão única da experiência.
          </p>
          <p className="mb-6 leading-relaxed">
            Construí um mapa completo da jornada de devolutiva, representando a participação de todas as personas envolvidas — RH, gestores e colaboradores — e os pontos de contato entre elas durante o processo.
          </p>
          <p className="mb-6 leading-relaxed">
            Também mapeei como essa etapa se conectava às avaliações de desempenho, aos comitês de calibração e ao Plano de Desenvolvimento Individual (PDI).
          </p>
          <p className="mb-6 leading-relaxed">
            Esse exercício deixou evidente que a devolutiva não era uma funcionalidade isolada. Ela funcionava como o principal elo entre todas as etapas do ciclo de Performance e era justamente essa conexão que estava ausente na plataforma.
          </p>
          <p className="mb-8 leading-relaxed">
            A partir desse mapa, tornou-se mais claro identificar oportunidades de melhoria e definir quais experiências deveriam ser priorizadas.
          </p>
          <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] my-12 bg-white flex flex-col items-center">
            <img src={mapaImg} alt="Mapa de jornada de devolutiva" className="w-full h-auto max-h-[90vh] object-contain md:object-cover" />
            <p className="text-center text-sm text-[#6F625B] mt-4 font-medium max-w-3xl px-4">Jornada completa da devolutiva conectando RH, gestores, colaboradores e demais funcionalidades do produto.</p>
          </div>

          <h2 id="principais-insights-relatorio" className="text-2xl font-bold mb-4">Principais insights</h2>
          <p className="mb-6 leading-relaxed">
            A consolidação das pesquisas revelou padrões consistentes sobre como as empresas conduziam esse momento.
          </p>
          <p className="mb-6 leading-relaxed">
            Mais do que problemas isolados de usabilidade, encontramos oportunidades estruturais que ajudaram a direcionar toda a estratégia do produto.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 not-prose">
            <div className="bg-white p-6 rounded-2xl border-2 border-[#9E4322]  hover:bg-[#9E4322]/5 transition-all duration-300 flex flex-col">
              <span className="text-[#9E4322] font-mono text-xs tracking-wider uppercase block mb-2 font-bold">Insight 01</span>
              <h4 className="font-serif text-lg font-bold text-[#241510] mb-2">A devolutiva era o principal ponto de conexão da jornada</h4>
              <p className="text-sm font-sans text-[#736f6f] leading-[20px]">
                Embora fosse tratada como uma etapa final, era durante a devolutiva que avaliações, feedbacks e planos de desenvolvimento se transformavam em ações concretas. Isso fazia dela um dos momentos de maior valor dentro de toda a experiência de Performance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border-2 border-[#9E4322]  hover:bg-[#9E4322]/5 transition-all duration-300 flex flex-col">
              <span className="text-[#9E4322] font-mono text-xs tracking-wider uppercase block mb-2 font-bold">Insight 02</span>
              <h4 className="font-serif text-lg font-bold text-[#241510] mb-2">O RH perdia completamente a visibilidade do processo</h4>
              <p className="text-sm font-sans text-[#736f6f] leading-[20px]">
                Depois de configurar os ciclos avaliativos, o RH deixava de acompanhar o que acontecia entre gestores e colaboradores. Não existia uma forma simples de saber quem havia realizado a devolutiva, quais conversas ainda estavam pendentes ou quais áreas precisavam de apoio.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border-2 border-[#9E4322]  hover:bg-[#9E4322]/5 transition-all duration-300 flex flex-col">
              <span className="text-[#9E4322] font-mono text-xs tracking-wider uppercase block mb-2 font-bold">Insight 03</span>
              <h4 className="font-serif text-lg font-bold text-[#241510] mb-2">Gestores dependiam de ferramentas externas</h4>
              <p className="text-sm font-sans text-[#736f6f] leading-[20px]">
                Para preparar as conversas, os gestores recorriam a apresentações, documentos ou planilhas. Além do retrabalho, esse cenário aumentava a chance de perda de informações e tornava impossível padronizar a experiência entre diferentes empresas.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border-2 border-[#9E4322]  hover:bg-[#9E4322]/5 transition-all duration-300 flex flex-col">
              <span className="text-[#9E4322] font-mono text-xs tracking-wider uppercase block mb-2 font-bold">Insight 04</span>
              <h4 className="font-serif text-lg font-bold text-[#241510] mb-2">O colaborador não possuía um histórico de desenvolvimento</h4>
              <p className="text-sm font-sans text-[#736f6f] leading-[20px]">
                Depois da conversa, todo o conhecimento produzido era perdido ou permanecia disperso em arquivos particulares. Não existia uma linha do tempo que permitisse acompanhar a evolução do colaborador ao longo dos ciclos avaliativos.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border-2 border-[#9E4322]  hover:bg-[#9E4322]/5 transition-all duration-300 flex flex-col md:col-span-2">
              <span className="text-[#9E4322] font-mono text-xs tracking-wider uppercase block mb-2 font-bold">Insight 05</span>
              <h4 className="font-serif text-lg font-bold text-[#241510] mb-2">Cada empresa reinventava esse processo</h4>
              <p className="text-sm font-sans text-[#736f6f] leading-[20px]">
                Como o produto não oferecia uma solução estruturada, cada cliente desenvolvia seu próprio modelo de devolutiva. Essa falta de padronização dificultava tanto a adoção do produto quanto a evolução da funcionalidade.
              </p>
            </div>
          </div>
          <p className="mb-8 leading-relaxed">
            Esses aprendizados deixaram claro que nosso desafio não era apenas criar uma nova tela, mas conectar uma etapa estratégica que permanecia desconectada de todo o restante da experiência.
          </p>

          <h2 id="priorizando-oportunidades-relatorio" className="text-2xl font-bold mb-4">Priorizando oportunidades</h2>
          <p className="mb-6 leading-relaxed">
            Com os principais problemas identificados, precisávamos decidir onde concentrar os esforços da primeira versão da solução.
          </p>
          <p className="mb-6 leading-relaxed">
            Para isso, utilizei uma matriz GUT (Gravidade, Urgência e Tendência), permitindo priorizar cada oportunidade com base no impacto para usuários e negócio.
          </p>
          <p className="mb-6 leading-relaxed">
            Esse exercício trouxe objetividade para as discussões do time e ajudou a transformar uma lista extensa de oportunidades em um plano de evolução claro, equilibrando valor para os clientes e viabilidade de implementação.
          </p>
          <p className="mb-8 leading-relaxed">
            A matriz também serviu como referência durante todo o desenvolvimento, garantindo que novas ideias fossem avaliadas em relação aos objetivos definidos no início do projeto.
          </p>

          <h2 id="arquitetando-a-solucao-relatorio" className="text-2xl font-bold mb-4">Arquitetando a solução</h2>
          <p className="mb-6 leading-relaxed">
            Com os principais problemas priorizados, iniciamos a construção da solução.
          </p>
          <p className="mb-6 leading-relaxed">
            Antes de pensar nas interfaces, desenhei os fluxos completos das três jornadas envolvidas no processo. O objetivo era garantir que cada persona tivesse uma experiência consistente e que todas as etapas da devolutiva estivessem conectadas ao restante do produto.
          </p>
          <p className="mb-6 leading-relaxed">
            Esse trabalho permitiu validar a arquitetura da experiência antes de investir em protótipos de alta fidelidade, reduzindo retrabalho e facilitando as discussões com Produto e Engenharia.
          </p>

          <h3 className="text-xl font-bold mb-3">Jornada do RH</h3>
          <p className="mb-6 leading-relaxed">
            Para o RH, a prioridade era transformar um processo invisível em algo gerenciável. A experiência foi estruturada para permitir a configuração dos períodos de devolutiva, o acompanhamento da execução pelas lideranças e a visualização de indicadores que ajudassem a identificar atrasos, pendências e oportunidades de atuação.
          </p>
          <div className="my-10">
            <img src={fluxoRhImg} alt="Fluxo RH" className="w-full h-auto rounded-2xl border border-[#E2DCD4]  max-w-4xl mx-auto" />
            <p className="text-center text-sm text-[#6F625B] mt-3 font-medium">Fluxo completo da jornada do RH.</p>
          </div>

          <h3 className="text-xl font-bold mb-3">Jornada do Gestor</h3>
          <p className="mb-6 leading-relaxed">
            O gestor precisava de um fluxo que reduzisse o esforço de preparação da conversa sem comprometer a qualidade da devolutiva. A experiência foi desenhada para reunir todas as informações relevantes em um único lugar, apoiar a preparação da reunião e permitir que todo o processo fosse registrado dentro da plataforma.
          </p>
          <div className="my-10">
            <img src={fluxoGestorImg} alt="Fluxo Gestor" className="w-full h-auto rounded-2xl border border-[#E2DCD4]  max-w-4xl mx-auto" />
            <p className="text-center text-sm text-[#6F625B] mt-3 font-medium">Fluxo completo da jornada do gestor.</p>
          </div>

          <h3 className="text-xl font-bold mb-3">Jornada do Colaborador</h3>
          <p className="mb-6 leading-relaxed">
            Para o colaborador, o foco era garantir transparência e continuidade. Além de receber formalmente a devolutiva, ele passaria a contar com um histórico permanente de desenvolvimento, conectado às avaliações anteriores e ao Plano de Desenvolvimento Individual.
          </p>
          <div className="my-10">
            <img src={fluxoColabImg} alt="Fluxo Colaborador" className="w-full h-auto rounded-2xl border border-[#E2DCD4]  max-w-4xl mx-auto" />
            <p className="text-center text-sm text-[#6F625B] mt-3 font-medium">Fluxo completo da jornada do colaborador.</p>
          </div>

          <p className="mb-8 leading-relaxed">
            Os fluxos passaram por diversas iterações antes de chegarmos à estrutura final. Essa etapa foi essencial para alinhar expectativas entre Design, Produto e Engenharia antes da construção das interfaces.
          </p>

          <h2 id="explorando-solucoes-relatorio" className="text-2xl font-bold mb-4">Explorando soluções</h2>
          <p className="mb-6 leading-relaxed">
            Com a arquitetura validada, iniciamos a exploração das interfaces. Desenvolvi uma série de wireframes para experimentar diferentes formas de organizar a experiência, testar alternativas de navegação e reduzir a complexidade percebida pelos usuários.
          </p>
          <p className="mb-4 leading-relaxed">Durante esse processo, exploramos diferentes maneiras de:</p>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>simplificar a configuração realizada pelo RH;</li>
            <li>tornar o preparo da devolutiva mais intuitivo para os gestores;</li>
            <li>facilitar a consulta das informações pelos colaboradores;</li>
            <li>integrar conteúdos provenientes de diferentes etapas do ciclo avaliativo.</li>
          </ul>
          <p className="mb-8 leading-relaxed">
            Mais do que definir o layout das telas, os wireframes serviram para validar hipóteses de navegação e estrutura da informação antes da construção do protótipo navegável.
          </p>

          <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] my-12 bg-white flex flex-col items-center">
            <div className="max-w-[1240px] w-full grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
              <div className="flex flex-col items-center">
                <img src={wire1Img} alt="Wireframe - Preparação" className="w-full h-auto rounded-2xl border border-[#E2DCD4] " />
                <p className="text-center text-sm text-[#6F625B] mt-3 font-medium">Primeiras explorações da etapa de preparação da devolutiva.</p>
              </div>
              <div className="flex flex-col items-center">
                <img src={wire2Img} alt="Wireframe - Fluxo Alternativo" className="w-full h-auto rounded-2xl border border-[#E2DCD4] " />
                <p className="text-center text-sm text-[#6F625B] mt-3 font-medium">Exploração de diferentes formas de apresentar as informações ao colaborador.</p>
              </div>
            </div>
          </div>

          <h2 id="validacao-relatorio" className="text-2xl font-bold mb-4">Validação</h2>
          <p className="mb-6 leading-relaxed">
            Com o protótipo navegável concluído, conduzi uma rodada de testes de usabilidade com doze participantes, entre profissionais de RH, gestores e lideranças.
          </p>
          <p className="mb-6 leading-relaxed">
            O objetivo era validar toda a experiência proposta, desde a configuração inicial realizada pelo RH até o momento em que o colaborador recebia sua devolutiva.
          </p>
          <p className="mb-6 leading-relaxed">
            Mais do que identificar problemas de interface, os testes buscavam responder uma pergunta central: <strong>A solução realmente tornava a devolutiva mais simples do que os processos que os clientes utilizavam fora da plataforma?</strong>
          </p>
          <p className="mb-8 leading-relaxed">
            As sessões permitiram observar comportamentos, dificuldades e oportunidades de melhoria ao longo de toda a jornada, gerando uma base consistente para refinamento da solução.
          </p>

          <div className="my-10 flex flex-col gap-6">
            <img src={testes1Img} alt="Testes 1" className="w-full h-auto rounded-2xl border border-[#E2DCD4]  max-w-4xl mx-auto" />
            <img src={testes2Img} alt="Testes 2" className="w-full h-auto rounded-2xl border border-[#E2DCD4]  max-w-4xl mx-auto" />
            <p className="text-center text-sm text-[#6F625B] mt-4 font-medium">Legenda: Imagens do miro onde consolidei os resultados da pesquisa realizadas com as pessoas de RH, Gestores e Colaboradores.</p>
          </div>

          <h3 className="text-xl font-bold mb-3">Priorizando os problemas encontrados</h3>
          <p className="mb-6 leading-relaxed">
            Os testes geraram uma quantidade significativa de oportunidades de melhoria.
          </p>
          <p className="mb-4 leading-relaxed">
            Para organizar esse volume de informações, desenvolvi uma metodologia de priorização que combinava dois critérios:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>a importância do fluxo dentro da jornada;</li>
            <li>a severidade do problema identificado.</li>
          </ul>
          <p className="mb-6 leading-relaxed">
            A combinação desses fatores gerava automaticamente uma pontuação, facilitando a tomada de decisão sobre quais melhorias deveriam ser implementadas primeiro.
          </p>
          <p className="mb-8 leading-relaxed">
            Essa abordagem trouxe mais objetividade às discussões do time e permitiu priorizar correções com maior impacto para os usuários.
          </p>

          <div className="my-12">
            <img src={planilhaErrosImg} alt="Planilha de Priorização" className="w-full h-auto rounded-2xl border border-[#E2DCD4]  max-w-4xl mx-auto" />
            <p className="text-center text-sm text-[#6F625B] mt-4 font-medium">Modelo utilizado para classificar e priorizar os problemas encontrados durante os testes.</p>
          </div>

          <h3 className="text-xl font-bold mb-6">Principais aprendizados dos testes</h3>
          <p className="mb-8 leading-relaxed">
            Os testes confirmaram que a proposta de centralizar a devolutiva dentro da plataforma gerava valor para todos os perfis de usuário. Ao mesmo tempo, revelaram oportunidades importantes para tornar a experiência mais intuitiva e reduzir dúvidas durante a preparação e condução das conversas. Mais do que validar interfaces, essa etapa ajudou a compreender como gestores realmente se preparavam para uma devolutiva e quais informações eram essenciais para apoiar essa conversa.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 not-prose">
            <div className="bg-[#F0EDE8] p-6 rounded-2xl border border-[#E2DCD4]">
              <h4 className="font-bold text-[#9E4322] mb-4 text-base flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                O que funcionou bem
              </h4>
              <p className="text-sm text-[#7D7169] leading-relaxed mb-3">Alguns padrões apareceram de forma consistente entre os participantes.</p>
              <ul className="list-disc pl-5 space-y-2.5 text-sm text-[#7D7169] leading-relaxed">
                <li>O painel lateral de preparação foi percebido como um dos principais diferenciais da solução por organizar todas as informações necessárias para a conversa em um único lugar.</li>
                <li>A consolidação automática das avaliações também foi bastante valorizada. Reunir autoavaliação, avaliação da liderança, feedbacks e demais informações reduzia significativamente o trabalho manual realizado pelos gestores antes das reuniões.</li>
                <li>Outro ponto positivo foi a simplicidade do fluxo. A maioria dos participantes conseguiu navegar pelas etapas sem necessidade de treinamento, indicando que a estrutura geral da experiência estava adequada.</li>
                <li>A possibilidade de exportar a devolutiva in PDF também foi vista como um recurso importante para registro, compartilhamento e consulta posterior.</li>
              </ul>
            </div>

            <div className="bg-[#F0EDE8] p-6 rounded-2xl border border-[#E2DCD4]">
              <h4 className="font-bold text-red-700 mb-4 text-base flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                Principais oportunidades de melhoria
              </h4>
              <p className="text-sm text-[#7D7169] leading-relaxed mb-3">Embora a estrutura da solução tenha sido bem recebida, os testes revelaram alguns desafios importantes.</p>
              <ul className="list-disc pl-5 space-y-2.5 text-sm text-[#7D7169] leading-relaxed">
                <li>O principal deles estava relacionado ao entendimento do processo. Muitos usuários ainda confundiam avaliação e devolutiva, demonstrando dificuldade para identificar em que etapa da jornada estavam e qual era a origem das informações apresentadas.</li>
                <li>Também observamos dificuldades de navegação. Alguns participantes encontravam obstáculos para localizar suas devolutivas, interpretar determinados rótulos e compreender o significado de alguns estados da interface.</li>
                <li>Outro ponto recorrente foi a falta de visibilidade para gestores e RH. Os usuários esperavam filtros, indicadores de andamento e uma visão consolidada que facilitasse o acompanhamento das devolutivas realizadas e pendentes.</li>
                <li>Além disso, surgiram dúvidas sobre o funcionamento das anotações privadas, comportamento de componentes colapsáveis e alguns padrões de interação que geravam expectativas diferentes da implementação proposta.</li>
              </ul>
              <p className="text-sm text-[#7D7169] leading-relaxed mt-3 italic">Esses aprendizados direcionaram grande parte das melhorias realizadas antes do lançamento.</p>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4">Oportunidades levantadas pelos usuários</h3>
          <p className="mb-4 leading-relaxed">
            Além dos ajustes de usabilidade, os participantes compartilharam diversas sugestões que ampliavam o potencial da funcionalidade. As ideias mais recorrentes foram:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>assistência por Inteligência Artificial durante a preparação da devolutiva;</li>
            <li>anotações privadas para gestores;</li>
            <li>campo específico para registro de pontos fortes;</li>
            <li>espaço para registrar combinados definidos na reunião;</li>
            <li>integração com Plano de Desenvolvimento Individual (PDI) e Educorp;</li>
            <li>histórico completo das devolutivas realizadas;</li>
            <li>controle de envio com rascunho, agendamento e pré-visualização;</li>
            <li>exportações e relatórios consolidados para acompanhamento pelo RH.</li>
          </ul>
          <p className="mb-8 leading-relaxed">
            Embora nem todas essas sugestões fizessem parte do escopo inicial, elas ajudaram a construir a visão de evolução da funcionalidade.
          </p>

          <h2 id="da-pesquisa-a-inteligencia-artificial-relatorio" className="text-2xl font-bold mb-4">Da pesquisa à Inteligência Artificial</h2>
          <p className="mb-6 leading-relaxed">
            Um dos comentários apareceu repetidamente durante os testes. Os gestores reconheciam o valor de reunir todas as avaliações em um único lugar, mas afirmavam que interpretar esse volume de informações ainda exigia bastante tempo.
          </p>
          <p className="mb-6 leading-relaxed">
            Essa observação reforçou uma hipótese que já existia dentro do time: o maior problema não era acessar os dados, mas transformá-los rapidamente em uma conversa de qualidade.
          </p>
          <p className="mb-6 leading-relaxed">
            Foi a partir dessa evidência que passamos a explorar o uso de Inteligência Artificial como apoio à preparação da devolutiva. Em vez de substituir o gestor, a IA teria o papel de sintetizar dezenas de avaliações, destacar padrões, identificar temas recorrentes e sugerir uma estrutura inicial para a conversa.
          </p>
          <p className="mb-8 leading-relaxed">
            Mesmo enfrentando limitações técnicas durante o desenvolvimento, conseguimos priorizar essa funcionalidade e incluí-la já na primeira versão do produto.
          </p>

          <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center">
              <img src={ia1Img} alt="Inteligência Artificial 1" className="w-full h-auto rounded-2xl border border-[#E2DCD4] " />
              <p className="text-center text-sm text-[#6F625B] mt-3 font-medium">Assistência contextual destacando os principais pontos identificados nas avaliações.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={ia2Img} alt="Inteligência Artificial 2" className="w-full h-auto rounded-2xl border border-[#E2DCD4] " />
              <p className="text-center text-sm text-[#6F625B] mt-3 font-medium">Geração de um primeiro rascunho para apoiar a preparação da devolutiva.</p>
            </div>
          </div>

          <p className="mb-8 leading-relaxed">
            A introdução da Inteligência Artificial transformou a devolutiva em algo mais do que um espaço para registrar informações. Ela passou a atuar como um copiloto para os gestores, reduzindo o tempo de preparação das reuniões, diminuindo o esforço de análise — especialmente em avaliações 360° — e ajudando a garantir que nenhum feedback relevante fosse esquecido durante a conversa.
          </p>

          <h2 id="solucao-final-relatorio" className="text-2xl font-bold mb-4">Solução final 2</h2>
          <p className="mb-8 leading-relaxed">
            O resultado do projeto foi uma experiência integrada que finalmente concluía todo o ciclo de Performance dentro da plataforma. Cada perfil passou a contar com funcionalidades específicas para suas responsabilidades, mantendo todas as informações conectadas em uma única jornada.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
            <div className="flex flex-col items-center">
              <img src={rh1Img} alt="Visão do RH" className="w-full h-auto rounded-2xl border border-[#E2DCD4] " />
              <h4 className="font-bold text-[#241510] mt-4 mb-2 text-lg">RH</h4>
              <p className="text-center text-sm text-[#7D7169] leading-relaxed">O RH passou a configurar os períodos de devolutiva, acompanhar a evolução das lideranças, identificar pendências e monitorar indicadores relacionados ao processo.</p>
            </div>

            <div className="flex flex-col items-center">
              <img src={gestor1Img} alt="Visão do Gestor" className="w-full h-auto rounded-2xl border border-[#E2DCD4] " />
              <h4 className="font-bold text-[#241510] mt-4 mb-2 text-lg">Gestor</h4>
              <p className="text-center text-sm text-[#7D7169] leading-relaxed">Os gestores passaram a preparar, registrar e compartilhar devolutivas diretamente na plataforma, contando com apoio da Inteligência Artificial para organizar informações e reduzir o tempo gasto na preparação das conversas.</p>
            </div>

            <div className="flex flex-col items-center">
              <img src={colab1Img} alt="Visão do Colaborador" className="w-full h-auto rounded-2xl border border-[#E2DCD4] " />
              <h4 className="font-bold text-[#241510] mt-4 mb-2 text-lg">Colaborador</h4>
              <p className="text-center text-sm text-[#7D7169] leading-relaxed">Os colaboradores passaram a receber oficialmente suas devolutivas dentro do produto, criando um histórico permanente de desenvolvimento conectado às avaliações anteriores e ao Plano de Desenvolvimento Individual.</p>
            </div>
          </div>

          <p className="mb-8 leading-relaxed">
            Mais do que entregar uma nova funcionalidade, a solução conectou etapas que antes aconteciam de forma isolada, permitindo que avaliações, devolutivas e desenvolvimento contínuo passassem a fazer parte de uma única experiência.
          </p>

          <h2 id="resultados-relatorio" className="text-2xl font-bold mb-4">Resultados</h2>
          <p className="mb-6 leading-relaxed">
            A funcionalidade foi lançada inicialmente como uma prova de conceito para uso interno, permitindo validar tanto a experiência quanto o valor gerado para os usuários antes de uma disponibilização mais ampla.
          </p>
          <p className="mb-6 leading-relaxed">
            Os resultados mostraram que a decisão de integrar a devolutiva ao produto atendia uma necessidade real dos clientes.
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>95% dos gestores utilizaram a funcionalidade durante a POC.</li>
            <li>O RH passou a acompanhar um processo que antes acontecia totalmente fora da plataforma.</li>
            <li>Gestores deixaram de depender de apresentações, documentos e planilhas para conduzir as devolutivas.</li>
            <li>A Inteligência Artificial reduziu significativamente o tempo necessário para preparar as conversas, especialmente em ciclos de avaliação 360°.</li>
            <li>A funcionalidade apresentou alta aceitação e continuou evoluindo após a POC, tornando-se parte oficial do produto de Performance.</li>
          </ul>
          <p className="mb-8 leading-relaxed">
            Mais do que lançar uma nova funcionalidade, o projeto eliminou uma ruptura existente na jornada. Pela primeira vez, avaliações, devolutivas e desenvolvimento passaram a fazer parte de uma experiência única e contínua dentro da plataforma.
          </p>

          <h2 id="minha-atuacao-relatorio" className="text-2xl font-bold mb-4">Minha atuação</h2>
          <p className="mb-6 leading-relaxed">
            Atuei de ponta a ponta durante todo o projeto, conduzindo tanto as atividades de Discovery quanto a definição e validação da solução. Minhas principais responsabilidades foram:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <li>Conduzir o Discovery e estruturar o plano de pesquisa.</li>
            <li>Facilitar a dinâmica de CSD e consolidar os insumos dos stakeholders.</li>
            <li>Realizar o benchmark competitivo e identificar oportunidades de diferenciação.</li>
            <li>Conduzir a dinâmica de Faz / Não Faz para definição de escopo.</li>
            <li>Consolidar pesquisas existentes e transformar evidências em direcionamentos de produto.</li>
            <li>Mapear a jornada completa da devolutiva envolvendo RH, gestores e colaboradores.</li>
            <li>Priorizar oportunidades utilizando matriz GUT.</li>
            <li>Definir a arquitetura da experiência.</li>
            <li>Desenhar fluxos, wireframes e protótipos navegáveis.</li>
            <li>Planejar e conduzir os testes de usabilidade.</li>
            <li>Priorizar melhorias em conjunto com Produto e Engenharia.</li>
            <li>Definir a experiência de Inteligência Artificial incorporada à funcionalidade.</li>
          </ul>
          <p className="mb-8 leading-relaxed">
            Ao longo do projeto, atuei como elo entre pesquisa, estratégia e execução, garantindo que as decisões de produto fossem sustentadas por evidências e evoluíssem continuamente a partir dos aprendizados obtidos durante o desenvolvimento.
          </p>

          <h2 id="principais-aprendizados-relatorio" className="text-2xl font-bold mb-4">Principais aprendizados</h2>
          <p className="mb-6 leading-relaxed">
            Este projeto reforçou alguns aprendizados que continuam influenciando minha forma de conduzir processos de Design.
          </p>
          <div className="space-y-6 mb-8">
            <div className="border-l-4 border-[#9E4322] pl-4">
              <h4 className="font-bold text-[#241510] mb-2">Discovery não significa começar do zero</h4>
              <p className="text-sm text-[#7D7169] leading-relaxed">Grande parte das respostas que precisávamos já existia dentro da empresa. Consolidar pesquisas realizadas anteriormente permitiu acelerar o entendimento do problema, evitar retrabalho e concentrar esforços nas lacunas que realmente precisavam ser investigadas. Mais do que produzir novas pesquisas, o desafio foi transformar conhecimento disperso em uma visão única e acionável.</p>
            </div>
            <div className="border-l-4 border-[#9E4322] pl-4">
              <h4 className="font-bold text-[#241510] mb-2">O maior desafio era comportamental</h4>
              <p className="text-sm text-[#7D7169] leading-relaxed">Criar uma funcionalidade para registrar devolutivas era relativamente simples. O verdadeiro desafio era convencer gestores a abandonar processos que já funcionavam para eles, ainda que fossem baseados em documentos, planilhas ou apresentações. Isso exigiu que a solução oferecesse ganhos claros de eficiência e organização desde o primeiro uso.</p>
            </div>
            <div className="border-l-4 border-[#9E4322] pl-4">
              <h4 className="font-bold text-[#241510] mb-2">A Inteligência Artificial precisava potencializar o gestor</h4>
              <p className="text-sm text-[#7D7169] leading-relaxed">Durante todo o projeto buscamos evitar que a IA substituísse a tomada de decisão humana. Seu papel foi reduzir o esforço operacional de analisar grandes volumes de avaliações, permitindo que gestores dedicassem mais tempo ao que realmente importa: a conversa, o desenvolvimento e a construção de planos de ação. Esse equilíbrio foi determinante para a boa aceitação da funcionalidade.</p>
            </div>
            <div className="border-l-4 border-[#9E4322] pl-4">
              <h4 className="font-bold text-[#241510] mb-2">Encerrar o ciclo foi tão importante do quanto iniciar</h4>
              <p className="text-sm text-[#7D7169] leading-relaxed">O principal resultado deste projeto não foi a criação de uma nova tela. Foi conectar uma etapa crítica que permanecia desconectada de todo o restante da experiência. Ao integrar avaliações, devolutivas e desenvolvimento contínuo em um único fluxo, o produto passou a acompanhar toda a jornada de Performance, oferecendo mais valor para RH, gestores e colaboradores. Esse projeto reforçou uma convicção que levo para outros desafios: muitas vezes, inovação não significa adicionar novas funcionalidades, mas eliminar rupturas existentes na experiência e conectar processos que já fazem parte da rotina dos usuários.</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Shield,
  Code,
  User,
  MessageSquare,
  PlayCircle,
  BarChart2,
  LayoutGrid,
  Users,
  UserPlus,
  Check} from 'lucide-react';
import { Gallery } from '../components/Gallery';
import { AiWorkflowDiagram } from '../components/AiWorkflowDiagram';
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
import kbaDiscoveryImg from '../assets/images/KBA/KBA-Discovery.png';
import kbaEstrategiaImg from '../assets/images/KBA/KBA-Estratégia.png';
import kbaIaImg from '../assets/images/KBA/KBA-IA.png';
import kbaHandoffImg from '../assets/images/KBA/KBA-Handoff.png';


const H2 = 'font-serif text-3xl font-bold text-[#241510] mb-4';
const LEAD = 'text-[#7D7169] leading-relaxed mb-8';

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

export const KbaSenhaContent = () => {
  const [viewMode, setViewMode] = useState<'simplificado' | 'relatorio'>('simplificado');

  return (
    <div className={viewMode === 'simplificado' ? 'mode-simplificado' : 'mode-relatorio'}>
      {/* Switcher - hidden */}
      <div className="hidden justify-center mb-12 not-prose">
        <div className="bg-[#E2DCD4]/60 p-1.5 rounded-full flex gap-1 border border-[#E2DCD4]">
          <button
            onClick={() => setViewMode('simplificado')}
            className={`px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${viewMode === 'simplificado'
              ? 'bg-[#9E4322] text-white shadow-sm'
              : 'text-[#6F625B] hover:text-[#241510]'
              }`}
          >
            <Sparkles size={16} />
            Simplificado
          </button>
          <button
            onClick={() => setViewMode('relatorio')}
            className={`px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${viewMode === 'relatorio'
              ? 'bg-[#9E4322] text-white shadow-sm'
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
          {/* Contexto */}
          <div className="mb-32">
            <h2 id="contexto" className={H2}>Um problema recorrente, e caro, de suporte</h2>
            <p className={LEAD}>
              Entre os contatos mais frequentes com o suporte estavam candidatos que não recebiam o e-mail de redefinição, tinham perdido acesso ao e-mail cadastrado ou não conseguiam concluir o processo.
            </p>
            <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ['Centenas de tickets', 'nos últimos 90 dias, só nesse fluxo.'],
                ['Milhares de reais', 'por mês em atendimento desse tipo de chamado.'],
              ].map(([value, label]) => (
                <div key={value} className="border border-[#E2DCD4] rounded-2xl p-7">
                  <p className="font-serif text-[32px] font-bold text-[#241510] leading-tight">{value}</p>
                  <p className="text-[15px] text-[#6F625B] leading-relaxed mt-2">{label}</p>
                </div>
              ))}
            </div>
            <p className="not-prose text-[13px] text-[#8A7F78] mt-4">Tínhamos o valor exato desse impacto, mas optei por não divulgá-lo neste case.</p>
          </div>

          {/* Desafio */}
          <div className="mb-32">
            <h2 id="desafio" className={H2}>Tornar o fluxo self-service</h2>
            <p className={LEAD}>O desafio era equilibrar três fatores ao mesmo tempo:</p>
            <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {[
                { Icon: Shield, title: 'Segurança', desc: 'Sem abrir espaço para fraude ou uso indevido.' },
                { Icon: Code, title: 'Viabilidade técnica', desc: 'Algo possível de entregar no curto prazo.' },
                { Icon: User, title: 'Experiência self-service', desc: 'Recuperar o acesso sem depender do suporte.', highlight: true },
              ].map(({ Icon, title, desc, highlight }) => (
                <div key={title} className={`rounded-2xl p-7 ${highlight ? 'bg-[#F6EAE3]' : 'border border-[#E2DCD4]'}`}>
                  <Icon size={22} className={highlight ? 'text-[#9E4322]' : 'text-[#6F625B]'} />
                  <h3 className="font-serif font-bold text-[19px] text-[#241510] leading-snug mt-4 mb-1.5">{title}</h3>
                  <p className="text-[14px] text-[#6F625B] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <h3 className="font-serif text-xl font-bold text-[#241510] mb-2">Perguntas que precisavam de resposta</h3>
            <ol className="not-prose divide-y divide-[#E2DCD4]">
              {[
                'Como recuperar o acesso sem depender do e-mail cadastrado originalmente?',
                'Como manter a segurança contra fraude sem adicionar fricção à experiência?',
                'Como entregar algo tecnicamente viável no curto prazo?',
              ].map((q, i) => (
                <li key={q} className="flex gap-4 py-4">
                  <span className="text-[15px] font-semibold text-[#9E4322] tabular-nums pt-px">{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-[15px] text-[#4F4440] leading-relaxed">{q}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Discovery */}
          <div className="mb-32">
            <h2 id="discovery" className={H2}>A recuperação de conta era só o sintoma</h2>
            <p className={LEAD}>
              Analisei diferentes fontes para entender onde as pessoas travavam na jornada de acesso como um todo: login, recuperação de conta e de senha.
            </p>

            <div className="not-prose grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { Icon: MessageSquare, text: <>Principais motivos de <b>tickets de suporte</b></> },
                  { Icon: PlayCircle, text: <>Sessões gravadas e mapas de calor no <b>Hotjar</b></> },
                  { Icon: BarChart2, text: <>Dados de navegação no <b>Google Analytics</b></> },
                  { Icon: LayoutGrid, text: <><b>Benchmark</b> de login social e recuperação de conta</> },
                ].map(({ Icon, text }, i) => (
                  <div key={i} className="border border-[#E2DCD4] rounded-2xl p-5">
                    <Icon size={20} className="text-[#6F625B] mb-3" />
                    <p className="text-[14px] text-[#4F4440] leading-snug">{text}</p>
                  </div>
                ))}
              </div>
              <img src={kbaDiscoveryImg} alt="Análise das telas de login e recuperação" className="w-full h-auto animate-float" />
            </div>

            <p className={LEAD}>A investigação mostrou que a recuperação de conta era apenas o sintoma de problemas mais amplos na jornada de login.</p>
            <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              {[
                { group: 'Autenticação e login', items: ['Baixa adoção do login social', 'Fluxos inconsistentes entre login tradicional e Google', 'Criação obrigatória de senha mesmo após login social', 'Mensagens pouco claras durante o login'] },
                { group: 'Cadastro', items: ['Erros de digitação no e-mail ao criar a conta', 'E-mails corporativos, depois desativados, impediam recuperações futuras'] },
              ].map(({ group, items }) => (
                <div key={group}>
                  <h3 className="font-sans font-semibold text-[16px] text-[#241510] mb-1">{group}</h3>
                  <ul className="divide-y divide-[#E2DCD4]">
                    {items.map(item => <li key={item} className="py-3 text-[14px] text-[#6F625B] leading-relaxed">{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Estratégia */}
          <div className="mb-32">
            <h2 id="estrategia" className={H2}>Dividindo o mapa de oportunidades em frentes</h2>
            <p className={LEAD}>As oportunidades viraram duas frentes: uma para evoluir a autenticação e outra, do meu time, para resolver a recuperação de conta.</p>
            <img src={kbaEstrategiaImg} alt="Mapa de oportunidades e hipóteses" className="w-full h-auto mb-8" />

            <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-[#E2DCD4] rounded-2xl p-7">
                <span className="text-[14px] text-[#6F625B]">Frente 1 · Time de Candidatos</span>
                <h3 className="font-serif font-bold text-[21px] text-[#241510] leading-snug mt-1 mb-4">Evolução da jornada de autenticação</h3>
                <ul className="divide-y divide-[#E2DCD4]">
                  {['Incentivar o login social', 'Eliminar a senha obrigatória após cadastro via Google', 'Melhorar as mensagens de erro', 'Detectar erros de digitação no e-mail', 'Alertar sobre o risco de e-mail corporativo', 'Evoluir para um modelo passwordless'].map(item => (
                    <li key={item} className="py-2.5 text-[14px] text-[#6F625B]">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#F6EAE3] rounded-2xl p-7">
                <span className="text-[14px] text-[#9E4322]">Frente 2 · Meu time</span>
                <h3 className="font-serif font-bold text-[21px] text-[#241510] leading-snug mt-1 mb-3">Nova recuperação de conta</h3>
                <p className="text-[14px] text-[#6F625B] leading-relaxed mb-5">
                  Recuperar o acesso mesmo sem o e-mail original, equilibrando segurança, experiência e viabilidade técnica. Avaliamos três formas de validar a identidade:
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="rounded-full border border-[#E2C9BB] bg-white/60 px-4 py-2 text-[14px] text-[#4F4440]">Gov.br</span>
                  <span className="rounded-full border border-[#E2C9BB] bg-white/60 px-4 py-2 text-[14px] text-[#4F4440]">Reconhecimento facial</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#9E4322] px-4 py-2 text-[14px] font-semibold text-white"><Check size={15} strokeWidth={2.5} /> KBA</span>
                </div>
                <p className="text-[14px] text-[#6F625B] leading-relaxed">O KBA atendia melhor ao conjunto de critérios.</p>
              </div>
            </div>
          </div>

          {/* Prototipação */}
          <div className="mb-32">
            <h2 id="prototipacao" className={H2}>Estressando cenários e a lógica</h2>
            <p className={LEAD}>
              Usei o Figma Make para validar a lógica, as regras de negócio e os cenários antes de construir as telas definitivas. Isso acelerou o alinhamento entre Produto, Design e Engenharia e reduziu retrabalho antes do desenvolvimento.
            </p>
            <img src={kbaIaImg} alt="Protótipos no Figma Make e telas" className="w-full h-auto" />
          </div>

          {/* Handoff: título, texto e imagem dentro do bloco escuro */}
          <div className="not-prose w-screen relative left-1/2 -translate-x-1/2 bg-[#272727] py-20 md:py-24 mb-32 overflow-hidden rounded-2xl">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12">
              <h2 id="handoff" className="font-serif text-3xl font-bold text-white mb-4">Documentação completa</h2>
              <p className="text-[#B9B4AE] leading-relaxed max-w-3xl mb-8">
                Com o Cursor integrado ao MCP do Figma e ao Storybook, construí telas próximas da implementação real e simulei estados extremos, entregando um handoff mais completo para a engenharia.
              </p>
              <div className="flex flex-wrap gap-2 mb-12">
                {['Fluxo completo documentado', 'Estados de sucesso e erro', 'Edge cases especificados', 'Eventos mapeados para o Google Analytics'].map(item => (
                  <span key={item} className="rounded-full border border-white/20 px-4 py-2 text-[14px] text-white/85">{item}</span>
                ))}
              </div>
              <img src={kbaHandoffImg} alt="Documentação completa e handoff" className="w-full h-auto object-contain" />
            </div>
          </div>

          <div className="mb-32">
            {/* Fluxo de construção com IA: Figma → AI Studio → Figma → Cursor (MCP do Design System) → GitHub → time de dev */}
            <div className="not-prose my-12">
              <h3 className="font-serif text-xl font-bold text-[#241510] mb-2">Do Figma ao código com IA</h3>
              <p className="text-[15px] text-[#6F625B] leading-relaxed mb-6 max-w-3xl">A IA encurtou a distância entre design e código: um protótipo rápido no Google AI Studio para validar a ideia, ajustes no Figma e o Cursor conectado ao MCP do Design System para gerar telas reais, que seguiram pelo GitHub direto para o time de desenvolvimento.</p>
              <AiWorkflowDiagram />
            </div>
          </div>

          {/* Rollout */}
          <div className="mb-32">
            <h2 id="rollout" className={H2}>Resultados da liberação gradual</h2>
            <p className={LEAD}>Liberamos para 5% da base para acompanhar o comportamento em produção antes de expandir. Em uma semana, observamos:</p>
            <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Candidatos recuperando a conta pelo novo fluxo, 100% self-service.', 'Nenhum erro relevante no rollout inicial.'].map(item => (
                <div key={item} className="border border-[#E2DCD4] rounded-2xl p-7">
                  <Check size={24} className="text-[#2E7D4F]" strokeWidth={2.5} />
                  <p className="text-[16px] text-[#241510] font-medium leading-relaxed mt-4">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Impacto */}
          <div className="mb-16">
            <h2 id="impacto" className={H2}>De ticket manual a funcionalidade de produto</h2>
            <p className="not-prose border-l-2 border-[#9E4322] pl-6 text-[17px] text-[#4F4440] leading-relaxed mb-10">
              Um processo que dependia inteiramente do suporte virou uma funcionalidade self-service, com uma base escalável para evoluir a estratégia de autenticação do produto.
            </p>
            <ol className="not-prose divide-y divide-[#E2DCD4]">
              {[
                'Redução esperada no volume de tickets de recuperação de acesso.',
                'Menor custo operacional com atendimento manual.',
                'Fundação para evoluir a estratégia de autenticação.',
              ].map((item, i) => (
                <li key={item} className="flex gap-4 py-4">
                  <span className="text-[15px] font-semibold text-[#9E4322] tabular-nums pt-px">{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-[15px] text-[#4F4440] leading-relaxed">{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Contexto</h2>
          <p className="mb-6 leading-relaxed">
            A recuperação de acesso era um dos principais motivos de contato com o suporte da plataforma. Entre os casos mais recorrentes estavam candidatos que não recebiam o e-mail de redefinição de senha, haviam perdido acesso ao e-mail cadastrado ou encontravam dificuldades para concluir o processo.
          </p>
          <p className="mb-6 leading-relaxed">
            Nos últimos 90 dias, esse fluxo gerava cerca de milhares tickets por mês. Considerando um custo médio entre R$ 2,50 e R$ 3,00 por atendimento deste tipo de problema, isso representava um impacto milheres de reais por ano apenas para resolver um problema que poderia ser automatizado. <i> *Nós tinhamos os números concretos mas preferir não trazer no post.</i>
          </p>
          <p className="mb-8 leading-relaxed">
            Mais do que reduzir custos, havia uma oportunidade clara de melhorar a experiência dos candidatos, permitindo que recuperassem suas contas de forma rápida, segura e totalmente independente do suporte.
          </p>

          <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Gallery items={kbaContextGallery1} />
              <p className="text-center text-sm text-[#6F625B] mt-6 font-medium">Base de tickets enviada pelo time de Suporte, utilizada como ponto de partida para identificar os principais motivos de contato relacionados ao login e à recuperação de acesso.</p>
            </div>

            <div>
              <Gallery items={kbaContextGallery2} />
              <p className="text-center text-sm text-[#6F625B] mt-6 font-medium">Análise realizada em conjunto entre Produto e Suporte, organizando os principais tipos de chamados, sua frequência e as oportunidades de reduzir atendimentos por meio de uma solução de produto.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">Meu papel</h2>
          <p className="mb-8 leading-relaxed">
            Como Product Designer, fui responsável por auxiliar a descoberta da solução, junto ao PM do meu time e a triáde do time de cadidatos. Estruturar a experiência do novo fluxo de recuperação de conta, facilitar as decisões junto aos stakeholders, prototipar diferentes alternativas, desenhar as interfaces finais, especificar os eventos de monitoramento e realizar o handoff para desenvolvimento.
          </p>

          <h2 id="discovery" className="text-2xl font-bold mb-4">Descoberta</h2>
          <p className="mb-6 leading-relaxed">
            A investigação começou pela análise de diferentes fontes de informação para entender onde os usuários encontravam dificuldades ao tentar acessar suas contas. Utilizamos:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>análise dos principais motivos de tickets de suporte;</li>
            <li>sessões gravadas e mapas de comportamento no Hotjar;</li>
            <li>dados de navegação no Google Analytics;</li>
            <li>conversas com o time responsável pela experiência dos candidatos;</li>
            <li>benchmark de produtos que utilizam autenticação social e recuperação de conta.</li>
          </ul>
          <p className="mb-6 leading-relaxed">
            A análise mostrou que a recuperação de senha era apenas um sintoma de problemas mais amplos na jornada de autenticação. Ao longo da investigação identificamos diferentes pontos de fricção.
          </p>

          <h4 className="font-bold mb-2">Problemas relacionados à autenticação</h4>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>baixa adoção do login social;</li>
            <li>fluxos inconsistentes entre autenticação tradicional e login com Google;</li>
            <li>criação obrigatória de senha mesmo após autenticação social;</li>
            <li>mensagens pouco claras durante o processo de login.</li>
          </ul>

          <h4 className="font-bold mb-2">Problemas relacionados ao cadastro</h4>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>erros de digitação no e-mail durante a criação da conta;</li>
            <li>uso frequente de e-mails corporativos que posteriormente eram desativados, impedindo futuras recuperações de acesso.</li>
          </ul>

          <p className="mb-8 leading-relaxed">
            Esses aprendizados mostraram que a oportunidade ia além da recuperação de senha. Era necessário evoluir toda a experiência de autenticação da plataforma.
          </p>

          <div className="my-12">
            <Gallery items={kbaDiscoveryGallery} />
            <p className="text-center text-sm text-[#6F625B] mt-6 font-medium">Análises realizadas para compreender o comportamento dos usuários durante o fluxo de autenticação. Utilizamos gravações do Hotjar, mapas de comportamento e eventos de navegação para identificar pontos de atrito, validar hipóteses e entender as principais causas dos problemas encontrados.</p>
          </div>

          <h2 id="estrategia" className="text-2xl font-bold mb-4">Estratégia</h2>
          <p className="mb-6 leading-relaxed">
            A partir dos aprendizados da descoberta, estruturamos duas frentes de trabalho.
          </p>

          <div className="bg-[#E2DCD4] p-6 rounded-2xl text-[#241510] mb-8">
            <h4 className="font-bold mb-2">Frente 1 — Evolução da jornada de autenticação</h4>
            <p className="text-sm mb-4 leading-relaxed">
              Essa iniciativa ficou sob responsabilidade do time de Candidatos e tinha como objetivo corrigir problemas estruturais da experiência de login. As principais oportunidades identificadas foram:
            </p>
            <ul className="list-disc pl-5 text-sm space-y-1 leading-relaxed">
              <li>incentivar o uso do login social;</li>
              <li>eliminar a criação obrigatória de senha após cadastros realizados com Google;</li>
              <li>melhorar as mensagens de erro ao longo da jornada;</li>
              <li>detectar possíveis erros de digitação em endereços de e-mail;</li>
              <li>alertar usuários sobre os riscos de utilizar e-mails corporativos;</li>
              <li>criar fallbacks inteligentes para recuperação de conta;</li>
              <li>evoluir gradualmente a experiência para um modelo passwordless.</li>
            </ul>
          </div>

          <div className="bg-[#E2DCD4] p-6 rounded-2xl text-[#241510] mb-8">
            <h4 className="font-bold mb-2">Frente 2 — Nova recuperação de conta</h4>
            <p className="text-sm mb-4 leading-relaxed">
              Meu time ficou responsável por resolver o problema mais crítico identificado durante a pesquisa: permitir que candidatos recuperassem suas contas mesmo sem acesso ao e-mail originalmente cadastrado.
            </p>
            <p className="text-sm mb-4 leading-relaxed">
              O principal desafio era encontrar uma solução que equilibrasse três fatores: segurança, experiência do usuário e viabilidade técnica. Estudamos diferentes alternativas para validar qual abordagem atendia melhor a esses critérios:
            </p>
            <ul className="list-disc pl-5 text-sm space-y-1 leading-relaxed mb-4">
              <li>recuperação utilizando Gov.br;</li>
              <li>reconhecimento facial;</li>
              <li>Knowledge-Based Authentication (KBA).</li>
            </ul>
            <p className="text-sm mb-4 leading-relaxed">
              As opções baseadas em Gov.br e biometria facial apresentavam maior complexidade técnica, além de dependerem de integrações externas que inviabilizavam sua implementação no curto prazo.
            </p>
            <p className="text-sm mb-4 leading-relaxed">
              Optamos pelo Knowledge-Based Authentication (KBA), utilizando perguntas baseadas em informações que apenas o próprio candidato deveria conhecer.
            </p>
            <p className="text-sm leading-relaxed">
              Além de resolver rapidamente o problema, essa abordagem permitia evoluir continuamente o conjunto de perguntas à medida que novos dados fossem incorporados à plataforma, tornando a solução cada vez mais robusta.
            </p>
          </div>

          <div className="my-12">
            <Gallery items={kbaEstrategiaGallery} />
            <p className="text-center text-sm text-[#6F625B] mt-6 font-medium">Árvore de oportunidades consolidando os principais aprendizados da descoberta. A partir das análises, organizamos os problemas em pilares de atuação e definimos duas frentes de evolução para a experiência de autenticação e recuperação de conta.</p>
          </div>

          <h2 id="prototipacao-acelerada-com-ia" className="text-2xl font-bold mb-4">Prototipação acelerada com IA</h2>
          <p className="mb-6 leading-relaxed">
            Para explorar rapidamente diferentes possibilidades de solução, utilizei o Figma Make como ferramenta de prototipação. O objetivo não era construir interfaces finais, mas validar rapidamente a lógica do produto, as regras de negócio e os diferentes cenários antes de investir tempo na construção definitiva das telas.
          </p>
          <p className="mb-6 leading-relaxed">
            Os protótipos permitiram discutir, em poucas horas, diferentes possibilidades com stakeholders e engenharia, refinando rapidamente o funcionamento da solução. Os principais cenários explorados foram:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>tentativas sucessivas de recuperação;</li>
            <li>limites de tentativas;</li>
            <li>bloqueios temporários;</li>
            <li>fluxos de erro;</li>
            <li>recuperações malsucedidas;</li>
            <li>regras de segurança;</li>
            <li>exceções e edge cases.</li>
          </ul>
          <p className="mb-6 leading-relaxed">
            Essa abordagem acelerou significativamente o alinhamento entre Produto, Design e Engenharia, reduzindo retrabalho antes mesmo do início do desenvolvimento.
          </p>
          <p className="mb-8 leading-relaxed">
            Após a validação das regras de negócio, reconstruí todo o fluxo no Figma utilizando o Design System da empresa, refinando componentes, estados, responsividade e especificações para desenvolvimento.
          </p>

          <div className="my-12">
            <Gallery items={kbaPrototiposGallery} />
            <p className="text-center text-sm text-[#6F625B] mt-6 font-medium">Protótipos exploratórios criados no Figma Make para acelerar a construção da solução. A IA foi utilizada para validar rapidamente fluxos, regras de negócio, cenários de erro e edge cases antes da construção definitiva no Figma.</p>
          </div>

          <h2 id="entrega" className="text-2xl font-bold mb-4">Entrega</h2>
          <p className="mb-6 leading-relaxed">
            Além do desenho das interfaces, entreguei toda a documentação necessária para implementação da solução, incluindo:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>fluxo completo documentado;</li>
            <li>estados de sucesso e erro;</li>
            <li>especificação dos edge cases;</li>
            <li>mapeamento de eventos para Google Analytics;</li>
            <li>handoff completo para engenharia.</li>
          </ul>
          <p className="mb-8 leading-relaxed">
            Como se tratava de um fluxo operacional, definimos que o sucesso seria acompanhado principalmente por eventos analíticos e indicadores operacionais, em vez de métricas tradicionais de satisfação ou usabilidade.
          </p>

          <div className="my-12">
            <Gallery items={kbaEntregaGallery} />
            <p className="text-center text-sm text-[#6F625B] mt-6 font-medium">Fluxo completo documentado no Figma, reunindo todas as telas, estados, regras de negócio e especificações utilizadas durante o desenvolvimento da funcionalidade.</p>
          </div>

          <h2 className="text-2xl font-bold mb-4">Rollout</h2>
          <p className="mb-6 leading-relaxed">
            Por se tratar de um fluxo sensível de autenticação, optamos por um rollout gradual, liberando inicialmente a funcionalidade para 5% da base de usuários. Essa estratégia permitiu acompanhar o comportamento da solução em produção, validar as regras implementadas e identificar rapidamente qualquer comportamento inesperado antes da expansão para toda a base.
          </p>
          <p className="mb-6 leading-relaxed">
            Já nos primeiros dias de operação observamos resultados positivos:
          </p>
          <ul className="list-disc pl-5 mb-8 space-y-2">
            <li>candidatos recuperando suas contas com sucesso pelo novo fluxo;</li>
            <li>ausência de erros relevantes durante o rollout inicial;</li>
            <li>usuários resolvendo o problema de forma totalmente self-service, sem necessidade de contato com o suporte.</li>
          </ul>

          <p className="mb-6 leading-relaxed">
            Eu saí do projeto logo após o rollout. Com isso, não tenho dados tão relevantes em relação ao desempenho da funcionalidade no ar. O que eu consegui colher foi esse feedback positivo da primeira semana de uso.
          </p>

          <h2 id="impacto" className="text-2xl font-bold mb-4">Impacto</h2>
          <p className="mb-6 leading-relaxed">
            O projeto transformou um processo totalmente manual em uma funcionalidade de produto.
          </p>
          <p className="mb-6 leading-relaxed">
            Antes da implementação, sempre que um candidato perdia o acesso ao e-mail cadastrado era necessário abrir um ticket para que a equipe de suporte realizasse a alteração manualmente. Além do tempo de espera, o processo gerava um alto volume de atendimentos e consumia esforço operacional contínuo.
          </p>
          <p className="mb-6 leading-relaxed">
            Com a nova solução, os próprios usuários passaram a recuperar suas contas de forma rápida, segura e totalmente independente do suporte.
          </p>
          <p className="mb-6 leading-relaxed">
            A iniciativa vai reduzir significativamente o volume de tickets relacionados à recuperação de acesso, diminuiu o custo operacional associado ao atendimento e reduziu o tempo necessário para que candidatos voltassem a utilizar a plataforma.
          </p>
          <p className="mb-8 leading-relaxed">
            Mais do que resolver um problema pontual, o projeto estabeleceu uma base sólida para a evolução da estratégia de autenticação do produto. A escolha pelo Knowledge-Based Authentication (KBA) permitiu criar uma solução escalável, capaz de incorporar novos mecanismos de validação conforme a plataforma evolui, mantendo o equilíbrio entre segurança, experiência do usuário e viabilidade técnica.
          </p>
        </>
      )}
    </div>
  );
};

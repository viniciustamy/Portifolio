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
  Check,
  Image
} from 'lucide-react';
import performanceCycleLabeled from '../assets/images/Devolutiva/performance_cycle_labeled_1783032402492.jpg';
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
import { Carousel } from '../components/Carousel';
import { Gallery } from '../components/Gallery';
import { PlatformToday } from '../components/PlatformToday';
import dash01 from '../assets/images/Dash/Dash - 01.png';
import dash02 from '../assets/images/Dash/Dash - 02.png';
import dash03 from '../assets/images/Dash/Dash - 03.png';
import dash04 from '../assets/images/Dash/Dash-04.png';
import dash05 from '../assets/images/Dash/Dash-05.png';
import dash06 from '../assets/images/Dash/Dash-06.png';
import dash07 from '../assets/images/Dash/Dash-07.png';
import dash08 from '../assets/images/Dash/Dash-08.png';
import dash09 from '../assets/images/Dash/Dash-09.png';
import dash10 from '../assets/images/Dash/Dash-10.png';
import dash11 from '../assets/images/Dash/Dash-11.png';
import dash12 from '../assets/images/Dash/Dash-12.png';
import dash13 from '../assets/images/Dash/Dash-13.png';
import dash14 from '../assets/images/Dash/Dash-14.png';
import dash15 from '../assets/images/Dash/Dash-15.png';
import dash16 from '../assets/images/Dash/Dash-16.png';
import dash17 from '../assets/images/Dash/Dash-17.png';
import dash18 from '../assets/images/Dash/Dash-18.png';
import dash19 from '../assets/images/Dash/Dash-19.png';
import dash20 from '../assets/images/Dash/Dash-20.png';
import dash21 from '../assets/images/Dash/Dash-21.png';
import dash22 from '../assets/images/Dash/Dash-22.mov';
import dash23 from '../assets/images/Dash/Dash-23.png';
import dash24 from '../assets/images/Dash/Dash-24.png';
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

const VisualPlaceholder = ({ label }: { label: string }) => (
  <div className="w-full aspect-[16/7] bg-[#F4F2EB] rounded-[1.5rem] flex flex-col items-center justify-center p-6 border border-dashed border-[#DCD7CA] my-8 relative overflow-hidden group hover:border-[#006266]/30 transition-all duration-300">
    <div className="absolute inset-0 bg-[radial-gradient(#DCD7CA_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#787265] mb-3 border border-[#EBE7DD] shadow-sm">
        <Image size={20} />
      </div>
      <span className="text-[#787265] font-sans font-bold text-[11px] tracking-widest uppercase">{label}</span>
    </div>
  </div>
);

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
        <div className="bg-[#EBE7DD]/60 p-1.5 rounded-full flex gap-1 border border-[#DCD7CA]">
          <button
            onClick={() => setViewMode('simplificado')}
            className={`px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${viewMode === 'simplificado'
              ? 'bg-[#006266] text-white shadow-sm'
              : 'text-[#787265] hover:text-[#2C3539]'
              }`}
          >
            <Sparkles size={16} />
            Simplificado
          </button>
          <button
            onClick={() => setViewMode('relatorio')}
            className={`px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${viewMode === 'relatorio'
              ? 'bg-[#006266] text-white shadow-sm'
              : 'text-[#787265] hover:text-[#2C3539]'
              }`}
          >
            <BookOpen size={16} />
            Relatório Completo
          </button>
        </div>
      </div>

      {viewMode === 'simplificado' ? (
        <>
          {/* Seção 2: Contexto */}
          <div className="mb-24">
            <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-2">
              CONTEXTO
            </span>
            <h2 id="contexto" className="font-serif text-3xl font-bold text-[#2C3539] mb-4">
              Um problema recorrente, e caro, de suporte
            </h2>
            <p className="text-[#4A5559] leading-relaxed mb-8">
              Entre os casos mais recorrentes de contato com o suporte estavam candidatos que não recebiam o e-mail de redefinição de senha, haviam perdido acesso ao e-mail cadastrado, ou encontravam dificuldade para concluir o processo.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8 not-prose">
              <div className="border-l-2 border-[#DCD7CA] p-10">
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#C05621] mb-2">
                  Centenas de tickets
                </h3>
                <p className="text-sm text-[#787265] leading-relaxed">
                  nos últimos 90 dias, só nesse fluxo.
                </p>
              </div>

              <div className="border-l-2 border-[#DCD7CA] p-10">
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#8C2727] mb-2">
                  Milhares de reais
                </h3>
                <p className="text-sm text-[#787265] leading-relaxed">
                  de custo em atendimento desse tipo de chamado por mês. Um número fora do aceitável.
                </p>
              </div>
            </div>

            <p className="text-xs italic text-[#787265] mt-4">
              Nota: tínhamos o valor exato desse impacto, mas optamos por não divulgá-lo neste case.
            </p>
          </div>

          {/* Seção 3: O Desafio */}
          <div className="mb-24">
            <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-2">
              O DESAFIO
            </span>
            <h2 id="desafio" className="font-serif text-3xl font-bold text-[#2C3539] mb-4">
              Tornar o fluxo self service
            </h2>
            <p className="text-[#4A5559] leading-relaxed mb-8">
              O principal desafio era encontrar uma solução que equilibrasse os seguintes fatores:
            </p>

            {/* Diagrama */}
            <div className="p-8 my-8 not-prose">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-2xl mx-auto">
                {/* Left Stack */}
                <div className="flex flex-col gap-4 w-full md:w-56">
                  <div className="bg-white border border-[#DCD7CA] rounded-xl p-4 flex items-center justify-center gap-3 text-[#2C3539] font-medium text-sm shadow-sm">
                    <Shield size={18} className="text-[#4A5559]" />
                    <span>Segurança</span>
                  </div>
                  <div className="bg-white border border-[#DCD7CA] rounded-xl p-4 flex items-center justify-center gap-3 text-[#2C3539] font-medium text-sm shadow-sm">
                    <Code size={18} className="text-[#4A5559]" />
                    <span>Viabilidade tecnica</span>
                  </div>
                </div>

                {/* Plus Sign */}
                <div className="text-2xl font-light text-[#787265] px-2">+</div>

                {/* Right Big Box */}
                <div className="bg-white border-2 border-[#006266] rounded-xl p-8 flex flex-col items-center justify-center text-center w-full md:w-64 shadow-sm">
                  <User size={28} className="text-[#006266] mb-2" />
                  <span className="font-bold text-[#006266] text-base md:text-lg">
                    Experiência Self service
                  </span>
                </div>
              </div>

              <div className="text-center mt-12 mb-6">
                <span className="font-bold text-[#2C3539] text-sm">
                  Perguntas que precisavam ser respondidas.
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="border-l-2 border-[#DCD7CA] p-8">
                  <p className="italic text-xs md:text-base text-[#4A5559] leading-relaxed">
                    Como permitir o usuário recuperar acesso sem depender do e-mail originalmente cadastrado?
                  </p>
                </div>
                <div className="border-l-2 border-[#DCD7CA] p-8">
                  <p className="italic text-xs md:text-base text-[#4A5559] leading-relaxed">
                    Como manter segurança sem abrir espaço para fraude/uso indevido, sem adicionar fricção à experiência?
                  </p>
                </div>
                <div className="border-l-2 border-[#DCD7CA] p-8">
                  <p className="italic text-xs md:text-base text-[#4A5559] leading-relaxed">
                    Como entregar algo tecnicamente viável no curto prazo?
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Seção 4: Discovery */}
          <div className="mb-24">
            <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-2">
              DISCOVERY
            </span>
            <h2 id="discovery" className="font-serif text-3xl font-bold text-[#2C3539] mb-4">
              A recuperação de conta era só o sintoma
            </h2>
            <p className="text-[#4A5559] leading-relaxed mb-8">
              Realizamos a análise de diferentes fontes para entender onde os usuários encontravam dificuldades no fluxo de login como um todo: Login, recuperação de conta, recuperação de senha etc.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center not-prose my-16">
              {/* Left Column 4 Cards */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-x-4 gap-y-2.5">
                <div className="h-[200px] bg-white border border-[#EBE7DD] rounded-xl p-8 flex flex-col justify-center">
                  <MessageSquare size={24} className="text-[#24555C] mb-4" />
                  <span className="text-base font-normal text-[#2C3539] leading-snug">
                    Principais motivos de <b>tickets de suporte</b>.
                  </span>
                </div>
                <div className="h-[200px] bg-white border border-[#EBE7DD] rounded-xl p-8 flex flex-col justify-center">
                  <PlayCircle size={24} className="text-[#24555C] mb-4" />
                  <span className="text-base font-normal text-[#2C3539] leading-snug">
                    Análise de sessões gravadas e mapas de <b>comportamento no Hotjar</b>.
                  </span>
                </div>
                <div className="h-[200px] bg-white border border-[#EBE7DD] rounded-xl p-8 flex flex-col justify-center">
                  <BarChart2 size={24} className="text-[#24555C] mb-4" />
                  <span className="text-base font-normal text-[#2C3539] leading-snug">
                    Dados de navegação no <b>Google Analytics</b>.
                  </span>
                </div>
                <div className="h-[200px] bg-white border border-[#EBE7DD] rounded-xl p-8 flex flex-col justify-center">
                  <LayoutGrid size={24} className="text-[#24555C] mb-4" />
                  <span className="text-base font-normal text-[#2C3539] leading-snug">
                    <b>Benchmark</b> de autenticação social e recuperação de conta.
                  </span>
                </div>
              </div>

              {/* Right Column Image */}
              <div className="lg:col-span-4 flex flex-col justify-center">
                <img
                  src={kbaDiscoveryImg}
                  alt="Discovery - Análise de Login e Telas"
                  className="w-[180%] max-w-none h-auto translate-x-12 animate-float"
                />
              </div>
            </div>

            <p className="text-[#4A5559] leading-relaxed mb-8">
              A investigação mostrou que a recuperação de conta era apenas um sintoma de problemas mais amplos na jornada de login.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
              {/* Left Group */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Users size={18} className="text-[#8C2727]" />
                  <h4 className="font-serif font-bold text-[#8C2727] text-xl">
                    Relacionados à autenticação e login
                  </h4>
                </div>
                <div className="space-y-3">
                  <div className="border-l-2 border-[#8C2727] bg-[#FFF5F5] p-6 rounded-r-lg">
                    <p className="text-xs md:text-sm font-medium text-[#2C3539]">
                      Baixa adoção do login social
                    </p>
                  </div>
                  <div className="border-l-2 border-[#8C2727] bg-[#FFF5F5] p-6 rounded-r-lg">
                    <p className="text-xs md:text-sm font-medium text-[#2C3539]">
                      Fluxos inconsistentes entre login tradicional e Google
                    </p>
                  </div>
                  <div className="border-l-2 border-[#8C2727] bg-[#FFF5F5] p-6 rounded-r-lg">
                    <p className="text-xs md:text-sm font-medium text-[#2C3539]">
                      Criação obrigatória de senha mesmo após login social
                    </p>
                  </div>
                  <div className="border-l-2 border-[#8C2727] bg-[#FFF5F5] p-6 rounded-r-lg">
                    <p className="text-xs md:text-sm font-medium text-[#2C3539]">
                      Mensagens pouco claras durante o login
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Group */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <UserPlus size={18} className="text-[#C05621]" />
                  <h4 className="font-serif font-bold text-[#C05621] text-xl">
                    Relacionados ao cadastro
                  </h4>
                </div>
                <div className="space-y-3">
                  <div className="border-l-2 border-[#C05621] bg-[#FBF8F5] p-6 rounded-r-lg">
                    <p className="text-xs md:text-sm font-medium text-[#2C3539]">
                      Erros de digitação no e-mail na criação da conta
                    </p>
                  </div>
                  <div className="border-l-2 border-[#C05621] bg-[#FBF8F5] p-6 rounded-r-lg">
                    <p className="text-xs md:text-sm font-medium text-[#2C3539]">
                      Uso de e-mails corporativos, depois desativados, que impediam recuperações futuras
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seção 5: Estratégia e Hipóteses de Solução */}
          <div className="mb-24">
            <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-2">
              ESTRATÉGIA E HIPÓTESES DE SOLUÇÃO
            </span>
            <h2 id="estrategia" className="font-serif text-3xl font-bold text-[#2C3539] mb-4">
              Dividindo o mapa de oportunidades em suas frentes.
            </h2>

            {/* Imagem Diagrama/Mapa de Oportunidades */}
            <img
              src={kbaEstrategiaImg}
              alt="Mapa de Oportunidades e Hipóteses"
              className="w-full h-auto"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 -mt-24 relative z-10 not-prose">
              {/* Frente 1 */}
              <div className="border border-[#DCD7CA] rounded-2xl overflow-hidden bg-white flex flex-col justify-between">
                <div className="bg-[#D8D2C5] px-6 py-4 border-b border-[#DCD7CA]">
                  <span className="text-sm font-bold text-[#2C3539]">
                    Frente 1 - Time de Candidatos
                  </span>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-2xl text-[#2C3539] mb-6">
                      Evolução da jornada de autenticação
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-[#4A5559] leading-relaxed">
                      <li>Incentivar login social</li>
                      <li>Eliminar senha obrigatória após cadastro via Google</li>
                      <li>Melhorar mensagens de erro</li>
                      <li>Detectar erros de digitação em e-mails</li>
                      <li>Alertar sobre riscos de e-mail corporativo</li>
                      <li>Evoluir para um modelo passwordless</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Frente 2 */}
              <div className="border border-[#DCD7CA] rounded-2xl overflow-hidden bg-white flex flex-col justify-between">
                <div className="bg-[#1F5459] px-6 py-4">
                  <span className="text-sm font-bold text-white">
                    Frente 2 · Meu time
                  </span>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-2xl text-[#2C3539] mb-6">
                      Nova recuperação de conta
                    </h3>
                    <p className="text-sm text-[#4A5559] leading-relaxed mb-6">
                      Resolver o problema mais crítico: recuperar acesso mesmo sem o e-mail originalmente cadastrado, equilibrando segurança, experiência e viabilidade técnica.
                    </p>
                    <p className="text-sm text-[#4A5559] mb-3">
                      Avaliamos as seguintes opções de validação de identidade:
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <div className="bg-white border border-[#DCD7CA] px-4 py-2 rounded-xl text-xs md:text-sm font-medium text-[#2C3539]">
                        Gov.br
                      </div>
                      <div className="bg-white border border-[#DCD7CA] px-4 py-2 rounded-xl text-xs md:text-sm font-medium text-[#2C3539]">
                        Reconhecimento facial
                      </div>
                      <div className="bg-[#1F5459] text-white px-4 py-2 rounded-xl text-xs md:text-sm font-semibold flex items-center gap-1.5">
                        <Check size={16} className="stroke-[2.5]" />
                        <span>KBA</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-[#4A5559] leading-relaxed">
                    O KBA foi escolhido por atender melhor ao conjunto de critérios avaliados.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Seção 6: Prototipação Acelerada com IA */}
          <div className="mb-24">
            <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-2">
              PROTOTIPAÇÃO ACELERADA COM IA
            </span>
            <h2 id="prototipacao" className="font-serif text-3xl font-bold text-[#2C3539] mb-4">
              Estressar cenários e a lógica
            </h2>
            <p className="text-[#4A5559] leading-relaxed mb-6">
              Usei o Figma Make para validar rapidamente a lógica do produto, as regras de negócio e os cenários, antes de investir tempo na construção definitiva das telas. Isso acelerou o alinhamento entre Produto, Design e Engenharia, reduzindo retrabalho antes mesmo do início do desenvolvimento.
            </p>

            <img
              src={kbaIaImg}
              alt="Protótipos Figma Make e Telas"
              className="w-full h-auto my-8"
            />
          </div>

          {/* Seção 7: Handoff */}
          <div className="mb-24">
            <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-2">
              HANDOFF
            </span>
            <h2 id="handoff" className="font-serif text-3xl font-bold text-[#2C3539] mb-4">
              Documentação completa
            </h2>
            <p className="text-[#4A5559] leading-relaxed mb-6">
              Com o Cursor integrado ao MCP do Figma e ao Storybook, construí telas próximas da implementação real e simulei estados extremos, entregando um handoff mais completo para engenharia.
            </p>

            {/* Bloco da Imagem Full Width */}
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#272727] py-16 md:py-20 px-4 md:px-12 my-10 not-prose overflow-hidden flex items-center justify-center">
              <div className="max-w-7xl mx-auto w-full">
                <img
                  src={kbaHandoffImg}
                  alt="Documentação Completa & Handoff"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 my-6 not-prose">
              <div className="bg-white border border-[#DCD7CA] px-5 py-2.5 rounded-full text-xs md:text-sm font-medium text-[#2C3539]">
                Fluxo completo documentado
              </div>
              <div className="bg-white border border-[#DCD7CA] px-5 py-2.5 rounded-full text-xs md:text-sm font-medium text-[#2C3539]">
                Estados de sucesso e erro
              </div>
              <div className="bg-white border border-[#DCD7CA] px-5 py-2.5 rounded-full text-xs md:text-sm font-medium text-[#2C3539]">
                Especificação dos edge cases
              </div>
              <div className="bg-white border border-[#DCD7CA] px-5 py-2.5 rounded-full text-xs md:text-sm font-medium text-[#2C3539]">
                Mapeamento de eventos para Google Analytics
              </div>
            </div>
          </div>

          {/* Seção 8: Rollout e Resultados */}
          <div className="mb-24">
            <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-2">
              ROLLOUT E RESULTADOS
            </span>
            <h2 id="rollout" className="font-serif text-3xl font-bold text-[#2C3539] mb-4">
              Resultados da liberação gradual
            </h2>
            <p className="text-[#4A5559] leading-relaxed mb-8">
              5% da base liberada inicialmente, para acompanhar comportamento em produção antes da expansão. Com uam semana foi possivel oberservar:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
              <div className="border-l-2 border-[#006266] bg-[#F5F9F9] p-8 flex flex-col justify-between">
                <Check size={32} className="text-[#006266] mb-6 stroke-[2]" />
                <p className="text-[#2C3539] font-medium text-base md:text-lg leading-relaxed">
                  Candidatos recuperando contas com sucesso pelo novo fluxo. 100% self service
                </p>
              </div>

              <div className="border-l-2 border-[#006266] bg-[#F5F9F9] p-8 flex flex-col justify-between">
                <Check size={32} className="text-[#006266] mb-6 stroke-[2]" />
                <p className="text-[#2C3539] font-medium text-base md:text-lg leading-relaxed">
                  Ausência de erros relevantes no rollout inicial.
                </p>
              </div>
            </div>
          </div>

          {/* Seção 9: Impacto */}
          <div className="mb-24">
            <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-2">
              IMPACTO
            </span>
            <h2 id="impacto" className="font-serif text-3xl font-bold text-[#2C3539] mb-4">
              De ticket manual a funcionalidade de produto
            </h2>

            <div className="border-l-2 border-[#2C3539] pl-6 py-2 my-8">
              <p className="font-sans font-semibold text-lg md:text-xl text-[#24555C] leading-relaxed">
                Um processo que dependia inteiramente do suporte virou uma funcionalidade self-service, com uma base escalável para evoluir a estratégia de autenticação do produto.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose my-8">
              <div className="border-l-2 border-[#DCD7CA] pl-6 py-2">
                <p className="text-sm text-[#4A5559] leading-relaxed">
                  Potencial de redução relevante no volume de tickets de recuperação de acesso gerando menos custo operacional.
                </p>
              </div>
              <div className="border-l-2 border-[#DCD7CA] pl-6 py-2">
                <p className="text-sm text-[#4A5559] leading-relaxed">
                  Menor custo operacional associado ao atendimento manual
                </p>
              </div>
              <div className="border-l-2 border-[#DCD7CA] pl-6 py-2">
                <p className="text-sm text-[#4A5559] leading-relaxed">
                  Fundação estabelecida para a evolução da estratégia de autenticação
                </p>
              </div>
            </div>
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
              <p className="text-center text-sm text-[#787265] mt-6 font-medium">Base de tickets enviada pelo time de Suporte, utilizada como ponto de partida para identificar os principais motivos de contato relacionados ao login e à recuperação de acesso.</p>
            </div>

            <div>
              <Gallery items={kbaContextGallery2} />
              <p className="text-center text-sm text-[#787265] mt-6 font-medium">Análise realizada em conjunto entre Produto e Suporte, organizando os principais tipos de chamados, sua frequência e as oportunidades de reduzir atendimentos por meio de uma solução de produto.</p>
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
            <p className="text-center text-sm text-[#787265] mt-6 font-medium">Análises realizadas para compreender o comportamento dos usuários durante o fluxo de autenticação. Utilizamos gravações do Hotjar, mapas de comportamento e eventos de navegação para identificar pontos de atrito, validar hipóteses e entender as principais causas dos problemas encontrados.</p>
          </div>

          <h2 id="estrategia" className="text-2xl font-bold mb-4">Estratégia</h2>
          <p className="mb-6 leading-relaxed">
            A partir dos aprendizados da descoberta, estruturamos duas frentes de trabalho.
          </p>

          <div className="bg-[#EBE7DD] p-6 rounded-2xl text-[#2C3539] mb-8">
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

          <div className="bg-[#EBE7DD] p-6 rounded-2xl text-[#2C3539] mb-8">
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
            <p className="text-center text-sm text-[#787265] mt-6 font-medium">Árvore de oportunidades consolidando os principais aprendizados da descoberta. A partir das análises, organizamos os problemas em pilares de atuação e definimos duas frentes de evolução para a experiência de autenticação e recuperação de conta.</p>
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
            <p className="text-center text-sm text-[#787265] mt-6 font-medium">Protótipos exploratórios criados no Figma Make para acelerar a construção da solução. A IA foi utilizada para validar rapidamente fluxos, regras de negócio, cenários de erro e edge cases antes da construção definitiva no Figma.</p>
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
            <p className="text-center text-sm text-[#787265] mt-6 font-medium">Fluxo completo documentado no Figma, reunindo todas as telas, estados, regras de negócio e especificações utilizadas durante o desenvolvimento da funcionalidade.</p>
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

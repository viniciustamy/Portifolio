import React from 'react';
import CESImg from '../assets/images/Post Métricas/CES.png';
import Metrica1Img from '../assets/images/Post Métricas/Métrica 1.png';
import Metrica2Img from '../assets/images/Post Métricas/Métrica 2.png';
import Metrica3Img from '../assets/images/Post Métricas/Métrica 3.png';
import Metrica4Img from '../assets/images/Post Métricas/Métrica 4.png';
import { AnimatedNumber } from '../components/AnimatedNumber';

export const MetricasExperienciaContent = () => (
  <div className="mode-simplificado">
    {/* Contexto */}
    <div className="mb-16">
      <span className="text-brand font-sans font-bold text-xs uppercase tracking-widest block mb-2">Contexto</span>
      <h2 className="font-serif text-3xl font-semibold text-primary mb-6">Saindo da operação para entender o todo</h2>
      <p className="text-muted-foreground leading-relaxed mb-6">
        Dentro dos times, era comum após finalizar e lançar um projeto, seguirmos direto para a próxima iniciativa. Sem tempo para estruturar um ciclo de acompanhamento completo para aquela funcionalidade ou fluxo lançado.
      </p>
      <p className="text-muted-foreground leading-relaxed">
        Quando assumi como Design Lead, passei a ter mais espaço para olhar além da operação. Junto com meu Head de Design identificamos a falta de acompanhamento contínuo dos principais fluxos do produto e começamos a trabalhar.
      </p>
    </div>

    {/* Desafio */}
    <div className="mb-24 flex flex-col gap-8">
      <div className="w-full">
        <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-2">Desafio</span>
        <h2 className="font-serif text-3xl font-semibold text-primary mb-6">Estruturar a primeira rotina de métricas de experiência</h2>
        <p className="text-muted-foreground leading-relaxed mb-8">
          O objetivo era conseguir responder continuamente algumas perguntas cruciais sobre o produto
        </p>

        <div className="flex flex-wrap gap-3 items-start">
          <div className="border border-[#C19B76] text-[#4A5559] px-4 py-2.5 rounded-lg text-[13px] font-medium bg-white">
            Quais fluxos estão funcionando bem?
          </div>
          <div className="border border-[#C19B76] text-[#4A5559] px-4 py-2.5 rounded-lg text-[13px] font-medium bg-white">
            Quais geram mais esforço?
          </div>
          <div className="border border-[#C19B76] text-[#4A5559] px-4 py-2.5 rounded-lg text-[13px] font-medium bg-white">
            Como a experiência evolui ao longo do tempo?
          </div>
          <div className="border border-[#C19B76] text-[#4A5559] px-4 py-2.5 rounded-lg text-[13px] font-medium bg-white">
            Quais problemas aparecem de forma recorrente?
          </div>
          <div className="border border-[#C19B76] text-[#4A5559] px-4 py-2.5 rounded-lg text-[13px] font-medium bg-white">
            Onde deveríamos concentrar nossos esforços de design?
          </div>
        </div>
      </div>
    </div>

    {/* Tipo de pesquisa */}
    <div className="mb-16">
      <span className="text-brand font-sans font-bold text-xs uppercase tracking-widest block mb-2">Tipo de pesquisa</span>
      <h2 className="font-serif text-3xl font-semibold text-primary mb-6">Começamos pelo esforço</h2>
      <p className="text-muted-foreground leading-relaxed mb-8">
        Os principais fluxos do produto eram, em grande parte, etapas obrigatórias para gestores e colaboradores. Nesse contexto, antes de saber se as pessoas gostavam da experiência, queríamos entender se conseguiam realizar suas tarefas sem esforço excessivo. Por isso optamos pelo CES.
      </p>

      {/* Imagem do CES */}
      <div className="w-full flex flex-col items-center">
        <img src={CESImg} alt="Escala CES (Customer Effort Score)" className="w-full max-w-2xl h-auto object-contain" />
        <span className="text-[13px] text-[#8C9A9E] mt-3 italic text-center max-w-2xl px-4">
          Customer Effort Score ou Índice de Esforço do Cliente
        </span>
      </div>
    </div>

    {/* Estrutura */}
    <div className="mb-24">
      <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-2">ESTRUTURA</span>
      <h2 className="font-serif text-3xl font-semibold text-primary mb-12">Pesquisa criadas</h2>

      <div className="flex flex-col md:flex-row gap-8 justify-between text-center mb-16 px-4 md:px-12">
        <div className="flex flex-col items-center">
          <div className="flex items-baseline gap-2 mb-2">
            <AnimatedNumber value={11} className="text-7xl font-serif text-[#1F4746] font-semibold leading-none" />
            <span className="text-4xl font-serif text-[#1F4746] font-semibold">fluxos</span>
          </div>
          <p className="text-[13px] text-[#4A5559]">fluxos monitorados</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-baseline gap-2 mb-2">
            <AnimatedNumber value={3} className="text-7xl font-serif text-[#1F4746] font-semibold leading-none" />
            <span className="text-4xl font-serif text-[#1F4746] font-semibold">personas</span>
          </div>
          <p className="text-[13px] text-[#4A5559]">RH · Líder · Colaborador</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-baseline gap-2 mb-2">
            <AnimatedNumber value={6} className="text-7xl font-serif text-[#1F4746] font-semibold leading-none" />
            <span className="text-4xl font-serif text-[#1F4746] font-semibold">meses</span>
          </div>
          <p className="text-[13px] text-[#4A5559]">de acompanhamento</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-[#2C3539] mb-4 text-[15px]">Fluxos do RH</h3>
          <ul className="space-y-2">
            <li className="bg-[#FCFAF8] border-l-2 border-[#D8C7B5] p-3 text-[13px] text-[#4A5559]">Rede de relacionamento visão RH</li>
            <li className="bg-[#FCFAF8] border-l-2 border-[#D8C7B5] p-3 text-[13px] text-[#4A5559]">Comitê</li>
            <li className="bg-[#FCFAF8] border-l-2 border-[#D8C7B5] p-3 text-[13px] text-[#4A5559]">Devolutivas visão RH</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-[#2C3539] mb-4 text-[15px]">Fluxos do Gestor</h3>
          <ul className="space-y-2">
            <li className="bg-[#FCFAF8] border-l-2 border-[#D8C7B5] p-3 text-[13px] text-[#4A5559]">Rede de relacionamento visão gestor</li>
            <li className="bg-[#FCFAF8] border-l-2 border-[#D8C7B5] p-3 text-[13px] text-[#4A5559]">Devolutivas visão gestor</li>
            <li className="bg-[#FCFAF8] border-l-2 border-[#D8C7B5] p-3 text-[13px] text-[#4A5559]">Feedback visão gestor</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-[#2C3539] mb-4 text-[15px]">Fluxos do Colaborador</h3>
          <ul className="space-y-2">
            <li className="bg-[#FCFAF8] border-l-2 border-[#D8C7B5] p-3 text-[13px] text-[#4A5559]">Rede de relacionamento visão colaborador</li>
            <li className="bg-[#FCFAF8] border-l-2 border-[#D8C7B5] p-3 text-[13px] text-[#4A5559]">Responder avaliação</li>
            <li className="bg-[#FCFAF8] border-l-2 border-[#D8C7B5] p-3 text-[13px] text-[#4A5559]">Devolutivas visão colaborador</li>
            <li className="bg-[#FCFAF8] border-l-2 border-[#D8C7B5] p-3 text-[13px] text-[#4A5559]">PDI visão colaborador</li>
            <li className="bg-[#FCFAF8] border-l-2 border-[#D8C7B5] p-3 text-[13px] text-[#4A5559]">Feedback visão colaborador</li>
          </ul>
        </div>
      </div>
    </div>

    {/* Monitoramento */}
    <div className="mb-24">
      <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-2">MONITORAMENTO</span>
      <h2 className="font-serif text-3xl font-semibold text-primary mb-6">H1 - De janeiro a junho</h2>
      <p className="text-muted-foreground leading-relaxed mb-16">
        Durante o H1 de 2025, acompanhei os resultados mês a mês, consolidando as respostas, a amostragem e os comentários de cada fluxo.
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-24 text-center mb-16">
        <div>
          <div className="text-[90px] font-serif text-[#1F4746] font-semibold leading-none mb-4">
            <AnimatedNumber value={3725} format={(v) => v.toLocaleString('pt-BR')} />
          </div>
          <p className="text-[#4A5559] text-[15px]">Respostas coletadas</p>
        </div>
        <div>
          <div className="text-[90px] font-serif text-[#1F4746] font-semibold leading-none mb-4">
            <AnimatedNumber value={764} />
          </div>
          <p className="text-[#4A5559] text-[15px]">Comentários analisados</p>
        </div>
      </div>

      {/* Imagem da planilha/dashboard */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex flex-col items-center mt-8 mb-16">
        <img src={Metrica1Img} alt="Planilha/Dashboard de Monitoramento" className="w-full h-[400px] object-contain" />
        <span className="text-[13px] text-[#8C9A9E] mt-4 italic text-center px-4">
          Planilha de monitoramento contínuo consolidando respostas, amostragem e comentários por fluxo.
        </span>
      </div>
    </div>

    {/* Performance das pesquisas */}
    <div className="mb-24">
      <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-4">PERFORMANCE DAS PESQUISAS</span>
      <h2 className="font-serif text-[32px] font-semibold text-[#2C3539] mb-12">Alcance e desempenho das pesquisas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-16">
        {/* Coluna Esquerda */}
        <div className="border-l-2 border-[#5C898A] p-4 md:pl-8">
          <h3 className="text-[#417676] text-[22px] font-medium leading-tight mb-4">
            Os fluxos de colaboradores tiveram as melhores performances
          </h3>
          <p className="text-[#4A5559] text-[15px] leading-relaxed mb-10">
            O fluxo de Responder avaliação foi o maior fluxo
          </p>

          <div className="flex gap-12 mb-10">
            <div className="flex flex-col">
              <span className="font-serif text-[28px] font-bold text-[#2C3539] mb-1">+2 mil</span>
              <span className="text-[14px] text-[#4A5559]">respostas</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-[28px] font-bold text-[#2C3539] mb-1">616,6%</span>
              <span className="text-[14px] text-[#4A5559]">da amostragem esperada</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-[28px] font-bold text-[#2C3539] mb-1">CES 4,0</span>
            <span className="text-[14px] text-[#4A5559]">baixo esforço</span>
          </div>
        </div>

        {/* Coluna Direita */}
        <div className="border-l-2 border-[#BC504E] p-4 md:pl-8">
          <h3 className="text-[#A53A3A] text-[22px] font-medium leading-tight mb-4">
            Nem todos os fluxos tinham sinal<br />suficiente
          </h3>
          <p className="text-[#4A5559] text-[15px] leading-relaxed mb-10">
            Os fluxos de RH apresentaram volumes muito menores.
          </p>

          <div className="flex flex-col mb-10">
            <span className="font-serif text-[28px] font-bold text-[#2C3539] mb-1">Devolutiva RH</span>
            <span className="text-[14px] text-[#4A5559]">9 respostas · 6% da amostragem</span>
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-[28px] font-bold text-[#2C3539] mb-1">Rede RH</span>
            <span className="text-[14px] text-[#4A5559]">16 respostas · 10,7% da amostragem</span>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center mt-8">
        <img src={Metrica2Img} alt="Slide de Performance das pesquisas" className="w-full max-w-5xl h-auto object-contain" />
        <span className="text-[13px] text-[#8C9A9E] mt-4 italic text-center max-w-2xl px-4">
          Slide da apresentação de fechamento do H1 sobre a performance das pesquisas
        </span>
      </div>
    </div>

    {/* Resultados */}
    <div className="mb-24">
      <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-4">RESULTADOS</span>
      <h2 className="font-serif text-[32px] font-semibold text-[#2C3539] mb-6">Principais dores encontradas</h2>
      <p className="text-[#4A5559] text-[15px] leading-relaxed mb-12">
        Analisei os comentários fluxo a fluxo e consolidei os padrões encontrados em uma documentação compartilhada com o time.
      </p>

      {/* Grid de 5 Dores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        <div className="bg-[#FDF7F7] border-l-2 border-[#D96557] p-8">
          <p className="text-[#D96557] font-bold text-[11px] mb-2 tracking-wide uppercase">DOR #1</p>
          <h4 className="text-[#A53A3A] font-bold text-[20px] mb-3">Usabilidade</h4>
          <p className="text-[#4A5559] text-[14px] leading-relaxed">Navegação pouco intuitiva, interfaces confusas e necessidade de muitos passos.</p>
        </div>
        <div className="bg-[#FDF7F7] border-l-2 border-[#D96557] p-8">
          <p className="text-[#D96557] font-bold text-[11px] mb-2 tracking-wide uppercase">DOR #2</p>
          <h4 className="text-[#A53A3A] font-bold text-[20px] mb-3">Gerenciamento</h4>
          <p className="text-[#4A5559] text-[14px] leading-relaxed">Falta de visão consolidada, filtros e formas mais eficientes de organizar informações.</p>
        </div>
        <div className="bg-[#FDF7F7] border-l-2 border-[#D96557] p-8">
          <p className="text-[#D96557] font-bold text-[11px] mb-2 tracking-wide uppercase">DOR #3</p>
          <h4 className="text-[#A53A3A] font-bold text-[20px] mb-3">Processos</h4>
          <p className="text-[#4A5559] text-[14px] leading-relaxed">Fluxos repetitivos, burocráticos e algumas etapas incompletas.</p>
        </div>
        <div className="bg-[#FDF7F7] border-l-2 border-[#D96557] p-8">
          <p className="text-[#D96557] font-bold text-[11px] mb-2 tracking-wide uppercase">DOR #4</p>
          <h4 className="text-[#A53A3A] font-bold text-[20px] mb-3">Interface</h4>
          <p className="text-[#4A5559] text-[14px] leading-relaxed">Problemas de hierarquia, campos pequenos e inconsistências visuais.</p>
        </div>
        <div className="bg-[#FDF7F7] border-l-2 border-[#D96557] p-8">
          <p className="text-[#D96557] font-bold text-[11px] mb-2 tracking-wide uppercase">DOR #5</p>
          <h4 className="text-[#A53A3A] font-bold text-[20px] mb-3">Estabilidade</h4>
          <p className="text-[#4A5559] text-[14px] leading-relaxed">Erros de login, dados inconsistentes e problemas pontuais de funcionamento.</p>
        </div>
      </div>

      <h2 className="font-serif text-[32px] font-semibold text-[#2C3539] mb-6">Também descobrimos o que preservar</h2>
      <p className="text-[#4A5559] text-[15px] leading-relaxed mb-12">
        A análise não serviu apenas para encontrar problemas. Algumas experiências foram consistentemente bem avaliadas:
      </p>

      {/* Grid de 3 Preservar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-[#F4F9F9] border-l-2 border-[#5C898A] p-8">
          <h4 className="text-[#417676] font-bold text-[20px] mb-3">Feedback</h4>
          <p className="text-[#4A5559] text-[14px] leading-relaxed">Percebido como simples e útil para registrar e acompanhar o desenvolvimento.</p>
        </div>
        <div className="bg-[#F4F9F9] border-l-2 border-[#5C898A] p-8">
          <h4 className="text-[#417676] font-bold text-[20px] mb-3">Devolutiva para líderes</h4>
          <p className="text-[#4A5559] text-[14px] leading-relaxed">A clareza das informações e das avaliações foi bastante elogiada.</p>
        </div>
        <div className="bg-[#F4F9F9] border-l-2 border-[#5C898A] p-8">
          <h4 className="text-[#417676] font-bold text-[20px] mb-3">Rede de relacionamento</h4>
          <p className="text-[#4A5559] text-[14px] leading-relaxed">A experiência para colaboradores foi percebida como simples e intuitiva.</p>
        </div>
      </div>

      <div className="w-full flex flex-col items-center mt-8">
        <img src={Metrica3Img} alt="Slide de Resultados" className="w-full max-w-6xl h-auto object-contain" />
        <span className="text-[13px] text-[#8C9A9E] mt-4 italic text-center max-w-2xl px-4">
          Slides da apresentação de fechamento do H1.
        </span>
      </div>
    </div>

    {/* Próximos passos */}
    <div className="mb-24">
      <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-4">PRÓXIMOS PASSOS</span>
      <h2 className="font-serif text-[32px] font-semibold text-[#2C3539] mb-6">Transformando dados em ação</h2>
      <p className="text-[#4A5559] text-[15px] leading-relaxed mb-12">
        No fechamento do semestre, consolidei os principais aprendizados e transformei os resultados em direcionamentos:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mb-16 px-4 md:px-8">
        <div className="flex gap-6 items-start">
          <span className="font-serif text-[64px] font-bold text-[#EBE6DD] leading-[0.8] -mt-2">1</span>
          <p className="text-[#4A5559] text-[15px]">Aprofundar a investigação dos fluxos mais críticos.</p>
        </div>
        <div className="flex gap-6 items-start">
          <span className="font-serif text-[64px] font-bold text-[#EBE6DD] leading-[0.8] -mt-2">2</span>
          <p className="text-[#4A5559] text-[15px]">Avaliar o impacto da nova experiência de ciclos sobre os problemas encontrados.</p>
        </div>
        <div className="flex gap-6 items-start">
          <span className="font-serif text-[64px] font-bold text-[#EBE6DD] leading-[0.8] -mt-2">3</span>
          <p className="text-[#4A5559] text-[15px]">Levar os aprendizados para o módulo de Desenvolvimento, que também apresentava alto uso e demanda por melhorias.</p>
        </div>
        <div className="flex gap-6 items-start">
          <span className="font-serif text-[64px] font-bold text-[#EBE6DD] leading-[0.8] -mt-2">4</span>
          <p className="text-[#4A5559] text-[15px]">Replicar os aprendizados para fluxos que ainda não estavam monitorados.</p>
        </div>
      </div>

      <div className="w-full flex flex-col items-center mt-8">
        <img src={Metrica4Img} alt="Slide de Próximos Passos" className="w-full max-w-5xl h-auto object-contain" />
        <span className="text-[13px] text-[#8C9A9E] mt-4 italic text-center max-w-2xl px-4">
          Slide da apresentação de fechamento do H1 sobre os próximos passos.
        </span>
      </div>
    </div>

    {/* Impacto */}
    <div className="mb-24">
      <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-4">IMPACTO</span>
      <h2 className="font-serif text-[32px] font-semibold text-[#2C3539] mb-6">Criamos a primeira inciativa de acompanhamento contínuo de experiência do produto</h2>
      <p className="text-[#4A5559] text-[15px] leading-relaxed mb-6">
        Hipóteses que pareciam subjetivas passaram a ter evidências para serem discutidas com Produto e Design.
      </p>
    </div>

    {/* Aprendizado */}
    <div className="mb-24">
      <span className="text-[#006266] font-sans font-bold text-xs uppercase tracking-widest block mb-4">APRENDIZADO</span>
      <h2 className="font-serif text-[32px] font-semibold text-[#2C3539] mb-8">O que eu faria diferente hoje</h2>

      <div className="border-l-3 border-[#5C898A] p-6 md:pl-8">
        <p className="text-[#4A5559] text-[16px] leading-relaxed">
          Hoje eu estruturaria esse processo de forma mais automatizada, <span className="font-bold">criando um dashboard com IA</span>, conectado às pesquisas para <span className="font-bold">gerar um relatório centralizado</span> de todas as pesquisas em um lugar só. Com gráficos visuais e classificação de comentários.
        </p>
      </div>
    </div>
  </div>
);

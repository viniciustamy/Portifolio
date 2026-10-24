
import React from 'react';
import dash07 from '../assets/images/Dash/Dash-07.png';
import dash12 from '../assets/images/Dash/Dash-12.png';

import evolucaoImg from '../assets/images/Imagens IA/Evolução.png';
import cardSorting1 from '../assets/images/Imagens IA/Card sorting 1.png';
import cardSorting2 from '../assets/images/Imagens IA/card sortin 2.png';
import wpp1 from '../assets/images/Imagens IA/wpp 1.png';
import wpp2 from '../assets/images/Imagens IA/wpp 2.png';
import wpp3 from '../assets/images/Imagens IA/wpp 3.png';
import wpp4 from '../assets/images/Imagens IA/wpp 4.png';
import gerenciador1 from '../assets/images/Imagens IA/Gerenciador de tarefas 1.png';
import gerenciador2 from '../assets/images/Imagens IA/Gerenciador de tarefas 2.png';
import onboarding1 from '../assets/images/Imagens IA/onbording 1.png';
import onboarding2 from '../assets/images/Imagens IA/onbording 2.png';
import onboarding3 from '../assets/images/Imagens IA/onbording 3.png';
import baseImg from '../assets/images/Imagem recorte/Base.png';
import flutuante2Img from '../assets/images/Imagem recorte/Flutuante 2.png';
import videoCursor from '../assets/Video Cursor.mp4';














export const IaDiaDiaContent = () => (
    (
      <div className="mode-simplificado">
        <h2 className="text-2xl font-bold mb-4">IA como parte do meu processo de Design</h2>
        <p className="mb-6 leading-relaxed">
          A inteligência artificial deixou de ser apenas uma ferramenta para acelerar tarefas. Hoje ela faz parte da forma como conduzo projetos de Design, desde a descoberta do problema até a entrega para engenharia.
        </p>
        <p className="mb-6 leading-relaxed">
          Utilizo IA para sintetizar pesquisas, explorar soluções, construir protótipos funcionais, produzir documentação e até desenvolver ferramentas internas quando as soluções existentes não atendem às necessidades do projeto.
        </p>
        <p className="mb-12 leading-relaxed">
          Mais do que ganhar velocidade, meu objetivo é melhorar a qualidade das decisões, reduzir incertezas e aproximar Design, Produto e Engenharia ao longo de todo o processo.
        </p>

        <h2 id="ia-acelerando" className="text-2xl font-bold mb-6">IA acelerando o processo de Design</h2>
        
        <h3 className="text-xl font-bold mb-3">Protótipos muito mais próximos do produto final</h3>
        <p className="mb-6 leading-relaxed">
          Uma das aplicações mais valiosas da IA no meu trabalho é a criação de protótipos funcionais em código.
        </p>
        <p className="mb-6 leading-relaxed">
          Em vez de validar apenas interfaces estáticas, consigo simular comportamentos reais da aplicação, incluindo estados, animações, regras de negócio e microinterações. Isso torna os testes mais próximos da experiência final e reduz a diferença entre o que foi desenhado e o que será desenvolvido.
        </p>
        <p className="mb-4 leading-relaxed">Os principais benefícios dessa abordagem são:</p>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li><strong>Feedbacks mais consistentes:</strong> usuários interagem com experiências que respondem às suas ações, tornando os testes mais naturais.</li>
          <li><strong>Validações mais confiáveis:</strong> comportamentos complexos podem ser avaliados antes do desenvolvimento.</li>
          <li><strong>Handoff mais eficiente:</strong> os protótipos servem como uma referência prática para engenharia, reduzindo ambiguidades durante a implementação.</li>
        </ul>

        <div className="my-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img src={dash07} alt="Dashboard 7" className="w-full rounded-2xl border border-[#E2DCD4] shadow-sm" />
            <img src={dash12} alt="Dashboard 12" className="w-full rounded-2xl border border-[#E2DCD4] shadow-sm" />
          </div>
          <p className="text-sm text-center mt-3 text-[#6F625B]">Protótipo criado no google ia studio e usado em teste de usabilidade.</p>
        </div>

        <h3 className="text-xl font-bold mb-3">Exploração de soluções</h3>
        <p className="mb-6 leading-relaxed">
          Também utilizo IA para acelerar a fase de exploração.
        </p>
        <p className="mb-6 leading-relaxed">
          Em poucos minutos consigo gerar diferentes alternativas de layout, arquitetura da informação e fluxos de navegação para discutir em workshops e sessões de critique.
        </p>
        <p className="mb-6 leading-relaxed">
          Isso reduz o tempo gasto desenhando diversas variações iniciais e me permite concentrar o esforço nas decisões estratégicas do produto, avaliando rapidamente diferentes caminhos antes de aprofundar uma solução.
        </p>

        <div className="my-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img src={baseImg} alt="Interface Base" className="w-full rounded-2xl border border-[#E2DCD4] shadow-sm" />
            <img src={flutuante2Img} alt="Interface Flutuante" className="w-full rounded-2xl border border-[#E2DCD4] shadow-sm" />
          </div>
          <p className="text-sm text-center mt-3 text-[#6F625B]">Alternativas e evoluções do fluxo de admin criadas dentro do mesmo protótipo</p>
        </div>

        <h3 id="handoff-completo" className="text-xl font-bold mb-3">Handoff mais completo para Engenharia</h3>
        <p className="mb-6 leading-relaxed">
          Os protótipos criados com IA também melhoram significativamente o processo de handoff.
        </p>
        <p className="mb-6 leading-relaxed">
          Em vez de entregar apenas telas estáticas, consigo compartilhar versões navegáveis que utilizam componentes do Design System e demonstram comportamentos reais da interface.
        </p>
        <p className="mb-4 leading-relaxed">Entre os aspectos que normalmente apresento estão:</p>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Componentes reutilizados do Design System.</li>
          <li>Layout responsivo.</li>
          <li>Estados de interface (hover, focus, disabled, loading etc.).</li>
          <li>Validação de formulários.</li>
          <li>Microinterações e animações.</li>
        </ul>
        <p className="mb-6 leading-relaxed">
          Isso reduz dúvidas durante o desenvolvimento e aproxima a implementação da experiência planejada em Design.
        </p>

        <div className="my-12">
          <video src={videoCursor} autoPlay loop muted playsInline className="w-full rounded-2xl border border-[#E2DCD4] shadow-sm" />
          <p className="text-sm text-center mt-3 text-[#6F625B]">Video de handoff de funcionalidade realizada diretamente no cursor.</p>
        </div>

        <h2 id="evolucao-incremental" className="text-2xl font-bold mb-4">Evolução incremental de funcionalidades</h2>
        <p className="mb-6 leading-relaxed">
          Uma prática que passei a adotar com frequência é utilizar protótipos assistidos por IA para representar a evolução de uma funcionalidade ao longo do tempo.
        </p>
        <p className="mb-6 leading-relaxed">
          Em vez de apresentar apenas a visão ideal do produto, construo diferentes versões que mostram como aquela experiência pode evoluir de forma incremental.
        </p>
        <p className="mb-4 leading-relaxed">Normalmente organizo essa evolução em quatro etapas:</p>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li><strong>Versão atual:</strong> ponto de partida do produto.</li>
          <li><strong>MVP:</strong> primeira entrega focada em resolver as principais dores dos usuários.</li>
          <li><strong>Evolução:</strong> novas capacidades adicionadas com base nos aprendizados iniciais.</li>
          <li><strong>Visão futura:</strong> direcionamento estratégico de longo prazo.</li>
        </ul>
        <p className="mb-6 leading-relaxed">
          Essa abordagem facilita discussões de escopo, ajuda a priorizar entregas e cria um alinhamento mais claro entre Design, Produto e Engenharia.
        </p>
        <p className="mb-8 leading-relaxed">
          Utilizei esse formato em projetos como Dashboard Analytics, Admin Global e Gestão de Perfis de Acesso.
        </p>

        <div className="my-12">
          <img src={evolucaoImg} alt="Linha do Tempo e Evolução Incremental das Interfaces" className="w-full rounded-2xl border border-[#E2DCD4] shadow-sm" />
          <p className="text-sm text-center mt-3 text-[#6F625B]">Linha do Tempo e Evolução Incremental das Interfaces</p>
        </div>

        <h2 id="pesquisa-sintese" className="text-2xl font-bold mb-4">Pesquisa qualitativa e síntese de dados</h2>
        <p className="mb-6 leading-relaxed">
          Após entrevistas em profundidade ou testes de usabilidade, utilizo ferramentas como Google NotebookLM e Claude para acelerar a análise das informações coletadas.
        </p>
        <p className="mb-6 leading-relaxed">
          As transcrições servem como base para identificar padrões, agrupar insights, localizar citações relevantes e estruturar relatórios de pesquisa. Isso reduz significativamente o tempo dedicado ao processamento manual dos dados e me permite concentrar o esforço na interpretação dos resultados e na definição dos próximos passos.
        </p>
        <p className="mb-12 leading-relaxed">
          A IA auxilia na organização das informações, mas a análise crítica, a priorização e as decisões de produto continuam sendo conduzidas por mim.
        </p>

        <h2 className="text-2xl font-bold mb-6">Construindo ferramentas internas com IA</h2>
        <p className="mb-6 leading-relaxed">
          Além de apoiar o processo de Design, a IA também me permite desenvolver ferramentas específicas para resolver problemas do dia a dia da equipe.
        </p>
        <p className="mb-12 leading-relaxed">
          Em vez de adaptar o processo às limitações de uma ferramenta existente, consigo construir soluções sob medida para atender às necessidades de cada projeto.
        </p>

        <h3 className="text-xl font-bold mb-3">Card Sorting personalizado</h3>
        <p className="mb-6 leading-relaxed">
          Durante um projeto de arquitetura da informação, as ferramentas disponíveis não ofereciam a flexibilidade necessária para a dinâmica de pesquisa que planejamos.
        </p>
        <p className="mb-8 leading-relaxed">
          Com apoio da IA, desenvolvi uma aplicação de Card Sorting personalizada, adaptada ao fluxo da pesquisa. Isso proporcionou uma experiência mais simples para os participantes e facilitou a organização dos dados para análise posterior.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-12">
          <img src={cardSorting1} alt="Card Sorting 1" className="w-full rounded-2xl border border-[#E2DCD4] shadow-sm" />
          <img src={cardSorting2} alt="Card Sorting 2" className="w-full rounded-2xl border border-[#E2DCD4] shadow-sm" />
        </div>

        <h3 className="text-xl font-bold mb-3">Simulação de conversas no WhatsApp</h3>
        <p className="mb-6 leading-relaxed">
          Em um projeto de assistente conversacional, precisávamos validar fluxos de mensagens antes do desenvolvimento.
        </p>
        <p className="mb-6 leading-relaxed">
          Em vez de utilizar diagramas estáticos, desenvolvi um simulador inspirado na interface do WhatsApp, permitindo que stakeholders e usuários interagissem com a conversa como se estivessem utilizando o produto real.
        </p>
        <p className="mb-8 leading-relaxed">
          Essa abordagem tornou as validações mais naturais e ajudou a identificar melhorias no fluxo e no tom de voz antes do início da implementação.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-12">
          <img src={wpp1} alt="WhatsApp 1" className="w-full rounded-2xl border border-[#E2DCD4] shadow-sm hover:scale-[1.02] transition-transform" />
          <img src={wpp2} alt="WhatsApp 2" className="w-full rounded-2xl border border-[#E2DCD4] shadow-sm hover:scale-[1.02] transition-transform" />
          <img src={wpp3} alt="WhatsApp 3" className="w-full rounded-2xl border border-[#E2DCD4] shadow-sm hover:scale-[1.02] transition-transform" />
          <img src={wpp4} alt="WhatsApp 4" className="w-full rounded-2xl border border-[#E2DCD4] shadow-sm hover:scale-[1.02] transition-transform" />
        </div>

        <h3 className="text-xl font-bold mb-3">Gerenciador de tarefas para Design</h3>
        <p className="mb-6 leading-relaxed">
          Atuando na liderança de múltiplos squads, percebi que acompanhar projetos distribuídos entre diferentes quadros do Jira e outras ferramentas dificultava a visualização da capacidade do time e das prioridades de cada iniciativa.
        </p>
        <p className="mb-6 leading-relaxed">
          Para resolver esse problema, desenvolvi uma ferramenta interna utilizando IA, centralizando as principais informações do fluxo de trabalho em um único painel.
        </p>
        <p className="mb-4 leading-relaxed">A solução reúne:</p>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Visão integrada das atividades de discovery e delivery.</li>
          <li>Capacidade e alocação dos designers.</li>
          <li>Acompanhamento de marcos e entregas do trimestre.</li>
          <li>Cronogramas em gráfico de Gantt.</li>
          <li>Dependências entre Design, Produto e Engenharia.</li>
          <li>Contexto rápido para apoiar discussões de priorização e trade-offs.</li>
        </ul>
        <p className="mb-8 leading-relaxed">
          Além de facilitar meu acompanhamento como líder, a ferramenta tornou as conversas de planejamento muito mais objetivas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-12">
          <img src={gerenciador1} alt="Gerenciador de tarefas 1" className="w-full rounded-2xl border border-[#E2DCD4] shadow-sm" />
          <img src={gerenciador2} alt="Gerenciador de tarefas 2" className="w-full rounded-2xl border border-[#E2DCD4] shadow-sm" />
        </div>

        <h3 className="text-xl font-bold mb-3">Prototipando onboarding sem barreiras</h3>
        <p className="mb-6 leading-relaxed">
          Em outro projeto, precisávamos validar fluxos de onboarding sem depender de plataformas externas ou disputar licenças de ferramentas utilizadas por outras áreas.
        </p>
        <p className="mb-6 leading-relaxed">
          Com apoio da IA, recriei as principais telas do produto em protótipos navegáveis independentes, permitindo construir e testar rapidamente diferentes experiências de onboarding.
        </p>
        <p className="mb-4 leading-relaxed">Esses protótipos incluíam:</p>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Tours guiados.</li>
          <li>Hotspots.</li>
          <li>Modais de primeiro acesso.</li>
          <li>Dicas contextuais.</li>
        </ul>
        <p className="mb-8 leading-relaxed">
          Isso acelerou o processo de validação e permitiu iterar as soluções antes do desenvolvimento.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-12">
          <img src={onboarding1} alt="Onboarding 1" className="w-full rounded-2xl border border-[#E2DCD4] shadow-sm hover:scale-[1.02] transition-transform" />
          <img src={onboarding2} alt="Onboarding 2" className="w-full rounded-2xl border border-[#E2DCD4] shadow-sm hover:scale-[1.02] transition-transform" />
          <img src={onboarding3} alt="Onboarding 3" className="w-full rounded-2xl border border-[#E2DCD4] shadow-sm hover:scale-[1.02] transition-transform" />
        </div>

        <h2 className="text-2xl font-bold mb-6">Ferramentas que utilizo</h2>
        <p className="mb-6 leading-relaxed">
          Cada ferramenta desempenha um papel diferente dentro do meu processo de Design.
        </p>
        
        <div className="mb-12 overflow-hidden rounded-2xl border border-[#E2DCD4]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#E2DCD4] border-b border-[#E2DCD4]">
                <th className="py-3 px-4 font-bold text-[#241510] w-1/3">Ferramenta</th>
                <th className="py-3 px-4 font-bold text-[#241510]">Como utilizo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DCD4]">
              <tr>
                <td className="py-3 px-4 font-medium">Google AI Studio</td>
                <td className="py-3 px-4">Exploração de soluções, construção de protótipos, testes de conceitos e apoio na resolução de problemas.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Cursor</td>
                <td className="py-3 px-4">Desenvolvimento assistido de protótipos funcionais e ferramentas internas.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Figma Make</td>
                <td className="py-3 px-4">Exploração rápida de interfaces e conceitos visuais.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">NotebookLM</td>
                <td className="py-3 px-4">Organização e síntese de entrevistas, pesquisas e documentação.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Claude</td>
                <td className="py-3 px-4">Apoio na análise qualitativa, estruturação de conteúdo e refinamento de documentação.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mb-4">Impacto</h2>
        <p className="mb-6 leading-relaxed">
          A inteligência artificial passou a fazer parte da minha forma de trabalhar, não como um substituto do processo de Design, mas como uma ferramenta para ampliar sua capacidade.
        </p>
        <p className="mb-6 leading-relaxed">
          Ao incorporá-la em diferentes etapas do projeto, consegui reduzir significativamente o tempo entre uma hipótese e sua validação, explorar mais alternativas em menos tempo e produzir entregas com maior fidelidade para Produto e Engenharia.
        </p>
        <p className="mb-6 leading-relaxed">
          Além de acelerar atividades operacionais, a IA ampliou minha capacidade de experimentação e permitiu desenvolver soluções que dificilmente seriam viáveis utilizando apenas ferramentas tradicionais de Design.
        </p>
        <p className="mb-12 leading-relaxed">
          Hoje, ela faz parte do meu processo de ponta a ponta: da descoberta de problemas à construção de protótipos, da análise de pesquisas ao desenvolvimento de ferramentas internas que tornam o trabalho do time mais eficiente.
        </p>
      </div>
    )
);

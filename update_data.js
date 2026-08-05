const fs = require('fs');

const dataFile = 'src/data.tsx';
let data = fs.readFileSync(dataFile, 'utf8');

const startTag = '<h2 id="visao-geral" className="text-2xl font-bold mb-4">Visão geral</h2>';
const endTag = '        <h2 className="text-2xl font-bold mb-4">Aprendizados</h2>';

const startIndex = data.indexOf(startTag);
const endIndex = data.indexOf(endTag);

if (startIndex === -1 || endIndex === -1) {
  console.log("Could not find start or end tags!");
  process.exit(1);
}

const replacement = `<h2 id="visao-geral" className="text-2xl font-bold mb-4">Visão geral</h2>
        <p className="mb-6 leading-relaxed">
          O produto de Performance já permitia que empresas configurassem ciclos avaliativos, realizassem avaliações e conduzissem comitês de calibração. Porém, a jornada terminava antes da última etapa do processo: a devolutiva entre gestor e colaborador.
        </p>
        <p className="mb-6 leading-relaxed">
          Na prática, isso significava que cada empresa precisava criar seu próprio processo para compartilhar os resultados das avaliações. Gestores utilizavam apresentações, documentos ou planilhas, enquanto o RH não possuía qualquer controle sobre esse momento e o colaborador não tinha acesso ao histórico de seu desenvolvimento.
        </p>
        <p className="mb-8 leading-relaxed">
          Nosso desafio era fechar esse ciclo dentro da plataforma, eliminando controles paralelos e transformando a devolutiva em uma experiência estruturada, registrada e integrada ao restante da jornada de Performance.
        </p>

        <h2 className="text-2xl font-bold mb-4">O desafio</h2>
        <p className="mb-6 leading-relaxed">
          A devolutiva é um dos momentos mais importantes da avaliação de desempenho. É nela que gestor e colaborador discutem os resultados do ciclo, alinham expectativas e definem os próximos passos para o desenvolvimento profissional.
        </p>
        <p className="mb-6 leading-relaxed">
          Apesar de toda a jornada anterior acontecer dentro da plataforma, essa etapa acontecia totalmente fora dela.
        </p>
        <p className="mb-4 leading-relaxed">Isso gerava uma série de problemas:</p>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Gestores utilizavam documentos, apresentações ou planilhas para registrar as conversas.</li>
          <li>O RH não conseguia acompanhar quais devolutivas haviam sido realizadas.</li>
          <li>Não existia um histórico de desenvolvimento para os colaboradores.</li>
          <li>Cada empresa criava seu próprio processo, dificultando padronização e acompanhamento.</li>
        </ul>
        <p className="mb-8 leading-relaxed">
          Nosso objetivo era desenvolver uma funcionalidade que encerrasse o ciclo avaliativo dentro do próprio produto.
        </p>

        <h2 className="text-2xl font-bold mb-4">Alinhando o problema</h2>
        <p className="mb-6 leading-relaxed">
          Antes de iniciar a fase de Discovery, foi importante garantir que todo o time compartilhasse o mesmo entendimento sobre o desafio que estávamos assumindo. Para isso, estruturamos uma etapa inicial de alinhamento com os stakeholders, composta por um kickoff do projeto e uma dinâmica de CSD (Certezas, Suposições e Dúvidas).
        </p>
        <p className="mb-8 leading-relaxed">
          Essa etapa foi fundamental para transformar percepções iniciais em hipóteses estruturadas e definir quais perguntas precisávamos responder ao longo da descoberta.
        </p>

        <h3 className="text-xl font-bold mb-3">Kickoff</h3>
        <p className="mb-6 leading-relaxed">
          O projeto começou com um kickoff envolvendo Produto, Design e stakeholders de negócio. O objetivo era construir uma visão compartilhada sobre a iniciativa antes de qualquer decisão de solução.
        </p>
        <p className="mb-6 leading-relaxed">
          Durante esse encontro alinhamos o contexto do projeto, os envolvidos, os objetivos iniciais, os riscos conhecidos e as métricas que utilizariam para avaliar o sucesso da iniciativa.
        </p>
        <p className="mb-6 leading-relaxed">
          Também discutimos o problema que estávamos tentando resolver, por que ele era relevante para clientes e para o negócio, quais personas seriam impactadas e quais estudos ou materiais internos já existiam sobre o tema.
        </p>
        <p className="mb-8 leading-relaxed">
          Esse momento garantiu que toda a equipe partisse da mesma visão do problema antes do início da fase de Discovery.
        </p>

        <h3 className="text-xl font-bold mb-3">CSD (Certezas, Suposições e Dúvidas)</h3>
        <p className="mb-6 leading-relaxed">
          Com o contexto alinhado, conduzi uma dinâmica de CSD com cinco stakeholders das áreas de Produto, Design e Negócios.
        </p>
        <p className="mb-6 leading-relaxed">
          O objetivo era organizar tudo o que acreditávamos saber sobre a funcionalidade de devolutiva antes de validar essas percepções com usuários.
        </p>
        <p className="mb-6 leading-relaxed">
          Durante a dinâmica levantamos certezas, hipóteses, dúvidas, riscos e oportunidades relacionadas ao problema. Em seguida, consolidei esses insumos em categorias e transformei as principais dúvidas em perguntas de pesquisa.
        </p>
        <p className="mb-8 leading-relaxed">
          Essas perguntas passaram a orientar toda a fase de Discovery, servindo como base para a análise das pesquisas existentes e para as demais atividades conduzidas ao longo do projeto.
        </p>

        <div className="my-12">
          <Carousel images={[contexto1, contexto2, contexto3]} />
          <p className="text-center text-sm text-[#787265] mt-4 font-medium">Framework de kickoff utilizado para alinhar o problema e hipóteses com a equipe.</p>
        </div>

        <h2 className="text-2xl font-bold mb-4">Definindo o escopo</h2>
        <p className="mb-6 leading-relaxed">
          Antes de aprofundar a pesquisa, conduzimos uma dinâmica de "Faz / Não Faz" com um grupo reduzido de stakeholders.
        </p>
        <p className="mb-6 leading-relaxed">
          O objetivo era definir claramente quais responsabilidades pertenciam à funcionalidade de devolutiva e quais continuariam sendo responsabilidade de outros módulos do produto.
        </p>
        <p className="mb-8 leading-relaxed">
          Esse alinhamento evitou aumento desnecessário de escopo e manteve o projeto focado no problema que realmente precisávamos resolver.
        </p>

        <h2 className="text-2xl font-bold mb-4">Consolidando pesquisas existentes</h2>
        <p className="mb-6 leading-relaxed">
          Com o problema alinhado e o escopo definido, iniciamos a fase de Discovery.
        </p>
        <p className="mb-6 leading-relaxed">
          Antes de realizar novas entrevistas, reuni todas as pesquisas que já existiam sobre o tema dentro da empresa.
        </p>
        <p className="mb-6 leading-relaxed">
          Analisei pesquisas conduzidas anteriormente pelo time de UX Research, estudos de Service Design e entrevistas realizadas em outras iniciativas do produto de Performance.
        </p>
        <p className="mb-8 leading-relaxed">
          Grande parte desse material já abordava o momento da devolutiva sob diferentes perspectivas, permitindo iniciar o projeto com uma base sólida de evidências.
        </p>

        <h2 className="text-2xl font-bold mb-4">Mapeando a jornada</h2>
        <p className="mb-6 leading-relaxed">
          A partir da consolidação dessas pesquisas, construí um mapa completo da jornada de devolutiva.
        </p>
        <p className="mb-6 leading-relaxed">
          Nesse mapa foram representadas todas as personas envolvidas — RH, gestores e colaboradores — e como cada uma delas participava desse momento.
        </p>
        <p className="mb-6 leading-relaxed">
          Também foram identificadas todas as conexões entre devolutiva, avaliações, comitê de calibração e Plano de Desenvolvimento Individual (PDI).
        </p>
        <p className="mb-8 leading-relaxed">
          Esse exercício evidenciou que a devolutiva não era uma funcionalidade isolada, mas um dos principais pontos de conexão de todo o produto.
        </p>

        <h2 className="text-2xl font-bold mb-4">Principais insights</h2>
        <p className="mb-6 leading-relaxed">
          Após consolidar todas as pesquisas, alguns padrões ficaram bastante claros.
        </p>
        <ul className="list-disc pl-5 mb-8 space-y-2">
          <li>A devolutiva era o principal insumo para construção do Plano de Desenvolvimento Individual.</li>
          <li>O RH não possuía qualquer visibilidade sobre esse processo.</li>
          <li>Os gestores utilizavam ferramentas externas para registrar as conversas.</li>
          <li>Não existia um histórico permanente do desenvolvimento dos colaboradores.</li>
          <li>Cada gestor conduzia esse momento de uma maneira diferente.</li>
        </ul>
        <p className="mb-8 leading-relaxed">
          Esses aprendizados serviram como base para definição da solução.
        </p>

        <h2 className="text-2xl font-bold mb-4">Priorizando oportunidades</h2>
        <p className="mb-6 leading-relaxed">
          Para transformar os insights em direcionamentos de produto, utilizei uma matriz GUT para priorizar os problemas encontrados.
        </p>
        <p className="mb-8 leading-relaxed">
          A priorização permitiu identificar quais oportunidades possuíam maior impacto para usuários e negócio, direcionando os esforços para aquilo que realmente deveria ser resolvido na primeira versão da funcionalidade.
        </p>

        <h2 className="text-2xl font-bold mb-4">Arquitetando a solução</h2>
        <p className="mb-6 leading-relaxed">
          Com o problema claramente definido, começamos a desenhar a experiência.
        </p>
        <p className="mb-6 leading-relaxed">
          Primeiro construímos os fluxos completos das três jornadas envolvidas.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#EBE7DD] p-6 rounded-2xl">
            <h4 className="font-bold text-[#006266] mb-2">RH</h4>
            <p className="text-sm">Configurar o período de devolutivas, acompanhar o andamento do processo e monitorar indicadores de conclusão.</p>
          </div>
          <div className="bg-[#EBE7DD] p-6 rounded-2xl">
            <h4 className="font-bold text-[#006266] mb-2">Gestor</h4>
            <p className="text-sm">Preparar, registrar e compartilhar a devolutiva com seus liderados.</p>
          </div>
          <div className="bg-[#EBE7DD] p-6 rounded-2xl">
            <h4 className="font-bold text-[#006266] mb-2">Colaborador</h4>
            <p className="text-sm">Receber a devolutiva, consultar seu histórico e utilizar essas informações como base para seu desenvolvimento.</p>
          </div>
        </div>
        <p className="mb-8 leading-relaxed">
          Esses fluxos passaram por diversas iterações até chegarmos à estrutura final da experiência.
        </p>

        <h2 className="text-2xl font-bold mb-4">Explorando soluções</h2>
        <p className="mb-6 leading-relaxed">
          A partir dos fluxos, desenvolvi wireframes para validar diferentes formas de organizar a experiência.
        </p>
        <p className="mb-6 leading-relaxed">
          Exploramos diversas alternativas para reduzir a complexidade da configuração realizada pelo RH, facilitar o preenchimento pelos gestores e tornar o consumo da devolutiva mais claro para os colaboradores.
        </p>
        <p className="mb-8 leading-relaxed">
          Os wireframes evoluíram continuamente até chegarmos ao protótipo utilizado nos testes de usabilidade.
        </p>

        <h2 className="text-2xl font-bold mb-4">Validação</h2>
        <p className="mb-6 leading-relaxed">
          Com o protótipo finalizado, conduzi uma rodada de testes de usabilidade com 12 participantes, incluindo profissionais de RH, gestores e lideranças.
        </p>
        <p className="mb-8 leading-relaxed">
          O objetivo era validar toda a experiência, desde a configuração realizada pelo RH até o momento em que o colaborador recebia sua devolutiva.
        </p>

        <h3 className="text-xl font-bold mb-3">Priorizando os problemas encontrados</h3>
        <p className="mb-6 leading-relaxed">
          Além de registrar os problemas observados durante os testes, desenvolvi uma metodologia para facilitar sua priorização.
        </p>
        <p className="mb-6 leading-relaxed">
          Cada fluxo recebeu um peso de acordo com sua importância dentro da jornada. Os problemas encontrados também foram classificados conforme sua severidade.
        </p>
        <p className="mb-8 leading-relaxed">
          A combinação dessas duas variáveis gerava automaticamente uma pontuação que ajudava o time a decidir quais melhorias deveriam ser implementadas primeiro.
        </p>

        <h3 className="text-xl font-bold mb-3">Principais aprendizados dos testes</h3>
        <p className="mb-6 leading-relaxed">
          Os testes mostraram que o fluxo era facilmente compreendido pelos usuários.
        </p>
        <p className="mb-6 leading-relaxed">
          O principal desafio identificado não estava relacionado à interface, mas ao esforço necessário para produzir uma boa devolutiva.
        </p>
        <p className="mb-6 leading-relaxed">
          Mesmo já realizando esse processo fora da plataforma, muitos gestores percebiam a funcionalidade como mais uma tarefa dentro da rotina.
        </p>
        <p className="mb-8 leading-relaxed">
          Isso indicava que precisávamos reduzir significativamente o tempo necessário para concluir essa atividade.
        </p>

        <h2 className="text-2xl font-bold mb-4">Incorporando Inteligência Artificial</h2>
        <p className="mb-6 leading-relaxed">
          Para resolver esse problema, propusemos incorporar Inteligência Artificial diretamente ao fluxo da devolutiva.
        </p>
        <p className="mb-6 leading-relaxed">
          Em vez de obrigar o gestor a ler todas as avaliações individualmente, a plataforma consolidava automaticamente os feedbacks recebidos, identificava padrões e gerava um primeiro rascunho da devolutiva.
        </p>
        <p className="mb-6 leading-relaxed">
          O gestor passava a revisar, complementar e personalizar esse conteúdo antes do envio ao colaborador.
        </p>
        <p className="mb-8 leading-relaxed">
          Essa funcionalidade transformou completamente a experiência e reduziu o principal atrito identificado durante os testes.
        </p>

        <h2 className="text-2xl font-bold mb-4">Solução final</h2>
        <p className="mb-6 leading-relaxed">
          A funcionalidade passou a integrar definitivamente o ciclo de Performance.
        </p>
        <ul className="list-disc pl-5 mb-8 space-y-2">
          <li>O RH ganhou ferramentas para configurar períodos de devolutiva, acompanhar indicadores e monitorar pendências.</li>
          <li>Os gestores passaram a registrar todas as conversas dentro da plataforma com apoio da Inteligência Artificial.</li>
          <li>Os colaboradores passaram a possuir um histórico permanente de desenvolvimento, conectado às avaliações e ao Plano de Desenvolvimento Individual.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">Resultados</h2>
        <p className="mb-6 leading-relaxed">
          A funcionalidade foi inicialmente lançada como uma prova de conceito para uso interno. Os resultados foram bastante positivos.
        </p>
        <ul className="list-disc pl-5 mb-8 space-y-2">
          <li>95% dos gestores utilizaram a funcionalidade durante a POC.</li>
          <li>O RH passou a acompanhar um processo que anteriormente acontecia fora da plataforma.</li>
          <li>Os controles paralelos deixaram de ser necessários.</li>
          <li>A IA reduziu significativamente o tempo gasto pelos gestores para preparar as devolutivas.</li>
          <li>A funcionalidade apresentou excelente aceitação e continuou evoluindo após o lançamento, tornando-se parte oficial do ciclo de Performance.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">Minha atuação</h2>
        <p className="mb-6 leading-relaxed">
          Durante este projeto fui responsável por:
        </p>
        <ul className="list-disc pl-5 mb-8 space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <li>Conduzir o Discovery.</li>
          <li>Facilitar a dinâmica de CSD.</li>
          <li>Organizar e sintetizar os insumos dos stakeholders.</li>
          <li>Conduzir o benchmark competitivo.</li>
          <li>Estruturar a dinâmica de Faz / Não Faz.</li>
          <li>Consolidar pesquisas existentes.</li>
          <li>Mapear a jornada completa da devolutiva.</li>
          <li>Priorizar oportunidades utilizando matriz GUT.</li>
          <li>Definir a arquitetura da experiência.</li>
          <li>Construir fluxos e wireframes.</li>
          <li>Desenvolver protótipos navegáveis.</li>
          <li>Planejar e conduzir os testes de usabilidade.</li>
          <li>Criar a metodologia de priorização dos problemas encontrados.</li>
          <li>Iterar a solução junto ao time de Produto.</li>
          <li>Definir a experiência de Inteligência Artificial aplicada à funcionalidade.</li>
        </ul>

`;

const newData = data.substring(0, startIndex) + replacement + data.substring(endIndex);
fs.writeFileSync(dataFile, newData, 'utf8');
console.log('Successfully updated data.tsx');

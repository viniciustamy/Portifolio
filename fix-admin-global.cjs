const fs = require('fs');

const content = fs.readFileSync('src/content/admin-global-docs.tsx', 'utf8');
const lines = content.split('\n');
const validLines = lines.slice(0, 256); // 0 to 255

const restOfFile = `  { src: k14, title: 'Entrega Final e Handoff', description: 'Documentação completa com estados e mapeamentos para Analytics', fullWidth: true }
];

export const AdminGlobalDocsContent = () => (
    (
      <>
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">TL;DR — Resumo Rápido</h2>
          
          <h3 className="text-xl font-bold mb-2">O problema</h3>
          <p className="mb-4 leading-relaxed">
            Cada produto possuía sua própria camada administrativa. Isso obrigava clientes a configurar usuários, estruturas organizacionais, cargos, permissões e outras informações repetidamente sempre que contratavam uma nova solução da plataforma.
          </p>
          
          <h3 className="text-xl font-bold mb-2">O que fiz</h3>
          <p className="mb-4 leading-relaxed">
            Liderei a frente de Design da iniciativa, consolidando anos de conhecimento disperso, conduzindo a descoberta do problema, estruturando a estratégia incremental de migração e utilizando IA para acelerar desde a síntese das pesquisas até a construção da visão do produto e dos protótipos.
          </p>

          <h3 className="text-xl font-bold mb-2">Resultado</h3>
          <p className="mb-8 leading-relaxed">
            Criamos uma direção única para um projeto que vinha sendo discutido havia anos, alinhando Produto, Engenharia e Arquitetura em torno de uma visão compartilhada. O material produzido passou a orientar a implementação e os próximos ciclos de evolução da plataforma.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4">Contexto</h2>
        <p className="mb-6 leading-relaxed">
          À medida que a Gupy expandiu seu ecossistema por meio de novos produtos e aquisições, uma dor passou a crescer junto com a plataforma: cada solução possuía sua própria camada administrativa.
        </p>
        <p className="mb-6 leading-relaxed">
          Na prática, isso significava que, sempre que um cliente contratava um novo produto, precisava repetir praticamente toda a configuração inicial: cadastrar usuários, recriar estruturas organizacionais, configurar cargos, permissões e diversas outras informações básicas.
        </p>
        <p className="mb-6 leading-relaxed">
          A decisão arquitetural já estava tomada: criar uma camada administrativa centralizada que se tornaria a fonte única de verdade para todo o ecossistema.
        </p>
        <p className="mb-6 leading-relaxed">
          O verdadeiro desafio, porém, não era técnico.
        </p>
        <p className="mb-6 leading-relaxed">
          Depois de anos de pausas, retomadas e mudanças de prioridade, o projeto havia acumulado pesquisas, entrevistas, protótipos, provas de conceito e decisões importantes. O conhecimento existia, mas estava fragmentado entre documentos, apresentações e pessoas diferentes.
        </p>
        <p className="mb-8 leading-relaxed">
          Antes de discutir qualquer interface, era preciso reconstruir uma visão compartilhada do problema.
        </p>

        <h2 className="text-2xl font-bold mb-4">A dor do crescimento</h2>
        <p className="mb-6 leading-relaxed">
          Com a expansão da Gupy por meio de aquisições, passamos a operar três estruturas independentes para gerenciar exatamente as mesmas informações.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#F9F8F6] border border-[#EBE7DD] rounded-xl p-5 shadow-sm">
            <div className="bg-[#EBE7DD] w-12 h-12 flex items-center justify-center rounded-lg mb-4 border border-[#DCD7CA]">
              <span className="text-2xl leading-none block">📄</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#1A1A1A]">Cadastros duplicados</h3>
            <p className="text-gray-600 text-sm">As mesmas informações precisavam ser cadastradas em diferentes produtos.</p>
          </div>
          
          <div className="bg-[#F9F8F6] border border-[#EBE7DD] rounded-xl p-5 shadow-sm">
            <div className="bg-[#EBE7DD] w-12 h-12 flex items-center justify-center rounded-lg mb-4 border border-[#DCD7CA]">
              <span className="text-2xl leading-none block">↔️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#1A1A1A]">Fluxos desconectados</h3>
            <p className="text-gray-600 text-sm">Cada solução possuía processos, regras e modelos próprios de administração.</p>
          </div>

          <div className="bg-[#F9F8F6] border border-[#EBE7DD] rounded-xl p-5 shadow-sm">
            <div className="bg-[#EBE7DD] w-12 h-12 flex items-center justify-center rounded-lg mb-4 border border-[#DCD7CA]">
              <span className="text-2xl leading-none block">📈</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#1A1A1A]">Barreiras para expansão</h3>
            <p className="text-gray-600 text-sm">Quanto mais produtos o cliente contratava, maior era o esforço de implantação, dificultando iniciativas de cross-sell, upsell e adoção do ecossistema.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Meu papel, o time e a timeline</h2>
        <p className="mb-6 leading-relaxed">
          Liderei toda a frente de Design da iniciativa, conduzindo a descoberta, estruturando a visão do produto e mediando discussões entre diferentes áreas para construir uma estratégia comum para todo o ecossistema.
        </p>
        <p className="mb-6 leading-relaxed">
          Ao longo do projeto, trabalhei com três PMs e dois Tech Leads que passaram pela iniciativa em diferentes momentos, além de manter uma parceria constante com a GPM, Heads de Engenharia e lideranças de outros produtos. Boa parte do trabalho consistia em alinhar interesses, negociar decisões e construir consenso entre Produto, Design e Engenharia.
        </p>
        <p className="mb-8 leading-relaxed">
          Embora o projeto tenha atravessado diversos ciclos de priorização e pausa, conseguimos aproveitar cada retomada para consolidar o conhecimento existente e evoluir a estratégia. Ao final do H1, entregamos todo o upstream da iniciativa: entendimento do problema, direcionamento estratégico, definição das versões e os artefatos necessários para que Engenharia pudesse seguir com a implementação.
        </p>

        <h2 className="text-2xl font-bold mb-4">O desafio</h2>
        <p className="mb-6 leading-relaxed">
          Quando assumi essa frente, o problema não era falta de informação.<br />
          Era o excesso dela.
        </p>
        <p className="mb-6 leading-relaxed">
          Existiam pesquisas conduzidas em diferentes momentos, entrevistas com clientes, testes de usabilidade, protótipos, provas de conceito e decisões arquiteturais importantes. Cada material respondia parte do problema, mas ninguém possuía uma visão consolidada que permitisse entender o cenário como um todo.
        </p>
        <p className="mb-4 leading-relaxed">
          Antes de discutir roadmap, funcionalidades ou interfaces, precisávamos responder perguntas muito mais básicas:
        </p>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Qual era o problema que realmente estávamos resolvendo?</li>
          <li>O que já havia sido validado?</li>
          <li>Quais decisões ainda faziam sentido?</li>
          <li>Quais hipóteses precisavam ser revisitadas?</li>
          <li>Qual deveria ser a direção do produto?</li>
        </ul>
        <p className="mb-6 leading-relaxed">
          Meu primeiro objetivo foi criar esse alinhamento.
        </p>
        <p className="mb-8 leading-relaxed">
          Mais do que desenhar telas, era necessário organizar anos de conhecimento acumulado para que o projeto voltasse a ter uma direção única.
        </p>

        <h2 className="text-2xl font-bold mb-4">O reset cognitivo</h2>
        <p className="mb-6 leading-relaxed">
          Esse alinhamento não aconteceu apenas uma vez.
        </p>
        <p className="mb-6 leading-relaxed">
          Como o projeto permaneceu ativo durante anos, houve diversas mudanças de pessoas ao longo da iniciativa. Sempre que alguém novo chegava, era necessário reconstruir praticamente todo o contexto antes que pudesse participar das decisões de forma efetiva.
        </p>
        <p className="mb-6 leading-relaxed">
          Esse processo recorrente de recontextualização acabou se tornando uma das minhas principais responsabilidades dentro do projeto.
        </p>
        <p className="mb-6 leading-relaxed">
          Mais do que produzir entregas de Design, meu papel era preservar o conhecimento da iniciativa, garantir consistência nas decisões e evitar que discussões já resolvidas fossem reiniciadas a cada nova formação da equipe.
        </p>
        <p className="mb-8 leading-relaxed">
          Foi esse trabalho contínuo que permitiu manter a evolução do projeto mesmo diante das constantes mudanças de prioridade e de pessoas envolvidas.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-12">
          <img src={reset1} alt="Reset Cognitivo 1" className="rounded-xl border border-[#DCD7CA] shadow-sm hover:scale-[1.02] transition-transform w-full" />
          <img src={reset2} alt="Reset Cognitivo 2" className="rounded-xl border border-[#DCD7CA] shadow-sm hover:scale-[1.02] transition-transform w-full" />
          <img src={reset3} alt="Reset Cognitivo 3" className="rounded-xl border border-[#DCD7CA] shadow-sm hover:scale-[1.02] transition-transform w-full" />
          <img src={reset4} alt="Reset Cognitivo 4" className="rounded-xl border border-[#DCD7CA] shadow-sm hover:scale-[1.02] transition-transform w-full" />
        </div>

        <h2 className="text-2xl font-bold mb-4 mt-8">Consolidando o conhecimento disperso</h2>
        <p className="mb-6 leading-relaxed">
          A primeira entrega deste projeto não foi um protótipo.<br />
          Foi uma síntese.
        </p>
        <p className="mb-6 leading-relaxed">
          Antes de propor qualquer solução, precisávamos transformar anos de conhecimento fragmentado em uma visão única e confiável do problema.
        </p>
        <p className="mb-6 leading-relaxed">
          Reuni pesquisas anteriores, entrevistas, testes de usabilidade, feedbacks de clientes, aprendizados de implementações existentes e discussões técnicas que estavam espalhados entre diferentes equipes e momentos da iniciativa.
        </p>
        <p className="mb-6 leading-relaxed">
          Parte desse material veio do repositório interno da empresa; outra parte foi complementada por pesquisas que conduzi diretamente para preencher lacunas identificadas durante a descoberta.
        </p>
        <p className="mb-4 leading-relaxed">
          Ao final desse processo, consolidamos uma base composta por:
        </p>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>19 participantes entre especialistas internos (IS e CS) e clientes de diferentes portes;</li>
          <li>200 respostas assíncronas de clientes de Recrutamento & Seleção;</li>
          <li>pesquisas históricas;</li>
          <li>entrevistas;</li>
          <li>testes de usabilidade;</li>
          <li>aprendizados de implementações anteriores.</li>
        </ul>
        <p className="mb-8 leading-relaxed">
          O resultado foi uma base de conhecimento suficientemente robusta para orientar todas as decisões seguintes, sem necessidade de abrir novos ciclos de pesquisa.
        </p>

        <div className="my-12 flex justify-center">
          <img src={lm1} alt="NotebookLM" className="w-3/4 rounded-2xl border border-[#DCD7CA] shadow-sm object-cover" />
        </div>

        <h2 className="text-2xl font-bold mb-4 mt-8">Principais descobertas</h2>
        <p className="mb-6 leading-relaxed">
          Da consolidação das pesquisas surgiram alguns padrões claros.<br />
          Mais do que problemas isolados, percebemos que todas as dores estavam relacionadas à fragmentação da gestão administrativa.
        </p>

        <h3 className="text-xl font-bold mb-2">Complexidade do cadastro</h3>
        <p className="mb-6 leading-relaxed">
          O processo era dividido entre diferentes módulos — Gestão de Atributos, Perfis de Acesso, Cadastro de Colaboradores e Permissões.<br />
          Essa divisão aumentava significativamente o esforço operacional.<br />
          Quando atualizar informações se tornava difícil, muitos clientes simplesmente deixavam de manter a base atualizada.
        </p>

        <h3 className="text-xl font-bold mb-2">A dor das planilhas</h3>
        <p className="mb-4 leading-relaxed">
          Mesmo grandes empresas dependiam de planilhas que chegavam a mais de cinquenta colunas.<br />
          As principais dificuldades eram:
        </p>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>necessidade de reorganizar manualmente colunas antes da importação;</li>
          <li>dependência de uma sequência rígida de cadastro;</li>
          <li>mensagens de erro pouco claras;</li>
          <li>processo trabalhoso de exportar, editar e reenviar arquivos.</li>
        </ul>
        <p className="mb-6 leading-relaxed">
          Na prática, importar informações era uma tarefa operacional complexa e pouco confiável.
        </p>

        <h3 className="text-xl font-bold mb-2">Dependência do suporte</h3>
        <p className="mb-6 leading-relaxed">
          Alterações relativamente simples — como reorganizar estruturas hierárquicas ou corrigir dados — frequentemente exigiam abertura de chamados ou o envio de novas planilhas.<br />
          A falta de ferramentas de edição direta reduzia significativamente a autonomia dos clientes.
        </p>

        <h3 className="text-xl font-bold mb-2">Bases desatualizadas</h3>
        <p className="mb-6 leading-relaxed">
          Como consequência da dificuldade de manutenção, era comum encontrar colaboradores desligados ainda cadastrados na plataforma.<br />
          Esse problema impactava diretamente outros produtos do ecossistema, gerando distorções em pesquisas de clima, indicadores e processos automatizados.
        </p>

        <h3 className="text-xl font-bold mb-2">Integrações complexas</h3>
        <p className="mb-6 leading-relaxed">
          Clientes maiores frequentemente precisavam desenvolver integrações próprias ou contratar consultorias para conectar a plataforma aos sistemas de folha de pagamento e outras ferramentas corporativas.<br />
          Além disso, alguns produtos, como o EduCorp, sofriam limitações importantes por não possuírem uma estrutura organizacional centralizada.
        </p>

        <h3 className="text-xl font-bold mb-2">Modelo mental inconsistente</h3>
        <p className="mb-8 leading-relaxed">
          As pesquisas também revelaram um problema de linguagem.<br />
          Conceitos como Grupos, Atributos e Filiais eram frequentemente confundidos pelos usuários, evidenciando que a arquitetura da informação não refletia o modelo mental esperado pelos clientes.
        </p>

        <h2 className="text-2xl font-bold mb-4">O insight que mudou o projeto</h2>
        <p className="mb-6 leading-relaxed">
          Depois de consolidar todo esse material, uma discussão ganhou força dentro do time.<br />
          Até então, a direção considerada mais provável era evoluir toda a plataforma para um modelo baseado em Position Manager, estruturado em posições formais dentro da organização.
        </p>
        <p className="mb-6 leading-relaxed">
          Entretanto, as pesquisas mostravam uma realidade diferente.<br />
          Grande parte dos clientes SMB sequer trabalhava com esse conceito.
        </p>
        <p className="mb-8 leading-relaxed">
          Esse insight foi o ponto de partida para uma das decisões estratégicas mais importantes do projeto.
        </p>

        <h2 className="text-2xl font-bold mb-4 mt-8">A decisão: Job Manager vs. Position Manager</h2>
        <p className="mb-6 leading-relaxed">
          Depois de consolidar as pesquisas, uma discussão ganhou prioridade antes mesmo de iniciarmos o desenho da solução.<br />
          O time caminhava para adotar o Position Manager como modelo padrão para toda a plataforma. Do ponto de vista estratégico, fazia sentido: tratava-se de uma estrutura mais robusta, capaz de representar organogramas complexos e sustentar a evolução do ecossistema no longo prazo.
        </p>
        <p className="mb-6 leading-relaxed">
          Mas as pesquisas mostravam outra realidade.<br />
          Grande parte dos clientes, especialmente os de perfil SMB, simplesmente não trabalhava com o conceito de posições formais. Em muitos casos, esse modelo sequer fazia parte da organização da empresa.
        </p>
        <p className="mb-6 leading-relaxed">
          Implementar Position Manager como ponto de partida significaria impor um modelo mental que não refletia a realidade desses clientes.<br />
          Foi nesse momento que propus uma abordagem diferente.
        </p>
        
        <h3 className="text-xl font-bold mb-4">Dois modelos, necessidades diferentes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8 bg-[#F9F8F6] p-8 rounded-[2rem] border border-[#EBE7DD]">
          <div className="flex flex-col items-center text-center">
            <img src={cadeira} alt="Cadeira" className="w-48 h-48 object-contain mb-4" />
            <strong className="text-[#00CBC6] font-mono text-sm uppercase tracking-wider mb-2">🪑 Position Manager</strong>
            <p className="text-sm text-[#4A5559]">Representa uma posição permanente dentro da estrutura organizacional.<br />Quando uma pessoa deixa a empresa, a posição continua existindo e pode ser ocupada por outro colaborador.<br />É um modelo adequado para empresas que possuem organogramas estruturados e processos formais de gestão.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img src={banco} alt="Banco" className="w-48 h-48 object-contain mb-4" />
            <strong className="text-[#FF18DB] font-mono text-sm uppercase tracking-wider mb-2">🪑 Job Manager</strong>
            <p className="text-sm text-[#4A5559]">Representa apenas a função exercida pelo colaborador.<br />Quando a pessoa deixa a organização, aquele vínculo desaparece naturalmente, sem a necessidade de manter uma posição permanente na estrutura.<br />É um modelo muito mais simples, próximo da realidade de empresas menores ou menos maduras em gestão organizacional.</p>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2">A proposta</h3>
        <p className="mb-4 leading-relaxed">
          Minha defesa foi que Position Manager não deveria ser o ponto de partida universal.<br />
          Propus uma estratégia incremental:
        </p>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>iniciar pelo Job Manager, reduzindo a complexidade para a maior parte da base;</li>
          <li>validar a adoção da administração unificada;</li>
          <li>evoluir posteriormente para Position Manager apenas nos cenários em que esse nível de maturidade fosse necessário.</li>
        </ul>
        <p className="mb-6 leading-relaxed">
          A lógica era simples:<br />
          reduzir a barreira de entrada primeiro e introduzir a complexidade apenas quando ela gerasse valor para o cliente.<br />
          Essa proposta também diminuía significativamente o esforço inicial de implantação e aumentava a chance de adoção da nova arquitetura.
        </p>

        <h3 className="text-xl font-bold mb-2">O impacto da discussão</h3>
        <p className="mb-6 leading-relaxed">
          A implementação final não seguiu exatamente esse caminho.<br />
          Mesmo assim, essa discussão mudou a forma como o projeto evoluiu.
        </p>
        <p className="mb-6 leading-relaxed">
          Ao trazer evidências da pesquisa para a mesa, evitamos construir toda a estratégia sobre uma hipótese que não representava boa parte da base de clientes.
        </p>
        <p className="mb-6 leading-relaxed">
          Mais do que escolher entre Job Manager ou Position Manager, o debate fez o time enxergar que a solução precisava acomodar diferentes níveis de maturidade organizacional.
        </p>
        <p className="mb-8 leading-relaxed">
          Foi esse entendimento que passou a orientar o roadmap desenhado na etapa seguinte.
        </p>

        <h2 className="text-2xl font-bold mb-4">Materializando a visão do produto</h2>
        <p className="mb-6 leading-relaxed">
          Com a direção estratégica definida, o próximo desafio era responder a uma pergunta simples:<br />
          Como essa plataforma evoluiria ao longo do tempo?
        </p>
        <p className="mb-6 leading-relaxed">
          Até aquele momento, a visão do projeto existia principalmente em documentos, apresentações e listas de iniciativas. Era difícil entender como cada módulo se conectava e qual seria a evolução da plataforma ao longo dos próximos ciclos.
        </p>
        <p className="mb-6 leading-relaxed">
          Para resolver esse problema, utilizei o Figma Make para transformar o roadmap existente em uma representação visual da arquitetura do produto.
        </p>
        <p className="mb-6 leading-relaxed">
          Mais do que ilustrar funcionalidades, esse material mostrava como o ecossistema seria construído gradualmente, partindo de uma estrutura mais simples baseada em Job Manager e evoluindo para capacidades mais avançadas, como Position Manager, conforme a maturidade dos clientes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-12">
          <img src={make1} alt="Roadmap 1" className="rounded-xl border border-[#DCD7CA] shadow-sm w-full" />
          <img src={make2} alt="Roadmap 2" className="rounded-xl border border-[#DCD7CA] shadow-sm w-full" />
          <img src={make3} alt="Roadmap 3" className="rounded-xl border border-[#DCD7CA] shadow-sm w-full" />
          <img src={make4} alt="Roadmap 4" className="rounded-xl border border-[#DCD7CA] shadow-sm w-full" />
        </div>

        <p className="mb-6 leading-relaxed">
          O objetivo não era desenhar a interface final.<br />
          Era criar um artefato capaz de responder perguntas que os documentos não conseguiam responder com clareza.
        </p>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Onde queremos chegar?</li>
          <li>Quais módulos fazem parte dessa visão?</li>
          <li>Quais dependências existem entre eles?</li>
          <li>O que pertence ao primeiro ciclo?</li>
          <li>O que fica para o futuro?</li>
        </ul>
        <p className="mb-8 leading-relaxed">
          Essa representação mudou a dinâmica das discussões.<br />
          As conversas deixaram de girar em torno de listas de entregas e passaram a acontecer sobre uma visão compartilhada do produto, facilitando o alinhamento entre Produto, Engenharia, Arquitetura e liderança.
        </p>

        <h2 className="text-2xl font-bold mb-4">Definindo a primeira versão</h2>
        <p className="mb-6 leading-relaxed">
          Com a visão do ecossistema estabelecida, precisávamos transformar uma iniciativa ampla em entregas concretas.<br />
          O desafio era encontrar um primeiro recorte que equilibrasse três fatores:
        </p>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>valor para o cliente;</li>
          <li>viabilidade técnica;</li>
          <li>capacidade de evolução.</li>
        </ul>
        <p className="mb-6 leading-relaxed">
          A partir dessa análise, priorizamos quatro frentes para iniciar a construção da plataforma:
        </p>
        <ul className="list-disc pl-5 mb-8 space-y-2">
          <li>Pessoas;</li>
          <li>Entidades;</li>
          <li>Posições;</li>
          <li>Importação Unificada.</li>
        </ul>

        <h3 className="text-xl font-bold mb-2">Pessoas e Entidades</h3>
        <p className="mb-4 leading-relaxed">
          Esses módulos formavam a base comum de praticamente todos os produtos do ecossistema.<br />
          Por isso, concentraram grande parte da fase de descoberta.
        </p>
        <p className="mb-4 leading-relaxed">
          O trabalho consistiu em analisar como cada produto estruturava seus dados, identificar redundâncias e construir um modelo único capaz de atender às diferentes necessidades da plataforma.<br />
          Esse processo aconteceu em diferentes etapas:
        </p>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>eliminação de informações duplicadas;</li>
          <li>agrupamento de campos equivalentes;</li>
          <li>revisão completa da taxonomia;</li>
          <li>definição de conceitos e nomenclaturas compartilhadas.</li>
        </ul>
        <p className="mb-8 leading-relaxed">
          O resultado foi uma linguagem comum para todo o ecossistema.
        </p>

        <h3 className="text-xl font-bold mb-2">Posições</h3>
        <p className="mb-8 leading-relaxed">
          Embora permanecessem no escopo da iniciativa, as Posições deixaram de ser o centro do projeto.<br />
          Com o novo direcionamento, passaram a representar uma etapa posterior da evolução da plataforma, permitindo que a adoção inicial acontecesse com uma estrutura mais simples.
        </p>

        <h3 className="text-xl font-bold mb-2">Importação Unificada</h3>
        <p className="mb-6 leading-relaxed">
          Durante a descoberta encontramos uma prova de conceito criada pelo time de Implementação utilizando n8n.<br />
          A solução permitia importar uma única planilha e distribuí-la para diferentes produtos da plataforma.
        </p>
        <p className="mb-6 leading-relaxed">
          Apesar de ainda depender de processos manuais, a iniciativa reforçava uma hipótese importante:<br />
          os clientes não queriam configurar cada produto separadamente.<br />
          Eles queriam cadastrar uma única vez e reutilizar essas informações em todo o ecossistema.
        </p>
        <p className="mb-8 leading-relaxed">
          Essa descoberta fortaleceu ainda mais a estratégia da administração centralizada.
        </p>

        <h3 className="text-xl font-bold mb-2">A estratégia de evolução</h3>
        <p className="mb-6 leading-relaxed">
          Também definimos uma abordagem incremental para reduzir os riscos de migração.<br />
          Em vez de substituir imediatamente todas as estruturas existentes, planejamos uma evolução em etapas.
        </p>

        <div className="space-y-6 mb-8">
          <div>
            <h4 className="font-semibold mb-1">Fase 1</h4>
            <p className="text-gray-700">Criar um único ponto de entrada para os dados. Uma única planilha alimentaria todas as bases existentes.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Fase 2</h4>
            <p className="text-gray-700">Transformar a nova base central na origem oficial das informações, distribuindo automaticamente os dados para cada produto.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Fase 3</h4>
            <p className="text-gray-700">Eliminar gradualmente os cadastros locais. Toda criação e manutenção passaria a acontecer exclusivamente na camada administrativa centralizada, estabelecendo uma única fonte de verdade para todo o ecossistema.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-12">
          <img src={map1} alt="Mapeamento 1" className="rounded-xl border border-[#DCD7CA] shadow-sm w-full" />
          <img src={map2} alt="Mapeamento 2" className="rounded-xl border border-[#DCD7CA] shadow-sm w-full" />
          <img src={v1v2} alt="Versões 1 e 2" className="rounded-xl border border-[#DCD7CA] shadow-sm w-full" />
          <img src={v3v4} alt="Versões 3 e 4" className="rounded-xl border border-[#DCD7CA] shadow-sm w-full" />
        </div>

        <h2 className="text-2xl font-bold mb-4">IA como aceleradora do processo</h2>
        <p className="mb-6 leading-relaxed">
          Ao longo do projeto utilizei diferentes ferramentas de IA, mas não para substituir decisões de Design.<br />
          Cada uma foi utilizada para acelerar uma etapa específica do processo, reduzindo tempo operacional e permitindo dedicar mais energia às decisões estratégicas.
        </p>
        <p className="mb-8 leading-relaxed">
          A IA participou desde a consolidação da descoberta até o apoio à implementação da solução.
        </p>

        <h3 className="text-xl font-bold mb-2">Síntese das pesquisas</h3>
        <p className="mb-6 leading-relaxed">
          O primeiro desafio era organizar anos de conhecimento acumulado.<br />
          Utilizei o NotebookLM para analisar pesquisas anteriores, entrevistas, documentos técnicos e materiais produzidos ao longo da iniciativa.
        </p>
        <p className="mb-6 leading-relaxed">
          Em vez de apenas resumir conteúdos, a ferramenta ajudou a identificar padrões, relacionar descobertas entre pesquisas realizadas em momentos diferentes e destacar temas recorrentes.
        </p>
        <p className="mb-8 leading-relaxed">
          Esse trabalho reduziu significativamente o tempo necessário para consolidar a descoberta e permitiu transformar um grande volume de informação dispersa em uma base consistente para tomada de decisão.
        </p>

        <div className="my-12 flex justify-center">
          <img src={lm1} alt="NotebookLM" className="w-3/4 rounded-2xl border border-[#DCD7CA] shadow-sm object-cover" />
        </div>

        <h3 className="text-xl font-bold mb-2">Explorando caminhos rapidamente</h3>
        <p className="mb-6 leading-relaxed">
          Com a estratégia definida, passei a utilizar o Google AI Studio para explorar diferentes possibilidades de arquitetura da informação e organização dos fluxos.
        </p>
        <p className="mb-6 leading-relaxed">
          A ferramenta permitiu transformar ideias em wireframes de baixa fidelidade em poucos minutos.<br />
          Isso acelerou discussões que normalmente dependeriam de várias iterações manuais no Figma.
        </p>
        <p className="mb-8 leading-relaxed">
          Em vez de investir tempo refinando uma única solução, consegui comparar diferentes abordagens, discutir alternativas com stakeholders e validar rapidamente hipóteses antes de iniciar o desenho definitivo.
        </p>

        <div className="my-12 flex justify-center">
          <img src={googleIa} alt="Google AI Studio" className="w-full rounded-2xl border border-[#DCD7CA] shadow-sm" />
        </div>

        <h3 className="text-xl font-bold mb-2">Tangibilizando a visão</h3>
        <p className="mb-6 leading-relaxed">
          Além da prototipação, utilizei o Figma Make para transformar o roadmap estratégico em uma representação visual da evolução da plataforma.
        </p>
        <p className="mb-6 leading-relaxed">
          Esse material passou a ser utilizado nas discussões entre Produto, Engenharia e Arquitetura, facilitando o entendimento da visão de longo prazo e das dependências entre módulos.
        </p>
        <p className="mb-8 leading-relaxed">
          Mais do que produzir um desenho, a ferramenta ajudou a transformar uma estratégia abstrata em uma conversa concreta.
        </p>

        <h3 className="text-xl font-bold mb-2">Aproximando Design e Engenharia</h3>
        <p className="mb-6 leading-relaxed">
          Depois da validação das soluções, utilizei o Cursor, integrado ao Google AI Studio, para apoiar a implementação dos protótipos.
        </p>
        <p className="mb-4 leading-relaxed">
          Em vez de produzir apenas especificações tradicionais, consegui transformar parte das decisões de interface em código funcional.<br />
          Isso trouxe alguns benefícios importantes:
        </p>
        <ul className="list-disc pl-5 mb-8 space-y-2">
          <li>reduziu ambiguidades durante a implementação;</li>
          <li>facilitou discussões técnicas com Engenharia;</li>
          <li>acelerou pequenos ajustes durante o desenvolvimento;</li>
          <li>aproximou o handoff de um processo contínuo de colaboração.</li>
        </ul>

        <div className="my-12 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img src={c1} alt="Cursor IDE - Tela 1" className="w-full rounded-2xl border border-[#DCD7CA] shadow-sm" />
            <img src={c2} alt="Cursor IDE - Tela 2" className="w-full rounded-2xl border border-[#DCD7CA] shadow-sm" />
          </div>
          <video src={videoCursor} autoPlay loop muted playsInline className="w-full rounded-2xl border border-[#DCD7CA] shadow-sm" />
        </div>

        <h2 className="text-2xl font-bold mb-4">O papel da IA neste projeto</h2>
        <p className="mb-6 leading-relaxed">
          Cada ferramenta contribuiu para uma etapa diferente da iniciativa.
        </p>

        <div className="space-y-4 mb-8">
          {[
            {
              tool: "NotebookLM",
              desc: "Consolidar pesquisas, entrevistas e documentos históricos.",
              logos: [notebookLmLogo]
            },
            {
              tool: "Google AI Studio",
              desc: "Explorar rapidamente diferentes arquiteturas e wireframes.",
              logos: [googleIaStudioLogo],
              logoBg: "#090505"
            },
            {
              tool: "Figma Make",
              desc: "Materializar o roadmap e a visão do ecossistema.",
              logos: [figmaMakeLogo]
            },
            {
              tool: "Cursor",
              desc: "Apoiar o handoff e acelerar a implementação das interfaces.",
              logos: [cursorLogo]
            }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-center bg-[#F9F8F6] border border-[#EBE7DD] p-4 rounded-xl hover:border-[#DCD7CA] hover:bg-[#F3F1ED] transition-all duration-300 shadow-sm">
              <div className="flex items-center shrink-0">
                {item.logos.map((logoPath, logoIdx) => (
                  <div 
                    key={logoIdx} 
                    className={\`w-14 h-14 rounded-lg border border-[#DCD7CA] flex items-center justify-center p-1.5 shadow-sm shrink-0 relative \${
                      logoIdx > 0 ? "ml-[-12px] z-20" : "z-10"
                    }\`}
                    style={{ backgroundColor: item.logoBg || 'white' }}
                  >
                    <img src={logoPath} alt="Logo" className="max-w-full max-h-full object-contain" />
                  </div>
                ))}
              </div>
              <div>
                <span className="font-bold block text-[#1a1a1a] mb-1">{item.tool}</span>
                <span className="text-sm text-[#4A5559] leading-relaxed block">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="mb-8 leading-relaxed">
          Em nenhum momento a IA substituiu decisões de Design.<br />
          Seu principal papel foi reduzir o tempo gasto em atividades operacionais, permitindo dedicar mais energia à pesquisa, à estratégia e à tomada de decisão.
        </p>

        <h2 className="text-2xl font-bold mb-4">Como eu pensava em medir sucesso</h2>
        <p className="mb-6 leading-relaxed">
          Como a implementação ainda não havia sido concluída, uma parte importante do meu trabalho foi definir, junto com a PM e a GPM, como validaríamos o sucesso da iniciativa quando ela chegasse aos clientes.
        </p>
        <p className="mb-6 leading-relaxed">
          O rollout começaria por empresas que contratassem mais de um produto simultaneamente, cenário em que o valor da administração unificada seria percebido de forma mais imediata.<br />
          Em seguida, a estratégia seria expandida para clientes da base que estivessem adquirindo novos produtos.
        </p>
        
        <p className="mb-4 leading-relaxed">As principais métricas definidas para acompanhar essa evolução foram:</p>
        
        <h3 className="text-xl font-bold mb-2">Eficiência operacional</h3>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>redução do tempo de implementação;</li>
          <li>redução do esforço do time de Implementação durante o onboarding;</li>
          <li>redução do tempo até o cliente começar a utilizar efetivamente os produtos.</li>
        </ul>

        <h3 className="text-xl font-bold mb-2">Experiência do cliente</h3>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>CES e CSAT dos novos fluxos;</li>
          <li>métricas do framework HEART, principalmente adoção, engajamento e sucesso nas tarefas;</li>
          <li>análises comportamentais contínuas utilizando Microsoft Clarity (heatmaps e gravações).</li>
        </ul>

        <h3 className="text-xl font-bold mb-2">Impacto para o negócio</h3>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>redução de solicitações relacionadas ao atraso na implantação;</li>
          <li>impacto na receita recorrente, reduzindo atrasos entre contratação e uso efetivo dos produtos;</li>
          <li>validação da estratégia de gestão unificada para suportar futuras expansões do ecossistema.</li>
        </ul>
        <p className="mb-8 leading-relaxed">
          Mais do que medir a qualidade da interface, buscávamos validar se a nova arquitetura realmente reduzia o atrito de implantação.
        </p>


        <h2 className="text-2xl font-bold mb-4">Potencial de negócio</h2>
        <p className="mb-6 leading-relaxed">
          Mesmo antes da implementação completa, o projeto já deixava claro o potencial estratégico da iniciativa.<br />
          Ela atuava diretamente sobre três desafios importantes da empresa.
        </p>

        <h3 className="text-xl font-bold mb-2">Uma única entrada de dados</h3>
        <p className="mb-6 leading-relaxed">
          Em vez de múltiplas configurações independentes, clientes poderiam realizar um único cadastro para abastecer todo o ecossistema.<br />
          Isso reduzia significativamente o esforço operacional durante a implantação.
        </p>

        <h3 className="text-xl font-bold mb-2">Expansão dentro da base existente</h3>
        <p className="mb-6 leading-relaxed">
          A Gupy possuía milhares de clientes utilizando apenas parte do ecossistema.<br />
          Um dos principais obstáculos para ampliar essa adoção era justamente o custo operacional percebido na contratação de novos produtos.<br />
          Ao reduzir esse atrito, a administração unificada fortalecia diretamente iniciativas de cross-sell e upsell.
        </p>

        <h3 className="text-xl font-bold mb-2">Diferencial competitivo</h3>
        <p className="mb-8 leading-relaxed">
          O maior diferencial da Gupy sempre foi a amplitude do seu ecossistema.<br />
          No entanto, esse benefício era parcialmente comprometido pelo esforço necessário para configurar cada novo produto.<br />
          Ao transformar a implantação em uma experiência única e integrada, a plataforma passava a entregar esse diferencial de forma muito mais consistente para os clientes.
        </p>

        <h2 className="text-2xl font-bold mb-4">Legado</h2>
        <p className="mb-6 leading-relaxed">
          O principal resultado deste projeto não foi uma interface.<br />
          Foi estabelecer uma direção única para uma iniciativa que vinha evoluindo de forma fragmentada havia anos.
        </p>
        <p className="mb-4 leading-relaxed">
          Ao final da descoberta, conseguimos:
        </p>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>consolidar anos de conhecimento disperso;</li>
          <li>estruturar uma visão compartilhada entre Produto, Design e Engenharia;</li>
          <li>definir a estratégia de evolução da plataforma;</li>
          <li>mapear os principais desafios técnicos e de experiência;</li>
          <li>produzir os artefatos que passaram a orientar os próximos ciclos de implementação.</li>
        </ul>
        <p className="mb-8 leading-relaxed">
          A partir desse ponto, o desafio deixava de ser descobrir qual caminho seguir e passava a ser validar essa estratégia durante a construção da solução.
        </p>

        <h2 className="text-2xl font-bold mb-4">Aprendizados</h2>
        <p className="mb-6 leading-relaxed">
          O tempo total da iniciativa foi longo, mas isso não refletia o ritmo do trabalho de Design.<br />
          Grande parte desse período foi marcada por ciclos sucessivos de priorização, pausa e retomada.
        </p>
        <p className="mb-6 leading-relaxed">
          Esse contexto trouxe um aprendizado importante.<br />
          Mais do que conduzir pesquisas ou desenhar soluções, meu papel passou a ser preservar o contexto do projeto.
        </p>
        <p className="mb-6 leading-relaxed">
          Ao longo dos anos, diferentes PMs, Tech Leads e lideranças participaram da iniciativa.<br />
          Em muitos momentos, fui responsável por reconstruir o histórico das decisões, conectar aprendizados anteriores e garantir que o time não perdesse conhecimento a cada mudança de contexto.
        </p>
        <p className="mb-8 leading-relaxed font-semibold">
          Essa continuidade acabou se tornando uma das contribuições mais relevantes do meu trabalho.<br />
          Percebi que liderar Design, em projetos dessa complexidade, significa também liderar conhecimento.
        </p>

        <h2 className="text-2xl font-bold mb-4">Conclusão</h2>
        <p className="mb-6 leading-relaxed">
          O maior resultado deste projeto não foi uma tela.<br />
          Foi transformar anos de pesquisas, hipóteses e interpretações diferentes em uma direção única para a evolução da plataforma.
        </p>
        <p className="mb-8 leading-relaxed">
          Mais do que desenhar uma solução, liderei a construção de uma visão compartilhada entre diferentes áreas, criando as bases para os próximos anos de evolução do ecossistema administrativo da Gupy.
        </p>

      </>
    )
);
`;

validLines.push(...restOfFile.split('\n'));
fs.writeFileSync('src/content/admin-global-docs.tsx', validLines.join('\n'));

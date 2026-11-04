import React from 'react';
import { MindiFeatureMotion, type MindiFeature } from '../components/MindiFeatureMotion';
import { MindiArchitectureMap, MindiEngineExample, MindiPipeline, MindiTimeline } from '../components/MindiDiagrams';
import { Eraser, Fingerprint, MessageCircle, Smile } from 'lucide-react';
import { MindiAdminMotion } from '../components/MindiAdminMotion';
import { MindiDesignSystemMotion } from '../components/MindiDesignSystemMotion';

/*
 * Case do Mindi (projeto pessoal, app de filmes e séries na App Store): a história do app, as
 * funcionalidades principais, como as APIs se conectam, o admin e o caminho do código até a
 * App Store sem Mac. Cada funcionalidade tem um banner com o motion da tela.
 */

const H2 = 'font-serif text-3xl font-bold text-[#241510] mb-4';
const LEAD = 'text-[#7D7169] leading-relaxed mb-8';

// O que me motivou: o que eu não achava nos outros apps
const DIFFERENTIALS = [
  { Icon: Eraser, title: 'Um feed só do que eu ainda não vi', text: 'Nos outros apps, um filme avaliado continuava aparecendo na Início, e depois de muitas notas a tela ficava poluída. No Mindi, o que você avalia ou salva sai do feed e vai para o Histórico ou para a Lista. Cada nota abre espaço para um título novo e deixa a próxima recomendação melhor.', highlight: true },
  { Icon: Smile, title: 'Notas com palavras, não números', text: 'Ninguém diz que um filme é "um 7". A gente diz que é bom, excelente, uma obra-prima. Por isso a escala vai de Péssimo a Obra-prima, em vez de estrelas curtas e frias.' },
  { Icon: Fingerprint, title: 'Descobrir quem você é pelo que viu', text: 'O Histórico mostra o seu gosto: os diretores e atores que você mais curte sem saber, as épocas, os países, o quanto você garimpa fora do mainstream.' },
  { Icon: MessageCircle, title: 'Um chat que sabe o que você já viu', text: 'Vi amigos com o app aberto indo perguntar ao ChatGPT o que assistir. Só que o ChatGPT não sabe o que você já viu, e o Mindi sabe. O chat responde já sem os títulos vistos e com o que está nos seus streamings.' },
];

// Funcionalidades em banner: texto de um lado, o celular com o motion do outro
const FEATURES: { feature: MindiFeature; kicker: string; title: string; text: string }[] = [
  { feature: 'titulo', kicker: 'Página do título', title: 'Tudo sobre o filme, num lugar só', text: 'Por que ele combina com você, onde assistir no Brasil, as notas do IMDb, do Rotten Tomatoes e do TMDB juntas, os prêmios e quem dirigiu. Era essa profundidade que eu sentia falta.' },
  { feature: 'explorar', kicker: 'Explorar', title: 'Cinema de todo lugar, em coleções', text: 'Gêneros, vencedores do Oscar, o Top 250 do IMDb, estúdios, franquias, estilos e cinema de vários países, do Brasil à Coreia. Um jeito de sair da bolha do que o streaming empurra.' },
  { feature: 'chat', kicker: 'Chat', title: 'Peça do seu jeito', text: 'Em texto livre, como pediria a um amigo. O chat entende o pedido, confere seus streamings, tira o que você já viu e responde com títulos que dá para abrir, salvar e avaliar ali mesmo.' },
  { feature: 'lista', kicker: 'Lista', title: 'O que assistir, filtrado pelo que você tem', text: 'Os títulos salvos ficam numa lista que filtra pelos seus streamings. Na hora de escolher, aparece só o que dá para ver agora.' },
  { feature: 'historico', kicker: 'Histórico e gêneros', title: 'O seu gosto, em números', text: 'Cada nota de 1 a 7 vira um retrato do seu gosto: as notas, os gêneros, os diretores e o elenco que nunca decepcionam, as épocas, o quanto você garimpa fora do mainstream e quantas horas já assistiu. São esses dados que alimentam as recomendações.' },
  { feature: 'sessao', kicker: 'Sessão conjunta', title: 'Para escolher o filme da noite a dois', text: 'Cruzando o histórico de duas pessoas, o app calcula a afinidade, os gêneros e os streamings em comum e sugere títulos que nenhum dos dois viu.' },
];

function FeatureBanner({ feature, kicker, title, text, reverse }: { feature: MindiFeature; kicker: string; title: string; text: string; reverse: boolean; key?: string }) {
  return (
    <div className="not-prose grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden" style={{ background: '#121215' }}>
      <div className={`flex flex-col justify-center p-8 md:p-12 ${reverse ? 'md:order-2' : ''}`}>
        <span className="text-[13px] font-semibold" style={{ color: '#9296FF' }}>{kicker}</span>
        <h3 className="font-serif text-[26px] font-bold text-white leading-tight mt-2">{title}</h3>
        <p className="text-[15px] leading-relaxed mt-3" style={{ color: '#A1A1AA' }}>{text}</p>
      </div>
      <div className="relative h-[460px] md:h-[560px]">
        <MindiFeatureMotion feature={feature} />
      </div>
    </div>
  );
}

export const MindiContent = () => (
  <div className="mode-simplificado">
    {/* História */}
    <div className="mb-32">
      <h2 id="historia" className={H2}>Um app que eu queria havia anos</h2>
      <p className={LEAD}>
        Há uns seis anos eu usava um app de filmes muito completo, cheio de informação. Um dia ele foi descontinuado e nunca mais achei um parecido. Desde então eu desenhava o meu no Figma, mas não tinha como construir sozinho: não bastava um site, o app precisava de APIs, contas, notificações e tudo funcionando de verdade.
      </p>
      <p className={LEAD}>
        Com a chegada do vibe code, no começo de 2025, isso mudou. Passei por várias ferramentas até achar a que dava conta do app inteiro.
      </p>

      <MindiTimeline />
    </div>

    {/* Diferenciais */}
    <div className="mb-32">
      <h2 id="diferenciais" className={H2}>O que eu não achava nos outros apps</h2>
      <p className={LEAD}>Testei vários apps de filmes. Quase todos tropeçavam no mesmo ponto, e foi dele que o Mindi nasceu.</p>
      <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4">
        {DIFFERENTIALS.map(({ Icon, title, text, highlight }) => (
          <div key={title} className={`rounded-2xl p-7 ${highlight ? 'md:col-span-3 bg-[#F6EAE3]' : 'border border-[#E2DCD4]'}`}>
            <Icon size={22} className={highlight ? 'text-[#9E4322]' : 'text-[#6F625B]'} />
            <h3 className="font-serif font-bold text-[20px] text-[#241510] leading-snug mt-4 mb-2">{title}</h3>
            <p className={`text-[15px] text-[#6F625B] leading-relaxed ${highlight ? 'max-w-3xl' : ''}`}>{text}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Funcionalidades */}
    <div className="mb-32">
      <h2 id="funcionalidades" className={H2}>O que o app faz</h2>
      <p className={LEAD}>
        Um curador pessoal: em vez de despejar o catálogo, o Mindi mostra poucas escolhas, explica por que elas combinam com você e diz onde assistir. A Início, no topo do case, já mostra o caminho principal: recomendações pela sua afinidade, a página do filme e a avaliação de Péssimo a Obra-prima.
      </p>
      <div className="flex flex-col gap-6">
        {FEATURES.map((f, i) => <FeatureBanner key={f.feature} {...f} reverse={i % 2 === 1} />)}
      </div>
    </div>

    {/* Aprendizados */}
    <div className="mb-32">
      <h2 id="aprendizados" className={H2}>O que aprendi vendo os amigos usarem</h2>
      <p className={LEAD}>
        Ainda na versão do Google AI Studio, publiquei o app e fiz um lançamento orgânico com cerca de 18 pessoas. Sempre que podia, via alguém usando na minha frente.
      </p>
      <ol className="not-prose divide-y divide-[#E2DCD4]">
        {[
          ['Menos catálogo, mais ritmo', 'A primeira versão era uma parede de pôsteres. Quebrei as informações em blocos diferentes, listas temáticas e destaques para a experiência não ficar monótona.'],
          ['Navegação corrigida no uso real', 'Vendo as pessoas usarem, achei idas e voltas que não faziam sentido e fui corrigindo o fluxo, tela por tela.'],
          ['O chat nasceu de uma observação', 'O app sabia o que a pessoa tinha visto, mas ela perguntava a outra IA. O chat trouxe essa conversa para dentro.'],
          ['Custo também é decisão de produto', 'O chat ainda tem limite de uso por causa do custo da IA. Quero entender se ele gera valor para mais gente antes de abrir de vez.'],
        ].map(([t, d], i) => (
          <li key={t} className="flex gap-4 py-4">
            <span className="text-[15px] font-semibold text-[#9E4322] tabular-nums pt-px">{String(i + 1).padStart(2, '0')}</span>
            <div><p className="text-[16px] font-semibold text-[#241510]">{t}</p><p className="text-[15px] text-[#6F625B] leading-relaxed mt-1">{d}</p></div>
          </li>
        ))}
      </ol>
      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        {[
          ['~18 pessoas', 'na primeira rodada de testes, num lançamento orgânico.'],
          ['App Store', 'nova versão em revisão pela Apple, já testada pelo TestFlight.'],
        ].map(([value, label]) => (
          <div key={value} className="border border-[#E2DCD4] rounded-2xl p-7">
            <p className="font-serif text-[32px] font-bold text-[#241510] leading-tight">{value}</p>
            <p className="text-[15px] text-[#6F625B] leading-relaxed mt-2">{label}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Motor de recomendação */}
    <div className="mb-32">
      <h2 id="motor" className={H2}>Como o app decide o que recomendar</h2>
      <p className={LEAD}>
        A Início não depende de IA generativa: é um motor próprio, que roda no aparelho e que fui afinando a cada rodada de uso. Para ficar concreto, este é o caminho de uma pessoa que acabou de entrar e avaliou cinco filmes, com as regras e os pesos reais do código.
      </p>
      <MindiEngineExample />
    </div>

    {/* Arquitetura */}
    <div className="mb-32">
      <h2 id="por-baixo" className={H2}>Várias APIs conversando</h2>
      <p className={LEAD}>
        Nenhuma fonte sozinha tinha tudo o que o app antigo mostrava. Então fui conectando APIs: o TMDB entrega o código do IMDb, que abre a consulta das notas na OMDb, e o identificador do Wikidata, que traz os prêmios. As chaves ficam numa Cloud Function, nunca no app, e o Firebase guarda contas, notas e o cache compartilhado.
      </p>
      <MindiArchitectureMap />
    </div>

    {/* Admin */}
    <div className="mb-32">
      <h2 id="admin" className={H2}>Um admin para acompanhar o app</h2>
      <p className={LEAD}>
        Construí um painel web, fora do app do iPhone, para acompanhar a ativação, o uso, as notificações e os erros. É onde vejo em que etapa as pessoas param e o que quebrou antes que alguém precise me avisar.
      </p>
      <div className="not-prose">
        <MindiAdminMotion />
        <p className="text-center text-sm text-[#6F625B] mt-4 font-medium">As abas do admin: visão geral da base, uso do app, usuários, erros e notificações. Na aba de usuários, nomes e e-mails são fictícios.</p>
      </div>
    </div>

    {/* Design system */}
    <div className="mb-32">
      <h2 id="design-system" className={H2}>Um design system que o código cobra</h2>
      <p className={LEAD}>
        Com a IA escrevendo boa parte do código, cada tela nova tendia a inventar um tamanho de texto, um cinza ou um ícone diferente. Para manter o app coerente, escrevi as regras num DESIGN.md: cores, tipografia, cantos, movimento, vibração e os componentes que já existem.
      </p>
      <p className={LEAD}>
        O mesmo conteúdo vive numa página /ds, só na web, com os componentes de verdade funcionando. E um lint, o npm run lint:design, lê o código e barra o que foge da regra antes do PR: tamanho de texto fora da escala, cor solta do Tailwind, peso acima de semibold, o ícone de brilhos. O Claude Code lê o DESIGN.md antes de mexer numa tela, e o lint confere o resultado.
      </p>
      <div className="not-prose">
        <MindiDesignSystemMotion />
        <p className="text-center text-sm text-[#6F625B] mt-4 font-medium">A página /ds do app, com os mesmos textos e componentes: fundamentos, componentes e as regras que o lint confere.</p>
      </div>
    </div>

    {/* Pipeline */}
    <div className="mb-16">
      <h2 id="app-store" className={H2}>Até a App Store, sem ter um Mac</h2>
      <p className={LEAD}>
        Publicar um app iOS normalmente exige um Mac. Sem um, montei o caminho pela nuvem: o app é React com Capacitor, e o Codemagic faz o build num Mac mini remoto toda vez que eu peço.
      </p>
      <MindiPipeline />
    </div>
  </div>
);

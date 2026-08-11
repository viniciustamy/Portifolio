
import React from 'react';
import { Gallery } from '../components/Gallery';

import cine1 from '../assets/images/Imagens Dinamicas/Cine-1.png';
import cine2 from '../assets/images/Imagens Dinamicas/Cine-2.png';
import cine3 from '../assets/images/Imagens Dinamicas/Cine-3.png';
import cine4 from '../assets/images/Imagens Dinamicas/Cine-4.png';
import atomic1 from '../assets/images/Imagens Dinamicas/Atomic-1.png';
import atomic2 from '../assets/images/Imagens Dinamicas/Atomic 2.png';
import l1 from '../assets/images/Imagens Dinamicas/L-1.png';
import l2 from '../assets/images/Imagens Dinamicas/L-2.png';
import l3 from '../assets/images/Imagens Dinamicas/L-3.png';
import l4 from '../assets/images/Imagens Dinamicas/L-4.png';
import l5 from '../assets/images/Imagens Dinamicas/L-5.jpg';
import l6 from '../assets/images/Imagens Dinamicas/L-6.jpg';














const cineGallery = [
  { src: cine1, title: 'Cine Hotjar 1', description: 'Sessão de Cine Hotjar' },
  { src: cine2, title: 'Cine Hotjar 2', description: 'Sessão de Cine Hotjar' },
  { src: cine3, title: 'Cine Hotjar 3', description: 'Sessão de Cine Hotjar' },
  { src: cine4, title: 'Cine Hotjar 4', description: 'Sessão de Cine Hotjar' }
];

const atomicGallery = [
  { src: atomic1, title: 'Atomic Research 1', description: 'Quadro de Atomic Research e Cruzamento de Evidências' },
  { src: atomic2, title: 'Atomic Research 2', description: 'Quadro de Atomic Research e Cruzamento de Evidências' }
];

const ldjGallery = [
  { src: l1, title: 'Light Decision Jam 1', description: 'Sessão de Light Decision Jam' },
  { src: l2, title: 'Light Decision Jam 2', description: 'Sessão de Light Decision Jam' },
  { src: l3, title: 'Light Decision Jam 3', description: 'Sessão de Light Decision Jam' },
  { src: l4, title: 'Light Decision Jam 4', description: 'Sessão de Light Decision Jam' },
  { src: l5, title: 'Light Decision Jam 5', description: 'Sessão de Light Decision Jam' },
  { src: l6, title: 'Light Decision Jam 6', description: 'Sessão de Light Decision Jam' }
];

export const FrameworkDynamicsContent = () => (
    (
      <div className="mode-simplificado">
        <p className="mb-6 leading-relaxed">
          Ao longo da minha trajetória na Gupy, sempre enxerguei processos de Design como ferramentas para acelerar alinhamentos, gerar aprendizado coletivo e transformar percepções em decisões. Por isso, conduzi dezenas de workshops, dinâmicas e frameworks de Discovery em diferentes contextos: desde investigações de usabilidade até sessões estratégicas com clientes, stakeholders e times multidisciplinares.
        </p>
        <p className="mb-8 leading-relaxed">
          Nos últimos anos, a chegada da IA mudou significativamente esse processo. Muitas etapas tradicionais de Discovery passaram a ser aceleradas por prototipação, experimentação e validações rápidas. Ainda assim, continuo acreditando que momentos estruturados de investigação e colaboração são fundamentais quando o objetivo é compreender problemas complexos antes de buscar soluções.
        </p>

        <h2 id="cine-hotjar" className="text-2xl font-bold mb-4">Cine Hotjar</h2>
        <p className="mb-6 leading-relaxed">
          Uma das dinâmicas que mais utilizei foi o <strong>Cine Hotjar</strong>, voltado para análise colaborativa de gravações reais de usuários.
        </p>
        <p className="mb-6 leading-relaxed">
          O processo começava com uma curadoria das gravações mais relevantes. Em seguida, reunia stakeholders de diferentes áreas para assistir aos vídeos em conjunto. Durante a sessão, cada participante registrava individualmente seus insights, dúvidas e observações.
        </p>
        <p className="mb-8 leading-relaxed">
          Após a visualização, consolidávamos todas as anotações em um quadro compartilhado, discutíamos os principais pontos observados e realizávamos uma clusterização dos padrões encontrados. A partir desses agrupamentos, sintetizávamos os principais problemas identificados e, junto ao Product Manager, priorizávamos quais oportunidades deveriam seguir para investigação ou solução. Essa dinâmica aproximava diferentes perspectivas sobre o comportamento dos usuários e criava alinhamento entre Design, Produto e demais áreas envolvidas.
        </p>

        <Gallery items={cineGallery} />

        <h2 id="atomic-research" className="text-2xl font-bold mb-4">Atomic Research</h2>
        <p className="mb-6 leading-relaxed">
          Outro framework que utilizei com frequência foi o <strong>Atomic Research</strong>, principalmente em projetos de Discovery.
        </p>
        <p className="mb-6 leading-relaxed">
          Em vez de analisar pesquisas isoladamente, utilizávamos o método para consolidar aprendizados provenientes de diferentes fontes, como entrevistas, pesquisas quantitativas, tickets de suporte, análises de comportamento e feedbacks de clientes.
        </p>
        <p className="mb-8 leading-relaxed">
          O objetivo era transformar cada evidência em um insight estruturado e, posteriormente, cruzar essas informações para identificar padrões recurrentes. Quando um mesmo problema surgia em múltiplos canais e com diferentes perfis de usuários, aumentava nossa confiança na relevância daquele tema. Essa abordagem ajudava a reduzir decisões baseadas em percepções individuais e fortalecia a priorização de problemas realmente estruturantes para o produto.
        </p>

        <Gallery items={atomicGallery} />

        <h2 id="light-decision-jam" className="text-2xl font-bold mb-4">Light Decision Jam</h2>
        <p className="mb-6 leading-relaxed">
          O <strong>Light Decision Jam (LDJ)</strong> foi uma das dinâmicas colaborativas que mais utilizei para facilitar discussões, priorizar problemas e construir direcionamentos junto a clientes e stakeholders.
        </p>
        <p className="mb-6 leading-relaxed">
          Uma das aplicações mais marcantes aconteceu em um workshop presencial com cerca de 20 profissionais de RH de empresas estratégicas da Gupy. O objetivo era mapear toda a jornada de aquisição de talentos e identificar as maiores oportunidades de evolução.
        </p>
        <p className="mb-6 leading-relaxed">
          Organizamos a jornada em grandes etapas e, inicialmente, buscamos construir um entendimento comum sobre o que acontecia em cada momento do processo, considerando que cada empresa possuía fluxos e maturidades diferentes.
        </p>
        <p className="mb-6 leading-relaxed">
          Com essa visão compartilhada, os participantes identificaram os fatores que impulsionavam cada etapa e, principalmente, os principais impedimentos enfrentados no dia a dia. Esses impedimentos foram discutidos, agrupados e priorizados por votação.
        </p>
        <p className="mb-6 leading-relaxed">
          A partir das dores priorizadas, conduzimos um processo de aprofundamento, transformando problemas em desafios e, posteriormente, convertendo esses desafios em oportunidades de produto.
        </p>
        <p className="mb-8 leading-relaxed">
          Toda a dinâmica foi realizada presencialmente, utilizando post-its, votação por adesivos e clusterização coletiva. Além de gerar alinhamento entre empresas com contextos bastante distintos, o workshop produziu oportunidades concretas que posteriormente influenciaram iniciativas relacionadas à visibilidade de informações, geração de insights acionáveis e melhorias na experiência da plataforma. Foi uma das sessões de facilitação mais bem avaliadas que conduzi, tanto pela participação ativa dos stakeholders quanto pela qualidade dos resultados obtidos.
        </p>

        <Gallery items={ldjGallery} />
      </div>
    )
);

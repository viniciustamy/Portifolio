import React from 'react';
import { Gallery } from '../components/Gallery';

import oq0 from '../assets/images/Imagens Orquestração IA/OQ-0.png';
import oq1 from '../assets/images/Imagens Orquestração IA/OQ-1.png';
import oq2 from '../assets/images/Imagens Orquestração IA/OQ-2.png';
import oq3 from '../assets/images/Imagens Orquestração IA/OQ-3.png';
import oq4 from '../assets/images/Imagens Orquestração IA/OQ-4.png';
import oq5 from '../assets/images/Imagens Orquestração IA/OQ-5.png';
import oq6 from '../assets/images/Imagens Orquestração IA/OQ-6.png';

const oq0Gallery = [
  { src: oq0, title: 'Iniciativas de IA', description: 'Mapeamento das iniciativas existentes e identificação de padrões de comportamento', fullWidth: true }
];

const oq1Gallery = [
  { src: oq1, title: 'Arquitetura de Experiência', description: 'Visão da arquitetura combinando experiência global com agentes especializados', fullWidth: true }
];

const oqPrototiposGallery = [
  { src: oq2, title: 'Assistente global', description: 'Assistente global e sugestões contextuais' },
  { src: oq3, title: 'Agentes especializados', description: 'Agentes focados em domínios específicos' },
  { src: oq4, title: 'Geração de conteúdo', description: 'Geração de conteúdo adaptado ao contexto do produto' },
  { src: oq5, title: 'Exploração de métricas', description: 'Exploração de métricas e visualizações dinâmicas' },
  { src: oq6, title: 'Central de Ajuda', description: 'Respostas baseadas na Central de Ajuda' }
];

export const OrquestracaoAgentesContent = () => (
  <div className="mode-simplificado">
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-[#1a1a1a]">Como estruturamos uma visão unificada para agentes de IA em diferentes produtos antes mesmo da implementação.</h2>
    </div>

    <h2 className="text-2xl font-bold mb-4">O contexto</h2>
    <p className="mb-6 leading-relaxed">
      Diversos produtos da empresa já utilizavam IA para tarefas como geração de conteúdo, análise de dados, sugestões inteligentes e suporte ao usuário.
    </p>
    <p className="mb-8 leading-relaxed">
      O desafio deixou de ser criar novos agentes e passou a ser garantir que todos compartilhassem uma experiência consistente, permitindo que novas capacidades fossem incorporadas sem reinventar padrões de interação.
    </p>

    <h2 className="text-2xl font-bold mb-4">O trabalho</h2>
    <p className="mb-6 leading-relaxed">
      Minha atuação foi menos focada em uma funcionalidade específica e mais na construção de uma visão de produto para IA.
    </p>
    <p className="mb-4 leading-relaxed">
      As principais frentes incluíram:
    </p>
    <ul className="list-disc pl-5 mb-8 space-y-2">
      <li>levantamento das iniciativas existentes;</li>
      <li>identificação de padrões de comportamento entre agentes;</li>
      <li>criação de uma taxonomia para orientar futuras implementações;</li>
      <li>definição de uma arquitetura de experiência compartilhada;</li>
      <li>padronização de componentes e princípios de interação;</li>
      <li>prototipação de diferentes cenários de uso.</li>
    </ul>

    <Gallery items={oq0Gallery} />

    <h2 id="arquitetura-proposta" className="text-2xl font-bold mb-4 mt-8">A arquitetura proposta</h2>
    <p className="mb-6 leading-relaxed">
      A proposta combinava uma experiência global de IA com agentes especializados dentro de cada produto.
    </p>
    <p className="mb-6 leading-relaxed">
      Em vez de um único assistente genérico, cada domínio teria agentes próprios, compartilhando os mesmos padrões de descoberta, interação e apresentação de respostas.
    </p>
    <p className="mb-8 leading-relaxed">
      Isso permitia manter consistência sem perder o contexto específico de cada produto.
    </p>

    <Gallery items={oq1Gallery} />

    <h2 className="text-2xl font-bold mb-4 mt-8">Protótipos</h2>
    <p className="mb-4 leading-relaxed">
      Os protótipos exploravam diferentes níveis da experiência, incluindo:
    </p>
    <ul className="list-disc pl-5 mb-6 space-y-2">
      <li>assistente global;</li>
      <li>agentes especializados;</li>
      <li>sugestões contextuais;</li>
      <li>geração de conteúdo;</li>
      <li>exploração de métricas;</li>
      <li>respostas baseadas na Central de Ajuda.</li>
    </ul>
    <p className="mb-8 leading-relaxed">
      O objetivo não era validar uma interface específica, mas testar princípios de interação que pudessem ser reutilizados em toda a plataforma.
    </p>

    <Gallery items={oqPrototiposGallery} />

    <h2 className="text-2xl font-bold mb-4 mt-8">Desfecho</h2>
    <p className="mb-6 leading-relaxed">
      Antes da implementação, a iniciativa foi despriorizada em função das mudanças de prioridade da empresa.
    </p>
    <p className="mb-8 leading-relaxed">
      Apesar disso, o trabalho permaneceu como referência estratégica e, meses depois, parte dessa visão foi retomada por outro time durante uma nova iniciativa voltada à arquitetura de agentes de IA.
    </p>

    <h2 className="text-2xl font-bold mb-4">Meu papel</h2>
    <ul className="list-disc pl-5 mb-8 space-y-2">
      <li>Liderança da visão de experiência para IA.</li>
      <li>Mapeamento das iniciativas existentes.</li>
      <li>Definição da arquitetura de experiência.</li>
      <li>Construção da taxonomia dos agentes.</li>
      <li>Criação de protótipos exploratórios.</li>
      <li>Facilitação entre diferentes squads.</li>
      <li>Apresentação da proposta para liderança.</li>
    </ul>

    <h2 className="text-2xl font-bold mb-4">Aprendizados</h2>
    <p className="mb-6 leading-relaxed">
      Projetar IA em produtos complexos vai muito além da criação de um chat. O principal desafio está em definir princípios que permitam diferentes inteligências coexistirem de forma consistente, contextual e escalável.
    </p>
    <p className="mb-8 leading-relaxed">
      Mesmo sem chegar à implementação, esse projeto reforçou a importância de tratar IA como um sistema de produto com arquitetura, padrões e governança compartilhados, em vez de um conjunto de funcionalidades isoladas.
    </p>
  </div>
);

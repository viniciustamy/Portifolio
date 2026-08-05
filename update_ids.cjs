const fs = require('fs');

const updateFile = (file, replacements) => {
  let content = fs.readFileSync(file, 'utf8');
  for (const [oldStr, newStr] of replacements) {
    content = content.replace(oldStr, newStr);
  }
  fs.writeFileSync(file, content);
};

updateFile('src/content/admin-global-docs.tsx', [
  ['<h2 className="text-2xl font-bold mb-4">O insight que mudou o projeto</h2>', '<h2 id="insight" className="text-2xl font-bold mb-4">O insight que mudou o projeto</h2>'],
  ['<h2 className="text-2xl font-bold mb-4 mt-8">A decisão: Job Manager vs. Position Manager</h2>', '<h2 id="job-vs-position" className="text-2xl font-bold mb-4 mt-8">A decisão: Job Manager vs. Position Manager</h2>'],
  ['<h2 className="text-2xl font-bold mb-4">IA como aceleradora do processo</h2>', '<h2 id="ia-aceleradora" className="text-2xl font-bold mb-4">IA como aceleradora do processo</h2>'],
  ['<h3 className="text-xl font-bold mb-2">Aproximando Design e Engenharia</h3>', '<h3 id="aproximando-design" className="text-xl font-bold mb-2">Aproximando Design e Engenharia</h3>'],
  ['<h2 className="text-2xl font-bold mb-4">Materializando a visão do produto</h2>', '<h2 id="materializando-visao" className="text-2xl font-bold mb-4">Materializando a visão do produto</h2>']
]);

updateFile('src/content/devolutiva.tsx', [
  ['<h2 className="text-2xl font-bold mb-4">Consolidando pesquisas existentes</h2>', '<h2 id="consolidando-pesquisas" className="text-2xl font-bold mb-4">Consolidando pesquisas existentes</h2>'],
  ['<h2 className="text-2xl font-bold mb-4">Arquitetando a solução</h2>', '<h2 id="arquitetando-a-solucao" className="text-2xl font-bold mb-4">Arquitetando a solução</h2>'],
  ['<h2 className="text-2xl font-bold mb-4">Validação</h2>', '<h2 id="validacao" className="text-2xl font-bold mb-4">Validação</h2>'],
  ['<h2 className="text-2xl font-bold mb-4">Resultados</h2>', '<h2 id="resultados" className="text-2xl font-bold mb-4">Resultados</h2>']
]);

updateFile('src/content/kba-senha.tsx', [
  ['<h2 className="text-2xl font-bold mb-4">Estratégia</h2>', '<h2 id="estrategia" className="text-2xl font-bold mb-4">Estratégia</h2>'],
  ['<h2 className="text-2xl font-bold mb-4">Entrega</h2>', '<h2 id="entrega" className="text-2xl font-bold mb-4">Entrega</h2>'],
  ['<h2 className="text-2xl font-bold mb-4">Impacto</h2>', '<h2 id="impacto" className="text-2xl font-bold mb-4">Impacto</h2>']
]);

updateFile('src/content/framework-dynamics.tsx', [
  ['<h2 className="text-2xl font-bold mb-4">Atomic Research</h2>', '<h2 id="atomic-research" className="text-2xl font-bold mb-4">Atomic Research</h2>'],
  ['<h2 className="text-2xl font-bold mb-4">Light Decision Jam</h2>', '<h2 id="light-decision-jam" className="text-2xl font-bold mb-4">Light Decision Jam</h2>'],
  ['<h2 className="text-2xl font-bold mb-4">Cine Hotjar</h2>', '<h2 id="cine-hotjar" className="text-2xl font-bold mb-4">Cine Hotjar</h2>']
]);

updateFile('src/content/ia-dia-dia.tsx', [
  ['<h2 className="text-2xl font-bold mb-6">IA acelerando o processo de Design</h2>', '<h2 id="ia-acelerando" className="text-2xl font-bold mb-6">IA acelerando o processo de Design</h2>'],
  ['<h3 className="text-xl font-bold mb-3">Handoff mais completo para Engenharia</h3>', '<h3 id="handoff-completo" className="text-xl font-bold mb-3">Handoff mais completo para Engenharia</h3>']
]);

updateFile('src/content/orquestracao-agentes.tsx', [
  ['<h2 className="text-2xl font-bold mb-4 mt-8">A arquitetura proposta</h2>', '<h2 id="arquitetura-proposta" className="text-2xl font-bold mb-4 mt-8">A arquitetura proposta</h2>']
]);

console.log('done');

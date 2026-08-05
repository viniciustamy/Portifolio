const fs = require('fs');
let content = fs.readFileSync('src/components/PresentationMode.tsx', 'utf-8');

// Replace imports
content = content.replace(/import \{ Slide3, Slide4, Slide5, Slide6 \} from '.\/slides\/CaseContextSlides';\nimport \{ Slide7, Slide8, Slide9, Slide10 \} from '.\/slides\/CaseExecutionSlides';\nimport \{ Slide11, Slide12 \} from '.\/slides\/CaseConclusionSlides';/, 
`import { Slide3, Slide4, Slide5, Slide6 } from './slides/CaseSlides1';
import { Slide7, Slide8, Slide9, Slide10 } from './slides/CaseSlides2';
import { Slide11, Slide12, Slide13, Slide14, Slide15 } from './slides/CaseSlides3';`);

// Replace totalSlides
content = content.replace(/const totalSlides = 13;/, 'const totalSlides = 16;');

// Replace steps
content = content.replace(/const steps = \[\s*\{ name: 'Quem Sou', range: \[0, 0\] \},\s*\{ name: 'Trajetória', range: \[1, 1\] \},\s*\{ name: 'Portfólio', range: \[2, 2\] \},\s*\{ name: 'Abertura', range: \[3, 3\] \},\s*\{ name: 'Contexto', range: \[4, 4\] \},\s*\{ name: 'Desafio', range: \[5, 5\] \},\s*\{ name: 'Estratégia', range: \[6, 6\] \},\s*\{ name: 'AI Alignment', range: \[7, 7\] \},\s*\{ name: 'Experiência', range: \[8, 8\] \},\s*\{ name: 'Sistêmico', range: \[9, 9\] \},\s*\{ name: 'Resultados', range: \[10, 10\] \},\s*\{ name: 'Papel', range: \[11, 11\] \},\s*\{ name: 'Fim', range: \[12, 12\] \},\s*\];/,
`const steps = [
    { name: 'Quem Sou', range: [0, 0] },
    { name: 'Trajetória', range: [1, 1] },
    { name: 'Portfólio', range: [2, 2] },
    { name: 'Capa', range: [3, 3] },
    { name: 'Contexto', range: [4, 4] },
    { name: 'Meu Papel', range: [5, 5] },
    { name: 'Desafio', range: [6, 6] },
    { name: 'Descoberta', range: [7, 7] },
    { name: 'Decisão', range: [8, 8] },
    { name: 'Roadmap', range: [9, 9] },
    { name: 'Implementação', range: [10, 10] },
    { name: 'IA', range: [11, 11] },
    { name: 'Métricas', range: [12, 12] },
    { name: 'Resultados', range: [13, 13] },
    { name: 'Legado', range: [14, 14] },
    { name: 'Fim', range: [15, 15] },
  ];`);

// Add new slides in render
content = content.replace(/\{currentSlide === 11 && <Slide11 \/>\}\n\s*\{currentSlide === 12 && <Slide12 \/>\}/, 
`{currentSlide === 11 && <Slide11 />}
            {currentSlide === 12 && <Slide12 />}
            {currentSlide === 13 && <Slide13 />}
            {currentSlide === 14 && <Slide14 />}
            {currentSlide === 15 && <Slide15 />}`);

fs.writeFileSync('src/components/PresentationMode.tsx', content);
console.log('Replaced successfully');

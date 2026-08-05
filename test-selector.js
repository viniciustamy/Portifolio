const fs = require('fs');

const content = fs.readFileSync('src/content/admin-global-docs.tsx', 'utf8');
const lines = content.split('\n');

// We just grep for "Fase 1" to see what the exact text is.
// Let's just output the whole section around "Fase 1" to see if it matches.
const fase1Index = lines.findIndex(l => l.includes('Fase 1'));
console.log(lines.slice(fase1Index - 5, fase1Index + 35).join('\n'));

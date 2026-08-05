const fs = require('fs');
const content = fs.readFileSync('src/content/admin-global-docs.tsx', 'utf8');
const lines = content.split('\n');
const fase1Index = lines.findIndex(l => l.includes('Fase 1'));
console.log(lines.slice(fase1Index - 5, fase1Index + 10).join('\n'));

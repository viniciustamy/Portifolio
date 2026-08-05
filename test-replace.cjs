const fs = require('fs');
const content = fs.readFileSync('src/content/admin-global-docs.tsx', 'utf8');
const lines = content.split('\n');

const startIndex = lines.findIndex(l => l.includes('Uma única entrada de dados')) - 5;
const endIndex = lines.findIndex(l => l.includes('Legado')) - 1;
console.log(lines.slice(startIndex, endIndex).join('\n'));

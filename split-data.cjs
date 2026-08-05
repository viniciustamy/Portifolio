const fs = require('fs');
const code = fs.readFileSync('src/data.tsx', 'utf-8');

// find all project IDs
const matches = [...code.matchAll(/id: '([^']+)'/g)];
console.log(matches.map(m => m[1]));

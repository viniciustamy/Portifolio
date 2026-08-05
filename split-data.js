const fs = require('fs');
const code = fs.readFileSync('src/data.tsx', 'utf-8');

// I'll just write a script to help me extract the projects array manually or semi-automatically.
console.log(code.length);

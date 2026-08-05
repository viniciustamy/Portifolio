const fs = require('fs');
const files = fs.readdirSync('src/content').filter(f => f.endsWith('.tsx'));

for (const file of files) {
    const filePath = `src/content/${file}`;
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace("import React from 'react';\nimport React from 'react';", "import React from 'react';");
    fs.writeFileSync(filePath, content);
}

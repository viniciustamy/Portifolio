const fs = require('fs');
const path = require('path');

const dir = 'src/components/slides';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx')).map(f => path.join(dir, f));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Replace text-base md:text-lg
  content = content.replace(/text-base md:text-lg/g, 'text-base');
  
  // Replace text-lg md:text-xl
  content = content.replace(/text-lg md:text-xl/g, 'text-base');
  
  // Replace text-sm md:text-base but ONLY for <p> or <motion.p>
  // Actually, we can just replace it everywhere in paragraph tags
  // Since we know exactly which files, we can be more specific:
  content = content.replace(/(<motion\.p[^>]*className="[^"]*)text-sm md:text-base/g, '$1text-base');
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});

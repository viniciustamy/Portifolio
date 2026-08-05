const fs = require('fs');

const content = fs.readFileSync('src/content/admin-global-docs.tsx', 'utf8');
const lines = content.split('\n');
let inComponent = false;
let depth = 0;
let divCount = 0;
let firstLevelDivs = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('export const AdminGlobalDocsContent')) {
    inComponent = true;
  }
  if (!inComponent) continue;

  const tagMatches = line.match(/<[^>]+>/g);
  if (tagMatches) {
    for (const tag of tagMatches) {
      if (tag.startsWith('<div')) {
        if (depth === 1) { // Assuming <></> is depth 0. Wait, <></> is depth 1 if it wraps. Let's see.
          divCount++;
          firstLevelDivs.push({index: divCount, line: i + 1, content: line});
        }
        if (!tag.endsWith('/>')) depth++;
      } else if (tag.startsWith('</div')) {
        depth--;
      } else if (tag === '<>' || tag === '<React.Fragment>') {
        depth++;
      } else if (tag === '</>' || tag === '</React.Fragment>') {
        depth--;
      } else if (tag.startsWith('<') && !tag.startsWith('</') && !tag.endsWith('/>')) {
        // Other tags like h2, p, ul etc
        // Some might be self-closing but we assume standard html depth tracking for non-empty tags
        // Actually this is too brittle.
      }
    }
  }
}
console.log(firstLevelDivs);

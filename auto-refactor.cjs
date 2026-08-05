const { Project, SyntaxKind } = require('ts-morph');
const fs = require('fs');

async function run() {
    const project = new Project({ tsConfigFilePath: "tsconfig.json" });
    const dataFile = project.getSourceFileOrThrow("src/data.tsx");
    
    // We will extract the content of each project into src/content/<id>.tsx
    fs.mkdirSync('src/content', { recursive: true });

    // Get all imports and top-level variables (excluding projects and skills) to inject into the new files
    const imports = dataFile.getImportDeclarations().map(i => i.getText().replace(/\.\/assets/g, '../assets').replace(/\.\/components/g, '../components'));
    
    const statementsToKeep = [];
    for (const stmt of dataFile.getStatements()) {
        if (stmt.getKind() === SyntaxKind.VariableStatement) {
            const decls = stmt.getDeclarations();
            const name = decls[0].getName();
            if (name !== 'projects' && name !== 'skills') {
                statementsToKeep.push(stmt.getText().replace(/\.\/assets/g, '../assets').replace(/\.\/components/g, '../components'));
            }
        }
    }

    const projectsVar = dataFile.getVariableDeclarationOrThrow("projects");
    const projectsArray = projectsVar.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
    const elements = projectsArray.getElements();

    const newComponents = [];

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.getKind() === SyntaxKind.ObjectLiteralExpression) {
            const idProp = element.getProperty("id");
            const contentProp = element.getProperty("content");
            
            if (idProp && contentProp) {
                const id = idProp.getInitializer().getText().replace(/['"]/g, '');
                const componentName = id.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('') + 'Content';
                
                // Content is usually a JsxFragment or similar
                const contentText = contentProp.getInitializer().getText();

                const newFileText = `
import React from 'react';
${imports.join('\n')}

${statementsToKeep.join('\n\n')}

export const ${componentName} = () => (
    ${contentText}
);
`;
                const newFile = project.createSourceFile(`src/content/${id}.tsx`, newFileText, { overwrite: true });
                newFile.saveSync();

                newComponents.push({ id, componentName });
                
                // Replace the content property in data.tsx
                contentProp.getInitializer().replaceWithText(`<${componentName} />`);
            }
        }
    }

    // Add imports for the new components to data.tsx
    for (const { id, componentName } of newComponents) {
        dataFile.addImportDeclaration({
            namedImports: [componentName],
            moduleSpecifier: `./content/${id}`
        });
    }

    dataFile.saveSync();
    console.log("Refactoring complete!");
}

run().catch(console.error);

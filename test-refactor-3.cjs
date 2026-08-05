const { Project, SyntaxKind } = require('ts-morph');
const fs = require('fs');

async function refactor() {
    const project = new Project({
        tsConfigFilePath: "tsconfig.json",
    });

    const dataFile = project.getSourceFileOrThrow("src/data.tsx");
    const projectsVar = dataFile.getVariableDeclarationOrThrow("projects");
    const projectsArray = projectsVar.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
    
    const elements = projectsArray.getElements();
    
    if (!fs.existsSync('src/data/projects')) {
        fs.mkdirSync('src/data/projects', { recursive: true });
    }

    const newImports = [];

    // Reverse iterate to avoid messing up indices if we were removing (we are not removing directly in the loop though, we'll replace the array completely later)
    const newElementsText = [];

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.getKind() === SyntaxKind.ObjectLiteralExpression) {
            const idProp = element.getProperty("id");
            if (idProp && idProp.getKind() === SyntaxKind.PropertyAssignment) {
                const id = idProp.getInitializer().getText().replace(/['"]/g, '');
                
                // create a new file
                const newFilePath = `src/data/projects/${id}.tsx`;
                const newFile = project.createSourceFile(newFilePath, `
import React from 'react';
export const project_${id.replace(/-/g, '_')} = ${element.getText()};
                `, { overwrite: true });

                // try to fix missing imports
                newFile.fixMissingImports();
                newFile.saveSync();

                newImports.push(`import { project_${id.replace(/-/g, '_')} } from './data/projects/${id}';`);
                newElementsText.push(`project_${id.replace(/-/g, '_')}`);
            }
        }
    }

    // Now replace the projects array initializer
    projectsArray.replaceWithText(`[\n  ${newElementsText.join(',\n  ')}\n]`);
    
    // Add imports to dataFile
    dataFile.addImportDeclarations(newImports.map(imp => {
        const match = imp.match(/import { (.*) } from '(.*)'/);
        return {
            namedImports: [match[1]],
            moduleSpecifier: match[2]
        };
    }));

    dataFile.saveSync();
    console.log("Refactored data.tsx!");
}
refactor().catch(console.error);

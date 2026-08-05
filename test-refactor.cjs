const { Project, SyntaxKind } = require('ts-morph');
const fs = require('fs');

async function refactor() {
    const project = new Project({
        tsConfigFilePath: "tsconfig.json",
    });

    const dataFile = project.getSourceFileOrThrow("src/data.tsx");

    // Export all variable statements in data.tsx so they can be imported
    for (const varStmt of dataFile.getVariableStatements()) {
        if (!varStmt.hasExportKeyword()) {
            varStmt.setIsExported(true);
        }
    }

    dataFile.saveSync();
    console.log("Exported all variables in data.tsx");
}

refactor().catch(console.error);

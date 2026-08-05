const { Project, SyntaxKind } = require('ts-morph');

async function refactor() {
    const project = new Project({
        tsConfigFilePath: "tsconfig.json",
    });

    const dataFile = project.getSourceFileOrThrow("src/data.tsx");
    const projectsVar = dataFile.getVariableDeclarationOrThrow("projects");
    const projectsArray = projectsVar.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
    
    const elements = projectsArray.getElements();
    console.log(`Found ${elements.length} projects`);

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.getKind() === SyntaxKind.ObjectLiteralExpression) {
            const idProp = element.getProperty("id");
            if (idProp && idProp.getKind() === SyntaxKind.PropertyAssignment) {
                const id = idProp.getInitializer().getText().replace(/['"]/g, '');
                console.log(`Project ID: ${id}`);
            }
        }
    }
}
refactor().catch(console.error);

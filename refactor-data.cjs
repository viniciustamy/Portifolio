const { Project, SyntaxKind } = require('ts-morph');
const fs = require('fs');
const path = require('path');

const project = new Project();
project.addSourceFilesAtPaths("src/**/*.tsx");
project.addSourceFilesAtPaths("src/**/*.ts");

const sourceFile = project.getSourceFileOrThrow("src/data.tsx");

const projectsVar = sourceFile.getVariableDeclarationOrThrow("projects");
const projectsArray = projectsVar.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

const elements = projectsArray.getElements();

// We will create a directory src/data/projects
fs.mkdirSync('src/data/projects', { recursive: true });

// We want to create a new file for each project, e.g. dashboard-admissao.tsx
// But wait, the problem is that `projects` elements reference a LOT of local variables like `thumbDashboard`, `dash01`, `discoveryGalleryItems`, etc.
// Extracting just the object literal might be hard because of these dependencies.

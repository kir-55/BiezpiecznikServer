// Renders the React app to static HTML so every word is visible without JavaScript.
// Run after `vite build` (client) and `vite build --ssr src/entry-server.tsx --outDir dist/server`.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const htmlPath = `${root}dist/client/index.html`;
const { render } = await import(pathToFileURL(`${root}dist/server/entry-server.js`).href);
const template = await readFile(htmlPath, 'utf8');
if (!template.includes('<!--app-html-->')) throw new Error('index.html has no <!--app-html--> placeholder');
await writeFile(htmlPath, template.replace('<!--app-html-->', render()));
console.log('prerendered', htmlPath);

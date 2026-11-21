import { hydrateRoot, createRoot } from 'react-dom/client';
import { App } from './App';
import { initReveal } from './reveal';

const root = document.getElementById('root')!;
if (root.firstElementChild) hydrateRoot(root, <App />);
else createRoot(root).render(<App />); // dev server: no prerendered HTML
requestAnimationFrame(() => requestAnimationFrame(initReveal));

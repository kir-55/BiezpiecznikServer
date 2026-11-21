import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const ds = fileURLToPath(new URL('../bezpiecznik/08-design-system', import.meta.url));

// The design system lives in the spec folder and is imported from there, never copied.
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@ds': ds } },
  server: {
    fs: { allow: ['..'] },
    // QA runs create Chrome profiles in .qa/; watching them reloaded the page and served half-written files.
    watch: { ignored: ['**/.qa/**', '**/dist/**', '**/releases/**'] },
  },
  build: { outDir: 'dist/client', emptyOutDir: true },
});

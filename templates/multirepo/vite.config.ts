import { defineConfig } from 'vite';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const entry = join(__dirname, 'src/index.ts');

export default defineConfig({
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  build: {
    outDir: join(__dirname, 'dist'),
    sourcemap: true,
    lib: {
      entry,
      name: 'LintConfig',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      output: {
        preserveModules: true,
      },
    },
    ssr: true,
    minify: false,
    emptyOutDir: false,
  },
});

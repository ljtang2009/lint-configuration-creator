import { defineConfig } from 'vite';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import Inspect from 'vite-plugin-inspect';
import InsertCodePlugin from './scripts/vite/rollup-plugin-insert-code.ts';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const __dirname = dirname(fileURLToPath(import.meta.url));
const entry = join(__dirname, 'src/index.ts');

export default defineConfig({
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  build: {
    outDir: join(__dirname, 'bin'),
    sourcemap: true,
    lib: {
      entry,
      name: 'LintConfigurationCreator',
      formats: ['es'],
    },
    rollupOptions: {
      // external: [
      //   '@stylistic/eslint-plugin',
      //   '@stylistic/eslint-plugin-plus',
      //   '@stylistic/eslint-plugin-js',
      //   '@stylistic/eslint-plugin-ts',
      //   '@typescript-eslint/parser',
      //   'typescript-eslint',
      //   'jsonc-eslint-parser',
      //   'eslint-plugin-jsonc',
      //   'stylelint-config-clean-order',
      //   'stylelint-prettier',
      //   'confusing-browser-globals',
      //   'eslint-plugin-jest',
      // ],
      output: {
        // globals: {
        //   '@stylistic/eslint-plugin': 'stylisticEslintPlugin',
        //   '@stylistic/eslint-plugin-plus': 'stylisticEslintPluginPlus',
        //   '@stylistic/eslint-plugin-js': 'stylisticEslintPluginJs',
        //   '@stylistic/eslint-plugin-ts': 'stylisticEslintPluginTs',
        //   '@typescript-eslint/parser': 'typescriptEslintParser',
        //   'typescript-eslint': 'tseslint',
        //   'jsonc-eslint-parser': 'jsoncEslintParser',
        //   'eslint-plugin-jsonc': 'jsoncEslintPlugin',
        //   'stylelint-config-clean-order': 'stylelintConfigCleanOrder',
        //   'stylelint-prettier': 'stylelintPrettier',
        //   'confusing-browser-globals': 'confusingBrowserGlobals',
        //   'eslint-plugin-jest': 'eslintPluginJest',
        // },
        preserveModules: true,
      },
    },
    ssr: true,
    minify: false,
    emptyOutDir: false,
    target: ['esnext'],
  },
  plugins: [
    Inspect(),
    InsertCodePlugin('index.js', '#!/usr/bin/env node\n'),
    viteStaticCopy({
      targets: [{
        src: 'src/template/**/*',
        dest: 'template',
      }],
    }),
  ],
});

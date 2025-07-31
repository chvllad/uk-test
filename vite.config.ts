import { readFileSync } from 'fs';
import { URL, fileURLToPath } from 'url';

import { compileLitTemplates } from '@lit-labs/compiler';
import minifyHTML from '@lit-labs/rollup-plugin-minify-html-literals';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const p = JSON.parse(
  readFileSync(
    fileURLToPath(new URL('./package.json', import.meta.url)),
    'utf-8',
  ),
);
const inputs = [];
for (const e of Object.values(p.exports)) {
  const name = (e as any).default;
  inputs.push(`src/${name.slice(7, name.length - 3)}.ts`);
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    minifyHTML(),
    {
      ...dts({ tsconfigPath: './tsconfig.app.json' }),
      apply: 'build',
    },
    {
      ...typescript({
        tsconfig: './tsconfig.app.json',
        transformers: {
          before: [compileLitTemplates() as any],
        },
      }),
      apply: 'build',
    },
  ],
  build: {
    target: 'ES2022',
    sourcemap: true,
    assetsInlineLimit: 0,
    lib: {
      entry: 'src/index.ts',
      name: 'ui-kit',
      fileName: (_format, entryName) => {
        if (entryName === 'src/lib/index') {
          return `index.js`;
        }
        return `${entryName.replaceAll('node_modules', 'external')}.js`;
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: /^vue$|^zxing-wasm|^@?lit/,
      input: inputs,
      preserveEntrySignatures: 'strict',
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        dir: 'dist',
      },
    },
  },
});

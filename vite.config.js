import { defineConfig } from 'vite';
import pkg from './package.json';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    outDir: 'lib',
    emptyOutDir: true,
    lib: {
      entry: {
        'index': 'src/index.ts',
        'v1/index': 'src/v1/index.ts',
        'v2/index': 'src/v2/index.ts',
        'v3/index': 'src/v3/index.ts',
        'v4/index': 'src/v4/index.ts',
      },
      formats: ['es']
    },
    minify: true,
    sourcemap: true,
    rollupOptions: {
      external: ['node:child_process', ...Object.keys(pkg.dependencies)]
    }
  },
  worker: {
    format: 'es'
  },
  plugins: [dts({ rollupTypes: false })]
});

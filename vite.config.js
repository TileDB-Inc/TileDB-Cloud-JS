import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    outDir: 'lib',
    emptyOutDir: true,
    lib: {
      entry: {
        'index': 'src/index.ts', 
        'v3/index': 'src/v3/index.ts'
      },
      formats: ['es']
    },
    minify: true,
    sourcemap: true,
    rollupOptions: {
      external: ['node:child_process']
    }
  },
  worker: {
    format: 'es'
  },
  plugins: [dts({ rollupTypes: false })]
});

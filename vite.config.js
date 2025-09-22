import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    outDir: 'lib',
    emptyOutDir: true,
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index'
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
  plugins: [dts({ rollupTypes: true })]
});

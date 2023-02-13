import typescript from '@rollup/plugin-typescript';


export default [
  {
    input: 'src/index.ts',
    output: {
      format: 'cjs',
      file: 'lib/main.js'
    },
    plugins: [typescript()]
  },
  {
    input: 'src/index.ts',
    output: {
      format: 'es',
      file: 'lib/main.esm.js'
    },
    plugins: [typescript()]
  }
];
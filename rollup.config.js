const { nodeResolve } = require('@rollup/plugin-node-resolve');
import dts from "rollup-plugin-dts";

export default {
  input: 'src/index.ts',
  output: {
    format: 'cjs',
    file: 'lib/index.js'
  },
  plugins: [dts.default()]
};
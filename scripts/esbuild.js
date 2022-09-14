const { default: NodeModulesPolyfills } = require('@esbuild-plugins/node-modules-polyfill');
const { build } = require('esbuild');
const path = require('path');

build({
    plugins: [NodeModulesPolyfills()],
    entryPoints: [path.resolve(__dirname, '../src/index.ts')],
    outfile: path.resolve(__dirname,'../lib/module.js'),
    bundle: true,
    tsconfig: path.resolve(__dirname, '../tsconfig.esbuild.json'),
    format: 'esm'
});
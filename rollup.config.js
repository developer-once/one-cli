import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

export default {
  input: ['src/commands/init.ts', 'src/commands/create.ts'],
  output: {
    dir: 'lib',
    format: 'cjs',
    exports: 'auto',
  },
  external: [...Object.keys(pkg.dependencies), 'fs', 'path'],
  plugins: [
    commonjs(),
    json(),
    typescript({ sourceMap: false }),
  ],
};

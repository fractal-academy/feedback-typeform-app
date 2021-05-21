import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import babel from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import autoExternal from 'rollup-plugin-auto-external'

const packageJson = require('./package.json')

export default {
  input: packageJson.source,

  output: [
    {
      file: packageJson.main,
      format: 'cjs',

      globals: {
        react: 'React'
      },
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: 'esm',

      globals: {
        react: 'React'
      },
      sourcemap: true
    }
  ],

  external: [
    'react',
    'react-dom',
    'react-hook-form'
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    autoExternal(),
    peerDepsExternal(),
    nodeResolve(),
    commonjs(),
    postcss(),
    terser()
  ]
}
import babel from 'rollup-plugin-babel'
import {terser} from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import cleanup from 'rollup-plugin-cleanup'
import pkg from './package.json'


const config = {
  input: 'src/index.js',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: pkg.name,
      globals: ['@roseys/futils'],
    },
    {
      file: pkg.main,
      format: 'cjs',
      name: pkg.name,
      globals: ['@roseys/futils'],
    },
    {
      file: pkg.module,
      format: 'es',
      name: pkg.name,
      globals: ['@roseys/futils'],
    },
  ],
  external: ['@roseys/futils'],
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    resolve({
      module: true,
      jsnext: true,
      main: true,
      preferBuiltins: true,
      browser: true,
      modulesOnly: true,
    }),
    cleanup(),
    terser(),
    commonjs(),
    filesize(),
  ],
}

export default config

import babel from 'rollup-plugin-babel'
import {terser} from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import filesize from 'rollup-plugin-filesize'
import cleanup from 'rollup-plugin-cleanup'
import pkg from './package.json'


const plugins = [
  babel({
    exclude: 'node_modules/**',
    babelrc: false,
    presets: [['env', { loose: true, modules: false }], 'react', 'stage-0'],
    plugins: ['external-helpers'],
  }),
  replace({
    exclude: 'node_modules/**',
    ENV: JSON.stringify(process.env.NODE_ENV || 'development')
  })

]
const external = Object.keys(pkg.dependencies)
const treeshake={pureExternalModules:true,
}

const configBase = {
  input: 'temp/index.js',
  treeshake,
  output: [
    { file: pkg.browser, format: 'umd', name: 'name', sourcemap: false ,exports:'named'}
  ],
  plugins:[  resolve(),
    commonjs(),...plugins,terser(),filesize()]
}


const configES = {
  input: 'src/index.js',
  treeshake,
  external,
  output: [
    { file: pkg.main, format: 'cjs',  exports:'named' },
    { file: pkg.module, format: 'es', exports:'named'  },

  ],
  plugins:[...plugins,cleanup(),filesize()]
}


export default [configBase,configES]

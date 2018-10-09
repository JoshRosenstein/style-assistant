import * as path from 'path'
import pkg from './package.json'

const libName = pkg.name
// const PUBLIC = path.resolve(__dirname, 'public')
const SRC = path.resolve(__dirname, 'src')
const DOCS = path.resolve(__dirname, 'docz')

export default {
  dest: './docs',
 // files: './docz/**/*.mdx',
  ordering: 'ascending',
  src: './docz',
  title: 'style-assistant',
  description: pkg.description,
  base: `/${libName}/`,

  //  description: 'assist',
  // indexHtml: 'src/index.html',
  //  theme: 'src/theme/index',
  // ordering: 'ascending',
  //   propsParser: false,
  //  mdPlugins: [externalLinks.default],
  // htmlContext: {
  //   favicon: '/public/favicon.ico',
  // },

  modifyBundlerConfig: config => {
    config.resolve.alias = Object.assign({}, config.resolve.alias, {
      //  '@fonts': `${PUBLIC}/fonts`,
      // '@images': `${PUBLIC}/images`,
      '@examples': `${DOCS}/Examples`,
      'style-assistant': `${SRC}/index`,
      '@shared': `${DOCS}/shared`,
    })
  
    return config
  },
}
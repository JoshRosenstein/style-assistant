import * as path from 'path'
import pkg from './package.json';

const libName = pkg.name;
// const PUBLIC = path.resolve(__dirname, 'public')
const SRC = path.resolve(__dirname, 'src')
const DOCS = path.resolve(__dirname, 'docs')

export default {
  dest:'./docs/dist',
  src: './docs',
  title: 'style-assistant',
  //  description: 'assist',
  // indexHtml: 'src/index.html',
  //  theme: 'src/theme/index',
  // ordering: 'ascending',
  //   propsParser: false,
  //  mdPlugins: [externalLinks.default],
  // htmlContext: {
  //   favicon: '/public/favicon.ico',
  // },
  base: `/${libName}/`,
  description: pkg.description,
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
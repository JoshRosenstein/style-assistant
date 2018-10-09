import * as path from 'path'

// const PUBLIC = path.resolve(__dirname, 'public')
const SRC = path.resolve(__dirname, 'src')
const DOCS = path.resolve(__dirname, 'docs')

export default {
  dest:'./docs/dist',
  src: './docs',
  //  title: 'style-assisstnat',
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
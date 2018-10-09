import * as path from 'path'

// const PUBLIC = path.resolve(__dirname, 'public')
const SRC = path.resolve(__dirname, 'src')

export default {
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
      'style-assistant': `${SRC}/index`,
      'styled': './docs/styled',
    })
  
    return config
  },
}
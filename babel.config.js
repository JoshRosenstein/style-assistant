module.exports = function babelConfig(api) {
  api.cache(true)
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
        },
      ],
      '@babel/preset-react',
      '@babel/preset-flow',
    ],
    plugins: ['@babel/plugin-proposal-class-properties'],
    env: {
      test: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-flow',
        ],
      },
      docz: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-flow',
        ],
      },
    },
  }
}

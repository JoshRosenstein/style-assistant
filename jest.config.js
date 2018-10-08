module.exports = {
  transform: {
    //  '\\.css$': '<rootDir>/test/styleTransform.js',
    '^.+\\.js?$': 'babel-jest'
  },
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/__fixtures__/', '/__utils__/'],
  coveragePathIgnorePatterns: ['/node_modules/']
}

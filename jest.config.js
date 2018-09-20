module.exports = {
  transform: {
  //  '\\.css$': '<rootDir>/test/styleTransform.js',
    '^.+\\.js?$': 'babel-jest'
  },'testEnvironment': 'node',
  // watchPlugins: [
  //   'jest-watch-typeahead/filename',
  //   'jest-watch-typeahead/testname'
  // ],
  testPathIgnorePatterns: ['/node_modules/', '/__fixtures__/','/__utils__/'],
  // setupTestFrameworkScriptFile: '<rootDir>/test/testSetup.js',
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ]
}

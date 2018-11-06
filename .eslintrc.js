module.exports = {
  extends: [
    'plugin:import/errors',
    'prettier',
    'prettier/flowtype',
    'plugin:flowtype/recommended',
  ],
  plugins: ['import', 'prettier', 'flowtype', 'babel', 'jsdoc'],
  parser: 'babel-eslint',

  rules: {
    'arrow-body-style': 2,
    'flowtype/boolean-style': 2,
    'flowtype/no-primitive-constructor-types': 2,
    'flowtype/require-valid-file-annotation': 2,
    'import/no-duplicates': 2,
    'import/order': 0,
    'no-console': 1,
    'no-unused-vars': 2,
    'prettier/prettier': [
      2,
      {
        bracketSpacing: false,
        printWidth: 80,
        singleQuote: true,
        semi: false,
        trailingComma: 'all',
      },
    ],
  },
}

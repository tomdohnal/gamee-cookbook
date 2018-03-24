module.exports = {
  extends: [
    'airbnb',
    'plugin:flowtype/recommended',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
    'plugin:jest/recommended',
  ],
  parser: 'babel-eslint',
  env: {
    browser: true,
    'jest/globals': true
  },
  rules: {
    indent: ['error', 2, {
        'SwitchCase': 1
      },
    ],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
        singleQuote: true,
      },
    ],
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'flowtype-errors/show-errors': 2,
    'flowtype-errors/show-warnings': 1,
  },
  plugins: ['prettier', 'flowtype', 'flowtype-errors', 'jest'],
};

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
    'indent': 'off',
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
    'react/require-default-props': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/no-did-mount-set-state': 'off',
    'no-shadow': 'off',
    'jsx-a11y/label-has-for': 'off',
    'react/no-unused-prop-types': 'off',
    'react/no-array-index-key': 'off',
  },
  plugins: ['prettier', 'flowtype', 'flowtype-errors', 'jest'],
};

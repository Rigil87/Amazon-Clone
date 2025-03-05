// eslint.config.js
const {defineFlatConfig} = require('eslint-define-config');
const googleConfig = require('eslint-config-google');

module.exports = defineFlatConfig([
  {
    files: ['**/*.spec.*'],
    languageOptions: {
      ecmaVersion: 2018,
      globals: {
        es6: true,
        node: true,
        mocha: true,
      },
    },
    rules: {
      'no-restricted-globals': ['error', 'name', 'length'],
      'prefer-arrow-callback': 'error',
      'quotes': ['error', 'double', {'allowTemplateLiterals': true}],
    },
  },
  {
    languageOptions: {
      ecmaVersion: 2018,
      globals: {
        es6: true,
        node: true,
      },
    },
    rules: {
      // Include Google config rules
      ...googleConfig.rules,
      // Ensure the deprecated rules are turned off
      'valid-jsdoc': 'off',
      'require-jsdoc': 'off',
    },
  },
]);

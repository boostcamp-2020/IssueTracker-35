module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:jest/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {},
  settings: {
    jest: {
      version: 26,
    },
  },
};

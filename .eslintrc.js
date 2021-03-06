module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'airbnb/hooks', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-use-before-define': ['error', { functions: false, classes: true }],
    'no-undef': 'off',
  },
};

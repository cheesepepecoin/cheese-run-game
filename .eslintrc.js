module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  globals: {
    Phaser: 'readonly',
  },
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
  },
};

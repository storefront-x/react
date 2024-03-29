const isProduction = process.env.NODE_ENV === 'production'

module.exports = exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': [isProduction ? 'error' : 'warn'],
    'no-console': isProduction ? ['error', { allow: ['warn', 'error'] }] : ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': 'off',
    'prettier/prettier': [isProduction ? 'error' : 'warn'],
  },
}

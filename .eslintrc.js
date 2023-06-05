module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'off',
    'no-unreachable': 2,
    'no-constant-condition': 1,
    'object-curly-spacing': [2, 'always'],
    'consistent-this': [2, 'self'],
    'no-empty': 0,
    'no-useless-escape': 0,
    'no-var': 2,
    quotes: [0, 'double'],
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    camelcase: 0,
    'space-before-function-paren': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}

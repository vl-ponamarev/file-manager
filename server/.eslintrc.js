module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    semi: true,
    tabWidth: 2,
    printWidth: 100,
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
    useTabs: false,
    arrowParens: 'always',
    jsxSingleQuote: false,
  },
}

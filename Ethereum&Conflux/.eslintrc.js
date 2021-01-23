module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // "off" or 0 - 关闭(禁用)规则
    // "warn" or 1 - 将规则视为一个警告（并不会导致检查不通过）
    // "error" or 2 - 将规则视为一个错误 (退出码为1，检查不通过)
    'no-console': process.env.NODE_ENV === 'production' ? 1 : 0,
    'no-alert': process.env.NODE_ENV === 'production' ? 1 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,
    'no-extra-semi': process.env.NODE_ENV === 'production' ? 1 : 0,
    indent: process.env.NODE_ENV === 'production' ? 1 : 0,
    'space-before-blocks': 0, //强制在块之前使用一致的空格
    'space-before-function-paren': 0, //强制在 function的左括号之前使用一致的空格
    'key-spacing': 1, //强制在对象字面量的属性中键和值之间使用一致的间距
    'keyword-spacing': 1, //强制在关键字前后使用一致的空格
    'space-in-parens': 1, //强制在圆括号内使用一致的空格
    semi: 1, //要求或禁止使用分号而不是 ASI
    'semi-spacing': 1, //强制分号之前和之后使用一致的空格
    'spaced-comment': 0, //强制在注释中 // 或 /* 使用一致的空格
    'comma-dangle': 1, //对象里最后末尾逗号
    quotes: 1, //单双引号校验
    'no-undef': 0,
    'quote-props': 1, //对象key引号
    'prefer-const': 1, //校验是该用let还是const
    camelcase: 1
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}

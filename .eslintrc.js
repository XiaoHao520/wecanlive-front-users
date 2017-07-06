// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    'import/no-unresolved': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': ["error", {
      allow: ['log', 'warn', 'error']
    }],
    'no-unused-vars': ["error", { "args": "none" }],
    'no-param-reassign': ["error", { "props": false }],
    'newline-per-chained-call': ["error", { "ignoreChainWithDepth": 10 }],
    'max-len': ["error", 120, 4],
    'semi': ["error", "always"],
    'space-before-function-paren': ["error", "never"],
    'comma-dangle': ["error", "always-multiline"],
    'no-throw-literal': ['error'],
    "no-mixed-operators": [
      "error",
      {
        "groups": [
          ["+", "-"],
          ["*", "/", "%", "**"],
          ["&", "|", "^", "~", "<<", ">>", ">>>"],
          ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
          ["&&", "||"],
          ["in", "instanceof"],
        ],
        "allowSamePrecedence": true,
      }
    ]
  }
}

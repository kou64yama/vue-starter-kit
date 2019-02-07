module.exports = {
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2018,
    sourceType: 'module'
  },

  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:vue/recommended'
  ],

  plugins: [
    'prettier',
    'vue'
  ],

  globals: {
    __DEV__: true
  },

  env: {
    browser: true,
    node: true,
    es6: true
  },

  rules: {
    'no-unused-vars': 'off',

    // Recommend not to leave any console.log in your code
    // Use console.error, console.warn and console.info instead
    // https://eslint.org/docs/rules/no-console
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],

    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off'
  }
};

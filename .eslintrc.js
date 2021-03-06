module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    '@vue/airbnb',
    'plugin:vue/essential'
  ],
  rules: {
    'max-len': ["off"],
    'no-console': 'off',
    'linebreak-style': ["off", "windows"],
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e', // for e.returnvalue
        'ctx', // for Koa routing
        'req', // for Express requests
        'request', // for Express requests
        'res', // for Express responses
        'response', // for Express responses
        '$scope', // for Angular 1 scopes
      ]
    }],
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },
  parserOptions: {
    ecmaVersion: 2017
  }
}

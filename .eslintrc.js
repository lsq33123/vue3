module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    'no-undef': 'off',
    '@typescript-eslint/no-var-requires': 0,
  //   "prefer-const": ["warn", {
  //     "destructuring": "any",
  //     "ignoreReadBeforeAssign": false
  // }],
    //https://github.com/typescript-eslint/typescript-eslint/blob/v4.22.1/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": ["off"],
    // '@typescript-eslint/explicit-module-boundary-types': ['warn', {
    //   allowArgumentsExplicitlyTypedAsAny: false,
    //   allowHigherOrderFunctions:false,
    //   allowedNames:['setup']
    // }],
    'endOfLine': 0,
    'max-len': 0
    // 'endOfLine': "auto"
    
  },
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/extensions': ['error', {
      css: 'always',
    }],
    'import/no-unresolved': ['error', {
      css: 'always',
    }],
  },
};

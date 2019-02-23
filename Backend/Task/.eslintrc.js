module.exports = {
  extends: ["airbnb-base", "prettier", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error"
  },
  env: {
    es6: true
  },
  overrides: [
    {
      files: ["**/*.test.js"],
      env: {
        jest: true
      }
    }
  ]
};

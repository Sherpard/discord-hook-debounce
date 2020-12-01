module.exports = {
  singleQuote: true,
  trailingComma: 'es5',
  tabWidth: 2,
  printWidth: 100,
  overrides: [
    {
      files: '*.html',
      options: {
        printWidth: 200,
      },
    },
  ],
};

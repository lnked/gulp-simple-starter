module.exports = {
  './src/**/*.css': ['stylelint --config ./.stylelintrc'],
  './src/**/*.scss': ['stylelint --config ./.stylelintrc --syntax scss'],
  './src/**/*.{js,ts}': ['eslint src/scripts/* --fix', 'prettier --write'],
  './src/**/*.{png,jpeg,jpg,gif,svg}': 'imagemin-lint-staged',
};

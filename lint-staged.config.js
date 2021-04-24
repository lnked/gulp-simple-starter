module.exports = {
  './src/**/*.css': ['stylelint --config ./.stylelintrc'],
  './src/**/*.scss': ['stylelint --config ./.stylelintrc --syntax scss'],
  './src/**/*.{png,jpeg,jpg,gif,svg}': 'imagemin-lint-staged',
  './src/**/*.{js,ts,jsx,tsx}': ['eslint src/scripts/* --fix', 'prettier --write --ignore-unknown'],
};

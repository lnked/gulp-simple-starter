module.exports = {
  "./src/**/*.css": [
    "stylelint --config ./.stylelintrc",
  ],
  "./src/**/*.scss": [
    "stylelint --config ./.stylelintrc --syntax scss",
  ],
  "./src/**/*.js": "eslint src/scripts/* --fix",
  "./src/**/*.{png,jpeg,jpg,gif,svg}": "imagemin-lint-staged",
}

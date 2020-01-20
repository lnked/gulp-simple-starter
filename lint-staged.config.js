module.exports = {
  "./src/**/*.css": [
    "prettier --write",
    "stylelint --fix --config ./.stylelint-format",
  ],
  "./src/**/*.scss": [
    "prettier --write",
    "stylelint --fix --config ./.stylelint-format --syntax scss",
  ],
  "./src/**/*.js": "eslint src/scripts/* --fix",
  "./src/**/*.{png,jpeg,jpg,gif,svg}": "imagemin-lint-staged",
}

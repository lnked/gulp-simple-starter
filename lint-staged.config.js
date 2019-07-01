module.exports = {
  "./src/**/*.css": [
    "prettier --write",
    "stylelint --fix --config ./.stylelint-format",
    "git add"
  ],
  "./src/**/*.scss": [
    "prettier --write",
    "stylelint --fix --config ./.stylelint-format --syntax scss",
    "git add"
  ],
  "./src/**/*.js": ["eslint src/scripts/* --fix", "git add"],
  "./src/**/*.{png,jpeg,jpg,gif,svg}": ["imagemin-lint-staged", "git add"]
}

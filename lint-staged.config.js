module.exports = {
  "./src/**/*.css": "stylelint",
  "./src/**/*.scss": "stylelint --syntax=scss",
  "./src/**/*.js": ["eslint --fix", "git add"],
  "./src/**/*.{png,jpeg,jpg,gif,svg}": ["imagemin-lint-staged", "git add"]
}

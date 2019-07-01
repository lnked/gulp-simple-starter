module.exports = {
  "./src/**/*.css": "stylelint",
  "./src/**/*.scss": "stylelint --syntax=scss",
  "./src/**/*.js": ["eslint src/scripts/* --fix", "git add"],
  "./src/**/*.{png,jpeg,jpg,gif,svg}": ["imagemin-lint-staged", "git add"]
}

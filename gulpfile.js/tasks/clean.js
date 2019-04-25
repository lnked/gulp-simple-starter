const { src } = require('gulp');

const clean = require('gulp-clean');

module.exports = () =>
  src('dist/*', {read: false})
    .pipe(clean())

const { watch, series } = require('gulp');

module.exports = () => {
  watch(['src/img/*.*'], series('images'));
  watch(['src/js/*.js', 'src/js/**/*.js'], series('scripts'));
  watch(['src/*.html', 'src/**/*.html', 'src/**/*.json'], series('templates'));
  watch(['src/scss/*.{sass,scss}', 'src/scss/**/*.{sass,scss}'], series('styles'));
}

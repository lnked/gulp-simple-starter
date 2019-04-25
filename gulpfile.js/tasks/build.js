const { series, parallel } = require('gulp');

module.exports = () =>
  series('clean',
    parallel(
      'templates',
      'scripts',
      'styles',
      'images',
    )
  )

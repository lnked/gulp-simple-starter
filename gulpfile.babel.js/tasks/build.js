import { series, parallel } from 'gulp';

export default () =>
  series('clean',
    parallel(
      'templates',
      'scripts',
      'styles',
      'public',
      'images',
      'fonts',
    )
  )

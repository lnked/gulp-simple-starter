import { series, parallel } from 'gulp';

export default () =>
  series('clean',
    parallel(
      'pug',
      'templates',
      'scripts',
      'styles',
      'public',
      'images',
      'fonts',
    )
  )

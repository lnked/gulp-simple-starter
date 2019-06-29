import { series, parallel } from 'gulp';

export default () =>
  series('clean',
    parallel(
      'pug',
      'templates',
      'images',
      'scripts',
      'styles',
      'public',
      'fonts',
    )
  )

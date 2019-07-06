import { series, parallel } from 'gulp';

export default () =>
  series('clean',
    parallel(
      'clear',
      'pug',
      'templates',
      'images',
      'scripts',
      'styles',
      'public',
      'fonts',
    )
  )

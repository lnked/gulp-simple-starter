import { series, parallel } from 'gulp';

export default () =>
  series(
    ['clean'],
    ['images'],
    parallel(
      'styles',
      'scripts',
      'svgstore',
    ),
    parallel(
      'templates',
      'pug',
      'public',
      'fonts',
    ),
    ['critical'],
  )

import { series, parallel } from 'gulp';

export default () =>
  series(
    ['clean'],
    ['images'],
    parallel(
      'styles',
      'js',
      // 'scripts',
      'svgstore',
    ),
    parallel(
      'templates',
      'public',
      'fonts',
    ),
    ['critical'],
  )

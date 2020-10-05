import { series, parallel } from 'gulp';

export default () =>
  series(
    ['clean'],
    ['images'],
    parallel(
      'styles',
      'esbuild',
      'svgstore',
    ),
    parallel(
      'templates',
      'public',
      'fonts',
    ),
    ['critical'],
  )

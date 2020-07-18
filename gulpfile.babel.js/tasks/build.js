import { series, parallel } from 'gulp'

export default () =>
  series(['clean', 'svgstore'],
    'images',
    parallel(
      'styles',
      'scripts',
    ),
    parallel(
      'templates',
      'pug',
      'public',
      'fonts',
    )
  )

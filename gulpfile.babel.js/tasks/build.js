import { series, parallel } from 'gulp'

export default () =>
  series(['clean', 'svgstore'],
    'images',
    parallel(
      'pug',
      'templates',
      'scripts',
      'styles',
      'public',
      'fonts',
    )
  )

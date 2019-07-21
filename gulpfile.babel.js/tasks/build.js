import { series, parallel } from 'gulp'

export default () =>
  series(['clean', 'svgstore'],
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

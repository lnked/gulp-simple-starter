import browserSync from 'browser-sync'
import { resolve } from 'path'
import { src, dest } from 'gulp'

import { staticPath } from '../env'
import { fontsPath } from '../config'

export const fontsWatchGlob = [
  `${fontsPath}/*.*`,
  `${fontsPath}/**/*.*`,
]

export default () =>
  src(fontsWatchGlob)
    .pipe(dest(resolve(staticPath, 'fonts')))
    .on('end', browserSync.reload)

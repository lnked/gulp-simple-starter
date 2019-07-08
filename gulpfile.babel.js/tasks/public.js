import { src, dest } from 'gulp'
import browserSync from 'browser-sync'

import { outputPath } from '../env'
import { publicPath } from '../config'

export const publicWatchPaths = [
  `${publicPath}/*.*`,
  `${publicPath}/**/*.*`,
]

export default () =>
  src(publicWatchPaths)
    .pipe(dest(outputPath))
    .on('end', browserSync.reload)

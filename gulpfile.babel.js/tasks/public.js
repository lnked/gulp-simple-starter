import { src, dest } from 'gulp'
import browserSync from 'browser-sync'

import { outputPath } from '../env'
import { publicPath, svgStoreFile } from '../config'

export const publicWatchGlob = [
  `${publicPath}/*.*`,
  `${publicPath}/**/*.*`,
  `!${svgStoreFile}`,
]

export default () =>
  src(publicWatchGlob)
    .pipe(dest(outputPath))
    .on('end', browserSync.reload)

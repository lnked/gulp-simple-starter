import { resolve } from 'path'
import { src, dest } from 'gulp'
import newer from 'gulp-newer'
import imagemin from 'gulp-imagemin'
import browserSync from 'browser-sync'

import { staticPath } from '../env'
import { imagesPath, imageminConfig } from '../config'

const imagesDist = resolve(staticPath, 'img')

export const imagesWatchPaths = [
  `${imagesPath}/*`,
  `${imagesPath}/**/*`,
]

export default () =>
  src(imagesWatchPaths)
    .pipe(newer(imagesDist))
    .pipe(imagemin(imageminConfig, {
      verbose: true,
      name: 'images',
    }))
    .pipe(dest(imagesDist))
    .on('end', browserSync.reload)

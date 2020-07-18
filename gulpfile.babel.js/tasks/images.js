import { resolve } from 'path';
import { src, dest } from 'gulp';
import gulpif from 'gulp-if';
import webp from 'gulp-webp';
import newer from 'gulp-newer';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import tinypng from 'gulp-tinypng';

import { staticPath, optimized } from '../env';
import { imagesPath, imageminConfig, environment } from '../config';

const { TINYPNG_API_KEY = '' } = environment;
const imagesOutput = resolve(staticPath, 'img')

export const imagesWatchGlob = [
  `${imagesPath}`,
  `${imagesPath}/**/*.*`,
]

const condition = formats => file => {
  const { history = [] } = file || {};
  const [filename] = history;

  return formats.includes(filename.split('.').pop() || '');
}

export default () =>
  src([
    `${imagesPath}/*.*`,
    `${imagesPath}/**/*.*`,
  ])
    .pipe(newer(imagesOutput))
    .pipe(gulpif(optimized, imagemin(imageminConfig, {
      name: 'images',
      verbose: true,
    })))
    .pipe(dest(imagesOutput))

    .pipe(gulpif((optimized && TINYPNG_API_KEY && condition(['png'])), tinypng(TINYPNG_API_KEY)))

    .pipe(gulpif(condition(['jpg', 'jpeg']), webp({
      ...(optimized && {
        quality: 50,
        method: 6,
      } || {}),
    })))
    .pipe(dest(imagesOutput))
    .on('end', browserSync.reload);

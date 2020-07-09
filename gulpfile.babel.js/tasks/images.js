import { resolve } from 'path';
import { src, dest } from 'gulp';
import gulpif from 'gulp-if';
import webp from 'gulp-webp';
import newer from 'gulp-newer';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import tinypng from 'gulp-tinypng';

import { staticPath } from '../env';
import { imagesPath, imageminConfig, environment } from '../config';

const { TINYPNG_API_KEY = '' } = environment;
const imagesDist = resolve(staticPath, 'img')

export const imagesWatchGlob = [
  `${imagesPath}/*`,
  `${imagesPath}/**/*`,
]

const condition = formats => file => {
  const { history = [] } = file || {};
  const [filename] = history;
  const extension = filename.split('.').pop();

  return formats.includes(extension);
}

export default () =>
  src(imagesWatchGlob)
    .pipe(newer(imagesDist))
    .pipe(imagemin(imageminConfig, {
      verbose: true,
      name: 'images',
    }))
    .pipe(dest(imagesDist))

    .pipe(gulpif((TINYPNG_API_KEY && condition(['png'])), tinypng(TINYPNG_API_KEY)))

    .pipe(gulpif(condition(['jpg', 'jpeg']), webp({
      quality: 50,
      method: 6,
    })))

    .pipe(dest(imagesDist))
    .on('end', browserSync.reload);

import { resolve } from 'path';
import { src, dest } from 'gulp';
import gulpif from 'gulp-if';
import webp from 'gulp-webp';
import newer from 'gulp-newer';
import plumber from 'gulp-plumber';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import tinypng from 'gulp-tinypng';

import { imagesCache, imagesOutput, production } from '../env';
import { imagesPath, imageminConfig, environment } from '../config';

const { TINYPNG_API_KEY = '' } = environment;

export const imagesWatchGlob = [
  `${imagesPath}`,
  `${imagesPath}/**/*.*`,
]

const condition = formats => file => {
  const { history = [] } = file || {};
  const [filename] = history;

  return formats.includes(filename.split('.').pop() || '');
}

const webpConfig = {
  ...(production && {
    quality: 50,
    method: 6,
  } || {}),
};

export default () => {
  src([
    `${imagesPath}/*.*`,
    `${imagesPath}/**/*.*`,
  ])
    .pipe(plumber())
    .pipe(newer(imagesCache))
    .pipe(gulpif(production, imagemin(imageminConfig, { name: 'images', verbose: true })))
    .pipe(gulpif((production && condition(['png']) && TINYPNG_API_KEY), tinypng(TINYPNG_API_KEY)))
    .pipe(dest(imagesCache))
    .pipe(gulpif(condition(['jpg', 'jpeg']), webp(webpConfig)))
    .pipe(plumber.stop())
    .pipe(dest(imagesCache));

  return src([
    `${imagesCache}/*.*`,
    `${imagesCache}/**/*.*`,
  ])
    .pipe(dest(imagesOutput))
    .on('end', browserSync.reload);
}

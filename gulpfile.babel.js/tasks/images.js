import { resolve } from 'path';
import { src, dest } from 'gulp';
import gulpif from 'gulp-if';
import size from 'gulp-size';
import webp from 'gulp-webp';
import newer from 'gulp-newer';
import plumber from 'gulp-plumber';
import imagemin from 'gulp-imagemin';
import tinypng from 'gulp-tinypng';

import { imagesCache, imagesOutput, production } from '../env';
import { imagesPath, imageminConfig, webpConfig, environment } from '../config';
import { reload } from './webserver';

const { TINYPNG_API_KEY = '' } = environment;

export const imagesWatchGlob = [
  `${imagesPath}`,
  `${imagesPath}/**/*.{png,jpe?g,gif,svg,webp}`,
]

const condition = formats => file => {
  const { history = [] } = file || {};
  const [filename] = history;

  return formats.includes(filename.split('.').pop() || '');
}

export const cacheImages = () =>
  src([`${imagesPath}/*.*`, `${imagesPath}/**/*.*`])
    .pipe(plumber())
    .pipe(newer(imagesCache))
    .pipe(gulpif(production, imagemin(imageminConfig, { name: 'images', verbose: true })))
    .pipe(gulpif((production && condition(['png']) && TINYPNG_API_KEY), tinypng(TINYPNG_API_KEY)))
    .pipe(dest(imagesCache))
    .pipe(gulpif(condition(['jpg', 'jpeg']), webp(webpConfig)))
    .pipe(plumber.stop())
    .pipe(dest(imagesCache));

export default () =>
  src([`${imagesCache}/**/*.*`])
    .pipe(dest(imagesOutput))
    .pipe(size({
      title: 'images',
      showFiles: true,
      showTotal: true,
    }))
    .on('end', reload);

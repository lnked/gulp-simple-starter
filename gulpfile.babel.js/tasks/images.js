import { src, dest } from 'gulp';
import gulpIf from 'gulp-if';
import size from 'gulp-size';
import webp from 'gulp-webp';
import newer from 'gulp-newer';
import plumber from 'gulp-plumber';
import imagemin from 'gulp-imagemin';
import tinypng from 'gulp-tinypng';

import { imagesPath, imageminConfig, webpConfig } from '../config';
import { imagesCache, imagesOutput, production, env } from '../env';
import { reload } from './webserver';

const { TINYPNG_API_KEY = '', TINYPNG_ENABLED = false } = env;

export const imagesWatchGlob = [
  `${imagesPath}/*.{png,jpe?g,gif,svg,webp,ogg,mp4,mov}`,
  `${imagesPath}/**/*.{png,jpe?g,gif,svg,webp,ogg,mp4,mov}`,
];

const condition = formats => file => {
  const { history = [] } = file || {};
  const [filename] = history;

  return formats.includes(filename.split('.').pop() || '');
};

export const cacheImages = () =>
  src(imagesWatchGlob)
    .pipe(plumber())
    .pipe(newer(imagesCache, { ctime: true }))
    .pipe(gulpIf(production, imagemin(imageminConfig, { name: 'images', verbose: false })))
    .pipe(gulpIf(TINYPNG_ENABLED && condition(['png']), tinypng(TINYPNG_API_KEY)))
    .pipe(dest(imagesCache))
    .pipe(gulpIf(condition(['jpg', 'jpeg']), webp(webpConfig)))
    .pipe(plumber.stop())
    .pipe(dest(imagesCache));

export default () =>
  src([`${imagesCache}/**/*.*`])
    .pipe(dest(imagesOutput))
    .pipe(
      size({
        title: 'images',
        showFiles: true,
        showTotal: true,
      }),
    )
    .on('end', reload);

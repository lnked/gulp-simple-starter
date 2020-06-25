import { resolve } from 'path';
import { src, dest } from 'gulp';
import gulpif from 'gulp-if';
import webp from 'gulp-webp';
import newer from 'gulp-newer';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';

import { staticPath } from '../env';
import { imagesPath, imageminConfig } from '../config';

const imagesDist = resolve(staticPath, 'img')

export const imagesWatchPaths = [
  `${imagesPath}/*`,
  `${imagesPath}/**/*`,
]

const condition = file => {
  const { history = [] } = file || {};
  const [filename] = history;
  const extension = filename.split('.').pop();

  return ['jpg', 'jpeg'].includes(extension);
}

export default () =>
  src(imagesWatchPaths)
    .pipe(newer(imagesDist))
    .pipe(imagemin(imageminConfig, {
      verbose: true,
      name: 'images',
    }))
    .pipe(dest(imagesDist))
    .pipe(gulpif(condition, webp({
      quality: 50,
      method: 6,
    })))
    .pipe(dest(imagesDist))
    .on('end', browserSync.reload);

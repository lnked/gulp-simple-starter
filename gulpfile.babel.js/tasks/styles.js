import { resolve } from 'path';
import { src, dest } from 'gulp';
import sass from 'gulp-sass';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import cssnano from 'gulp-cssnano';
import postcss from 'gulp-postcss';
import mqpacker from 'css-mqpacker';
import sassGlob from 'gulp-sass-glob';
import browsersync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import sortCSSmq from 'sort-css-media-queries';
import autoprefixer from 'gulp-autoprefixer';

import { staticPath, production, development } from '../env';
import { stylesPath } from '../config';

export const stylesWatchPaths = [
  `${stylesPath}/*.{sass,scss}`,
  `${stylesPath}/**/*.{sass,scss}`,
];

export default () =>
  src([
    ...stylesWatchPaths,
    `!${stylesPath}/_*.*`,
    `!${stylesPath}/**/_*.*`,
  ])
    .pipe(gulpif(development, sourcemaps.init()))
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(postcss([
      mqpacker({
        sort: sortCSSmq,
      })
    ]))
    .pipe(gulpif(production, autoprefixer({
      cascade: false,
    })))
    .pipe(cssnano())
    .pipe(plumber.stop())
    .pipe(gulpif(development, sourcemaps.write('./maps/')))
    .pipe(dest(resolve(staticPath, 'css')))
    .pipe(browsersync.stream());

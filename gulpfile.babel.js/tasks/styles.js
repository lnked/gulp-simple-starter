import { resolve } from 'path';
import { src, dest } from 'gulp';
import sass from 'gulp-sass';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import cssnano from 'cssnano';
import postcss from 'gulp-postcss';
import mqpacker from 'css-mqpacker';
import sassGlob from 'gulp-sass-glob';
import browsersync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import sortCSSmq from 'sort-css-media-queries';
import autoprefixer from 'autoprefixer';

import { staticPath, production, development } from '../env';
import { stylesPath } from '../config';

export const stylesWatchPaths = [
  `${stylesPath}/*.{sass,scss}`,
  `${stylesPath}/**/*.{sass,scss}`,
];

const plugins = [];

plugins.push(
  mqpacker({
    sort: sortCSSmq,
  })
);

if (production) {
  plugins.push(
    autoprefixer({
      cascade: false,
    }),
    cssnano(),
  );
}

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
    .pipe(postcss(plugins))
    .pipe(plumber.stop())
    .pipe(gulpif(development, sourcemaps.write('./maps/')))
    .pipe(dest(resolve(staticPath, 'css')))
    .pipe(browsersync.stream());

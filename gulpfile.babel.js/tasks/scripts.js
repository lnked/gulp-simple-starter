import rev from 'gulp-rev';
import size from 'gulp-size';
import gulpif from 'gulp-if';
import rigger from 'gulp-rigger';
import webpack from 'webpack-stream';
import browserSync from 'browser-sync';
import { resolve } from 'path';
import { src, dest } from 'gulp';

import webpackConfig from '../webpack.config';
import { rootPath, staticPath, production } from '../env';
import { scriptsPath, manifestPath, manifestConfig } from '../config';

export const scriptsWatchGlob = [
  `${scriptsPath}/*.{js,jsx,ts,tsx,mjs}`,
  `${scriptsPath}/_*.{js,jsx,ts,tsx,mjs}`,
  `${scriptsPath}/**/*.{js,jsx,ts,tsx,mjs}`,
  `${scriptsPath}/**/_*.{js,jsx,ts,tsx,mjs}`,
];

export default () =>
  src([
    ...scriptsWatchGlob,
    `!${scriptsPath}/_*.*`,
    `!${scriptsPath}/**/_*.*`,
  ])
    .pipe(rigger())
    .pipe(webpack({
      config: webpackConfig,
    }))

    .pipe(gulpif(production, rev()))

    .pipe(dest(resolve(staticPath, 'js')))

    .pipe(gulpif(production, rev.manifest(manifestPath, manifestConfig)))
    .pipe(gulpif(production, dest(rootPath)))

    .pipe(size({
      gzip: true,
      showFiles: true,
      showTotal: true,
    }))
    .on('end', browserSync.reload);

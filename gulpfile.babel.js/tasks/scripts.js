import size from 'gulp-size';
import rigger from 'gulp-rigger';
import webpack from 'webpack-stream';
import browserSync from 'browser-sync';
import { resolve } from 'path';
import { src, dest } from 'gulp';

import webpackConfig from '../webpack.config';
import { staticPath } from '../env';
import { scriptsPath } from '../config';

export const scriptsWatchPaths = [
  `${scriptsPath}/*.{js,jsx,ts,tsx,mjs}`,
  `${scriptsPath}/**/*.{js,jsx,ts,tsx,mjs}`,
];

export default () =>
  src([
    ...scriptsWatchPaths,
    `!${scriptsPath}/_*.*`,
    `!${scriptsPath}/**/_*.*`,
  ])
    .pipe(rigger())
    .pipe(webpack({
      config: webpackConfig,
    }))
    .pipe(dest(resolve(staticPath, 'js')))
    .pipe(size({
      gzip: true,
      showFiles: true,
      showTotal: true,
    }))
    .on('end', browserSync.reload);

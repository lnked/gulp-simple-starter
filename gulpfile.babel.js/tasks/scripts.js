import webpack from 'webpack-stream';
import browsersync from 'browser-sync';
import { resolve } from 'path';
import { src, dest } from 'gulp';

import webpackConfig from '../webpack.config';
import { staticPath } from '../env';
import { scriptsPath } from '../config';

export const scriptsWatchPaths = [
  `${scriptsPath}/*.js`,
  `${scriptsPath}/**/*.js`,
];

export default () =>
  src([
    ...scriptsWatchPaths,
    `!${scriptsPath}/_*.*`,
    `!${scriptsPath}/**/_*.*`,
  ])
    .pipe(webpack({
      config: webpackConfig,
    }))
    .pipe(dest(resolve(staticPath, 'js')))
    .on('end', browsersync.reload);

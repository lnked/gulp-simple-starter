import rev from 'gulp-rev';
import size from 'gulp-size';
import gulpif from 'gulp-if';
import rigger from 'gulp-rigger';
import webpack from 'webpack-stream';
import { resolve } from 'path';
import { src, dest } from 'gulp';

import webpackConfig from '../webpack.config';
import { rootPath, staticPath, production } from '../env';
import { scriptsPath, manifestPath, manifestConfig } from '../config';
import { reload } from './webserver';

export const scriptsWatchGlob = [
  `${scriptsPath}/**/*.{js,jsx,ts,tsx,mjs}`,
];

export default () =>
  src([ ...scriptsWatchGlob, `!${scriptsPath}/**/_*.*` ])
    .pipe(rigger())
    .pipe(webpack({
      config: webpackConfig,
    }))
    .pipe(gulpif(production, rev()))
    .pipe(dest(resolve(staticPath, 'js')))
    .pipe(gulpif(production, rev.manifest(manifestPath, manifestConfig)))
    .pipe(gulpif(production, dest(rootPath)))
    .pipe(size({
      title: 'scripts',
      gzip: true,
      showFiles: true,
      showTotal: true,
    }))
    .on('end', reload);

import rev from 'gulp-rev';
import size from 'gulp-size';
import gzip from 'gulp-gzip';
import gulpIf from 'gulp-if';
import rigger from 'gulp-rigger';
import webpack from 'webpack-stream';
import replaceTask from 'gulp-replace-task';
import { src, dest } from 'gulp';

import webpackConfig from '../webpack.config';
import { rootPath, staticPathScripts, production } from '../env';
import { scriptsPath, manifestPath, manifestConfig, gzipConfig } from '../config';
import { reload } from './webserver';

import { scriptsWatchGlob, replaceConfig, sizeConfig } from './common.scripts';

export default () =>
  src([...scriptsWatchGlob, `!${scriptsPath}/**/_*.*`])
    .pipe(rigger())
    .pipe(
      webpack({
        config: webpackConfig,
      }),
    )
    .pipe(replaceTask(replaceConfig))
    .pipe(gulpIf(production, rev()))
    .pipe(dest(staticPathScripts))
    .pipe(gulpIf(production, gzip(gzipConfig)))
    .pipe(gulpIf(production, dest(staticPathScripts)))
    .pipe(gulpIf(production, rev.manifest(manifestPath, manifestConfig)))
    .pipe(gulpIf(production, dest(rootPath)))
    .pipe(size(sizeConfig))
    .on('end', reload);

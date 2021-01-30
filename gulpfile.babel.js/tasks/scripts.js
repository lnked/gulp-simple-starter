import { src } from 'gulp';

import size from 'gulp-size';
import rigger from 'gulp-rigger';
import webpack from 'webpack-stream';

import webpackConfig from '../webpack.config';
import { scriptsPath } from '../config';
import { reload } from './webserver';

import { scriptsWatchGlob, sizeConfig, scriptTasks } from './common.scripts';

export default () =>
  src([...scriptsWatchGlob, `!${scriptsPath}/**/_*.*`])
    .pipe(rigger())
    .pipe(webpack({ config: webpackConfig }))
    .pipe(scriptTasks())
    .pipe(size(sizeConfig))
    .on('end', reload);

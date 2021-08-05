// @ts-nocheck
import { src } from 'gulp';
import glob from 'glob';
import size from 'gulp-size';
import newer from 'gulp-newer';
import debug from 'gulp-debug';
import gulpIf from 'gulp-if';
import rigger from 'gulp-rigger';
import webpack from 'webpack-stream';

import { scriptsPath, scriptSizeConfig } from '../config';
import { development, staticPathScripts } from '../env';
import webpackConfig from '../webpack.config';
import { reload } from './webserver';

import { scriptsWatchGlob, scriptTasks } from './common.scripts';

const files = glob.sync(`${scriptsPath}/**/*.{js,jsx,ts,tsx,mjs}`, {
  ignore: [`${scriptsPath}/*.{js,jsx,ts,tsx,mjs}`],
});

export default () =>
  src([...scriptsWatchGlob, `!${scriptsPath}/**/_*.*`])
    .pipe(
      gulpIf(
        development,
        newer({
          extra: files,
          dest: staticPathScripts,
          ext: '.js',
        }),
      ),
    )
    .pipe(rigger())
    .pipe(webpack({ config: webpackConfig }))
    .pipe(scriptTasks())
    .pipe(size(scriptSizeConfig))
    .pipe(debug())
    .on('end', reload);

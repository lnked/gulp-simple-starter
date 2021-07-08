// @ts-nocheck
import { src } from 'gulp';
import glob from 'glob';
import size from 'gulp-size';
import newer from 'gulp-newer';
import rigger from 'gulp-rigger';
import webpack from 'webpack-stream';

import { scriptsPath, scriptSizeConfig } from '../config';
import { staticPathScripts } from '../env';
import webpackConfig from '../webpack.config';
import { reload } from './webserver';

import { scriptsWatchGlob, scriptTasks } from './common.scripts';

const files = glob.sync(`${scriptsPath}/**/*.{js,jsx,ts,tsx,mjs}`, {
  ignore: [`${scriptsPath}/*.{js,jsx,ts,tsx,mjs}`],
});

export default () =>
  src([...scriptsWatchGlob, `!${scriptsPath}/**/_*.*`])
    .pipe(rigger())
    .pipe(webpack({ config: webpackConfig }))
    .pipe(newer({ dest: staticPathScripts, extra: files }))
    .pipe(scriptTasks())
    .pipe(size(scriptSizeConfig))
    .on('end', reload);

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
import commonScripts from './common.scripts';
import webpackConfig from '../webpack.config';
import { reload } from './webserver';

const extensions = '{js,jsx,ts,tsx,mjs}';

const files = glob.sync(`${scriptsPath}/**/*.${extensions}`, {
  ignore: [`${scriptsPath}/*.${extensions}`],
});

export const scriptsWatchGlob = [`${scriptsPath}/*.${extensions}`, `${scriptsPath}/**/*.${extensions}`];

export default () =>
  src([...scriptsWatchGlob, `!${scriptsPath}/**/_*.*`], { nodir: true })
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
    .pipe(commonScripts())
    .pipe(size(scriptSizeConfig))
    .pipe(debug())
    .on('end', reload);

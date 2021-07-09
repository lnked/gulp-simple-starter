import { src } from 'gulp';

import size from 'gulp-size';
import debug from 'gulp-debug';
import rigger from 'gulp-rigger';
import gulpEsBuild from 'gulp-esbuild';

import { scriptsPath, scriptSizeConfig, esBuildConfig } from '../config';
import { reload } from './webserver';

import { scriptsBuildGlob, scriptTasks } from './common.scripts';

export default () =>
  src([...scriptsBuildGlob, `!${scriptsPath}/**/_*.*`])
    .pipe(rigger())
    .pipe(gulpEsBuild(esBuildConfig))
    .pipe(scriptTasks())
    .pipe(size(scriptSizeConfig))
    .pipe(debug())
    .on('end', reload);

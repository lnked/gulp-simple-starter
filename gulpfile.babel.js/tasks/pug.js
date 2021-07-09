import { resolve } from 'path';
import { src, dest } from 'gulp';
import pug from 'gulp-pug';
import pugBem from 'gulp-pugbem';
import debug from 'gulp-debug';
import frontMatter from 'gulp-front-matter';

import { pugConfig, htmlPath } from '../config';
import { outputPath } from '../env';
import { templateTasks } from './common.template';
import { reload } from './webserver';

export default () =>
  src([`${htmlPath}/pages/**/*.pug`, `!${htmlPath}/**/_*.*`])
    .pipe(frontMatter({ property: 'data' }))
    .pipe(pug(pugConfig([pugBem])))
    .pipe(templateTasks()())
    .pipe(dest(resolve(outputPath)))
    .pipe(debug())
    .on('end', reload);

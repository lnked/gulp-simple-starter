import { src, dest } from 'gulp';
import glob from 'glob';
import data from 'gulp-data';
import gulpIf from 'gulp-if';
import newer from 'gulp-newer';
import debug from 'gulp-debug';
import rigger from 'gulp-rigger';
import frontMatter from 'gulp-front-matter';
import nunjucksRender from 'gulp-nunjucks-render';

import { sharedPath, htmlPath, nunjucksRenderConfig } from '../config';
import { development, outputPath } from '../env';
import { getData } from '../get-data';
import { templateTasks } from './common.template';
import { reload } from './webserver';

nunjucksRender.nunjucks.configure({
  watch: development,
  trimBlocks: true,
  autoescape: true,
  lstripBlocks: false,
});

const extensions = 'nunjucks,nj,njk,html,htm,template,tmpl,tpl,json';

const files = glob.sync(`${htmlPath}/**/*.{${extensions}}`, {
  ignore: [`${htmlPath}/pages/**/*`],
});

export const htmlWatchGlob = [`${sharedPath}/**/*.{${extensions}}`, `${htmlPath}/**/*.{${extensions}}`];

export default () =>
  src([`${htmlPath}/pages/**/*.{${extensions}}`, `!${htmlPath}/**/_*.*`])
    .pipe(rigger())
    .pipe(frontMatter({ property: 'data' }))
    .pipe(data(getData))
    .pipe(nunjucksRender(nunjucksRenderConfig))
    .pipe(gulpIf(development, newer({ dest: outputPath, extra: files })))
    .pipe(templateTasks()())
    .pipe(dest(outputPath))
    .pipe(debug())
    .on('end', reload);

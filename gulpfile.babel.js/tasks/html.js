import { src, dest } from 'gulp';
import glob from 'glob';
import newer from 'gulp-newer';
import rigger from 'gulp-rigger';
import frontMatter from 'gulp-front-matter';
import nunjucksRender from 'gulp-nunjucks-render';

import { componentsPath, htmlPath, nunjucksRenderConfig } from '../config';
import { development, outputPath } from '../env';
import { templateTasks } from './common.template';
import { reload } from './webserver';

nunjucksRender.nunjucks.configure({
  watch: development,
  trimBlocks: true,
  lstripBlocks: false,
});

const extensions = 'nunjucks,nj,njk,html,htm,template,tmpl,tpl';

const files = glob.sync(`${htmlPath}/**/*.{${extensions}}`);

export const htmlWatchGlob = [`${componentsPath}/**/*.{${extensions},json}`, `${htmlPath}/**/*.{${extensions},json}`];

export default () =>
  src([`${htmlPath}/pages/**/*.{${extensions}}`, `!${htmlPath}/**/_*.*`])
    .pipe(newer({ dest: outputPath, extra: files }))
    .pipe(rigger())
    .pipe(frontMatter({ property: 'data' }))
    .pipe(nunjucksRender(nunjucksRenderConfig))
    .pipe(templateTasks()())
    .pipe(dest(outputPath))
    .on('end', reload);

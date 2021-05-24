import { src, dest } from 'gulp';
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

export const htmlWatchGlob = [`${componentsPath}/**/*.{pug,html,json}`, `${htmlPath}/**/*.{pug,html,json}`];

export default () =>
  src([`${htmlPath}/pages/**/*.html`, `!${htmlPath}/**/_*.*`])
    .pipe(rigger())
    .pipe(frontMatter({ property: 'data' }))
    .pipe(nunjucksRender(nunjucksRenderConfig))
    .pipe(templateTasks()())
    .pipe(dest(outputPath))
    .on('end', reload);

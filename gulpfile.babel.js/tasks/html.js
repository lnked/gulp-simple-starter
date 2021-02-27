import { resolve } from 'path';
import { src, dest } from 'gulp';
import { readFileSync } from 'fs';
import rigger from 'gulp-rigger';
import gulpIf from 'gulp-if';
import replace from 'gulp-replace';
import htmlmin from 'gulp-htmlmin';
import beautify from 'gulp-beautify';
import frontMatter from 'gulp-front-matter';
import nunjucksRender from 'gulp-nunjucks-render';
import revRewrite from 'gulp-rev-rewrite';

import { optimized, outputPath, production, development } from '../env';
import {
  componentsPath,
  manifestPath,
  checkManifestPath,
  htmlPath,
  htmlFormatConfig,
  htmlminConfig,
  nunjucksRenderConfig,
} from '../config';
import { reload } from './webserver';

nunjucksRender.nunjucks.configure({
  watch: development,
  trimBlocks: true,
  lstripBlocks: false,
});

export const htmlWatchGlob = [`${componentsPath}/**/*.{html,json}`, `${htmlPath}/**/*.{html,json}`];

export default () => {
  checkManifestPath();
  const manifest = readFileSync(manifestPath);

  return src([`${htmlPath}/pages/**/*.html`, `!${htmlPath}/**/_*.*`])
    .pipe(rigger())
    .pipe(frontMatter({ property: 'data' }))
    .pipe(nunjucksRender(nunjucksRenderConfig))
    .pipe(gulpIf(optimized, htmlmin(htmlminConfig)))
    .pipe(gulpIf(optimized || production, replace('href=/static/ ', 'href=/')))
    .pipe(gulpIf(!optimized, beautify.html(htmlFormatConfig)))
    .pipe(gulpIf(optimized || production, revRewrite({ manifest })))
    .pipe(dest(resolve(outputPath)))
    .on('end', reload);
};

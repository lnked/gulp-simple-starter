import fs from 'fs';
import { resolve } from 'path';
import { src, dest } from 'gulp';
import rigger from 'gulp-rigger';
import gulpif from 'gulp-if';
import replace from 'gulp-replace';
import htmlmin from 'gulp-htmlmin';
import beautify from 'gulp-beautify';
import browserSync from 'browser-sync';
import frontMatter from 'gulp-front-matter';
import nunjucksRender from 'gulp-nunjucks-render';
import revRewrite from 'gulp-rev-rewrite';

import { optimized, outputPath, production, development } from '../env';
import { manifestPath, htmlPath, htmlFormatConfig, htmlminConfig, nunjucksRenderConfig } from '../config';

nunjucksRender.nunjucks.configure({
  watch: development,
  trimBlocks: true,
  lstripBlocks: false,
});

export const htmlWatchGlob = [
  `${htmlPath}/*.html`,
  `${htmlPath}/*.json`,
  `${htmlPath}/**/*.html`,
  `${htmlPath}/**/*.json`,
];

export default () => {
  const manifest = src(manifestPath, { allowEmpty: true });

  return src([`${htmlPath}/pages/**/*.html`, `!${htmlPath}/**/_*.*`])
    .pipe(rigger())
    .pipe(frontMatter({ property: 'data' }))
    .pipe(nunjucksRender(nunjucksRenderConfig))
    .pipe(gulpif(optimized, htmlmin(htmlminConfig)))
    .pipe(gulpif((optimized || production), replace('href=/static/ ', 'href=/static/')))
    .pipe(gulpif(!optimized, beautify.html(htmlFormatConfig)))
    .pipe(gulpif((optimized || production), revRewrite({ manifest })))
    .pipe(dest(resolve(outputPath)))
    .on('end', browserSync.reload)
}

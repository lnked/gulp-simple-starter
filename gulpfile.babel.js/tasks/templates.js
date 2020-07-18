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
import { publicPath, templatesPath, manifestPath, htmlFormatConfig, htmlminConfig } from '../config';

import { getData } from '../get-data';

nunjucksRender.nunjucks.configure({
  watch: development,
  trimBlocks: true,
  lstripBlocks: false,
});

export const templatesWatchGlob = [
  `${templatesPath}/*.html`,
  `${templatesPath}/_*.html`,
  `${templatesPath}/**/*.html`,
  `${templatesPath}/**/_*.html`,
  `${templatesPath}/**/*.json`,
  `${templatesPath}/**/_*.json`,
]

export default () => {
  const manifest = src(manifestPath);

  return src([
    `${templatesPath}/pages/*.html`,
    `${templatesPath}/pages/**/*.html`,
    `!${templatesPath}/_*.*`,
    `!${templatesPath}/**/_*.*`,
  ])
    .pipe(rigger())
    .pipe(frontMatter({ property: 'data' }))
    .pipe(nunjucksRender({
      data: getData(),
      path: [
        publicPath,
        templatesPath,
      ],
      envOptions: {
        watch: development,
      },
    }))
    .pipe(gulpif(optimized, htmlmin(htmlminConfig)))
    .pipe(gulpif(optimized, replace('href=/static/ ', 'href=/static/')))
    .pipe(gulpif(!optimized, beautify.html(htmlFormatConfig)))

    .pipe(gulpif(production, revRewrite({ manifest })))

    .pipe(dest(resolve(outputPath)))
    .on('end', browserSync.reload)
}

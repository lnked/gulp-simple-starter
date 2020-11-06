import { resolve } from 'path';
import { src, dest } from 'gulp';
import { readFileSync } from 'fs';
import pug from 'gulp-pug';
import gulpIf from 'gulp-if';
import pugbem from 'gulp-pugbem';
import htmlmin from 'gulp-htmlmin';
import replace from 'gulp-replace';
import beautify from 'gulp-beautify';
import frontMatter from 'gulp-front-matter';
import revRewrite from 'gulp-rev-rewrite';

import { optimized, outputPath, production } from '../env';
import { manifestPath, checkManifestPath, pugConfig, htmlPath, htmlFormatConfig, htmlminConfig } from '../config';
import { reload } from './webserver';

export const pugWatchGlob = [`${htmlPath}/**/*.{pug,json}`];

export default () => {
  checkManifestPath();
  const manifest = readFileSync(manifestPath);

  return src([`${htmlPath}/pages/**/*.pug`, `!${htmlPath}/**/_*.*`])
    .pipe(frontMatter({ property: 'data' }))
    .pipe(pug(pugConfig([pugbem])))
    .pipe(gulpIf(optimized, htmlmin(htmlminConfig)))
    .pipe(gulpIf(optimized, replace('href=/static/ ', 'href=/static/')))
    .pipe(gulpIf(!optimized, beautify.html(htmlFormatConfig)))
    .pipe(gulpIf(optimized || production, revRewrite({ manifest })))
    .pipe(dest(resolve(outputPath)))
    .on('end', reload);
};

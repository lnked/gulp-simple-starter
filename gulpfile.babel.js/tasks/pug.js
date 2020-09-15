import { resolve } from 'path';
import { src, dest } from 'gulp';
import pug from 'gulp-pug';
import gulpIf from 'gulp-if';
import pugbem from 'gulp-pugbem';
import htmlmin from 'gulp-htmlmin';
import replace from 'gulp-replace';
import beautify from 'gulp-beautify';
import frontMatter from 'gulp-front-matter';
import revRewrite from 'gulp-rev-rewrite';

import { optimized, outputPath, production } from '../env'
import { manifestPath, pugConfig, htmlPath, htmlFormatConfig, htmlminConfig } from '../config'
import { reload } from './webserver';

export const pugWatchGlob = [
  `${htmlPath}/**/*.{pug,json}`,
]

export default () => {
  const manifest = src(manifestPath, { allowEmpty: true });

  return src([`${htmlPath}/pages/**/*.pug`, `!${htmlPath}/**/_*.*`])
    .pipe(frontMatter({ property: 'data' }))
    .pipe(pug(pugConfig([pugbem])))
    .pipe(gulpIf(optimized, htmlmin(htmlminConfig)))
    .pipe(gulpIf(optimized, replace('href=/static/ ', 'href=/static/')))
    .pipe(gulpIf(!optimized, beautify.html(htmlFormatConfig)))

    .pipe(gulpIf(production, revRewrite({ manifest })))

    .pipe(dest(resolve(outputPath)))
    .on('end', reload)
}

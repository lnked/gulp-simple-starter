import { resolve } from 'path';
import { src, dest } from 'gulp';
import pug from 'gulp-pug';
import gulpif from 'gulp-if';
import pugbem from 'gulp-pugbem';
import htmlmin from 'gulp-htmlmin';
import replace from 'gulp-replace';
import beautify from 'gulp-beautify';
import browserSync from 'browser-sync';
import frontMatter from 'gulp-front-matter';

import { optimized, outputPath } from '../env'
import { publicPath, templatesPath, htmlFormatConfig, htmlminConfig } from '../config'

import { getData } from '../get-data'

export const pugWatchGlob = [
  `${templatesPath}/*.pug`,
  `${templatesPath}/pages/*.pug`,
  `${templatesPath}/**/*.pug`,
  `${templatesPath}/**/*.json`,
]

export default () =>
  src([
    `${templatesPath}/pages/*.pug`,
    `${templatesPath}/pages/**/*.pug`,
    `!${templatesPath}/_*.*`,
    `!${templatesPath}/**/_*.*`,
  ])
    .pipe(frontMatter({ property: 'data' }))
    .pipe(pug({
      data: getData(),
      basedir: [
        publicPath,
        templatesPath,
      ],
      plugins: [pugbem],
      verbose: false,
      pretty: true,
      debug: false,
    }))
    .pipe(gulpif(optimized, htmlmin(htmlminConfig)))
    .pipe(gulpif(optimized, replace('href=/static/ ', 'href=/static/')))
    .pipe(gulpif(!optimized, beautify.html(htmlFormatConfig)))
    .pipe(dest(resolve(outputPath)))
    .on('end', browserSync.reload)

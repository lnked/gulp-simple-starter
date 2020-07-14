import fs from 'fs'
import { resolve } from 'path'
import { src, dest } from 'gulp'
import rigger from 'gulp-rigger'
import beautify from 'gulp-beautify'
import browserSync from 'browser-sync'
import frontMatter from 'gulp-front-matter'
import nunjucksRender from 'gulp-nunjucks-render'

import { outputPath, development } from '../env'
import { publicPath, templatesPath, htmlFormatConfig } from '../config'

import { getData } from '../get-data'

nunjucksRender.nunjucks.configure({
  watch: development,
  trimBlocks: true,
  lstripBlocks: false,
})

export const templatesWatchGlob = [
  `${templatesPath}/*.html`,
  `${templatesPath}/_*.html`,
  `${templatesPath}/**/*.html`,
  `${templatesPath}/**/_*.html`,
  `${templatesPath}/**/*.json`,
  `${templatesPath}/**/_*.json`,
]

export default () =>
  src([
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
    .pipe(beautify.html(htmlFormatConfig))
    .pipe(dest(resolve(outputPath)))
    .on('end', browserSync.reload)

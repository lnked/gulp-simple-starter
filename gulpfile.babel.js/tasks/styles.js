import { resolve } from 'path';
import { src, dest } from 'gulp';
import rev from 'gulp-rev';
import sass from 'gulp-sass';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import cssnano from 'cssnano';
import postcss from 'gulp-postcss';
import mqpacker from 'css-mqpacker';
import sassGlob from 'gulp-sass-glob';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import sortCSSmq from 'sort-css-media-queries';
import autoprefixer from 'autoprefixer';
import atImport from 'postcss-import';
import uncss from'postcss-uncss';
import animation from 'postcss-animation';
import reporter from 'postcss-reporter';
import position from 'postcss-position';
import immutableCss from 'immutable-css';
import modifyCssUrls from 'gulp-modify-css-urls';
import postcssFixes from 'postcss-fixes';
import postcssShortSpacing from 'postcss-short-spacing';

import { isUncss, rootPath, staticPath, outputFolder, nodeModulesPath, production, development } from '../env';
import { stylesPath, manifestPath, manifestConfig } from '../config';

const plugins = []

plugins.push(
  atImport(),
  position(),
  postcssFixes({
    preset: 'safe'
  }),
  mqpacker({
    sort: sortCSSmq,
  }),
  animation(),
  immutableCss({
    verbose: false,
  }),
  postcssShortSpacing(),
)

if (isUncss) {
  plugins.push(
    uncss({
      html: [`${outputFolder}/**/*.html`, `${outputFolder}/*.html`],
      ignore: [
        '.fade',
        '.active',
        '.disabled',
        '.visible',
        '.hidden',
      ]
    })
  )
}

if (production) {
  plugins.push(
    autoprefixer({
      cascade: false,
    }),
    cssnano(),
  )
}

plugins.push(
  reporter({
    clearMessages: true,
    throwError: false,
  })
)

export const stylesWatchGlob = [
  `${stylesPath}/*.{sass,scss,css}`,
  `${stylesPath}/_*.{sass,scss,css}`,
  `${stylesPath}/**/*.{sass,scss,css}`,
  `${stylesPath}/**/_*.{sass,scss,css}`,
];

export default () =>
  src([
    ...stylesWatchGlob,
    `!${stylesPath}/_*.*`,
    `!${stylesPath}/**/_*.*`,
  ])
    .pipe(gulpif(development, sourcemaps.init()))
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass({
      includePaths: [nodeModulesPath],
    }))
    .pipe(modifyCssUrls({
      modify(url) {
        if (url && /static\//.test(url)) {
          url = url.replace('static/', '')
        }

        if (url && /images\//.test(url)) {
          url = url.replace('images/', 'img/')
        }

        url = url.replace(/^(\.\/|\.\.\/)|\/$/g, '').replace(/^\/|\/$/g, '')

        return url
      },
      prepend: '../',
      append: '',
    }))
    .pipe(postcss(plugins))
    .pipe(plumber.stop())
    .pipe(gulpif(development, sourcemaps.write('./')))

    .pipe(gulpif(production, rev()))

    .pipe(dest(resolve(staticPath, 'css')))

    .pipe(gulpif(production, rev.manifest(manifestPath, manifestConfig)))
    .pipe(gulpif(production, dest(rootPath)))

    .pipe(browserSync.stream())

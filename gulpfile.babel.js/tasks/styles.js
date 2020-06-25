import { resolve } from 'path';
import { src, dest } from 'gulp';
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
import postcssFixes from 'postcss-fixes';
import animation from 'postcss-animation';
import reporter from 'postcss-reporter';
import immutableCss from 'immutable-css';
import modifyCssUrls from 'gulp-modify-css-urls';

import { isUncss, staticPath, nodeModulesPath, production, development } from '../env';
import { stylesPath } from '../config';

const plugins = []

plugins.push(
  atImport(),
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
)

if (production) {
  plugins.push(
    autoprefixer({
      cascade: false,
    }),
    cssnano(),
  )
}

if (isUncss) {
  plugins.push(
    uncss({
      html: ['dist/**/*.html', 'dist/*.html'],
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

plugins.push(
  reporter({
    clearMessages: true,
    throwError: false,
  })
)

export const stylesWatchPaths = [
  `${stylesPath}/*.{css,sass,scss}`,
  `${stylesPath}/**/*.{css,sass,scss}`,
]

export default () =>
  src([
    ...stylesWatchPaths,
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
    .pipe(dest(resolve(staticPath, 'css')))
    .pipe(browserSync.stream())

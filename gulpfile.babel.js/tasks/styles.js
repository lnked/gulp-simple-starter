import { resolve } from 'path';
import { src, dest } from 'gulp';
import rev from 'gulp-rev';
import size from 'gulp-size';
import sass from 'gulp-sass';
import gulpIf from 'gulp-if';
import plumber from 'gulp-plumber';
import cssnano from 'cssnano';
import postcss from 'gulp-postcss';
import MQPacker from 'css-mqpacker';
import sassGlob from 'gulp-sass-glob';
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
import postcss100vhFix from 'postcss-100vh-fix';
import pseudoelements from 'postcss-pseudoelements';
import replaceTask from 'gulp-replace-task';

import { isUncss, rootPath, staticPath, styleFolder, outputFolder, nodeModulesPath, production, development } from '../env';
import { stylesPath, manifestPath, manifestConfig } from '../config';
import { stream } from './webserver';

const plugins = []

plugins.push(
  atImport(),
  position(),
  postcssFixes({
    preset: 'safe'
  }),
  MQPacker({
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
      html: [`${outputFolder}/**/*.html`],
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
    pseudoelements({
      single: true,
      selectors: [
        'hover',
        'focus',
        'active',
        'after',
        'ms-expand',
        'not',
        'first-child',
        'last-child'
      ],
    }),
    pseudoelements({
      single: false,
      selectors: ['before', 'after', 'first-letter', 'first-line'],
    }),
    postcss100vhFix(),
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
  `${stylesPath}/**/*.s?(a|c)?ss`,
];

export default () =>
  src([ ...stylesWatchGlob, `!${stylesPath}/**/_*.*` ])
    .pipe(gulpIf(development, sourcemaps.init()))
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
    .pipe(replaceTask({
      patterns: [
        {
          match: 'timestamp',
          replacement: new Date().getTime(),
        },
      ],
    }))
    .pipe(gulpIf(production, rev()))
    .pipe(gulpIf(development, sourcemaps.write('./')))
    .pipe(dest(resolve(staticPath, styleFolder)))
    .pipe(gulpIf(production, rev.manifest(manifestPath, manifestConfig)))
    .pipe(gulpIf(production, dest(rootPath)))
    .pipe(size({
      title: 'styles',
      showFiles: true,
      showTotal: true,
    }))
    .pipe(stream())

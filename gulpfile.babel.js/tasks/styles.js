import { src, dest } from 'gulp';
import rev from 'gulp-rev-all';
import size from 'gulp-size';
import sass from 'gulp-sass';
import gulpIf from 'gulp-if';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import purgecss from 'gulp-purgecss';
import sassGlob from 'gulp-sass-glob';
import sourcemaps from 'gulp-sourcemaps';
import modifyCssUrls from 'gulp-modify-css-urls';

import { rootPath, staticPathStyles, nodeModulesPath, production, env } from '../env';
import { stylesPath, revOptions, purgeCSSConfig } from '../config';
import { postCSSCallback } from '../postcss.callback';
import { stream } from './webserver';

export const stylesWatchGlob = [`${stylesPath}/**/*.s?(a|c)?ss`];

const {
  PURGE_CSS = false,
  SOURCEMAPS_ENABLED = false,
  // REV_NAME_ENABLED = false,
} = env;

export default () =>
  src([...stylesWatchGlob, `!${stylesPath}/**/_*.*`])
    .pipe(gulpIf(SOURCEMAPS_ENABLED, sourcemaps.init()))
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(
      sass({
        includePaths: [stylesPath, nodeModulesPath],
      }),
    )
    .pipe(
      modifyCssUrls({
        modify(url) {
          if (url && /static\//.test(url)) {
            url = url.replace('static/', '');
          }

          if (url && /images\//.test(url)) {
            url = url.replace('images/', 'img/');
          }

          url = url.replace(/^(\.\/|\.\.\/)|\/$/g, '').replace(/^\/|\/$/g, '');

          return url;
        },
        prepend: '../',
        append: '',
      }),
    )
    .pipe(
      gulpIf(
        PURGE_CSS,
        purgecss({
          content: purgeCSSConfig.templates,
          safelist: purgeCSSConfig.safelist,
        }),
      ),
    )
    .pipe(postcss(postCSSCallback))
    // .pipe(gulpIf(REV_NAME_ENABLED, rev.revision(revOptions)))
    .pipe(gulpIf(SOURCEMAPS_ENABLED, sourcemaps.write('./')))
    .pipe(dest(staticPathStyles))
    // .pipe(gulpIf(REV_NAME_ENABLED, rev.manifestFile()))
    // .pipe(gulpIf(REV_NAME_ENABLED, dest(rootPath)))
    .pipe(plumber.stop())
    .pipe(
      size({
        title: 'styles',
        showFiles: true,
        showTotal: true,
      }),
    )
    .pipe(stream());

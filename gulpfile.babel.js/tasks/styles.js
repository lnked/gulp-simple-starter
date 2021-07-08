import { src, dest } from 'gulp';
import glob from 'glob';
import size from 'gulp-size';
import gulpSass from 'gulp-sass';
import nodeSass from 'sass';
import rev from 'gulp-rev';
import gulpIf from 'gulp-if';
import debug from 'gulp-debug';
import newer from 'gulp-newer';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import purgecss from 'gulp-purgecss';
import sassGlob from 'gulp-sass-glob';
import sourcemaps from 'gulp-sourcemaps';
import modifyCssUrls from 'gulp-modify-css-urls';

import { staticPathStyles, nodeModulesPath, rootPath, env } from '../env';
import { stylesPath, sharedPath, manifestPath, purgeCSSConfig, revOptions } from '../config';
import { postCSSCallback } from '../postcss.callback';
import { stream } from './webserver';

export const stylesWatchGlob = [`${stylesPath}/**/*.s?(a|c)?ss`, `${sharedPath}/**/*.s?(a|c)?ss`];

const { PURGE_CSS = false, SOURCEMAPS_ENABLED = false, REV_NAME_ENABLED = false } = env;

const sass = gulpSass(nodeSass);
const files = glob.sync(`${stylesPath}/**/*.s?(a|c)?ss`, {
  ignore: [`${stylesPath}/*`],
});

export default () =>
  src([`${stylesPath}/**/*.s?(a|c)?ss`, `!${stylesPath}/**/_*.*`, `!${sharedPath}/**/*.*`])
    .pipe(newer({ dest: staticPathStyles, extra: files }))
    .pipe(gulpIf(SOURCEMAPS_ENABLED, sourcemaps.init()))
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(
      sass({
        includePaths: [stylesPath, sharedPath, nodeModulesPath],
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
    .pipe(gulpIf(REV_NAME_ENABLED, rev()))
    .pipe(gulpIf(SOURCEMAPS_ENABLED, sourcemaps.write('./')))
    .pipe(dest(staticPathStyles))
    .pipe(gulpIf(REV_NAME_ENABLED, rev.manifest(manifestPath, revOptions)))
    .pipe(gulpIf(REV_NAME_ENABLED, dest(rootPath)))
    .pipe(plumber.stop())
    .pipe(
      size({
        title: 'styles',
        showFiles: true,
        showTotal: true,
      }),
    )
    .pipe(debug())
    .pipe(stream());

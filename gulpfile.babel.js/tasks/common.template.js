import { readFileSync } from 'fs';
import gulpIf from 'gulp-if';
import lazypipe from 'lazypipe';
import htmlmin from 'gulp-htmlmin';
import replace from 'gulp-replace';
import beautify from 'gulp-beautify';
import rewrite from 'gulp-rev-rewrite';

import { manifestPath, checkManifestPath, htmlFormatConfig, htmlminConfig } from '../config';
import { env } from '../env';

const replaceImagePath = true;
const { MINIFY_HTML = false, REV_NAME_ENABLED = false } = env;

export const templateTasks = () => {
  checkManifestPath();
  const manifest = readFileSync(manifestPath);

  return lazypipe()
    .pipe(gulpIf, MINIFY_HTML, htmlmin(htmlminConfig))
    .pipe(gulpIf, MINIFY_HTML, replace('href=static/ ', 'href=/static/'))
    .pipe(
      gulpIf,
      replaceImagePath,
      replace(/src="([^\\\"]+)"/gim, (match, src) => {
        if (/src="(.*?)\.(png|jpe?g|gif|svg|webp)"/gim.test(match)) {
          return `src="/static/img/${src.replace(/((\/)?static(\/)?)?(\/)?(img|images)(\/)?/im, '')}"`;
        }
        return match;
      }),
    )
    .pipe(gulpIf, !MINIFY_HTML, beautify.html(htmlFormatConfig))
    .pipe(gulpIf, REV_NAME_ENABLED, rewrite({ manifest }));
};

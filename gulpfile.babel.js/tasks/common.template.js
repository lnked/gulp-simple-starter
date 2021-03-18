import { readFileSync } from 'fs';
import gulpIf from 'gulp-if';
import lazypipe from 'lazypipe';
import htmlmin from 'gulp-htmlmin';
import replace from 'gulp-replace';
import beautify from 'gulp-beautify';
import revRewrite from 'gulp-rev-rewrite';

import { manifestPath, checkManifestPath, htmlFormatConfig, htmlminConfig } from '../config';
import { production, env } from '../env';

const { GZIP_ENABLED = false, MINIFY_HTML = false } = env;

export const templateTasks = () => {
  checkManifestPath();
  const manifest = readFileSync(manifestPath);

  return lazypipe()
    .pipe(gulpIf, MINIFY_HTML, htmlmin(htmlminConfig))
    .pipe(gulpIf, MINIFY_HTML, replace('href=/static/ ', 'href=/static/'))
    .pipe(gulpIf, !MINIFY_HTML, beautify.html(htmlFormatConfig))
    .pipe(gulpIf, production, revRewrite({ manifest: JSON.stringify(JSON.parse(manifest)) }))
    .pipe(gulpIf, GZIP_ENABLED, replace('.js.gz', '.js'));
};

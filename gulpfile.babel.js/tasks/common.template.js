import { readFileSync } from 'fs';
import gulpIf from 'gulp-if';
import lazypipe from 'lazypipe';
import htmlmin from 'gulp-htmlmin';
import replace from 'gulp-replace';
import beautify from 'gulp-beautify';
import rewrite from 'gulp-rev-rewrite';

import { manifestPath, checkManifestPath, htmlFormatConfig, htmlminConfig } from '../config';
import { env } from '../env';

const {
  MINIFY_HTML = false,
  REV_NAME_ENABLED = false,
} = env;

export const templateTasks = () => {
  checkManifestPath();
  const manifest = readFileSync(manifestPath);

  return (
    lazypipe()
      .pipe(gulpIf, MINIFY_HTML, htmlmin(htmlminConfig))
      .pipe(gulpIf, MINIFY_HTML, replace('href=/static/ ', 'href=/static/'))
      .pipe(gulpIf, !MINIFY_HTML, beautify.html(htmlFormatConfig))
      .pipe(gulpIf, REV_NAME_ENABLED, rewrite({ manifest }))
  );
};

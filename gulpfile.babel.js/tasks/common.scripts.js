import { dest } from 'gulp';
import gzip from 'gulp-gzip';
import gulpIf from 'gulp-if';
import lazypipe from 'lazypipe';
import rev from 'gulp-rev-all';

import { scriptsPath, revOptions, gzipConfig } from '../config';
import { rootPath, staticPathScripts, env } from '../env';

export const scriptsBuildGlob = [`${scriptsPath}/*.{js,jsx,ts,tsx,mjs}`];
export const scriptsWatchGlob = [...scriptsBuildGlob, `${scriptsPath}/**/*.{js,jsx,ts,tsx,mjs}`];

const { GZIP_ENABLED = false, REV_NAME_ENABLED = false } = env;

export const scriptTasks = lazypipe()
  .pipe(gulpIf, REV_NAME_ENABLED, rev.revision(revOptions))
  .pipe(dest, staticPathScripts)
  .pipe(gulpIf, GZIP_ENABLED, gzip(gzipConfig))
  .pipe(gulpIf, GZIP_ENABLED, dest(staticPathScripts))
  .pipe(gulpIf, REV_NAME_ENABLED, rev.manifestFile())
  .pipe(gulpIf, REV_NAME_ENABLED, dest(rootPath));

import { dest } from 'gulp';
import rev from 'gulp-rev';
import gzip from 'gulp-gzip';
import gulpIf from 'gulp-if';
import debug from 'gulp-debug';
import lazypipe from 'lazypipe';

import { scriptsPath, manifestPath, gzipConfig, revOptions } from '../config';
import { staticPathScripts, rootPath, env } from '../env';

export const scriptsBuildGlob = [`${scriptsPath}/*.{js,jsx,ts,tsx,mjs}`];
export const scriptsWatchGlob = [...scriptsBuildGlob, `${scriptsPath}/**/*.{js,jsx,ts,tsx,mjs}`];

const { GZIP_ENABLED = false, REV_NAME_ENABLED = false } = env;

export const scriptTasks = lazypipe()
  .pipe(gulpIf, REV_NAME_ENABLED, rev())
  .pipe(dest, staticPathScripts)

  .pipe(gulpIf, GZIP_ENABLED, gzip(gzipConfig))
  .pipe(gulpIf, GZIP_ENABLED, dest(staticPathScripts))

  .pipe(gulpIf, REV_NAME_ENABLED, rev.manifest(manifestPath, revOptions))
  .pipe(gulpIf, REV_NAME_ENABLED, dest(rootPath))
  .pipe(debug);

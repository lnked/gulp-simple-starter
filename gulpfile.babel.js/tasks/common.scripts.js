import { resolve } from 'path';
import { dest } from 'gulp';
import gzip from 'gulp-gzip';
import gulpIf from 'gulp-if';
import lazypipe from 'lazypipe';
import rev from 'gulp-rev-all';

import revision from '../gulp-assets-revision';

import { scriptsPath, revOptions, gzipConfig } from '../config';
import { cacheDirectory, rootPath, staticPathScripts, env } from '../env';

export const scriptsBuildGlob = [`${scriptsPath}/*.{js,jsx,ts,tsx,mjs}`];
export const scriptsWatchGlob = [...scriptsBuildGlob, `${scriptsPath}/**/*.{js,jsx,ts,tsx,mjs}`];

const { GZIP_ENABLED = false, REV_NAME_ENABLED = false } = env;

console.log({ rev: resolve(cacheDirectory, 'rev-version.json') });

export const scriptTasks = lazypipe()
  // .pipe(gulpIf, REV_NAME_ENABLED, rev.revision(revOptions))

  .pipe(gulpIf, REV_NAME_ENABLED, revision(revOptions))

  .pipe(dest, staticPathScripts)
  .pipe(gulpIf, GZIP_ENABLED, gzip(gzipConfig))
  .pipe(gulpIf, GZIP_ENABLED, dest(staticPathScripts))

  // .pipe(gulpIf, REV_NAME_ENABLED, rev.manifestFile())

  // .pipe(gulpIf, REV_NAME_ENABLED, revision.manifest({
  //   path: resolve(cacheDirectory, 'rev-version.json'),
  // }))

  // .pipe(gulpIf, REV_NAME_ENABLED, dest(rootPath));

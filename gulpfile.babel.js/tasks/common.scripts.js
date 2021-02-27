import { dest } from 'gulp';
import rev from 'gulp-rev';
import gzip from 'gulp-gzip';
import gulpIf from 'gulp-if';
import lazypipe from 'lazypipe';

import { scriptsPath, manifestPath, manifestConfig, gzipConfig } from '../config';
import { rootPath, staticPathScripts, production } from '../env';

export const scriptsBuildGlob = [`${scriptsPath}/*.{js,jsx,ts,tsx,mjs}`];

export const scriptsWatchGlob = [...scriptsBuildGlob, `${scriptsPath}/**/*.{js,jsx,ts,tsx,mjs}`];

export const sizeConfig = {
  title: 'scripts',
  gzip: true,
  showFiles: true,
  showTotal: true,
};

export const scriptTasks = lazypipe()
  .pipe(gulpIf, production, rev())
  .pipe(dest, staticPathScripts)
  .pipe(gulpIf, production, gzip(gzipConfig))
  .pipe(gulpIf, production, dest(staticPathScripts))
  .pipe(gulpIf, production, rev.manifest(manifestPath, manifestConfig))
  .pipe(gulpIf, production, dest(rootPath));

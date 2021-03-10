import { dest } from 'gulp';
import rev from 'gulp-rev';
import gzip from 'gulp-gzip';
import gulpIf from 'gulp-if';
import rename from 'gulp-rename';
import lazypipe from 'lazypipe';
import { customAlphabet } from 'nanoid';

import { scriptsPath, manifestPath, manifestConfig, gzipConfig } from '../config';
import { rootPath, staticPathScripts, production } from '../env';
import through from 'through2';

export const scriptsBuildGlob = [`${scriptsPath}/*.{js,jsx,ts,tsx,mjs}`];

export const scriptsWatchGlob = [...scriptsBuildGlob, `${scriptsPath}/**/*.{js,jsx,ts,tsx,mjs}`];

export const sizeConfig = {
  title: 'scripts',
  gzip: true,
  showFiles: true,
  showTotal: true,
};

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 7);

const renameCallback = path => {
  if (path.extname === '.map') {
    path.basename = path.basename.replace('.js', `-${nanoid()}.js`);
  } else {
    path.basename += `-${nanoid()}`;
  }
};

export const scriptTasks = lazypipe()
  .pipe(gulpIf, production, rev())
  // .pipe(gulpIf, production, rename(renameCallback))
  // .pipe(
  //   gulpIf,
  //   production,
  //   through.obj((chunk, enc, cb) => {
  //     console.log('chunk', chunk.path);
  //     cb(null, chunk);
  //   }),
  // )
  .pipe(dest, staticPathScripts)
  .pipe(gulpIf, production, gzip(gzipConfig))
  .pipe(gulpIf, production, dest(staticPathScripts))
  .pipe(gulpIf, production, rev.manifest(manifestPath, manifestConfig))
  .pipe(gulpIf, production, dest(rootPath));

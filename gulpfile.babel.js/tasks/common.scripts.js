import { dest } from 'gulp';
import rev from 'gulp-rev';
import gzip from 'gulp-gzip';
import gulpIf from 'gulp-if';
import lazypipe from 'lazypipe';

import { manifestPath, gzipConfig, revOptions } from '../config';
import { staticPathScripts, rootPath, env } from '../env';

const { GZIP_ENABLED = false, REV_NAME_ENABLED = false } = env;

export default lazypipe()
  .pipe(gulpIf, REV_NAME_ENABLED, rev())
  .pipe(dest, staticPathScripts)

  .pipe(gulpIf, GZIP_ENABLED, gzip(gzipConfig))
  .pipe(gulpIf, GZIP_ENABLED, dest(staticPathScripts))

  .pipe(gulpIf, REV_NAME_ENABLED, rev.manifest(manifestPath, revOptions))
  .pipe(gulpIf, REV_NAME_ENABLED, dest(rootPath));

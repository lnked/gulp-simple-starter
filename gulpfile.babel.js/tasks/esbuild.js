import rev from 'gulp-rev';
import size from 'gulp-size';
import gzip from 'gulp-gzip';
import gulpIf from 'gulp-if';
import rigger from 'gulp-rigger';
import replaceTask from 'gulp-replace-task';
import gulpEsBuild from 'gulp-esbuild';
import { src, dest } from 'gulp';

import { rootPath, staticPathScripts, production, development } from '../env';
import { scriptsPath, manifestPath, manifestConfig, gzipConfig } from '../config';
import { appEnvironment } from '../env/transform';
import { reload } from './webserver';

import { scriptsBuildGlob, replaceConfig, sizeConfig } from './common.scripts';

export default () =>
  src([...scriptsBuildGlob, `!${scriptsPath}/**/_*.*`])
    .pipe(rigger())
    .pipe(
      gulpEsBuild({
        sourcemap: development,
        outdir: '../js',
        bundle: true,
        minify: true,
        format: 'esm',
        platform: 'node',
        loader: {
          '.tsx': 'tsx',
        },
        define: appEnvironment,
      }),
    )
    .pipe(replaceTask(replaceConfig))
    .pipe(gulpIf(production, rev()))
    .pipe(dest(staticPathScripts))
    .pipe(gulpIf(production, gzip(gzipConfig)))
    .pipe(gulpIf(production, dest(staticPathScripts)))
    .pipe(gulpIf(production, rev.manifest(manifestPath, manifestConfig)))
    .pipe(gulpIf(production, dest(rootPath)))
    .pipe(size(sizeConfig))
    .on('end', reload);

import rev from 'gulp-rev';
import size from 'gulp-size';
import gulpIf from 'gulp-if';
import rigger from 'gulp-rigger';
import replaceTask from 'gulp-replace-task';
import gulpEsBuild from 'gulp-esbuild';
import { src, dest } from 'gulp';

import { rootPath, staticPathScripts, production, development } from '../env';
import { scriptsPath, manifestPath, manifestConfig } from '../config';
import { appEnvironment } from '../env/transform';
import { reload } from './webserver';

export const scriptsWatchGlob = [`${scriptsPath}/*.{js,jsx,ts,tsx,mjs}`];

export default () =>
  src([...scriptsWatchGlob, `!${scriptsPath}/**/_*.*`])
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
    .pipe(
      replaceTask({
        patterns: [
          {
            match: 'timestamp',
            replacement: new Date().getTime(),
          },
        ],
      }),
    )
    .pipe(gulpIf(production, rev()))
    .pipe(dest(staticPathScripts))
    .pipe(gulpIf(production, rev.manifest(manifestPath, manifestConfig)))
    .pipe(gulpIf(production, dest(rootPath)))
    .pipe(
      size({
        title: 'scripts',
        gzip: true,
        showFiles: true,
        showTotal: true,
      }),
    )
    .on('end', reload);

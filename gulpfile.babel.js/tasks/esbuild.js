import { src } from 'gulp';

import size from 'gulp-size';
import rigger from 'gulp-rigger';
import gulpEsBuild from 'gulp-esbuild';

import { scriptsPath } from '../config';
import { appEnvironment } from '../env/transform';
import { reload } from './webserver';

import { scriptsBuildGlob, sizeConfig, scriptTasks } from './common.scripts';

export default () =>
  src([...scriptsBuildGlob, `!${scriptsPath}/**/_*.*`])
    .pipe(rigger())
    .pipe(
      gulpEsBuild({
        sourcemap: true,
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
    .pipe(scriptTasks())
    .pipe(size(sizeConfig))
    .on('end', reload);

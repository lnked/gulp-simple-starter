import browsersync from 'browser-sync';
import { src, dest } from 'gulp';

import { outputPath } from '../env';
import { publicPath } from '../config';

export const publicWatchPaths = [
  `${publicPath}/*.*`,
  `${publicPath}/**/*.*`,
];

export default () =>
  src(publicWatchPaths)
    .pipe(dest(outputPath))
    .on('end', browsersync.reload);

import browsersync from 'browser-sync';
import { resolve } from 'path';
import { src, dest } from 'gulp';

import { staticPath } from '../env';
import { fontsPath } from '../config';

export const fontsWatchPaths = [
  `${fontsPath}/*.*`,
  `${fontsPath}/**/*.*`,
];

export default () =>
  src(fontsWatchPaths)
    .pipe(dest(resolve(staticPath, 'fonts')))
    .on('end', browsersync.reload);

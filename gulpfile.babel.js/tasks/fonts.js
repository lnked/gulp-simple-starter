import { resolve } from 'path';
import { src, dest } from 'gulp';

import { staticPath } from '../env';
import { fontsPath } from '../config';
import { reload } from './webserver';

export const fontsWatchGlob = [`${fontsPath}/**/*.*`];

export default () =>
  src(fontsWatchGlob)
    .pipe(dest(resolve(staticPath, 'fonts')))
    .on('end', reload);

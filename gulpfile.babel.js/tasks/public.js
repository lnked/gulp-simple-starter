import { src, dest } from 'gulp';

import { outputPath } from '../env';
import { publicPath } from '../config';
import { reload } from './webserver';

export const publicWatchGlob = [`${publicPath}/**/{*,.*}`];

export default () => src(publicWatchGlob, { dot: true }).pipe(dest(outputPath)).on('end', reload);

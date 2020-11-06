import { src, dest } from 'gulp';

import { outputPath } from '../env';
import { publicPath, svgStoreFile } from '../config';
import { reload } from './webserver';

export const publicWatchGlob = [`${publicPath}/**/{*,.*}`, `!${svgStoreFile}`];

export default () => src(publicWatchGlob, { dot: true }).pipe(dest(outputPath)).on('end', reload);

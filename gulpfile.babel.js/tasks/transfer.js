import { src, dest } from 'gulp';

import { staticPath } from '../env';
import { transferPaths } from '../config';
import { reload } from './webserver';

export const transferWatchGlob = transferPaths.map(pathname => `${pathname}/**/{*,.*}`);

export default () => src(transferWatchGlob, { dot: true }).pipe(dest(staticPath)).on('end', reload);

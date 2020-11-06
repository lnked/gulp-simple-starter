import { src } from 'gulp';
import clean from 'gulp-clean';

import { outputFolder } from '../env';
import { manifestPath } from '../config';

export const cleanFiles = files => src(files, { read: false, allowEmpty: true }).pipe(clean({ force: true }));

export const cleanRevision = () => cleanFiles(manifestPath);

export default () => cleanFiles([`${outputFolder}/*`, manifestPath]);

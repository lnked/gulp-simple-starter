import { src } from 'gulp';
import clean from 'gulp-clean';

import { outputFolder } from '../env';
import { manifestPath } from '../config';

export default () =>
  src([`${outputFolder}/*`, manifestPath], { read: false, allowEmpty: true })
    .pipe(clean({ force: true }))

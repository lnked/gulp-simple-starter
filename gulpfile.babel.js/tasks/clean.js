import { src } from 'gulp';
import clean from 'gulp-clean';

import { outputFolder } from '../env';

export default () =>
  src(`${outputFolder}/*`, {read: false})
    .pipe(clean())

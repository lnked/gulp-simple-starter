import { src } from 'gulp';
import clean from 'gulp-clean';

export default () =>
  src('dist/*', {read: false})
    .pipe(clean())

import { src } from 'gulp'
import clean from 'gulp-clean'

export default () =>
  src('output/*', {read: false})
    .pipe(clean())

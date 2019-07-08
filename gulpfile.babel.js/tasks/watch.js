import { series } from 'gulp'
import watch from 'gulp-watch'

import { fontsWatchPaths } from './fonts'
import { publicWatchPaths } from './public'
import { stylesWatchPaths } from './styles'
import { imagesWatchPaths } from './images'
import { scriptsWatchPaths } from './scripts'
import { templatesWatchPaths } from './templates'
import { pugWatchPaths } from './pug'

export default () => {
  watch(fontsWatchPaths, series('fonts'))
  watch(publicWatchPaths, series('public'))
  watch(imagesWatchPaths, series('images'))
  watch(stylesWatchPaths, series('styles'))
  watch(scriptsWatchPaths, series('scripts'))
  watch(pugWatchPaths, series('pug'))
  watch(templatesWatchPaths, series('templates'))
}

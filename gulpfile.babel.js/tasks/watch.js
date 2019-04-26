import { watch, series } from 'gulp';

import { fontsWatchPaths } from './fonts';
import { stylesWatchPaths } from './styles';
import { imagesWatchPaths } from './images';
import { scriptsWatchPaths } from './scripts';
import { templatesWatchPaths } from './templates';

export default () => {
  watch(fontsWatchPaths, series('fonts'));
  watch(imagesWatchPaths, series('images'));
  watch(stylesWatchPaths, series('styles'));
  watch(scriptsWatchPaths, series('scripts'));
  watch(templatesWatchPaths, series('templates'));
}

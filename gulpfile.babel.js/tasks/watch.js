import watch from 'gulp-watch';
import { series } from 'gulp';

import { pugWatchGlob } from './pug';
import { htmlWatchGlob } from './html';
import { fontsWatchGlob } from './fonts';
import { publicWatchGlob } from './public';
import { stylesWatchGlob } from './styles';
import { imagesWatchGlob } from './images';
import { scriptsWatchGlob } from './scripts';
import { svgStoreWatchGlob } from './svgstore';

import { testsPatterns } from '../config';

export default () => {
  const templatesWatchGlob = [
    ...pugWatchGlob,
    ...htmlWatchGlob,
  ];

  watch(fontsWatchGlob, series('fonts'));
  watch(publicWatchGlob, series('public'));
  watch(imagesWatchGlob, series('images'));
  watch(stylesWatchGlob, series('styles'));
  watch(templatesWatchGlob, series('templates'));
  watch(svgStoreWatchGlob, series('svgstore', 'templates'));
  watch(scriptsWatchGlob, { ignored: testsPatterns }, series('scripts'));
}

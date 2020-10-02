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

  const watchConfig = {
    usePolling: true,
  };

  watch(fontsWatchGlob, watchConfig, series('fonts'));
  watch(publicWatchGlob, watchConfig, series('public'));
  watch(imagesWatchGlob, watchConfig, series('images'));
  watch(stylesWatchGlob, watchConfig, series('styles'));
  watch(templatesWatchGlob, watchConfig, series('templates'));
  watch(svgStoreWatchGlob, watchConfig, series('svgstore', 'templates'));
  // watch(scriptsWatchGlob, { ...watchConfig, ignored: testsPatterns }, series('scripts'));
  watch(scriptsWatchGlob, { ...watchConfig, ignored: testsPatterns }, series('js'));
}

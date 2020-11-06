import watch from 'gulp-watch';
import { series } from 'gulp';

import { pugWatchGlob } from './pug';
import { htmlWatchGlob } from './html';
import { fontsWatchGlob } from './fonts';
import { publicWatchGlob } from './public';
import { stylesWatchGlob } from './styles';
import { imagesWatchGlob } from './images';
import { scriptsWatchGlob } from './scripts';

import { testsPatterns, svgStorePath } from '../config';

const svgstoreWatchGlob = [`${svgStorePath}/**/*.svg`];

export default mode => {
  const templatesWatchGlob = [...pugWatchGlob, ...htmlWatchGlob, ...svgstoreWatchGlob];

  const watchConfig = {
    usePolling: true,
  };

  return () => {
    watch(fontsWatchGlob, watchConfig, series('fonts'));
    watch(publicWatchGlob, watchConfig, series('public'));
    watch(imagesWatchGlob, watchConfig, series('images'));
    watch(stylesWatchGlob, watchConfig, series('styles'));
    watch(templatesWatchGlob, watchConfig, series('templates'));
    watch(scriptsWatchGlob, { ...watchConfig, ignored: testsPatterns }, series(mode));
  };
};

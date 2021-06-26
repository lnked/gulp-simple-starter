import watch from 'gulp-watch';
import { parallel } from 'gulp';

import { htmlWatchGlob } from './html';
import { fontsWatchGlob } from './fonts';
import { publicWatchGlob } from './public';
import { stylesWatchGlob } from './styles';
import { imagesWatchGlob } from './images';
import { transferWatchGlob } from './transfer';
import { scriptsWatchGlob } from './common.scripts';

import { testsPatterns, svgStorePath } from '../config';

const svgstoreWatchGlob = [`${svgStorePath}/**/*.svg`];

export default mode => {
  const templatesWatchGlob = [...htmlWatchGlob, ...svgstoreWatchGlob];

  const watchConfig = {
    usePolling: true,
  };

  return () => {
    watch(fontsWatchGlob, watchConfig, parallel('fonts'));
    watch(publicWatchGlob, watchConfig, parallel('public'));
    watch(imagesWatchGlob, watchConfig, parallel('images'));
    watch(stylesWatchGlob, watchConfig, parallel('styles'));
    watch(transferWatchGlob, watchConfig, parallel('transfer'));
    watch(templatesWatchGlob, watchConfig, parallel('templates'));
    watch(scriptsWatchGlob, { ...watchConfig, ignored: testsPatterns }, parallel(mode));
  };
};

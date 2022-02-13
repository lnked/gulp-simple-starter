import { series, watch } from 'gulp';

import { testsPatterns, svgStorePath } from '../config';
import fonts, { fontsWatchGlob } from './fonts';
import publicWatch, { publicWatchGlob } from './public';
import styles, { stylesWatchGlob } from './styles';
import images, { cacheImages, imagesWatchGlob } from './images';
import transfer, { transferWatchGlob } from './transfer';
import templates, { htmlWatchGlob } from './html';
import scripts, { scriptsWatchGlob } from './scripts';

const svgstoreWatchGlob = [`${svgStorePath}/**/*.svg`];
const templatesWatchGlob = [...htmlWatchGlob, ...svgstoreWatchGlob];

const watchConfig = {
  usePolling: true,
};

export default () => {
  watch(fontsWatchGlob, watchConfig, fonts);
  watch(publicWatchGlob, watchConfig, publicWatch);
  watch(stylesWatchGlob, watchConfig, styles);
  watch(transferWatchGlob, watchConfig, transfer);
  watch(templatesWatchGlob, watchConfig, templates);
  watch(imagesWatchGlob, watchConfig, series(cacheImages, images));
  watch(scriptsWatchGlob, { ...watchConfig, ignored: testsPatterns, ignoreInitial: false }, scripts);
};

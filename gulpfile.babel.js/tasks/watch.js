import { watch } from 'gulp';

import { testsPatterns, svgStorePath, watchConfig } from '../config';
import fonts, { fontsWatchGlob } from './fonts';
import publicWatch, { publicWatchGlob } from './public';
import styles, { stylesWatchGlob } from './styles';
import images, { imagesWatchGlob } from './images';
import transfer, { transferWatchGlob } from './transfer';
import templates, { htmlWatchGlob } from './html';
import scripts, { scriptsWatchGlob } from './scripts';

const svgstoreWatchGlob = [`${svgStorePath}/**/*.svg`];
const templatesWatchGlob = [...htmlWatchGlob, ...svgstoreWatchGlob];

export default () => {
  watch(fontsWatchGlob, watchConfig, fonts);
  watch(publicWatchGlob, watchConfig, publicWatch);
  watch(imagesWatchGlob, watchConfig, images);
  watch(stylesWatchGlob, watchConfig, styles);
  watch(transferWatchGlob, watchConfig, transfer);
  watch(templatesWatchGlob, watchConfig, templates);
  watch(scriptsWatchGlob, { ...watchConfig, ignored: testsPatterns, ignoreInitial: false }, scripts);
};

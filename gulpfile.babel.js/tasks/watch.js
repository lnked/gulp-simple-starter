import watch from 'gulp-watch';
import { series } from 'gulp';

import pug, { pugWatchGlob } from './pug';
import fonts, { fontsWatchGlob } from './fonts';
import public, { publicWatchGlob } from './public';
import styles, { stylesWatchGlob } from './styles';
import images, { imagesWatchGlob } from './images';
import scripts, { scriptsWatchGlob } from './scripts';
import templates, { templatesWatchGlob } from './templates';
import svgstore, { svgStoreWatchGlob } from './svgstore';

export default () => {
  watch(pugWatchGlob, pug);
  watch(fontsWatchGlob, fonts);
  watch(publicWatchGlob, public);
  watch(svgStoreWatchGlob, svgstore);
  watch(imagesWatchGlob, images);
  watch(stylesWatchGlob, styles);
  watch(scriptsWatchGlob, scripts);
  watch(templatesWatchGlob, templates);
}

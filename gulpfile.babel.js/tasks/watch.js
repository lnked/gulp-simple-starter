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
  watch(pugWatchGlob, series(pug));
  watch(fontsWatchGlob, series(fonts));
  watch(publicWatchGlob, series(public));
  watch(svgStoreWatchGlob, series(svgstore));
  watch(imagesWatchGlob, series(images));
  watch(stylesWatchGlob, series(styles));
  watch(scriptsWatchGlob, series(scripts));
  watch(templatesWatchGlob, series(templates));
}

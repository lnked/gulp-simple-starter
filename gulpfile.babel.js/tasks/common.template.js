import gulpIf from 'gulp-if';
import lazypipe from 'lazypipe';
import htmlmin from 'gulp-htmlmin';
import replace from 'gulp-replace';
import beautify from 'gulp-beautify';
import rewrite from 'gulp-rev-rewrite';

import { checkManifestPath, manifestContents, htmlFormatConfig, htmlminConfig } from '../config';
import { env, staticFolder, imagesFolder } from '../env';

const { MINIFY_HTML = false, REV_NAME_ENABLED = false } = env;

const replaceImagePath = source => {
  const regex = new RegExp(`${source}="([^\\"]+)"`, 'gim');

  return replace(regex, (match, src) => {
    const iRegex = new RegExp(`${source}="(.*?).(png|jpe?g|gif|svg|webp)"`, 'gim');

    if (iRegex.test(match)) {
      return `${source}="/${staticFolder}/${imagesFolder}/${src.replace(
        /((\/)?static(\/)?)?(\/)?(img|images)(\/)?/im,
        '',
      )}"`;
    }

    return match;
  });
};

export const templateTasks = () => {
  REV_NAME_ENABLED && checkManifestPath();

  return lazypipe()
    .pipe(gulpIf, MINIFY_HTML, htmlmin(htmlminConfig))
    .pipe(gulpIf, MINIFY_HTML, replace('href=static/ ', 'href=/static/'))
    .pipe(replaceImagePath, 'src')
    .pipe(replaceImagePath, 'srcset')
    .pipe(gulpIf, !MINIFY_HTML, beautify.html(htmlFormatConfig))
    .pipe(gulpIf, REV_NAME_ENABLED, rewrite({ manifest: manifestContents() }));
};

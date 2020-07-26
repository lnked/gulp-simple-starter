import glob from 'glob';
import { resolve } from 'path';
import { src, dest } from 'gulp';
import { stream as critical } from 'critical';

import { rootPath, outputPath, staticPath } from '../env';
import { fontsPath, manifestPath } from '../config';

const getCssFiles = () => {
  const manifest = require(manifestPath);
  const keys = Object.keys(manifest).filter(name => name.includes('css'));

  const css = keys.map(name => `css/${manifest[name]}`);

  if (css.length) {
    return css;
  }

  const [cssFile = ''] = glob.sync(`${staticPath}/**/*.css`).map(file => file.replace(`${staticPath}/`, ''));

  return cssFile || '';
}

export default () =>
  src(`${outputPath}/**/*.html`)
    .pipe(critical({
      css: getCssFiles(),
      base: staticPath,
      inline: true,
      ignore: {
        atrule: ['@font-face'],
      },
    }))
    .pipe(dest(resolve(outputPath)))

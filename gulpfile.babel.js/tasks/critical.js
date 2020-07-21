import browserSync from 'browser-sync';
import glob from 'glob';
import { resolve } from 'path';
import { src, dest } from 'gulp';
import { stream as critical } from 'critical';

import { outputPath } from '../env';
import { fontsPath } from '../config';

const styles = glob.sync(`${outputPath}/**/*.css`);

export default () =>
  src(`${outputPath}/**/*.html`)
    .pipe(critical({
      width: 1300,
      height: 900,
      base: outputPath,
      inline: true,
      minify: true,
      extract: true,
      css: [
        ...styles,
      ],
      ignore: {
        atrule: ['@font-face'],
        // rule: [/some-regexp/],
        decl: (node, value) => /url\(/.test(value)
        // decl: (node, value) => /big-image\.png/.test(value)
      },
    }))
    .pipe(dest(resolve(outputPath)))

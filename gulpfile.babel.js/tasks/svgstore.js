import { src, dest } from 'gulp'
import { basename, extname } from 'path';

import svgmin from 'gulp-svgmin';
import inject from 'gulp-inject';
import replace from 'gulp-replace';
import cheerio from 'gulp-cheerio';
import svgstore from 'gulp-svgstore';

import { svgminConfig, svgStorePath, svgStoreFile, publicPath } from '../config'

const fileContents = (_, file) =>
  file.contents.toString().replace(/<svg.*?>|<\/svg>/gi, '');

const svgMinOptions = file =>
  svgminConfig(
    basename(
      file.relative,
      extname(file.relative)
    )
  )

export default () =>
  src(svgStoreFile, { allowEmpty: true })
    .pipe(
      inject(
        src(`${svgStorePath}/**/*.svg`)
          .pipe(svgmin(svgMinOptions))
          .pipe(
            cheerio({
              run: ($) => {
                $('[fill]').removeAttr('fill');
                $('[style]').removeAttr('style');
              },
              parserOptions: { xmlMode: true },
            })
          )
          .pipe(replace('&gt;', '>'))
          .pipe(svgstore({
            inlineSvg: true,
          })),
        { transform: fileContents }
      )
    )
    .pipe(dest(publicPath))

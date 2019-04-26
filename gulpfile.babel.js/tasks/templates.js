import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { src, dest } from 'gulp';
import beautify from 'gulp-beautify';
import browsersync from 'browser-sync';
import frontMatter from 'gulp-front-matter';
import nunjucksRender from 'gulp-nunjucks-render';

import { sourcePath, outputPath, development } from '../env';
import { templatesPath } from '../config';

const getData = () => {
  const jsonFile = resolve(sourcePath, 'templates/data.json');
  const jsonExists = existsSync(jsonFile);

  if (jsonExists) {
    const rawdata = readFileSync(jsonFile);
    return JSON.parse(rawdata);
  }

  return {}
}

export const templatesWatchPaths = [
  `${templatesPath}/*.html`,
  `${templatesPath}/**/*.html`,
  `${templatesPath}/**/*.json`,
];

nunjucksRender.nunjucks.configure({
  watch: development,
  trimBlocks: true,
  lstripBlocks: false,
});

export default () =>
  src([
    `${templatesPath}/pages/*.html`,
    `${templatesPath}/pages/**/*.html`,
    `!${templatesPath}/_*.*`,
    `!${templatesPath}/**/_*.*`,
  ])
    .pipe(frontMatter({ property: 'data' }))
    .pipe(nunjucksRender({
      data: getData(),
      path: [templatesPath],
      envOptions: {
        watch: development,
      }
    }))
    .pipe(beautify.html({
      indent_size: 2,
      indent_char: ' ',
      brace_style: 'expand',
      end_with_newline: true,
      preserve_newlines: true,
      indent_handlebars: true,
      indent_inner_html: false,
      max_preserve_newlines: 1,
      unformatted: ['pre', 'code', 'textarea', 'script']
    }))
    .pipe(dest(resolve(outputPath)))
    .on('end', browsersync.reload);

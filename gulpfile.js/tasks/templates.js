const { resolve } = require('path');
const { src, dest } = require('gulp');

const fs = require('fs');
const path = require('path');
const beautify = require('gulp-beautify');
const frontMatter = require('gulp-front-matter');
const nunjucksRender = require('gulp-nunjucks-render');

const { sourcePath, outputPath, isProduction } = require('../env');

const getData = () => {
  const jsonExists = fs.existsSync(path.resolve(sourcePath, 'template/data.json'));

  if (jsonExists) {
    const rawdata = fs.readFileSync(path.resolve(sourcePath, 'template/data.json'));
    return JSON.parse(rawdata);
  }

  return {}
}

nunjucksRender.nunjucks.configure({
  watch: !isProduction,
  trimBlocks: true,
  lstripBlocks: false,
});

module.exports = () =>
  src('src/*.html')
    .pipe(frontMatter({ property: 'data' }))
    .pipe(nunjucksRender({
      data: getData(),
      path: ['src/template'],
      envOptions: {
        watch: !isProduction,
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

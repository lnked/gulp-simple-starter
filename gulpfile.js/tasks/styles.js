const { resolve } = require('path');
const { src, dest } = require('gulp');

const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');

const { outputPath } = require('../env');

const watch = [
  'src/scss/*.{sass,scss}',
  'src/scss/**/*.{sass,scss}',
];

module.exports.watch = watch;

module.exports = () =>
  src([
    ...watch,
    '!src/scss/_*.*',
    '!src/scss/**/_*.*',
  ])
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(cssnano())
    .pipe(dest(resolve(outputPath, 'static/css')))

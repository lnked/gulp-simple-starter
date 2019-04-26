const { resolve } = require('path');
const { src, dest } = require('gulp');

const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');

const { staticPath } = require('../env');

const watchPaths = [
  'src/styles/*.{sass,scss}',
  'src/styles/**/*.{sass,scss}',
];

module.exports.watchPaths = watchPaths;

module.exports = () =>
  src([
    ...watchPaths,
    '!src/styles/_*.*',
    '!src/styles/**/_*.*',
  ])
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(cssnano())
    .pipe(dest(resolve(staticPath, 'css')))

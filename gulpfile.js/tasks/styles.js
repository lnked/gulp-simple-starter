const { resolve } = require('path');
const { src, dest } = require('gulp');

const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');

const { staticPath } = require('../env');
const { stylesPath } = require('../config');

const watchPaths = [
  `${stylesPath}/*.{sass,scss}`,
  `${stylesPath}/**/*.{sass,scss}`,
];

module.exports = () =>
  src([
    ...watchPaths,
    `!${stylesPath}/_*.*`,
    `!${stylesPath}/**/_*.*`,
  ])
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(cssnano())
    .pipe(dest(resolve(staticPath, 'css')))

module.exports.stylesWatchPaths = watchPaths;

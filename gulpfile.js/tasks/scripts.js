const { resolve } = require('path');
const { src, dest } = require('gulp');

const webpack = require('webpack-stream');

const webpackConfig = require('../webpack.config');
const { outputPath } = require('../env');

const watch = [
  'src/js/*.js',
  'src/js/**/*.js',
];

module.exports.watch = watch;

module.exports = () =>
  src([
    ...watch,
    '!src/js/_*.*',
    '!src/js/**/_*.*',
  ])
    .pipe(webpack({
      config: webpackConfig,
    }))
    .pipe(dest(resolve(outputPath, 'static/js')))

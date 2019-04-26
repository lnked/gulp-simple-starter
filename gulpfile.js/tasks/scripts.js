const { resolve } = require('path');
const { src, dest } = require('gulp');

const webpack = require('webpack-stream');

const webpackConfig = require('../webpack.config');
const { staticPath } = require('../env');

const watchPaths = [
  'src/js/*.js',
  'src/js/**/*.js',
];

module.exports.watchPaths = watchPaths;

module.exports = () =>
  src([
    ...watchPaths,
    '!src/js/_*.*',
    '!src/js/**/_*.*',
  ])
    .pipe(webpack({
      config: webpackConfig,
    }))
    .pipe(dest(resolve(staticPath, 'js')))

const { resolve } = require('path');
const { src, dest } = require('gulp');

const webpack = require('webpack-stream');

const webpackConfig = require('../webpack.config');
const { staticPath } = require('../env');
const { scriptsPath } = require('../config');

const watchPaths = [
  `${scriptsPath}/*.js`,
  `${scriptsPath}/**/*.js`,
];

module.exports = () =>
  src([
    ...watchPaths,
    `!${scriptsPath}/_*.*`,
    `!${scriptsPath}/**/_*.*`,
  ])
    .pipe(webpack({
      config: webpackConfig,
    }))
    .pipe(dest(resolve(staticPath, 'js')))

module.exports.scriptsWatchPaths = watchPaths;

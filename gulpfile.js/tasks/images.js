const { resolve } = require('path');
const { src, dest } = require('gulp');

const cache = require('gulp-cache');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const imageminOptipng = require('imagemin-optipng');

const { staticPath } = require('../env');
const { imagesPath } = require('../config');

const watchPaths = [
  `${imagesPath}/*.*`,
];

module.exports = () =>
  src(watchPaths)
    .pipe(newer(resolve(staticPath, 'img')))
    .pipe(cache(
      imagemin([
        imagemin.gifsicle({
          interlaced: true,
          optimizationLevel: 3,
        }),
        imagemin.jpegtran({
          progressive: true,
        }),
        imagemin.optipng({
          optimizationLevel: 5,
        }, { use: imageminOptipng() }),
        imagemin.svgo({
          plugins: [
            {removeTitle:true},
            {removeDesc:true},
            {removeViewBox:false},
            {removeDoctype:true},
            {removeMetadata:true},
            {removeComments:true},
            {removeUselessDefs:true},
            {removeXMLProcInst:true},
            {removeDimensions:true},
            {cleanupNumericValues: {
              floatPrecision: 2
            }},
            {cleanupIDs:true},
            {convertColors: {
              names2hex: true,
              rgb2hex: true
            }},
            {removeUselessStrokeAndFill:false},
          ],
        })
      ], { verbose: true })
    ))
    .pipe(dest(resolve(staticPath, 'img')))

module.exports.imagesWatchPaths = watchPaths;

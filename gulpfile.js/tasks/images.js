const { resolve } = require('path');
const { src, dest } = require('gulp');

const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');
const cache = require('gulp-cache');
const imageminOptipng = require('imagemin-optipng');

const { outputPath } = require('../env');

module.exports = () =>
  src('src/img/*.*')
    .pipe(plumber())
    .pipe(newer(resolve(outputPath, 'img')))
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
    .pipe(dest(resolve(outputPath, 'img')))

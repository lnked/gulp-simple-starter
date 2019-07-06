import { resolve } from 'path';
import { src, dest } from 'gulp';
import cache from 'gulp-cache';
import newer from 'gulp-newer';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import imageminOptipng from 'imagemin-optipng';

import { staticPath } from '../env';
import { imagesPath } from '../config';

export const imagesWatchPaths = [
  `${imagesPath}/*.*`,
];

const imagesDist = resolve(staticPath, 'img');
const imagesImagemin = imagemin([
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
], { verbose: true, name: 'images' });

export default () =>
  src(imagesWatchPaths)
    .pipe(newer(imagesDist))
    .pipe(cache(imagesImagemin))
    .pipe(dest(imagesDist))
    .on('end', browserSync.reload);

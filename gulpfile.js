const { src, task, dest, watch, series, parallel } = require('gulp');

const fs = require('fs');
const path = require('path');

const clean = require('gulp-clean');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const sassGlob = require('gulp-sass-glob');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');
const cache = require('gulp-cache');
const imageminOptipng = require('imagemin-optipng');
const nunjucksRender = require('gulp-nunjucks-render');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config');
const frontMatter = require('gulp-front-matter');

const browserSync = require('browser-sync').create();

const isProduction = process.env.NODE_ENV === 'production';

task('webserver', () => {
  browserSync.init({
    open: true,
    notify: false,
    server: {
      baseDir: 'dist',
    },
    browser: ['google chrome'],
  });

  browserSync.watch('dist/**/*.*').on('change', browserSync.reload)
});

task('clean', () =>
  src('dist/*', {read: false})
    .pipe(clean())
);

task('js', () =>
  src([
    'src/js/*.js',
    'src/js/**/*.js',
    '!src/js/_*.*',
    '!src/js/**/_*.*',
  ])
    .pipe(webpack({
      config: webpackConfig,
    }))
    .pipe(dest('dist/static/js'))
);

task('sass', () =>
  src([
    'src/scss/*.{sass,scss}',
    'src/scss/**/*.{sass,scss}',
    '!src/scss/_*.*',
    '!src/scss/**/_*.*',
  ])
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(cssnano())
    .pipe(dest('dist/static/css'))
);

task('img', () =>
  src('src/img/*.*')
    .pipe(plumber())
    .pipe(newer('dist/img'))
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
    .pipe(dest('dist/img'))
);

const getTemplateData = () => {
  const jsonExists = fs.existsSync(path.resolve(__dirname, 'src/template/data.json'));

  if (jsonExists) {
    const rawdata = fs.readFileSync(path.resolve(__dirname, 'src/template/data.json'));
    return JSON.parse(rawdata);
  }

  return {}
}

nunjucksRender.nunjucks.configure({
  watch: !isProduction,
  trimBlocks: true,
  lstripBlocks: false,
});

task('template', () =>
  src('src/*.html')
    .pipe(frontMatter({ property: 'data' }))
    .pipe(nunjucksRender({
      data: getTemplateData(),
      path: ['src/template'],
      envOptions: {
        watch: !isProduction,
      }
    }))
    .pipe(dest('dist'))
);

task('watch', () => {
  watch(['src/img/*.*'], series('img'));
  watch(['src/js/*.js', 'src/js/**/*.js'], series('js'));
  watch(['src/*.html', 'src/**/*.html', 'src/**/*.json'], series('template'));
  watch(['src/scss/*.{sass,scss}', 'src/scss/**/*.{sass,scss}'], series('sass'));
});

task('build', series('clean', parallel('template', 'sass', 'js', 'img')));

task('default', parallel('watch', 'webserver'))

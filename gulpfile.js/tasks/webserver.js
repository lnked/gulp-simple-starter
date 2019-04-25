const { resolve } = require('path');
const browserSync = require('browser-sync').create();

const { outputPath } = require('../env');

module.exports = () => {
  browserSync.init({
    open: true,
    notify: false,
    server: {
      baseDir: outputPath,
    },
  });

  browserSync.watch(resolve(outputPath, '**/*.*')).on('change', browserSync.reload)
}

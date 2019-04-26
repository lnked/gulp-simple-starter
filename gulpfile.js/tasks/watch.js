const { watch, series } = require('gulp');

const { stylesWatchPaths } = require('./styles');
const { imagesWatchPaths } = require('./images');
const { scriptsWatchPaths } = require('./scripts');
const { templatesWatchPaths } = require('./templates');

module.exports = () => {
  watch(imagesWatchPaths, series('images'));
  watch(stylesWatchPaths, series('styles'));
  watch(scriptsWatchPaths, series('scripts'));
  watch(templatesWatchPaths, series('templates'));
}

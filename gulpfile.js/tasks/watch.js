const { watch, series } = require('gulp');

const stylesWatchPaths = require('./styles').watchPaths;
const imagesWatchPaths = require('./images').watchPaths;
const scriptsWatchPaths = require('./scripts').watchPaths;
const templatesWatchPaths = require('./templates').watchPaths;

module.exports = () => {
  watch(imagesWatchPaths, series('images'));
  watch(stylesWatchPaths, series('styles'));
  watch(scriptsWatchPaths, series('scripts'));
  watch(templatesWatchPaths, series('templates'));
}

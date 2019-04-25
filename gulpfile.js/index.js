const { task, parallel } = require('gulp');

const watch = require('./tasks/watch');
const clean = require('./tasks/clean');
const build = require('./tasks/build');
const styles = require('./tasks/styles');
const images = require('./tasks/images');
const scripts = require('./tasks/scripts');
const templates = require('./tasks/templates');
const webserver = require('./tasks/webserver');

task('clean', clean);
task('styles', styles);
task('images', images);
task('scripts', scripts);
task('templates', templates);

task('watch', watch);
task('build', build());

task('webserver', webserver);

task('default', parallel('watch', 'webserver'))

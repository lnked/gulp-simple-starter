import { task, series, parallel } from 'gulp';

import html from './tasks/html';
import watch from './tasks/watch';
import fonts from './tasks/fonts';
import styles from './tasks/styles';
import publics from './tasks/public';
import scripts from './tasks/scripts';
import transfer from './tasks/transfer';
import webserver from './tasks/webserver';
import clean, { cleanRevision } from './tasks/clean';
import images, { cacheImages } from './tasks/images';
import { check } from './tools/helpers';

task('clean', clean);
task('clean.revision', cleanRevision);
task('fonts', fonts);
task('styles', styles);
task('public', publics);
task('scripts', scripts);
task('transfer', transfer);
task('images', series(cacheImages, images));
task('templates', html);

task('watch', watch);

task(
  'build',
  series(check, 'clean', 'images', parallel('styles', 'scripts'), parallel('templates', 'public', 'transfer', 'fonts')),
);

task('webserver', webserver);
task('preheat', series(check, parallel('styles', 'scripts'), 'templates'));
task('default', series([check, 'clean.revision', 'preheat'], parallel('webserver', 'watch')));

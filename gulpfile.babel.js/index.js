import { task, series, parallel } from 'gulp';

import pug from './tasks/pug';
import html from './tasks/html';
import watch from './tasks/watch';
import clean, { cleanRevision } from './tasks/clean';
import build from './tasks/build';
import fonts from './tasks/fonts';
import styles from './tasks/styles';
import publics from './tasks/public';
import scripts from './tasks/scripts';
import critical from './tasks/critical';
import transfer from './tasks/transfer';
import webserver from './tasks/webserver';
import images, { cacheImages } from './tasks/images';

task('pug', pug);
task('html', html);
task('clean', clean);
task('clean.revision', cleanRevision);
task('fonts', fonts);
task('styles', styles);
task('public', publics);
task('scripts', scripts);
task('critical', critical);
task('transfer', transfer);
task('images', series(cacheImages, images));
task('templates', series(pug, html));

task('watch', watch('scripts'));

task('build', build('scripts'));

task('webserver', webserver);
task('preheat', series(parallel('styles', 'scripts'), 'templates'));
task('default', series(['clean.revision', 'preheat'], parallel('webserver', 'watch')));

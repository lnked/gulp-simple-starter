import { task, parallel } from 'gulp';

import pug from './tasks/pug';
import clear from './tasks/clear';
import watch from './tasks/watch';
import clean from './tasks/clean';
import build from './tasks/build';
import fonts from './tasks/fonts';
import styles from './tasks/styles';
import images from './tasks/images';
import publics from './tasks/public';
import scripts from './tasks/scripts';
import templates from './tasks/templates';
import webserver from './tasks/webserver';

task('clear', clear);

task('clean', clean);
task('fonts', fonts);
task('styles', styles);
task('images', images);
task('public', publics);
task('scripts', scripts);
task('templates', templates);
task('pug', pug);

task('watch', watch);
task('build', build());

task('webserver', webserver);

task('default', parallel('watch', 'webserver'))

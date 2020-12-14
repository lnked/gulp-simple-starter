import { task, series, parallel } from 'gulp';

import pug from './tasks/pug';
import html from './tasks/html';
import watch from './tasks/watch';
import clean, { cleanRevision } from './tasks/clean';
import build from './tasks/build';
import fonts from './tasks/fonts';
import styles from './tasks/styles';
import publics from './tasks/public';
import esBuild from './tasks/esbuild';
import scripts from './tasks/scripts';
import critical from './tasks/critical';
import webserver from './tasks/webserver';
import images, { cacheImages } from './tasks/images';

task('pug', pug);
task('html', html);
task('clean', clean);
task('clean.revision', cleanRevision);
task('fonts', fonts);
task('styles', styles);
task('public', publics);
task('esbuild', esBuild);
task('scripts', scripts);
task('critical', critical);
task('images', series(cacheImages, images));
task('templates', parallel('pug', 'html'));

task('watch', watch('esbuild'));
task('watch:webpack', watch('scripts'));

task('build', build('esbuild'));
task('build:webpack', build('scripts'));

task('webserver', webserver);
task('preheat:webpack', series(parallel('styles', 'scripts'), 'templates'));
task('start:webpack', series(['clean.revision', 'preheat:webpack'], parallel('webserver', 'watch:webpack')));

task('preheat', series(parallel('styles', 'esbuild'), 'templates'));
task('default', series(['clean.revision', 'preheat'], parallel('webserver', 'watch')));

import { task, series, parallel } from 'gulp';

import js from './tasks/js';
import pug from './tasks/pug';
import html from './tasks/html';
import watch from './tasks/watch';
import clean, { cleanRevision } from './tasks/clean';
import build from './tasks/build';
import webpackBuild from './tasks/webpack-build';
import fonts from './tasks/fonts';
import styles from './tasks/styles';
import publics from './tasks/public';
import scripts from './tasks/scripts';
import critical from './tasks/critical';
import svgstore from './tasks/svgstore';
import webserver from './tasks/webserver';
import images, { cacheImages } from './tasks/images';

task('pug', pug);
task('html', html);
task('clean', clean);
task('clean.revision', cleanRevision);
task('fonts', fonts);
task('styles', styles);
task('public', publics);
task('js', js);
task('scripts', scripts);
task('svgstore', svgstore);
task('critical', critical);
task('images', series(cacheImages, images));
task('templates', parallel('pug', 'html'));

task('watch', watch);
task('build', build());
task('build:webpack', webpackBuild());

task('webserver', webserver);
task('preheat:webpack', series(parallel('styles', 'scripts'), 'templates'));
task('start:webpack', series(['clean.revision', 'preheat:webpack'], parallel('webserver', 'watch')));

task('preheat', series(parallel('styles', 'js'), 'templates'));
task('default', series(['clean.revision', 'preheat'], parallel('webserver', 'watch')));

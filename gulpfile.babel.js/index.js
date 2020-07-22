import { task, parallel } from 'gulp';

import pug from './tasks/pug';
import html from './tasks/html';
import watch from './tasks/watch';
import clean from './tasks/clean';
import build from './tasks/build';
import fonts from './tasks/fonts';
import styles from './tasks/styles';
import images from './tasks/images';
import publics from './tasks/public';
import scripts from './tasks/scripts';
import critical from './tasks/critical';
import svgstore from './tasks/svgstore';
import webserver from './tasks/webserver';

task('pug', pug);
task('html', html);
task('clean', clean);
task('fonts', fonts);
task('styles', styles);
task('images', images);
task('public', publics);
task('scripts', scripts);
task('svgstore', svgstore);
task('critical', critical);
task('templates', parallel('pug', 'html'));

task('watch', watch);
task('build', build());

task('webserver', webserver);

task('default', parallel('watch', 'webserver'));

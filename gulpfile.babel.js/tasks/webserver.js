import { resolve } from 'path';
import browserSync from 'browser-sync';
import bssi from 'browsersync-ssi';

import { outputPath } from '../env';

const devServer = browserSync.create();
const watchGlob = resolve(outputPath, '**/*.*');

export const stream = () => browserSync.stream();
export const reload = () => browserSync.reload();

export default () => {
  devServer.init({
    open: true,
    online: true,
    notify: false,
    server: {
      baseDir: outputPath,
      middleware: bssi({ baseDir: outputPath, ext: '.html' }),
      serveStaticOptions: {
        extensions: ['html'],
      },
    },
    snippetOptions: {
      rule: {
        match: /<\/body>/i,
      },
    },
    reloadOnRestart: true,
    ghostMode: { clicks: false },
  });

  devServer.watch(watchGlob).on('change', devServer.reload);
};

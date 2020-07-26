import { resolve } from 'path';
import browserSync from 'browser-sync';

import { outputPath } from '../env';

const devServer = browserSync.create();
const watchGlob = resolve(outputPath, '**/*.*');

export const stream = () => browserSync.stream()
export const reload = () => browserSync.reload();

export default () => {
  devServer.init({
    open: true,
    notify: false,
    server: {
      baseDir: outputPath,
    },
    snippetOptions: {
      rule: {
        match: /<\/body>/i
      }
    },
    reloadOnRestart: true,
  });

  devServer.watch(watchGlob).on('change', devServer.reload);
}

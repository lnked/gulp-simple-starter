import { resolve } from 'path';
import browserSync from 'browser-sync';

import { outputPath } from '../env';

const devServer = browserSync.create();
const watchGlob = resolve(outputPath, '**/*.*');

export default () => {
  devServer.init({
    open: true,
    notify: true,
    server: {
      baseDir: outputPath,
    },
  });

  devServer.watch(watchGlob).on('change', devServer.reload);
}

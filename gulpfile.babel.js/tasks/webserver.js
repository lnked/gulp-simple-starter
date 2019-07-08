import { resolve } from 'path'
import browserSync from 'browser-sync'

import { outputPath } from '../env'

export default () => {
  const devServer = browserSync.create()
  const watchGlob = resolve(outputPath, '**/*.*')

  devServer.init({
    open: true,
    notify: true,
    server: {
      baseDir: outputPath,
    },
  })

  devServer.watch(watchGlob).on('change', devServer.reload)
}

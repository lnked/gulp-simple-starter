import { src, dest } from 'gulp';
import { existsSync, mkdirSync } from 'fs';
import gulpIf from 'gulp-if';
import size from 'gulp-size';
import webp from 'gulp-webp';
import newer from 'gulp-newer';
import plumber from 'gulp-plumber';
import tinypng from 'gulp-tinypng';
import imagemin from 'gulp-imagemin';
import progress from 'progress-stream';
import cliProgress from 'cli-progress';
import colors from 'ansi-colors';

import { imagesPath, imageminConfig, webpConfig } from '../config';
import { imagesCache, imagesOutput, production, env, development } from '../env';
import { reload } from './webserver';
import { countFiles, getFilesList, countDiffFiles } from '../tools/helpers';

const { TINYPNG_API_KEY = '', TINYPNG_ENABLED = false } = env;

const extensions = '{png,jpg,jpeg,gif,svg,webp,webm,ogg,ogv,mp4,mov}';

export const imagesWatchGlob = [`${imagesPath}/*.${extensions}`, `${imagesPath}/**/*.${extensions}`];

const condition = (formats) => (file) => {
  const { history = [] } = file || {};
  const [filename] = history;

  return formats.includes(filename.split('.').pop() || '');
};

const progressBar = new cliProgress.SingleBar({
  format: 'Image optimization progress |' + colors.cyan('{bar}') + '| {percentage}% | {value}/{total} Files',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true,
});

if (!existsSync(imagesCache)) {
  mkdirSync(
    imagesCache,
    {
      recursive: true,
    },
    () => {
      console.log('\x1b[45m%s\x1b[0m', '--------------------------------------');
      console.log('\x1b[45m%s\x1b[0m', `${imagesCache} folder created`);
      console.log('\x1b[45m%s\x1b[0m', '--------------------------------------');
    },
  );
}

const fileList = getFilesList(imagesPath);
const fileCount = countFiles(fileList);

const progressStream = progress({
  time: 100,
  length: countFiles(getFilesList(imagesCache)),
  objectMode: true,
});

progressStream.on('progress', (stats) => {
  progressBar.update(stats.percentage.toFixed(0), {
    value: countDiffFiles(imagesCache, fileList),
    total: fileCount,
  });
});

export const cacheImages = () => {
  progressBar.start(fileCount, 0, {
    value: countDiffFiles(imagesCache, fileList),
    total: fileCount,
  });

  return src(imagesWatchGlob)
    .pipe(gulpIf(development, plumber()))
    .pipe(newer(imagesCache, { ctime: true }))
    .pipe(
      gulpIf(
        production,
        imagemin(imageminConfig, {
          name: 'images',
          verbose: false,
        }),
      ),
    )
    .pipe(gulpIf(production, progressStream))
    .pipe(gulpIf(TINYPNG_ENABLED && condition(['png']), tinypng(TINYPNG_API_KEY)))
    .pipe(dest(imagesCache))
    .pipe(gulpIf(condition(['jpg', 'jpeg']), webp(webpConfig)))
    .pipe(plumber.stop())
    .pipe(dest(imagesCache))
    .on('end', () => production && progressBar.stop());
};

export default () =>
  src(`${imagesCache}/**/*.${extensions}`)
    .pipe(dest(imagesOutput))
    .pipe(
      size({
        title: 'images',
        showFiles: true,
        showTotal: true,
      }),
    )
    .on('end', reload);

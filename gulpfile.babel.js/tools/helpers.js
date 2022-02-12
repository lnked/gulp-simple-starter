import { existsSync, readdirSync, statSync, copyFile } from 'fs';
import { resolve } from 'path';

import { scriptsPath } from '../config';
import { env, development, production, rootPath } from '../env';

const { SOURCEMAPS_ENABLED } = env;

export const alias = [
  'libs',
  'hooks',
  'utils',
  'tools',
  'types',
  'stores',
  'configs',
  'helpers',
  'services',
  'settings',
  'constants',
  'components',
].reduce(
  (list, path) => ({
    ...list,
    [`@${path}`]: resolve(scriptsPath, path),
  }),
  {},
);

export const devtool = (() => {
  if (production) {
    if (SOURCEMAPS_ENABLED) {
      return 'source-map';
    }

    return false;
  }

  return 'eval-cheap-module-source-map';
})();

export const scriptsSourcePath = resolve(rootPath, scriptsPath);

export const entries = readdirSync(scriptsSourcePath).filter(file => {
  const name = file.toLowerCase();
  const isFile = statSync(resolve(scriptsSourcePath, file)).isFile();

  if (isFile && (name.includes('.js') || name.includes('.ts'))) {
    return true;
  }

  return false;
});

export const parseArguments = argv => {
  const data = {};

  argv.map((item, index) => {
    if (item.substring(0, 2) === '--') {
      const name = item.substring(2);
      const value = argv[index + 1] || true;

      data[name] = value;
    }
  });

  return data;
};

export const check = cb => {
  if (development && !existsSync('.env.development')) {
    copyFile(resolve(rootPath, '.env.example'), resolve(rootPath, '.env.development'), err => {
      if (err) {
        throw err;
      }

      console.log('\x1b[45m%s\x1b[0m', '--------------------------------------');
      console.log('\x1b[45m%s\x1b[0m', '.env.development file has been created');
      console.log('\x1b[45m%s\x1b[0m', '--------------------------------------');
    });
  }

  if (production && !existsSync('.env.production')) {
    copyFile(resolve(rootPath, '.env.example'), resolve(rootPath, '.env.production'), err => {
      if (err) {
        throw err;
      }

      console.log('\x1b[45m%s\x1b[0m', '-------------------------------------');
      console.log('\x1b[45m%s\x1b[0m', '.env.production file has been created');
      console.log('\x1b[45m%s\x1b[0m', '-------------------------------------');
    });
  }

  cb();
};

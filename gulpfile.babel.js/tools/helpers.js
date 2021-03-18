import fs from 'fs';
import { resolve } from 'path';

import { scriptsPath } from '../config';
import { env, production, rootPath } from '../env';

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

export const entries = fs.readdirSync(scriptsSourcePath).filter(file => {
  const name = file.toLowerCase();
  const isFile = fs.statSync(resolve(scriptsSourcePath, file)).isFile();

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

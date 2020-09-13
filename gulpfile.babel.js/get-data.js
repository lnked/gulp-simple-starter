import glob from 'glob';
import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs';

import { sourcePath, outputPath, styleFolder, development, production } from './env';
import { environment } from './tools/env';

export const getEnvironments = () => {
  return Object.keys(environment).reduce((e, c) => {
    if (c.startsWith('GULP_APP_')) {
      const name = c.replace('GULP_APP_', '');

      return {
        ...e,
        [name]: environment[c],
      };
    }

    return {
      ...e,
    };
  }, {});
}

export const getData = () => {
  const defaultStyles = `${styleFolder}/main.css`;

  const jsonFile = resolve(sourcePath, 'templates/data.json');
  const jsonExists = existsSync(jsonFile);

  const [style] = glob.sync(`${outputPath}/**/*.css`);
  const revisionFile = style && style.split('/').pop();

  const styleName = development
    ? defaultStyles
    : (revisionFile && `${styleFolder}/${revisionFile}`) || defaultStyles;

  if (jsonExists) {
    const rawdata = readFileSync(jsonFile);
    const data = JSON.parse(rawdata);

    return {
      data,
      styleName,
      production,
      development,
      environment,
    };
  }

  return {};
}

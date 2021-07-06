import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs';

import { manifestPath } from './config';
import { mode, environment, sourcePath, styleFolder, development, production, env } from './env';
import { parseSVGStore } from './tools/svgstore';

const { REV_NAME_ENABLED = false } = env;

const getStyles = () => {
  const defaultStyles = [`/static/${styleFolder}/main.css`];

  if (REV_NAME_ENABLED && existsSync(manifestPath)) {
    const rawData = readFileSync(manifestPath);
    const data = JSON.parse(rawData);

    const re = /\.css/;

    const styles = Object.keys(data).reduce((acc, name) => [...acc, ...(re.test(name) ? [data[name]] : [])], []);

    if (styles.length) {
      return styles.map(style => `/static/${styleFolder}/${style}`);
    }
  }

  return defaultStyles;
};

const component = (name, initialState = {}) =>
  `<div id="nano-${name.toLowerCase()}" data-props="${JSON.stringify(initialState)}"></div>`;

export const getData = () => {
  const jsonFile = resolve(sourcePath, 'templates/data.json');
  const jsonExists = existsSync(jsonFile);

  const styles = getStyles();

  if (jsonExists) {
    const svgstore = parseSVGStore();
    const rawData = readFileSync(jsonFile);
    const data = JSON.parse(rawData);

    return {
      ...data,
      mode,
      styles,
      svgstore,
      component,
      production,
      development,
      environment,
    };
  }

  return {};
};

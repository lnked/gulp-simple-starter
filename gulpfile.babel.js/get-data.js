import glob from 'glob';
import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs';

import { parseSVGStore } from './tools/svgstore';
import { mode, environment, sourcePath, outputPath, styleFolder, development, production } from './env';

export const getData = () => {
  const defaultStyles = `/static/${styleFolder}/main.css`;

  const jsonFile = resolve(sourcePath, 'templates/data.json');
  const jsonExists = existsSync(jsonFile);

  const [style] = glob.sync(`${outputPath}/**/*.css`);
  const revisionFile = style && style.split('/').pop();

  const styleName = development
    ? defaultStyles
    : (revisionFile && `/static/${styleFolder}/${revisionFile}`) || defaultStyles;

  if (jsonExists) {
    const svgstore = parseSVGStore();
    const rawData = readFileSync(jsonFile);
    const data = JSON.parse(rawData);

    return {
      ...data,
      svgstore,
      mode,
      styleName,
      production,
      development,
      environment,
    };
  }

  return {};
};

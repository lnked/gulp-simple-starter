import glob from 'glob';
import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs';

import { sourcePath, outputPath, styleFolder, development } from './env';

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
    };
  }

  return {};
}

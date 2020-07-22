import glob from 'glob';
import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs';

import { sourcePath, outputPath, development } from './env';

export const getData = () => {
  const defaultStyles = 'css/main.css';

  const jsonFile = resolve(sourcePath, 'templates/data.json');
  const jsonExists = existsSync(jsonFile);

  const [style] = glob.sync(`${outputPath}/**/*.css`);
  const styleName = development ? defaultStyles : (style && style.split('/').pop()) || defaultStyles;

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

import { scriptsPath } from '../config';

export const scriptsWatchGlob = [`${scriptsPath}/*.{js,jsx,ts,tsx,mjs}`, `${scriptsPath}/**/*.{js,jsx,ts,tsx,mjs}`];

export const replaceConfig = {
  patterns: [
    {
      match: 'timestamp',
      replacement: new Date().getTime(),
    },
  ],
};

export const sizeConfig = {
  title: 'scripts',
  gzip: true,
  showFiles: true,
  showTotal: true,
};

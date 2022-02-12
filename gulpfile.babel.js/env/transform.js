import dotenv from 'dotenv';
import { resolve } from 'path';
import { existsSync } from 'fs';

import { mode, production, development } from './args';

const envName = (existsSync(`.env.${mode}`) && `.env.${mode}`) || '.env';

const envFile = resolve(process.cwd(), envName);

const { parsed = {} } = dotenv.config({
  path: envFile,
});

const envVariable = value => {
  if (['true', 'false'].includes(value)) {
    return value === 'true';
  }

  return JSON.stringify(value);
};

const environment = Object.entries(parsed).reduce(
  (acc, [name, value]) => ({
    ...acc,
    [name]: envVariable(value),
  }),
  {},
);

const appEnvironment = Object.entries(parsed).reduce(
  (acc, [name, value]) => ({
    ...acc,
    ...(name.startsWith('GULP_APP_') && { [name.replace('GULP_APP_', '')]: JSON.stringify(value) }),
  }),
  {
    mode,
    production,
    development,
  },
);

export { environment, appEnvironment };

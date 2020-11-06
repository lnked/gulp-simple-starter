const dotenv = require('dotenv');
const { existsSync } = require('fs');
const { resolve } = require('path');

const { mode, production, development } = require('./args');

const envName = (existsSync(`.env.${mode}`) && `.env.${mode}`) || '.env';

const envFile = resolve(process.cwd(), envName);

const { parsed } = dotenv.config({
  path: envFile,
});

const environment = Object.entries(parsed).reduce(
  (acc, [name, value]) => ({ ...acc, [name]: JSON.stringify(value) }),
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

module.exports = {
  environment,
  appEnvironment,
};

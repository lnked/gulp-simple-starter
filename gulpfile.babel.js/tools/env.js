const fs = require('fs');
const dotenv = require('dotenv');
const { resolve } = require('path');

const { formatter } = require('./formatter')

const root = process.cwd();

const envFile = resolve(root, '.env.development');

const { parsed } = dotenv.config({
  path: envFile,
});

module.exports.environment = formatter(parsed, true)

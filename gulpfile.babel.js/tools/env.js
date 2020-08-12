import fs from 'fs';
import dotenv from 'dotenv';
import { resolve } from 'path';

import { formatter } from './formatter';

const root = process.cwd();

const envFile = resolve(root, '.env.development');

const { parsed } = dotenv.config({
  path: envFile,
});

module.exports.environment = formatter(parsed, true)

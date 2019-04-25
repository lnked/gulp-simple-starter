const { resolve, dirname } = require('path');

const mode = process.env.NODE_ENV || 'development';

const rootPath = resolve(dirname(__dirname));
const sourcePath = resolve(rootPath, 'src');
const outputPath = resolve(rootPath, 'dist');

const isProduction = mode === 'production';
const isDevelopment = mode === 'development';

module.exports = {
  mode,
  rootPath,
  sourcePath,
  outputPath,
  isProduction,
  isDevelopment,
}

import yargs from 'yargs';
import { resolve, dirname } from 'path';

export const argv = yargs.argv;

export const production = !!argv.production;
export const development = !!argv.development;

export const mode = production ? 'production' : 'development';

export const rootPath = resolve(dirname(__dirname));
export const sourcePath = resolve(rootPath, 'src');
export const outputPath = resolve(rootPath, 'dist');
export const staticPath = resolve(outputPath, 'static');
export const nodeModulesPath = resolve(rootPath, 'node_modules');

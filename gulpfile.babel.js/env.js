import yargs from 'yargs';
import { resolve, dirname } from 'path';

export const argv = yargs.argv;

export const isUncss = !!argv.uncss;
export const optimized = !!argv.optimized;
export const production = !!argv.production;
export const development = !!argv.development;

export const mode = production ? 'production' : 'development';

export const sourceFolder = 'src';
export const outputFolder = 'dist';

export const styleFolder = 'css';
export const scriptsFolder = 'js';

export const rootPath = resolve(dirname(__dirname));
export const sourcePath = resolve(rootPath, sourceFolder);
export const outputPath = resolve(rootPath, outputFolder);
export const staticPath = resolve(outputPath, 'static');
export const cacheDirectory = resolve(rootPath, '.cache');
export const nodeModulesPath = resolve(rootPath, 'node_modules');
export const imagesCache = resolve(cacheDirectory, 'images');
export const imagesOutput = resolve(staticPath, 'img');
export const staticPathScripts = resolve(staticPath, scriptsFolder);
export const staticPathStyles = resolve(staticPath, styleFolder);

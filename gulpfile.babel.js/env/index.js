import { resolve } from 'path';

export { appEnvironment as environment, environment as env } from './transform';
export { argv, isUncss, mode, optimized, production, development } from './args';

export const sourceFolder = 'src';
export const outputFolder = 'dist';

export const styleFolder = 'css';
export const imagesFolder = 'img';
export const staticFolder = 'static';
export const scriptsFolder = 'js';
export const templatesFolder = 'templates';
export const componentsFolder = 'components';

export const rootPath = resolve(process.cwd());
export const sourcePath = resolve(rootPath, sourceFolder);
export const outputPath = resolve(rootPath, outputFolder);
export const staticPath = resolve(outputPath, staticFolder);
export const templatesPath = resolve(sourcePath, templatesFolder);
export const cacheDirectory = resolve(rootPath, '.cache');
export const nodeModulesPath = resolve(rootPath, 'node_modules');
export const imagesCache = resolve(cacheDirectory, 'images');
export const imagesOutput = resolve(staticPath, imagesFolder);
export const staticPathStyles = resolve(staticPath, styleFolder);
export const staticPathScripts = resolve(staticPath, scriptsFolder);
export const staticPathComponents = resolve(staticPath, componentsFolder);

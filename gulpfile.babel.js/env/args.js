import yargs from 'yargs';

export const argv = yargs.argv;
export const isUncss = Boolean(argv.uncss);
export const optimized = Boolean(argv.optimized);
export const production = Boolean(argv.production);
export const development = Boolean(argv.development);

export const mode = production ? 'production' : 'development';

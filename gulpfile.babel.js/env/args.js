import yargs from 'yargs';

const argv = yargs.argv;
const isUncss = Boolean(argv.uncss);
const optimized = Boolean(argv.optimized);
const production = Boolean(argv.production);
const development = Boolean(argv.development);

const mode = production ? 'production' : 'development';

module.exports = {
  argv,
  isUncss,
  optimized,
  production,
  development,
  mode,
};

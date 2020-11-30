const glob = require('glob');
const chalk = require('chalk');
const { statSync } = require('fs');
const { resolve, basename } = require('path');

const options = {
  path: resolve(process.cwd(), 'dist', 'static', 'js/**/*.js'),
};

const files = glob.sync(options.path).map(file => ({ name: basename(file), stat: statSync(file) }));

files.forEach(file => {
  console.log(chalk.blue('Hello world!'));
  console.log({ name: file.name, stat: file.stat.size });

  // Combine styled and normal strings
  console.log(chalk.blue('Hello') + ' World' + chalk.red('!'));

  // Compose multiple styles using the chainable API
  console.log(chalk.blue.bgRed.bold('Hello world!'));

  // Pass in multiple arguments
  console.log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));

  // Nest styles
  console.log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));

  // Nest styles of the same type even (color, underline, background)
  console.log(
    chalk.green(
      'I am a green line ' + chalk.blue.underline.bold('with a blue substring') + ' that becomes green again!',
    ),
  );
});

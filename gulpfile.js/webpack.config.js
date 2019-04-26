const path = require('path');
const TerserPlugin = require('terser-webpack-plugin')

const { rootPath, sourcePath, mode, isProduction, isDevelopment } = require('./env');

const optimizationConfig = {
  minimizer: [
     new TerserPlugin({
      test: /\.js(\?.*)?$/i,
      cache: path.resolve(rootPath, '.cache'),
      parallel: true,
      sourceMap: isDevelopment,
      terserOptions: {
        ecma: 5,
        warnings: false,
        mangle: true, // Note `mangle.properties` is `false` by default.
        module: false,
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_classnames: undefined,
        keep_fnames: false,
        safari10: true,
        compressor: {
          warnings: false,
        },
        parse: {
          html5_comments: false,
        },
        compress: {
          ecma: 5,
          inline: false,
          sequences: true,
          comparisons: true,
          conditionals: true,
          evaluate: true,
          booleans: true,
          loops: true,
          unused: true,
          unsafe: false,
          warnings: false,
          hoist_funs: true,
          if_return: true,
          join_vars: true,
          dead_code: true,
          drop_console: isProduction,
          drop_debugger: isProduction,
          global_defs: {
            DEBUG: false,
          },
          passes: 5,
        },
        output: {
          ecma: 5,
          ascii_only: true,
          comments: false,
          beautify: false,
          indent_level: 0,
        },
      },
    }),
  ],
};

module.exports = {
  mode,
  devtool: isProduction ? false : 'source-map',
  entry: './app.js',
  output: {
    filename: './bundle.js',
    path: path.resolve(sourcePath, 'js'),
  },
  context: path.resolve(sourcePath, 'js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    alias: {
      src: path.resolve(sourcePath, 'js'),
      components: path.resolve(sourcePath, 'js/components'),
    },
    mainFiles: ['index'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  optimization: isProduction ? optimizationConfig : {},
}

const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin')

const mode = process.env.NODE_ENV || 'development';
const isProduction = mode === 'production';
const isDevelopment = mode === 'development';

module.exports = {
  mode,
  devtool: isProduction ? false : 'source-map',
  entry: './app.js',
  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname, 'src/js'),
  },
  context: path.resolve(__dirname, 'src/js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['@babel/preset-env']
        }
      }
    ],
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src/js'),
      components: path.resolve(__dirname, 'src/js/components'),
    },
    mainFiles: ['index'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        cache: path.resolve(__dirname, '.cache'),
        parallel: true,
        sourceMap: isDevelopment,
        terserOptions: {
          ecma: 5,
          warnings: false,
          mangle: true, // Note `mangle.properties` is `false` by default.
          module: false,
          output: null,
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
            drop_console: true,
            drop_debugger: true,
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
  },
}

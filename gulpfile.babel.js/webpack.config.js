import ESBuildPlugin from 'esbuild-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import { resolve } from 'path';

import { mode, production, rootPath, cacheDirectory, staticPathScripts } from './env';
import { scriptsPath } from './config';
import { getEnvironments } from './get-data';

const scriptsSourcePath = resolve(rootPath, scriptsPath);

const optimizationConfig = {
  minimize: true,
  minimizer: [
    new ESBuildPlugin(),
    // new TerserPlugin({
    //   test: /\.js(\?.*)?$/i,
    //   parallel: true,
    //   sourceMap: true,
    //   terserOptions: {
    //     ecma: 5,
    //     warnings: false,
    //     mangle: true, // Note `mangle.properties` is `false` by default.
    //     module: false,
    //     toplevel: false,
    //     nameCache: null,
    //     ie8: false,
    //     keep_classnames: undefined,
    //     keep_fnames: false,
    //     safari10: true,
    //     compressor: {
    //       warnings: false,
    //     },
    //     parse: {
    //       html5_comments: false,
    //     },
    //     compress: {
    //       ecma: 5,
    //       inline: false,
    //       sequences: true,
    //       comparisons: true,
    //       conditionals: true,
    //       evaluate: true,
    //       booleans: true,
    //       loops: true,
    //       unused: true,
    //       unsafe: false,
    //       warnings: false,
    //       hoist_funs: true,
    //       if_return: true,
    //       join_vars: true,
    //       dead_code: true,
    //       drop_console: production,
    //       drop_debugger: production,
    //       global_defs: {
    //         DEBUG: false,
    //       },
    //       passes: 5,
    //     },
    //     output: {
    //       ecma: 5,
    //       ascii_only: true,
    //       comments: false,
    //       beautify: false,
    //       indent_level: 0,
    //     },
    //   },
    // }),
  ],
};

module.exports = {
  mode,
  target: 'web',
  devtool: production ? false : 'source-map',
  entry: './app',
  output: {
    filename: './app.js',
    path: scriptsSourcePath,
  },
  context: scriptsSourcePath,
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: scriptsSourcePath,
        options: {
          configFile: resolve(rootPath, '.eslintrc')
        }
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              name: 'js',
              workerParallelJobs: 50,
              poolRespawn: production,
            }
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory,
            },
          },
        ].filter(Boolean),
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(getEnvironments()),
    }),
  ],
  optimization: production ? optimizationConfig : {},
}

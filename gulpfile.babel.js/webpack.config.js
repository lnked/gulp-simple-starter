import { resolve } from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import TerserPlugin from 'terser-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

import { cacheDirectory, env, production, rootPath, mode } from './env';
import { alias, devtool, entries, scriptsSourcePath } from './tools/helpers';

const { BUNDLE_ANALYZER } = env;

module.exports = {
  mode,
  devtool,
  target: 'web',
  entry: entries.reduce(
    (acc, name) => ({ ...acc, [name.replace(/\.(t|j)s/, '')]: `./${name.replace(/\.(t|j)s/, '')}` }),
    {},
  ),
  output: {
    path: scriptsSourcePath,
    pathinfo: false,
    filename: './[name].js',
    crossOriginLoading: 'anonymous',
  },
  context: scriptsSourcePath,
  module: {
    rules: [
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
            },
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
    alias,
    mainFiles: ['index'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  plugins: [
    // new ESLintPlugin({
    //   cache: true,
    //   ignore: true,
    //   emitWarning: true,
    //   useEslintrc: true,
    //   exclude: [`/node_modules/`],
    //   extensions: ['js', 'jsx', 'ts', 'tsx'],
    //   eslintPath: resolve(rootPath, '.eslintrc.js'),
    //   resolvePluginsRelativeTo: __dirname,
    // }),
    ...(BUNDLE_ANALYZER
      ? [
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: resolve(rootPath, '.cache/report.html'),
          }),
        ]
      : []),
  ],
  ...(production
    ? {
        optimization: {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              parallel: true,
            }),
          ],
        },
      }
    : {}),
};

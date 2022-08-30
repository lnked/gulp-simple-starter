import { resolve } from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import TerserPlugin from 'terser-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import { cacheDirectory, env, production, development, rootPath, mode } from './env';
import { alias, devtool, entries, scriptsSourcePath } from './tools/helpers';

const { BUNDLE_ANALYZER } = env;

export default {
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
              workers: 4,
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
    roots: ['node_modules', scriptsSourcePath],
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    unsafeCache: true,
    preferRelative: true,
    cacheWithContext: true,
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: development,
      typescript: {
        configFile: resolve(rootPath, './tsconfig.json'),
      },
    }),
    new ESLintPlugin({
      files: ['src/**/*.tsx?', 'src/**/*.jsx?'],
      exclude: ['/node_modules/'],
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    ...(BUNDLE_ANALYZER
      ? [
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: resolve(rootPath, '.cache/report.html'),
          }),
        ]
      : []),
  ],
  performance: {
    hints: false,
    assetFilter: (assetFilename) => assetFilename.endsWith('.js'),
  },
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

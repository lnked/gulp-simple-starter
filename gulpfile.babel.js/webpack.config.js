import ESBuildPlugin from 'esbuild-webpack-plugin';
import webpack from 'webpack';
import { resolve } from 'path';

import { mode, production, rootPath, cacheDirectory } from './env';
import { scriptsPath } from './config';
import { getEnvironments } from './get-data';

const scriptsSourcePath = resolve(rootPath, scriptsPath);

const optimizationConfig = {
  minimize: true,
  minimizer: [
    new ESBuildPlugin(),
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
    alias: {
      src: scriptsSourcePath,
      libs: resolve(scriptsSourcePath, 'libs'),
      hooks: resolve(scriptsSourcePath, 'hooks'),
      utils: resolve(scriptsSourcePath, 'utils'),
      tools: resolve(scriptsSourcePath, 'tools'),
      stores: resolve(scriptsSourcePath, 'stores'),
      configs: resolve(scriptsSourcePath, 'configs'),
      services: resolve(scriptsSourcePath, 'services'),
      settings: resolve(scriptsSourcePath, 'settings'),
      components: resolve(scriptsSourcePath, 'components'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(getEnvironments()),
    }),
  ],
  optimization: production ? optimizationConfig : {},
}

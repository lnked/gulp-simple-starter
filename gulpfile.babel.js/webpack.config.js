import { resolve } from 'path';
import webpack from 'webpack';
import ESBuildPlugin from 'esbuild-webpack-plugin';

import { mode, production, rootPath, cacheDirectory } from './env';
import { appEnvironment } from './env/transform';
import { scriptsPath } from './config';

const scriptsSourcePath = resolve(rootPath, scriptsPath);

const optimizationConfig = {
  minimize: true,
  minimizer: [new ESBuildPlugin()],
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
          configFile: resolve(rootPath, '.eslintrc.js'),
        },
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
    mainFiles: ['index'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@libs': resolve(scriptsPath, 'libs'),
      '@hooks': resolve(scriptsPath, 'hooks'),
      '@utils': resolve(scriptsPath, 'utils'),
      '@tools': resolve(scriptsPath, 'tools'),
      '@stores': resolve(scriptsPath, 'stores'),
      '@configs': resolve(scriptsPath, 'configs'),
      '@services': resolve(scriptsPath, 'services'),
      '@settings': resolve(scriptsPath, 'settings'),
      '@components': resolve(scriptsPath, 'components'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(appEnvironment),
    }),
  ],
  optimization: production ? optimizationConfig : {},
};

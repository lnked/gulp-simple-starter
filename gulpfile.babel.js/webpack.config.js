import fs from 'fs';
import { resolve } from 'path';
import webpack from 'webpack';
import ESBuildPlugin from 'esbuild-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { mode, production, rootPath, cacheDirectory, env } from './env';
import { appEnvironment } from './env/transform';
import { scriptsPath } from './config';

const scriptsSourcePath = resolve(rootPath, scriptsPath);

const optimizationConfig = {
  minimize: true,
  minimizer: [new ESBuildPlugin()],
};

const entries = fs.readdirSync(scriptsSourcePath).filter(file => {
  const name = file.toLowerCase();
  const isFile = fs.statSync(resolve(scriptsSourcePath, file)).isFile();

  if (isFile && (name.includes('.js') || name.includes('.ts'))) {
    return true;
  }

  return false;
});

const { SOURCEMAPS_ENABLED } = env;

const devtool = (() => {
  if (production) {
    if (SOURCEMAPS_ENABLED) {
      return 'source-map';
    }

    return false;
  }

  return 'eval-cheap-module-source-map';
})();

const alias = [
  'libs',
  'hooks',
  'utils',
  'tools',
  'types',
  'stores',
  'configs',
  'helpers',
  'services',
  'settings',
  'constants',
  'components',
].reduce(
  (list, path) => ({
    ...list,
    [`@${path}`]: resolve(scriptsPath, path),
  }),
  {},
);

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
    alias,
    mainFiles: ['index'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(appEnvironment),
    }),
    ...((production && [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      }),
    ]) ||
      []),
  ],
  optimization: production ? optimizationConfig : {},
};

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
  devtool: production ? 'source-map' : 'eval-cheap-module-source-map',
  entry: {
    app: './app',
  },
  output: {
    filename: './[name].js',
    path: scriptsSourcePath,
    pathinfo: false,
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
    mainFiles: ['index'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@libs': resolve(scriptsPath, 'libs'),
      '@hooks': resolve(scriptsPath, 'hooks'),
      '@utils': resolve(scriptsPath, 'utils'),
      '@tools': resolve(scriptsPath, 'tools'),
      '@types': resolve(scriptsPath, 'types'),
      '@stores': resolve(scriptsPath, 'stores'),
      '@configs': resolve(scriptsPath, 'configs'),
      '@helpers': resolve(scriptsPath, 'helpers'),
      '@services': resolve(scriptsPath, 'services'),
      '@settings': resolve(scriptsPath, 'settings'),
      '@constants': resolve(scriptsPath, 'constants'),
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

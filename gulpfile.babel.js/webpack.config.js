import webpack from 'webpack';
import { resolve } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

import { mode, production, development, rootPath, cacheDirectory } from './env';
import { scriptsPath } from './config';
import { getEnvironments } from './get-data';

const scriptsSourcePath = resolve(rootPath, scriptsPath);

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(getEnvironments()),
  }),
];

const optimizationConfig = {
  minimizer: [
    new TerserPlugin({
      test: /\.js(\?.*)?$/i,
      cache: cacheDirectory,
      parallel: true,
      sourceMap: development,
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
          drop_console: production,
          drop_debugger: production,
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
}

if (production) {
  plugins.push(
    new CompressionPlugin({
      test: /\.js$/,
      filename: '[path].gz[query]',
      minRatio: 0.8,
      threshold: 8192,
      compressionOptions: {
        level: 9,
        verbose: false,
        verbose_more: false,
        numiterations: 15,
        blocksplitting: true,
        blocksplittingmax: 15,
      },
      deleteOriginalAssets: false,
    }),
  )
}

module.exports = {
  mode,
  devtool: production ? false : 'source-map',
  entry: './app',
  output: {
    filename: './bundle.js',
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
          ...(development && [
            {
              loader: 'cache-loader',
              options: {
                cacheDirectory,
              }
            }
          ]),
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
    mainFiles: ['index'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  plugins,
  optimization: production ? optimizationConfig : {},
}

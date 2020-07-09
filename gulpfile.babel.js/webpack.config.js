const glob = require('glob');
const { resolve } = require('path');
const zopfli = require('@gfx/zopfli');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const { mode, production, development, rootPath, cacheDirectory } = require('./env');
const { scriptsPath } = require('./config');

const scriptsSourcePath = resolve(rootPath, scriptsPath);

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

const plugins = []

if (production) {
  plugins.push(
    new CompressionPlugin({
      test: /\.js$/,
      filename: '[path].gz[query]',
      minRatio: 0.8,
      threshold: 10240,
      compressionOptions: {
        level: 11,
        numiterations: 15,
      },
      algorithm(input, compressionOptions, callback) {
        return zopfli.gzip(input, compressionOptions, callback)
      },
      deleteOriginalAssets: false,
    }),
  )
}

module.exports = {
  mode,
  devtool: production ? false : 'source-map',
  entry: './app.js',
  output: {
    filename: './bundle.js',
    path: scriptsSourcePath,
  },
  context: scriptsSourcePath,
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: scriptsSourcePath,
        options: {
          configFile: resolve(rootPath, '.eslintrc')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory,
        },
      }
    ],
  },
  resolve: {
    alias: {
      src: scriptsSourcePath,
      components: resolve(scriptsSourcePath, 'components'),
    },
    mainFiles: ['index'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  plugins,
  optimization: production ? optimizationConfig : {},
}

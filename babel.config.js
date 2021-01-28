const { resolve } = require('path');

const ROOT_PATH = resolve(__dirname, 'src/scripts');

module.exports = function (api) {
  const development = api.env('development');
  const loose = true;
  const legacy = true;

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
      ['@babel/preset-typescript'],
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: [ROOT_PATH],
          alias: {
            '@libs': resolve(ROOT_PATH, 'libs'),
            '@hooks': resolve(ROOT_PATH, 'hooks'),
            '@utils': resolve(ROOT_PATH, 'utils'),
            '@tools': resolve(ROOT_PATH, 'tools'),
            '@types': resolve(ROOT_PATH, 'types'),
            '@stores': resolve(ROOT_PATH, 'stores'),
            '@configs': resolve(ROOT_PATH, 'configs'),
            '@helpers': resolve(ROOT_PATH, 'helpers'),
            '@services': resolve(ROOT_PATH, 'services'),
            '@settings': resolve(ROOT_PATH, 'settings'),
            '@constants': resolve(ROOT_PATH, 'constants'),
            '@components': resolve(ROOT_PATH, 'components'),
          },
        },
      ],
      ['@babel/plugin-transform-runtime'],
      ['@babel/plugin-transform-async-to-generator'],
      ['@babel/plugin-transform-spread', { loose }],
      ['@babel/plugin-proposal-decorators', { legacy }],
      ['@babel/plugin-proposal-class-properties', { loose }],
      ['@babel/plugin-proposal-optional-chaining', { loose }],
      ['@babel/plugin-transform-template-literals', { loose }],
      ['@babel/plugin-transform-object-assign'],
      ['@babel/plugin-transform-arrow-functions'],
      ['@babel/plugin-transform-typescript'],
      [
        '@babel/plugin-proposal-object-rest-spread',
        {
          useBuiltIns: 'usage',
          loose: true,
        },
      ],
    ],
    comments: development,
  };
};

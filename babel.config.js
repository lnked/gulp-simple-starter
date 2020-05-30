module.exports = function (api) {
  const development = api.env('development');
  const loose = true;
  const legacy = true;

  return {
    presets: [
      ['@babel/preset-env', {
        targets: {
          node: 'current'
        },
      }],
      ['@babel/preset-typescript'],
    ],
    plugins: [
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
      ['@babel/plugin-proposal-object-rest-spread', {
        useBuiltIns: 'usage',
        loose: true,
      }],
    ],
    comments: development,
  }
}

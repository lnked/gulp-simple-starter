module.exports = function (api) {
  const development = api.env('development');

  return {
    presets: [
      '@babel/preset-env',
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-transform-object-assign'],
      ['@babel/plugin-transform-arrow-functions'],
      ['@babel/plugin-proposal-object-rest-spread', {
        useBuiltIns: 'usage',
        loose: true,
      }],
    ],
    comments: development,
  }
}

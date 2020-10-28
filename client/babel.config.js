module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: '> 2%, not dead',
        useBuiltIns: 'usage',
        corejs: '3',
        modules: false,
      },
    ],
    ['@babel/preset-react'],
  ];

  const plugins = [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-transform-async-to-generator'],
    ['@babel/plugin-transform-runtime'],
  ];

  return {
    presets,
    plugins,
  };
};

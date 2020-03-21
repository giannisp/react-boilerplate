module.exports = {
  presets: [
    [
      '@babel/preset-env',
      { targets: { browsers: ['last 2 versions'] }, modules: false },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ],
};

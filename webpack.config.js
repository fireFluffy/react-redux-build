function buildConfig(env) {
  return require(`./${process.env.NODE_ENV ||
    'development'}.webpack.config.js`);
}

module.exports = buildConfig;

function buildConfig(env) {
  return require(`./${process.env.NODE_ENV ||
    'development'}.webpack.config.js`)({env});
}

module.exports = buildConfig;

/* config-overrides.js */
module.exports = function override(config, env) {
  if (
    config.module.rules[0] &&
    config.module.rules[0].use[0].loader.includes('eslint-loader')
  ) {
    config.module.rules.splice(0, 1)
  }
  return config
}

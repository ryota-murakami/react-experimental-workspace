/* config-overrides.js */
const rewireStyledComponents = require('react-app-rewire-styled-components')
const { injectBabelPlugin } = require('react-app-rewired')

module.exports = function override(config, env) {
  config = injectBabelPlugin('emotion', config)
  config = rewireStyledComponents(config, env, {
    ssr: false,
    displayName: true
  })

  return config
}

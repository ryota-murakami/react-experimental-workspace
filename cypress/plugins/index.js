// eslint-disable-next-line @typescript-eslint/no-var-requires
const injectDevServer = require('@cypress/react/plugins/react-scripts')

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
module.exports = (on, config) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('@cypress/react/plugins/react-scripts')(on, config)
  // IMPORTANT to return the config object
  // with the any changed environment variables

  if (config.testingType === 'component') {
    injectDevServer(on, config)
  }

  return config // IMPORTANT to return a config
}

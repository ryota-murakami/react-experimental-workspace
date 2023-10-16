const path = require('path')
const fs = require('fs')

/**
 *
 * @type {import('plop').PlopGenerator}
 */
module.exports = {
  description: 'Pages Generator',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'page name',
    },
  ],
  actions: () => {
    return [
      {
        type: 'add',
        path: 'src/pages/{{properCase name}}/index.tsx',
        templateFile: 'generators/pages/index.tsx.hbs',
      },
    ]
  },
}

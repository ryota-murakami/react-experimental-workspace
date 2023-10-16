/**
 *
 * @type {import('plop').PlopGenerator}
 */
module.exports = {
  actions: () => {
    return [
      {
        path: 'src/pages/{{properCase name}}/index.tsx',
        templateFile: 'generators/pages/index.tsx.hbs',
        type: 'add',
      },
    ]
  },
  description: 'Pages Generator',
  prompts: [
    {
      name: 'name',
      message: 'page name',
      type: 'input',
    },
  ],
}

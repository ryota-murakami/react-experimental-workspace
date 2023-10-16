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
      {
        path: 'src/pages/index.jsx',
        pattern: /(.*)(<main>[\s\S]*)(<\/main>)/m,
        template:
          '$1$2    <Link to="/{{lowerCase name}}">{{properCase name}}</Link>\n$3',
        type: 'modify',
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

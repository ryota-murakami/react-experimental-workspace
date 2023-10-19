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
        path: 'src/pages/Suggestion.jsx',
        pattern: /(.*)(<main>[\s\S]*)(<\/main>)/m,
        template:
          '$1$2  <Link to="/{{lowerCase name}}">{{properCase name}}</Link>\n$3',
        type: 'modify',
      },
      {
        path: 'src/Routes.tsx',
        pattern: /(const Routes = \(\) => {)/,
        template:
          "const {{properCase name}} = lazy(async () => import('./pages/{{properCase name}}'));\n\n$1",
        type: 'modify',
      },
      {
        path: 'src/Routes.tsx',
        pattern: /(<Route element={<NotFound \/>\} \/>)\n\s*<\/Routes>/g,
        template:
          '<Route path="/{{lowerCase name}}" element={<{{properCase name}} />} />\n$1\n        </Routes>',
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

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
        path: 'src/pages/index.tsx',
        pattern: /(const EXPERIMENTS = \[[\s\S]*?)(] as const)/m,
        template:
          "$1  { path: '/{{lowerCase name}}', label: '{{properCase name}}' },\n$2",
        type: 'modify',
      },
      {
        path: 'src/Routes.tsx',
        pattern: /(const AppRoutes = \(\) => {)/,
        template:
          "const {{properCase name}} = lazy(async () => import('./pages/{{properCase name}}'));\n\n$1",
        type: 'modify',
      },
      {
        path: 'src/Routes.tsx',
        pattern:
          /(.*)(<Route path="\*" element={<NotFound \/>} \/>\s*<\/Routes>)/s,
        template:
          '$1<Route path="/{{lowerCase name}}" element={<{{properCase name}} />} />\n$2',
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

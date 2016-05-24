module.exports = function (plop) {
  // create your generators here
  plop.setGenerator('basics', {
    description: 'Generate ng2 component',
    prompts: [
      {
        type: 'input',
        name: 'path',
        message: 'src/app/[..target-folder..]',
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your component?',
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/app/{{path}}{{name}}.ts',
        templateFile: 'plop-templates/component.ts',
      },
      {
        type: 'add',
        path: 'src/app/{{path}}{{name}}.jade',
        templateFile: 'plop-templates/component.jade',
      },
      {
        type: 'add',
        path: 'src/app/{{path}}{{name}}.scss',
        templateFile: 'plop-templates/component.scss',
      }
    ]
  });
};
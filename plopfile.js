module.exports = function (plop) {
  // create your generators here
  plop.setGenerator('Component', {
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

  plop.setGenerator('Model', {
    description: 'Generate ng2 model',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your model?',
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/app/models/{{name}}.ts',
        templateFile: 'plop-templates/model.ts',
      }
    ]
  });

  plop.setGenerator('Service', {
    description: 'Generate ng2 service',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your service?',
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/app/services/{{name}}.ts',
        templateFile: 'plop-templates/service.ts',
      }
    ]
  });
};
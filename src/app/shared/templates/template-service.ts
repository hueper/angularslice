export const TemplateService = {
  files: [
    {
      extension: 'ts',
      template:
`import { Injectable } from '@angular/core';

@Injectable()
export class {{properCase name}}Service {
  constructor() {

  }
}`,
    },
  ]
};

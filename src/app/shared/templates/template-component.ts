export const TemplateComponent = {
  files: [
    {
      extension: 'html',
      template: `<div class="{{name}}"></div>`,
    },
    {
      extension: 'css',
      template:
`.{{name}} {
}`,
    },
    {
      extension: 'ts',
      template:
`import { Component } from '@angular/core';

@Component({
  selector: '{{name}}',
  template: require('./{{name}}.jade')(),
  styles: [ require('./{{name}}.scss') ],
  providers: [],
  pipes: [],
  directives: [],
})
export class {{properCase name}}Component {

  constructor() {

  }

}`,
    },
  ]
};

export const TemplateComponent = {
  files: [
    {
      extension: 'html',
      template: `<div class="{{name}}"></div>`,
    },
    {
      extension: 'scss',
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
  templateUrl: './{{name}}.html')(),
  styleUrls: [ './{{name}}.scss') ],
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

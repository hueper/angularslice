

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

}
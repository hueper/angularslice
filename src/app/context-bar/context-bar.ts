import { Component } from '@angular/core';

@Component({
  selector: 'context-bar',
  template: require('./context-bar.jade')(),
  styles: [ require('./context-bar.scss') ],
  providers: [],
  pipes: [],
  directives: [],
})
export class ContextBarComponent {

  constructor() {

  }

}
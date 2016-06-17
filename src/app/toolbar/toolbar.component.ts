import { Component } from "@angular/core";

@Component({
  selector: 'toolbar',
  template: require('./toolbar.component.jade')(),
  styles: [require('./toolbar.component.scss')]
})
export class ToolbarComponent {

  constructor() {
  }
}

import { Injectable, ViewContainerRef, ComponentFactory, Injector } from '@angular/core'
import { TooltipContainerComponent } from "../directives/tooltip/tooltip-component/tooltip-container.component";


@Injectable()
export class TooltipService {
  public viewContainer: ViewContainerRef = null;
  constructor() {
  }

  showTooltip(componentFactory: ComponentFactory<TooltipContainerComponent>,
              binding: Injector) {
    let cRef = this.viewContainer.createComponent(componentFactory, -1, binding);
    return cRef;
  }
}

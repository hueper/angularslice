import {
  Directive, Input, HostListener,
  ComponentRef, Provider, ReflectiveInjector, ViewContainerRef, ComponentResolver, Injector, ApplicationRef
  
} from '@angular/core';

import { TooltipOptions } from './tooltip-options.class';
import { TooltipContainerComponent } from './tooltip-component';
import { TooltipService } from "../../services/tooltip.service";

@Directive({ selector: '[tooltip]' })
export class TooltipDirective {
  /* tslint:disable */
  @Input('tooltip') public content: string;
  @Input('tooltipPlacement') public placement: string = 'top';
  @Input('tooltipIsOpen') public isOpen: boolean;
  @Input('tooltipEnable') public enable: boolean = true;
  @Input('tooltipAnimation') public animation: boolean = true;
  @Input('tooltipAppendToBody') public appendToBody: boolean = true;
  @Input('tooltipFollowCursor') public followCursor: boolean = false;
  /* tslint:enable */
  
  private visible: boolean = false;
  private tooltip: Promise<ComponentRef<any>>;
  private cRef: ComponentRef<TooltipContainerComponent>;
  public constructor(public viewContainerRef: ViewContainerRef,
                     protected tooltipService: TooltipService,
                     protected app: ApplicationRef,
                     protected injector: Injector,
                     protected ComponentResolver: ComponentResolver) {
  }

  @HostListener('focusin', ['$event', '$target'])
  @HostListener('mouseenter', ['$event', '$target'])
  public show(): void {
    if (this.visible || !this.enable) {
      return;
    }
    this.visible = true;
    let options = new TooltipOptions({
      content: this.content,
      placement: this.placement,
      animation: this.animation,
      appendToBody: this.appendToBody,
      followCursor: this.followCursor,
      hostEl: this.viewContainerRef.element
    });
    
    let binding = ReflectiveInjector.resolveAndCreate([
      new Provider(TooltipOptions, { useValue: options })
    ], this.injector);
    
    this.tooltip = this.ComponentResolver.resolveComponent(TooltipContainerComponent).then(componentFactory => {
      // let cRef = this.viewContainerRef.createComponent(componentFactory, -1, binding);
      // return cRef;
      this.cRef = this.tooltipService.showTooltip(componentFactory, binding)
      return this.cRef;
    });
  }
  
  @HostListener('mousemove', ["$event", "$target"])
  move(event, target) {
    if (this.followCursor !== true || this.visible !== true) {
      return;
    }
    // this.cRef.instance.top: event.clientX;
    
    console.log("event => ", event);
  }
  
  // params event, target
  @HostListener('focusout', ['$event', '$target'])
  @HostListener('mouseleave', ['$event', '$target'])
  public hide(): void {
    if (!this.visible) {
      return;
    }
    this.visible = false;
    this.tooltip.then((componentRef: ComponentRef<TooltipContainerComponent>) => {
      componentRef.instance.beforeDestroy();
      setTimeout(() => {
        componentRef.destroy();
      }, 400);
      return componentRef;
    });
  }
}

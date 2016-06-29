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
  @Input('tooltipEnable') public enable: string = 'true';
  @Input('timeout') public timeout: number = 0;
  @Input('tooltipAppendToBody') public appendToBody: boolean = true;
  @Input('tooltipFollowCursor') public followCursor: boolean = false;
  /* tslint:enable */
  
  private visible: boolean = false;
  private tooltip: Promise<ComponentRef<any>>;
  private cRef: ComponentRef<TooltipContainerComponent>;
  
  private destroyTimeout: any;
  
  public constructor(public viewContainerRef: ViewContainerRef,
                     protected tooltipService: TooltipService,
                     protected app: ApplicationRef,
                     protected injector: Injector,
                     protected ComponentResolver: ComponentResolver) {
    
  }
  
  @HostListener('focusin', ['$event', '$target'])
  @HostListener('mouseenter', ['$event', '$target'])
  public show(): void {
    
    if (this.visible || !this.enable || this.enable == 'falsegit ') {
      return;
    }
    if (this.destroyTimeout || this.cRef) {
      clearTimeout(this.destroyTimeout);
      return;
    }
    this.visible = true;
    let options = new TooltipOptions({
      content: this.content,
      placement: this.placement,
      appendToBody: this.appendToBody,
      followCursor: this.followCursor,
      hostEl: this.viewContainerRef.element
    });
    
    let binding = ReflectiveInjector.resolveAndCreate([
      new Provider(TooltipOptions, { useValue: options })
    ], this.injector);
    this.tooltip = this.ComponentResolver.resolveComponent(TooltipContainerComponent).then(componentFactory => {
      this.cRef = this.tooltipService.showTooltip(componentFactory, binding)
      return this.cRef;
    });
  }
  
  @HostListener('mousemove', ["$event", "$target"])
  move(event, target) {
    if (!this.followCursor || !this.visible || !this.cRef) {
      return;
    }
    if (this.destroyTimeout) {
      clearTimeout(this.destroyTimeout);
    }
    
    this.cRef.instance.top = (event.clientY - 20) + 'px';
    this.cRef.instance.left = (event.clientX + 25) + 'px';
  }
  
  // params event, target
  @HostListener('focusout', ['$event', '$target'])
  @HostListener('mouseleave', ['$event', '$target'])
  public hide(): void {
    console.log("this.timeout => ", this.timeout);
    if (!this.visible) {
      return;
    }
    this.tooltip.then((componentRef: ComponentRef<TooltipContainerComponent>) => {
      this.destroyTimeout = setTimeout(() => {
        componentRef.destroy();
        this.cRef = null;
        this.visible = false;
        this.destroyTimeout = false;
      }, Math.max(50, this.timeout * 1000));
      return componentRef;
    });
  }
}

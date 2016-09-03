import {
  Directive, Input, HostListener,
  ComponentRef, Provider, ReflectiveInjector, ViewContainerRef, ComponentFactoryResolver, Injector, ApplicationRef
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
                     protected injector: Injector,
                     protected ComponentFactoryResolver: ComponentFactoryResolver,
                     protected tooltipService: TooltipService) {
  }

  @HostListener('focusin', ['$event', '$target'])
  @HostListener('mouseenter', ['$event', '$target'])
  public show(): void {

    if (this.visible || !this.enable || this.enable == 'false') {
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

    let componentFactory = this.ComponentFactoryResolver.resolveComponentFactory(TooltipContainerComponent);

    this.tooltip = new Promise((resolve, reject) => {
      this.cRef = this.tooltipService.showTooltip(componentFactory, binding);
      resolve(this.cRef);
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

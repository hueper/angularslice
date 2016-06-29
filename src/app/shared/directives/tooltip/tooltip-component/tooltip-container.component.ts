import * as _ from 'lodash';
import {
  Component,
  ChangeDetectorRef,
  ElementRef,
  Inject,
  AfterViewInit,
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes, ApplicationRef, HostListener
  
} from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

import { TooltipOptions } from '../tooltip-options.class';

import { positionService } from '../PositionService';

@Component({
  selector: 'tooltip-container',
  directives: [NgClass, NgStyle],
  template: require('./tooltip-container.component.jade')(),
  styles: [require('./tooltip-container.component.scss')]
})
export class TooltipContainerComponent implements AfterViewInit {
  private classMap: any;
  public top: string = '0';
  public left: string = '0';
  private display: string = 'block';
  private content: string;
  private placement: string = 'left';
  private popupClass: string;
  private animation: boolean;
  private isOpen: boolean;
  private appendToBody: boolean;
  private followCursor: boolean;
  private hostEl: ElementRef;
  private state: string;
  
  private element: ElementRef;
  private cdr: ChangeDetectorRef;
  
  public constructor(element: ElementRef,
                     @Inject(TooltipOptions) options: TooltipOptions) {
    this.element = element;
    _.assign(this, options);
    this.classMap = { 'in': false, 'fade': false };
    this.classMap[options.placement] = true;
    this.classMap['tooltip-' + options.placement] = true;
  }
  
  public ngAfterViewInit(): void {
    let p = positionService
      .positionElements(
        this.hostEl.nativeElement,
        this.element.nativeElement.children[0],
        this.placement, this.appendToBody);
    if (!this.followCursor) {
      this.top = p.top + 'px';
      this.left = p.left + 'px';
    }
    
    this.state = 'in';
    
  }
  
  
  @HostListener('mousemove', ["$event", "$target"])
  move(event, target) {
    if (!this.followCursor) {
      return;
    }
    
    this.top = (event.clientY - 22) + 'px';
    this.left = (event.clientX + 25) + 'px';
    
  }
}

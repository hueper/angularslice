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
  keyframes, ApplicationRef
  
} from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

import { TooltipOptions } from '../tooltip-options.class';

import { positionService } from '../PositionService';

@Component({
  selector: 'tooltip-container',
  directives: [NgClass, NgStyle],
  template: require('./tooltip-container.component.jade')(),
  styles: [require('./tooltip-container.component.scss')],
  animations: [
    trigger('state', [
      state('in', style({ transform: 'scale(1)' })),
      transition('void => *', [
        animate(200, keyframes([
          style({ opacity: 0, transform: 'scale(0)', offset: 0 }),
          style({ opacity: 1, transform: 'scale(1.2)', offset: 0.3 }),
          style({ opacity: 1, transform: 'scale(1)', offset: 1.0 })
        ]))
      ]),
      transition('* => out', [
        animate(200, keyframes([
          style({ opacity: 1, transform: 'scale(1)', offset: 0 }),
          style({ opacity: 1, transform: 'scale(0.3)', offset: 0.7 }),
          style({ opacity: 0, transform: 'scale(0)', offset: 1.0 })
        ]))
      ])
    ])
  ]
})
export class TooltipContainerComponent implements AfterViewInit {
  private classMap: any;
  private top: string = '0';
  private left: string = '0';
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
                     cdr: ChangeDetectorRef,
                     @Inject(TooltipOptions) options: TooltipOptions) {
    this.element = element;
    this.cdr = cdr;
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
    
    this.cdr.detectChanges();
  }
  
  
  public beforeDestroy(): any {
    this.state = 'out';
    this.cdr.detectChanges();
  }
}

import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[fieldMovable]'
})
export class MovableDirective {

  constructor(private el: ElementRef) {
  }

  @Input() fieldItem = null;
  private isStartMoving: boolean = false;
  private isMoving: boolean = false;
  private startMovingCoords: { x: number, y: number } = null;
  private mouseElementDev: { x: number, y: number } = null;

  @HostListener('mousedown', ['$event'])onMouseDoun(event: MouseEvent) {
    if (event.which != 1)return;

    this.fieldItem.isSelected = true;

    this.isStartMoving = true;
    this.startMovingCoords = {x: event.pageX, y: event.pageY};
    this.mouseElementDev = {
      x: event.pageX - this.fieldItem.left,
      y: event.pageY - this.fieldItem.top
    }
  }

  @HostListener('mousemove', ['$event'])onMouseMove(event: MouseEvent) {
    if (!this.isStartMoving)return;

    if (Math.abs(this.startMovingCoords.x - event.pageX) +
      Math.abs(this.startMovingCoords.y - event.pageY) > 2) {
      this.fieldItem.left = event.pageX - this.mouseElementDev.x;
      this.fieldItem.top = event.pageY - this.mouseElementDev.y;
    }
  }

  @HostListener('window:mouseup')onMouseUp() {
    this.isStartMoving = this.isMoving = false;
    this.startMovingCoords = null;
    this.mouseElementDev = null;
  }

}

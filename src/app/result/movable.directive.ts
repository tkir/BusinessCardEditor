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
  private movingCoords: { x: number, y: number } = null;

  @HostListener('mousedown', ['$event'])onMouseDoun(event: MouseEvent) {
    console.log(event);
    if (event.which != 1)return;

    this.fieldItem.isSelected = true;

    this.isStartMoving = true;
    this.startMovingCoords = {x: event.pageX, y: event.pageY};
  }

  @HostListener('mousemove', ['$event'])onMouseMove(event: MouseEvent) {
    if (!this.isStartMoving)return;

    this.movingCoords = {x: event.pageX, y: event.pageY};
    if (Math.abs(this.startMovingCoords.x - this.movingCoords.x) +
      Math.abs(this.startMovingCoords.y - this.movingCoords.y) > 2) {
      this.fieldItem.left += this.startMovingCoords.x - this.movingCoords.x;
      this.fieldItem.top += this.startMovingCoords.y - this.movingCoords.y;
    }
  }

  @HostListener('window:mouseup')onMouseUp() {
    // this.fieldItem.isSelected = false;
    this.isStartMoving = this.isMoving = false;
    this.startMovingCoords = null;
    this.movingCoords = null;
  }

}

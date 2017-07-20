import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[fieldMovable]'
})
export class MovableDirective implements OnInit {
  ngOnInit(): void {
    this.maxCoords = {
      x: this.el.nativeElement.parentElement.offsetWidth - 10,
      y: this.el.nativeElement.parentElement.offsetHeight - 10
    }

    this.minCoords = {
      x: 10,
      y: 10
    }
  }

  constructor(private el: ElementRef) {
  }

  @Input() fieldItem = null;
  private isStartMoving: boolean = false;
  private startMovingCoords: { x: number, y: number } = null;
  private mouseElementDev: { x: number, y: number } = null;

  private maxCoords: { x: number, y: number } = null;
  private minCoords: { x: number, y: number } = null;


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

    //check random deviations more then 2px
    if (Math.abs(this.startMovingCoords.x - event.pageX) +
      Math.abs(this.startMovingCoords.y - event.pageY) > 2) {

      this.updateofsetOffset(event.pageX - this.mouseElementDev.x, event.pageY - this.mouseElementDev.y)
    }
  }

  //checking is field in card bounds & update card offsets
  private updateofsetOffset(pageX: number, pageY: number) {

    if (pageX < this.minCoords.x || pageX > this.maxCoords.x - this.el.nativeElement.offsetWidth) {
      pageX = pageX < this.minCoords.x ? this.minCoords.x : this.maxCoords.x - this.el.nativeElement.offsetWidth;
    }

    if (pageY < this.minCoords.y || pageY > this.maxCoords.y - this.el.nativeElement.offsetHeight) {
      pageY = pageY < this.minCoords.y ? this.minCoords.y : this.maxCoords.y - this.el.nativeElement.offsetHeight;
      ;
    }

    if (this.fieldItem.left != pageX) this.fieldItem.left = pageX;
    if (this.fieldItem.top != pageY) this.fieldItem.top = pageY;
  }

  @HostListener('window:mouseup')onMouseUp() {
    this.isStartMoving = false;
    this.startMovingCoords = null;
    this.mouseElementDev = null;
  }

}

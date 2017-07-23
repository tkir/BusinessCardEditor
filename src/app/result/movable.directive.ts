import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {CardField} from "../data/interfaces";

interface MovEl {
  item: CardField;
  dev: { x: number, y: number };
  max: { x: number, y: number };
  min: { x: number, y: number };
}

@Directive({
  selector: '[fieldMovable]'
})
export class MovableDirective implements OnInit {

  @Input() dataArr = [];

  selectedItems: MovEl[] = [];
  private startMovingCoords: { x: number, y: number } = null;

  //set indents
  //TODO перенести в config
  private k = 7;
  private polygraphPadding = 5;
  private indent: number = 0;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.indent = this.polygraphPadding * this.k;
  }

  //return max element position
  private getMax(item:CardField, element): { x: number, y: number } {
    switch (item.instanceOf) {
      case 'Logo':
      case 'Text':
        return {
          x: this.el.nativeElement.offsetWidth - this.indent - parseInt(getComputedStyle(element).width),
          y: this.el.nativeElement.offsetHeight - this.indent - parseInt(getComputedStyle(element).height)
        };
      case 'Line':
        return {
          x: this.el.nativeElement.offsetWidth - parseInt(getComputedStyle(element).width),
          y: this.el.nativeElement.offsetHeight - parseInt(getComputedStyle(element).height)
        }
    }
  }

  //return min element position
  private getMin(item:CardField, element): { x: number, y: number } {
    switch (item.instanceOf) {
      case 'Logo':
      case 'Text':
        return {
          x: this.indent,
          y: this.indent
        };
      case 'Line':
        return {
          x: 0,
          y: 0
        }
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    if (event.which != 1)return;

    //is click out of item
    if (this.el.nativeElement == event.target) {

      //skip selection
      this.selectedItems = [];
      this.dataArr.forEach((item:CardField) => item.isSelected = false);

      return;
    }

    this.startMovingCoords = {x: event.pageX, y: event.pageY};

    //find .card-field
    let target = event.target;
    while (target != this.el.nativeElement) {
      if (target.classList.contains('card-field'))break;
      target = target.parentElement;
    }

    //find item in dataArr by offset
    let left = parseInt(getComputedStyle(target).left);
    let top = parseInt(getComputedStyle(target).top);

    let item:CardField = this.dataArr.find((it:CardField) => it.left == left && it.top == top);
    if (!item)return;

    //multiselection
    if (!event.ctrlKey && !event.metaKey && !event.shiftKey) {
      this.multiselection(item);
    }

    this.updateSelectionArray(item, target, event)
  }

  private multiselection(item:CardField) {
    let isMulti = false;
    this.selectedItems.forEach(obj => {
      if (obj.item == item) isMulti = true;
    });
    if (!isMulti) {
      this.selectedItems = [];
      this.dataArr.forEach((item:CardField) => item.isSelected = false);
    }
  }

  //set item selected, add to selection array
  private updateSelectionArray(item:CardField, target: Element, event: MouseEvent) {
    item.isSelected = true;

    let isDublingItems = false;
    this.selectedItems.forEach(obj => {
      if (obj.item == item)
        isDublingItems = true;
    });
    if (!isDublingItems)
      this.selectedItems.push({
        item: item,
        dev: {
          x: event.pageX - item.left,
          y: event.pageY - item.top
        },
        max: this.getMax(item, target),
        min: this.getMin(item, target)
      });
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.startMovingCoords)return;

    //check random deviations more then 2px
    if (Math.abs(this.startMovingCoords.x - event.pageX) +
      Math.abs(this.startMovingCoords.y - event.pageY) > 2) {

      this.selectedItems.forEach((it:MovEl) => this.updateOffset(it, event));

    }
  }

  //checking is field in card bounds & update card offsets
  private updateOffset(it: MovEl, event) {

    let pageX = event.pageX - it.dev.x;
    let pageY = event.pageY - it.dev.y;

    if (pageX < it.min.x || pageX > it.max.x) {
      pageX = pageX < it.min.x ? it.min.x : it.max.x;
    }

    if (pageY < it.min.y || pageY > it.max.y) {
      pageY = pageY < it.min.y ? it.min.y : it.max.y;
    }

    if (it.item.left != pageX) it.item.left = pageX;
    if (it.item.top != pageY) it.item.top = pageY;
  }

  @HostListener('window:mouseup')
  onMouseUp() {
    this.startMovingCoords = null;
  }

}

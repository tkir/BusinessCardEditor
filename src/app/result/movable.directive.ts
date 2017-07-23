import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[fieldMovable]'
})
export class MovableDirective implements OnInit {

  @Input() dataArr = [];

  selectedItems = [];
  private startMovingCoords: { x: number, y: number } = null;
  private maxCoords: { x: number, y: number } = null;
  private minCoords: { x: number, y: number } = null;

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

  updateLimits() {
    this.maxCoords = {
      x: this.el.nativeElement.offsetWidth - this.indent,
      y: this.el.nativeElement.offsetHeight - this.indent
    };

    this.minCoords = {
      x: this.indent,
      y: this.indent
    };
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    if (event.which != 1)return;

    this.updateLimits();

    //is click out of item
    if (this.el.nativeElement == event.target) {

      //skip selection
      this.selectedItems = [];
      this.dataArr.forEach(item => item.isSelected = false);

      return;
    }

    this.startMovingCoords = {x: event.pageX, y: event.pageY};

    //find item in dataArr by offset
    let left = parseInt(getComputedStyle(event.target.parentElement).left);
    let top = parseInt(getComputedStyle(event.target.parentElement).top);

    let item = this.dataArr.find(it => it.left == left && it.top == top);
    if (!item)return;

    //multiselection
    if (!event.ctrlKey && !event.metaKey && !event.shiftKey) {
      this.multiselection(item);
    }

    this.updateSelectionArray(item, event)
  }

  private multiselection(item) {
    let isMulti = false;
    this.selectedItems.forEach(obj => {
      if (obj.item == item) isMulti = true;
    });
    if (!isMulti) {
      this.selectedItems = [];
      this.dataArr.forEach(item => item.isSelected = false);
    }
  }

  //set item selected, add to selection array
  private updateSelectionArray(item, event) {
    item.isSelected = true;

    let isDublingItems = false;
    this.selectedItems.forEach(obj => {
      if (obj.item == item)
        isDublingItems = true;
    });
    if (!isDublingItems)
      this.selectedItems.push({
        item: item,
        element: event.target.parentElement,
        devX: 0,
        devY: 0
      });

    //add deviation with mouse to all selected items
    this.selectedItems.forEach(it => {
      it.devX = event.pageX - it.item.left;
      it.devY = event.pageY - it.item.top;
    });
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.startMovingCoords)return;

    //check random deviations more then 2px
    if (Math.abs(this.startMovingCoords.x - event.pageX) +
      Math.abs(this.startMovingCoords.y - event.pageY) > 2) {

      this.selectedItems.forEach(it => this.updateOffset(it, event));

    }
  }

  //checking is field in card bounds & update card offsets
  private updateOffset(it, event) {

    let pageX = event.pageX - it.devX;
    let pageY = event.pageY - it.devY;
    let maxX = this.maxCoords.x - parseInt(getComputedStyle(it.element).width);
    let maxY = this.maxCoords.y - parseInt(getComputedStyle(it.element).height);

    if (pageX < this.minCoords.x || pageX > maxX) {
      pageX = pageX < this.minCoords.x ? this.minCoords.x : maxX;
    }

    if (pageY < this.minCoords.y || pageY > maxY) {
      pageY = pageY < this.minCoords.y ? this.minCoords.y : maxY;
    }

    if (it.item.left != pageX) it.item.left = pageX;
    if (it.item.top != pageY) it.item.top = pageY;
  }

  @HostListener('window:mouseup')
  onMouseUp() {
    this.startMovingCoords = null;
  }

}

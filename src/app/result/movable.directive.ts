import {
  AfterViewInit,
  ComponentFactoryResolver, Directive, ElementRef, HostListener, Input, OnInit, Type, ViewChild,
  ViewContainerRef
} from '@angular/core';

import {CardField} from "../data/interfaces";
import {AddResizeDirective} from "./add-resize.directive";
import {FieldResizeComponent} from "./field-resize/field-resize.component";
import {ResultComponent} from "./result.component";
import {getMax, getMin, MovEl, updateOffset} from '../utils/size.util';
import {Background} from "../data/Background";


@Directive({
  selector: '[fieldMovable]'
})
export class MovableDirective implements OnInit {

  @Input() dataArr = [];
  @Input() card: ResultComponent = null;
  private background:Background=null;

  selectedItems: MovEl[] = [];
  private startMovingCoords: { x: number, y: number } = null;
  private startResizing = false;

  constructor(private el: ElementRef,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    this.background=this.dataArr.find((field: CardField) => field.instanceOf == 'Background');
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    if (event.which != 1)return;

    //is click out of item
    if (this.el.nativeElement == event.target) {

      //skip selection
      this.selectedItems = [];
      this.dataArr.forEach((item: CardField) => item.isSelected = false);

      return;
    }

    //find .card-field
    let target: Element = event.target;
    while (target != this.el.nativeElement) {
      if (target.classList.contains('card-field'))break;

      //если нажали на fieldResize
      if (target.tagName == 'CARD-FIELD-RESIZE') {
        this.startResizing = true;
        this.resizeComponent.fieldResize.updateMax();
        return;
      }

      target = target.parentElement;
    }

    this.startMovingCoords = {x: event.pageX, y: event.pageY};


    //find item in dataArr by offset
    let left = parseInt(getComputedStyle(target).left);
    let top = parseInt(getComputedStyle(target).top);

    let item: CardField = this.dataArr.find((it: CardField) => it.left == left && it.top == top);
    if (!item)return;

    //multiselection
    if (!event.ctrlKey && !event.metaKey && !event.shiftKey) {
      this.multiselection(item);
    }

    this.updateSelectionArray(item, target, event)
  }

  private multiselection(item: CardField) {
    let isMulti = false;
    this.selectedItems.forEach(obj => {
      if (obj.item == item) isMulti = true;
    });
    if (!isMulti) {
      this.selectedItems = [];
      this.dataArr.forEach((item: CardField) => item.isSelected = false);
    }
  }

  //set item selected, add to selection array
  private updateSelectionArray(item: CardField, target: Element, event: MouseEvent) {
    item.isSelected = true;

    let isDublingItems = false;
    this.selectedItems.forEach(obj => {
      if (obj.item == item) {
        obj.dev = {
          x: event.pageX - item.left,
          y: event.pageY - item.top
        };
        obj.max = getMax(item.instanceOf, target,this.background);
        obj.min = getMin(item.instanceOf, target,this.background);

        isDublingItems = true;
      }
    });
    if (!isDublingItems)
      this.selectedItems.push({
        item: item,
        elem: target,
        dev: {
          x: event.pageX - item.left,
          y: event.pageY - item.top
        },
        max: getMax(item.instanceOf, target,this.background),
        min: getMin(item.instanceOf, target,this.background)
      });
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    //ресайз элемента
    if (this.startResizing && this.resizeComponent.fieldResizeRef) {
      this.resizeComponent.fieldResize.resize(event);
      return;
    }


    if (!this.startMovingCoords)return;

    //check random deviations more then 2px
    if (Math.abs(this.startMovingCoords.x - event.pageX) +
      Math.abs(this.startMovingCoords.y - event.pageY) > 2) {

      this.selectedItems.forEach((it: MovEl) => updateOffset(it, event));

    }
  }

  //checking is field in card bounds & update card offsets


  @HostListener('window:mouseup')
  onMouseUp() {
    this.startMovingCoords = null;
    if (this.startResizing)
      this.startResizing = false;

    //проверяем: не мультиселект, нет fieldResize, ели есть но другой элемент - удаляем старый добавляем новый
    if (this.selectedItems.length == 1) {
      if (!this.resizeComponent.fieldResizeRef)
        this.addResize(this.selectedItems[0].item, this.selectedItems[0].elem);
      else {
        if (this.resizeComponent.item != this.selectedItems[0].item) {
          this.removeResize();
          this.addResize(this.selectedItems[0].item, this.selectedItems[0].elem);
        }
      }
    }
    else this.removeResize();
  }

  //работаем с fieldResize
  private resizeComponent: {
    fieldResizeRef: any
    item: CardField,
    fieldResize: FieldResizeComponent
  } = {
    fieldResizeRef: null,
    item: null,
    fieldResize: null
  }
  private fieldResizeComponent: Type<any> = FieldResizeComponent;

  //вставляем fieldResize
  private addResize(item, elem: Element) {
    let target = elem.querySelector('[cardAddResize]');

    //если поле не resizable
    //или полю уже добавлено fieldResize
    if (!target || target.getElementsByTagName('CARD-FIELD-RESIZE').length)return;

    this.resizeComponent.item = item;
    let resizable: AddResizeDirective = this.card.addResizeDirectives.find(
      (dir: AddResizeDirective) => dir.viewContainerRef.element.nativeElement == target);
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.fieldResizeComponent);
    this.resizeComponent.fieldResizeRef = resizable.viewContainerRef.createComponent(componentFactory);
    this.resizeComponent.fieldResize = <FieldResizeComponent>this.resizeComponent.fieldResizeRef.instance;
    this.resizeComponent.fieldResize.init(item, target, this.dataArr.find((field: CardField) => field.instanceOf == 'Background'));
  }

  //удаляем fieldResize
  private removeResize() {
    if (this.resizeComponent.fieldResizeRef) {
      this.resizeComponent.fieldResizeRef.destroy();
      this.resizeComponent.fieldResizeRef = null;
      this.resizeComponent.item = null;
      this.resizeComponent.fieldResize = null;
    }
  }

}

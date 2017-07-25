import {Component, HostBinding, HostListener, Input, OnInit} from '@angular/core';
import {getCoords} from "../../utils/size.util";
import {CardField} from "../../data/interfaces";
import {Line} from "../../data/Line";

@Component({
  selector: 'card-field-resize',
  templateUrl: './field-resize.component.html',
  styleUrls: ['./field-resize.component.css'],
  host: {
    '[style.left.px]': 'elPos.x',
    '[style.top.px]': 'elPos.y',
    '[style.cursor]': 'cursor'
  }
})
export class FieldResizeComponent implements OnInit {

  @Input() item: CardField = null;
  @Input() el: Element = null;
  temp = '10px';
  elPos: { x: number, y: number } = {x: 0, y: 0};

  constructor() {
  }

  ngOnInit() {
  }

  init(item, el) {
    this.item = item;
    this.el = el;

    this.updatePosition();
  }

  get cursor(): string {
    switch (this.item.instanceOf) {
      case 'Logo':
        return 'nw-resize';
      case 'Line':
        return (<Line>this.item).isHorizontal ? 'e-resize' : 's-resize'
    }
  }

  private updatePosition() {
    this.elPos = {
      x: this.item.width,
      y: this.item.height
    };
  }

  resize(event: MouseEvent) {

    let coords = getCoords(this.item, this.el);

    this.item.width += event.pageX - coords.right;
    this.item.height += event.pageY - coords.bottom;

    this.updatePosition();
  }

}

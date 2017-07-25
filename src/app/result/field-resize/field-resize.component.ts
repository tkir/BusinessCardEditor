import {Component} from '@angular/core';

import {getCoords} from "../../utils/size.util";
import {CardField} from "../../data/interfaces";
import {Line} from "../../data/Line";
import {Background} from "../../data/Background";

@Component({
  selector: 'card-field-resize',
  templateUrl: './field-resize.component.html',
  styleUrls: ['./field-resize.component.css'],
  host: {
    '[style.left.px]': 'this.item.width',
    '[style.top.px]': 'this.item.height',
    '[style.cursor]': 'cursor'
  }
})
export class FieldResizeComponent {

  private item: CardField = null;
  private el: Element = null;
  private background: Background = null;
  private max: { x: number, y: number } = null;

  constructor() {
  }

  init(item, el, background) {
    this.item = item;
    this.el = el;
    this.background = background;

    this.max = this.getMaxSize();
  }

  get cursor(): string {
    switch (this.item.instanceOf) {
      case 'Logo':
        return 'nw-resize';
      case 'Line':
        return (<Line>this.item).isHorizontal ? 'e-resize' : 's-resize'
    }
  }

  resize(event: MouseEvent) {

    let coords = getCoords(this.item, this.el);

    if (this.item.width < this.max.x || event.pageX - coords.right < 0)
      if (this.item.width > 0 || event.pageX - coords.right > 0)
        this.item.width += event.pageX - coords.right;


    if (this.item.height < this.max.y || event.pageY - coords.bottom < 0)
      if (this.item.height > 0 || event.pageY - coords.bottom > 0)
        this.item.height += event.pageY - coords.bottom;
  }

  private getMaxSize(): { x: number, y: number } {
    switch (this.item.instanceOf) {
      case 'Line':
        return {
          x: this.background.width,
          y: this.background.height
        };
      case 'Logo':
      default:
        return {
          x: this.background.width - (2 * this.background.indent),
          y: this.background.height - (2 * this.background.indent)
        };
    }
  }

}

import {CardField} from "./interfaces";
export class Line implements CardField {

  constructor(public left: number,
              public top: number,
              public width: number,
              public height: number,
              public isHorizontal: boolean = true,
              public design: string = 'solid',
              public _color: string = '000') {
  }

  public isSelected: boolean = false;

  get instanceOf(): string {
    return 'Line';
  }

  get color(): string {
    return `#${this._color.replace('#', '')}`;
  }

  get style() {
    let direction = this.isHorizontal ? 'top' : 'right';
    let size = this.isHorizontal ? 'width' : 'height';

    let _style = {};
    _style[`border-${direction}-style`] = this.design;
    _style[`border-${direction}-width.px`] = this.design == 'double' ? this.height + 2 : this.height;
    _style[`border-${direction}-color`] = this.color;
    _style[`${size}.px`] = this.width;
    _style['margin'] = 0;

    return _style;
  }
}

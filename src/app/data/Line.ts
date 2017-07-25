import {CardField} from "./interfaces";
import {getMaxSize} from "../utils/size.util";
export class Line implements CardField {

  constructor(public left: number,
              public top: number,
              public length_mm: number,
              public _thickness: number,
              public isHorizontal: boolean = true,
              public design: string = 'solid',
              public _color: string = '000') {
  }

  //TODO to config
  private k = 7;
  public isSelected: boolean = false;

  get thickness() {
    return this.design == 'double' ? this._thickness + 2 : this._thickness
  }

  set thickness(val) {
    this._thickness = val;
  }

  get width() {
    return this.isHorizontal ? this.length_mm * this.k : 0;
  }

  set width(val) {
    if (this.isHorizontal)
      this.length_mm = val / this.k;
  }

  get height() {
    return this.isHorizontal ? 0 : this.length_mm * this.k
  }

  set height(val) {
    if (!this.isHorizontal)
      this.length_mm = val / this.k;
  }

  get instanceOf(): string {
    return 'Line';
  }

  get color(): string {
    return `#${this._color.replace('#', '')}`;
  }

  get style() {
    let direction = this.isHorizontal ? 'top' : 'right';

    let _style = {};
    _style[`border-${direction}-style`] = this.design;
    _style[`border-${direction}-width.px`] = this.thickness;
    _style[`border-${direction}-color`] = this.color;
    this.isHorizontal ?
      _style['width.px'] = this.width :
      _style['height.px'] = this.height;
    _style['margin'] = 0;

    return _style;
  }

  public onChangeBgSize(bg: { width, height, indent }) {
    let max = getMaxSize(this.instanceOf, bg);
    if (this.width > max.x) this.width = max.x;
    if (this.height > max.y) this.height = max.y;
  }
}

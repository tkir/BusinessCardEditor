import {CardField} from "./interfaces";

export class Text implements CardField {

  constructor(public text: string,
              public fontFamily: string,
              public fontSize_mm: number,
              public fontWeight: string,
              public fontStyle: string,
              public textDecoration: string,
              public textAlign: string,
              public colorStr: string,
              public left: number,
              public top: number) {
  }

  //TODO to config
  private k = 7;
  public isSelected: boolean = false;
  public isStyling: boolean = false;
  public div: Element = null;


  get style() {
    return {
      'font-family': this.fontFamily,
      'font-size.px': this.fontSize,
      'font-weight': this.fontWeight,
      'font-style': this.fontStyle,
      'text-decoration': this.textDecoration,
      'text-align': this.textAlign,
      'color': this.color
    }
  }

  get fontSize(): number {
    return this.fontSize_mm * this.k;
  }

  set fontSize(val: number) {
    this.fontSize_mm = val / this.k;
  }

  get color(): string {
    return `#${this.colorStr}`
  }

  get instanceOf(): string {
    return 'Text';
  }

  //для выравнивания
  get middle(): number {
    return this.left + Math.round(parseInt(getComputedStyle(this.div).width) / 2);
  }

  set middle(val) {
    this.left += val - this.middle;
  }

  get right(): number {
    return this.left + parseInt(getComputedStyle(this.div).width);
  }

  set right(val) {
    this.left += val - this.right;
  }

  get width() {
    return 0;
  }

  set width(val) {
  }

  get height() {
    return 0;
  }

  set height(val) {
  }
}

import {CardField} from "./interfaces";
import {ReflectiveInjector} from '@angular/core';
import {AppConfigService} from "../services/app-config.service";

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

  private k: number;
  private fontSizeStep: number;

  public isSelected: boolean = false;
  public isStyling: boolean = false;
  public div: Element = null;

  public setConstants(config) {
    this.k = config.get('ratio');
    this.fontSizeStep = config.get('fontSizeStep');
  }

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

  changeFontSize(dir: string) {
    if (dir == 'increase') this.fontSize_mm += this.fontSizeStep;
    if (dir == 'decrease') this.fontSize_mm -= this.fontSizeStep;
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

  get fontName(): string {
    return this.fontFamily;
  }

  set fontName(val) {
    this.fontFamily = val;
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

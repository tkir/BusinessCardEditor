import {CardField} from "./interfaces";
export class Line implements CardField {

  constructor(public left: number,
              public top: number,
              public width: number,
              public height:number,
              public isHorizontal: boolean = true,
              public _design: number = 0,
              public _color: string = '000') {
  }

  public isSelected: boolean = false;

  get design() {
    return `style${this._design}`;
  }

  get instanceOf(): string {
    return 'Line';
  }

  get style() {
    return {
      'background-color': `#${this._color.replace('#', '')}`,
      'width.px': this.width,
      'height.px': this.height
    };
  }
}

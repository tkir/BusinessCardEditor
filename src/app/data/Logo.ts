import {CardField} from "./interfaces";
import {getMaxSize} from "../utils/size.util";
export class Logo implements CardField {

  constructor(public src: string,
              public width: number,
              public height: number,
              public left: number,
              public top: number) {
  }

  public isSelected: boolean;
  public dataType: string;
  private _maxWidth: number;
  private _maxHeight: number;

  get style() {
    return {
      'width.px': this.width,
      'height.px': this.height,
      'background-image': `url(${this.src})`,
      'background-size': 'cover'
    };
  }

  public setMaxSize(maxWidth, maxHeight) {
    this._maxWidth = maxWidth * 0.8;
    this._maxHeight = maxHeight * 0.8;
  }

  get maxWidth(): number {
    return this._maxWidth;
  }

  get maxHeight(): number {
    return this._maxHeight;
  }

  get instanceOf(): string {
    return 'Logo';
  }

  public onChangeBgSize(bg:{width, height, indent}) {
    let max = getMaxSize(this.instanceOf, bg);
    if (this.width > max.x) this.width = max.x;
    if (this.height > max.y) this.height = max.y;
  }
}

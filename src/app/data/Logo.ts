import {CardField} from "./interfaces";
import {getMaxPosition, getMaxSize} from "../utils/size.util";

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

  public onChangeBgSize(bg: { width, height, indent }) {
    let maxSize = getMaxSize(this.instanceOf, bg);
    if (this.width > maxSize.x) this.width = maxSize.x;
    if (this.height > maxSize.y) this.height = maxSize.y;

    let maxPosition = getMaxPosition(this.instanceOf, {width: this.width, height: this.height}, bg);
    if (maxPosition.x < this.left) this.left = maxPosition.x;
    if (maxPosition.y < this.top) this.top = maxPosition.y;
  }
}

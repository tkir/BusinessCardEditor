export class Background {

  public dataType: string;

  constructor(obj) {
    Object.keys(obj).forEach(key => this[key] = obj[key]);
  }

  public _backgroundColor: string;
  public src: string;
  public width_mm: number;
  public height_mm: number;

  private k: number;
  private polygraphPadding: number;

  public setConstants(config) {
    this.k = config.get('ratio');
    this.polygraphPadding = config.get('polygraphPadding');
  }

  get indent(): number {
    return this.polygraphPadding * this.k;
  }

  get style() {
    return {
      'background-color': `#${this._backgroundColor.replace('#', '')}`,
      'background-image': `url('${this.src}')`,
      'background-repeat': 'no-repeat',
      'background-size': 'cover',
      'width.px': this.width,
      'height.px': this.height
    };
  }

  get width(): number {
    return this.width_mm * this.k;
  }

  get height(): number {
    return this.height_mm * this.k;
  }

  get backgroundColor() {
    return `#${this._backgroundColor.replace('#', '')}`;
  }

  get maxWidth(): number {
    return this.width;
  }

  get maxHeight(): number {
    return this.height;
  }

  get instanceOf(): string {
    return 'Background';
  }

  get json() {
    return {
      backgroundColor: this.backgroundColor,
      src: this.src,
      width_mm: this.width_mm,
      height_mm: this.height_mm
    }
  }

  get designData() {
    return {
      _backgroundColor: this._backgroundColor,
      src: this.src,
      width_mm: this.width_mm,
      height_mm: this.height_mm
    }
  }
}

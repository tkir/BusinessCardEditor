export class Background {

  public width: number;
  public height: number;
  public dataType: string;

  constructor(public _backgroundColor: string,
              public src: string,
              public width_mm: number,
              public height_mm: number) {
  }

  //TODO вынести в config
  private k: number = 7;

  get style() {
    return {
      'background-color': `#${this._backgroundColor.replace('#', '')}`,
      'background-image': `url(${this.src})`,
      'background-repeat': 'no-repeat',
      'width.px': this.width_mm * this.k,
      'height.px': this.height_mm * this.k
    };
  }

  get maxWidth(): number {
    return this.width_mm * this.k;
  }

  get maxHeight(): number {
    return this.height_mm * this.k;
  }

  get backgroundColor(){
    return `#${this._backgroundColor.replace('#', '')}`;
  }

  get instanceOf():string{
    return 'Background';
  }
}

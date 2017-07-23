export class Background {
  constructor(public color: string,
              public url: string,
              public width_mm: number,
              public height_mm: number) {
  }

  //TODO вынести в config
  private k: number = 7;

  get style() {
    return {
      'background-color': `#${this.color.replace('#', '')}`,
      'background-image': `url(${this.url})`,
      'width.px': this.width_mm * this.k,
      'height.px': this.height_mm * this.k
    };
  }

  get size(): { x: any, y: any } {
    return {
      x: this.width_mm * this.k,
      y: this.height_mm * this.k
    }
  }
}

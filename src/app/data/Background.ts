export class Background {
  constructor(public color: string,
              public url: string) {
  }

  get style() {
    return {
      'background-color': `#${this.color.replace('#', '')}`,
      'background-image': `url(${this.url})`
    };
  }
}

export class TextField {
  text: string;
  fontFamily: string;
  fontSize_mm: number;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  color: string;
  left_mm: number;
  top_mm: number;

  getSpanStyle(k: number) {
    return `
      font-family: ${this.fontFamily};
      font-size: ${this.fontSize_mm * k}px;
      font-weight: ${this.fontWeight};
      font-style: ${this.fontStyle};
      text-decoration: ${this.textDecoration};
      color: ${this.color};
    `;
  }

  getDivStyle(k: number, z: number) {
    return `
      left: ${this.left_mm * k}px;
      top: ${this.top_mm * k}px;
      z-index: ${z};
    `;
  }
}

export class Logo {
  src: string;
  width_mm: number;
  height_mm: number;
  left_mm: number;
  top_mm: number;

  getDivStyle(k: number, z: number) {
    return `
      width: ${this.width_mm * k}px;
      height: ${this.height_mm * k}px;
      background-image: url(${this.src});
      background-size: cover;
      left: ${this.left_mm * k}px;
      top: ${this.top_mm * k}px;
      position: relative;
      z-index: ${z-100};
    `
  }
}

export class Line {
  left_mm: number;
  top_mm: number;
  length_mm: number;
  thickness: number;
  isHorizontal: boolean;
  design: string;
  color: string;

  getDivStyle(k: number, z: number) {
    let direction = this.isHorizontal ? 'top' : 'right';

    let style = `
      border-${direction}-style: ${this.design};
      border-${direction}-width.px: ${this.thickness}px;
      border-${direction}-color: ${this.color};
      position: relative;
      margin: 0;
    `;
    if (this.isHorizontal)
      style += `
        width: ${Math.round(this.length_mm) * k}px;
      `;
    else style += `
        height: ${Math.round(this.length_mm) * k}px;
      `;

    return style;
  }
}

export class Background {
  backgroundColor: string;
  src: string;
  width_mm: number;
  height_mm: number;

  getDivStyle(k: number, z: number) {
    return `
      width: ${this.width_mm * k}px;
      height: ${this.height_mm * k}px;
      background-image: url(${this.src});
      background-color: ${this.backgroundColor};
      background-size: cover;
      position: absolute;
    `
  }
}

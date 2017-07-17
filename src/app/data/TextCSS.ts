export class Text {
  constructor(public text: string,
              public fontFamily: string,
              public fontSize: number,
              public fontWeight: string,
              public fontStyle: string,
              public textDecoration: string,
              public textAlign: string) {
  }

  public getStyle(): string {
    return `font-family=${this.fontFamily};
    font-size=${this.fontSize}px;
    font-weight=${this.fontWeight};
    font-style=${this.fontStyle};
    text-decoration=${this.textDecoration};
    text-align=${this.textAlign}`;
  }
}
;

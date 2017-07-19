export class Text {

  constructor(public text: string,
              public fontFamily: string,
              public fontSize: number,
              public fontWeight: string,
              public fontStyle: string,
              public textDecoration: string,
              public textAlign: string,
              public left: number,
              public top: number) {
  }

  get style() {
    return {
      'font-family': this.fontFamily,
      'font-size.px': this.fontSize,
      'font-weight': this.fontWeight,
      'font-style': this.fontStyle,
      'text-decoration': this.textDecoration,
      'text-align': this.textAlign
    }
  }
}

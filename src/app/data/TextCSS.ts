import {DomSanitizer} from '@angular/platform-browser';

export class Text {
  public sanitizer: DomSanitizer = null;

  constructor(public text: string,
              public fontFamily: string,
              public fontSize: number,
              public fontWeight: string,
              public fontStyle: string,
              public textDecoration: string,
              public textAlign: string,) {
  }


  get style() {
    return this.sanitizer ?
      this.sanitizer.bypassSecurityTrustStyle(`
        font-family:${this.fontFamily};
        font-size:${this.fontSize}px;
        font-weight:${this.fontWeight};
        font-style:${this.fontStyle};
        text-decoration:${this.textDecoration};
        text-align:${this.textAlign}`) :
      null;
  }
}

import {DomSanitizer} from "@angular/platform-browser";
export class Logo{
  constructor(public src:string,
  public width:number,
  public height:number,
  public left:number,
  public top:number){}

  public sanitizer: DomSanitizer = null;

  get style() {
    return {'width':this.width, 'height':this.height};
  }
}

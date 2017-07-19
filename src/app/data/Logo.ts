import {DomSanitizer} from "@angular/platform-browser";
export class Logo{
  constructor(public src:string,
  public width:number,
  public height:number,
  public left:number,
  public top:number){}

  get style() {
    return {'width.px':this.width, 'height.px':this.height};
  }
}

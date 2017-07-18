import {DomSanitizer} from "@angular/platform-browser";
export class Background{
  constructor(public _src:string){}

  public sanitizer: DomSanitizer = null;

  set src(_src:any){this._src=_src;}
  get src():any{
    return this.sanitizer?
      this.sanitizer.bypassSecurityTrustStyle(this._src):
      null;
  }
}

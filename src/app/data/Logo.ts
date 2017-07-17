export class Logo{
  constructor(public src:string,
  public width:number,
  public height:number,
  public left:number,
  public top:number){}

  public getLogoStyle():string{
    return `width=${this.width}; height=${this.height}; left=${this.left}; top=${this.top}`;
  }
}

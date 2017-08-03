import {Logo} from "./Logo";
import {Background} from "./Background";
import {TextField} from "./TextField";
import {Line} from "./Line";
import {CardFieldsData} from "./interfaces";

export class CardData {
  constructor(public owners: TextField[],
              public positions: TextField[],
              public organisations: TextField[],
              public addresses: TextField[],
              public phones: TextField[],
              public emails: TextField[],
              public sites: TextField[],
              public logos: Logo[],
              public lines: Line[],
              public background: Background) {
    this.update();
  }

  private fields=[];

  public update(){
    Object.keys(this).forEach(key =>{
      if (Array.isArray(this[key]))
        this.fields.push(...this[key]);
      else this.fields.push(this[key]);
    });

    this.updateSize();
  }

  onChangeBgSize(){
    this.fields.forEach(field=>{
      if(field.instanceOf=='Text' || field.instanceOf=='Logo' || field.instanceOf=='Line')
        field.onChangeBgSize(this.background);
    })
  }

  public setConstants(config) {
    this.fields.forEach(field=>field.setConstants(config));
  }

  private updateSize(){
    this.logos.forEach(logo => logo.setMax(this.background.width, this.background.height));
  }

  public getFieldsData():CardFieldsData{
    return new CardFieldsData(
      this.owners.map(txt=>txt.text),
      this.positions.map(txt=>txt.text),
      this.organisations.map(txt=>txt.text),
      this.addresses.map(txt=>txt.text),
      this.phones.map(txt=>txt.text),
      this.emails.map(txt=>txt.text),
      this.sites.map(txt=>txt.text),
      this.logos.map(logo=>logo.src),
    );
  }
}



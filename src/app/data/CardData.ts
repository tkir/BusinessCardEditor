import {Logo} from "./Logo";
import {Background} from "./Background";
import {Text} from "./TextCSS";
import {Line} from "./Line";

export class CardData {
  constructor(public owners: Text[],
              public positions: Text[],
              public organisations: Text[],
              public addresses: Text[],
              public phones: Text[],
              public emails: Text[],
              public sites: Text[],
              public logos: Logo[],
              public lines: Line[],
              public background: Background) {
  }

  public setConstants(config) {
    let fields=[];
    Object.keys(this).forEach(key =>{
      if (Array.isArray(this[key]))
        fields.push(...this[key]);
      else fields.push(this[key]);
    });

    fields.forEach(field=>field.setConstants(config));
  }
}

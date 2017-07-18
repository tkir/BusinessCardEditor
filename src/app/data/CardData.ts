import {Logo} from "./Logo";
import {Background} from "./Background";
import {Text} from "./TextCSS";
import {DomSanitizer} from "@angular/platform-browser";

export class CardData {
  constructor(public owners: Text[],
              public positions: Text[],
              public organisations: Text[],
              public addreses: Text[],
              public phones: Text[],
              public emails: Text[],
              public sites: Text[],
              public logos: Logo[],
              public background: Background) {
  }

  public sanitizeAll(sanitizer:DomSanitizer){
    Object.keys(this).map(key=> this[key] instanceof Background?
      this[key].sanitizer=sanitizer:
      this[key].forEach(one=>one.sanitizer=sanitizer));
  }
}

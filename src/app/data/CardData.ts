import {Logo} from "./Logo";
import {Background} from "./Background";
import {Text} from "./TextCSS";

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
}

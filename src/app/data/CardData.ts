import {Logo} from "./Logo";
import {Background} from "./Background";
import {Text} from "./TextCSS";

export class CardData {
  constructor(public owner: Text,
              public position: Text,
              public organisation: Text,
              public address: Text,
              public phone: Text,
              public email: Text,
              public site: Text,
              public logo: Logo,
              public background: Background) {
  }
}

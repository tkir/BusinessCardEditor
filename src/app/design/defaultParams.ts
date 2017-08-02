import { CardData,
  BgDesign, CardDesignData, CardFieldsData, LineDesign, LogoDesign, TextDesign
} from "../data/CardData";
import {Text} from "../data/TextCSS";
import {Logo} from "../data/Logo";
import {Background} from "../data/Background";
import {Line} from "../data/Line";

export const cardFieldsData:CardFieldsData=new CardFieldsData(
  ["James Howlett"],
  ["Logan"],
  ["Marvel Entertainment LLC"],
  ["New York, NY, USA"],
  ["+(1212)576-400-00"],
  ["marvelsubs@midtowncomics.com"],
  ["marvel.com"],
  ["https://upload.wikimedia.org/wikipedia/commons/6/69/Marvel_Cinematic_Universe_Logo.png"]
);

export const cardDesignData:CardDesignData=new CardDesignData(
  [new TextDesign("Open Sans", 2.2, "bold", "normal", "none", "left", '00f', 30, 0)],
  [new TextDesign("Open Sans", 1.2, "normal", "normal", "none", "left", '000', 30, 3)],
  [new TextDesign("Open Sans", 1.2, "bold", "normal", "none", "left", '000', 30, 6)],
  [new TextDesign("Open Sans", 1.2, "normal", "normal", "none", "left", '000', 30, 9)],
  [new TextDesign("Open Sans", 1.2, "normal", "normal", "none", "left", '000', 30, 12)],
  [new TextDesign("Open Sans", 1.2, "normal", "normal", "none", "left", '000', 30, 15)],
  [new TextDesign("Open Sans", 1.2, "normal", "normal", "none", "left", '000', 30, 18)],
  [new LogoDesign(22, 10, 1.5, 1.5)],
  [new LineDesign(0, 30, 45, 1, true, 'solid', '00f')],
  new BgDesign('#f5f5dc', '', 85, 55)
);

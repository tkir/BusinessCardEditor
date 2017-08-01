import {CardData} from "../data/CardData";
import {Text} from "../data/TextCSS";
import {Logo} from "../data/Logo";
import {Background} from "../data/Background";
import {Line} from "../data/Line";

export const cardData: CardData = new CardData(
  [new Text("James Howlett", "Open Sans", 2.2, "bold", "normal", "none", "left", '00f', 30, 0)],
  [new Text("Logan", "Open Sans", 1.2, "normal", "normal", "none", "left", '000', 30, 3)],
  [new Text("Marvel Entertainment LLC", "Open Sans", 1.2, "bold", "normal", "none", "left", '000', 30, 6)],
  [new Text("New York, NY, USA", "Open Sans", 1.2, "normal", "normal", "none", "left", '000', 30, 9)],
  [new Text("+(1212)576-400-00", "Open Sans", 1.2, "normal", "normal", "none", "left", '000', 30, 12)],
  [new Text("marvelsubs@midtowncomics.com", "Open Sans", 1.2, "normal", "normal", "none", "left", '000', 30, 15)],
  [new Text("marvel.com", "Open Sans", 1.2, "normal", "normal", "none", "left", '000', 30, 18)],
  [new Logo("https://upload.wikimedia.org/wikipedia/commons/6/69/Marvel_Cinematic_Universe_Logo.png", 22, 10, 1.5, 1.5)],
  [new Line(0, 30, 45, 1, true, 'solid', '00f')],
  new Background('#f5f5dc', '', 85, 55)
);

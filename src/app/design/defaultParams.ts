import {CardData} from "../data/CardData";
import {Text} from "../data/TextCSS";
import {Logo} from "../data/Logo";
import {Background} from "../data/Background";

export const cardData: CardData = new CardData(
  [new Text("James Howlett", "Open Sans", 16, "bold", "normal", "none", "left", '00f', 200, 0)],
  [new Text("Logan", "Open Sans", 10, "normal", "normal", "none", "left", '000', 200, 20)],
  [new Text("Marvel Entertainment LLC", "Open Sans", 10, "bold", "normal", "none", "left", '000', 200, 40)],
  [new Text("New York, NY, USA", "Open Sans", 10, "normal", "normal", "none", "left", '000', 200, 60)],
  [new Text("+(1212)576-400-00", "Open Sans", 10, "normal", "normal", "none", "left", '000', 200, 80)],
  [new Text("marvelsubs@midtowncomics.com", "Open Sans", 10, "normal", "normal", "none", "left", '000', 200, 100)],
  [new Text("marvel.com", "Open Sans", 10, "normal", "normal", "none", "left", '000', 200, 120)],
  [new Logo("https://upload.wikimedia.org/wikipedia/commons/6/69/Marvel_Cinematic_Universe_Logo.png", 150, 70, 10, 10)],
  new Background('#f5f5dc', '', 85, 55)/* 85x55 mm */
);

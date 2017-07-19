import {CardData} from "../data/CardData";
import {Text} from "../data/TextCSS";
import {Logo} from "../data/Logo";
import {Background} from "../data/Background";

export const cardData:CardData=new CardData(
  [new Text("James Howlett", "Open Sans", 16, "bold", "normal", "none", "left", 100, 0)],
  [new Text("Logan", "Open Sans", 10, "normal", "normal", "none", "left", 100, 20)],
  [new Text("Marvel Entertainment LLC", "Open Sans", 10, "bold", "normal", "none", "left", 100, 40)],
  [new Text("New York, NY, USA", "Open Sans", 10, "normal", "normal", "none", "left", 100, 60)],
  [new Text("+(1212)576-400-00", "Open Sans", 10, "normal", "normal", "none", "left", 100, 80)],
  [new Text("marvelsubs@midtowncomics.com", "Open Sans", 10, "normal", "normal", "none", "left", 100, 100)],
  [new Text("marvel.com", "Open Sans", 10, "normal", "normal", "none", "left", 100, 120)],
  [new Logo("./logoDef.jpg", 100, 100, 20, 20)],
  new Background('#f5f5dc', '')
);

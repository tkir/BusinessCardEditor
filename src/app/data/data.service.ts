import {Injectable} from '@angular/core';
import {CardData} from "./CardData";
import {cardData} from "../design/defaultParams";

@Injectable()
export class DataService {

  constructor() {
  }

  public getCardData(design?: string): CardData {
    switch (design) {
      default:
        return cardData;
    }
  }
}

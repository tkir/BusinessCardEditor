import {Injectable} from '@angular/core';
import {CardData} from "./CardData";
import {cardData} from "../design/defaultParams";
import {Store} from "./store";

@Injectable()
export class DataService {

  constructor(private store: Store) {
  }

  updateCard(state): CardData {
    state.logos.forEach(logo => logo.setMaxSize(cardData.background.maxWidth, cardData.background.maxHeight));
    let currentState = state;
    return this.store.state = currentState;
  }

  public setCardData(design?: string) {
    switch (design) {
      default:
        this.updateCard(cardData);
    }
  }
}

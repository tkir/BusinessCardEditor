import {Injectable} from '@angular/core';
import {CardData} from "./CardData";
import {cardData} from "../design/defaultParams";
import {Store} from "./store";
import {AppConfigService} from "../services/app-config.service";

@Injectable()
export class DataService {

  constructor(private store: Store, private config:AppConfigService) {
  }

  updateCard(state): CardData {
    state.logos.forEach(logo => logo.setMaxSize(cardData.background.width, cardData.background.height));
    let currentState = state;
    return this.store.state = currentState;
  }

  public setCardData(design?: string) {
    switch (design) {
      default:
        cardData.setConstants(this.config.get('ratio'), this.config.get('fontSizeStep'));
        this.updateCard(cardData);
    }
  }
}

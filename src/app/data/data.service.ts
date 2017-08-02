import {Injectable} from '@angular/core';
import {CardData, cardFactory} from "./CardData";
import {cardData, cardDesignData, cardFieldsData} from "../design/defaultParams";
import {Store} from "./store";
import {AppConfigService} from "../services/app-config.service";

@Injectable()
export class DataService {

  constructor(private store: Store, private config: AppConfigService) {
    this.cData = cardFactory(cardFieldsData, cardDesignData, this.config);
    console.log(this.cData);
  }

  private cData;

  updateCard(state): CardData {
    state.logos.forEach(logo => logo.setMaxSize(cardData.background.width, cardData.background.height));
    let currentState = state;
    return this.store.state = currentState;
  }

  public setCardData(design?: string) {
    switch (design) {
      default:
        this.updateCard(this.cData);
    }
  }
}

import {Injectable} from '@angular/core';
import {CardData, cardFactory} from "./CardData";
import {cardDesignData, cardFieldsData} from "../design/defaultParams";
import {Store} from "./store";
import {AppConfigService} from "../services/app-config.service";
import {NavigationStart, Router} from "@angular/router";
import {DesignService} from "../services/design.service";

@Injectable()
export class DataService {

  constructor(private store: Store,
              private config: AppConfigService,
              private router: Router,
              private designService: DesignService) {

    let designs = this.config.get('allowedDesigns');
    router.events.subscribe((val: any) => {
      if (NavigationStart.prototype.isPrototypeOf(val)) {
        let url = val.url[0] == '/' ? val.url.slice(1) : val.url;
        if (url === '') url = 'default';
        if (designs.indexOf(url) !== -1) {
          this.designService.getDesign(url)
            .subscribe(d => {
              this.cData = cardFactory(cardFieldsData, d, this.config);
              this.setCardData();
            });
        }
      }
    });

    this.cData = cardFactory(cardFieldsData, cardDesignData, this.config);
  }

  private cData;

  updateCard(state): CardData {
    state.logos.forEach(logo => logo.setMaxSize(this.cData.background.width, this.cData.background.height));
    let currentState = state;
    currentState.setConstants(this.config);
    return this.store.state = currentState;
  }

  public setCardData(design?: string) {
    this.updateCard(this.cData);
  }
}

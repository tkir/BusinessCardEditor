import {Injectable} from '@angular/core';
import {CardData, cardFactory} from "./CardData";
import {cardDesignData, cardFieldsData} from "../design/defaultParams";
import {Store} from "./store";
import {AppConfigService} from "../services/app-config.service";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {DesignService} from "../services/design.service";
import {FieldsDataService} from "../services/fields-data.service";

@Injectable()
export class DataService {

  constructor(private store: Store,
              private config: AppConfigService,
              private router: Router,
              private designService: DesignService,
              private fDataService: FieldsDataService) {

    let designs = this.config.get('allowedDesigns');

    //вариант с router events
    router.events.subscribe((val: any) => {
      if (NavigationStart.prototype.isPrototypeOf(val)) {
        let url = val.url[0] == '/' ? val.url.slice(1) : val.url;
        if (url === '') url = 'default';
        if (designs.indexOf(url) !== -1) {
          this.designService.getDesign(url)
            .subscribe(d => {
              //проверка, есть ли какие-то данные в карте, если нет - загружаем default fieldsData
              if (this.isDesignLoad)
                this.setCardData(d, this.cData.getFieldsData());
              else
                this.fDataService.getFieldsData()
                  .subscribe(fData => this.setCardData(d, fData));
            });
        }
      }
    });
  }

  private cData: CardData;
  public isDesignLoad = false;

  updateCard(state): CardData {
    state.logos.forEach(logo => logo.setMaxSize(this.cData.background.width, this.cData.background.height));
    let currentState = state;
    currentState.setConstants(this.config);
    return this.store.state = currentState;
  }

  public setCardData(design?, fieldsData?) {
    this.cData = cardFactory(fieldsData || cardFieldsData, design || cardDesignData, this.config);
    this.isDesignLoad = true;
    this.updateCard(this.cData);
  }
}

import {Injectable} from '@angular/core';
import {CardData} from "./CardData";
import {cardData} from "../design/defaultParams";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';

@Injectable()
export class DataService {

  constructor() {
  }

  public getCardData(design?: string): Observable<CardData> {
    switch (design) {
      default:
        return Observable.of(cardData);
    }
  }
}

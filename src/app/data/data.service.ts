import {Injectable} from '@angular/core';
import {CardData} from "./CardData";
import {cardData} from "../design/defaultParams";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {Subject} from "rxjs/Subject";

@Injectable()
export class DataService {

  private cardSubject:Subject<CardData>=new Subject();
  private cardData$=this.cardSubject.asObservable();

  constructor() {
  }

  public getCardData(design?: string): Observable<CardData> {
    switch (design) {
      default:
        return Observable.of(cardData);
    }
  }

  public getCardData2(design?: string): Observable<CardData> {
    switch (design) {
      default:
        this.updateCard(cardData);
        return this.cardData$;
    }
  }

  public updateCard(newCard:CardData){
    this.cardSubject.next(newCard);
  }
}

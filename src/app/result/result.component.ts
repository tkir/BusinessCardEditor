import {Component, OnDestroy, OnInit} from '@angular/core';

import {DataService} from "../data/data.service";
import {CardData} from "../data/CardData";
import {Subscription} from "rxjs/Subscription";
import {Store} from "../data/store";

@Component({
  selector: 'card-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnDestroy {

  constructor(private dataService: DataService,
              private store: Store) {
  }

  cardData: CardData = null;
  dataArr = [];
  private subscription: Subscription;

  ngOnInit() {
    this.dataService.setCardData();
    this.subscription = this.store.changes
      .subscribe((cardData: any) => {
        this.cardData = cardData;
        this.dataArr=[];
        Object.keys(this.cardData).forEach(key => {
          if (Array.isArray(this.cardData[key]))
            this.dataArr.push(...this.cardData[key]);
          else this.dataArr.push(this.cardData[key])
        });
      });
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}

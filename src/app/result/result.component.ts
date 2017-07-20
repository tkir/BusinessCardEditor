import {Component, OnInit} from '@angular/core';

import {DataService} from "../data/data.service";
import {CardData} from "../data/CardData";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'card-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private dataService: DataService) {
  }

  cardData: CardData = null;
  dataArr = [];
  private subscription: Subscription;

  ngOnInit() {

    this.subscription = this.dataService.getCardData()
      .subscribe(cardData => {
        this.cardData = cardData;
        Object.keys(this.cardData).forEach(key => {
          if (Array.isArray(this.cardData[key]))
            this.dataArr.push(...this.cardData[key]);
        })
      });
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}

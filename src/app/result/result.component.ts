import {Component, OnInit} from '@angular/core';

import {DataService} from "../data/data.service";
import {CardData} from "../data/CardData";

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

  ngOnInit() {
    this.cardData = this.dataService.getCardData();

    Object.keys(this.cardData).forEach(key => {
      if (Array.isArray(this.cardData[key]))
        this.dataArr.push(...this.cardData[key]);
    });
  }
}

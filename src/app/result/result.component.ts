import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import {DataService} from "../data/data.service";
import {CardData} from "../data/CardData";

@Component({
  selector: 'card-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private dataService: DataService,
              private sanitizer: DomSanitizer) {
  }

  cardData: CardData = null;

  ngOnInit() {
    this.cardData = this.dataService.getCardData();
    this.cardData.sanitizeAll(this.sanitizer)
  }

}

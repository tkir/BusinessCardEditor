import {Component, OnDestroy, OnInit, ViewChildren} from '@angular/core';
import {Subscription} from "rxjs/Subscription";

import {DataService} from "../services/data.service";
import {Store} from "../services/store";
import {CardData} from "../data/CardData";
import {AddResizeDirective} from "./directives/add-resize.directive";

@Component({
  selector: 'card-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnDestroy {

  me = this;

  @ViewChildren(AddResizeDirective) addResizeDirectives: AddResizeDirective[];

  constructor(private dataService: DataService,
              private store: Store) {
  }

  cardData: CardData = null;
  dataArr = [];
  private subscription: Subscription;

  ngOnInit() {
    this.subscription = this.store.changes
      .subscribe((cardData: any) => {
        this.cardData = cardData;
        this.dataArr = [];
        Object.keys(this.cardData).forEach(key => {
          if (Array.isArray(this.cardData[key]))
            this.dataArr.push(...this.cardData[key]);
          else this.dataArr.push(this.cardData[key]);
        });
      });
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}

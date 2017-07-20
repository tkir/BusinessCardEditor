import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../data/data.service";
import {CardData} from "../data/CardData";
import $ from 'jquery/dist/jquery';
import {Text} from "../data/TextCSS";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'card-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {

  model: CardData = null;
  selectedItem: Text = null;
  selectedInput: any = null;

  private subscription: Subscription;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.subscription = this.dataService.getCardData()
      .subscribe(cardData => this.model = cardData);
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  addItem(items, i?: number) {
    if (items && items.length)
      items.push($.extend(true, {}, items[i]));
    else
      items.push(new Text('', this.getItemFont(), 12, 'normal', 'normal', "none", "left", 200, 20));
  }

  private getItemFont(): string {
    let fontFamily;
    Object.keys(this.model).forEach(key => {
      if (Array.isArray(this.model[key]))
        this.model[key].forEach(item => fontFamily = item.fontFamily);
    });

    return fontFamily;
  }

  removeItem(items, i) {
    items.splice(i, 1);
  }

  focusItem(item: Text, event) {
    Object.keys(this.model).forEach(key => {
      if (Array.isArray(this.model[key]))
        this.model[key].forEach(item => item.isSelected = false);
    });

    item.isSelected = true;
    this.selectedItem = item;
    this.selectedInput = event.target;
  }

  blurItem() {
    if (!this.selectedItem.isStyling) {
      this.selectedItem.isSelected = false;
      this.selectedItem = null;
      this.selectedInput = null;
    }
  }

  onFocusReturn() {
    this.selectedInput.focus();
  }

}

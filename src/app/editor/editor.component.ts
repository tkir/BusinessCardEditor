import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../data/data.service";
import {CardData} from "../data/CardData";
import {Text} from "../data/TextCSS";
import {Subscription} from "rxjs/Subscription";
import {Store} from "../data/store";

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

  constructor(private dataService: DataService,
              private store: Store) {
  }

  ngOnInit() {
    this.dataService.setCardData();
    this.subscription = this.store.changes
      .subscribe((cardData: any) => this.model = cardData);
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  addItem(items: Text[], i?: number) {

    let newText: Text = new Text('', this.getItemFont(), 12, 'normal', 'normal', "none", "left", 200, 20);

    if (items && items.length) {
      Object.keys(items[i]).forEach(key => newText[key] = items[i][key]);
      newText.top += 20;
    }

    items.push(newText);
    this.dataService.updateCard(this.model);
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

    this.dataService.updateCard(this.model);
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

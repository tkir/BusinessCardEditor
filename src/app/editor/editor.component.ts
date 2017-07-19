import {Component, OnInit} from '@angular/core';
import {DataService} from "../data/data.service";
import {CardData} from "../data/CardData";
import $ from 'jquery/dist/jquery';
import {Text} from "../data/TextCSS";

@Component({
  selector: 'card-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  constructor(private dataService: DataService) {
  }

  model: CardData = null;
  selectedItem: Text = null;
  selectetInput: any = null;

  ngOnInit() {
    this.model = this.dataService.getCardData();
  }

  addItem(items, i) {
    items.push($.extend(true, {}, items[i]));
  }

  removeItem(items, i) {
    items.splice(i, 1);
  }

  focusItem(item: Text, event) {
    if (!item.isSelected) item.isSelected = true;
    this.selectedItem = item;
    this.selectetInput = event.target;
  }

  blurItem() {
    if (!this.selectedItem.isStyling) {
      this.selectedItem.isSelected = false;
      this.selectedItem = null;
      this.selectetInput = null;
    }
  }

  onFocusReturn() {
    this.selectetInput.focus();
  }

}

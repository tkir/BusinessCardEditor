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

  ngOnInit() {
    this.model = this.dataService.getCardData();
  }

  addItem(items, i) {
    items.push($.extend(true, {}, items[i]));
  }

  removeItem(items, i) {
    items.splice(i, 1);
  }

}

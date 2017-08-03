import {Component, OnInit} from '@angular/core';
import {cardDesignData} from "./design/defaultParams";
import {DataService} from "./data/data.service";

@Component({
  selector: 'business-card-editor',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public dataService: DataService) {
  }

  ngOnInit() {
  }

}

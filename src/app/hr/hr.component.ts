import {Component, Input, OnInit} from '@angular/core';
import {Line} from "../data/Line";

@Component({
  selector: 'card-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.css']
})
export class HrComponent implements OnInit {

  @Input() line: Line = null;

  constructor() {
  }

  ngOnInit() {
  }

}

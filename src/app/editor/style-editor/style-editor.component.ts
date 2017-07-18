import {Component, Input, OnInit} from '@angular/core';
import {Text} from "../../data/TextCSS";

@Component({
  selector: 'card-style-editor',
  templateUrl: './style-editor.component.html',
  styleUrls: ['./style-editor.component.css']
})
export class StyleEditorComponent implements OnInit {

  @Input()item:Text;

  constructor() { }

  ngOnInit() {
  }

}

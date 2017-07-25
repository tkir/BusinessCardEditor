import {Component, Input, OnInit} from '@angular/core';
import {Line} from "../../data/Line";

@Component({
  selector: 'card-hr-editor',
  templateUrl: './hr-editor.component.html',
  styleUrls: ['./hr-editor.component.css']
})
export class HrEditorComponent implements OnInit {

  @Input() hr: Line = null;

  //TODO to config
  allowedDesigns: string[] = ['solid', 'dashed', 'dotted', 'double'];

  constructor() {
  }

  ngOnInit() {
  }

  updateHr(param: string, res: any) {
    if (param == 'design')
      this.hr.design = res;
    else if (param == 'thickness')
      this.hr.thickness = res;
    else if (param == 'color')
      this.hr._color = res;
  }

}

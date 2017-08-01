import {Component, EventEmitter, Input, Output} from '@angular/core';
let WebFont = require('webfontloader');
import {Text} from "../../data/TextCSS";
import {AlignService} from "../../services/align.service";

@Component({
  selector: 'card-style-editor',
  templateUrl: './style-editor.component.html',
  styleUrls: ['./style-editor.component.css'],
  host: {
    '(mousedown)': 'onMouseDown()'
  }
})
export class StyleEditorComponent{

  @Input() item: Text;
  @Output() returnFocus: EventEmitter<any> = new EventEmitter();

  onMouseDown() {
    if (this.item) this.item.isStyling = true;
  }

  constructor(public alService: AlignService) {
  }

  toggleStyle(style: string) {
    if (!this.item)return;

    switch (style) {
      case 'fontWeight':
        this.item.fontWeight = (this.item.fontWeight === 'normal') ?
          'bold' : 'normal';
        break;
      case 'fontStyle':
        this.item.fontStyle = (this.item.fontStyle === 'normal') ?
          'italic' : 'normal';
        break;
      case 'textDecoration':
        this.item.textDecoration = (this.item.textDecoration === 'none') ?
          'underline' : 'none';
        break;
    }

    this.endStyling();
  }

  private endStyling() {
    this.returnFocus.emit();
    if (this.item) this.item.isStyling = false;
  }

  setColor(color: string) {
    if (!this.item)return;

    this.item.colorStr = color;

    this.endStyling();
  }

  setAlignment(alLine: string) {
    this.alService.alignTextFields(alLine);
  }

  setFontSize(direction: string) {
    if (!this.item)return;

    this.item.changeFontSize(direction);
    this.endStyling();
  }

  setFontName(font: string) {

    WebFont.load({
      google: {
        families: [font]
      },
      active: (function () {
        this.item.fontName = font;
      }).bind(this)
    });

    this.endStyling();
  }
}

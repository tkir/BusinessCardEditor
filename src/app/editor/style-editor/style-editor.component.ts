import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {Text} from "../../data/TextCSS";

@Component({
  selector: 'card-style-editor',
  templateUrl: './style-editor.component.html',
  styleUrls: ['./style-editor.component.css']
})
export class StyleEditorComponent implements OnInit {

  @Input() item: Text;
  @Output() returnFocus: EventEmitter<any> = new EventEmitter();

  @HostListener('mousedown')func() {
    if (this.item) this.item.isStyling = true;
  }

  constructor() {
  }

  ngOnInit() {
  }

  toggleStyle(style: string) {
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
}

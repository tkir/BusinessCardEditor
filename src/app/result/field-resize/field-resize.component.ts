import {Component, HostBinding, HostListener, Input, OnInit} from '@angular/core';

@Component({
  selector: 'card-field-resize',
  templateUrl: './field-resize.component.html',
  styleUrls: ['./field-resize.component.css'],
  host:{
    '[style.left]':'elPos.x'
  }
})
export class FieldResizeComponent implements OnInit {

  @Input() item: any = null;
  @Input() el: Element = null;
temp='10px';
  elPos:{x:string, y:string}={x:'0px', y:'0px'};

  constructor() {
  }

  ngOnInit() {
  }

  init(item, el) {
    this.item = item;
    this.el = el;

    this.updatePosition();
  }

  private updatePosition(){
    this.elPos={
      x:getComputedStyle(this.el).width,
      y:getComputedStyle(this.el).height
    };
  }

  resize(event:MouseEvent){
    console.log(event);
  }

}

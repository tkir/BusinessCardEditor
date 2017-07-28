import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {Text} from "../../data/TextCSS";

@Directive({
  selector: '[fieldAlignable]'
})
export class AlignableDirective implements OnInit {

  @Input() item: Text = null;

  constructor(private elRef: ElementRef) {
  }

  ngOnInit() {
    if (this.item) this.item.div = this.elRef.nativeElement.parentElement;
  }

}

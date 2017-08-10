import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {DesignService} from "../services/design.service";

@Component({
  selector: 'card-design-container',
  templateUrl: './design-container.component.html',
  styleUrls: ['./design-container.component.css']
})
export class DesignContainerComponent implements OnInit, OnDestroy {

  private allowedDesigns = [];
  private subscription: Subscription = null;

  constructor(private designService: DesignService) {
  }

  ngOnInit() {
    this.subscription = this.designService.getAllowedDesignes()
      .subscribe((designs: any) => this.allowedDesigns = designs);
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}

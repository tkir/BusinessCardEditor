import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Line} from "../../data/Line";
import {Store} from "../../data/store";
import {DataService} from "../../data/data.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'card-hr-editor',
  templateUrl: './hr-editor.component.html',
  styleUrls: ['./hr-editor.component.css']
})
export class HrEditorComponent implements OnInit, OnDestroy {

  @Input() hr: Line = null;

  private subscription: Subscription = null;
  background: any;

  //TODO to config
  allowedDesigns: string[] = ['solid', 'dashed', 'dotted', 'double'];

  constructor(private dataService: DataService,
              private store: Store) {
  }

  ngOnInit() {
    this.dataService.setCardData();
    this.subscription = this.store.changes
      .subscribe((cardData: any) =>
        this.background = cardData.background
      );
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
    this.subscription = null;
  }

  updateHr(param: string, res: any) {
    if (param == 'design')
      this.hr.design = res;
    else if (param == 'thickness')
      this.hr.thickness = res;
    else if (param == 'color')
      this.hr._color = res;
  }

  changeOrientation() {
    this.hr.isHorizontal = !this.hr.isHorizontal;
    this.hr.onChangeBgSize(this.background);
  }

}

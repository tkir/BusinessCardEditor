import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";

import {DataService} from "../../data/data.service";
import {Store} from "../../data/store";
import {ImageService} from "../../utils/image.service";
import {Background} from "../../data/Background";
import {CardData} from "../../data/CardData";

@Component({
  selector: 'card-background-editor',
  templateUrl: './background-editor.component.html',
  styleUrls: ['./background-editor.component.css']
})
export class BackgroundEditorComponent implements OnInit, OnDestroy {

  private subscription: Subscription = null;
  background: Background;
  cardData: any = null;

  //TODO to config
  allowedSizes: { width: number, height: number }[] = [
    {width: 85, height: 55},
    {width: 55, height: 85}
  ];

  constructor(private dataService: DataService,
              private store: Store,
              private imageService: ImageService) {
  }

  ngOnInit() {
    this.subscription = this.store.changes
      .subscribe((cardData: any) => {
        this.cardData = cardData;
        this.background = cardData.background;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
    this.subscription = null;
  }

  updateCardSize(i) {
    this.background.width_mm = this.allowedSizes[i].width;
    this.background.height_mm = this.allowedSizes[i].height;

    this.cardData.logos.forEach(logo=>logo.onChangeBgSize(this.background));
    this.cardData.lines.forEach(line=>line.onChangeBgSize(this.background))
  }

  setColor(color: string) {
    this.background._backgroundColor = color;
  }

  uploadImage(event) {
    if (event.target.files.length)
      this.imageService.uploadImage(this.background, event.target.files[0]);
  }

  removeBeckgroundImage() {
    this.background.src = '';
    this.background.dataType = '';
  }

}

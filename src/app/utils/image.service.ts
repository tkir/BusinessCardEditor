import {EventEmitter, Injectable, OnDestroy, OnInit} from '@angular/core';
import {Logo} from "../data/Logo";
import {ImageResult} from "./image/interfaces";
import {ImageUpload} from "./image/image-upload";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class ImageService implements OnInit, OnDestroy {

  private item;
  private imageUpload: ImageUpload;
  private subscription: Subscription = null;

//TODO to config
  private resizeQuality: number = 1;
  private resizeType: string = 'image/png';
  private allowedExtensions: string[] = ['jpg', 'jpeg', 'png'];

  constructor() {
    this.imageUpload = new ImageUpload();
    this.subscription = this.imageUpload.imageSelected
      .subscribe((res: ImageResult) => this.updateLogo(res));
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    this.subscription = null;
  }

  uploadImage(item, image: File) {
    this.item = item;

    let resizeOptions = {
      resizeMaxHeight: item.maxHeight,
      resizeMaxWidth: item.maxWidth,
      resizeQuality: this.resizeQuality,
      resizeType: this.resizeType
    };

    this.imageUpload.readFiles(image, resizeOptions, this.allowedExtensions);

  }

  private updateLogo(imageResult: ImageResult) {
    if(imageResult.resized) {
      this.item.width = imageResult.resized.width;
      this.item.height=imageResult.resized.height;
      this.item.dataType=imageResult.resized.type;
      this.item.src=imageResult.resized.dataURL;
    }

    //TODO обработать ошибки загрузки файлов
    if(imageResult.error)console.error(imageResult.error);
  }

}
